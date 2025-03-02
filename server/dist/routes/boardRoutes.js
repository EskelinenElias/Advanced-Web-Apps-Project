"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const deleteBoard_1 = __importDefault(require("../controllers/boardControls/deleteBoard"));
const updateBoard_1 = __importDefault(require("../controllers/boardControls/updateBoard"));
const getBoard_1 = __importDefault(require("../controllers/boardControls/getBoard"));
const postBoard_1 = __importDefault(require("../controllers/boardControls/postBoard"));
const router = (0, express_1.Router)();
// POST route to create a new board
router.post("/boards", auth_1.authenticate, postBoard_1.default);
// GET route to get a board by id
router.get('/boards/:boardId', auth_1.authenticate, getBoard_1.default);
// PUT route to update a board by id
router.put('/boards/:boardId', auth_1.authenticate, updateBoard_1.default);
// DELETE route to delete a board by id
router.delete('/boards/:boardId', auth_1.authenticate, deleteBoard_1.default);
exports.default = router;
