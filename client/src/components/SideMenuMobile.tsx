// Source: https://github.com/mui/material-ui/tree/v6.4.6/docs/data/material/getting-started/templates/dashboard

import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { List, ListItem, Link } from '@mui/material'; 
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {  useNavigate, Link as RouterLink } from 'react-router-dom';
import getUsername from '../auth/getUsername';
import IBoard from '../interfaces/board';
import verifyToken from '../auth/verifyToken';

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

function SideMenuMobile({ open, toggleDrawer }: SideMenuMobileProps) {
  const navigate = useNavigate();
  const username = getUsername(); 
  
  const token = localStorage.getItem('token'); 

  const [boards, setBoards] = useState<IBoard[]>([]);
  
  // Load boards
  useEffect(() => {
    const fetchBoards = async () => {
      if (!token) return; 
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
  // Function to logout
  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }  
  
  function handleBoardClick(board: IBoard) {
    if (board) {
      navigate(`/boards/${board._id}`); 
    }
  }
  
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        sx={{
          minWidth: '20dvw',
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Typography variant="h3">
              CardBoard
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack spacing={2} flexGrow={1} sx={{ p: 2 }}>
        { verifyToken() && (
          <>
            <Typography variant="h4"> 
              Boards: 
            </Typography>
            <List> 
              {boards.map(board => (
                <ListItem><Link variant="body1" component={RouterLink} to={`/boards/${board._id}`}>
                  {board.name}
                </Link></ListItem>
              ))}
            </List>
          </>
        )}
        </Stack>
        <Divider/>
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt={username}
              src="/static/images/avatar/7.jpg"
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              {username}
            </Typography>
          </Stack>
          <Button onClick={ logout } variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />}>
            Logout
          </Button>
        </Stack>
        <Divider/>
        <Stack spacing={2} sx={{ p: 2 }}>
          <Typography>{"Copyright ©️ Elias Eskelinen 2025"}</Typography>
        </Stack>
      </Stack>
    </Drawer>
  );
}

export default SideMenuMobile;