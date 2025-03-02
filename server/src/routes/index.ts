import { Router } from "express";
import authRoutes from './authRoutes'; 
import boardRoutes from './boardRoutes'; 
import userRoutes from './userRoutes'; 
import columnRoutes from './columnRoutes'; 
import cardRoutes from './cardRoutes'; 
import combinationRoutes from './combinationRoutes'; 

// Create router
const router = Router();

// Add routes
router.use("/", authRoutes); 
router.use("/user", boardRoutes); 
router.use("/user", columnRoutes)
router.use("/user", cardRoutes)
router.use("/user", combinationRoutes); 
router.use('/user', userRoutes); 

export default router;