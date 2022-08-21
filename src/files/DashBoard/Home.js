import React, { useState } from 'react'
import { Typography, Box, Button, Toolbar } from "@mui/material";
import { useAuth } from "../../Contexts/AuthContext";
import { Sidebar } from "./Sidebar";
import { MainHome } from "./DashBoardComponents/HomeContainer/MainHome";
import { InnerContent } from "./InnerContent";

export function Home() {
  const { currentUser, SignOut } = useAuth();
  return (
    <div className="App">
      <Box display={'flex'}>
        <Sidebar />
        <Box
          marginLeft={10}
          display={'block'}>
          <InnerContent />
        </Box>
      </Box>
    </div>
  );
}