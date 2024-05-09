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

import Compressor from 'compressorjs';

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

   const {width} = useSelector(state => state.width)

   useEffect(() => {
      setSrc(userImage)
      setAvatar(avatarImage)
   }, [userImage, avatarImage])

   /*const douwload = async (e) => {
      try{
         const formData = new FormData()
         const file =  e.target.files[0]
         formData.append("image", file)
         upload(formData).then(data => setSrc(data.url))
         setAvatar('')
         console.log(avatar);
         console.log(src);
      }catch(e){
         console.log(e);
      }
   }*/

   console.log(avatar);

   const douwload = async (e) => {
      const file = e.target.files[0];
         if (file) {
            new Compressor(file, {
               quality: 0.1, // качество сжатия, от 0 до 1
               maxWidth: 800, // максимальная ширина изображения
               maxHeight: 800, // максимальная высота изображения
               success(result) {
               // result - сжатое изображение в формате Blob
               const reader = new FileReader();
               reader.onload = () => {
                  setSrc(reader.result);
               };
               setAvatar('')
               reader.readAsDataURL(result);
               },
               error(err) {
               console.error('Compression error:', err);
               },
            });
         }
   }

   const changeQuality = (base64String, quality) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64String;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Преобразуйте изображение canvas обратно в base64 с новым качеством
      const newBase64String = canvas.toDataURL('image/jpeg', quality);
      
      // Вернуть новую строку base64 с измененным качеством
      resolve(newBase64String);
    };
    img.onerror = reject;
  });
};

// Пример использования
   changeQuality(avatar, 0.2)
      .then(newBase64Image => {
         changeSrc(newBase64Image);
         // Используйте новую строку base64 с измененным качеством
      })
      .catch(error => {
         console.error(error);
   });


   //console.log(src);
   //console.log(avatar);

   const deleteSrc = () => {
      setSrc("")
      setAvatar("")
   }


   /*const changeSrc = (newSrc) => {
      const formData = new FormData()
      formData.append("image", newSrc)
      upload(formData).then(data => setAvatar(data.url))
   }*/

   const changeSrc = (newSrc) => {
      setAvatar(newSrc)
      //console.log(newSrc);
   }

   const submitUserPhoto = () => {
      updatePhoto(id, src.length !== 0 ? src : "/upload/avatarUser.jpg", avatar.length !== 0 && src.length !== 0 ? avatar : src)
      handleClose()
   }

   return(
      <Modal
         open={open}
         onClose={handleClose}>
         <Box sx={{width: width > 768 ? 500 : "85%"}} className={styles.modal}>
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
               image={avatar.length !== 0 ? avatar : src.length !== 0 ? src : "/avatarUser.jpg"}
               //image={src}
               //image={avatar}
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
               <Button onClick={() =>{submitUserPhoto()}} className={styles.buttonSubmit}  color='success' variant="contained" endIcon={<SendIcon />}>
                  upload
               </Button>
               {src && src !== "/upload/avatarUser.jpg" && src.length !== 0 ? <Button onClick={deleteSrc} color='error' variant="contained" endIcon={<DeleteIcon />}>
                  Delete
               </Button> : null}
               <EditAvatarModal changeQuality={changeQuality} changeSrc={changeSrc} avatar={avatar} src={src} open={openEdit} handleClose={() => setOpenEdit(false)}/>
            </Box>
         </Box>
      </Modal>
   )
}

export default UpdatePhoto