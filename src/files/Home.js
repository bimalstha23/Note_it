import { Typography, Box, Button } from "@mui/material";
import { useAuth } from "../Contexts/AuthContext";

 export function Home() {
    const {currentUser}= useAuth();
  return (
    <div className="App">
      <Typography variant="h4">Home</Typography>
      <Box>
        <Typography>{JSON.stringify(currentUser,null)} </Typography>
        <Button onClick={()=>alert("logged out")} variant="contained" color="primary">
          Primary
        </Button>
      </Box>
    </div>
  );
}