"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const getBoardColumns_1 = __importDefault(require("../controllers/combinationControls/getBoardColumns"));
const getBoardColumnsCards_1 = __importDefault(require("../controllers/combinationControls/getBoardColumnsCards"));
const getColumnCards_1 = __importDefault(require("../controllers/combinationControls/getColumnCards"));
const getBoardUsers_1 = __importDefault(require("../controllers/combinationControls/getBoardUsers"));
const postBoardUser_1 = __importDefault(require("../controllers/combinationControls/postBoardUser"));
const router = (0, express_1.Router)();
// GET route to get a board and its columns
router.get("/boards/:boardId/columns", auth_1.authenticate, getBoardColumns_1.default);
// GET route to get a board and its columns wirh cards
router.get("/boards/:boardId/cards", auth_1.authenticate, getBoardColumnsCards_1.default);
// GET route to get a column its cards
router.get('/boards/:boardId/columns/:columnId/cards', auth_1.authenticate, getColumnCards_1.default);
// GET route to get board user's usernames
router.get('/boards/:boardId/users', auth_1.authenticate, getBoardUsers_1.default);
// POST route to add a user to board 
router.post('/boards/:boardId/users/:newUsername', auth_1.authenticate, postBoardUser_1.default);
exports.default = router;
