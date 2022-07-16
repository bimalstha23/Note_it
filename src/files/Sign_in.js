import React from 'react';
import { useState } from 'react';
import { Link, TextField,  Button, Box, Typography, InputLabel, OutlinedInput, IconButton, InputAdornment, FormControl } from '@mui/material';
import {  FacebookOutlined, Google, Visibility, VisibilityOff } from '@mui/icons-material'
import {useAuth} from '../Contexts/AuthContext';

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
// const {currentUser} = useAuth();
const [email , setEmail] = useState('');
// const [password , setPassword] = useState('');
const {loginUser} = useAuth();

// console.log(currentUser);
  return (
    <div className="App">
      <form action=""
      onSubmit={async (e) => {
      e.preventDefault();
      console.log(email, values.password);
        loginUser(email, values.password).then((response) => console.log(response))
        .catch((err) =>
          console.log( `we have an errror ${err}`));
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
          borderRadius={'20px'}
        >
          <Typography fontWeight={'Bold'} variant='h4' paddingBottom={4}>
            We1come back
          </Typography>
          <TextField onChange={(e)=>{setEmail(e.target.value)}} type={'email'} margin='normal' id="outlined" label="Email" variant="outlined" fullWidth required />
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
          <Link href='#' fontWeight={'Bold'} textAlign={'right'} underline='none' color='inherit' sx={{ marginBottom: '20px', marginTop: '10px' }}> Forgot Password?</Link>
          <Button type='submit' size='medium' variant="contained" fullWidth style={{ textTransform: 'none' }}>
            <Typography variant='body1'>
              Log In
            </Typography>
          </Button>
          <Typography textAlign={'center'} color={'GrayText'} variant='subtitle2' fontWeight={'Bold'} sx={{ margin: '15px' }}>
            ----- OR -----
          </Typography>

          <Button size='medium' variant='contained' sx={{ textTransform: 'none' }} startIcon={<Google />}>
            <Typography variant='body1'>
              Join with Google
            </Typography></Button>
          <Button size='medium' variant='contained' sx={{ textTransform: 'none', marginTop: '20px' }} startIcon={<FacebookOutlined />}>
            <Typography variant='body1'>
              Join with Faceboook
            </Typography></Button>
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
