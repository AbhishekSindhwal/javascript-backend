import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    //console.log(localFilePath)
    try {
        if (!localFilePath) return null;
        console.log(localFilePath,"1  abc")
        //upload the on file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
    
        })
        //console.log("abc")
        //file jas been uploaded successfully
        fs.unlinkSync(localFilePath)
        console.log("file is uploaded on cloudinary", response.url);
        return response;
    } catch (error) {
        console.log("here is error/n",error)
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}
export { uploadOnCloudinary }




