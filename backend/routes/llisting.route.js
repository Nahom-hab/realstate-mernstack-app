
import express from 'express'
import { Router } from 'express'
import { createListing } from '../controller/listing.controller.js'
import { verifyUser } from '../utils/verifyuser.js'

const route=Router()

route.post('/create',verifyUser,createListing)

export default route 
