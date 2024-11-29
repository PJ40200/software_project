import express from "express";
import Task from "../models/tasks.models.js";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

const taskrouter = express.Router();

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user; // Attach user info from token
    next();
  });
};

// Add Task
taskrouter.post("/tasks", authenticateToken, async (req, res) => {
  const { title, description, priority, deadline,status} = req.body;



  try {
    const task = new Task({
      title,
      description,
      priority,
      deadline,
      status,
      userId: req.user.id, // Extracted from JWT token
    });
    console.log("Received Task Data:", req.body);

    await task.save();

    // Optionally add task to the user's task list
    const user = await User.findById(req.user.id);
    user.tasks.push(task._id);
    await user.save();

    res.status(201).json({ message: "Task added successfully", task });
  } catch (error) {
    console.error("Error adding task:", error.message);
    res.status(500).json({ error: "An error occurred while adding this new task" });
  }
});

// Get Tasks for a User
taskrouter.get("/tasks", authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
});

export default taskrouter;
