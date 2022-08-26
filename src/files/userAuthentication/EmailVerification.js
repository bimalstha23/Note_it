import React, { useState, } from 'react'
import { Alert, Collapse, Link, Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '../../Contexts/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import NoteitBlack from '../../assets/NoteitBlack.png';
export const EmailVerification = () => {

    const [isloading, setIsloading] = useState(false);
    const [alertMessege, setAlertMessege] = useState(false);
    const [alertMessegeText, setAlertMessegeText] = useState('');
    const [showErrorMessege, setShowErrorMessege] = useState(false);
    const [errorMessege, setErrorMessege] = useState('');
    const { currentUser } = useAuth();
    const Name = currentUser.displayName;



    return (
        <form action=""
            onSubmit={
                async (e) => {
                    setShowErrorMessege(false);
                    setAlertMessege(false);
                    e.preventDefault();
                    setIsloading(true);
                    if (!currentUser.emailVerified) {
                        await sendEmailVerification(currentUser).then(() => {
                            setAlertMessegeText('Email Verification Sent to ' + currentUser.email + ' After Verifying refresh the page');
                            setAlertMessege(true);
                            setIsloading(false);
                        }).catch(error => {
                            setShowErrorMessege(true);
                            switch (error.code) {
                                case 'auth/too-many-requests':
                                    setErrorMessege('Plase Wait for Some Time to request for an another Reset Email');
                                    break;
                                default:
                                    setErrorMessege('Something went wrong');
                                    break;
                            }
                            setIsloading(false);

                        })
                    } else {
                        setErrorMessege('Email Already Verified');
                        setShowErrorMessege(true);
                        setIsloading(false);
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
                <Box
                    display={'flex'}
                    flexDirection={'row'}
                >
                    <img src={NoteitBlack} style={{
                        width: '32px',
                        height: '32px',
                    }} alt="" />
                    <Typography sx={{
                    }} fontWeight={'Bold'} variant='h6' paddingBottom={2}>
                        NoteIT
                    </Typography>
                </Box>
                <Typography fontWeight={'Bold'} variant='h4' paddingBottom={2}>
                    Verify your Email
                </Typography>
                <Typography variant='body2' paddingBottom={3}>
                    HI {Name}, Use the link below to verify your email,
                    and start enjoying NoteIT.
                </Typography>

                <Collapse in={showErrorMessege}>
                    <Alert severity="error">
                        {errorMessege}
                    </Alert>
                </Collapse>

                <LoadingButton
                    loading={isloading} type='submit' size='medium' variant="contained" fullWidth style={{ textTransform: 'none' }}>
                    <Typography variant='body1'>
                        Verify Email
                    </Typography>
                </LoadingButton>

                <LoadingButton sx={{
                    marginTop: '10px',

                }} href='/' variant="contained" disabled={!currentUser.emailVerified}>Continue</LoadingButton>
                <Collapse
                    in={alertMessege}>
                    <Alert severity="success">
                        {alertMessegeText}
                    </Alert>
                </Collapse>

                <Typography variant='caption' textAlign={'center'}
                    sx={{ marginBottom: '0px', marginTop: '15px' }}
                >
                    Questions? Email us at
                    <Link fontWeight={'Bold'} href='@mailto:noteit@gmail.com' underline='none' color='inherit' > noteit@gmail.com</Link>
                </Typography>
            </Box>
        </form >
    )
}
