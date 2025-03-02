"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("../models/board");
async function postBoard(req, res) {
    try {
        // Validate user data
        if (!req.user || !req.user._id || !req.user.username) {
            // Failure: invalid request
            console.error("Invalid request: invalid user data", req.user);
            res.status(400).json({ message: 'Invalid request' });
            return;
        }
        // Validate the request
        if (!req.params) {
            // Failure: invalid request
            console.error("Invalid request: can't GET board, board id not provided", req.params);
            res.status(400).json({ message: 'Invalid request' });
            return;
        }
        // Parse the request
        const userId = req.user._id;
        const board = req.body;
        console.log("Board", req.body);
        // Create a new board
        const newBoard = await board_1.Board.create({
            name: board.name,
            users: [userId],
            columns: board.columns
        });
        // Check that board was created successfully
        if (!newBoard) {
            // Failure: failed to add board
            console.error("Failed to create a new board.");
            res.status(400).json({ message: "Internal server error" });
            return;
        }
        console.log("Board", newBoard);
        // Success: added new board
        res.status(200).json({ message: `Added new board`, board: newBoard });
        return;
    }
    catch (error) {
        // Failure: unknown error
        console.error("Unknown error", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}
exports.default = postBoard;
