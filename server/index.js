const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./models/userModel");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Define PORT for API testing

// Middleware
app.use(express.json());
// app.use(cors());
// const cors = require("cors");
app.use(cors({ origin: "*" })); // Allow all origins


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// API Route
app.post("/api/user", async (req, res) => {
  try {
    const userData = new User(req.body);
    const savedUser = await userData.save();
    res.status(201).json({ message: "User saved", data: savedUser });
  } catch (error) {
    console.error("Error saving user:", error.message);
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
    console.error("Error fetching users:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

