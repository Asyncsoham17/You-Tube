import { ApiError } from "../utils/ApiError";
import {asynchandler} from "../utils/asynchandler";
import jwt from  "jsonwebtoken";
import {User} from "../models/user.model"

export const VerifyJWT = asynchandler(async(req , res , next) =>{

   try {
    const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer" ,"")
 
    if(!token){
     throw new ApiError(401, "Unauthorized request")
     
    }
 
    const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
 
    await User.findById(decodedToken?._id).
    select("-password -refreshtoken")
 
    if(!User){
     throw new ApiError(401 , "invalid Access Token")
    }
 
 
    req.user = user;
    next()
   } catch (error) {
    throw new ApiError(401 , error?.message ||
    "Invalid Access Token"
    )
   }
})