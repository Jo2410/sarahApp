
import { providerEnum, roleEnum, userModel } from "../../DB/models/user.model.js"
import { asyncHandler, successResponse } from "../../utils/response.js";
import * as DBService from '../../DB/db.service.js'
import { compareHash, generateHash } from "../../utils/security/hash.security.js";
import {generateEncryption} from '../../utils/security/encryption.security.js'
import { generateLoginCredentials, generateToken, getSignatures, signatureLevelEnum } from "../../utils/security/token.security.js";
import {OAuth2Client} from 'google-auth-library';
import { EmailEvent } from "../../utils/events/email.event.js";
import { customAlphabet } from "nanoid";


export const signup=asyncHandler(
        
    async(req,res,next)=>{
    
        const {fullName,email,password,phone}=req.body
        console.log({fullName,email,password,phone});
        

        if (await DBService.findOne({model:userModel,filter:{email}})) {
            return next(new Error("Email exist",{cause:409}))
        }
        const hashPassword=await generateHash({plaintext:password})
        
        const encPhone=await generateEncryption({plaintext:phone})
        const otp=customAlphabet('0123456789',6)()
        const confirmEmailOtp=await generateHash({plaintext:otp})

        const [user]=await DBService.create({
            model:userModel,
            data:[{
                fullName,
                email,
                password:hashPassword,
                phone:encPhone,
                confirmEmailOtp
            }]
        })

        EmailEvent.emit("confirmEmail",{to:email,otp:otp})

        return successResponse({res,status:201,data:{user}})


}
)


export const confirmEmail=asyncHandler(
        
    async(req,res,next)=>{
    
        const {email,otp}=req.body
        const user=await DBService.findOne({
            model:userModel,
            filter:{
                email,
                confirmEmail:{$exists:false},
                confirmEmailOtp:{$exists:true}
            }
        })

        if (!user) {
            return next(new Error("in-valid account or verified",{cause:404}))
        }

        if(!await compareHash({plaintext:otp,hashValue:user.confirmEmailOtp}))
        {
            return next(new Error("in-valid otp"))
        }
        const updatedUser=await DBService.updateOne({
            model:userModel,
            filter:{email},
            data:{
                confirmEmail:Date.now(),
                $unset:{confirmEmailOtp:true},
                $inc:{__v:1}
            }
        })
        
        

        return updatedUser.matchedCount? successResponse({res,status:200,data:{user}})
        : next(new Error('Fail to confirm user email'))


}
)



export const login=asyncHandler(
    async(req,res,next)=>{
    
        const {email,password}=req.body
        const user=await DBService.findOne(
            {
                model:userModel,
                filter:{email,provider: providerEnum.system},
                
            }
        )

        if (!user) {
            
            return next(new Error('in-valid login data',{cause:404}))
        }

        if (!user.confirmEmail) {
            return next("please verify your account first",{cause:400})
        }
        
        const match= await compareHash({plaintext:password,hashValue:user.password})

        if(!match)
        {
            return next(new Error('in-valid login Data',{cause:404}))
        }
        const signatureLevel= user.role != roleEnum.user ? 'System':'Bearer'
        console.log(signatureLevel);
        
        const credentials=await generateLoginCredentials({user})

        return successResponse({res,data:{credentials}}) 
}
)


async function verifyGoogleAccount({idToken}={}) {
    const client=new OAuth2Client();
    const ticket=await client.verifyIdToken({
        idToken,
        audience:process.env.WEB_CLIENT_IDS.split(",")
    })
    const payload=ticket.getPayload();
    return payload
}




export const signupWithGmail=asyncHandler(
        
    async(req,res,next)=>{
        
        const {idToken}=req.body;
        const {name,email,email_verified,picture}=await verifyGoogleAccount({idToken})
        if (!email_verified) {
            return next(new Error('not verified account',{cause:400}))
        }

        const user=await DBService.findOne({
            model:userModel,
            filter:{email}
        })

        if (user) {
            if (user.provider=== providerEnum.google) {
                return loginWithGmail(req,res,next)
            }

            return next(new Error('email exist',{cause:409}))
        }

        const [newUser]=await DBService.create({
            model:userModel,
            data:[{
                fullName:name,
                email,
                picture,
                confirmEmail: Date.now(),
                provider:providerEnum.google
            }]
        })

        const credentials=await generateLoginCredentials({user:newUser})
        return successResponse({res,status:201,data:{credentials}})


}
)



export const loginWithGmail=asyncHandler(
        
    async(req,res,next)=>{
        
        const {idToken}=req.body;
        const {email,email_verified}=await verifyGoogleAccount({idToken})
        if (!email_verified) {
            return next(new Error('not verified account',{cause:400}))
        }

        const user=await DBService.findOne({
            model:userModel,
            filter:{email,provider: providerEnum.google}
        })

        if (!user) {
            return next(new Error('in-valid login data or in-valid provider',{cause:404}))
        }

        const credentials=await generateLoginCredentials({user})

        return successResponse({res,status:200,data:{credentials}})


}
)