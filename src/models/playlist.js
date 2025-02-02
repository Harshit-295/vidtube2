// id string pk
//   owner ObjectId users
//   videos ObjectId[] videos
//   name string
//   description string
//   createdAt Date
//   updatedAt Date






import mongoose ,{Schema} from "mongoose";
import { User } from "./user.models";

const playlistSchema= new Schema(
    {
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        vedios:[
            {
                type:Schema.Types.ObjectId,
                ref:"Vedio"
            }
        ],
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },

    },{timestamps:true}

)

export const Playlist = mongoose.model("Playlist",playlistSchema)