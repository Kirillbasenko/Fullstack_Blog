import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import SaveAsIcon from '@mui/icons-material/SaveAs';

import styles from "./editAvatarModal.module.scss"

const EditAvatarModal = ({open, handleClose, src, avatar, changeSrc}) => {
   const [srcEdit, setSrcEdit] = useState(src)
   const [preview, setPreview] = useState(null)
   const [AvatarEdit, setAvatarEdit] = useState(null);

   const {width} = useSelector(state => state.width)

   const loadAvatarComponent = async () => {
      const { default: Avatar } = await import('react-avatar-edit');
      setAvatarEdit(() => Avatar);
   };

   useEffect(() => {
      loadAvatarComponent()
   }, [open])

   useEffect(() => {
      setSrcEdit(src)
   }, [src])

   const onClose = () => {
      setPreview(null)
   }

   const onCrop = (view) => {
      setPreview(view);
   }

   console.log(avatar);

   function base64toFile(base64Data, fileName) {
      const [contentType, content] = base64Data.split(';base64,');
      
      const byteCharacters = atob(content);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
         byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([new Uint8Array(byteNumbers)], { type: contentType });

      return new File([blob], fileName, { type: contentType });
   }


   if(preview){
      let randomNum = Math.random() * 1000000
      const file = base64toFile(preview, `${randomNum.toFixed(0)}example.jpg`);
   }

   return(
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description">
         <Box 
            //className={styles.modal}
            sx={{
               position: "absolute",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               width: width > 576 ? "510px" : "95%",
               background: "#051f5c",
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
                  Edit photo
               </Typography>
               <IconButton onClick={() => handleClose()} color="primary" aria-label="upload picture" component="label">
                  <CloseIcon />
               </IconButton>
            </Box>
            <Box 
               //className={styles.avatar}
               sx={{
                  margin: "0 auto"
               }}>
               {AvatarEdit && <AvatarEdit
                  width={width > 576 ? 350 : 200}
                  height={width > 576 ? 300 : 200}
                  onClose={onClose}
                  onCrop={onCrop}
                  exportSize={200}
                  src={`http://localhost:5000${src}`}/>}
            </Box>
            <Box 
               //className={styles.buttonCenter}
               sx={{
                  textAlign: "center",
                  marginTop: "20px"
               }}>
               <Button 
                  onClick={() => {
                     if(preview){
                        let randomNum = Math.random() * 1000000
                        const file = base64toFile(preview, `${randomNum.toFixed(0)}example.jpg`);
                        changeSrc(file)
                     }
                     handleClose()
                  }}  
                  //className={styles.buttonSubmit}  
                  sx={{
                     marginRight: "10px"
                  }}
                  color='success' 
                  variant="contained"  
                  endIcon={<SaveAsIcon />}>
                  save
               </Button>
            </Box>
         </Box>
      </Modal>
   )
}

export default EditAvatarModal