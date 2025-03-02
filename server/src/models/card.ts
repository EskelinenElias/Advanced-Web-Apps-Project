import { Document, Schema, model, Types } from "mongoose";

interface ICard extends Document {
  _id: Types.ObjectId,
  title: string,
  body: string
}

const CardSchema = new Schema<ICard>({
  title: { type: String, required: true },
  body: { type: String, required: false }
});

const Card = model<ICard>("Card", CardSchema);

export { Card, ICard };