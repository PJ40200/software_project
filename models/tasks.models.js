import mongoose from "mongoose";

new taskSchema = mongoose.Schema(
    {
        Title :{
            type : String,
            required : true, 
            unique : true
        },
        Status :{
            type : String,
            default : "Pending"
        },
        Description :{
            type : Text,
        },
        Priority: {
            type : String,
            required : true,
            default : "Low"
        },
        Deadline : {
            type : Date
        },
        Date_Created :{
            type : Date
        }
    }, {timestamps : true}
)

export const Task = mongoose.model("Task",taskSchema)  