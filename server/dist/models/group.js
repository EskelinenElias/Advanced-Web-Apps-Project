"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const mongoose_1 = require("mongoose");
const GroupSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    cards: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Card' }]
});
const Group = (0, mongoose_1.model)("Groups", GroupSchema);
exports.Group = Group;
