import React, { useState } from 'react'
import { Box, AppBar, Toolbar, TextField, Typography, Paper, IconButton } from '@mui/material'
import { collection, query, addDoc, onSnapshot, serverTimestamp, orderBy } from 'firebase/firestore'
import { useAuth } from '../../../../Contexts/AuthContext';
import { db } from '../../../../utils/firebaseDB';
import SendIcon from '@mui/icons-material/Send';
import { useEffect } from 'react';
import { Message } from './Message';

export const ChatSpace = ({ data }) => {

    const { id, name } = data;
    const { currentUser } = useAuth();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'ChatRoom', id, 'Messages'), orderBy('timestamp', 'asc'));
        const unSubscribe = onSnapshot(q, (querySnapshot) => {
            setMessages(querySnapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            }));
        })
        return () => unSubscribe();
    }, [id]);

    console.log(messages);
    const sendMessage = async () => {
        try {
            const q = collection(db, 'ChatRoom', id, 'Messages');
            await addDoc(q, {
                message,
                sender: currentUser.uid,
                timestamp: serverTimestamp()
            });
            setMessage('');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Box>
            <AppBar
                position='static'
                sx={{
                    backgroundColor: '#fff',
                    color: '#000',
                }}
            >
                <Toolbar>
                    <Typography variant='h6'>
                        {name}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Paper
                elevation={0}

            >
                <Box>
                    {messages.map((message) => (
                        <Message key={message.id} messageData={message} />
                    ))}
                </Box>
            </Paper>

            <Box
                display='flex'
                flexDirection='row'
                // alignItems='center'
                // justifyContent='space-between'
                padding={2}
                position='fixed'
                width='850px'
                bottom={0}
            // sx={{
            //     width: 1,
            // }}
            >
                <form action=""
                    onSubmit={(e) => {
                        e.preventDefault()
                        sendMessage()
                    }}
                >

                    <Box
                        display='flex'
                        flexDirection='row'
                        // width={1}
                        sx={{
                            width: '800px',
                        }}
                    >
                        <TextField
                            label='Type your message'
                            variant='outlined'
                            fullWidth
                            type={'text'}
                            value={message}
                            onChange={(e) => { setMessage(e.target.value) }}
                        />
                        <IconButton type='submit'>
                            <SendIcon />
                        </IconButton>
                    </Box>
                </form>
            </Box>

        </Box>
    )
}
