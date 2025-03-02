import ICard from "./card";

interface IColumn {
  _id: string,
  name: string, 
  cards: ICard[]
}

export default IColumn; 