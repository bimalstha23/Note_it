import React, { useState } from 'react'
import { Container, Box, Grid, Typography, Button, Dialog, DialogContentText, TextField, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { useUiContext } from '../../../../Contexts/UiControlContext'
import { RenderClass } from './RenderClass'

export const MainHome = () => {
    // const { createClassDialog, setCreateClassDialog } = useUiContext();

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={8.5}>
            <RenderClass />
            </Grid>
            <Grid item xs={12} sm={3.5}>
            {/* <RenderClass /> */}
            </Grid>
            </Grid>
        </Container>
    )
}
