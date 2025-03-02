import { Document, Schema, model, Types } from "mongoose";
import { Card, ICard } from "./card";

interface IColumn extends Document {
  _id: Types.ObjectId; 
  name: string;
  cards: ICard[]; 
}

const ColumnSchema = new Schema<IColumn>({
  name: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
});

const Column = model<IColumn>("Column", ColumnSchema);

ColumnSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  console.log(`Deleting cards for column ${this._id}`);
  await Card.deleteMany({ columnId: this._id }); 
  next();
});

export { Column, IColumn };