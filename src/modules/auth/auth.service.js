
import { roleEnum, userModel } from "../../DB/models/user.model.js"
import { asyncHandler, successResponse } from "../../utils/response.js";
import * as DBService from '../../DB/db.service.js'
import { compareHash, generateHash } from "../../utils/security/hash.security.js";
import {generateEncryption} from '../../utils/security/encryption.security.js'
import { generateToken, getSignatures, signatureLevelEnum } from "../../utils/security/token.security.js";


export const signup=asyncHandler(
        
    async(req,res,next)=>{
    
        const {fullName,email,password,phone}=req.body
        console.log({fullName,email,password,phone});
        

        if (await DBService.findOne({model:userModel,filter:{email}})) {
            return next(new Error("Email exist",{cause:409}))
        }
        const hashPassword=await generateHash({plaintext:password})
        
        const encPhone=await generateEncryption({plaintext:phone})
        console.log(encPhone);
        

        const [user]=await DBService.create({
            model:userModel,
            data:[{
                fullName,
                email,
                password:hashPassword,
                phone:encPhone
            }]
        })

        return successResponse({res,status:201,data:{user}})


}
)




export const login=asyncHandler(
    async(req,res,next)=>{
    
        const {email,password}=req.body
        const user=await DBService.findOne(
            {
                model:userModel,
                filter:{email},
                
            }
        )

        if (!user) {
            
            return next(new Error('in-valid login data',{cause:404}))
        }
        
        const match= await compareHash({plaintext:password,hashValue:user.password})

        if(!match)
        {
            return next(new Error('in-valid login Data',{cause:404}))
        }
        const signatureLevel= user.role != roleEnum.user ? 'System':'Bearer'
        console.log(signatureLevel);
        
        let signatures=getSignatures({
            signatureLevel:user.role !=roleEnum.user ? signatureLevelEnum.system:signatureLevelEnum.bearer
        })
        console.log(signatures);
        

        const access_token = await generateToken({
            payload:{_id:user._id},
            signature:signatures.accessSignature
        })

        const refresh_token =await generateToken({
            payload:{_id:user._id},
            signature:signatures.refreshSignature,
            options:{
                
            }
        })

        return successResponse({res,data:{access_token,refresh_token}}) 
}
)

