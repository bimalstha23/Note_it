import React, { useState } from 'react'
import { Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Stack, IconButton, Link, TextField, Button, Box, Typography, Avatar } from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import { useAuth } from '../../../../Contexts/AuthContext';
import DropFileInput from './DragandDrop/DropFileComponent';
import DeleteIcon from '@mui/icons-material/Delete';
import { ImageConfig } from '../../../../config/imageConfig';
import { Storage, db } from '../../../../utils/firebaseDB';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { async } from '@firebase/util';

export const AddPost = ({ subjectId }) => {

    const { currentUser } = useAuth();
    const [showinputField, setShowinputField] = useState(false);
    const [showuploadDialog, setShowuploadDialog] = useState(false);
    const [showLinkDialog, setShowLinkDialog] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [postMessege, setPostMessege] = useState('');
    const [postLink, setPostLink] = useState('');
    const [linkList, setLinkList] = useState([]);
    // const [postId, setPostId] = useState('');
    // var postId;

    console.log(linkList);
    const makePost = async(e) => {
        // preventDefault(e);
        const postData = {
            serverTimestamp: serverTimestamp(),
            postMessege: postMessege,
            postLink: postLink,
            postAutherId: currentUser.uid,
            postAutherEmail: currentUser.email,
            postAutherName: currentUser.displayName,
            postAutherPhotoURL: currentUser.photoURL,
            isVerified: false,
            likeCount: 0,
        }
        try {
            const postRef = collection(db, 'posts', subjectId, 'posts');
            const res = await addDoc(postRef, postData);
            addFiles(res.id);
        }
        catch (error) {
            console.log(error);
        }
    }

    const addFiles = async (id) => {
        console.log(id);
        fileList.map(async (file) => {
            const storageRef = ref(Storage, subjectId + '/' +'files'+ '/' + file.name);
            try {
                const uploadTask = await uploadBytesResumable(storageRef, file);
                // uploadTask.on('state_changed', async(snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log('Upload is ' + progress + '% done');
                // });
                    const downloadUrl = await getDownloadURL(storageRef);
                    console.log(downloadUrl);
                    const urlData = {
                        url: downloadUrl,
                        name: file.name,
                        type: file.type,
                    }
                    const DocRef = collection(db, 'postFiles', id, 'files');
                    const doc  = await addDoc(DocRef, urlData);
                    console.log(id);
                // });


            } catch (error) {
                console.log(error);
            }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            makePost();
            // addFiles();
            setShowinputField(false);
            console.log('posted');
            e.target.reset();
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        setShowuploadDialog(false);
    }
    const onFileChange = (fileList) => {
        setFileList(fileList);
    }
    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        // props.onFileChange(updatedList);
    }


    return (
        <Box>
            <Box
                margin={'auto'}
                marginTop={'50px'}
                width={'70%'}
            >  
            <form action=""
            onSubmit={(e)=>handleSubmit(e)}>
                {showinputField ? (
                    <Box>
                        <TextField
                            multiline
                            autoFocus
                            rows={4}
                            label='Post Something to your class'
                            value={postMessege}
                            onChange={(e) => setPostMessege(e.target.value)}
                            fullWidth
                            variant='filled'
                        />
                        {fileList.length > 0 ? (
                            <>
                                <Box>
                                    {
                                        fileList.map((item, index) => (
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
                                                    <Typography variant="body" align="left" color="textPrimary">{item.size}</Typography>
                                                </Box>
                                                <IconButton>
                                                    <DeleteIcon onClick={() => fileRemove(item)} />
                                                </IconButton>
                                            </Box>
                                        ))

                                    }
                                </Box>
                            </>
                        ) : null}
                        <Box display={'flex'}

                            flexDirection='row'
                            marginTop={'20px'}
                            sx={{
                                justifyContent: 'space-between',
                            }}
                        >
                            <Stack direction="row" spacing={1}>
                                <Tooltip title='Upload Files'>
                                    <IconButton onClick={() => { setShowuploadDialog(true) }} aria-label="Upload Files">
                                        <FileUploadOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Add Link'>
                                    <IconButton aria-label="Add Link" >
                                        <AddLinkOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Stack alignContent={'right'} direction={'row'} spacing={2}>
                                <Button onClick={() => { setShowinputField(false) }} variant='outlined' color='primary'>
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit} variant='outlined' color='primary'>
                                    Post
                                </Button>
                            </Stack>
                        </Box>

                    </Box>
                ) :
                    <Box
                        boxShadow={'0 0 5px #ddd'}
                        borderRadius={'25px'}
                        height={'50px'}
                        margin={'auto'}
                        // marginTop={'50px'}
                        width={'400px'}>
                        <Box
                            padding={'10px'}
                            margin={'auto'}
                            sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Avatar sx={{ width: '34px', height: '34px' }} alt='profile' src={currentUser.photoURL}></Avatar>
                            <Link href='#' underline='none' onClick={() => { setShowinputField(true) }}>
                                <Typography paddingLeft={'15px'} variant={'overline'}>
                                    Add post in your Class
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                }
            </form>
            </Box>
            <Box>
                <Dialog
                    open={showLinkDialog}
                    onClose={handleClose}>
                    <DialogTitle>Add Link</DialogTitle>
                    <DialogContent>
                        <TextField type={'url'} value={postLink} onChange={(e) => { setPostLink(e.target.value) }}>Link</TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

                <DropFileInput
                    showuploadDialog={showuploadDialog}
                    setShowuploadDialog={setShowuploadDialog}
                    onFileChange={(files) => onFileChange(files)} />
            </Box>
        </Box>
    )
}
