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
import EditIcon from '@mui/icons-material/Edit';

import EditAvatarModal from '../editAvatar/EditAvatarModal';

import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { updatePhoto } from '@/http/userApi';
import { upload } from '@/http/imageApi';

import styles from "./updatePhoto.module.scss"

const UpdatePhoto = ({open, handleClose, userImage, id, avatarImage}) => {
   const [openEdit, setOpenEdit] = useState(false);
   const [src, setSrc] = useState(userImage)
   const [avatar, setAvatar] = useState(avatarImage)
   const file = useRef(null)

   const {width} = useSelector(state => state.width)

   useEffect(() => {
      setSrc(userImage)
      setAvatar(avatarImage)
   }, [userImage, avatarImage])

   const douwload = async (e) => {
      try{
         const formData = new FormData()
         const file =  e.target.files[0]
         formData.append("image", file)
         upload(formData).then(data => {
            setSrc(data.url)
            setAvatar(data.url)
         } )
         setAvatar('')
      }catch(e){
         console.log(e);
      }
   }

   const deleteSrc = () => {
      setSrc("")
      setAvatar("")
   }

   const changeSrc = (newSrc) => {
      const formData = new FormData()
      formData.append("image", newSrc)
      upload(formData).then(data => setAvatar(data.url))
   }

   const submitUserPhoto = () => {
      updatePhoto(id, src.length !== 0 ? src : "/upload/avatarUser.jpg", avatar.length !== 0 ? avatar : "/upload/avatarUser.jpg")
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
               minWidth: width > 576 ? "510px" : "90%",
               background: "#143685",
               border: "2px solid #000",
               boxShadow: "24px",
               borderRadius: "10px",
               padding: "16px",
               display: "flex",
               flexDirection: "column"
            }}>
            <Box 
               className={styles.flex}
               sx={{
                  display: "flex",
                  justifyContent: "space-between"
               }}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Update photo
               </Typography>
               <IconButton onClick={() => handleClose()} color="primary" aria-label="upload picture" component="label">
                  <CloseIcon />
               </IconButton>
            </Box>
            <CardMedia
               className={styles.image}
               sx={{
                  objectFit: "fill",
                  borderRadius: "50%",
                  width: "300px",
                  height: "300px",
                  margin: "0 auto",
                  border: "1px solid rgb(180, 178, 178)"
               }}
               component="img"
               image={avatar.length !== 0 ? `http://localhost:5000${avatar}` : src.length !== 0 ? `http://localhost:5000${src}` : "/avatarUser.jpg"}
               alt="green iguana"/>
            <Box 
               className={styles.buttonCenter}
               sx={{
                  textAlign: "center",
                  marginTop: "20px"
               }}>
               <Button component="label"  variant="text" endIcon={src.length !== 0 && src !== "/upload/avatarUser.jpg" ?<FlipCameraIosIcon/> : <CameraAltIcon />}>
                  {src !== "/upload/avatarUser.jpg" && src.length !== 0 ? "Сhange" : "Add"}
                  <input onChange={(e) => douwload(e)} 
                  ref={file} hidden accept="image/*" type="file" />
               </Button>
            </Box>
            <Box 
               className={styles.buttonCenter}
               sx={{
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: "10px"
               }}>
               {src && src !== "/upload/avatarUser.jpg" && src.length !== 0 ? <Button onClick={() => setOpenEdit(true)} sx={{marginRight: "10px"}} size="small"  className={styles.buttonSubmit}  color='secondary' variant="contained" endIcon={<EditIcon />}>
                  edit
               </Button> : null}
               <Button onClick={() => submitUserPhoto()} sx={{marginRight: "10px"}} size="small" className={styles.buttonSubmit}  color='success' variant="contained" endIcon={<SendIcon />}>
                  upload
               </Button>
               {src && src !== "/upload/avatarUser.jpg" && src.length !== 0 ? <Button onClick={deleteSrc} size="small"  color='error' variant="contained" endIcon={<DeleteIcon />}>
                  Delete
               </Button> : null}
               <EditAvatarModal changeSrc={changeSrc} avatar={avatar} src={src} open={openEdit} handleClose={() => setOpenEdit(false)}/>
            </Box>
         </Box>
      </Modal>
   )
}

export default UpdatePhoto