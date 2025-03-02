"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const mongoose_1 = require("mongoose");
const card_1 = require("./card");
const ColumnSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    cards: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Card' }]
});
const Column = (0, mongoose_1.model)("Column", ColumnSchema);
exports.Column = Column;
ColumnSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    console.log(`Deleting cards for column ${this._id}`);
    await card_1.Card.deleteMany({ columnId: this._id });
    next();
});
