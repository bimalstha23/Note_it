import * as React from 'react';
import {Typography, Card,CardMedia, CssBaseline, Drawer, Divider,Toolbar,List, Box,ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import {useAuth} from '../../Contexts/AuthContext';

export function Sidebar() {
    const drawerWidth = 240;
    const {currentUser,SignOut} = useAuth();
    return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
        <Box
        display={'flex'}
        flexDirection={'column'}
        margin={'auto'}
        marginTop={'50px'}
        >
        <Card
        borderRadius={'24px'}
        margin={'auto'}
        marginButtom={'10px'}
        >
            <CardMedia
            component="img"
            alt = "Profile"
            height="174px"
            width="174px"
            borderRadius={'25px'}
            image={currentUser.photoURL}
            />
        </Card>       
            <Typography variant="body" align="center" color="textPrimary">
            {currentUser.displayName}
            </Typography>

        </Box>
        </Toolbar>
        <Divider variant ={'middle'} />
        <List>
          {['Home', 'Messenger', 'Classroom', 'Notes','Settings'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton >
                <ListItemIcon>
                  {index === 0 ? <HomeOutlinedIcon /> : index === 1 ? <ChatBubbleOutlineOutlinedIcon /> : index === 2 ? <NoteOutlinedIcon /> : index === 3 ? <ClassOutlinedIcon /> : index === 4 ? <SettingsIcon /> : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
        <List>
            {['Sign Out'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton 
                onClick={()=>{
                    console.log('signout');
                    SignOut();
                  }} >
                    <ListItemIcon>
                        <LogoutOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        
      </Box>
    </Box>
  );
}
