"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("../models/board");
async function editBoard(req, res) {
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
        const { userId, username } = req.user;
        const { board } = req.body;
        // Update the database
        const updatedBoard = await board_1.Board.findByIdAndUpdate(board._id, { name: board.name, users: board.users, columns: board.columns }, { new: true } // Return the updated document
        );
    }
    catch (error) {
        // Failure: unknown error
        console.error("Unknown error", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}
exports.default = editBoard;
