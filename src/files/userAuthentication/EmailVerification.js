import React, { useContext, useState, createContext, useEffect } from 'react'
import { auth, } from '../../utils/firebaseDB';
import {Link, Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '../../Contexts/AuthContext';

export const EmailVerification = () => {

    const [isloading, setIsloading] = useState(false);

    const { currentUser, verifyEmail } = useAuth();
    const Name = currentUser.displayName;
    console.log(Name);
    // const firstName = Name.split(' ')[0];
    // console.log(Name);
    return (
        <form action=""
        onSubmit={
            async (e) => {
                e.preventDefault();
                setIsloading(true);
                await verifyEmail().then((response) => {
                console.log(response);
                // console.log('Email sent');
                }).catch((error) => {
                    console.log(error);
                }).finally(() => {
                    setIsloading(false);
                })
                
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
          <Typography variant='caption' textAlign={'center'}
            sx={{ marginBottom: '0px', marginTop: '15px' }}
            >
            Questions? Email us at
            <Link fontWeight={'Bold'} href='@mailto:noteit@gmail.com'  underline='none' color='inherit' > noteit@gmail.com</Link>
          </Typography>
        </Box>
              </form>
    )
}
