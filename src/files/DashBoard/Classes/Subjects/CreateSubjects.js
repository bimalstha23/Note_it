import React from 'react'
import {Box,Dialog,TextField,DialogContent,DialogTitle,Button,DialogActions} from '@mui/material'


export const CreateSubjects = (props) => {

  return (
    <Box>
            <Dialog fullWidth={''} open={createClassDialog} onClose={handleClose}>
                <form action="">
                    <DialogTitle>CreateClass</DialogTitle>
                    <DialogContent>
                        <TextField onChange={(e) => { setClassName(e.target.value) }} type={'text'} margin='normal' id="outlined" label="Class Name" variant="outlined" fullWidth required />
                        <TextField onChange={(e) => { setInstituteName(e.target.value) }} type={'text'} margin='normal' id="outlined" label="Institute Name" variant="outlined" fullWidth required />
                        <TextField onChange={(e) => { setSubjectNumber(e.target.value) }} type={'number'} margin='normal' id="outlined" label="Number of Subjects" variant="outlined" fullWidth required />
                        <TextField onchange={(e) => { setRoomNumber(e.target.value) }} type={'number'} margin='normal' id="outlined" label="Room" variant="outlined" fullWidth required />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' onClick={handleClose}>Cancel</Button>
                        <Button type='submit' variant='contained'>Create</Button>
                    </DialogActions>
                </form>
            </Dialog>
    </Box>
  )
}
