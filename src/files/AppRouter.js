import {LogInform} from './Sign_in.js';
import {SignUp} from './Sign_up.js';
import {Home} from './Home.js';
import {Routes, Route} from "react-router-dom";
import { Container, Grid} from "@mui/material";
import {ProtectedRoute} from './ProtectedRoute.js';

 export function AppRouter() {
  return (
    <div className="AppRouter">
      <Container>
        <Grid>
          <Grid item>
            <Routes>
              <Route path="/" element={<LogInform />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={
              //<ProtectedRoute>
                <Home />
              //  </ProtectedRoute>
              } />
            </Routes>
        </Grid>
        </Grid>
        </Container>
    </div>
  );
}
// export default AppRouter;
