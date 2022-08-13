import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { Link } from 'react-router-dom';
import { SidebarTheme } from '../../../../utils/Themes';
import { ThemeProvider } from '@mui/material/styles';

export const ClassCard = (props) => {
    const { classData } = props;
    // console.log(classData)
    return (
        
        <Grid item xs={12} sm={6}>
            <ThemeProvider theme={SidebarTheme}> 
            <Box
                width={'331px'}
                height={'136px'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'left'}
                margin={'auto'}
                boxShadow={'0 0 5px #ddd'}
                borderRadius={'25px'}
                padding={'30px'}
                >
                <Link to={`/home/${classData.id}`}>
                    <Typography>{classData.name}</Typography>
                </Link>
                <Typography>{classData.institute}</Typography>
                <Typography>Subject:{classData.subjectNumber}</Typography>
            </Box>
         </ThemeProvider>
        </Grid>

    )
}
