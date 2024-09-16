import express from 'express'
import mongoose from 'mongoose'
import dovenv from "dotenv"
import cookieParser from 'cookie-parser';
import cors from 'cors'

import path from 'path'
import { fileURLToPath } from 'url';

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import ListingRouter from './routes/llisting.route.js'


const app = express();
app.use(cookieParser())
dovenv.config()

//connect to the data base 
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('connected to database')
    })
    .catch((err) => {
        console.log(err)
    }
    )

//to get the absolut path to our backend
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(cors());
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', ListingRouter)

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(8000, (req, res) => {
    console.log("server is running on port 8000")
})