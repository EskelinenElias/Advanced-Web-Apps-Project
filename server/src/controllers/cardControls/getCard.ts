import { Response } from "express";
import { CustomRequest } from "../../middleware/auth";
import { Board } from "../../models/board";
import { Column } from "../../models/column"; 
import { Card } from "../../models/card"; 


async function getCard(req: CustomRequest, res: Response) {
  try {
    
    // Validate user data
    if (!req.user || !req.user._id || !req.user.username) {
      
      // Failure: invalid user data
      console.error("Invalid request: invalid user data", req.user);
      res.status(400).json({ message: 'Invalid request' });
      return;
    } 
    
    // Validate the request
    if (!req.params) {
      
      // Failure: invalid request parameters
      console.error("Invalid request: invalid request parameters", req.params); 
      res.status(400).json({ message: 'Invalid request' }); 
      return; 
    }
    
    // Parse the request
    const { boardId, columnId, cardId } = req.params;  
    const userId = req.user._id; 
    const { name } = req.body; 
    
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
    
    // Get column by id
    const card = await Card.findById(cardId);
    
    // Check if column was found
    if (!card) {
      
      // Failure: column not found
      console.log("Can't GET card: card not found")
      res.status(404).json({ message: "Column not found" });
      return; 
    }
    
    // Success: column found
    res.status(200).json({ message: "Card found", card: card }); 
    return; 
    
  } catch(error) {
    
    // Failure: unknown error
    console.error("Unknown error", error)
    res.status(500).json({ message: "Internal server error" }); 
    return; 
  }
} 

export default getCard; 