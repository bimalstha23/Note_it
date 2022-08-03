import React, { useEffect, useState } from 'react'
import { CreateClass } from '../../Classes/CreateClass'
import { JoinClass } from '../../Classes/JoinClass'
import { Container, Box, Grid, Typography, Button, Dialog, DialogContentText, TextField, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { classes } from '../../../config/classobjectfortest'
import { db } from '../../../../utils/firebaseDB'
import { collection, getDocs, query, onSnapshot } from 'firebase/firestore'
import { useAuth } from '../../../../Contexts/AuthContext'

export const RenderClass = () => {
    const [createdClassData, setCreatedClassData] = useState([]);
    const [joinedClassData, setJoinedClassData] = useState([]);
    const { currentUser } = useAuth();
    useEffect(() => {
        if (currentUser.email) {
            const q = query(collection(db, 'CreatedClass', currentUser.email, 'Classes'));
            const unSubscribe = onSnapshot(q, (querySnapshot) => {
                setCreatedClassData(querySnapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                }));
            })
            return () => unSubscribe();
        }
    }, [currentUser.email])

    useEffect(() => {
        if (currentUser.email) {
            const q = query(collection(db, 'JoinedClass', currentUser.email, 'Classes'));
            const unSubscribe = onSnapshot(q, (querySnapshot) => {
                setJoinedClassData(querySnapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                }));
            }
            )
            return () => unSubscribe();
        }
    }, [currentUser.email]);

    return (
        <Box marginTop={4}>
            <Typography fontWeight={'Bold'} variant='h4' >My Classes</Typography>
            {classes.map((Class, index) => (
                <Box key={index}>
                    <Typography fontWeight={'Bold'} variant='h5' >{Class.name}</Typography>
                </Box>
            ))}
            <CreateClass />
            <JoinClass />
        </Box>
    )
}
