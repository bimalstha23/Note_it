import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../../../Contexts/AuthContext'
export const SubjectCard = (props) => {
  const { Themes } = useAuth();
  const backgroundColor = Themes.backgroundColor;
  const { subjectData } = props;
  return (
    <Grid item xs={6}>
      <Box
        width={'290px'}
        height={'136px'}
        alignItems={'left'}
        // margin={'auto'}
        boxShadow={'0 0 5px #ddd'}
        borderRadius={'25px'}
        padding={'30px'}
        sx={{
          backgroundColor: { backgroundColor },
          color: '#FFFFFF',
          '&:hover': {
            boxShadow: '5px 5px 10px #ddd',
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
            backgroundColor: { backgroundColor },
            color: '#FFFFFF',
            '&:hover': {
              boxShadow: '5px 5px 10px #ddd',
              backgroundColor: '#FFFFFF',
              color: '#121212',
            },
          }}
        >

          <Typography variant='body1' fontWeight={'bold'}  >{subjectData.subjectName}</Typography>
          <Typography variant='subtitle1' color={'#A1A1A1'} >{subjectData.teacherName} </Typography>
          <Typography variant='subtitle1' color={'#A1A1A1'}>{subjectData.teacherEmail}</Typography>
        </Box>
      </Box>
    </Grid>
  )
}
