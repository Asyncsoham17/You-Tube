import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

import { v2 as cloudinary } from 'cloudinary';



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.Api_cloud_name,
        api_key: process.env.Api_key,
        api_secret: process.env.Api_secret // Click 'View API Keys' above to copy your API secret
    });

    const uploadoncloudinary = async (localFilePath) => {
        try {
            if(!localFilePath) return null;
         const response = await   cloudinary.uploader.upload(localFilePath,{resource_type : "auto"})
            console.log("file is uploaded successfully",response.url);
            return response;
        } catch (error) {
            fs.unlinkSync(localFilePath)
            return null;
        }
    }

    export {uploadoncloudinary}
    
    