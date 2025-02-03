// id string pk
// username string
// email string
// fullName string
// avatar string
// coverImage string
// watchHistory ObjectId[] videos
// password string
// refreshToken string
// createdAt Date
// updatedAt Date


import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema= new Schema(
    {
       username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
       },
       email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
       },
       fullname:{
        type:String,
        required:true,
        index:true,
        trim:true
       },
       avatar:{
        type:String,
        required:true,
       },
       coverImage:{
        type:String,
        required:true,
       },
       watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Vedio"
        }
       ],
       password:{
        type:String,
        required:[true,"password is required"]
       },
       refreshToken:{
        type:String
       }
    },
    {timestamps:true}
)

// attach to the models

userSchema.pre("save", async function(next){

    // if not udating the filed if not password so no need to go inside the function 
// fixed in rgistration vedio
    if(!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password,10)
    next()
})

// compare the password

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    // short lived access token
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_EXPIRY}
    );
}

userSchema.methods.generateRefreshToken = function(){
    // short lived access token
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    );
}


export const User =mongoose.model("User",userSchema)