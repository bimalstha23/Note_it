import React from 'react'
import { Box, Typography, ToggleButton,  ToggleButtonGroup } from '@mui/material'
import { useAuth } from '../../../../Contexts/AuthContext'

export const ChooseTheme = () => {

  const { Theme,  setTheme } = useAuth();
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
          <img src="https://upload.wikimedia.org/wikipedia/en/d/d9/Elizabeth_Olsen_as_Wanda_Maximoff.jpg" alt="" />
        </ToggleButton>
        <ToggleButton value='Purple'>
          <img src="https://upload.wikimedia.org/wikipedia/en/d/d9/Elizabeth_Olsen_as_Wanda_Maximoff.jpg" alt="" />
        </ToggleButton>
        <ToggleButton value='Blue'>
          <img src="https://upload.wikimedia.org/wikipedia/en/d/d9/Elizabeth_Olsen_as_Wanda_Maximoff.jpg" alt="" />
        </ToggleButton>
      </ToggleButtonGroup>


    </Box>
  )
}
