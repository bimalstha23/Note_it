import {LogInform} from './userAuthentication/Sign_in.js';
import {SignUp} from './userAuthentication/Sign_up.js';
import {Home} from './userAuthentication/Home.js';
import {ForgotPassword} from './userAuthentication/ForgotPassword.js';
import {Routes, Route} from "react-router-dom";
import { Container, Grid} from "@mui/material";
import {ProtectedRoute} from './ProtectedRoute.js';
import { UpdateuserProfile } from './userAuthentication/UpdateuserProfile.js';
import { EmailVerification } from './userAuthentication/EmailVerification.js';

 export function AppRouter() {
  return (
    <div className="AppRouter">
      <Container>
        <Grid>
          <Grid item>
            <Routes>
              
              <Route path="/" element={<LogInform />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
              } />
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
// export default AppRouter;
