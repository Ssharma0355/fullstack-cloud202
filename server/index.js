const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/userModel");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// API Routes
app.post("/api/user", async (req, res) => {
  try {
    const userData = new User(req.body);
    const savedUser = await userData.save();
    res.status(201).json({ message: "User saved", data: savedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving user", error: error.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Users fetched", data: users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

module.exports = app; // Export app for Vercel
