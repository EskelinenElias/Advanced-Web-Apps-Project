"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const getBoards_1 = __importDefault(require("../controllers/getBoards"));
const router = (0, express_1.Router)();
// GET route to get all user's boards
router.get("/boards", auth_1.authenticate, getBoards_1.default);
exports.default = router;
