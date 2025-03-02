import { Stack, Box, Typography, Link } from "@mui/material"; 
import { Toolbar, Breadcrumbs} from "@mui/material"; 
import ButtonOutlined from "./ButtonOutlined";
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink, useParams } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material"; 
import EditableTextField from "./EditableTextField";
import IBoard from "../interfaces/board";
import IColumn from "../interfaces/column";
import ICard from "../interfaces/card";
import SortableColumn from "./SortableColumn";
import { DndContext, DragEndEvent, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates,} from '@dnd-kit/sortable';
import CollabMenu from "./CollabMenu";

interface BoardToolbarProps {
  board: IBoard|null, 
  addColumn: (name: string) => void, 
  renameBoard: (name:string) => void
}

function BoardToolbar(props: BoardToolbarProps) {
  const { board, addColumn, renameBoard } = props; 
  return (
    <Toolbar disableGutters sx={{ width: "100%", justifyContent: "space-between" }}>
      <Breadcrumbs>
        <Typography variant="body1">CardBoard</Typography>
        <Link component={RouterLink} to={"/boards"} variant="body1" underline="none" sx={{ 
          color: 'text.secondary' 
        }}>Boards</Link>
        {board ? (
          <EditableTextField text={board.name} textVariant="body1" textFieldVariant="outlined" editCallback={renameBoard}
          sx={{ fontWeight: 600, color: 'text.primary' }}/>
        ) : (
          <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
            "New Board"
          </Typography>
        )}
      </Breadcrumbs>
      <Stack direction='row' spacing={1}>
        {board && <CollabMenu board={board} />}
        <ButtonOutlined size="small" borderRadius="8px" onClick={() => addColumn("New Column")}>
          <AddIcon sx={{ color: "text.primary" }} />
        </ButtonOutlined>
      </Stack>
    </Toolbar>
  )
}

