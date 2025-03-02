"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("../../models/board");
const column_1 = require("../../models/column");
async function deleteColumn(req, res) {
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
        const { boardId, columnId } = req.params;
        const userId = req.user._id;
        // Find board by board id
        const board = await board_1.Board.findById(boardId);
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
        // Delete the column
        await column_1.Column.findByIdAndDelete(columnId);
        // Update board columns
        board.columns = board.columns.filter((id) => id.toString() !== userId);
        await board.save();
        // Success: column deleted
        res.status(200).json({ message: "Success" });
        return;
    }
    catch (error) {
        // Failure: unknown error
        console.error("Unknown error", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}
exports.default = deleteColumn;
