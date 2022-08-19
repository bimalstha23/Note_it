import React, { useState } from 'react'
import { Box, TextField, Grid, Typography, Button, Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { setDoc, doc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../../../../utils/firebaseDB'
import { useAuth } from '../../../../../../Contexts/AuthContext'

export const CreateAnnouncement = (props) => {
  const { openAnnouncemtDialog, setOpenAnnouncemtDialog, ownerEmail, classID } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { currentUser } = useAuth();

  function SetCreateClassDialog(value) {
    setOpenAnnouncemtDialog(value);
  }
  function handleClose() {
    SetCreateClassDialog(false);
  }
  function handleClickOpen() {
    SetCreateClassDialog(true);
  }

  return (
    <Box>
      <Dialog fullWidth={''} open={openAnnouncemtDialog} onClose={handleClose}>
        <form action=""
          onSubmit={
            async (e) => {
              e.preventDefault();
              console.log("submit");
              if (currentUser.email === ownerEmail) {
                const announcementData = {
                  // announcedBy: currentUser.name,
                  title: title,
                  description: description,
                  createdAt: serverTimestamp(),
                }
                const announcementRef = collection(db, 'Announcement', classID, 'Announcements');
                try {
                  await addDoc(announcementRef, announcementData)
                }
                catch (error) {
                  console.log(error);
                }
              }
            }
          }>
          <DialogTitle>Create Announcement to the Class</DialogTitle>
          <DialogContent>
            <TextField onChange={(e) => setTitle(e.target.value)} value={title} type={'text'} margin='normal' id="outlined" label="Announcement Title" variant="outlined" fullWidth required />
            <TextField onChange={(e) => setDescription(e.target.value)} value={description} multiline rows={5} type={'text'} margin='normal' id="outlined" label="Announcement Description" variant="outlined" fullWidth required />
            {/* we gonna have file attachment section in here  */}
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
