import React, { useState, useEffect } from 'react'
import { Container, Grid, Box, Typography, } from '@mui/material'
import { AddPost } from './AddPost';
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../../../../../../utils/firebaseDB';
import { PostCard } from './PostCard';
import { useAuth } from '../../../../../../../Contexts/AuthContext';

export const SubjectContent = (props) => {

    const { Themes } = useAuth();
    const backgroundColor = Themes.backgroundColor;
    const { data } = props;


    const [posts, setPosts] = useState([]);

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
                            backgroundColor: { backgroundColor },
                            color: '#fff',
                        }}
                    >
                        <Typography variant='h6'>{data.subjectName.toUpperCase()}</Typography>
                        <Typography variant='caption'>{data.teacherName.toUpperCase()}</Typography>
                    </Box>
                    
                    <AddPost subjectId={data.id} />
                    <Box>
                        {posts.map((post) => (
                            <PostCard key={post.id} subjectId={data.id} adminEmail={data.adminEmail} teacherEmail={data.teacherEmail} post={post} />
                        ))}
                    </Box>
                </Box>
            </Grid>
        </Container>
    )
}
