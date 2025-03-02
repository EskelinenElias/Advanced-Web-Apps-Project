import {  Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import verifyToken from "../auth/verifyToken";

function WelcomePage() {
  
  const navigate = useNavigate();
  
  if (verifyToken()) navigate('/boards')
  return (
    <Stack direction='row' justifyContent='center' alignItems="center" sx={{
      width: "100%", height: '100%', boxSizing: "border-box",
      paddingLeft: "2rem", paddingRight: "2rem"
    }}>
      <Stack spacing={4} direction='column' justifyContent="center" alignItems="center" 
        sx={{ width: 'fit-content', height: 'fit-content'}}
      >
        <Typography variant='h1' sx={{color: 'text.primary'}}>Welcome to CardBoard!</Typography>
        <Stack spacing={2} direction='row' justifyContent='space-evenly' alignItems="center"
          sx={{width: "100%"}}
        >
            <Button onClick={() => navigate("/login")}>Sign in</Button>
            <Button onClick={() => navigate("/login")}>Sign up</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}


export default WelcomePage; 