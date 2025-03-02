import { ReactNode, ReactElement } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

const mainMenuItems = [
  { text: 'Home', to: '/', icon: <HomeRoundedIcon/> },
  { text: 'About', to: '/about', icon: <InfoRoundedIcon/> },
  { text: 'Settings', to: '/settings', icon: <SettingsRoundedIcon/>}
]

interface LIRouterLinkProps {
  to: string; 
  children?: ReactNode;
}

function ListItemRouterLink(props: LIRouterLinkProps): ReactElement<LIRouterLinkProps> {
  const { to, children } = props; 
  return (
    <ListItemButton component={Link} to={to}>
      {children}
    </ListItemButton>
  );
}

interface LINavButtonProps {
  key: number,
  to: string,
  children?: ReactNode;
}

function ListItemNavButton(props: LINavButtonProps): ReactElement<LINavButtonProps> {
  const { key, to, children } = props; 
  return (
    <ListItem key={key}>
      <ListItemRouterLink to={to}>
        {children}
      </ListItemRouterLink>
    </ListItem>
  )
}

function UserMenu() {
  return (
    <Stack direction="row" sx={{
      p: 2,
      gap: 1,
      alignItems: 'center',
      borderTop: '1px solid',
      borderColor: 'divider',
    }}>
      <Avatar
        sizes="small"
        alt="Riley Carter"
        src="/static/images/avatar/7.jpg"
        sx={{ width: 36, height: 36 }}
      />
      <Box sx={{ mr: 'auto' }}>
        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px', color: 'text.primary' }}>
          Riley Carter
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          riley@email.com
        </Typography>
      </Box>
    </Stack>
  )
}

function MenuContent() {
  return (
    <Stack direction='column' >
      <List dense>
        {mainMenuItems.map((item, index) => (
          <ListItemNavButton key={index} to={item.to}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: 'text.secondary' }}/>
          </ListItemNavButton>
        ))}
      </List>
    </Stack>
  )
}

function SideMenu() {
  
  return (
    <Stack sx={{
      display: "flex",
      width: "15%",
      borderRight: `1px solid`,
      borderColor: 'divider',
      justifyContent: 'space-between'
    }}>
      <MenuContent/>
      {/* <Divider /> */}
      <UserMenu/>
    </Stack>
  )
}

export default SideMenu; 