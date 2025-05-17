import express from "express"
import dotenv from 'dotenv'

dotenv.config()

const app = express()


const Port = process.env.PORT ||3000





app.listen(Port , ()=>{
    console.log(`server running on ${Port}`);
    
})