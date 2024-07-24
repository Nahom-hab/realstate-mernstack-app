
import express from 'express'
import { Router } from 'express'
import { createListing, deleteListing, editListing, getlisting } from '../controller/listing.controller.js'
import { verifyUser } from '../utils/verifyuser.js'

const router=Router()

router.post('/create',verifyUser,createListing)
router.post('/editListing/:id',verifyUser,editListing)
router.delete('/deleteListing/:id',verifyUser,deleteListing)
router.get('/getListing/:id',getlisting)


export default router
