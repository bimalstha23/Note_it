import { Typography, Box, Button } from "@mui/material";
import { useAuth } from "../../Contexts/AuthContext";
import { Sidebar } from "./Sidebar";

 export function Home() {
    const {currentUser,SignOut}= useAuth();
  return (
    <div className="App">
      <Typography variant="h4">Home</Typography>
      <Box>
        <Sidebar />
        <Typography>{JSON.stringify(currentUser,null)} </Typography>
        <Button onClick={()=>{
          // console.log('signout');
          SignOut();
        }} variant="contained" color="primary">
          Primary
        </Button>
      </Box>
    </div>
  );
}