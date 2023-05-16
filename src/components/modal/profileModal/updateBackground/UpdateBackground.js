import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CardMedia from '@mui/material/CardMedia';

import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import { useRef, useState, useEffect } from 'react';

import { updateBackground } from '@/http/userApi';
import { upload } from '@/http/imageApi';

import styles from "./updateBackground.module.scss"

const UpdateBackground = ({open, handleClose, background, id}) => {
   const [src, setSrc] = useState("")
   const file = useRef(null)

   useEffect(() => {
      setSrc(background)
   }, [background, open])

   const douwload = async (e) => {
      try{
         const formData = new FormData()
         const file =  e.target.files[0]
         formData.append("image", file)
         upload(formData).then(data => setSrc(data.url))
      }catch(e){
         console.log(e);
      }
   }

   const submitUserBackground = () => {
      updateBackground(id, src.length !== 0 ? src : "/upload/backGround.jpg")
      handleClose()
   }

   return(
      <Modal
         open={open}
         onClose={handleClose}>
         <Box className={styles.modal}>
            <Box className={styles.flex}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Update background
               </Typography>
               <IconButton onClick={handleClose} color="primary" aria-label="upload picture" component="label">
                  <CloseIcon />
               </IconButton>
            </Box>
            <CardMedia
               className={styles.image}
               component="img"
               image={src.length !== 0 ? `http://localhost:5000${src}` : "/backGround.jpg"}
               alt="green iguana"/>
            <Box className={styles.buttonCenter}>
               <Button component="label"  variant="text" endIcon={src && src.length === 0 ? <CameraAltIcon /> : <FlipCameraIosIcon/>}>
                  {src && src.length !== 0 ? "Сhange" : "Add"}
                  <input onChange={(e) => douwload(e)} 
                  ref={file} hidden accept="image/*" type="file" />
               </Button>
            </Box>
            <Box className={styles.buttonCenter}>
               <Button onClick={() => submitUserBackground()} className={styles.buttonSubmit}  color='success' variant="contained" endIcon={<SendIcon />}>
                  upload
               </Button>
               {src && src.length !== 0 ? <Button onClick={() => setSrc("")} color='error' variant="contained" endIcon={<DeleteIcon />}>
                  Delete
               </Button> : null}
            </Box>
         </Box>
      </Modal>
   )
}

export default UpdateBackground