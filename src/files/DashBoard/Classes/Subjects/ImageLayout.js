import React from 'react'
import { Box, Grid } from '@mui/material'

export const ImageLayout = (props) => {
    const { images } = props
    return (
        <Box>
            {images.length ===1? <LayoutForoneImage images={images} /> : images.length === 2 ? <LayoutFortwoImage images={images} /> : images.length === 3 ? <LayoutForthreeImage images={images} /> : <LayoutForfourImage images={images} />}
        </Box>
    )
}
const imageStyle = {
    maxWidth: '100%',
}

const LayoutForoneImage = (props) => {
    const { images } = props
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <img style={imageStyle}  src={images[0]} alt="" />
            </Grid>
        </Grid>
    )
}

const LayoutFortwoImage = (props) => {
    const { images } = props
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <img style={imageStyle} src={images[0]} alt="" />
            </Grid>
            <Grid item xs={12}>
                <img style={imageStyle} src={images[1]} alt="" />
            </Grid>
        </Grid>
    )
}

const LayoutForthreeImage = (props) => {
    const { images } = props
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <img style={imageStyle} src={images[0]} alt="" />
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs={6}>
                    <img style={imageStyle} src={images[1]} alt="" />
                </Grid>
                <Grid item xs={6}>
                    <img style={imageStyle} src={images[2]} alt="" />
                </Grid>
            </Grid>
        </Grid>
    )
}

const LayoutForfourImage = (props) => {
    const { images } = props
    return (
        <Grid container>
            <Grid item xs={12}>
                <img style={imageStyle} src={images[0]} alt="" />
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs={4}>
                    <img style={imageStyle} src={images[1]} alt="" />
                </Grid>
                <Grid item xs={4}>
                    <img style={imageStyle} src={images[2]} alt="" />
                </Grid>
                <Grid item xs={4}>
                    <img style={imageStyle} src={images[3]} alt="" />
                </Grid>
            </Grid>
        </Grid>
    )
}
