import * as authservice from './auth.service.js'
import {Router} from 'express'
const router = Router()

router.post('/signup',authservice.signup)
router.patch("/confirm-email",authservice.confirmEmail)
router.post('/login',authservice.login)
router.post('/signup/gmail',authservice.signupWithGmail)
router.post('/login/gmail',authservice.loginWithGmail)

export default router