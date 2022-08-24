import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { ProfilePic } from './ProfilePic'
import { useAuth } from '../../../../Contexts/AuthContext'
import { ChangePassword } from './ChangePassword'
import { ChooseTheme } from './ChooseTheme'
export const Settings = () => {
    const { currentUser, Themes } = useAuth();
    const backgroundColor = Themes.backgroundColor;
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            // alignItems='center'
            width='800px'
            margin='auto'
            marginLeft={10}
            marginTop={6}
        >
            <Typography variant={'h5'} fomtWeight = {'bold'} >Settings</Typography>
            <ProfilePic />
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                marginTop={5}
            >
                <Typography
                    fontWeight='bold'
                    variant='body1'
                >Name</Typography>
                <TextField
                    fullWidth
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue={currentUser.displayName}
                    variant="filled"
                    size="small"
                />
            </Box>
            <Box>
                <ChangePassword />
            </Box>
            <ChooseTheme />

            <Box>

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
                >Save Changes</Button>
            </Box>

        </Box>

    )
}
