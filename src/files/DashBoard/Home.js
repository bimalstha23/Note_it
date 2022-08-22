import React from 'react'
import { Box, } from "@mui/material";
import { Sidebar } from "./Sidebar";
import { InnerContent } from "./InnerContent";

export function Home() {
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