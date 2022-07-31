import React from 'react';
import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Link, TextField, Box, Typography, InputLabel, OutlinedInput, IconButton, InputAdornment, FormControl } from '@mui/material';
import { FacebookOutlined, Google, Visibility, VisibilityOff } from '@mui/icons-material'
import { useAuth } from '../../Contexts/AuthContext';
import { useMounted } from '../../Hooks/useMounted';
import { LoadingButton } from '@mui/lab';
import { updateCurrentUser } from 'firebase/auth';


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
  const [isloading, setIsloading] = useState(false);
  const [email, setEmail] = useState('');
  const { loginUser, signinWithGoogle , signinWithFacebook } = useAuth();
  const Navigate = useNavigate();
  return (
    <div className="App">
      <form action=""
        onSubmit={ (e) => {
          e.preventDefault();
          setIsloading(true);
          console.log(email, values.password);
           const user = loginUser(email, values.password).then((response) =>{ 
           Navigate('/home');
          })
            .catch((err) =>
              console.log(`we have an errror ${err}`)).finally(() => {
                setIsloading(false);
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
          <Link href='/ForgotPassword' fontWeight={'Bold'} textAlign={'right'} underline='none' color='inherit' sx={{ marginBottom: '20px', marginTop: '10px' }}> Forgot Password?</Link>
          <LoadingButton loading={isloading} type='submit' size='medium' variant="contained" fullWidth style={{ textTransform: 'none' }}>
            <Typography variant='body1'>
              Log In
            </Typography>
          </LoadingButton>
          <Typography textAlign={'center'} color={'GrayText'} variant='subtitle2' fontWeight={'Bold'} sx={{ margin: '15px' }}>
            ----- OR -----
          </Typography>

          <LoadingButton loading={isloading} onClick={()=>{
            setIsloading(true);
            signinWithGoogle().then((response) => {
              console.log(response);
              Navigate('/home');
            }).catch((err) =>
              console.log(`we have an errror ${err}`)
              ).finally(()=>{
               mounted.current && setIsloading(false);
              })
          }
          } size='medium' variant='contained' sx={{ textTransform: 'none' }} startIcon={<Google />}>
            <Typography variant='body1'>
              Join with Google
            </Typography></LoadingButton>
          <LoadingButton 
          onClick={()=>{  signinWithFacebook().then((response) => {
            console.log(response);
            Navigate('/home');
          }).catch((err) =>
            console.log(`we have an errror ${err}`)).finally(()=>{
             mounted.current && setIsloading(false);
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
