import IColumn from "./column";

interface IBoard {
  _id: string;
  name: string;
  users: string[];
  columns: IColumn[]; 
}

export default IBoard; 