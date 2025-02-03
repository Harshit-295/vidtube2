import {v2 as cloudinary} from 'cloudinary';
import fs from"fs"
import dotenv from "dotenv";

dotenv.config()
// configure cloundinary

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:  process.env.CLOUDINARY_API_KEY, 
    api_secret:  process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

console.log("hello")
const uploadOnCloundinary = async (localFilePath) =>{
    try{
        // console.log("Cloudniary config",{
        //         cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        //         api_key:  process.env.CLOUDINARY_API_KEY, 
        //         api_secret:  process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
        // })
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(
            localFilePath,{
                resource_type:"auto"
            }
        )
        console.log("file uploaded Cloundinary , File src " ,response.url)
        // once the file uploaded we should dlete it from our server
        fs.unlinkSync(localFilePath)
        return response
    }catch(error){
        fs.unlinkSync(localFilePath)
        return null
    }
}

const deleteFromCloudinary = async (publicId)=>{
    try {
        const result=await cloudinary.uploader.destroy(publicId)
        console.log("Deleted from cloundinary ")
    } catch (error) {
        console.log("Error deleting from cloudinary",error)
    }
}

export {uploadOnCloundinary,deleteFromCloudinary}