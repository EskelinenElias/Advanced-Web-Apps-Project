import { ReactNode } from 'react';
import IconButton from '@mui/material/IconButton';
import { IconButtonOwnProps } from '@mui/material/IconButton';

interface ButtonOutlinedProps {
  size: IconButtonOwnProps["size"],
  borderRadius: string,
  onClick: () => void, 
  children: ReactNode
}
function ButtonOutlined(props: ButtonOutlinedProps) {
  const { size, borderRadius, onClick, children } = props; 
  return (
    <IconButton size={size} onClick={onClick} edge="start" color="inherit" aria-label="menu" sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: {borderRadius},
      boxSizing: "border-box"
    }}>
      { children }
    </IconButton>
  )
}

export default ButtonOutlined; 