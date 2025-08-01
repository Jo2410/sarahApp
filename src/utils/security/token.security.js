import jwt from 'jsonwebtoken'

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