"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../config/auth");
const router = (0, express_1.Router)();
// GET route to fetch a board
router.get("/boards/:boardId", auth_1.authenticate, async (req, res) => {
});
exports.default = router;
