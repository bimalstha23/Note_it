import React from 'react'
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useAuth } from '../../../../Contexts/AuthContext'
import blueTheme from '../../../../assets/blueTheme.png'
import DarkTheme from '../../../../assets/DarkTheme.png'
import darkblueTheme from '../../../../assets/darkblueTheme.png'

export const ChooseTheme = () => {

  const { Theme, setTheme } = useAuth();
  // const backgroundColor = Themes.backgroundColor;
  const HandleTheme = (event, newTheme) => {
    setTheme(newTheme);
  }
  return (
    <Box>
      <Typography>Choose Theme</Typography>
      <ToggleButtonGroup
        value={Theme}
        exclusive
        onChange={HandleTheme}
      >
        <ToggleButton value='Black'>
          <img src={DarkTheme} style={{
            width: '250px',
            height: '150px',
          }} alt="" />
        </ToggleButton>
        <ToggleButton value='Purple'>
          <img style={{
            width: '250px',
            height: '150px',
          }} src={darkblueTheme} alt="" />
        </ToggleButton>
        <ToggleButton value='Blue'>
          <img style={{
            width: '250px',
            height: '150px',
          }} src={blueTheme} alt="" />
        </ToggleButton>
      </ToggleButtonGroup>


    </Box>
  )
}