function BoardPage() {
  const [board, setBoard] = useState<IBoard|null>(null); 
  const { boardId } = useParams(); 
  const token = localStorage.getItem("token");
  const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
  
  // Function to update board name
  async function updateBoard(updatedBoard: IBoard) {
    if (board) { 
      const newBoard = { ...board, name: updatedBoard.name }
      setBoard(newBoard); 
      const response = await fetch(`/api/user/boards/${boardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedBoard)
      })
      console.log("Updated board", response)
    }
  }

  // Function to add a new column
  async function postColumn() {
    if (board) { 
      const response = await fetch(`/api/user/boards/${boardId}/columns`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ _id: "", name: `New Column ${board.columns.length+1}`, cards: [] })
      })
      if (!response.ok) { console.error("Could not post card"); return; }
      const data = await response.json();
      const newColumn = data.column;
      console.log("Added a new column", newColumn)
      setBoard({...board, columns: [...board.columns, newColumn] });
    }
  }
  
  // Function to update column name
  async function updateColumn(updatedColumn: IColumn) {
    if (board) {
      const updatedColumns = board.columns.map(
        (column: IColumn) => (column._id.toString() === updatedColumn._id) ? updatedColumn : column
      )
      setBoard({ ...board, columns: updatedColumns });
      const response = await fetch(`/api/user/boards/${boardId}/columns/${updatedColumn._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedColumn)
      })
      if (!response.ok) {console.log("Failed to update column", response)}
    }
  }
  
  // Function to delete a column
  async function deleteColumn(columnId: string) {
    if (board) {
      const updatedColumns = board.columns.filter((column) => (column._id.toString() !== columnId));
      setBoard({ ...board, columns: updatedColumns });
      const response = await fetch(`/api/user/boards/${boardId}/columns/${columnId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': "application/json", Authorization: `Bearer ${token}` }
      });
      if (!response.ok) { console.log("Failed to update column", response) }; 
    }
  }
  
  // Function to post a new card
  async function postCard(column: IColumn, card: ICard) {
    if (board ) {
      if (!column._id) console.log("Can't post a card without column id")
      console.log(`Posting a new card to column ${column._id}`)
      const response = await fetch(`/api/user/boards/${boardId}/columns/${column._id}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(card)
      });
      if (!response.ok) { console.log("Failed to post a new card", response) }; 
      const data = await response.json(); 
      const newCard = data.card; 
      const updatedColumns = board.columns.map(
        (boardColumn: IColumn) => (boardColumn._id === column._id) ? 
        { ...column, cards: [...column.cards, newCard] } : boardColumn
      )
      setBoard({ ...board, columns: updatedColumns }); 

    }
  }
  
  // Function to update a card
  async function updateCard(column: IColumn, updatedCard: ICard) {
    console.log(`Updating card ${updatedCard._id} of column ${column._id}`, updatedCard)
    if (board) {
      column.cards.map(card => card._id === updatedCard._id ? updatedCard : card); 
      const updatedColumns = board.columns.map(boardColumn => boardColumn._id === column._id ? column : boardColumn); 
      setBoard({ ...board, columns: updatedColumns }); 
      const response = await fetch(`/api/user/boards/${boardId}/columns/${column._id}/cards/${updatedCard._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedCard)
      });
      if (!response.ok) { console.log("Failed to post a new card", response) }; 
    }
  }
  
  // Function to delete a card 
  async function deleteCard(column: IColumn, card: ICard) {
    if (board) {
      column.cards = column.cards.filter(columnCard => columnCard._id !== card._id); 
      const updatedColumns = board.columns.map(boardColumn => boardColumn._id === column._id ? column : boardColumn); 
      setBoard({ ...board, columns: updatedColumns }); 
      const response = await fetch(`/api/user/boards/${boardId}/columns/${column._id}/cards/${card._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': "application/json", Authorization: `Bearer ${token}` },
      });
      if (!response.ok) { console.log("Failed to delete card", response) }; 
    }
  }
  
  async function moveColumnLeft(column: IColumn) {
    if (!board) return; 
    const currentIndex = board.columns.findIndex(boardColumn => boardColumn._id === column._id)
    if (currentIndex === 0) return; 
    const otherColumn = board.columns[currentIndex - 1]; 
    const updatedColumns = board.columns.map(boardColumn =>  
      boardColumn._id === column._id ? otherColumn : boardColumn._id === otherColumn._id ? column : boardColumn
    )
    await updateBoard({ ...board, columns: updatedColumns }); 
    setBoard({...board, columns: updatedColumns});
  }
  
  async function moveColumnRight(column: IColumn) {
    if (!board) return; 
    const currentIndex = board.columns.findIndex(boardColumn => boardColumn._id === column._id)
    if (currentIndex === board.columns.length - 1) return; 
    const otherColumn = board.columns[currentIndex + 1]; 
    const updatedColumns = board.columns.map(boardColumn =>  
      boardColumn._id === column._id ? otherColumn : boardColumn._id === otherColumn._id ? column : boardColumn
    )
    await updateBoard({ ...board, columns: updatedColumns }); 
    setBoard({...board, columns: updatedColumns});
  }
  
  // Function to transfer a card from one column to another
  // async function transferCard(sourceColumn: IColumn, targetColumn: IColumn, card: ICard) {
  //   sourceColumn.cards.filter((sourceCard: ICard) => sourceCard._id !== card._id);
  //   targetColumn.cards = [...targetColumn.cards, card]
  //   updateColumn(sourceColumn); 
  //   updateColumn(targetColumn); 
  // }
  
  useEffect(() => {
    async function fetchBoard(boardId: string) {
      try {
        // Get tokena and board id
        // const token = localStorage.getItem("token");
        
        // Fetch user boards
        const response = await fetch(`/api/user/boards/${boardId}/cards`, {
          method: "GET",
          headers: { 
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`,
          },
        }); 
        
        // Check response
        if (!response.ok) throw new Error(`Failed to fetch board ${boardId}`); 
        console.log("response", response)
        // Parse and return data
        const data = await response.json(); 
        console.log("Data", data)
        setBoard(data.board);
      } catch (error) {
        console.error(error);
      }
    };
    
    if (boardId) fetchBoard(boardId);
  }, [boardId, token]);
  
  // Function to handle card drag and drop
  async function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || !board) return;
  
    const activeId = active.id;
    const overId = over.id;
  
    const sourceColumn = board.columns.find((col) => col.cards.some((card) => card._id === activeId));
    const targetColumn = board.columns.find((col) => col.cards.some((card) => card._id === overId));
  
    if (!sourceColumn || !targetColumn) return;
  
    const movedCard = sourceColumn.cards.find((card) => card._id === activeId);
    if (!movedCard) return;
  
    // If card is moving within the same column
    if (sourceColumn === targetColumn) {
      const oldIndex = sourceColumn.cards.findIndex((card) => card._id === activeId);
      const newIndex = targetColumn.cards.findIndex((card) => card._id === overId);
  
      if (oldIndex === -1 || newIndex === -1) return;
      
      console.log(sourceColumn.cards)
      const newCards = arrayMove(sourceColumn.cards, oldIndex, newIndex);
      console.log(newCards)
      const updatedColumns = board.columns.map((col) =>
        col._id === sourceColumn._id ? { ...col, cards: newCards } : col
      );
      setBoard({...board, columns: updatedColumns})
      updateColumn({ ...sourceColumn, cards: newCards });
    } 
    // If card is moving to a different column
    else {
      const newSourceCards = sourceColumn.cards.filter((card) => card._id !== activeId);
      const newTargetCards = [...targetColumn.cards, movedCard];
  
      const newSourceColumn = { ...sourceColumn, cards: newSourceCards }; 
      const newTargetColumn = { ...targetColumn, cards: newTargetCards }; 

      console.log("Source", newSourceColumn)
      console.log("Target", newTargetColumn)
      
      const updatedColumns = board.columns;
      console.log("Updated", updatedColumns)
      board.columns.map(column => column._id === sourceColumn._id ? newSourceColumn : column);
      board.columns.map(column => column._id === targetColumn._id ? newTargetColumn : column);
      
      deleteCard(sourceColumn, movedCard);
      postCard(targetColumn, movedCard);
      setBoard(board); 

    }
  };
  
  console.log("Board", board)
  return (
    <Stack
      direction="column"
      sx={{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        paddingLeft: "2rem",
        paddingRight: "2rem",
      }}
    >
      {/* Tools */}
      <BoardToolbar
        board={board}
        addColumn={postColumn}
        renameBoard={(name: string) =>
          board ? updateBoard({ ...board, name: name }) : {}
        }
      />
  
      {/* Drag-and-drop context */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <Box sx={{ overflowX: "auto", minWidth: "100%", minHeight: "fit-content", boxSizing: "border-box" }}>
          <Stack direction="row"
            sx={{
              width: "max-content",
              height: "fit-content",
              boxSizing: "border-box",
              border: "solid 1px",
              borderColor: "divider",
              borderRadius: "12px",
              marginBottom: "2rem",
            }}
          >
            {board?.columns.map((column) => (
              <SortableColumn key={column._id} column={column} 
                moveLeft={moveColumnLeft}
                moveRight={moveColumnRight}
                updateColumn={(updated: IColumn) => updateColumn(updated)} 
                deleteColumn={(deleted: IColumn) => deleteColumn(deleted._id)}
                postCard={()=> postCard(column, {_id: "", title: `New Card ${column.cards.length+1}`, body: "Write something!"})}
                updateCard={(updated)=> updateCard(column, updated)}
                deleteCard={(deleted)=> deleteCard(column, deleted)}
              />
            ))}
            
            {/* Add column button */}
            <Stack spacing="2" direction="column" sx={{ height: "100%", width: "200px", margin: "1rem" }}>
              <IconButton size="large" onClick={postColumn} sx={{ borderRadius: "8px" }}>
                <AddIcon sx={{ color: "text.primary" }} />
                <Typography variant="h3">Add a column</Typography>
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </DndContext>
    </Stack>
  )
  // return (
  //   <Stack direction='column' sx={{overflow: "hidden",
  //     width: "100%", height: '100%', boxSizing:"border-box", 
  //     paddingLeft: "2rem", paddingRight: "2rem"
  //   }}>
  //     {/* Tools */}
  //     <BoardToolbar board={board} addColumn={postColumn} renameBoard={(name: string) => board ? updateBoard({ ...board, name: name }) : {}}/>
  //     {/* Board area */}
  //     <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>        
  //       <Box sx={{overflowX: "auto", overflowY: "auto", 
  //         minWidth: "100%", minHeight: "fit-content", boxSizing: "border-box"
  //       }}>
  //         <Stack direction='row' sx={{
  //           width: "max-content", height: "fit-content", boxSizing: "border-box",
  //           border: "solid 1px", borderColor: "divider", borderRadius: "12px", marginBottom: "2rem"
  //         }}>
  //           { board && board.columns && board.columns.map((column) => (
  //             <React.Fragment key={column._id}>
  //               <Stack spacing={2} direction='column' boxSizing='border-box' sx={{ height: "100%", width: "400px", margin: "1rem"}}>
  //                 {/* Column name and tools */}
  //                 <Stack direction='row' justifyContent='space-between'>
  //                   <EditableTextField text={column.name} textVariant="h3" editCallback={(newName: string) => updateColumn(column._id, newName)}/>
  //                   <DropdownMenu>
  //                     <MenuItem onClick={() => deleteColumn(column._id)}><DeleteIcon/>Delete Column</MenuItem>
  //                   </DropdownMenu>
  //                 </Stack>
  //                 {/* Cards */}
  //                 <SortableContext items={column.cards.map(card => card._id)} strategy={verticalListSortingStrategy}>
  //                   {column.cards.map((card: ICard) => (
  //                     <SortableColumnCard id={card._id} cardKey={card._id} card={card} 
  //                       updateCard={ (updated: ICard) => updateCard(column._id, updated)} 
  //                       deleteCard={ (deleted: ICard) => deleteCard(column._id, deleted._id)}
  //                     />
  //                   ))}
  //                 </SortableContext>
  //                 {/* Add new card button */}
  //                 <IconButton size='large' onClick={() => postCard(column._id)} sx={{borderRadius: "8px", border: "solid 1px", borderColor: 'divider'}}>
  //                   <AddIcon/>
  //                   <Typography variant="h3">Add a card</Typography>
  //                 </IconButton>
  //               </Stack>
  //               <Divider orientation="vertical" flexItem/>
  //             </React.Fragment>
  //           )) }
  //           <Stack spacing="2" direction='column' sx={{height: "100%", width: "200px", margin: "1rem"}}>
  //             <IconButton size='large' onClick={postColumn} sx={{borderRadius: "8px"}}>
  //               <AddIcon sx={{color: 'text.primary'}}/>
  //               <Typography variant="h3">Add a column</Typography>
  //             </IconButton>
  //           </Stack>
  //         </Stack>
  //       </Box>
  //     </DndContext>
  //   </Stack>
  // )
}

export default BoardPage; 