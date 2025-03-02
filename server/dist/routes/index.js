"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const boardRoutes_1 = __importDefault(require("./boardRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const columnRoutes_1 = __importDefault(require("./columnRoutes"));
const cardRoutes_1 = __importDefault(require("./cardRoutes"));
const combinationRoutes_1 = __importDefault(require("./combinationRoutes"));
// Create router
const router = (0, express_1.Router)();
// Add routes
router.use("/auth", authRoutes_1.default);
router.use("/user", boardRoutes_1.default);
router.use("/user", columnRoutes_1.default);
router.use("/user", cardRoutes_1.default);
router.use("/user", combinationRoutes_1.default);
router.use('/user', userRoutes_1.default);
exports.default = router;
