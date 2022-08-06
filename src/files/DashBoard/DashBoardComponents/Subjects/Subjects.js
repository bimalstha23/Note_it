import React, { useState, useEffect } from "react";
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
import { useAuth } from "../../../../Contexts/AuthContext";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CreateSubjects } from "../../Classes/Subjects/CreateSubjects";
import { SubjectCard } from "../../Classes/Subjects/SubjectCard";
import { doc, collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../../../utils/firebaseDB";
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { CreateAnnouncement } from "./CreateAnnouncement";
import { AnnouncementCard } from "./AnnouncementCard";

export const Subjects = (props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openAnnouncemtDialog, setOpenAnnouncemtDialog] = useState(false);
    const [Subjects, setSubjects] = useState([]);
    const { currentUser } = useAuth();
    const { data } = props;
    const { name, OwnerEmail, id } = data;
    function handleOpenDialog() {
        setOpenDialog(true);
    }

    useEffect(() => {
        if (currentUser.email) {
            const q = query(collection(db, "CreatedSubject", id, "Subjects"));
            const unSubscribe = onSnapshot(q, (querySnapshot) => {
                setSubjects(
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
    }, [currentUser.email]);

    console.log(Subjects);

    const actions = [
        { icon: <CampaignRoundedIcon />, name: 'Create Announcement', onClick: () => setOpenAnnouncemtDialog(true) },
        { icon: <GroupAddOutlinedIcon />, name: 'add Subject', onClick: () => setOpenDialog(true) },
    ];

    return (
        <Box>
            <AnnouncementCard data={data} />
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
            <Grid container spacing={2}>
                {Subjects.map((item) => (
                    <SubjectCard key={item.id} subjectData={item} />
                ))}
            </Grid>
        </Box>
    );
};
