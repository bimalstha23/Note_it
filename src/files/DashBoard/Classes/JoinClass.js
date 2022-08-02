import React, { useState } from 'react'
import { Card, Avatar, Divider, Slide, Toolbar, AppBar, IconButton, Box, Grid, Typography, Button, Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions, CardHeader, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../../Contexts/AuthContext';
import { setDoc,getDoc, doc, addDoc, collection, query } from 'firebase/firestore';
import { db } from '../../../utils/firebaseDB';
import { ConstructionOutlined } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const JoinClass = () => {
    const [joinClassDialog, setJoinClassDialog] = useState(false);
    const [OwnerEmail, setOwnerEmail] = useState('');
    const [classCode, setClassCode] = useState('');
    const [error, setError] = useState(false);
    const [classData,setClassData] = useState(null);
    const [classExists, setClassExists] = useState(false);
    const { currentUser, SignOut } = useAuth();
    console.log(currentUser.photoURL)
    console.log(currentUser)
    function handleClose() {
        setJoinClassDialog(false);
    }
    function handleClickOpen() {
        setJoinClassDialog(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        console.log(OwnerEmail, classCode); 
        setJoinClassDialog(false);
    }
    return (
        <Box>
            <Button onClick={handleClickOpen} color='primary' variant='contained'>Join Class</Button>

            {/* Join Class  DialogActions */}
            <Dialog
                fullScreen
                open={joinClassDialog}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <form action=""
                onSubmit={
                   async (e) => {
                    e.preventDefault();
                    try{
                        const classRef = doc(db, 'CreatedClass', OwnerEmail, 'Classes', classCode);
                        const classSnap = await getDoc(classRef);
                        if(classSnap.exists() && classSnap.data().OwnerEmail!==currentUser.email)
                        {
                            console.log(classSnap.data());
                            setClassExists(true);
                            setError(false);
                            setClassData(classSnap.data());
                        }else{
                            setClassExists(false);
                            setError(true);
                            return;
                        }

                    }catch(e){
                        console.log(e);
                    }
                    if(classExists){
                        try{
                        const joinClassRef = doc(db, 'JoinedClasses', currentUser.email,'Classes', classCode);
                        await setDoc(joinClassRef,classData);
                        console.log("class Joined");
                        }catch(e){
                        console.log(e);
                        console.log("Error joining class");
                        }
                    }


                }
                }>

                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Join Class
                        </Typography>
                        <Button type='submit' variant='outlined' autoFocus color="inherit" 
                        // onClick={handleSubmit}
                        >
                            Join
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box
                    display='flex'
                    flexDirection='column'
                    margin='auto'
                    marginTop='20px'
                    width='40%'
                    >
                    <Box
                        padding={'25px'}
                        boxShadow={'0 0 5px #ddd'}
                        borderRadius={'25px'}
                    >
                        <Card
                        variant='none'
                        >

                            <Typography>You're Currently Sign in as</Typography>
                            <CardHeader
                                avatar={
                                    <Avatar
                                    alt={currentUser.displayName}
                                    // src='https://www.slashfilm.com/img/gallery/doctor-strange-in-the-multiverse-of-madness-is-actually-the-wanda-maximoff-show/intro-1652138123.webp'
                                        src={currentUser.photoURL}
                                        />
                                }
                                
                                action={
                                    <Button variant='outlined' autoFocus color="inherit" onClick={SignOut}>
                                        Logout
                                    </Button>
                                }
                                title={currentUser.displayName}
                                subheader={currentUser.email}
                                />
                        </Card>
                    </Box>
                    <Box
                        marginTop={'20px'}
                        display={'flex'}
                        flexDirection={'column'}
                        boxShadow={'0 0 5px #ddd'}
                        borderRadius={'25px'}
                        padding={'30px'}
                    // margin={'auto'}
                    >
                        <Typography variant='h6'>Class Details</Typography>
                        <Typography variant=''>Ask your teacher for the class code, Then enter it here </Typography>
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            >
                            <TextField value={OwnerEmail} onChange={(e)=>setOwnerEmail(e.target.value)} label='Owner Email' id='outlined' margin='normal' variant='outlined'></TextField>
                            <TextField value={classCode} onChange={(e)=>setClassCode(e.target.value)} label='Class Code' id='outlined' margin='normal' variant='outlined' sx={{
                                marginLeft: '20px',
                            }}></TextField>


                        </Box>
                    </Box>

                    {/* </Grid> */}
                    <Box
                    padding={'30px'}
                    >
                        <Typography variant='body1'> To sign in with a class code </Typography>
                        <ul>
                            <li><Typography variant='body2'> Use an Authorized Account</Typography></li>
                            <li><Typography variant='body2'> Use a class code with 5-7 letters or numbers, and no spaces or symbols</Typography></li>
                        </ul>
                        <Typography variant='body1'>If you have trouble joining the class, Email Us at <a href="@mailto:noteit@gmail">noteit@gmail.com</a> </Typography>
                    </Box>

                </Box>
                    </form>
            </Dialog>

        </Box>
    )
}
