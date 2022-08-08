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
import { useAuth, AuthContext } from "../../../../Contexts/AuthContext";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CreateSubjects } from "./CreateSubjects";
import { SubjectCard } from "./SubjectCard";
import { doc, collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../../../utils/firebaseDB";
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { CreateAnnouncement } from "../CreateAnnouncement";
import { AnnouncementCard } from "./AnnouncementCard";
// import { DBContext } from "../../../../Contexts/DBContext";

export const Subjects = (props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openAnnouncemtDialog, setOpenAnnouncemtDialog] = useState(false);
    const [announcementData,setAnnouncementData] = useState([]);
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
            const q = query(collection(db, "Announcement",id, "Announcements"));
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
        <Box>
            <Box display={"flex"} flexDirection={"row"}>
                <Typography paddingRight={2} fontWeight={"Bold"} variant="h5">
                    {name}
                </Typography>
                {currentUser.email === OwnerEmail ? (
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
                ) : null}
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
            <Box>
                {announcementData.map((data) => {
                    return <AnnouncementCard data={data} />;
                })}
            </Box>

            {/* // <AnnouncementCard data={data} /> */}
            <Grid container spacing={2}>
                {subject.map((item) => (
                    <SubjectCard key={item.id} subjectData={item} classID={id} />
                ))}
            </Grid>
        </Box>
    );
};


