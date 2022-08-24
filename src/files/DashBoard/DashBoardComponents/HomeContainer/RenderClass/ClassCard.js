import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../../Contexts/AuthContext';
export const ClassCard = (props) => {
    const { Themes } = useAuth();
    const backgroundColor = Themes.backgroundColor;
    const { classData } = props;
    return (
        <Grid item xs={6}>
            <Box
                width={'290px'}
                height={'136px'}
                alignItems={'left'}
                margin={'auto'}
                boxShadow={'0 0 5px #ddd'}
                borderRadius={'25px'}
                padding={'30px'}
                sx={{
                    backgroundColor: {backgroundColor},
                    color: '#FFFFFF',
                    '&:hover': {
                        boxShadow: '0 0 5px #ddd',
                        backgroundColor: '#FFFFFF',
                        color: '#121212',
                    },
                }}
            >
                <Box
                    component={Link}
                    to={`/home/${classData.id}`}
                    sx={{
                        textDecoration: 'none',
                        backgroundColor: '#121212',
                        color: '#FFFFFF',
                        '&:hover': {
                            boxShadow: '0 0 5px #ddd',
                            backgroundColor: '#FFFFFF',
                            color: '#121212',
                        },
                    }}
                >
                    {/* <Link style={{textDecoration:'none'}} to={`/home/${classData.id}`}> */}
                    <Typography>{classData.name}</Typography>
                    {/* </Link> */}
                    <Typography>{classData.institute}</Typography>
                    <Typography>Subject:{classData.subjectNumber}</Typography>
                </Box>
            </Box>
        </Grid>

    )
}
