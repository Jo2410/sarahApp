import jwt from 'jsonwebtoken'
import * as DBService from '../../DB/db.service.js'
import { userModel } from '../../DB/models/user.model.js';
import { roleEnum } from '../../DB/models/user.model.js';

export const signatureLevelEnum={bearer:'Bearer',system:'System'}
export const tokenTypeEnum={access:'access',refresh:'refresh'}


export const generateToken=async({
    payload={},
    signature=process.env.ACCESS_USER_TOKEN_SIGNATURE,
    options={
        expiresIn:Number(process.env.ACCESS_TOKEN_EXPIRES_IN)
    }
}={})=>{
    return jwt.sign(payload,signature,options)
}

export const verifyToken=async({
    token='',
    signature=process.env.ACCESS_USER_TOKEN_SIGNATURE
}={})=>{
    return jwt.verify(token,signature)
}


export const getSignatures= async({
signatureLevel=signatureLevelEnum.bearer
}={})=>{
    let signatures={accessSignature:undefined,refreshSignature:undefined}

        switch (signatureLevel) {
            case signatureLevelEnum.system:
                signatures.accessSignature=process.env.ACCESS_SYSTEM_TOKEN_SIGNATURE
                signatures.refreshSignature=process.env.REFRESH_SYSTEM_TOKEN_SIGNATURE
                break;
        
            default:
                signatures.accessSignature=process.env.ACCESS_USER_TOKEN_SIGNATURE
                signatures.refreshSignature=process.env.REFRESH_USER_TOKEN_SIGNATURE
                break;
        }
        return signatures
}

export const decodedToken =async({
    next ,authorization='',tokenType=tokenTypeEnum.access
}={})=>{

    console.log(authorization);
        console.log(authorization?.split(' '))
        const [bearer,token]=authorization?.split(' ')|| []
        console.log({bearer,token});
        
        if (!bearer || !token) {
            return next(new Error('missing token parts',{cause:401}))
        }

        let signatures=await getSignatures({
            signatureLevel:bearer
        })

        const decoded=await verifyToken({
            token:token,
            signature:tokenType===tokenTypeEnum.access?signatures.accessSignature:signatures.refreshSignature
        })
        if (!decoded?._id) {
            return next(new Error('in-valid token',{cause:400}))
        }
        const user=await DBService.findById({
            model:userModel,
            id:decoded._id
        })
        if (!user) {
            return next (new Error('Not register account',{cause:404}))
        }
        return user
}


export const generateLoginCredentials=async({user}={})=>{
    let signatures=await getSignatures({
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
                        expiresIn:Number(process.env.REFRESH_TOKEN_EXPIRES_IN)
                    }
                })
                return {access_token,refresh_token}
}