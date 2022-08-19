import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './drop-file-input.css';
import { ImageConfig } from '../../../../../../../../config/imageConfig';
import uploadImg from '../../../../../../../../assets/upload.png';
import { Box,Dialog,DialogTitle, Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DropFileInput = props => {

    const wrapperRef = useRef(null);
    const {showuploadDialog, setShowuploadDialog,onFileChange} = props;
    console.log(showuploadDialog)
    const [fileList, setFileList] = useState([]);
    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');
    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        onFileChange(updatedList);
    }

    const deleteFiles = () => {
        setShowuploadDialog(false);
        setFileList([]);
        onFileChange([]);
    }
    const handleClose = () => {
        setShowuploadDialog(false);
    }

    return (
        <>
            <Dialog
                maxWidth={'md'}
                open={showuploadDialog}
                onClose={handleClose} >
                <DialogTitle>Upload Files</DialogTitle>
                <div
                    ref={wrapperRef}
                    className="drop-file-input"
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <div className="drop-file-input__label">
                        <img src={uploadImg} alt="" />
                        <p>Drag & Drop your files here</p>
                    </div>
                    <input type="file" value="" onChange={onFileDrop} />
                </div>
                {
                    fileList.length > 0 ? (
                        <div className="drop-file-preview">
                            <p className="drop-file-preview__title">
                                Ready to upload
                            </p>
                            {
                                fileList.map((item, index) => (
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        boxShadow={'0 0 5px #ddd'}
                                        borderRadius={'25px'}
                                        padding={'10px'}
                                        sx={{
                                            justifyContent: 'space-between',
                                        }}
                                        key={index}>
                                        <img height={'50px'} src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                        <Box display={'flex'}
                                            flexDirection={'column'}
                                            paddingLeft={'5px'}>
                                            <Typography variant="body" align="left" color="textPrimary">{item.name}</Typography>
                                            <Typography variant="body" align="left" color="textPrimary">{item.size}</Typography>
                                        </Box>
                                        <IconButton>
                                            <DeleteIcon onClick={() => fileRemove(item)} />
                                        </IconButton>
                                    </Box>
                                ))
                            }
                        </div>
                    ) : null
                }
                <Button onClick={deleteFiles} color="primary">
                    Cancel
                </Button>
                <Button 
                onClick={()=>{setShowuploadDialog(false)}}
                 color="primary">
                    Upload
                </Button>
            </Dialog>
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}
export default DropFileInput;
