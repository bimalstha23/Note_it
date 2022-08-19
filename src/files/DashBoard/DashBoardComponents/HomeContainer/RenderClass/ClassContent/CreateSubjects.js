import React, { useState } from 'react'
import { Box, Dialog, TextField, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material'
import { db } from '../../../../../../utils/firebaseDB';
import { useAuth } from '../../../../../../Contexts/AuthContext';
import { collection, addDoc } from 'firebase/firestore';

export const CreateSubjects = (props) => {
    const { currentUser } = useAuth();
    const { openDialog, setOpenDialog, ownerEmail, classID } = props;
    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');
    const [adminEmail, setAdminEmail] = useState(currentUser.email);

    function handleCloseDialog() {
        setOpenDialog(false);
    }
    return (
        <Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <form action=""
                    onSubmit={
                        async (e) => {
                            e.preventDefault();
                            console.log("submit");

                            if (currentUser.email===ownerEmail) {
                                const subjectData = {
                                    adminEmail: adminEmail,
                                    subjectName: subjectName,
                                    subjectCode: subjectCode,
                                    teacherName: teacherName,
                                    teacherEmail: teacherEmail,
                                }
                                const subjectRef = collection(db, 'CreatedSubject', classID, 'Subjects');
                                try {
                                    await addDoc(subjectRef, subjectData)
                                }
                                catch (error) {
                                    console.log(error);
                                }
                            }
                        }
                    }>
                    <DialogTitle>CreateClass</DialogTitle>
                    <DialogContent>
                        <TextField onChange={(e) => { setSubjectName(e.target.value) }} type={'text'} margin='normal' id="outlined" label="Subject Name" variant="outlined" fullWidth required />
                        <TextField onChange={(e) => { setSubjectCode(e.target.value) }} type={'text'} margin='normal' id="outlined" label="Subject Code" variant="outlined" fullWidth required />
                        <TextField onChange={(e) => { setTeacherName(e.target.value) }} type={'text'} margin='normal' id="outlined" label="Teacher Name" variant="outlined" fullWidth required />
                        <TextField onChange={(e) => { setTeacherEmail(e.target.value) }} type={'email'} margin='normal' id="outlined" label="Teacher's Email" variant="outlined" fullWidth required />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' onClick={handleCloseDialog}>Cancel</Button>
                        <Button type='submit' variant='contained'>Create</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    )
}
