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
          // marginLeft={10}
          fullwidth={false}
        // display={'block'}
        >
          <InnerContent />
        </Box>
      </Box>
    </div>
  );
}