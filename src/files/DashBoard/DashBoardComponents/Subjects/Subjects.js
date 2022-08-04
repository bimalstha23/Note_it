import React, { useState } from 'react'
import { Box, Typography, Grid, Button, Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { useAuth } from '../../../../Contexts/AuthContext'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { CreateSubjects } from '../../Classes/Subjects/CreateSubjects';

export const Subjects = (props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const { currentUser } = useAuth();
    const { data } = props;
    function handleOpenDialog() {
        setOpenDialog(true);
    }
    // console.log('hello world');
    // console.log(data);
    return (
        <Box>
            <Box>
                <Typography paddingRight={2} fontWeight={'Bold'} variant='h5' >{data.name}</Typography>
                {currentUser.email === data.OwnerEmail ?
                    <Button onClick={handleOpenDialog} variant='outlined' endIcon={<AddRoundedIcon />}>
                        Add Subject
                    </Button>
                    : null}

            </Box>
        </Box>
    )
}
