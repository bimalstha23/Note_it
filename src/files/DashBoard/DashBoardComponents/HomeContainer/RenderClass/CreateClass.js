import React, { useState } from 'react'
import { Box, TextField, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import {  addDoc, collection } from 'firebase/firestore'
import { db } from '../../../../../utils/firebaseDB'
import { useAuth } from '../../../../../Contexts/AuthContext'

export const CreateClass = (props) => {
    const { createClassDialog, setCreateClassDialog } = props;
    const [className, setClassName] = useState('');
    const [InstituteName, setInstituteName] = useState('');
    const [subjectNumber, setSubjectNumber] = useState('');
    const [RoomNumber, setRoomNumber] = useState('');
    const { currentUser } = useAuth();
    function SetCreateClassDialog(value) {
        setCreateClassDialog(value);
    }
    function handleClose() {
        SetCreateClassDialog(false);
    }
    // function handleClickOpen() {
    //     SetCreateClassDialog(true);
    // }

    return (
        <Box>
            <Dialog open={createClassDialog} onClose={handleClose}>
                <form action=""
                    onSubmit={
                        async (e) => {
                            e.preventDefault();
                            const classData = {
                                name: className,
                                institute: InstituteName,
                                subjectNumber: subjectNumber,
                                roomNumber: RoomNumber,
                                OwnerEmail: currentUser.email,
                            }
                            const classRef = collection(db, 'CreatedClass', currentUser.email, 'Classes');
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
        </Box>
    )
}
