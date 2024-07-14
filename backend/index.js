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


app.listen(3000,(req,res)=>{
    console.log("server is running on port 3000")
})