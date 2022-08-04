import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { Link } from 'react-router-dom';
export const ClassCard = (props) => {
    const { classData } = props;
    console.log(classData)
    return (
        <Grid item xs={12} sm={6}>
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
                <Link to={`/${classData.id}`}>
                    <Typography>{classData.name}</Typography>
                </Link>
                <Typography>{classData.institute}</Typography>
                <Typography>Subject:{classData.subjectNumber}</Typography>
            </Box>
        </Grid>

    )
}
