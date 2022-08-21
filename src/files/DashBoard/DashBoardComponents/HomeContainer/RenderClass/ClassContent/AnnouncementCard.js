import React, { useState, } from 'react'
import { Box, Typography,Grid } from '@mui/material'
import moment from 'moment';


export const AnnouncementCard = (props) => {
    const { data } = props;
    const { title, description, serverTimestamp, id, } = data;

    return (
        <Grid item xs = {12}>
            {data ? (
                <Box
                    width={'331px'}
                    height={'136px'}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'left'}
                    margin={'auto'}
                    marginTop = {'10px'}
                    boxShadow={'0 0 5px #ddd'}
                    borderRadius={'25px'}
                    padding={'30px'}
                >
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body1">{description}</Typography>
                    {serverTimestamp && <Typography variant="body1">{moment(serverTimestamp.toDate()).fromNow()}</Typography>}
                </Box>
            ) : (
                <Typography variant="body1">No Announcements</Typography>
            )}
        </Grid>
    )
}
