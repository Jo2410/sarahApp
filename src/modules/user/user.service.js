import { asyncHandler,successResponse } from '../../utils/response.js'
import { decryptEncryption } from '../../utils/security/encryption.security.js'
import jwt from 'jsonwebtoken'



export const profile=asyncHandler(async (req,res,next)=>{
    req.user.phone=await decryptEncryption({cipherText:req.user.phone})
    return successResponse({res,data:{user:req.user}})
})