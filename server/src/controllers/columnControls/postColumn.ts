import { Request, Response } from "express";
import { CustomRequest } from "../../middleware/auth";
import { User } from "../../models/user"; 
import { Board } from "../../models/board";
import { Column, IColumn } from "../../models/column"; 

async function postColumn(req: CustomRequest, res: Response) {
  try {
    
    // Validate user data
    if (!req.user || !req.user._id || !req.user.username) {
      
      // Failure: invalid request
      console.error("Invalid request: invalid user data", req.user);
      res.status(400).json({ message: 'Invalid request' });
      return;
    } 
    
    // Validate the request
    if (!req.params.boardId) {
      
       // Failure: invalid request
      console.error("Invalid request: can't POST column, board id not provided", req.params); 
      res.status(400).json({ message: 'Invalid request' }); 
      return; 
    }
    
    // Parse the request
    const boardId = req.params.boardId; 
    const userId = req.user._id; 
    const name = req.body.name; 
    const cards = req.body.cards; 

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
    
    // Create new column
    const newColumn: IColumn = new Column({name, cards});
    await newColumn.save();
    
    // Update board columns
    board.columns.push(newColumn)
    await board.save()  
    
    // Success: column added
    res.status(200).json({ message: "Success", column: newColumn }); 
    return; 
  } catch(error) {
    
    // Failure: unknown error
    console.error("Unknown error", error)
    res.status(500).json({ message: "Internal server error" }); 
    return; 
  }
} 

export default postColumn; 