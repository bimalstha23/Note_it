import React, { useState } from 'react'
import { Box, Grid, Typography, Button, Dialog, DialogContentText, TextField, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { classes } from '../../classobjectfortest'
import { useUiContext } from '../../Contexts/UiControlContext'
export const MainHome = () => {
    // const { createClassDialog, setCreateClassDialog } = useUiContext();
    const [createClassDialog, setCreateClassDialog] = useState(false);

    function handleClose() {
        setCreateClassDialog(false);
    }
    function handleClickOpen() {
        setCreateClassDialog(true);
    }
    return (
        <Box marginTop={4}>
            <Grid container >
                <Grid item xs={8}>
                    <Typography fontWeight={'Bold'} variant='h4' >My Classes</Typography>

                    {classes.map((Class, index) => (
                        <Box key={index}>
                            <Typography fontWeight={'Bold'} variant='h5' >{Class.name}</Typography>
                        </Box>
                    ))}
                    <Button onClick={handleClickOpen} color='primary' variant='contained'>Create Class</Button>
                    {/* </Box> */}
                    <Dialog fullWidth={''} open={createClassDialog} onClose={handleClose}>
                        <DialogTitle>CreateClass</DialogTitle>
                        <DialogContent>
                            <TextField type={'text'} margin='normal' id="outlined" label="Class Name" variant="outlined" fullWidth required />
                            <TextField type={'text'} margin='normal' id="outlined" label="Institute Name" variant="outlined" fullWidth required />
                            <TextField type={'number'} margin='normal' id="outlined" label="ClassName" variant="outlined" fullWidth required />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleClose}>Create</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>

                <Grid item xs={4}>


                </Grid>
            </Grid>
        </Box>
    )
}
