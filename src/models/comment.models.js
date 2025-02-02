// id string pk
// video ObjectId videos
// owner ObjectId users
// content string
// createdAt Date
// updatedAt Date


import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
    {
        vedio:{
            type:Schema.type.ObjectId,
            ref:"Vedio"
        },
        owner:{
            type:Schema.type.ObjectId,
            ref:"User"
        },
        content:{
            type:String
        },

    },{timestamps:true}
)

commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = mongoose.Schema("Comment",commentSchema)