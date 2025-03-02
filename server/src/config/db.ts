import mongoose, { Connection } from "mongoose";

async function connectToDB(address: string): Promise<Connection> {
  try {
    // Connect to database
    const db = await mongoose.connect(address);
    return db.connection; 
  } catch (error) {
    // Log error and throw new database connection error
    console.error(error)
    throw new Error(`Failed to connect to database at ${address}`); 
  }
};

export default connectToDB;
