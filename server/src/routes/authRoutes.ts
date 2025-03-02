import { Router, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/user";

const router = Router();

// POST route to register a new user
router.post("/register", async (req: Request, res: Response) => {
  try {
    
    // Parse request 
    const { username, password } = req.body; 
    
    // Validate request
    if (typeof username !== 'string' || typeof password !== 'string') {
      res.status(400).json({ message: `Invalid request.` }); 
      return; 
    } else if (!username || !password) {
      res.status(400).json({ message: `Invalid request.` }); 
      return; 
    }
    
    // Check if a user with the given username already exists in the database
    const existingUser: IUser | null = await User.findOne({username: req.body.username})
    if (existingUser) {
      
      // Failure: user already exists
      res.status(403).json({ username: `User '${req.body.username}' already exists.` }); 
      return;
    }
    
    // Hash the password
    const salt: string = bcrypt.genSaltSync(10)
    const hash: string = bcrypt.hashSync(req.body.password, salt)
    
    // Create new user
    if (process.env.BEHAVIOUR !== "TEST_ROUTES") {
      await User.create({
        username: req.body.username,
        password: hash
      });
    }
    
    // Success; new user registered
    res.status(200).json({message: "User registered successfully"})
    return; 
  } catch (error) {
    console.error(`Error during registration: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
    return; 
  }
}); 

// POST route to login as a registered user
router.post("/login", async (req: Request, res: Response) => {
    try {
      
      // Parse the request
      const { username, password } = req.body; 
      
      // Validate request
      if (typeof username !== 'string' || typeof password !== 'string') {
        res.status(400).json({ message: `Invalid request.` }); 
        return; 
      } else if (!username || !password) {
        res.status(400).json({ message: `Invalid request.` }); 
        return; 
      }
      
      // Check if user is registered in the database
      const existingUser = await User.findOne({ username: req.body.username });
      if (!existingUser) {
        
        // Failure: user not registered
        res.status(403).json({ username: `User '${username}' not found.` }); 
        return;
      }
    
      // Check if the password is correct
      const correctPassword = await bcrypt.compare(password, existingUser.password);
      if (!correctPassword) {
        
        // Failure: incorrect password
        res.status(401).json({ message: "Incorrect password" });
        return;
      }
      
      // Generate a token
      const token: string = jwt.sign(
        { _id: existingUser._id, username: existingUser.username },
        process.env.SECRET as string,
        { expiresIn: "4h" }
      );
      
      // Success; respond with the token
      res.status(200).json({ token, username: username });
    } catch(error) {
      
      // Failure; unknown error
      console.error(error)
      res.status(500).json({ message: "Internal server error." }); 
    }
  }
);

// GET route to list all registered users
router.get("/users", async (req: Request, res: Response) => {
  try {
    
    // Get all registered users
    const users = await User.find({});
    
    // Success: return all registered users
    res.status(200).json({ users });
    return
    
  } catch (error) {
    
    // Failure; unknown error
    console.error(error)
    res.status(500).json({ message: "Internal server error." });
    return;
  }
}); 

export default router;