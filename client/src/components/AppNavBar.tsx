import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SideMenuMobile from './SideMenuMobile';
import verifyToken from '../auth/verifyToken';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';


function MenuButtonOutlined({onClick}: {onClick: () => void}) {
  return (
    <IconButton onClick={ onClick} size="large" edge="start" color="inherit" aria-label="menu" sx={{
      mr: 2,
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: '12px'
    }}>
      <MenuRoundedIcon />
    </IconButton>
  )
}

export default function AppNavBar() {
  const [open, setOpen] = React.useState(false);
  
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  
  return (
    // <Box sx={{ 
    //   display: 'flex',
    //   width: '100%',
    //   height: 'fit-content'
    // }}>
    <AppBar position="static"
      sx={{
        display: 'flex',
        width: '100%',
        height: 'fit-content',        
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
      //   sx={{
      //   boxShadow: 0,
      //   bgcolor: theme().colors.background,
      //   borderBottom: '0.5px solid',
      //   borderColor: theme().colors.divider,
      //   display: 'flex',
      //   width: '100%',
      //   height: 'fit-content',
      //   color: theme().colors.font
      // }}>
      >
        <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
      <Toolbar sx={{ justifyContent: 'left' }}>
          {/* Menu button */}
          <MenuButtonOutlined onClick={toggleDrawer(true)} />
          {/* Logo or name */}
          <Link underline="always" variant="h3" component={RouterLink} 
            to={verifyToken() ? '/boards' : '/'}
          >
              CardBoard
          </Link>
          {/* <Typography onClick={ handleLogoClick } variant="h3" component="div" sx={{ flexGrow: 1 }}>CardBoard</Typography> */}
          {/* Home button 
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          {/* Saved button 
          <Button color="inherit" component={RouterLink} to="/about">Saved</Button>
          */}
        </Toolbar>
      </AppBar >
    // </Box>
  );
}