import React, { useState, useEffect, useContext, } from "react";
import {
    Box,
    Typography,
    Grid,
    Button,
    Dialog,
    DialogContentText,
    DialogContent,
    DialogTitle,
    DialogActions,
    TextField,
    SpeedDial,
    SpeedDialAction,
} from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useAuth, AuthContext } from "../../../../../../Contexts/AuthContext";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CreateSubjects } from "./CreateSubjects";
import { SubjectCard } from "./SubjectCard";
import { doc, collection, query, onSnapshot, limit } from "firebase/firestore";
import { db } from "../../../../../../utils/firebaseDB";
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { CreateAnnouncement } from "./CreateAnnouncement";
import { AnnouncementCard } from "./AnnouncementCard";
import SettingsIcon from '@mui/icons-material/Settings';
// import { DBContext } from "../../../../Contexts/DBContext";

export const Subjects = (props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openAnnouncemtDialog, setOpenAnnouncemtDialog] = useState(false);
    const [announcementData, setAnnouncementData] = useState([]);
    const [SubjectData, setSubjectData] = useState([]);
    const { currentUser } = useAuth();
    const { data } = props;
    const { OwnerEmail, name, id } = data;
    // const {id} =useParams();
    const { setClassID, subject } = useContext(AuthContext);

    useEffect(() => {
        setClassID(id);
    }, [])

    useEffect(() => {
        if (currentUser.email) {
            const q = query(collection(db, "Announcement", id, "Announcements"),limit(3));
            const unSubscribe = onSnapshot(q, (querySnapshot) => {
                setAnnouncementData(
                    querySnapshot.docs.map((doc) => {
                        return {
                            ...doc.data(),
                            id: doc.id,
                        };
                    })
                );
            });
            return () => unSubscribe();
        }
    }, [currentUser.email])

    function handleOpenDialog() {
        setOpenDialog(true);
    }
    console.log(SubjectData);
    const actions = [
        { icon: <CampaignRoundedIcon />, name: 'Create Announcement', onClick: () => setOpenAnnouncemtDialog(true) },
        { icon: <GroupAddOutlinedIcon />, name: 'add Subject', onClick: () => setOpenDialog(true) },
    ];

    return (
        <Box
            // display="flex"
            // flexDirection="column"
            // alignItems="center"
            // justifyContent="center"
            width="1100px"
            // width={'80%'}
            // height="100%"
            padding="50px"
        >

            <Box display={'flex'}
                flexDirection="row"
                width='100%'
                justifyContent="space-between"
                borderRadius={'25px'}
                paddingTop="30px"
                paddingBottom="30px"
                paddingLeft="20px"
                paddingRight="20px"
                sx={{
                    backgroundColor: '#121212',
                    color: '#fff',
                }}
            >
                <Box >
                    <Typography padding={'5px'} fontWeight={'bold'} variant="h6"> {name} </Typography>
                    <Typography padding={'5px'} variant="body2"> {OwnerEmail} </Typography>
                    <Typography padding={'5px'} variant="body2"> {id} </Typography>
                </Box>
                <Box>
                    {currentUser.email === OwnerEmail ? (
                        <Box >
                            <Button sx={{ color: '#ffff' }} variant={'outlined'} startIcon={<SettingsIcon />}>Custumize your class</Button>
                            <SpeedDial
                                ariaLabel="SpeedDial basic example"
                                width={'30px'}
                                icon={<SpeedDialIcon />}
                                direction="right"
                                FabProps={{ size: "small" }}>
                                {/* > */}
                                {actions.map((action) => (
                                    <SpeedDialAction
                                        onClick={action.onClick}
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                    />
                                ))}
                            </SpeedDial>
                        </Box>
                    ) : null}
                </Box>
            </Box>

            <Box display={"flex"} flexDirection={"row"}>


                <CreateSubjects
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    ownerEmail={OwnerEmail}
                    classID={data.id}
                />
                <CreateAnnouncement
                    openAnnouncemtDialog={openAnnouncemtDialog}
                    setOpenAnnouncemtDialog={setOpenAnnouncemtDialog}
                    classID={data.id}
                    ownerEmail={OwnerEmail}
                />
            </Box>
            <Grid  container spacing={2}>
                <Grid container item xs ={8}>
                    {subject.map((item) => (
                        <SubjectCard key={item.id} subjectData={item} classID={id} />
                    ))}
                </Grid>

                <Grid container item xs={4}>
                    {announcementData.map((data) => {
                        return <AnnouncementCard data={data} />;
                    })}
                </Grid>
            </Grid>
        </Box>
    );
};


