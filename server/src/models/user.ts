import { Document, Schema, model, Types } from "mongoose";
import { IBoard } from "./board";

interface IUser extends Document {
  _id: Types.ObjectId; 
  username: string;
  password: string;
  
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", UserSchema);

export { User, IUser };