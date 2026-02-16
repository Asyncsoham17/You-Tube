
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";

dotenv.config();




connectDB ()
.then(() =>{
  app.listen(process.env.PORT || 8000 , () =>{
    console.log(`server is running on port : ${process.env.PORT}`)
  })
})
.catch((error) =>{
  console.log("MongDb connection failed !!" , err)
  
}

)