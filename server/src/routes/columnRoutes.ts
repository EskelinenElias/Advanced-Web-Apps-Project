import { Router } from "express";
import { authenticate } from "../middleware/auth";
import deleteColumn from "../controllers/columnControls/deleteColumn";
import updateColumn from "../controllers/columnControls/updateColumn";
import getColumn from "../controllers/columnControls/getColumn";
import postColumn from "../controllers/columnControls/postColumn";

const router = Router();

// POST route to create a new column
router.post("/boards/:boardId/columns/", authenticate, postColumn);

// GET route to get a column by if
router.get('/boards/:boardId/columns/:columnId', authenticate, getColumn);

// PUT route to update a column by id
router.put('/boards/:boardId/columns/:columnId', authenticate, updateColumn); 

// DELETE route to delete a column by id
router.delete('/boards/:boardId/columns/:columnId', authenticate, deleteColumn); 

export default router; 