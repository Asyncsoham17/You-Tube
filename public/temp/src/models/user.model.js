import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserSchema = new Schema({

    username : {
        type : String,
        unique : true,
        required : true,
        lowercase : true,
        trim : true,
        index : true  
    },
    fullname : {
        type : String,
        required : true,
        lowercase : true ,
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true
        
    },
    avatar : {
     type : String, // cloudinary url
     required : true
    },
    coverimage : {
        type: String, // cloudinary url
        required : true
    },
    watchhistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "video"
        }
    ],
    password :{
        type : String,
        required : [true , 'password is required']
    },
    refreshToken : {
        type : String

    }
    

},
{
    timestamps : true
}

)

UserSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password , 10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function 
(password) {
return await bcrypt.compare.apply("password" , this.password)
}

UserSchema.methods.generateAccessToken = function ()
{
   jwt.sign(
    {
    fullname : this.fullname,
    email : this.email,
    username : this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
    expiresIn : process.env.ACCESS_TOKEN_EXPIARY
    }
   )
}

UserSchema.methods.generateRefreshToken = function ()
{
jwt.sign(
    {
    email : this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
    expiresIn : process.env.REFRESH_TOKEN_EXPIARY
    }
   )
}



export const User = mongoose.model("User" , UserSchema)