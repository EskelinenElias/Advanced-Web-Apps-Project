import { Response } from "express";
import { CustomRequest } from "../../middleware/auth";
import { Board } from "../../models/board";
import { Card } from "../../models/card"; 

async function updateCard(req: CustomRequest, res: Response) {
  try {
    
    // Validate user data
    if (!req.user || !req.user._id) {
      
      // Failure: invalid user data
      console.error("Invalid request: invalid user data", req.user);
      res.status(400).json({ message: 'Invalid request' });
      return;
    } 
    
    // Validate request parameters
    if (!req.params) {
      
       // Failure: invalid request parameters
      console.error("Invalid request: can't GET board, board id not provided", req.params); 
      res.status(400).json({ message: 'Invalid request' }); 
      return; 
    }
    
    // Parse the request
    const { boardId, columnId, cardId } = req.params; 
    const userId = req.user._id; 
    const { _id, body, title } = req.body; 
    
    // Find board by board id
    const board = await Board.findById(boardId);
    if (!board) {
      
      // Failure: board not found
      console.log(`Board ${boardId} not found.`); 
      res.status(404).json({ message: "Board not found" }); 
      return; 
    }
    
    // Board found; check that the user can access the board
    if (!(board.users.some((id) => id.toString() === userId))) {
      
      // Failure: user has no rights to access board
      console.log(`User has no rights to access board`); 
      res.status(403).json({ message: "Can't access board" }); 
      return; 
    }
    
    // Find card by id
    const card = await Card.findById(cardId);
    if (!card) {
      
      // Failure: column not founc
      console.log("Can't update card: card not found")
      res.status(404).json({ message: "Card not found" });
      return; 
    }
    
    // Update card
    card.title = title || card.title; 
    card.body = body || card.body; 
    card.save()
    
    // Success: column updated
    res.status(200).json({ message: "Card updated", card: card }); 
    return; 
    
  } catch(error) {
    
    // Failure: unknown error
    console.error("Unknown error", error)
    res.status(500).json({ message: "Internal server error" }); 
    return; 
  }
} 

export default updateCard; 