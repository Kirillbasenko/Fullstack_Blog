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

import { updatePhoto } from '@/http/userApi';
import { upload } from '@/http/imageApi';

import { useSelector } from 'react-redux'

import styles from "./updatePhoto.module.scss"

const UpdatePhoto = ({open, handleClose, userImage, id, avatarImage}) => {
   const [openEdit, setOpenEdit] = useState(false);
   const [src, setSrc] = useState(userImage)
   const [avatar, setAvatar] = useState(avatarImage)
   const file = useRef(null)

   useEffect(() => {
      setSrc(userImage)
      setAvatar(avatarImage)
   }, [userImage, avatarImage])

   const douwload = async (e) => {
      try{
         const formData = new FormData()
         const file =  e.target.files[0]
         formData.append("image", file)
         upload(formData).then(data => setSrc(data.url))
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
      updatePhoto(id, src.length !== 0 ? src : "/upload/avatarUser.jpg", avatar !== 0 ? avatar : "/upload/avatarUser.jpg")
      handleClose()
   }

   return(
      <Modal
         open={open}
         onClose={handleClose}>
         <Box className={styles.modal}>
            <Box className={styles.flex}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Update photo
               </Typography>
               <IconButton onClick={() => handleClose()} color="primary" aria-label="upload picture" component="label">
                  <CloseIcon />
               </IconButton>
            </Box>
            <CardMedia
               className={styles.image}
               component="img"
               image={avatar.length !== 0 ? `https://zebra-gabardine.cyclic.app${avatar}` : src.length !== 0 ? `https://zebra-gabardine.cyclic.app${src}` : "/avatarUser.jpg"}
               alt="green iguana"/>
            <Box className={styles.buttonCenter}>
               <Button component="label"  variant="text" endIcon={src.length !== 0 && src !== "/upload/avatarUser.jpg" ?<FlipCameraIosIcon/> : <CameraAltIcon />}>
                  {src !== "/upload/avatarUser.jpg" && src.length !== 0 ? "Сhange" : "Add"}
                  <input onChange={(e) => douwload(e)} 
                  ref={file} hidden accept="image/*" type="file" />
               </Button>
            </Box>
            <Box className={styles.buttonCenter}>
               {src && src !== "/upload/avatarUser.jpg" && src.length !== 0 ? <Button onClick={() => setOpenEdit(true)} className={styles.buttonSubmit}  color='secondary' variant="contained" endIcon={<EditIcon />}>
                  edit
               </Button> : null}
               <Button onClick={() => submitUserPhoto()} className={styles.buttonSubmit}  color='success' variant="contained" endIcon={<SendIcon />}>
                  upload
               </Button>
               {src && src !== "/upload/avatarUser.jpg" && src.length !== 0 ? <Button onClick={deleteSrc} color='error' variant="contained" endIcon={<DeleteIcon />}>
                  Delete
               </Button> : null}
               <EditAvatarModal changeSrc={changeSrc} avatar={avatar} src={src} open={openEdit} handleClose={() => setOpenEdit(false)}/>
            </Box>
         </Box>
      </Modal>
   )
}

export default UpdatePhoto