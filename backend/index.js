import express from 'express'
import mongoose from 'mongoose'
import dovenv from "dotenv"
import cookieParser from 'cookie-parser';
import cors from 'cors'

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import ListingRouter from './routes/llisting.route.js'

const app=express();
app.use(cookieParser())
dovenv.config()
mongoose.connect(process.env.MONGO)
    .then(()=>{
    console.log('connected to database')
    })
    .catch((err)=>{
        console.log(err)
    }
)
app.use(cors());
app.use(express.json())

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/listing',ListingRouter)



app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'internal server error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

app.listen(8000,(req,res)=>{
    console.log("server is running on port 8000")
})