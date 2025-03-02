import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { FormControl, IconButton, Menu, List, ListItem, Typography, Stack, TextField, Box, FormLabel } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import IBoard from '../interfaces/board';
import getUsername from '../auth/getUsername';

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function CollabMenu({ board }: { board: IBoard }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchUsername, setSearchUsername] = useState<string>('');
  const [users, setUsers] = useState<string[]>([]);
  const open = Boolean(anchorEl);
  const currentUsername = getUsername();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`/api/user/boards/${board._id}/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch users');

        const data = await response.json();
        setUsers(data.users.filter((username: string) => username !== currentUsername));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [board._id, currentUsername]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    if (!searchUsername.trim()) return; // Prevent submitting empty input
  
    const token = localStorage.getItem('token');
    if (!token) return;
  
    try {
      const response = await fetch(`/api/user/boards/${board._id}/users/${searchUsername.trim()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error('Could not add user.');
  
      setUsers((prevUsers) =>
        prevUsers.includes(searchUsername.trim()) ? prevUsers : [...prevUsers, searchUsername.trim()]
      );
  
      setSearchUsername(''); // Clear input field after successful submit
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <IconButton
        id="demo-customized-button"
        size="small"
        edge="start"
        color="inherit"
        aria-label="menu"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '8px',
          boxSizing: 'border-box',
        }}
      >
        <GroupIcon sx={{ color: 'text.primary' }} />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{ 'aria-labelledby': 'demo-customized-button' }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Stack direction="column" spacing={1} sx={{ padding: '1rem' }}>
          <Typography variant="h6">Users</Typography>
          {users.length > 0 ? (
            <List>
              {users.map((username) => (
                <ListItem key={username}>
                  <Typography variant="body1">{username}</Typography>
                </ListItem>
              ))}
            </List>
          ) : (
            <List>
              <ListItem>
                <Typography variant="body1">No other users</Typography>
              </ListItem>
            </List>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Add user...</FormLabel>
              <TextField
                id="username"
                type="text"
                name="username"
                placeholder="username"
                autoComplete="off"
                value={searchUsername}
                onChange={(event) => { 
                  console.log("Typed:", event.target.value); 
                  setSearchUsername(event.target.value); 
                }}
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
          </Box>
        </Stack>
      </StyledMenu>
    </div>
  );
}

export default CollabMenu;

// import { useState, useEffect } from 'react';
// import React from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import { FormControl, IconButton } from '@mui/material';
// import Menu, { MenuProps } from '@mui/material/Menu';
// import { List, ListItem, Typography, Stack, TextField, Box, FormLabel } from '@mui/material';
// import GroupIcon from '@mui/icons-material/Group';
// import IBoard from '../interfaces/board';
// import getUsername from '../auth/getUsername';

// const StyledMenu = styled((props: MenuProps) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'right',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'right',
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   '& .MuiPaper-root': {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 180,
//     color: 'rgb(55, 65, 81)',
//     boxShadow:
//       'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//     '& .MuiMenu-list': {
//       padding: '4px 0',
//     },
//     '& .MuiMenuItem-root': {
//       '& .MuiSvgIcon-root': {
//         fontSize: 18,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//       },
//       '&:active': {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity,
//         ),
//       },
//     },
//     ...theme.applyStyles('dark', {
//       color: theme.palette.grey[300],
//     }),
//   },
// }));

// function CollabMenu({ board }: { board: IBoard }) {
  
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [searchUsername, setSearchUsername] = useState<string>("");
//   const [users, setUsers] = useState<string[]>([]);
//   const open = Boolean(anchorEl);
//   const currentUsername = getUsername(); 
  
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // Get token
//         const token = localStorage.getItem("token");
        
//         // Fetch user boards
//         const response = await fetch(`/api/user/boards/${board._id}/users`, {
//           method: "GET",
//           headers: { 
//             'Content-Type': "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }); 
        
//         // Check response
//         if (!response.ok) throw new Error("Failed to fetch users"); 
        
//         // Parse and return data
//         const data = await response.json(); 
//         setUsers(data.users.filter((username: string) => username !== currentUsername));
//       } catch (error) {
//         console.error(error);
//       }
//     };
    
//     fetchUsers();
//   }, [board, currentUsername]);
  
//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
  
//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     const token = localStorage.getItem('token')
//     if (!token) return; 
//     const data = new FormData(event.currentTarget);
//     const username = data.get('username');
//     if (!username) return; 
//     const response = await fetch(`/api/user/boards/${board._id}/users/${username.toString().trim()}`, {
//       method: "POST",
//       headers: { 
//         'Content-Type': "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     if (!response.ok) { console.error("Could not add user."); return; }
//     setUsers([...users, username.toString().trim()])   
//   }

//   return (
//     <div>
//       <IconButton id="demo-customized-button" size="small" edge="start" color="inherit" aria-label="menu"
//         aria-controls={open ? 'demo-customized-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//         sx={{
//           border: '1px solid',
//           borderColor: 'divider',
//           borderRadius: "8px",
//           boxSizing: "border-box"
//       }}>
//         <GroupIcon sx={{ color: 'text.primary' }} />
//       </IconButton>
//       <StyledMenu id="demo-customized-menu" MenuListProps={{'aria-labelledby': 'demo-customized-button',}}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//       >
//         <Stack direction='column' spacing={1} sx={{padding: "1rem"}}>
//           <Typography variant="h3">Users</Typography>
//           {users.length > 0 ? (
//             <List>
//               {users.map((username: string) => (
//                 <ListItem key={username}>
//                   <Typography variant="body1">{username}</Typography>
//                 </ListItem>
//               ))}
//             </List> 
//           ) : (
//             <List>
//               <ListItem key={"nousers"}>
//                 <Typography variant="body1">No other users</Typography>
//               </ListItem>
//             </List> 
//           )}
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ 
//             display: 'flex', flexDirection: 'column', width: '100%', gap: 2 
//           }}>      
//             <FormControl>
//               <FormLabel htmlFor="username">Add user...</FormLabel>
//               <TextField
//                 id="username"
//                 type="username"
//                 name="username"
//                 placeholder="username"
//                 autoComplete="username"
//                 autoFocus
//                 required
//                 fullWidth
//                 variant="outlined"
//               />            
//             </FormControl>
//           </Box>
//         </Stack>
//       </StyledMenu>
//     </div>
//   );
// }

// export default CollabMenu;