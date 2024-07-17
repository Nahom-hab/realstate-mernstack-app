import User from "../models/userModel.js"
import { errorHandeler } from "../utils/error.js"

export const userdata= async (req,res,next)=>{
    const {email}=req.body
    try {
        const validUser=await User.findOne({email})
        const {password:hashedpassword,...otheruserdata}=validUser._doc
        res.json(otheruserdata) 
    } catch (error) {
        next(error)
    }
   
}



export const test=(req,res)=>{
    res.json({
        message:'controller is working'
    })
}

