import {LogInform} from './Sign_in.js';
import {SignUp} from './Sign_up.js';
import {Routes, Route} from "react-router-dom";
import { Container, Grid} from "@mui/material";

function App() {
  return (
    <div className="App">
      <Container>
        <Grid>
          <Grid item>
            <Routes>
              {/* <AuthcontextProvider> */}

              <Route path="/" element={<LogInform />} />
              <Route path="/signup" element={<SignUp />} />
              {/* </AuthcontextProvider> */}
            </Routes>
        </Grid>
        </Grid>
        </Container>
    </div>
  );
}
export default App;
