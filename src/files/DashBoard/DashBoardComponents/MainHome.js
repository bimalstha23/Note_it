import React, { useState } from 'react'
import { Box, Grid, Typography, Button, Dialog, DialogContentText, TextField, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { classes } from '../../../classobjectfortest'
import { useUiContext } from '../../../Contexts/UiControlContext'
import { db } from '../../../utils/firebaseDB'
import { useAuth } from '../../../Contexts/AuthContext'
import { CreateClass } from '../Classes/CreateClass'
import { JoinClass } from '../Classes/JoinClass'



export const MainHome = () => {
    // const { createClassDialog, setCreateClassDialog } = useUiContext();
    
    return (
        <Box marginTop={4}>
            {/* <Grid container > */}
                {/* <Grid item xs={8}> */}
                    <Typography fontWeight={'Bold'} variant='h4' >My Classes</Typography>
                    {classes.map((Class, index) => (
                        <Box key={index}>
                            <Typography fontWeight={'Bold'} variant='h5' >{Class.name}</Typography>
                        </Box>
                    ))}
                    <CreateClass/>
                    <JoinClass/>
                {/* </Grid> */}
                {/* <Grid item xs={4}> */}
                {/* </Grid> */}
            {/* </Grid> */}
        </Box>
    )
}
