import {v2 as cloudinary} from 'cloudinary';
import fs from"fs"

// configure cloundinary

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:  process.env.CLOUDINARY_API_KEY, 
    api_secret:  process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloundinary = async (localFilePath) =>{
    try{
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

export {uploadOnCloundinary}