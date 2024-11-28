import express from "express";
import mongoose from "mongoose";
import router from "./routes/auth.routes.js";
import dotenv from "dotenv";

dotenv.config({
    path : './.env'
})

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.static("public")); // Serve static files (e.g., HTML, CSS, JS)

// Routes
app.use("/api", router);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
