import {asyncandler} from "../utils/asynhandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadoncloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const getAccessAndRefreshTokens = async(userId) =>{

    try {
        const user = await User.findById(userId)
       const AccessToken = user.generateAccessToken()
       const RefreshToken = user.generateRefreshToken()

       user.RefreshToken = RefreshToken
       await   user.save({ValidateBeforeSave : false})

       return {AccessToken , RefreshToken}
    } catch (error) {
        throw new ApiError(404 , "something went wrong while generating the Access and Refresh Tokens")
    }
}


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

const existeduser =await User.findOne({
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

const loginUser = asyncandler(async(req , res) =>{

    const {email , username , password} = req.body

    if(!email || !username){
        throw new ApiError(400 , "email and username is required")
    }

    const user = user.findOne({
        $or :[{username}, {email}]
    })

    if(!user){
        throw new ApiError(404 , "user does not existed")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(404 , "password is not valid")
    }

    const option = {
        httpOnly = true,
        secure = true
    }

    return res.
    status(200)
    .cookie("AccessToken" , AccessToken ,Options )
    .cookie("RefreshToken" , RefreshToken , Options)
    .json(
        new ApiResponse(
        200,{
           user : loginUser , AccessToken , RefreshToken
        },
        "user loggedin successfully"
        )
    )
})

const logoutUser = asyncandler(async(req,res) =>{

})
export {
    registerUser,
    loginUser,
    logoutUser
}



