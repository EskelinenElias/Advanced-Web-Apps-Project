import { Request, Response } from "express";
import { CustomRequest } from "../../middleware/auth";
import { User } from "../../models/user"; 
import { Board } from "../../models/board";
import { Column } from "../../models/column"; 
import { Card } from "../../models/card";

async function deleteColumn(req: CustomRequest, res: Response) {
  try {
    
    // Validate user data
    if (!req.user || !req.user._id || !req.user.username) {
      
      // Failure: invalid request
      console.error("Invalid request: invalid user data", req.user);
      res.status(400).json({ message: 'Invalid request' });
      return;
    } 
    
    // Validate the request
    if (!req.params) {
      
       // Failure: invalid request
      console.error("Invalid request: can't GET board, board id not provided", req.params); 
      res.status(400).json({ message: 'Invalid request' }); 
      return; 
    }
    
    // Parse the request
    const { boardId, columnId, cardId } = req.params;
    const userId = req.user._id; 
    
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
    
    // Find the column and delete the card from the column cards
    const column = await Column.findById(columnId);
    if (column) {
      column.cards = column.cards.filter(card => card._id.toString() !== cardId);
    }
    
    // Delete the card
    await Card.findByIdAndDelete(cardId);
    
    // Update board columns
    board.columns = board.columns.filter((id) => id.toString() !== userId);
    await board.save()  
    
    // Success: column deleted
    res.status(200).json({ message: "Success" }); 
    return; 
  } catch(error) {
    
    // Failure: unknown error
    console.error("Unknown error", error)
    res.status(500).json({ message: "Internal server error" }); 
    return; 
  }
} 

export default deleteColumn; 