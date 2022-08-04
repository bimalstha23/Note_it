import React, { useState } from 'react'
import { Box, Typography, Grid, Button, Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { useAuth } from '../../../../Contexts/AuthContext'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { CreateSubjects } from '../../Classes/Subjects/CreateSubjects';

export const Subjects = (props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const { currentUser } = useAuth();
    const { data } = props;
    const { name,OwnerEmail } = data;
    function handleOpenDialog() {
        setOpenDialog(true);
    }
    
    return (
        <Box>
            <Box
                display={'flex'}
                flexDirection={'row'}
            >
                <Typography paddingRight={2} fontWeight={'Bold'} variant='h5' >{name}</Typography>
                {currentUser.email === OwnerEmail ?
                    <Button onClick={handleOpenDialog} variant='outlined' endIcon={<AddRoundedIcon />}>
                        Add Subject
                    </Button>
                    : null}
                <CreateSubjects openDialog={openDialog} setOpenDialog={setOpenDialog} ownerEmail={OwnerEmail} classID = {data.id} />
            </Box>
        </Box>
    )
}
