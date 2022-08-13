import React, { useState } from 'react'
import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Stack, IconButton, Link, TextField, Container, Button, Grid, Box, Typography, Avatar, BottomNavigation, BottomNavigationAction } from '@mui/material'
// import SearchIcon from '@mui/icons-material/Search'
import { AddPost } from './AddPost';
import { query } from 'firebase/firestore';

export const SubjectContent = (props) => {
    const { data } = props;
    // const { id, name, institute, subjectNumber } = data;
    const [value, setValue] = useState(0);

    useEffect(() => {
        if(currentUser.email){
            const q = query()
        }
    }, [])

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
                    </Box>

                    <AddPost subjectId = {data.id} />
                </Box>
            </Grid>
        </Container>

    )
}
