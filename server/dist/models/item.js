"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const mongoose_1 = require("mongoose");
const CardSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    body: [{ type: String, required: false }]
});
const Card = (0, mongoose_1.model)("Card", CardSchema);
exports.Card = Card;
