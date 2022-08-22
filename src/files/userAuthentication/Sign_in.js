import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, TextField, Box, Typography, InputLabel, Collapse, Alert, OutlinedInput, IconButton, InputAdornment, FormControl } from '@mui/material';
import { FacebookOutlined, Google, Visibility, VisibilityOff } from '@mui/icons-material'
import { useAuth } from '../../Contexts/AuthContext';
import { useMounted } from '../../Hooks/useMounted';
import { LoadingButton } from '@mui/lab';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../utils/firebaseDB';

export function LogInform() {
  const [values, setValues] = useState({
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const mounted = useMounted();
  const [isSignInloading, setIsSignInloading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { loginUser, signinWithGoogle, signinWithFacebook } = useAuth();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const Navigate = useNavigate();

  return (
    <div className="App">
      <form action=""
        onSubmit={(e) => {
          e.preventDefault();
          setIsSignInloading(true);
          console.log(email, values.password);
          loginUser(email, values.password).then((response) => {
            Navigate('/');
          })
            .catch((err) => {
              setShowError(true);
              switch (err.code) {
                case 'auth/user-not-found':
                  setError('User Does not exist Please Create an Account');
                  break;
                case 'auth/wrong-password':
                  setError('Wrong password Please try again');
                  break;
                case 'auth/network-request-failed':
                  setError('Plase Check Your internet connection');
                  break;
                default:
                  setError('Something went wrong, please try again');
                  break;
              }
            }).finally(() => {
              setIsSignInloading(false);
            });
        }}

      >
        <Box
          bgcolor={'primary'}
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
            We1come back
          </Typography>
          <TextField onChange={(e) => { setEmail(e.target.value) }} type={'email'} margin='normal' id="outlined" label="Email" variant="outlined" fullWidth required />
          {/* <TextField  type={'password'} margin='normal' id="outlined" label="Password" variant="outlined" fullWidth required /> */}

          <FormControl margin='normal' sx={{}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Collapse
            in={showError}
          >
            <Alert severity="error"
            >
              {error}
            </Alert>
          </Collapse>
          <Link href='/ForgotPassword' fontWeight={'Bold'} textAlign={'right'} underline='none' color='inherit' sx={{ marginBottom: '20px', marginTop: '10px' }}> Forgot Password?</Link>
          <LoadingButton loading={isSignInloading} type='submit' size='medium' variant="contained" fullWidth style={{ textTransform: 'none' }}>
            <Typography variant='body1'>
              Log In
            </Typography>
          </LoadingButton>
          <Typography textAlign={'center'} color={'GrayText'} variant='subtitle2' fontWeight={'Bold'} sx={{ margin: '15px' }}>
            ----- OR -----
          </Typography>

          <LoadingButton loading={isGoogleLoading} onClick={() => {
            setIsGoogleLoading(true);
            signinWithGoogle().then((res) => {
              const { user } = res;
              console.log(user);
              const userRef = doc(db, "users", user.uid);
              setDoc(userRef, {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid,
                enrolledClasses: [],
              })
              Navigate('/home');
            }).catch((err) =>
              setIsGoogleLoading(false)
            ).finally(() => {
              mounted.current && setIsGoogleLoading(false);
            })
          }
          } size='medium' variant='contained' sx={{ textTransform: 'none' }} startIcon={<Google />}>
            <Typography variant='body1'>
              Join with Google
            </Typography></LoadingButton>
          <LoadingButton
            onClick={() => {
              signinWithFacebook().then((response) => {
                console.log(response);
                Navigate('/home');
              }).catch((err) =>
                console.log(`we have an errror ${err}`)).finally(() => {
                  // mounted.current && setIsloading(false);
                })
            }}

            size='medium' variant='contained' sx={{ textTransform: 'none', marginTop: '20px' }} startIcon={<FacebookOutlined />}>
            <Typography variant='body1'>
              Join with Faceboook
            </Typography></LoadingButton>
          <Typography textAlign={'center'}
            sx={{ marginBottom: '0px', marginTop: '15px' }}
          >
            Don't have an account?
            <Link fontWeight={'Bold'} href='/SignUp' underline='none' color='inherit' > Create Account.</Link>
          </Typography>
        </Box>

      </form>
    </div>
  );
}
// export default LogInform;
