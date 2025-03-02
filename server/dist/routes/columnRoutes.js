"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const deleteColumn_1 = __importDefault(require("../controllers/columnControls/deleteColumn"));
const updateColumn_1 = __importDefault(require("../controllers/columnControls/updateColumn"));
const getColumn_1 = __importDefault(require("../controllers/columnControls/getColumn"));
const postColumn_1 = __importDefault(require("../controllers/columnControls/postColumn"));
const router = (0, express_1.Router)();
// POST route to create a new column
router.post("/boards/:boardId/columns/", auth_1.authenticate, postColumn_1.default);
// GET route to get a column by if
router.get('/boards/:boardId/columns/:columnId', auth_1.authenticate, getColumn_1.default);
// PUT route to update a column by id
router.put('/boards/:boardId/columns/:columnId', auth_1.authenticate, updateColumn_1.default);
// DELETE route to delete a column by id
router.delete('/boards/:boardId/columns/:columnId', auth_1.authenticate, deleteColumn_1.default);
exports.default = router;
