import React, { useState, useEffect } from 'react'
import { Box,Typography, } from '@mui/material'
import { useAuth } from '../../../../Contexts/AuthContext'
import { db } from '../../../../utils/firebaseDB'
import { collection, query, onSnapshot } from 'firebase/firestore'

export const AnnouncementCard = (props) => {
    const [Announcement, setAnnouncement] = useState([]);
    const { data } = props;
    const { name, OwnerEmail, id } = data;
    const {currentUser} = useAuth();

    useEffect(() => {
        if (currentUser.email) {
            const q = query(collection(db, "Announcement",id, "Announcements"));
            const unSubscribe = onSnapshot(q, (querySnapshot) => {
                setAnnouncement(
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
    console.log(Announcement);
    return (
        <Box>
            {Announcement.map((data) => (
                <Box>
                    <Typography>
                        {data.title}
                    </Typography>
                </Box>
            ))}
        </Box>
    )
}
