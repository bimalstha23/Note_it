import { LogInform } from '../files/userAuthentication/Sign_in.js';
import { SignUp } from '../files/userAuthentication/Sign_up.js';
import { Home } from '../files/DashBoard/Home.js';
import { ForgotPassword } from '../files/userAuthentication/ForgotPassword.js';
import { Routes, Route } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { ProtectedRoute } from './ProtectedRoute.js';
import { UpdateuserProfile } from '../files/userAuthentication/UpdateuserProfile.js';
import { EmailVerification } from '../files/userAuthentication/EmailVerification.js';
import { InnerContent } from '../files/DashBoard/DashBoardComponents/InnerContent.js';
import { MainHome } from '../files/DashBoard/DashBoardComponents/MainHome.js';
import { ChatRoom } from '../files/DashBoard/DashBoardComponents/ChatRoom.js';
import { Navigate } from 'react-router-dom';

export function AppRouter() {
  return (
    <div className="AppRouter">
      <Container>
        <Grid>
          <Grid item>
            <Routes>

              <Route path="/login" element={<LogInform />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } >
                <Route path="/" element={<InnerContent />}>
                  <Route path="/" element={<Navigate replace to='home' />} />
                  <Route path="home" element={<MainHome />} />
                  <Route path="chatroom" element={<ChatRoom />} />
                </Route>
              </Route>
              <Route path="/EmailVerification" element={
                <ProtectedRoute>
                  <EmailVerification />
                </ProtectedRoute>
              } />
              <Route path="/UpdateuserProfile" element={
                <ProtectedRoute>
                  <UpdateuserProfile />
                </ProtectedRoute>
              } />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
