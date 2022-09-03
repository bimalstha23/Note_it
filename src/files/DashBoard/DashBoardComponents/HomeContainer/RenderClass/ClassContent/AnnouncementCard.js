import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import moment from 'moment';


export const AnnouncementCard = (props) => {
    const { data } = props;
    const { title, description, serverTimestamp, } = data;

    return (
        <Grid item xs={12}>
            {data ? (
                <Box
                    width={'331px'}
                    height={'max-content'}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'left'}
                    margin={'auto'}
                    marginTop={'10px'}
                    boxShadow={'0 0 5px #ddd'}
                    borderRadius={'25px'}
                    padding={'30px'}
                    sx={{
                        overflowWrap: 'break-word',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}

                >
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Typography color={'121212'} variant="h6">{title}</Typography>
                        {serverTimestamp && <Typography color={'GrayText'} variant="caption">{moment(serverTimestamp.toDate()).fromNow()}</Typography>}
                    </Box>
                    <Typography variant="body1">{description}</Typography>
                </Box>
            ) : (
                <Typography variant="body1">No Announcements</Typography>
            )}
        </Grid>
    )
}
