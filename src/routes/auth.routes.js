import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.models";

const router = express.Router();

// Registration Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Username or Email already exists" });
    } else {
      res.status(500).json({ message: "Error registering user" });
    }
  }
});

module.exports = router;
