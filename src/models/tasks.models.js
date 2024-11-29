import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
      default: "Low",
    },
    deadline: {
      type: Date,
    },
    status: {
        type: String,
        enum : ["completed","pending"],
        default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;

