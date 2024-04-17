import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const vedioSchema = new mongoose.Schema(
    {
        videoFile: {
            type: String,//cloudinary url
            required: true
        },
        thumbnail: { 
            type: String,//cloudinary url
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,//cloudinary url
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            req: "User"
        }
    },
    {
        timestamps: true
    }
)

vedioSchema.plugin(mongooseAggregatePaginate)
export default Vedio = mongoose.model('Vedio', vedioSchema)