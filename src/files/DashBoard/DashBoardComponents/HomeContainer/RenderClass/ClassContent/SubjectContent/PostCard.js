import React, { useEffect, useState } from 'react'
import { Box, Stack, Card, Avatar, CardContent, CardActionArea, CardActions, CardHeader, CardMedia, Typography, IconButton, Grid } from '@mui/material'
import WorkspacePremiumSharpIcon from '@mui/icons-material/WorkspacePremiumSharp';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useAuth } from '../../../../../../../Contexts/AuthContext';
import { onSnapshot, getDoc, doc, collection, writeBatch, serverTimestamp, addDoc, runTransaction, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../../../../../../utils/firebaseDB';
import { ImageConfig } from '../../../../../../../config/imageConfig';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ImageLayout } from './ImageLayout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { saveAs } from 'file-saver';
import moment from 'moment';
import JSZip from 'jszip';

export const PostCard = ({ post, teacherEmail, adminEmail, subjectId }) => {
    console.log(adminEmail);
    const zip = new JSZip();
    const { currentUser } = useAuth();
    const batch = writeBatch(db);
    const [isPostLiked, setIsPostLiked] = useState(null);
    const { postMessege, serverTimestamp, postAutherId, isVerified, id, likeCount,DownloadCount } = post;
    const [autherDetails, setAutherDetails] = useState({});
    const [filesDetails, setFilesDetails] = useState([]);
    const [verified, setVerified] = useState(null);
    const [likeId, setLikeId] = useState(null);
    const [isUserTeacher, setIsUserTeacher] = useState(currentUser.email === teacherEmail || currentUser.email === adminEmail ? false : true);

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

    console.log(autherDetails);

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
    const files = filesDetails.filter((file) => file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/gif' && file.type !== 'image/bmp' && file.type !== 'image/tiff' && file.type !== 'image/webp');
    const filesUrl = files.map((file) => file.url);




    useEffect(() => {
        if (likeCount) {
            const q = query(collection(db, 'Postlikes'), where('userId', '==', currentUser.uid), where('PostId', '==', id), limit(1));
            getDocs(q).then((snapshot) => {
                if (snapshot.docs.length > 0) {
                    setIsPostLiked(true);
                    setLikeId(snapshot.docs[0].id);
                } else {
                    setIsPostLiked(false);
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [likeCount]);

    const addLike = async () => {
        const likeRef = collection(db, 'Postlikes');
        await addDoc(likeRef, {
            PostId: id,
            userId: currentUser.uid,
            serverTimestamp: serverTimestamp,
        }).then(() => {
            const postRef = doc(db, 'posts', subjectId, 'posts', id);
            const newLikedPost = runTransaction(db, async (transaction) => {
                const likedPost = await transaction.get(postRef);
                if (!likedPost.exists()) {
                    return;
                }
                const newlikeCount = likedPost.data().likeCount + 1;
                transaction.update(postRef, {
                    likeCount: newlikeCount,
                });
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    const unlike = () => {
        const likeRef = collection(db, 'Postlikes');
        const q = query(likeRef, where('userId', '==', currentUser.uid), where('PostId', '==', id), limit(1));
        const likeSnapshot = getDocs(q).then((snapshot) => {
            if (snapshot.docs.length > 0) {
                const likeId = snapshot.docs[0].id;
                batch.delete(doc(db, 'Postlikes', likeId));
                batch.commit().then(() => {
                    const newLikedPost = runTransaction(db, async (transaction) => {
                        const postRef = doc(db, 'posts', subjectId, 'posts', id);
                        const likedPost = await transaction.get(postRef);
                        if (!likedPost.exists()) {
                            return;
                        }
                        const newlikeCount = likedPost.data().likeCount - 1;
                        transaction.update(postRef, {
                            likeCount: newlikeCount,
                        });
                        setIsPostLiked(false);
                    })
                }).catch((error) => {
                    console.log(error);
                })
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const makeZipFile = async () => {
        try {
            runTransaction(db, async (transaction) => {
                const postRef = doc(db, 'posts', subjectId, 'posts', id);
                const Post = await transaction.get(postRef);
                if (!Post.exists()) {
                    return;
                }
                const newDownloadCount = Post.data().DownloadCount + 1;
                transaction.update(postRef, {
                    DownloadCount: newDownloadCount,
                });
            })
            } catch (error) {
            console.log(error);
        }

        zip.file("NoteIt.txt", "Just Note It");
        const imageFolder = zip.folder("images");
        const Documents = zip.folder("Documents");
        images.map((image) => {
            imageFolder.file(image.name, image.url);
        })
        files.map((Doc) => {
            Documents.file(Doc.name, Doc.url);
        })
        await zip.generateAsync({ type: 'blob' }).then(function (content) {
            console.log(content);
            saveAs(content, currentUser.displayName);
        }).catch(function (err) {
            console.log(err);
        })
    }

    return (

        <Box>
            {post &&
                <Card>
                    {post.serverTimestamp &&
                        <CardHeader
                            avatar={
                                <Avatar referrerPolicy='no-referrer'
                                    src={autherDetails.photoURL} className="avatar" />
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={autherDetails.displayName}
                            subheader={moment(serverTimestamp.toDate()).fromNow()}
                        >
                        </CardHeader>
                    }
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
                                {isPostLiked ?
                                    (
                                        <IconButton onClick={unlike}>
                                            <FavoriteIcon style={{ color: 'red' }} />
                                        </IconButton>

                                    ) :
                                    (
                                        <IconButton onClick={addLike}>
                                            <FavoriteBorderIcon />
                                        </IconButton>
                                    )}
                                {isPostLiked ? <Typography> You and {likeCount - 1} students Liked This</Typography> : <Typography>{likeCount} Student Liked this</Typography>}
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                {isVerified ?
                                    (
                                        <IconButton disabled={isUserTeacher} onClick={handleUnVerifyPost}>
                                            <WorkspacePremiumSharpIcon style={{ color: 'orange' }} />
                                        </IconButton>
                                    ) :
                                    (
                                        <IconButton disabled={isUserTeacher} onClick={handleVerifyPost}>
                                            <WorkspacePremiumOutlinedIcon />
                                        </IconButton>
                                    )
                                }

                                {isVerified ? <Typography>Verified</Typography> : <Typography>Not Verified</Typography>}
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                <IconButton onClick={makeZipFile} aria-label="Download">
                                    <FileDownloadOutlinedIcon />
                                </IconButton>
                                <Typography>{DownloadCount} Downloads</Typography>
                            </Box>
                        </Box>
                    </CardActions>

                </Card >
            }
        </Box >
    )
}

