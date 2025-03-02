"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("../../models/board");
// Function to delete a board by id
async function deleteBoard(req, res) {
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
        const { boardId } = req.params;
        const userId = req.user._id;
        // Find the board by id
        const board = await board_1.Board.findOne({ _id: boardId });
        if (!board) {
            // Failure: board not found
            console.error("Can't delete board: board not found");
            res.status(404).json({ message: "Can't delete board: board not found" });
            return;
        }
        // Check if the user has access to the board 
        if (!(board.users.some((id) => id.toString() === userId))) {
            // Failure: user has no rights to access board
            console.log(`User has no rights to access board`);
            res.status(401).json({ message: "Can't access board" });
            return;
        }
        // Check if user is the last remaining user
        if (board.users.length > 1) {
            // Other users have access to the board: remove access of the user
            board.users = board.users.filter((id) => id.toString() !== userId);
            await board.save();
        }
        else {
            // Delete the board completely
            await board.deleteOne();
            await board.save();
        }
        // Success: successfully deleted board
        res.status(200).json({ message: "Board deleted." });
        return;
    }
    catch (error) {
        // Failure: unknown error
        console.error("Unknown error", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}
exports.default = deleteBoard;
