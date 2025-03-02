"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("../models/board");
{
    try {
        // Parse the request
        const board = req.body;
        console.log("Board", board);
        // Validate the request
        if (!board) {
            console.error("Failed to edit board: invalid request", board);
            res.status(400).json({ message: 'Invalid request' });
            return;
        }
        // Update the database
        const updatedBoard = await board_1.Board.findByIdAndUpdate(board._id, { name: board.name, users: board.users, columns: board.columns, cards: board.cards }, { new: true } // Return the updated document
        );
        console.log("Upadted", updatedBoard);
    }
    catch (error) {
        // Failure: unknown error
        console.error("Unknown error", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}
;
async (req, res) => {
    try {
        // Parse the request
        const board = req.body;
        console.log("Board", board);
        // Validate the request
        if (!board) {
            console.error("Failed to edit board: invalid request", board);
            res.status(400).json({ message: 'Invalid request' });
            return;
        }
        // Update the database
        const updatedBoard = await board_1.Board.findByIdAndUpdate(board._id, { name: board.name, users: board.users, columns: board.columns, cards: board.cards }, { new: true } // Return the updated document
        );
        console.log("Upadted", updatedBoard);
    }
    catch (error) {
        // Failure: unknown error
        console.error("Unknown error", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
;
