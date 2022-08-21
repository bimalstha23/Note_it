import React, { useEffect, useState } from 'react'
import { Box, Typography, ListItem, List, Paper, ListItemButton, ListItemText } from '@mui/material'
import { useAuth } from '../../../../Contexts/AuthContext';
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../../../../utils/firebaseDB';
import { Link } from 'react-router-dom';

export const ChatList = () => {

  const [createdClassData, setCreatedClassData] = useState([]);
  const [joinedClassData, setJoinedClassData] = useState([]);
  const { currentUser } = useAuth();

  function fetchCreatedClasses() {
    try {
      const q = query(collection(db, 'CreatedClass', currentUser.email, 'Classes'));
      const unSubscribe = onSnapshot(q, (querySnapshot) => {
        setCreatedClassData(querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        }));
      })
    } catch (err) {
      console.log(err);
    }
  }
  function fetchJoinedClasses() {
    try {
      const q = query(collection(db, 'JoinedClasses', currentUser.email, 'Classes'));
      const unSubscribe = onSnapshot(q, (querySnapshot) => {
        setJoinedClassData(querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id
          }
        }));
      }
      )
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchCreatedClasses();
    fetchJoinedClasses();
  }, [currentUser]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      position='fixed'
      width='167px'
    >
      <Box
        display='flex'
        flexDirection='column'
        boxShadow={3}
        height='70px'
      >
        <Typography margin={'auto'} >Messages</Typography>
      </Box>
      <Paper
        style={{
          height: '100vh',
          maxHeight: '100vh',
          overflowY: 'scroll',
        }}
      >
        <List>
          {createdClassData.map(item => (
            <ListItem key={item.name}>
              <ListItemButton component={Link} to={`/chatroom/${item.id}`} >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}

          {joinedClassData.map(item => (
            <ListItem key={item.name} >
              <ListItemButton component={Link} to={`/chatroom/${item.id}`}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}
