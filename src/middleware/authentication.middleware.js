import { asyncHandler } from "../utils/response.js"
import * as DBService from '../DB/db.service.js'
import { userModel } from "../DB/models/user.model.js"
import { verifyToken } from "../utils/security/token.security.js";


export const authentication =()=>{
    return asyncHandler(async(req,res,next)=>{
        console.log(req.headers);
        const {authorization}=req.headers;
        console.log(authorization);
        console.log(authorization?.split(' '))
        const [bearer,token]=authorization?.split(' ')|| []
        console.log({bearer,token});
        
        if (!bearer || !token) {
            return next(new Error('missing token parts',{cause:401}))
        }

        let signatures={accessSignature:undefined,refreshSignature:undefined}

        switch (bearer) {
            case 'System':
                signatures.accessSignature=process.env.ACCESS_SYSTEM_TOKEN_SIGNATURE
                signatures.refreshSignature=process.env.REFRESH_SYSTEM_TOKEN_SIGNATURE
                break;
        
            default:
                signatures.accessSignature=process.env.ACCESS_USER_TOKEN_SIGNATURE
                signatures.refreshSignature=process.env.REFRESH_USER_TOKEN_SIGNATURE
                break;
        }

        const decoded=await verifyToken({token:token,signature:signatures.accessSignature})
        if (!decoded?._id) {
            return next(new Error('in-valid token',{cause:400}))
        }
        const user=await DBService.findById({model:userModel,id:decoded._id})
        if (!user) {
            return next (new Error('Not register account',{cause:400}))
        }
        req.user=user
        
        return next()
    })
}
