import mongoose from "mongoose";

new taskSchema = mongoose.Schema(
    {
        Title :{
            type : String,
            required : true, 
            unique : true
        },
        Completed :{
            type : Boolean,
            default : false
        },
        Description :{
            type : Text,
        },
        Priority: {
            type : String,
            enum : ["Low","Medium","High"],
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