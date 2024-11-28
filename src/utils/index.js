import dotenv from "dotenv";
import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
import express from "express";
import User from "../models/user.models.js";
import Task from "../models/tasks.models.js";
import pasth from "path";
import bcrypt from "bcrypt";
import app from "../app.js";

dotenv.config({
    path : 'src/.env'
})
// console.log("MONGODB_URI:", process.env.MONGODB_URI);
// console.log("DB_NAME:", DB_NAME);
// index.js

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*
const app= express();

app.get('/',(req,res) => {
  res.render("login");
})
app.get('/signup',(req,res) => {
  res.render("signup");
})

app.listen(PORT,() => {
  console.log("Server running on PORT ${PORT}");
})
*/
/*
( async () => {
    try{
        const mongoURI = `${process.env.MONGODB_URI}/${DB_NAME}`;
        console.log(mongoURI);
        
        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.on("error", (error) => {
            console.error("App encountered an error:", error);
            throw error;
          });
        console.log("Connected to MongoDB successfully");
        app.listen(process.env.PORT, () => {
            console.log("App is listening on PORT = ${process.env.PORT}");
        })
    }
    catch(error){
        console.error("ERROR : ", error.message);
        process.exit(1);
    }
} )()


// Middleware for parsing JSON
app.use(express.json());

// Sample endpoint: Add a new user
app.post("/add-user", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Error creating user", error: error.message });
  }
});

// Sample endpoint: Add a new task
app.post("/add-task", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).send({ message: "Error creating task", error: error.message });
  }
});

export default app; */