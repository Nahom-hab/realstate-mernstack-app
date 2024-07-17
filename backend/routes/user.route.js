import express, { Router } from 'express'
import {test, userdata} from '../controller/user.controller.js'

const router=express.Router()

router.get('/test',test)
router.get('/getuser',userdata)

export default router