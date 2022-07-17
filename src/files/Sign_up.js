import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { Alert, Typography, Box, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Link, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {useAuth} from '../Contexts/AuthContext';
import { useMounted } from '../Hooks/useMounted';

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
    setConfirmPasswordDirty(true);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const navigate = useNavigate();
  const mounted = useMounted();

  const [isloading, setIsloading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [showErrorMessege, setShowErrorMessege] = useState(false);
  const [errorMessege, setErrorMessege] = useState('');
  const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false);
 //   password and confirm passowrd validation 
useEffect(() => {
  if(values.password !== values.confirmPassword){
    setShowErrorMessege(true);
    setErrorMessege('Passwords do not match');
  }
  else{
    setShowErrorMessege(false);
    setErrorMessege('');
  }
}, [values.password, values.confirmPassword]);



  const {registerUser}= useAuth();
  console.log(registerUser);
  
  return (
    <div className="signUp">
      <form action=""
        onSubmit={async (e) => {
          e.preventDefault();
          setIsloading(true);
              registerUser(email, values.password).then((response) => {
                navigate('/home');
                console.log("User added" );})
                .catch((err) => 
                    console.log( `we have an errror ${err}`)).finally(() => {
                     mounted.current && setIsloading(false);
                    })
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
          borderRadius={'20px'}>
          <Alert variant="outlined" severity="error">
            Password and Confirm Password must be same
          </Alert>
          <Typography fontWeight={'Bold'} variant='h4' paddingBottom={4}>
            Get Started
          </Typography>
          <Box display={'flex'}
            flexDirection={'row'}
          // sx={{paddingBottom:'10px'}}
          >
            <TextField value={firstName} onChange={(e) => { setFirstName(e.target.value) }} type={'text'} margin='normal' id="outlined" label="First Name" variant="outlined"
              sx={{ paddingRight: '10px' }}
              required />
            <TextField value={lastName} onChange={(e) => { setLastName(e.target.value) }} type={'text'} margin='normal' id="outlined" label="Last Name" variant="outlined" required />
          </Box>
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
              error={showErrorMessege && confirmPasswordDirty? true: false}
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

          <LoadingButton loading = {isloading} type='submit' size='medium' variant="contained" fullWidth sx={{ textTransform: 'none', marginTop: '20px' }}>
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
    </div>
  );
}

// export default SignUp;