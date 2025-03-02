import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import ICard from '../interfaces/card';
import { Stack, MenuItem, Card, CardContent, CardActions } from "@mui/material"; 
import EditableTextField from "./EditableTextField";
import DropdownMenu from "./DropdownMenu";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface SortableColumnCardProps {
  id: string,
  card: ICard, 
  updateCard: (updated: ICard) => Promise<void>, 
  deleteCard: (deleted: ICard) => Promise<void>, 
}

function SortableColumnCard(props: SortableColumnCardProps) {
  const { id, card, updateCard, deleteCard } = props; 

  const { attributes, listeners, setNodeRef, transform, transition, } = useSortable({id: id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <Card ref={setNodeRef} sx={{ display: "flex", flexDirection: "column", gap: 1, ...style }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{background: 'none'}}>
          {/* Title */}
          <EditableTextField text={card.title} textVariant="h4" editCallback={(newTitle) => updateCard({ ...card, title: newTitle })} />
          {/* Drag Handle */}
          <DragIndicatorIcon {...attributes} {...listeners} sx={{ cursor: "grab", mr: 1 }} />
        </Stack>
        {/* Body */}
        <EditableTextField text={card.body} textVariant="body1" editCallback={(newBody) => updateCard({ ...card, body: newBody })} />
      </CardContent>
      {/* Tools */}
      <CardActions sx={{ justifyContent: "right" }}>
        {/* More Actions Button and Dropdown Menu */}
        <DropdownMenu>
          {/* Delete Card Button */}
          <MenuItem onClick={() => deleteCard(card)}><DeleteIcon />Delete Card</MenuItem>
        </DropdownMenu>
      </CardActions>
    </Card>
  );
}

export default SortableColumnCard; 