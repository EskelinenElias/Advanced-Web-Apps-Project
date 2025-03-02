"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoard = void 0;
const user_1 = require("../models/user");
const board_1 = require("../models/board");
// Function to delete a board by id
async (req, res) => {
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
        const { boardId } = req.params;
        const { username, userId } = req.user;
        // Validate the request
        if (!boardId) {
            console.error("Invalid request: can't delete board, board id not provided");
            res.status(400).json({ message: 'Invalid request' });
            return;
        }
        // Check if the user can delete the board 
        const user = user_1.User.findOne({ _id: userId });
        if (!user) {
            // Failure; user not found
            console.error("Can't delete board: user not found");
            res.status(404).json({ message: "Can't delete board: user not found" });
            return;
        }
        // Find the board to delete
        const boardToDelete = await board_1.Board.findOne({ _id: boardId });
        if (!boardToDelete) {
            console.error("Can't delete board: board not found");
            res.status(404).json({ message: "Can't delete board: board not found" });
            return;
        }
        // Delete the board from its user's boards
        await user_1.User.updateMany({ _id: boardToDelete._id }, { $pull: { boards: boardToDelete._id } });
        // Delete the board
        await board_1.Board.deleteOne({ _id: boardId });
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
};
