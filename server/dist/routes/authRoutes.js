"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
// POST route to register a new user
router.post("/register", async (req, res) => {
    try {
        // Parse request 
        const { username, password } = req.body;
        // Validate request
        if (typeof username !== 'string' || typeof password !== 'string') {
            res.status(400).json({ message: `Invalid request.` });
            return;
        }
        else if (!username || !password) {
            res.status(400).json({ message: `Invalid request.` });
            return;
        }
        // Check if a user with the given username already exists in the database
        const existingUser = await user_1.User.findOne({ username: req.body.username });
        if (existingUser) {
            // Failure: user already exists
            res.status(403).json({ username: `User '${req.body.username}' already exists.` });
            return;
        }
        // Hash the password
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
        // Create new user
        if (process.env.BEHAVIOUR !== "TEST_ROUTES") {
            await user_1.User.create({
                username: req.body.username,
                password: hash
            });
        }
        // Success; new user registered
        res.status(200).json({ message: "User registered successfully" });
        return;
    }
    catch (error) {
        console.error(`Error during registration: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
// POST route to login as a registered user
router.post("/login", async (req, res) => {
    try {
        // Parse the request
        const { username, password } = req.body;
        // Validate request
        if (typeof username !== 'string' || typeof password !== 'string') {
            res.status(400).json({ message: `Invalid request.` });
            return;
        }
        else if (!username || !password) {
            res.status(400).json({ message: `Invalid request.` });
            return;
        }
        // Check if user is registered in the database
        const existingUser = await user_1.User.findOne({ username: req.body.username });
        if (!existingUser) {
            // Failure: user not registered
            res.status(403).json({ username: `User '${username}' not found.` });
            return;
        }
        // Check if the password is correct
        const correctPassword = await bcryptjs_1.default.compare(password, existingUser.password);
        if (!correctPassword) {
            // Failure: incorrect password
            res.status(401).json({ message: "Incorrect password" });
            return;
        }
        // Generate a token
        const token = jsonwebtoken_1.default.sign({ _id: existingUser._id, username: existingUser.username }, process.env.SECRET, { expiresIn: "4h" });
        // Success; respond with the token
        res.status(200).json({ token, username: username });
    }
    catch (error) {
        // Failure; unknown error
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});
// GET route to list all registered users
router.get("/users", async (req, res) => {
    try {
        // Get all registered users
        const users = await user_1.User.find({});
        // Success: return all registered users
        res.status(200).json({ users });
        return;
    }
    catch (error) {
        // Failure; unknown error
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
        return;
    }
});
exports.default = router;
