import { Request, Response } from "express";
import { CustomRequest } from "../../middleware/auth";
import { User } from "../../models/user"; 
import { Board } from "../../models/board";
import { Column } from "../../models/column"; 

async function postBoard(req: CustomRequest, res: Response) {
  try {
    
    // Validate user data
    if (!req.user || !req.user._id || !req.user.username) {
      
      // Failure: invalid request
      console.error("Invalid request: invalid user data", req.user);
      res.status(400).json({ message: 'Invalid request' });
      return;
    } 
    
    // Parse the request
    const userId = req.user._id; 
    const board = req.body; 
    console.log("Board", req.body)
    
    // Create a new board
    const newBoard = await Board.create({
      name: board.name || "New Board",
      users: [userId],
      columns: board.columns || []
    });
    
    // Check that board was created successfully
    if (!newBoard) {
      
      // Failure: failed to add board
      console.error("Failed to create a new board."); 
      res.status(400).json({ message: "Internal server error" }); 
      return; 
    }
    
    console.log("Board", newBoard); 
      
    // Success: added new board
    res.status(200).json({ message: `Added new board`, board: newBoard }); 
    return; 
      
  } catch (error) {
    
    // Failure: unknown error
    console.error("Unknown error", error)
    res.status(500).json({ message: "Internal server error" }); 
    return; 
  }
}

export default postBoard; 