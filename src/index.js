//require('dotenv').config()
import dotenv  from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path:'./env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running at port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongo db connection failed!!")
})

/*
import express from "express"
import 'dotenv/config'
const app=express();
(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        app.on("error",(error)=>{
            console.log("ERRR:",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }catch(error){
        console.error("Error: ", error)
        throw error
    }
})()
*/