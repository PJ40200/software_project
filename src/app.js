import express from "express";
import mongoose from "mongoose";
import router from "./routes/auth.routes.js";
import taskrouter  from "./routes/task.routes.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({
    path : 'src/.env'
})

const app = express();

// To get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static("public")); // Serve static files (e.g., HTML, CSS, JS)

// Routes
app.use("/api", router);
app.use("/api", taskrouter);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
