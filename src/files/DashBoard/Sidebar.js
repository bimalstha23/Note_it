import React from 'react';
import { Typography, CssBaseline, Drawer, Divider, Toolbar, List, Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { useAuth } from '../../Contexts/AuthContext';
import { SidebarTheme } from '../../utils/Themes';
import { ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { sidebarNavigation } from '../../config/SidebarNavigation';
import NoteitWhite from '../../assets/NoteitWhite.png';

export function Sidebar() {
  const drawerWidth = 240;
  const { currentUser, Themes, SignOut } = useAuth();
  const backgroundColor = Themes.backgroundColor;

  

  return (
    <Box sx={{
      backgroundColor: { backgroundColor },
      color: '#FFFFFF',
    }}>
      <CssBaseline />
      <ThemeProvider theme={SidebarTheme}>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: { backgroundColor },
              color: '#FFFFFF',
            }
          }}

          sx={{
            backgroundColor: { backgroundColor },
            color: '#FFFFFF',
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
              marginTop={'15px'}
              sx={{
                backgroundColor: { backgroundColor },
              }}
            >
              <Box
                display={'flex'}
                flexDirection={'row'}
              >
                <img src={NoteitWhite} alt="Noteit" style={{ width: '37px', height: '37px' }} />
                <Typography sx={{
                  marginTop: '13px',
                }}>note it</Typography>
              </Box>

              <Box
                display={'flex'}
                margin={'auto'}
                borderRadius={'25px'}
              >
                <img
                  height={'174px'}
                  width={'174px'}
                  style={{
                    borderRadius: '25px',
                    objectFit: 'cover'
                  }}
                  src={currentUser.photoURL} alt={currentUser.displayName} />
              </Box>
              <Typography fontWeight={'bold'} paddingBottom={'15px'} variant="body1" align="center" color="textPrimary">
                {currentUser.displayName}
              </Typography>

            </Box>
          </Toolbar>
          <Divider variant={'middle'} />
          <List>
            {sidebarNavigation.map((navigation, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component={Link} to={navigation.to} >
                  <ListItemIcon>
                    {index === 0 ? <HomeOutlinedIcon /> : index === 1 ? <ChatBubbleOutlineOutlinedIcon /> : index === 2 ? <NoteOutlinedIcon /> : index === 3 ? <ClassOutlinedIcon /> : index === 4 ? <SettingsIcon /> : null}
                  </ListItemIcon>
                  <ListItemText primary={navigation.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List
            sx={{
              bottom: '-120px',
            }}
          >
            {['Sign Out'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
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
      </ThemeProvider>
    </Box>
  );
}
