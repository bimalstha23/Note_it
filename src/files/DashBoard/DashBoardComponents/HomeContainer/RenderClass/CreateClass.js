import React, { useState } from 'react'
import { Box, TextField, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { addDoc, collection,serverTimestamp } from 'firebase/firestore'
import { db } from '../../../../../utils/firebaseDB'
import { useAuth } from '../../../../../Contexts/AuthContext'

export const CreateClass = (props) => {
    const { createClassDialog, setCreateClassDialog } = props;
    const [className, setClassName] = useState('');
    const [InstituteName, setInstituteName] = useState('');
    const [subjectNumber, setSubjectNumber] = useState('');
    const { currentUser, Themes } = useAuth();
    // const backgroundColor = Themes.backgroundColor;
    const paperColor = Themes.paperColor;
    function SetCreateClassDialog(value) {
        setCreateClassDialog(value);
    }
    function handleClose() {
        SetCreateClassDialog(false);
    }

    return (
        <Box>
            <Dialog
                PaperProps={{
                    style: {
                        backgroundColor: paperColor,
                    }
                }}
                open={createClassDialog} onClose={handleClose}>
                <form action=""
                    onSubmit={
                        async (e) => {
                            e.preventDefault();
                            const classData = {
                                name: className,
                                institute: InstituteName,
                                subjectNumber: subjectNumber,
                                OwnerEmail: currentUser.email,
                                serverTimestamp: serverTimestamp(),
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
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{
                                backgroundColor: Themes.backgroundColor,
                            }}
                            variant='contained' onClick={handleClose}>Cancel</Button>
                        <Button
                            sx={{
                                backgroundColor: Themes.backgroundColor,
                            }}
                            type='submit' variant='contained'>Create</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    )
}
