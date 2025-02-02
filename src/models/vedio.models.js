// id string pk
// owner ObjectId users
// videoFile string
// thumbnail string
// title string
// description string
// duration number
// views number
// isPublished boolean
// createdAt Date
// updatedAt Date

import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const vedioSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    vedioFile:{
        type:String,//cloudinary url
        required:true
    },
    thumbnail:{
        type:String,//cloundinary url
        required:true
    },
    title:{
        type:String,//cloundinary url
        required:true
    },
    description:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    duration:{
        type:Number,
        required:true
    },
    isPublished:{
      type:Boolean,
      default:true
    }

},{timestamps:true}) 

vedioSchema.plugin(mongooseAggregatePaginate)

export const Vedio =mongoose.model("Vedio",vedioSchema)