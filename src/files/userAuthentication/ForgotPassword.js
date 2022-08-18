import React, { useState } from 'react';
import { Link, Alert, Collapse, TextField, Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '../../Contexts/AuthContext';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isloading, setIsloading] = useState(false);
  const { PasswordResetEmail } = useAuth();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [success, setSuccess] = useState('');
  return (
    <form action=""
      onSubmit={
        async (e) => {
          e.preventDefault();
          setIsloading(true);
          PasswordResetEmail(email).then((response) => {
            setIsloading(false);
            setShowSuccess(true);
            setSuccess(`An email has been sent to ${email} with link to reset your password`);
          }).catch((err) => {

            setShowError(true);
            switch (err.code) {
              case 'auth/user-not-found':
                setError('Invalid Email Address');
                break;
              case 'auth/too-many-requests':
                setError('Plase Wait for Some Time to request for an Reset Email');
              default:
                setError('Something went wrong');
                break;
            }
          }).finally(() => {
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
        <Collapse in={showSuccess}>
          <Alert severity="success">
            {success}
          </Alert>
        </Collapse>
        <Collapse in={showError}>
          <Alert severity="error">
            {error}
          </Alert>
        </Collapse>
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
    </form >
  )
}
