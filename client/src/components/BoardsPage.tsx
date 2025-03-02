import { useState, useEffect } from "react";
import { Grid2 as Grid, Card, CardContent, Typography, Breadcrumbs, Stack, Toolbar, CardActions} from "@mui/material";
import ButtonOutlined from "./ButtonOutlined";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import IBoard from "../interfaces/board";
import verifyToken from "../auth/verifyToken";
import DropdownMenu from "./DropdownMenu";
import {MenuItem} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
  
function OverviewToolbar({ newBoard }: { newBoard: () => void}) {
  return (
    <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
      <Breadcrumbs>
        <Typography variant="body1">CardBoard</Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>Boards</Typography>
      </Breadcrumbs>
      <ButtonOutlined size="small" borderRadius="8px" onClick={newBoard}>
        <AddIcon sx={{ color: "text.primary" }} />
      </ButtonOutlined>
    </Toolbar>
  )
}

function Board(props: {board: IBoard, onClick: () => void, deleteBoard: () => void}) {
  
  
  const { board, onClick, deleteBoard } = props; 
  return (
    <Card key={board._id}>
      <CardContent onClick={onClick}>
        <Typography variant="h3">{board.name}</Typography>
        {/* <Typography variant="body1">{`Columns: ${board.columns.length}`}</Typography>
        <Typography variant="body1">{`Users: ${board.users.length}`}</Typography> */}
      </CardContent>
      <CardActions sx={{ justifyContent: "right" }}>
        {/* More Actions Button and Dropdown Menu */}
        <DropdownMenu>
          {/* Delete Board Button */}
          <MenuItem onClick={deleteBoard}><DeleteIcon />Delete Board</MenuItem>
        </DropdownMenu>
      </CardActions>
    </Card>
  )
}

function BoardsPage() {
  const navigate = useNavigate();
  
  if (!verifyToken) { navigate('/login') }
  const token = localStorage.getItem('token'); 

  const [boards, setBoards] = useState<IBoard[]>([]);
  
  // Load boards
  useEffect(() => {
    const fetchBoards = async () => {
      try {

        // Fetch user boards
        const response = await fetch(`/api/user/boards`, {
          method: "GET",
          headers: { 
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`,
          },
        }); 
        
        // Check response
        if (!response.ok) throw new Error("Failed to fetch boards"); 
        
        // Parse and return data
        const data = await response.json(); 
        setBoards(data.boards);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchBoards();
  }, [token]);
  
  async function postNewBoard() {

    const newBoard: IBoard = {
      _id: "",
      name: "New Board", 
      users: [],
      columns: []
    }
    
    const response = await fetch('api/user/boards', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBoard)
    }); 
    
    if (!response.ok) {
      console.error("Could not post a new board", response)
      alert("Can't post a new board. ")
      return; 
    }
    
    const data = await response.json(); 
    setBoards([...boards, data.board])
    navigate(`/boards/${data.board._id}`)
  }
  
  async function deleteBoard(deletedBoard: IBoard) {
    if (!deletedBoard) return; 
    
    const updatedBoards = boards.filter(board => board._id !== deletedBoard._id); 
    setBoards(updatedBoards);
    
    const response = await fetch(`api/user/boards/${deletedBoard._id}`, {
      method: "DELETE",
      headers: {'Content-Type': "application/json", Authorization: `Bearer ${token}`},
    }); 
    
    if (!response.ok) { console.log("Could not delete board");  return;  }
    
 
  }
  
  return (
    <Stack direction='column' sx={{width: "100%", height: '100%', boxSizing: "border-box", 
      paddingLeft: "2rem", paddingRight: "2rem"
    }}>
      {/* Breadcrumbs and tools */}
      <OverviewToolbar newBoard={postNewBoard}/>
      {/* Board grid */}
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {boards && boards.map((board, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Board board={board} onClick={() => navigate(`/boards/${board._id}`)} deleteBoard={() => deleteBoard(board)}/>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}


export default BoardsPage; 