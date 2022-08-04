import React from 'react';
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
import { MainHome } from '../files/DashBoard/DashBoardComponents/HomeContainer/MainHome.js';
import { ChatRoom } from '../files/DashBoard/DashBoardComponents/ChatRoom.js';
import { Navigate } from 'react-router-dom';
import { Subjects } from '../files/DashBoard/DashBoardComponents/Subjects/Subjects.js';
import { useDB } from '../Contexts/DBContext';

export function AppRouter() {
  const { createdClassData, joinedClassData } = useDB();
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
                  {/* path for the created classes */}
                  {createdClassData.map((data, index) => (
                    <Route key={index} path={`/${data.id}`} element={<Subjects data={data} />} />
                  ))}
                  {/* path for the created classes */}
                  {joinedClassData.map((data, index) => (
                    <Route key={index} path={`/${data.id}`} element={<Subjects data={data} />} />
                  ))}
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
