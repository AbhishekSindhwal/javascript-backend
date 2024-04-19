import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User }  from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation- not empty
    // check if user already exists
    // check for images , check for avatar
    // upload them to cloudinary, avatar
    // create user object-create entry in db
    // remove password and refresh token field from response
    // check for user createion
    // return response

    const { fullName, email, username, password } = req.body
    console.log(email)
    // if(fullname===""){
    //     throw new ApiError(400,"fullname is required")
    // }
    if (
        [fullName, email, username, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "all fields are required")
    }

    const existedUser =await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exist.")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage)
     && req.files.coverImage.length>0){
    coverImageLocalPath=req.files?.coverImage[0]?.path 

}
    //console.log(avatarLocalPath)
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    // if (!avatar) {
    //     throw new ApiError(400, "Avatar file is required")
    // }

    const user = await User.create({
        fullName,
        avatar: "https://res.cloudinary.com/dykzwrsbd/image/upload/v1713500765/whtv5klhdqqbzgroaiwy.jpg",
        coverImage:"",
        email,
        password,
        username: username.toLowerCase()
    })
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user")
    }


    return res.status(201,).json(
        new ApiResponse (200,createdUser,"User registered successfully")
    )


})


export { registerUser }