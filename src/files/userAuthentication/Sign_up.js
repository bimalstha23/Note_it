import React from 'react';
import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Typography, Box, TextField, FormControl, Collapse, InputLabel, OutlinedInput, InputAdornment, IconButton, Link, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '../../Contexts/AuthContext';
import { doc, setDoc,} from 'firebase/firestore';
import { db } from '../../utils/firebaseDB'

export function SignUp() {
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
  });
  ;
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const [email, setEmail] = useState('');
  const [showErrorMessege, setShowErrorMessege] = useState(false);
  const [errorMessege, setErrorMessege] = useState('');


  const { registerUser } = useAuth();

  return (
    <div className="signUp">
      <form action=""
        onSubmit={async (e) => {
          e.preventDefault();
          setIsloading(true);
          if (values.password !== values.confirmPassword) {
            setShowErrorMessege(true);
            setErrorMessege('Password and Confirm Password Must be Same');
            setIsloading(false);
          }
          else {
            try {
              registerUser(email, values.password).then((Response) => {
                const docRef = doc(db, "users", Response.user.uid);
                const user = {
                  uid: Response.user.uid,
                  email: Response.user.email,
                  displayName: Response.user.displayName,
                  photoURL: Response.user.photoURL,
                  enrolledClasses: [],
                };
                setDoc(docRef, user).then(() => {
                  navigate('/UpdateuserProfile');
                }).catch((err) => {
                  setShowErrorMessege(true);
                  setErrorMessege(err.message);
                });
              }).catch((err) => {
                console.log(err.code);
                setIsloading(false);
                setShowErrorMessege(true);
                switch (err.code) {
                  case 'auth/email-already-in-use':
                    setErrorMessege('Email already in use');
                    break;
                  case 'auth/invalid-email':
                    setErrorMessege('Invalid Email');
                    break;
                  case 'auth/weak-password':
                    setErrorMessege('Please prefer a stronger password');
                    break;
                  case 'auth/network-request-failed':
                    setErrorMessege('Plase Check Your internet connection');
                    break;
                  default:
                    setErrorMessege('Something went wrong');
                    break;
                }
              });
            } catch (err) {
              console.log(err)
            }
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
          borderRadius={'20px'}>

          <Typography fontWeight={'Bold'} variant='h4' paddingBottom={4}>
            Get Started
          </Typography>

          <TextField value={email} onChange={(e) => { setEmail(e.target.value) }} type={'email'} margin='normal' id="outlined" label="Email" variant="outlined" fullWidth required />
          <FormControl margin='normal' sx={{}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              required
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
          <FormControl margin='normal' sx={{}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password"> Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              required
              // error={showErrorMessege && confirmPasswordDirty ? true : false}
              // helperText={errorMessege}
              placeholder={errorMessege}
              onChange={handleChange('confirmPassword')}
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
              label="Confirm Password"
            />
          </FormControl>
          <Collapse
            in={showErrorMessege}
          >
            <Alert severity="error">
              {errorMessege}
            </Alert>
          </Collapse>
          <LoadingButton loading={isloading} type='submit' size='medium' variant="contained" fullWidth sx={{ textTransform: 'none', marginTop: '20px' }}>
            <Typography variant='body1'>
              Sign Up
            </Typography>

          </LoadingButton>
          <Typography textAlign={'center'}
            sx={{ marginBottom: '0px', marginTop: '15px' }}
          >
            Already have an account?
            <Link fontWeight={'Bold'} href='/' underline='none' color='inherit' > Sign In</Link>
          </Typography>
        </Box>
      </form>
    </div >
  );
}
