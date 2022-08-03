import React, { useState } from 'react'
import { Container, Box, Grid, Typography, Button, Dialog, DialogContentText, TextField, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import { useUiContext } from '../../../../Contexts/UiControlContext'
import { RenderClass } from './RenderClass'

export const MainHome = () => {
    // const { createClassDialog, setCreateClassDialog } = useUiContext();

    return (
        <Container>
            <RenderClass />
        </Container>
    )
}
