import { CustomRequest } from "../middleware/auth";
import { Response, NextFunction } from "express";

function validateUser(req: CustomRequest, res: Response, next: NextFunction) {
  
  // Check user data
  if (!req.user || !req.user._id || !req.user.username) {
    
    // Failure: invalid request, invalid user data
    console.error("Invalid request: invalid user data", req.user);
    res.status(400).json({ message: 'Invalid request' });
    return false;
  }
  
  // Call next function
  next(); 
}

export default validateUser; 