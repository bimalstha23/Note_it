import React, { useState } from 'react'
import { Box, TextField,  Button, Dialog,  DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../../../../utils/firebaseDB'
import { useAuth } from '../../../../../../Contexts/AuthContext'

export const CreateAnnouncement = (props) => {
  const { openAnnouncemtDialog, setOpenAnnouncemtDialog, ownerEmail, classID } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { currentUser } = useAuth();

  function SetCreateAnnouncementDialog(value) {
    setOpenAnnouncemtDialog(value);
  }
  function handleClose() {
    SetCreateAnnouncementDialog(false);
  }
  

  return (
    <Box>
      <Dialog fullWidth={''} open={openAnnouncemtDialog} onClose={handleClose}>
        <form action=""
          onSubmit={
            async (e) => {
              e.preventDefault();
              if (currentUser.email === ownerEmail) {
                const announcementData = {
                  title: title,
                  description: description,
                  serverTimestamp: serverTimestamp(),
                }
                const announcementRef = collection(db, 'Announcement', classID, 'Announcements');
                try {
                  await addDoc(announcementRef, announcementData)
                  SetCreateAnnouncementDialog(false);
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
