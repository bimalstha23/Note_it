import React, { useContext, useState, createContext, useEffect } from 'react'
import { auth, } from '../../utils/firebaseDB';
import {Button, Alert, Link, Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '../../Contexts/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
// import {alert}

export const EmailVerification = () => {

    const [isloading, setIsloading] = useState(false);
    const [alertMessege, setAlertMessege] = useState(false);
    const [errorMessege, setErrorMessege] = useState('');
    const [alertMessegeText, setAlertMessegeText] = useState('');
    const { currentUser } = useAuth();
    const Name = currentUser.displayName;
    console.log(currentUser)
    console.log(currentUser.emailVerified)
    console.log(Name);

    function isverified(){
       
    }

    return (
        <form action=""
            onSubmit={
                async (e) => {
                    e.preventDefault();
                    setIsloading(true);
                    try {
                        const res = await sendEmailVerification(currentUser);
                        setAlertMessege(true);
                        console.log(res);
                    } catch (err) {
                        console.log(err)
                    }
                }
            }

        >
            <Box
                display={'flex'}
                flexDirection={'column'}
                maxWidth={350}
                boxShadow={'0 0 5px #ddd'}
                margin={'auto'}
                marginTop={'50px'}
                padding={'30px'}
                borderRadius={'20px'}
            >
                <Typography fontWeight={'Bold'} variant='h6' paddingBottom={2}>
                    NoteIT
                </Typography>
                <Typography fontWeight={'Bold'} variant='h4' paddingBottom={2}>
                    Verify your Email
                </Typography>
                <Typography fontWeight={''} variant='body2' paddingBottom={3}>
                    HI {Name}, Use the link below to verify your email,
                    and start enjoying NoteIT.
                </Typography>
                <LoadingButton
                    // onlicks={() => {
                    //     console.log('clicked');
                    //     setIsloading(true);
                    //     verifyEmail().then(() => {
                    //         console.log('Email sent');
                    //     }).catch(error => {
                    //         console.log(error);
                    //     });
                    //     setIsloading(false);
                    // }}

                    loading={isloading} type='submit' size='medium' variant="contained" fullWidth style={{ textTransform: 'none' }}>
                    <Typography variant='body1'>
                        Verify Email
                    </Typography>
                </LoadingButton>
                {(alertMessege) ? <Alert
                    action={
                        <Button onClick = {()=>{
                                Navigate('/home');

                        }} color="inherit" size="small">
                            Refresh
                        </Button>
                    }
                >
                    Verification Email has been sent, if you did not saw the verification email please check your spam list as well,
                    after verification click the refresh button to redirect because we developer failed to refresh automatically on state change Thank you for your understanding.
                </Alert> : null}
                <Typography variant='caption' textAlign={'center'}
                    sx={{ marginBottom: '0px', marginTop: '15px' }}
                >
                    Questions? Email us at
                    <Link fontWeight={'Bold'} href='@mailto:noteit@gmail.com' underline='none' color='inherit' > noteit@gmail.com</Link>
                </Typography>   
                {(errorMessege) ? <Alert severity="error">{errorMessege}</Alert> : null}
            </Box>
        </form>
    )
}
