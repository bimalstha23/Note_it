import React, { useState } from 'react'
import { Box, Avatar, Button, Snackbar, Alert } from '@mui/material'
import { useAuth } from '../../../../Contexts/AuthContext'
import { updateProfile } from 'firebase/auth'
import { auth, Storage, db } from '../../../../utils/firebaseDB'
import { uploadBytes, ref, getDownloadURL, } from 'firebase/storage'
import { doc, writeBatch } from 'firebase/firestore'

export const ProfilePic = () => {
    const { currentUser, Themes } = useAuth();
    const backgroundColor = Themes.backgroundColor;
    // const [url, setUrl] = useState(null);
    const batch = writeBatch(db);
    const [open, setOpen] = useState(false);
    console.log(currentUser)
    const handleClose = () => {
        setOpen(false);
    }

    const handleUpload = async (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            console.log(file)
            const ProfilesRef = ref(Storage, `Profiles/${file.name}`);
            const userRef = doc(db, "users", currentUser.uid);
            await uploadBytes(ProfilesRef, file);
            await getDownloadURL(ProfilesRef).then((url) => {
                updateProfile(auth.currentUser, {
                    photoURL: url
                }).then(() => {
                    batch.update(userRef, { photoURL: url });
                    batch.commit().then(() => {
                        setOpen(true);
                    })
                })
            })
        }
    }

    return (
        <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            padding={'20px'}
            flexWrap='wrap'
            boxShadow={2}
            borderRadius={'25px'}
        >

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Profile Picture Changed! Refresh The page to see changes
                </Alert>
            </Snackbar>

            <Box
            >
                <Avatar sx={{
                    width: 70,
                    height: 70,
                }} alt={currentUser.displayName} src={currentUser.photoURL} />
            </Box>

            <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
                padding={'20px'}

            >
                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: { backgroundColor },
                    }}
                >Remove Photo</Button>
                <Button component='label' sx={{
                    backgroundColor: { backgroundColor },
                    marginLeft: '20px',
                }} variant='contained'>Change Photo
                    <input onChange={handleUpload} hidden accept="image/*" type="file" />
                </Button>
            </Box>
        </Box>
    )
}
