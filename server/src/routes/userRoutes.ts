import { Router, Request, Response, NextFunction } from "express";
import { authenticate, CustomRequest } from "../middleware/auth";
import getBoards from "../controllers/getBoards";

const router = Router();

// GET route to get all user's boards
router.get("/boards", authenticate, getBoards); 

export default router;