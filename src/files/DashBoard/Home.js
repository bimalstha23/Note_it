import React from 'react'
import { Box, } from "@mui/material";
import { Sidebar } from "./Sidebar";
import { InnerContent } from "./InnerContent";

export function Home() {
  return (
    <div className="App">

      <Box display={'flex'}
        flexDirection={'row'} >
        <Sidebar />
        <Box
          container
          fullwidth={false}
        >
          <InnerContent />
        </Box>
      </Box>
    </div>
  );
}