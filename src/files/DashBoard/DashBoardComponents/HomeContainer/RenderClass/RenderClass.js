import React, { useEffect, useState } from 'react'
import { CreateClass } from './CreateClass'
import { JoinClass } from './JoinClass'
import { SpeedDial, SpeedDialAction, Box, Grid, Typography, Alert, Snackbar } from '@mui/material'
import { useAuth } from '../../../../../Contexts/AuthContext'
import { ClassCard } from './ClassCard'
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { db } from '../../../../../utils/firebaseDB'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { TODO } from '../TODO'
// import {EmptyClass} from './EmptyClass'
import { Navigate } from 'react-router-dom'

export const RenderClass = () => {
    const [createClassDialog, setCreateClassDialog] = useState(false);
    const [joinClassDialog, setJoinClassDialog] = useState(false);
    const [createdClassData, setCreatedClassData] = useState([]);
    const [joinedClassData, setJoinedClassData] = useState([]);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { currentUser } = useAuth();
    function fetchCreatedClasses() {
        try {
            const q = query(collection(db, 'CreatedClass', currentUser.email, 'Classes'));
            onSnapshot(q, (querySnapshot) => {
                setCreatedClassData(querySnapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                }));
            })
        } catch (err) {
            console.log(err);
        }
    }
    function fetchJoinedClasses() {
        try {
            const q = query(collection(db, 'JoinedClasses', currentUser.email, 'Classes'));
            onSnapshot(q, (querySnapshot) => {
                setJoinedClassData(querySnapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                }));
            }
            )
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (!currentUser) Navigate("/login", { replace: true });
    }, [currentUser]);

    useEffect(() => {
        fetchCreatedClasses();
    }, [currentUser]);

    useEffect(() => {
        fetchJoinedClasses();
    }, [currentUser]);

    const actions = [
        { icon: <CreateOutlinedIcon />, name: 'Create Class', onClick: () => setCreateClassDialog(true) },
        { icon: <GroupAddOutlinedIcon />, name: 'Join Class', onClick: () => setJoinClassDialog(true) },
    ];
    return (
        <Box
            // marginTop={4}
            width={'1000px'}
            padding={'30px'}
        >
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
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
            <Grid container spacing={1}>
                <Grid container item xs={8}>


                            {createdClassData.map((item) => (
                                <ClassCard key={item.id} classData={item} />
                            ))
                            }
                            {joinedClassData.map((item) => (
                                <ClassCard key={item.id} classData={item} />
                            ))}
                </Grid>
                <Grid container item xs={4}>

                    <Box>

                        <TODO />
                    </Box>
                </Grid>

            </Grid>
            <CreateClass createClassDialog={createClassDialog} setCreateClassDialog={setCreateClassDialog} />
            <JoinClass setSuccess={setSuccess} setSuccessMessage={setSuccessMessage} joinClassDialog={joinClassDialog} setJoinClassDialog={setJoinClassDialog} />
        </Box>
    )
}
