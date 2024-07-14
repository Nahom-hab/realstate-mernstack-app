import express from 'express'
import mongoose from 'mongoose'
import dovenv from "dotenv"

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

const app=express();
dovenv.config()
mongoose.connect(process.env.MONGO)
    .then(()=>{
    console.log('connected to database')
    })
    .catch((err)=>{
        console.log(err)
    }
)
app.use(express.json())

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'internal server error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

app.listen(3000,(req,res)=>{
    console.log("server is running on port 3000")
})