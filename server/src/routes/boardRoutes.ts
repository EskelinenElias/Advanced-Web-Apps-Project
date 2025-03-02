import { Router } from "express";
import { authenticate } from "../middleware/auth";
import deleteBoard from "../controllers/boardControls/deleteBoard";
import updateBoard from "../controllers/boardControls/updateBoard";
import getBoard from "../controllers/boardControls/getBoard";
import postBoard from "../controllers/boardControls/postBoard";

const router = Router();

// POST route to create a new board
router.post("/boards", authenticate, postBoard);

// GET route to get a board by id
router.get('/boards/:boardId', authenticate, getBoard);

// PUT route to update a board by id
router.put('/boards/:boardId', authenticate, updateBoard); 

// DELETE route to delete a board by id
router.delete('/boards/:boardId', authenticate, deleteBoard); 

export default router; 