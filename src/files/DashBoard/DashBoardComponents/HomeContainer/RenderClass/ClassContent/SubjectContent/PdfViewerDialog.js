import React, { useState } from 'react'
import { Dialog, Box, IconButton, } from '@mui/material'
import FileOpenTwoToneIcon from '@mui/icons-material/FileOpenTwoTone';
// import { Worker } from '@react-pdf-viewer/core';
// import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
export const PdfViewerDialog = (props) => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Box>
            <IconButton onClick={() => setOpen(true)}>
                <FileOpenTwoToneIcon />
            </IconButton>

            <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={handleClose}>
                <iframe src={props.src} style={{ width: '100%', height: '1000px' }} />
                {/* <DocViewer documents={props.src} pluginRenderers={DocViewerRenderers} style={{ width: '100%', height: '1000px' }}   /> */}
                {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js"> */}
                        {/* <Viewer fileUrl={props.src} />                 */}
                {/* </Worker> */}
            </Dialog>
        </Box>
    )
}
