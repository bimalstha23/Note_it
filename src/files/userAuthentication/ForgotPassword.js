import React, {useState} from 'react';
import { Link,TextField, Box, Typography } from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {useAuth} from '../../Contexts/AuthContext';

export function ForgotPassword() {
    const [email, setEmail]= useState('');
    const [isloading, setIsloading] = useState(false);
    const {PasswordResetEmail} = useAuth();

    return (
        <form action=""
        onSubmit={
              async (e) => {
                e.preventDefault();
                // setIsloading(true);
                // try {
                //     PasswordResetEmail(email);
                //     console.log('email sent');
                // }
                // catch(err) {
                //     console.log(err);
                // } 

                // setIsloading(false);

                PasswordResetEmail(email).then((response) => {
                    console.log(response);
                }
                ).catch((err) =>{
                    console.log(`we have an errror ${err}`)}).finally(() => {
                        setIsloading(false);
                    }
                );
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
            <Typography fontWeight={'Bold'} variant='h4' paddingBottom={4}>
                Forgot Password.
            </Typography>
            <TextField onChange={(e) => { setEmail(e.target.value) }} type={'email'} margin='normal' id="outlined" label="Email" variant="outlined" fullWidth required />
            <LoadingButton loading={isloading} type='submit' size='medium' variant="contained" fullWidth style={{ textTransform: 'none' }}>
            <Typography variant='body1'>
              Send
            </Typography>
          </LoadingButton>
          <Typography textAlign={'center'} color={'GrayText'} variant='subtitle2' fontWeight={'Bold'} sx={{ margin: '15px' }}>
            ----- OR -----
          </Typography>
          <Typography textAlign={'center'}
            sx={{ marginBottom: '0px' }}
            >
            Go back to 
            <Link fontWeight={'Bold'} href='/' underline='none' color='inherit' > Sign In</Link>
          </Typography>
        </Box>
              </form>
    )
}
