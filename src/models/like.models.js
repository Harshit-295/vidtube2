// id string pk
// video ObjectId videos
// comment ObjectId comments
// tweet ObjectId tweets
// likedBy ObjectId users
// createdAt Date
// updatedAt Date



import mongoose ,{Schema} from "mongoose";
import { tweet } from "./tweet.models";

const likeSchema = new Schema(
    {
        vedio:{
            type:Schema.type.ObjectId,
            ref:"Vedio"
        },
        comment:{
            type:Schema.type.ObjectId,
            ref:"Comment"
        },
        tweet:{
            type:Schema.type.ObjectId,
            ref:"Tweet",
        },
        likedby:{
            type:Schema.Type.ObjectId,
            ref:"User"
        }
    },{timestamps:true}
)

export const Like = mongoose.model("Like",likeSchema)