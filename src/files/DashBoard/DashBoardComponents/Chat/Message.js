import React, { useEffect, useState } from 'react'
import { Card, Avatar, Typography, CardHeader, Box } from '@mui/material'
import moment from 'moment'
import { collection, query, addDoc, onSnapshot, serverTimestamp, doc } from 'firebase/firestore'
import { useAuth } from '../../../../Contexts/AuthContext';
import { db } from '../../../../utils/firebaseDB';

export const Message = ({ messageData }) => {

    const { sender, message, timestamp } = messageData;
    const { currentUser } = useAuth();
    const [isOwnMessage, setIsOwnMessage] = useState(false);
    const [senderDetails, setSenderDetails] = useState({});

    useEffect(() => {
        const q = query(doc(db, 'users', sender));
        const unSubscribe = onSnapshot(q, (querySnapshot) => {
            setSenderDetails(querySnapshot.data());
        });
        return () => unSubscribe();
    }, [sender]);

    useEffect(() => {
        setIsOwnMessage(sender === currentUser.uid);
    }, [sender, currentUser.uid]);

    return (
        <Box>

            {!isOwnMessage ? (
                <Box>
                    {messageData.timestamp && (
                        <Box display='flex' alignItems='left'>
                            <Avatar referrerPolicy='no-referrer'
                                src={senderDetails.photoURL} className="avatar" />
                            <Box ml={2}>
                                <Typography variant='body2'>{message}</Typography>
                                <Typography variant='caption'>{moment(timestamp.toDate()).fromNow()}</Typography>
                            </Box>
                        </Box>
                    )}
                </Box>) :
                (
                    <Box>
                        {messageData.timestamp && (
                            <Box display='flex' alignItems='right'
                                justifyContent='flex-end'>
                                <Box mr={2}>
                                    <Typography variant='body2'>{message}</Typography>
                                    <Typography variant='caption'>{moment(timestamp.toDate()).fromNow()}</Typography>
                                </Box>
                                <Avatar referrerPolicy='no-referrer'
                                    src={senderDetails.photoURL} className="avatar" />
                            </Box>
                        )}
                    </Box>
                )}
        </Box>

    )
}
