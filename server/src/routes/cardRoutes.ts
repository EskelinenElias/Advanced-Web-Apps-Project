import { Router } from "express";
import { authenticate } from "../middleware/auth";
import deleteCard from "../controllers/cardControls/deleteCard";
import updateCard from "../controllers/cardControls/updateCard";
import getCard from "../controllers/cardControls/getCard";
import postCard from "../controllers/cardControls/postCard";

const router = Router();

// POST route to create a new card
router.post("/boards/:boardId/columns/:columnId/cards", authenticate, postCard);

// GET route to get a card by if
router.get('/boards/:boardId/columns/:columnId/cards/:cardId', authenticate, getCard);

// PUT route to update a card by id
router.put('/boards/:boardId/columns/:columnId/cards/:cardId', authenticate, updateCard); 

// DELETE route to delete a card by id
router.delete('/boards/:boardId/columns/:columnId/cards/:cardId', authenticate, deleteCard); 

export default router; 