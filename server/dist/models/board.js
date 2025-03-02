"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const mongoose_1 = require("mongoose");
const column_1 = require("./column");
const BoardSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    columns: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Column' }],
});
BoardSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    console.log(`Deleting columns for board ${this._id}`);
    await column_1.Column.deleteMany({ boardId: this._id });
    next();
});
const Board = (0, mongoose_1.model)("Board", BoardSchema);
exports.Board = Board;
