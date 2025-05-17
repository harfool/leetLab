import express from "express"
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.routes.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use("/api/v1/auth", authRoutes)

app.get('/', (req,res)=>{
    res.send("welcome to leetlab ")
})


const Port = process.env.PORT ||3000





app.listen(Port , ()=>{
    console.log(`server running on ${Port}`);
    
})