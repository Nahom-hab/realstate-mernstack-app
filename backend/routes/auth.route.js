import express from 'express'
import { google, login, signup, userdata } from '../controller/auth.controller.js'

const router=express.Router()


router.post('/signup',signup)
router.post('/login',login)
router.post('/google',google)
router.post('/getuser',userdata)

export default router