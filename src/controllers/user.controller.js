import { asynchandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import { uploadOnCloundinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asynchandler(async (req,res)=>{
    //TODO
    const {fullName,email,username,password } = req.body
    //validation 
    if(
        [fullName,username,email,password].some((field) => field?.trim()==="")
    ){
        throw new ApiError(400,"fullname is required")
    }

    const existedUser = await User.findOne({
        $or:[{email},{username}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverLocalPath = req.files?.coverImage[0]?.path
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is missing")
    }

    const avatar = await uploadOnCloundinary(avatarLocalPath)

    let coverImage = ""
    if(coverLocalPath){
        const coverImage = await uploadOnCloundinary(coverLocalPath)
    }

    const user=User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password - refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrongwhile register a user")
    }

    return res
      .status(201)
      .json(new ApiResponse(200,createdUser,"User registed successfully"))

    

})


export {
    registerUser
}