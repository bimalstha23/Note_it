import React, { useState } from 'react'
import { Card, Avatar, Collapse, Alert, Slide, Toolbar, AppBar, IconButton, Box, Typography, Button, Dialog, CardHeader, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../../../../Contexts/AuthContext';
import { setDoc, getDoc, doc, } from 'firebase/firestore';
import { db } from '../../../../../utils/firebaseDB';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const JoinClass = (props) => {
    const { joinClassDialog, setJoinClassDialog, setSuccess, setSuccessMessage } = props;
    const [OwnerEmail, setOwnerEmail] = useState('');
    const [classCode, setClassCode] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // const [classData, setClassData] = useState(null);
    // const [classExists, setClassExists] = useState(false);
    const { currentUser, SignOut, Themes } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const paperColor = Themes.paperColor;
    const backgroundColor = Themes.backgroundColor;

    function handleClose() {
        setJoinClassDialog(false);
    }


    return (
        <Box>
            <Dialog

                PaperProps={{
                    style: {
                        backgroundColor: paperColor,
                    }
                }}
                fullScreen
                open={joinClassDialog}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <form action=""
                    onSubmit={
                        async (e) => {
                            e.preventDefault();
                            setIsLoading(true);
                            const classRef = doc(db, 'CreatedClass', OwnerEmail, 'Classes', classCode);
                            await getDoc(classRef).then(async (classSnap) => {
                                if (classSnap.exists() && classSnap.data().OwnerEmail !== currentUser.email) {
                                    // setClassData(classSnap.data());
                                    const joinClassRef = doc(db, 'JoinedClasses', currentUser.email, 'Classes', classCode);
                                    await setDoc(joinClassRef, classSnap.data()).then(() => {
                                        setJoinClassDialog(false);
                                        setSuccess(true);
                                        setSuccessMessage('You have successfully joined the class');
                                        setIsLoading(false);
                                    }).catch(err => {
                                        setError(true);
                                        setErrorMessage(err.message);
                                        setIsLoading(false);
                                    });
                                } else {
                                    // setClassExists(false);
                                    setError(true);
                                    setErrorMessage('Class does not exist or you are the owner of the class');
                                    setIsLoading(false);
                                }
                            }).catch(err => {
                                setError(true);
                                setErrorMessage(err.message);
                                setIsLoading(false);
                            }).finally(() => {
                                setIsLoading(false);
                            })
                            setIsLoading(false);
                        }
                    }>

                    <AppBar
                        sx={{
                            position: 'relative',
                            backgroundColor: backgroundColor,
                            // color: '#000',
                        }}>
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
                            <LoadingButton loading={isLoading} type='submit' variant='outlined' color='inherit'>

                                Join
                            </LoadingButton>
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
                                backgroundColor={paperColor}
                                sx={{
                                    backgroundColor: paperColor,
                                }}
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
                                <TextField required type={'email'} value={OwnerEmail} autoFocus onChange={(e) => setOwnerEmail(e.target.value)} label='Owner Email' id='outlined' margin='normal' variant='outlined'></TextField>
                                <TextField required type={'text'} value={classCode} onChange={(e) => setClassCode(e.target.value)} label='Class Code' id='outlined' margin='normal' variant='outlined' sx={{
                                    marginLeft: '20px',
                                }}></TextField>

                            </Box>
                            <Collapse in={error}>
                                <Alert severity='error'
                                    action={
                                        <IconButton
                                            onClick={() => setError(false)}
                                            aria-label="close"
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    }>
                                    {errorMessage}
                                </Alert>
                            </Collapse>
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
