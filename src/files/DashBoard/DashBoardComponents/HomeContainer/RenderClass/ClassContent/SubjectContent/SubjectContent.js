import React, { useState, useEffect } from 'react'
import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Stack, IconButton, Link, TextField, Container, Button, Grid, Box, Typography, Avatar, BottomNavigation, BottomNavigationAction } from '@mui/material'
// import SearchIcon from '@mui/icons-material/Search'
import { AddPost } from './AddPost';
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../../../../../../utils/firebaseDB';
import { useAuth } from '../../../../../../../Contexts/AuthContext';
import { PostCard } from './PostCard';

export const SubjectContent = (props) => {
    const { currentUser } = useAuth();
    const { data } = props;
    // const { id, name, institute, subjectNumber } = data;
    const [value, setValue] = useState(0);
    const [posts, setPosts] = useState([]);
    console.log(data.adminEmail);
    useEffect(() => {
        if (data.id) {
            const q = query(collection(db, 'posts', data.id, 'posts'), orderBy('serverTimestamp', 'desc'));
            const unSubscribe = onSnapshot(q, (querySnapshot) => {
                setPosts(
                    querySnapshot.docs.map((doc) => {
                        return {
                            ...doc.data(),
                            id: doc.id,
                        };
                    })
                );
            });
            return () => {
                unSubscribe();
            }
        }
    }, [data.id]);
    console.log('hello posts' + posts);
    console.log(posts);

    return (
        <Container maxWidth={'md'}>
            <Grid container justify='center' >
                <Box
                    display='flex'
                    flexDirection='column'
                    margin={'auto'}
                    width={'700px'}
                    marginTop={'20px'}
                    marginLeft={'150px'}
                >
                    <Box
                        padding={'30px'}
                        boxShadow={'0 0 5px #ddd'}
                        borderRadius={'25px'}
                        height={'111px'}
                        // marginRight={'20px'}
                        sx={{
                            backgroundColor: '#121212',
                            color: '#fff',
                        }}
                    >
                        <Typography variant='h6'>{data.subjectName.toUpperCase()}</Typography>
                        <Typography variant='caption'>{data.teacherName.toUpperCase()}</Typography>
                    </Box>
                    {/* 
                    <Box
                    >
                        <BottomNavigation
                        margin={'auto'}
                            justify={'center'}
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            sx={{
                                position: 'fixed',
                                right: '0',
                                left: '100px',
                                width: '100%',
                            }}
                            >
                            <BottomNavigationAction label="Recents" />
                            <BottomNavigationAction label="Favorites" />
                            <BottomNavigationAction label="Archive" />
                        </BottomNavigation>
                    </Box> */}
                    <AddPost subjectId={data.id} />
                    <Box>
                        {posts.map((post) => (
                            <PostCard key={post.id} subjectId  = {data.id} adminEmail={data.adminEmail} teacherEmail = {data.teacherEmail} post={post} />
                        ))}
                    </Box>
                </Box>
            </Grid>
        </Container>
    )
}
