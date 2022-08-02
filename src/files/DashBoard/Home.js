import { Typography, Box, Button, Toolbar } from "@mui/material";
import { useAuth } from "../../Contexts/AuthContext";
import { Sidebar } from "./Sidebar";
import { MainHome } from "./DashBoardComponents/MainHome";
import { InnerContent } from "./DashBoardComponents/InnerContent";

export function Home() {
  const { currentUser, SignOut } = useAuth();
  return (
    <div className="App">
      <Box display={'flex'}>
        <Sidebar />
        <Box display={'block'}>
          <InnerContent />
        </Box>
      </Box>
    </div>
  );
}