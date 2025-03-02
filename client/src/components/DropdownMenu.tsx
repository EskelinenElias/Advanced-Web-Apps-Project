// Source: MUI, Menu, https://mui.com/material-ui/react-menu/?srsltid=AfmBOor6lqSE4AsObRUw-VASLUUF7WH0QtLmpGrGZgtsPwSHDS_a-w59
import React from 'react';
import { ReactElement } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Menu, { MenuProps } from '@mui/material/Menu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
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
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

function DropdownMenu({ children }: { children: ReactElement|ReactElement[] }) {
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton id="demo-customized-button" size="small" edge="start" color="inherit" aria-label="menu"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: "8px",
          boxSizing: "border-box"
      }}>
        <MoreHorizIcon sx={{ color: 'text.primary' }} />
      </IconButton>
      <StyledMenu onClick={handleClose} id="demo-customized-menu" MenuListProps={{'aria-labelledby': 'demo-customized-button',}}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {children}
      </StyledMenu>
    </div>
  );
}

export default DropdownMenu;