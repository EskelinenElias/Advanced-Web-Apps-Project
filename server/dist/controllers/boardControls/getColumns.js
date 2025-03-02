"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("../../models/board");
const column_1 = require("../../models/column");
// Function to get a board by id
async function getBoard(req, res) {
    try {
        // Validate the request
        if (!req.user || !req.user._id || !req.user.username) {
            console.error("Invalid request: invalid user data", req.user);
            res.status(400).json({ message: 'Invalid request' });
            return;
        }
        if (!req.params) {
            console.error("Invalid request: can't GET board, board id not provided", req.params);
            res.status(400).json({ message: 'Invalid request' });
            return;
        }
        // Parse the request
        const boardId = req.params.boardId;
        const userId = req.user._id;
        // Find board by board id
        const board = await board_1.Board.findOne({ _id: boardId });
        if (!board) {
            // Failure: board not found
            console.log(`Board ${boardId} not found.`);
            res.status(404).json({ message: "Board not found" });
            return;
        }
        // Board found; check that the user can access the board
        if (!(board.users.some((id) => id.toString() === userId))) {
            // Failure: user has no rights to access board
            console.log(`User has no rights to access board`);
            res.status(403).json({ message: "Can't access board" });
            return;
        }
        // User can access board; get board columns
        column_1.Column.
            // Success: return board
            res.status(200).json({ board: board, message: "Board found" });
        return;
    }
    catch (error) {
        // Failure: unknown error
        console.error("Error fetching user's boards:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}
exports.default = getBoard;
