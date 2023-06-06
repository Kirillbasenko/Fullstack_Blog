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

import { useSelector } from 'react-redux';

import { updateBackground } from '@/http/userApi';
import { upload } from '@/http/imageApi';

import styles from "./updateBackground.module.scss"

const UpdateBackground = ({open, handleClose, background, id}) => {
   const [src, setSrc] = useState("")
   const file = useRef(null)

   const {width} = useSelector(state => state.width)

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
         <Box 
         //className={styles.modal}
            sx={{
               position: "absolute",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               width: width > 576 ? "510px" : "90%",
               background: "#143685",
               border: "2px solid #000",
               boxShadow: "24px",
               borderRadius: "10px",
               padding: "16px",
               display: "flex",
               flexDirection: "column"
            }}>
            <Box 
               //className={styles.flex}
               sx={{
                  display: "flex",
                  justifyContent: "space-between"
               }}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Update background
               </Typography>
               <IconButton onClick={handleClose} color="primary" aria-label="upload picture" component="label">
                  <CloseIcon />
               </IconButton>
            </Box>
            <CardMedia
               //className={styles.image}
               sx={{
                  width: width > 576 ? "450px" : "90%",
                  height: "230px",
                  margin: "0 auto"
               }}
               component="img"
               image={src.length !== 0 ? `http://localhost:5000${src}` : "/backGround.jpg"}
               alt="green iguana"/>
            <Box 
               //className={styles.buttonCenter}
               sx={{
                  textAlign: "center",
                  marginTop: "20px"
               }}>
               <Button component="label" variant="text" endIcon={src && src.length === 0 ? <CameraAltIcon /> : <FlipCameraIosIcon/>}>
                  {src && src.length !== 0 ? "Сhange" : "Add"}
                  <input onChange={(e) => douwload(e)} 
                  ref={file} hidden accept="image/*" type="file" />
               </Button>
            </Box>
            <Box 
               //className={styles.buttonCenter}
               sx={{
                  marginRight: "10px",
                  justifyContent: "center",
                  display: "flex"
               }}>
               <Button 
                  onClick={() => submitUserBackground()} 
                  className={styles.buttonSubmit}  
                  sx={{
                     marginRight: "10px"
                  }}
                  size='small'
                  color='success' 
                  variant="contained" 
                  endIcon={<SendIcon />}>
                  upload
               </Button>
               {src && src.length !== 0 ? 
               <Button onClick={() => setSrc("")} size='small' color='error' variant="contained" endIcon={<DeleteIcon />}>
                  Delete
               </Button> : null}
            </Box>
         </Box>
      </Modal>
   )
}

export default UpdateBackground