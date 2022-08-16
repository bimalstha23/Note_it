import React, { useEffect, useState } from 'react'
import { Box, Stack, Card, Avatar, CardContent, CardActionArea, CardActions, CardHeader, CardMedia, Typography, IconButton, Grid } from '@mui/material'
import WorkspacePremiumSharpIcon from '@mui/icons-material/WorkspacePremiumSharp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '../../../../Contexts/AuthContext';
import { onSnapshot, getDoc, doc, collection, writeBatch } from 'firebase/firestore';
import { db } from '../../../../utils/firebaseDB';
import ReactPhotoGrid from 'react-photo-grid';
import { ImageConfig } from '../../../../config/imageConfig';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ImageLayout } from './ImageLayout';
export const PostCard = ({ post, teacherEmail, adminEmail, subjectId }) => {
    console.log(adminEmail);
    const { currentUser } = useAuth();
    const batch = writeBatch(db);
    const { postMessege, serverTimestamp, postAutherId, isVerified, id } = post;
    const [autherDetails, setAutherDetails] = useState({});
    const [filesDetails, setFilesDetails] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [verified, setVerified] = useState(null);
    const [isUserTeacher, setIsUserTeacher] = useState(currentUser.email === teacherEmail || currentUser.email === adminEmail ? false : true);
    console.log(isUserTeacher);

    useEffect(() => {
        if (postAutherId) {
            const userRef = doc(db, 'users', postAutherId);
            const fetchUserDetails = async () => {
                try {
                    const userSnapshot = await getDoc(userRef);
                    // console.log(userSnapshot.data());
                    setAutherDetails(userSnapshot.data());
                } catch (error) {
                    console.log(error);
                }
            }
            fetchUserDetails();
        }
    }, [postAutherId]);

    useEffect(() => {
        if (id) {
            const DocRef = collection(db, 'postFiles', id, 'files');
            const unSubscribe = onSnapshot(DocRef, (querySnapshot) => {
                setFilesDetails(
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

    }, [id])

    const handleVerifyClicked = () => {
        setVerified(!verified);
        if (verified) {
            handleVerifyPost();
        } else {
            handleUnVerifyPost();
        }
    }
    const handleVerifyPost = async () => {
        console.log('verifyClicked');
        if (currentUser.email === adminEmail || currentUser.email === teacherEmail) {
            const postRef = doc(db, 'posts', subjectId, 'posts', id);
            try {
                batch.update(postRef, { 'isVerified': true });
                await batch.commit();
            }
            catch (error) {
                console.log(error);
            }
        } else {
            alert('You are not authorized to verify this post');
        }
    }

    const handleUnVerifyPost = async () => {
        console.log('unverifyClicked');
        if (currentUser.email === adminEmail || currentUser.email === teacherEmail) {
            const postRef = doc(db, 'posts', subjectId, 'posts', id);
            try {
                batch.update(postRef, { 'isVerified': false });
                await batch.commit();
            }
            catch (error) {
                console.log(error);
            }
        } else {
            alert('You are not authorized to unverify this post');
        }
    }
    const images = filesDetails.filter((file) => file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/bmp' || file.type === 'image/tiff' || file.type === 'image/webp');
    const imagesUrl = images.map((image) => image.url);
    // console.log(imagestest);
    const files = filesDetails.filter((file) => file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/gif' && file.type !== 'image/bmp' && file.type !== 'image/tiff' && file.type !== 'image/webp');
    return (
        <Box>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar src={currentUser.photoURL} className="avatar" />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={currentUser.displayName}
                    subheader="September 14, 2016"

                >

                </CardHeader>

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{postMessege}</Typography>
                </CardContent>

                <Box
                    width={'700px'}
                    margin={'auto'}
                    padding={'20px'}
                    borderRadius={'25px'}>
                    <Box>
                        {imagesUrl.length > 0 ? <ImageLayout images={imagesUrl} /> : null}
                    </Box>
                    <Grid container spacing={1}>
                        {files.length > 0 ? files.map((item, index) => {
                            return (

                                <Grid item xs={6}>

                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        boxShadow={'0 0 5px #ddd'}
                                        borderRadius={'25px'}
                                        padding={'10px'}
                                        sx={{
                                            justifyContent: 'space-between',
                                        }}
                                        key={index}>
                                        <img height={'50px'} src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                        <Box display={'flex'}
                                            flexDirection={'column'}
                                            paddingLeft={'5px'}>
                                            <Typography variant="body" align="left" color="textPrimary">{item.name}</Typography>
                                            {/* <Typography variant="body" align="left" color="textPrimary">{item.size}</Typography> */}
                                        </Box>
                                    </Box>
                                </Grid>
                            )
                        }) : null}
                    </Grid>
                </Box>
                {/* </CardMedia> */}

                <CardActions>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        padding={'10px'}
                        // margin={'auto'}
                        sx={{
                            // justifyContent: 'space-between',
                        }}>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            <IconButton aria-label="add to favorites">
                                <WorkspacePremiumSharpIcon />
                            </IconButton>
                            <Typography>like</Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}>
                            <IconButton onClick={handleVerifyClicked} disabled={isUserTeacher} aria-label="verify">
                                <WorkspacePremiumSharpIcon />
                            </IconButton>
                            {isVerified ? <Typography>Verified</Typography> : <Typography>Not Verified</Typography>}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}>
                            <IconButton aria-label="verify">
                                <WorkspacePremiumSharpIcon />
                            </IconButton>
                            <Typography>Not Verified</Typography>
                        </Box>
                    </Box>
                </CardActions>

            </Card >
        </Box >
    )
}
