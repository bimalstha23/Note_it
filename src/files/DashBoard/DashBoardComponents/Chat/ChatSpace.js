import React, { useState, useRef } from 'react'
import { Box, AppBar, Avatar, Toolbar, TextField, Typography, Button } from '@mui/material'
import { collection, query, addDoc, onSnapshot, serverTimestamp, orderBy } from 'firebase/firestore'
import { useAuth } from '../../../../Contexts/AuthContext';
import { db } from '../../../../utils/firebaseDB';
import SendIcon from '@mui/icons-material/Send';
import { useEffect } from 'react';
import { Message } from './Message';
import { styled } from '@mui/system';

const CustomButton = styled(Button)({
    backgroundColor: '#f5f5f5',
    // padding: '10px',
    // margin: '10px',
    color: '#121212',
})


const CustomTextField = styled(TextField)({
    '& label': {
        color: 'white',
    },
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'blue',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'White',
        },
    },
    input: {
        color: 'white',
    }
});

export const ChatSpace = ({ data }) => {

    const messegeEndRef = useRef(null);
    const { id, name } = data;
    const { currentUser } = useAuth();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const scrollToBottom = () => {
        messegeEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
        <Box
            backgroundColor='#121212'
        // height='100vh'
        >
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


            <Box
                display='flex'
                flexDirection='column'
                flexGrow={1}
                height='540px'
                overflowY='scroll'
                p={2}
                marginTop={2}
                backgroundColor='#121212'
                style={{
                    border: "2px solid black",
                    overflow: "hidden",
                    overflowY: "scroll" // added scroll
                }}
            >
                {messages.map((message) => (
                    <Message key={message.id} messageData={message} />
                ))}
                <div ref={messegeEndRef} />
            </Box>

            <Box
                display='flex'
                flexDirection='row'
                // alignItems='center'
                // justifyContent='space-between'
                padding={2}

                width='850px'
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
                        color='#ffffff'
                        // width={1}
                        sx={{
                            width: '800px',
                        }}
                    >
                        <Avatar
                            // marginLeft={2}
                            // marginRight={2}
                            // padding={2}
                            src={currentUser.photoURL}
                            alt={currentUser.displayName}
                            sx={{
                                margin: 'auto',
                                marginRight: '18px',
                                width: '35px',
                                height: '35px',
                            }}
                        />

                        <CustomTextField
                            label='Type your message'
                            variant='outlined'
                            size='small'
                            fullWidth
                            padding={'10px'}
                            type={'text'}
                            value={message}
                            // color='#ffffff'
                            onChange={(e) => { setMessage(e.target.value) }}
                        />
                        <CustomButton sx={{ marginLeft: '8px' }} type='submit' variant="contained" endIcon={<SendIcon />}>
                            Send
                        </CustomButton>
                    </Box>
                </form>
            </Box>

        </Box>
    )
}
