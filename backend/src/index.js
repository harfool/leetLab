import express from "express"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from "./routes/auth.routes.js"
import problemRoutes from "./routes/problem.routes.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/problems", problemRoutes)

app.get('/', (req,res)=>{
    res.send("welcome to leetlab ")
})


const Port = process.env.PORT ||3000





app.listen(Port , ()=>{
    console.log(`server running on ${Port}`);
    
})