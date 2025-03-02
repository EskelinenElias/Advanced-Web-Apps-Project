"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board_1 = require("../models/board");
const auth_1 = require("../config/auth");
const router = (0, express_1.Router)();
router.get("/user/:username/boards", auth_1.authenticate, async (req, res) => {
    try {
        // Validate user data
        if (!req.user || !req.user._id || !req.user.username) {
            console.error("Invalid user data", req.user);
            res.status(400).json({ message: 'Invalid request' });
            return;
        }
        // Parse the request
        const id = req.user._id;
        // Find the boards with the user 
        const boards = await board_1.Board.find({ users: id });
        res.status(200).json(boards);
        return;
    }
    catch (error) {
        console.error("Error fetching user's boards:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// GET route to fetch a board
router.get("/user/:username/boards/:boardId", auth_1.authenticate, async (req, res) => {
    try {
        // Validate user data
        if (!req.user || !req.user._id || !req.user.username) {
            console.error("Invalid user data", req.user);
            res.status(400).json({ message: 'Invalid request' });
            return;
        }
        // Parse the request
        const { boardId } = req.params;
        // Find the boards with the user 
        const board = await board_1.Board.findOne({ _id: boardId });
        if (!board) {
            // Failure: board not found
            console.log(`Board ${boardId} not found.`);
            res.status(404).json({ message: "Board not found" });
            return;
        }
        // Success: return board
        res.status(200).json({ board: board, message: "Board found" });
        return;
    }
    catch (error) {
        console.error("Error fetching user's boards:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = router;
