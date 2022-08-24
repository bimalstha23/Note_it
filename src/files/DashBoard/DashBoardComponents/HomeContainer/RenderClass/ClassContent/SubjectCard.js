import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../../../Contexts/AuthContext'
export const SubjectCard = (props) => {
  const {Themes} = useAuth();
  const backgroundColor = Themes.backgroundColor;
  const { subjectData } = props;
  return (
    <Grid item xs={6}>
      <Box
        width={'290px'}
        height={'136px'}
        alignItems={'left'}
        margin={'auto'}
        boxShadow={'0 0 5px #ddd'}
        borderRadius={'25px'}
        padding={'30px'}
        sx={{
          backgroundColor: { backgroundColor },
          color: '#FFFFFF',
          '&:hover': {
            boxShadow: '0 0 5px #ddd',
            backgroundColor: '#FFFFFF',
            color: '#121212',
          },
        }}
      >
        <Box
          // width={'100%'}
          // height={'100%'}
          component={Link}
          to={`/${subjectData.id}`}
          sx={{
            textDecoration: 'none',
            backgroundColor: '#121212',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#FFFFFF',
              color: '#121212',
            },
          }}
        >

          <Typography>{subjectData.subjectName}</Typography>
          <Typography>{subjectData.teacherName}</Typography>
          <Typography>{subjectData.teacherEmail}</Typography>
        </Box>
      </Box>
    </Grid>
  )
}
