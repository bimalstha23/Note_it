import React, { useState } from 'react'
import {TextField, Container, Grid, Box, Typography, Avatar, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { useAuth } from '../../../../Contexts/AuthContext';

export const SubjectContent = (props) => {
    const { data } = props;
    const { currentUser } = useAuth();
    console.log('from subjectContent', data);
    const [value, setValue] = useState(0);
    return (
        <Container maxWidth={'md'}>
            <Grid container justify='center' >
                <Box
                display='flex'
                flexDirection='column'
                margin={'auto'}
                width={'700px'}
                marginTop={'20px'}
                    marginLeft={'150px'}
                >
                    <Box
                        // alignContent={'center'}
                        // position={'fixed'}
                        padding={'30px'}
                        boxShadow={'0 0 5px #ddd'}
                        borderRadius={'25px'}
                        height={'111px'}
                        // marginRight={'20px'}
                        sx={{
                            backgroundColor: '#121212',
                            color: '#fff',
                        }}
                    >
                        <Typography variant='h6'>{data.subjectName.toUpperCase()}</Typography>
                        <Typography variant='caption'>{data.teacherName.toUpperCase()}</Typography>
                    </Box>

                    <Box
                    >
                        {/* <Paper
                        fullwidth={'true'}
                        sx={{ position: 'fixed'}} elevation={0}> */}
                            <BottomNavigation
                                margin={'auto'}
                                justify={'center'}
                                showLabels
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                sx={{
                                    position: 'fixed',
                                    right: '0',
                                    left: '100px',
                                    width: '100%',
                                }}
                            >
                                <BottomNavigationAction label="Recents" />
                                <BottomNavigationAction label="Favorites" />
                                <BottomNavigationAction label="Archive" />
                            </BottomNavigation>
                        {/* </Paper> */}
                    </Box>
                    <Box
                    marginTop={'50px'}
                    display={'flex'}
                    flexDirection = {'row'}
                    padding={'30px'}>
                        <Avatar sx={{width:'54px',height:'54px'}} alt = 'profile' src={currentUser.PhotoURL}></Avatar>
                        <TextField  type={'text'} margin='normal' id="outlined" label="Post Something" variant="outlined" fullWidth required />
                        {/* <TextField lable = 'post something'/>                                     */}
                    </Box>
                </Box>
            </Grid>
        </Container>

    )
}
