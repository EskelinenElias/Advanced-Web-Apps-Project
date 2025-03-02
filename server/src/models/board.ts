import { Document, Schema, model, Types } from "mongoose";
import { IUser } from "./user"; 
import { Column, IColumn } from "./column";

interface IBoard extends Document {
  _id: Types.ObjectId; 
  name: string; 
  users: IUser[]; 
  columns: IColumn[]; 
}

const BoardSchema = new Schema<IBoard>({
  name: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
  columns: [{ type:Schema.Types.ObjectId, ref: 'Column' }],
});

BoardSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  console.log(`Deleting columns for board ${this._id}`);
  await Column.deleteMany({ boardId: this._id });
  next();
});

const Board = model<IBoard>("Board", BoardSchema);

export { Board, IBoard };