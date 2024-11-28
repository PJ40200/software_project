import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
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
            type : String,
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

const Task = mongoose.model("Task", taskSchema);
export default Task;
