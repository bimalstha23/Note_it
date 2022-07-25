import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { classes } from '../../classobjectfortest'
export const MainHome = () => {
    console.log(classes);
    return (
        <Box marginTop={4}>
            <Grid container >
                <Grid item xs={8}>
                    <Typography fontWeight={'Bold'} variant='h4' >My Classes</Typography>
                    <Box grid>
                        {classes.map((Class, index) => (
                            <Box key={index}>
                                <Typography fontWeight={'Bold'} variant='h5' >{Class.name}</Typography>
                            </Box>
                        ))}

                    </Box>
                </Grid>

                <Grid item xs={4}>


                </Grid>
            </Grid>
        </Box>
    )
}
