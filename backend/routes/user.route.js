import express from 'express';
import { deleteUser, test, updateUser } from '../controller/user.controller.js';
import { verifyUser } from '../utils/verifyuser.js';

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyUser, updateUser); 
router.delete('/delete/:id',verifyUser,deleteUser)

export default router;
