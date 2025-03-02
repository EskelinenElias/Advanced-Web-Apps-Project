"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const deleteCard_1 = __importDefault(require("../controllers/cardControls/deleteCard"));
const updateCard_1 = __importDefault(require("../controllers/cardControls/updateCard"));
const getCard_1 = __importDefault(require("../controllers/cardControls/getCard"));
const postCard_1 = __importDefault(require("../controllers/cardControls/postCard"));
const router = (0, express_1.Router)();
// POST route to create a new card
router.post("/boards/:boardId/columns/:columnId/cards", auth_1.authenticate, postCard_1.default);
// GET route to get a card by if
router.get('/boards/:boardId/columns/:columnId/cards/:cardId', auth_1.authenticate, getCard_1.default);
// PUT route to update a card by id
router.put('/boards/:boardId/columns/:columnId/cards/:cardId', auth_1.authenticate, updateCard_1.default);
// DELETE route to delete a card by id
router.delete('/boards/:boardId/columns/:columnId/cards/:cardId', auth_1.authenticate, deleteCard_1.default);
exports.default = router;
