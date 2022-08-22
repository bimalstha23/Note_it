import React, { useEffect, useState } from 'react'
import { Avatar, Typography, Box } from '@mui/material'
import moment from 'moment'
import { query, onSnapshot, doc } from 'firebase/firestore'
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
        <Box
            margin={2}
        >
            {!isOwnMessage ? (
                <Box>
                    {messageData.timestamp && (
                        <Box
                            display='flex'
                            flexDirection='column'
                            alignItems='left'
                            justifyContent='flex-start'
                        >

                            <Box
                                display='flex'
                                flexDirection='row'
                                // alignItems='center'
                                justifyContent='flex-start'
                                flexWrap='wrap'
                            >
                                <Avatar
                                    sx={{
                                        width: '30px',
                                        height: '30px',
                                    }}
                                    referrerPolicy='no-referrer'
                                    src={senderDetails.photoURL} className="avatar" />

                                <Box
                                    justifyContent={'space-between'}
                                    display='flex'
                                    flexDirection='row'
                                    sx={{
                                        marginLeft: '10px',
                                    }}
                                >
                                    <Typography color={'#ffffff'} variant='body2'>{senderDetails.displayName} </Typography>
                                    <Typography color={'rgba(255, 255, 255, 0.65)'} paddingLeft={'20px'} variant='caption'>{moment(timestamp.toDate()).calendar()}</Typography>
                                </Box>
                            </Box>
                            <Box ml={5}
                                sx={{
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word',
                                    maxWidth: '500px',
                                    width: 'max-content',
                                    overflowWrap: 'break-word',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    padding: '10px',
                                    borderRadius: '0px 25px 25px 25px',
                                    backgroundColor: '#f5f5f5',

                                }}
                            >
                                <Typography
                                    sx={{

                                        width: 'auto',
                                    }}
                                    variant='body2'>{message}</Typography>
                            </Box>
                        </Box>
                    )}
                </Box>) :
                (
                    <Box>
                        {messageData.timestamp && (
                            <Box
                                // justifyContent='flex-end'
                                display='flex'
                                flexDirection='column'
                                alignItems={'flex-end'}
                                sx={{
                                }}
                            >

                                <Box
                                    display='flex'
                                    flexDirection='row'
                                    justifyContent='flex-start'
                                    flexWrap='wrap'
                                >
                                    <Box
                                        justifyContent={'space-between'}
                                        display='flex'
                                        flexDirection='row'
                                        sx={{
                                            marginRight: '10px',
                                        }}
                                    >
                                        <Typography color={'#ffffff'} variant='body2'>You </Typography>
                                        <Typography color={'rgba(255, 255, 255, 0.65)'} paddingLeft={'20px'} variant='caption'>{moment(timestamp.toDate()).calendar()}</Typography>
                                    </Box>
                                    <Avatar
                                        sx={{
                                            width: '30px',
                                            height: '30px',
                                        }}
                                        referrerPolicy='no-referrer'
                                        src={senderDetails.photoURL} className="avatar" />

                                </Box>
                                <Box mr={5}
                                    sx={{
                                        whiteSpace: 'pre-wrap',
                                        wordWrap: 'break-word',
                                        maxWidth: '500px',
                                        width: 'max-content',
                                        overflowWrap: 'break-word',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        padding: '10px',
                                        borderRadius: '25px 0px 25px 25px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                        color: '#ffffff',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            width: 'auto',
                                        }}
                                        variant='body2'>{message}</Typography>
                                </Box>
                            </Box>
                        )}


                    </Box>


                )}
        </Box>

    )
}
