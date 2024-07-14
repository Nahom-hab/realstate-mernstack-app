import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandeler } from "../utils/error.js"
import jwt from 'jsonwebtoken'


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

export const login=async (req,res,next)=>{
   const {email,password}=req.body
   try{
      const validUser=await User.findOne({email})
      if(!validUser) return next(errorHandeler(404,'user not found'))
      const validPassword =bcryptjs.compareSync(password,validUser.password)
      if(!validPassword) return(next(errorHandeler(401,'wrong credintials')))
      const token=jwt.sign({id:validUser._id},process.env.SECRET)
      const {password:hashedpassword,...otheruserdata}=validUser._doc
      res
         .cookie('access_token',token,{httpOnly:true})
         .status(200)
         .json(otheruserdata)

   }catch(err){
      next(err)
   }
}