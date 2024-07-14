import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'

export const signup=async (req,res,next)=>{
   const {username,password,email}=req.body
   const hashedpassword=bcryptjs.hashSync(password,10)
   const newuser=new User({username,password :hashedpassword,email})
   try{
    await newuser.save()
    res.status(200).json('user created succsusfully')  
   }catch(err){
    next(err)
   }
   
}
