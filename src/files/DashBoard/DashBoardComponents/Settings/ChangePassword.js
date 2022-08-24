import React, { useState } from 'react'
import { Box, Snackbar, Alert, Typography, TextField, Collapse, Button, IconButton } from '@mui/material'
import { auth } from '../../../../utils/firebaseDB'
import { updatePassword } from 'firebase/auth'
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../../../Contexts/AuthContext'

export const ChangePassword = () => {
    const [passwordChanged, setPasswordChanged] = useState(false)
    const [newPassword, setNewPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');
    const { Themes } = useAuth();
    const backgroundColor = Themes.backgroundColor;
    const handleSubmit = async (e) => {
        e.preventDefault();

        updatePassword(auth.currentUser, newPassword).then(() => {
            setPasswordChanged(true)
            setShowError(false)
        }).catch(err => {
            setShowError(true);
            switch (err.code) {
                case 'auth/weak-password':
                    setError('Password is too weak')
                    break;
                case 'auth/requires-recent-login':
                    setError('You need to login again to Change your Password')
                    break;
                default:
                    setError(error.message)
                    break;

            }

        })
    }

    const handleClose = () => {
        setPasswordChanged(false)
    }

    return (
        <Box
            flexDirection='column'
            display='flex'
            justifyContent='space-between'
            marginTop={3}
        >
            <Snackbar
                open={passwordChanged} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Password Changed Successfully!
                </Alert>
            </Snackbar>

            {/* <Typography
                fontWeight='bold'
                variant='body1'
            >Change Password</Typography> */}
            <form action=""
                onSubmit={handleSubmit}
            >
                <Box
                    display='flex'
                    flexDirection='row'
                >

                    <Typography fontWeight={'bold'} variant='body2'>Change Password </Typography>
                    <Typography variant='body2'>(note: To Change Password you should have loged in recently )</Typography>
                </Box>

                <Typography fontWeight={'bold'} variant='body2'>New Password</Typography>
                <TextField
                    fullWidth
                    hiddenLabel
                    variant="filled"
                    size="small"
                    onChange={(e) => setNewPassword(e.target.value)}
                    type={'password'}
                />
                <Collapse
                    in={showError}
                >
                    <Alert severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setShowError(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }

                    >
                        {error}
                    </Alert>
                </Collapse>

                <Button
                    variant='contained'
                    type='submit'
                    sx={{
                        borderRadius: '25px',
                        marginTop: 2,
                        backgroundColor: { backgroundColor },
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#ffffff',
                            color: '#121212'
                        }
                    }}
                >Change Password</Button>
            </form>
        </Box>
    )
}
