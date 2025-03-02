import { Stack, Typography, MenuItem, Divider } from "@mui/material"; 
import { IconButton } from "@mui/material"; 
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from "@mui/icons-material/Delete";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import EditableTextField from "./EditableTextField";
import DropdownMenu from "./DropdownMenu";
import IColumn from "../interfaces/column";
import ICard from "../interfaces/card";
import SortableColumnCard from "./SortableColumnCard";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface SortableColumnProps {
  column: IColumn; 
  moveLeft: (column: IColumn) => Promise<void>;
  moveRight: (column: IColumn) => Promise<void>;
  updateColumn: (updated: IColumn) => Promise<void>; 
  deleteColumn: (deleted: IColumn) => Promise<void>;
  postCard: (columnId: string) => Promise<void>;
  updateCard: (updated: ICard) => Promise<void>;
  deleteCard: (deleted: ICard) => Promise<void>;
}

function SortableColumn(props: SortableColumnProps) {
  const { column, moveLeft, moveRight, updateColumn, deleteColumn, postCard, updateCard, deleteCard } = props; 
  return (
    <Stack spacing={2} direction="column" boxSizing="border-box" sx={{ height: "100%", width: {xs: "65dvw", sm: "55dvw", md:"45dvw", lg:"35dvw", xl: "25dvw"}, margin: "1rem" }}>
      {/* Column title */}
      <Stack direction="row" justifyContent="space-between">
        <EditableTextField text={column.name} textVariant="h3" editCallback={(newName) => updateColumn({ ...column, name: newName })} />
        <DropdownMenu>
          <MenuItem onClick={() => deleteColumn(column)}>
            <DeleteIcon />
            Delete Column
          </MenuItem>
          <Divider/>
          <MenuItem onClick={() => moveLeft(column)}>
            <KeyboardArrowLeftIcon />
            Move left
          </MenuItem>
          <MenuItem onClick={() => moveRight(column)}>
            <KeyboardArrowRightIcon />
            Move right
          </MenuItem>
        </DropdownMenu>
      </Stack>

      {/* Sortable Context for Cards */}
      <SortableContext items={column.cards.map((card) => card._id)} strategy={verticalListSortingStrategy}>
        {column.cards.map((card) => (
          <SortableColumnCard key={card._id} id={card._id} card={card} 
            updateCard={updateCard} 
            deleteCard={deleteCard} 
          />
        ))}
      </SortableContext>

      {/* Add new card button */}
      <IconButton size="large" onClick={() => postCard(column._id)} sx={{ borderRadius: "8px", border: "solid 1px", borderColor: "divider" }}>
        <AddIcon />
        <Typography variant="h3">Add a card</Typography>
      </IconButton>
    </Stack>
  );
}

export default SortableColumn;