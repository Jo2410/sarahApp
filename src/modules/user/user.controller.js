import * as userService from './user.service.js'
import { auth, authentication, authorization } from '../../middleware/authentication.middleware.js'
import {Router} from 'express'
import { tokenTypeEnum } from '../../utils/security/token.security.js'
import { endpoint } from './user.authorization.js'
const router =Router()


router.get('/',auth({accessRoles:endpoint.profile}),userService.profile)
router.get('/refresh-token',
    authentication({tokenType:tokenTypeEnum.refresh}),
    userService.getNewLoginCredentials
)
export default router