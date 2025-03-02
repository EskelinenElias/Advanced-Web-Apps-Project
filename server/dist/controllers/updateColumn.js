"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("../models/board");
const column_1 = require("../models/column");
async function postColumn(req, res) {
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
        const board = await board_1.Board.findById(_id);
        if (!board) {
            // Failure: board not found
            console.log(`Board ${_id} not found.`);
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
        // Update board name and board users
        board.name = name || board.name;
        board.users = users || board.users;
        // Get the current column IDs from the board
        const existingColumnIds = board.columns.map((columnId) => columnId.toString());
        // Get the new column IDs from the request body
        const newColumnIds = columns
            .filter((column) => column._id)
            .map((column) => column._id.toString());
        // Find columns that were removed
        const columnsToRemove = existingColumnIds.filter((columnId) => !newColumnIds.includes(columnId));
        // Delete the removed columns from the database
        await column_1.Column.deleteMany({ _id: { $in: columnsToRemove } });
        // Update existing columns and add new columns
        const updatedColumnIds = [];
        for (const columnData of columns) {
            if (columnData._id) {
                // Update existing column
                await column_1.Column.findByIdAndUpdate(columnData._id, columnData);
                updatedColumnIds.push(columnData._id);
            }
            else {
                // Create new column
                const newColumn = new column_1.Column(columnData);
                await newColumn.save();
                updatedColumnIds.push(newColumn._id);
            }
        }
        // Update board columns
        board.columns = updatedColumnIds;
        // Update the database
        await board.save();
        // Success: board updated
        res.status(200).json({ message: "Success", board: board });
        return;
    }
    catch (error) {
        // Failure: unknown error
        console.error("Unknown error", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}
exports.default = updateBoard;
