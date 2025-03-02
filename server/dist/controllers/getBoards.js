"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("../models/board");
async function getBoards(req, res) {
    try {
        // Validate user data
        if (!req.user || !req.user._id || !req.user.username) {
            console.error("Invalid user data", req.user);
            res.status(400).json({ message: 'Invalid request' });
            return;
        }
        // Parse the request
        const userId = req.user._id;
        // Find the boards with the user 
        const boards = await board_1.Board.find({ users: userId });
        // Check if boards were found
        if (!boards) {
            // Failure: no boards were found
            console.log(`No boards found for user ${userId}`);
            res.status(404).json({ message: "No boards found" });
            return;
        }
        console.log("Boards", boards);
        // Success: boards found
        res.status(200).json({ message: "Boards found.", boards: boards });
        return;
    }
    catch (error) {
        // Failure: unknown error
        console.error("Error fetching user's boards:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}
exports.default = getBoards;
