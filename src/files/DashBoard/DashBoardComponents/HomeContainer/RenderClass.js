import React, { useEffect, useState } from 'react'
import { CreateClass } from '../../Classes/CreateClass'
import { JoinClass } from '../../Classes/JoinClass'
import { SpeedDial, SpeedDialAction, Box, Grid, Typography, Button, Dialog, DialogContentText, TextField, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { useAuth } from '../../../../Contexts/AuthContext'
import { ClassCard } from '../HomeContainer/ClassCard'
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useDB } from '../../../../Contexts/DBContext'

export const RenderClass = () => {
    const [createClassDialog, setCreateClassDialog] = useState(false);
    const [joinClassDialog, setJoinClassDialog] = useState(false);
    const { createdClassData, joinedClassData } = useDB();
    console.log(joinedClassData);
    const actions = [
        { icon: <CreateOutlinedIcon />, name: 'Create Class', onClick: () => setCreateClassDialog(true) },
        { icon: <GroupAddOutlinedIcon />, name: 'Join Class', onClick: () => setJoinClassDialog(true) },
    ];
    return (
        <Box marginTop={4} sx={{ flexGrow: 1 }}>
            <Box
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                margin="auto"
            >
                <Typography paddingRight={2} fontWeight={'Bold'} variant='h5' >My Classes</Typography>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    width={'30px'}
                    icon={<SpeedDialIcon />}
                    direction="right"
                    FabProps={{ size: "small" }}>
                    {/* > */}
                    {actions.map((action) => (
                        <SpeedDialAction
                            onClick={action.onClick}
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />
                    ))}
                </SpeedDial>
            </Box>
            <Grid container spacing={2}>
                {/* <Grid item xs={12} sm={6}> */}
                {createdClassData.map((item) => (
                    <ClassCard key={item.id} classData={item} />
                ))}
                {joinedClassData.map((item) => (
                    <ClassCard key={item.id} classData={item} />
                ))}
                <CreateClass createClassDialog={createClassDialog} setCreateClassDialog={setCreateClassDialog} />
                <JoinClass joinClassDialog={joinClassDialog} setJoinClassDialog={setJoinClassDialog} />
            </Grid>
        </Box>
    )
}
