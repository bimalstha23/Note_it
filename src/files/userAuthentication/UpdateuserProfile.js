import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Typography, Stack, Avatar } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {useAuth}  from '../../Contexts/AuthContext';


export const UpdateuserProfile = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isloading, setIsloading] = useState(false);
    const {updateUser} = useAuth();
    return (
        <form
            onSubmit={ async (e) => {
                e.preventDefault();
                setIsloading(true);
                 try {
                    await updateUser(firstName, lastName);
                    navigate('/EmailVerification');
                    setIsloading(false);
                }
                catch(error){
                    console.log(error);
                }
            }}
        >
            <Box
                display={'flex'}
                flexDirection={'column'}
                maxWidth={350}
                boxShadow={'0 0 5px #ddd'}
                margin={'auto'}
                marginTop={'50px'}
                padding={'30px'}
                borderRadius={'25px'}
            >
                <Typography textAlign={'center'} fontWeight={'Bold'} variant='h4' paddingBottom={4}>
                    Select An Avatar
                </Typography>
                <Stack justifyContent={'center'} direction="row" spacing={2}>
                    <Avatar sx={
                        {
                            width: '52px',
                            height: '52px',
                        }
                    } alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar sx={
                        {
                            width: '52px',
                            height: '52px',
                        }
                    } alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar sx={
                        {
                            width: '52px',
                            height: '52px',
                        }
                    } alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar sx={
                        {
                            width: '52px',
                            height: '52px',
                        }
                    } alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </Stack>
                <TextField value={firstName} onChange={(e) => { setFirstName(e.target.value) }} type={'text'} margin='normal' id="outlined" label="First Name" variant="outlined"
                    required />
                <TextField value={lastName} onChange={(e) => { setLastName(e.target.value) }} type={'text'} margin='normal' id="outlined" label="Last Name" variant="outlined" required />

                <LoadingButton loading={isloading} type='submit' size='medium' variant="contained" fullWidth style={{ textTransform: 'none' }}>
                    <Typography variant='body1'>
                        Continue...
                    </Typography>
                </LoadingButton>

            </Box>

        </form>


    )
}
