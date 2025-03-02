import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppNavBar from './components/AppNavBar';
import { Stack } from '@mui/material';
import BoardsPage from './components/BoardsPage';
import LoginPage from './components/LoginPage'; 
import RegisterPage from './components/RegisterPage';
import AppTheme from './theme/AppTheme';
import BoardPage from './components/BoardPage';
import WelcomePage from './components/WelcomePage';
import verifyToken from './auth/verifyToken';

function ProtectedRoute(props: { children: ReactElement, deniedRoute: ReactElement }) {
  const { children, deniedRoute } = props; 
  
  // If user is logged in, return requested page, otherwise redirect to the login page
  return verifyToken() ? children : deniedRoute;
};

function App() {

  return (
    <AppTheme>
      <BrowserRouter>
        <Stack direction='column' sx={{width: "100vw", height: '100vh'}}>
          <AppNavBar/>
          <Routes>
            <Route path="/" element={<WelcomePage/>}/>
            <Route path="/login" element={<LoginPage nextPath={'/boards'} />}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/boards" element={
              <ProtectedRoute deniedRoute={ <LoginPage nextPath={'/'}/> }>
                <BoardsPage/>
              </ProtectedRoute>
            }/>
            <Route path="/boards/:boardId" element={
              <ProtectedRoute deniedRoute={<LoginPage nextPath={'/boards'}/>}>
                <BoardPage/>
              </ProtectedRoute>
            }/>
          </Routes>
        </Stack>
      </BrowserRouter>
    </AppTheme>
  )
}

export default App