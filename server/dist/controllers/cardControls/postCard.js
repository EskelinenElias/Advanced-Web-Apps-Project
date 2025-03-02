"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("../../models/board");
const column_1 = require("../../models/column");
const card_1 = require("../../models/card");
async function postColumn(req, res) {
    try {
        // Validate user data
        if (!req.user || !req.user._id) {
            // Failure: invalid request
            console.error("Invalid request: invalid user data", req.user);
            res.status(400).json({ message: 'Invalid request' });
            return;
        }
        // Validate the request
        if (!req.params.boardId || !req.params.columnId) {
            // Failure: invalid request
            console.error("Invalid request: can't GET board, board id not provided", req.params);
            res.status(400).json({ message: 'Invalid request' });
            return;
        }
        // Parse the request
        const { boardId, columnId } = req.params;
        const userId = req.user._id;
        const { _id, title, body } = req.body;
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
        // Find the column by id
        const column = await column_1.Column.findById(columnId);
        if (!column) {
            // Failure: column not found
            console.error("Can't add card: column not found");
            res.status(404).json({ message: "Column not found" });
            return;
        }
        // Create new card
        const newCard = new card_1.Card({ title, body });
        await newCard.save();
        // Add the card to the column
        column.cards.push(newCard);
        await column.save();
        // Success: column added
        res.status(200).json({ message: "Success", card: newCard });
        return;
    }
    catch (error) {
        // Failure: unknown error
        console.error("Unknown error", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}
exports.default = postColumn;
