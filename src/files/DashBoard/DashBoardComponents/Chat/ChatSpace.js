import React from 'react'
import { Box, AppBar, Toolbar, TextField, Typography, Paper, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
export const ChatSpace = ({ data }) => {

    const { id, name } = data;

    return (
        <Box>
            <AppBar
                position='static'
                sx={{
                    backgroundColor: '#fff',
                    color: '#000',
                }}
            >
                <Toolbar>
                    <Typography variant='h6'>
                        {name}
                    </Typography>
                </Toolbar>
            </AppBar>


            <Paper>


            </Paper>
            <Box
                display='flex'
                flexDirection='row'
                // alignItems='center'
                // justifyContent='space-between'
                padding={2}
                position='fixed'
                width='850px'
                bottom={0}
            // sx={{
            //     width: 1,
            // }}
            >
                <form action=""
                    onSubmit={(e) => {
                        e.preventDefault()
                    }}
                >

                    <Box
                        display='flex'
                        flexDirection='row'
                        // width={1}
                        sx={{
                            width: '800px',
                        }}
                    >
                        <TextField
                            label='Type your message'
                            variant='outlined'
                            fullWidth
                            rowsMax={4}
                            placeholder='Type your message'
                        />
                        <IconButton type='submit'>
                            <SendIcon />
                        </IconButton>
                    </Box>
                </form>
            </Box>

        </Box>
    )
}
