import { Response } from "express";
import { CustomRequest } from "../../middleware/auth";
import { Board } from "../../models/board";
import { IColumn } from "../../models/column";

async function updateBoard(req: CustomRequest, res: Response) {
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
      console.error("Invalid request: can't GET board, board id not provided", req.params); 
      res.status(400).json({ message: 'Invalid request' }); 
      return; 
    }
    
    // Parse the request
    const boardId = req.params.boardId; 
    const userId = req.user._id; 
    console.log("Body", req.body)
    const { _id, name, users, columns } = req.body; 
    
    // Find board by board id
    const board = await Board.findById(boardId);
    if (!board) {
      
      // Failure: board not found
      console.log(`Board ${boardId} not found.`); 
      res.status(404).json({ message: "Board not found" }); 
      return; 
    }
    
    // Board found; check that the user can access the board
    if (!(board.users.some((id) => id.toString() === userId.toString()))) {
      
      // Failure: user has no rights to access board
      console.log(`User has no rights to access board`); 
      res.status(403).json({ message: "Can't access board" }); 
      return; 
    }
    
    // Update board name and board users
    board.name = name || board.name; 
    if (users) {
      board.users = users.some((id: string) => id.toString() === userId.toString()) ? users : board.users;
    }
    if (columns.lenght > 0) {
      board.columns = columns.map((column: IColumn) => column._id); 
    }
    await board.save();
    
    // Success: board updated
    res.status(200).json({ message: "Success", board: board }); 
    return; 
  } catch(error) {
    
    // Failure: unknown error
    console.error("Unknown error", error)
    res.status(500).json({ message: "Internal server error" }); 
    return; 
  }
} 

export default updateBoard; 