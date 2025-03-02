import { Router } from "express";
import { authenticate } from "../middleware/auth";
import getBoardColumns from "../controllers/combinationControls/getBoardColumns";
import getBoardColumnsCards from "../controllers/combinationControls/getBoardColumnsCards";
import getColumnCards from "../controllers/combinationControls/getColumnCards";
import getBoardUsers from "../controllers/combinationControls/getBoardUsers";
import postBoardUsers from "../controllers/combinationControls/postBoardUser";

const router = Router();

// GET route to get a board and its columns
router.get("/boards/:boardId/columns", authenticate, getBoardColumns);

// GET route to get a board and its columns wirh cards
router.get("/boards/:boardId/cards", authenticate, getBoardColumnsCards);

// GET route to get a column its cards
router.get('/boards/:boardId/columns/:columnId/cards', authenticate, getColumnCards); 

// GET route to get board user's usernames
router.get('/boards/:boardId/users', authenticate, getBoardUsers); 

// POST route to add a user to board 
router.post('/boards/:boardId/users/:newUsername', authenticate, postBoardUsers); 

export default router; 