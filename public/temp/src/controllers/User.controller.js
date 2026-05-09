import {asyncandler} from "../utils/asynhandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadoncloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncandler(async(req,res) => {
res.status(200).json({
    Message : "ok"
}
) 

const{fullname , username , password , email} = req.body

if([fullanme , username , password , email].some((field) =>
field?.trim() === ""
))
{
    throw new ApiError(400 ,"All fields required");
    
}

const existeduser = User.findOne({
    $or:[{username} , {fullname}]
})

if(existeduser){
    throw new ApiError(409 ,"user already existed");
    
}
const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(400 , "avatar is required");
}

const avatar = await uploadoncloudinary(avatarLocalPath)
const coverImage = await uploadoncloudinary(coverImageLocalPath)

if(!avatar)
{
 throw new ApiError(400 , "avatar file is required");
}

const user = await User.create({
    fullname,
    email,
    avatar : avatar.url,
    coverImage : coverImage?.url || "" ,
    username : username.toLowerCase()
}

)
return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
)
})


export {
    registerUser,
}



