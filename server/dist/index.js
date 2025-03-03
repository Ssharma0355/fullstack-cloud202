"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
// API Route
app.post("/api/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = new User(req.body);
        const savedUser = yield userData.save();
        res.status(201).json({ message: "User saved", data: savedUser });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error saving user:", error.message);
        }
        else {
            console.error("Error saving user:", error);
        }
        res
            .status(500)
            .json({ message: "Error saving user", error: error instanceof Error ? error.message : "Unknown error" });
    }
}));
app.get("/api/users", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        res.status(200).json({ message: "Users fetched", data: users });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching users:", error.message);
        }
        else {
            console.error("Error fetching users:", error);
        }
        res
            .status(500)
            .json({ message: "Error fetching users", error: error instanceof Error ? error.message : "Unknown error" });
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
