import express from 'express'
import { google, login, signout, signup, userdata } from '../controller/auth.controller.js'

const router=express.Router()


router.post('/signup',signup)
router.post('/login',login)
router.post('/google',google)
router.post('/getuser',userdata)
router.get('/signout',signout)

export default router