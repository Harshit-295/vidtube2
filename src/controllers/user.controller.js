import { asynchandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import { uploadOnCloundinary ,deleteFromCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asynchandler(async (req,res)=>{
    //TODO
    const {fullname,email,username,password } = req.body
    //validation 
    if(
        [fullname,username,email,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"fullname is required")
    }
    const existedUser = await User.findOne({
        $or:[{email},{username}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }
    const avatarLocalPath = req.files?.avatar?.[0]?.path
    const coverLocalPath = req.files?.coverImage?.[0]?.path
    if(!avatarLocalPath){
        throw new ApiError(400,"avatar file is missing")
    }

    // const avatar = await uploadOnCloundinary(avatarLocalPath)
    // const coverImage = ""
    // if(coverLocalPath){
    //     const coverImage = await uploadOnCloundinary(coverLocalPath)
    // }
    let avatar;
    try{
        avatar = await uploadOnCloundinary(avatarLocalPath)
        console.log("Upload avatar",avatar)
    }catch(error){
        console.log("Error uploading avatar",error)
        throw new ApiError(500,"Failed to  upload avatar")
    }

    let coverImage;
    try{
        coverImage = await uploadOnCloundinary(coverLocalPath)
        console.log("Upload avatar",coverImage)
    }catch(error){
        console.log("Error uploading coverImage",error)
        throw new ApiError(500,"Failed to  upload coverImage")
    }

try {
       const user=User.create({
           fullname,
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
   
 } catch (error) {
    console.log("user creation failed")
    console.log(error)
    if(avatar){
        await deleteFromCloudinary(avatar.public_id)
    }
    if(coverImage){
        await deleteFromCloudinary(coverImage.public_id)
    }
    throw new ApiError(500,"Something went wrongwhile register a user and images were deleted")
  }
})

export {
    registerUser
}