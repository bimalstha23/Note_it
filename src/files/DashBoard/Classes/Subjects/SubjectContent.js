import React, { useState } from 'react'
import { Tooltip, Dialog, DialogTitle, DialogActions, Stack, IconButton, Link, TextField, Container, Button, Grid, Box, Typography, Avatar, BottomNavigation, BottomNavigationAction } from '@mui/material'
// import SearchIcon from '@mui/icons-material/Search'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import { useAuth } from '../../../../Contexts/AuthContext';
import DropFileInput from './DragandDrop/DropFileComponent';
import DeleteIcon from '@mui/icons-material/Delete';
import { ImageConfig } from '../../../../config/imageConfig';

export const SubjectContent = (props) => {
    const { data } = props;
    const { currentUser } = useAuth();
    // console.log('from subjectContent', data);
    const { id, name, institute, subjectNumber } = data;
    const [showinputField, setShowinputField] = useState(false);
    const [value, setValue] = useState(0);
    const [showuploadDialog, setShowuploadDialog] = useState(false);
    const [fileList, setFileList] = useState([]);

    const onFileChange = (fileList) => {
        setFileList(fileList);
    }
    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }


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
                        // alignContent={'center'}
                        // position={'fixed'}
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
                    </Box>
                    <Box
                        margin={'auto'}
                        marginTop={'50px'}
                        width={'70%'}
                        height={'400px'}
                    >
                        {showinputField ? (
                            <Box>
                                <TextField
                                    multiline
                                    autoFocus
                                    rows={4}
                                    label='Post Something to your class'
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
                                        <Button variant='outlined' color='primary'>
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
                                    <Link underline='none' onClick={() => { setShowinputField(true) }}>
                                        <Typography paddingLeft={'15px'} variant={'overline'}>
                                            Add post in your Class
                                        </Typography>
                                    </Link>
                                </Box>
                            </Box>
                        }
                    </Box>
                    <Box>
                        <DropFileInput
                            showuploadDialog={showuploadDialog}
                            setShowuploadDialog={setShowuploadDialog}
                            onFileChange={(files) => onFileChange(files)} />
                    </Box>
                </Box>
            </Grid>
        </Container>

    )
}
