import {LogInform} from './Sign_in.js';
import {SignUp} from './Sign_up.js';
import {Home} from './Home.js';
import {Routes, Route} from "react-router-dom";
import { Container, Grid} from "@mui/material";

 export function AppRouter() {
  return (
    <div className="AppRouter">
      <Container>
        <Grid>
          <Grid item>
            <Routes>
              <Route path="/" element={<LogInform />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
            </Routes>
        </Grid>
        </Grid>
        </Container>
    </div>
  );
}
// export default AppRouter;
