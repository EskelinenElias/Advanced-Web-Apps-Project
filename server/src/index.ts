import express, { Express, Request, Response } from "express";
import path from "path";
import morgan from 'morgan'; 
import dotenv from 'dotenv';
import router from "./routes";
import cors, { CorsOptions } from "cors"; 
import connectToDB from "./config/db";

// Configure environment
dotenv.config()

// Initialize app
const app: Express = express();

// Add middleware
app.use(express.json());
app.use(morgan("dev"));

// Add routing
app.use("/api", router);

// Confifure Cross-Origin Resource Sharing (CORS)
if (process.env.NODE_ENV === 'development') {
  console.log("Running in development mode")

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions)); 
} else if (process.env.NODE_ENV === 'production') {
  console.log("Running in production mode")
  // Serve static files from client/build
  app.use(express.static(path.resolve('..', 'client', 'dist'))); 
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve('..', 'client', 'dist', 'index.html'));
  }); 
} else {
  console.log("Running in other mode", process.env.NODE_ENV)
}

// Configure server settings
const host: string = "127.0.0.1";
const port: number = 2000;

// Serve static files
// app.use(express.static(path.join(__dirname, "../public")));

// Configure database settings
const dbAddress = "mongodb://127.0.0.1:27017/testdb";

// Connect to database
connectToDB(dbAddress).then(() => {
  console.log(`Connected to database at ${dbAddress}`);

  // Start the server
  app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
  });
});