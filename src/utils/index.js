import dotenv from "dotenv";
import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
import express from "express";

dotenv.config({
    path : 'src/.env'
})
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("DB_NAME:", DB_NAME);

const app= express();

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