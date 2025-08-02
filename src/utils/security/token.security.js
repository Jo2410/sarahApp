import jwt from 'jsonwebtoken'

export const signatureLevelEnum={bearer:'Bearer',system:'System'}



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