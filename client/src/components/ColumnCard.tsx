import { MenuItem, Card, CardContent, CardActions } from "@mui/material"; 
import EditableTextField from "./EditableTextField";
import ICard from "../interfaces/card";
import DropdownMenu from "./DropdownMenu";
import DeleteIcon from "@mui/icons-material/Delete";

interface ColumnCardProps {
  cardKey: string,
  card: ICard, 
  updateCard: (updated: ICard) => Promise<void>, 
  deleteCard: (updated: ICard) => Promise<void>, 
}

function ColumnCard(props: ColumnCardProps) {
  const { cardKey, card, updateCard, deleteCard } = props; 
  return (
    <Card key={cardKey} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* Title */}
        <EditableTextField text={card.title} textVariant="h4" editCallback={(newTitle) => updateCard({ ...card, title: newTitle })} />
        {/* Body */}
        <EditableTextField text={card.body} textVariant="body1" editCallback={(newBody) => updateCard({ ...card, body: newBody })} />
      </CardContent>
      {/* Tools */}
      <CardActions sx={{ justifyContent: "right" }}>
        <DropdownMenu>
          <MenuItem onClick={() => deleteCard(card)}><DeleteIcon />Delete Card</MenuItem>
        </DropdownMenu>
      </CardActions>
    </Card>
  )
}

export default ColumnCard; 