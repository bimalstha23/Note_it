import React from 'react'
import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { ChatList } from './ChatList'
// import { ChatSpace } from './ChatSpace'

export const ChatRoom = () => {
  return (
    <Grid
      width='1000px'
      container>
      <Grid item xs={2}>
        <ChatList />
      </Grid>
      <Grid item xs={10}>
        <Outlet/>
      </Grid>
    </Grid>


  )
}
