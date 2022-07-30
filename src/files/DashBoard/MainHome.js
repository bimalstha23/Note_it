import React, { useState } from 'react'
import { Box, Grid, Typography, Button, Dialog, DialogContentText, TextField, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { classes } from '../../classobjectfortest'
import { useUiContext } from '../../Contexts/UiControlContext'
import { db } from '../../utils/firebaseDB'
import { useAuth } from '../../Contexts/AuthContext'
import { setDoc, doc, addDoc, collection } from 'firebase/firestore'
import { async } from '@firebase/util'

export const MainHome = () => {
    // const { createClassDialog, setCreateClassDialog } = useUiContext();
    const [createClassDialog, setCreateClassDialog] = useState(false);
    const [className, setClassName] = useState('');
    const [InstituteName, setInstituteName] = useState('');
    const [subjectNumber, setSubjectNumber] = useState('');
    const [RoomNumber, setRoomNumber] = useState('');
    const { currentUser } = useAuth();
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
                    <form action=""
                        onSubmit={
                            // console.log("submitted");
                            async (e) => {
                                console.log('submit');
                                e.preventDefault();
                                // try {
                                const classData = {
                                    name: className,
                                    institute: InstituteName,
                                    subjectNumber: subjectNumber,
                                    roomNumber: RoomNumber,
                                    admin: currentUser.uid,
                                    Teacher: [{
                                        name: currentUser.displayName,
                                        email: currentUser.email,
                                        uid: currentUser.uid
                                    },
                                    ]
                                }
                                const classRef = collection(db, 'CreatedClass',currentUser.email,'Classes');
                                await addDoc(classRef, classData).then((res) => {
                                    handleClose();
                                }).catch((err) => {
                                    console.log(err);
                                })
                            }
                        }>
                            <DialogTitle>CreateClass</DialogTitle>
                            <DialogContent>
                                <TextField onChange={(e) => { setClassName(e.target.value) }} type={'text'} margin='normal' id="outlined" label="Class Name" variant="outlined" fullWidth required />
                                <TextField onChange={(e) => { setInstituteName(e.target.value) }} type={'text'} margin='normal' id="outlined" label="Institute Name" variant="outlined" fullWidth required />
                                <TextField onChange={(e) => { setSubjectNumber(e.target.value) }} type={'number'} margin='normal' id="outlined" label="Number of Subjects" variant="outlined" fullWidth required />
                                <TextField onchange={(e) => { setRoomNumber(e.target.value) }} type={'number'} margin='normal' id="outlined" label="Room" variant="outlined" fullWidth required />
                            </DialogContent>
                            <DialogActions>
                                <Button variant='contained' onClick={handleClose}>Cancel</Button>
                                <Button type='submit' variant='contained'>Create</Button>
                            </DialogActions>
                    </form>
                        </Dialog>
                </Grid>

                <Grid item xs={4}>


                </Grid>
            </Grid>
        </Box>
    )
}
