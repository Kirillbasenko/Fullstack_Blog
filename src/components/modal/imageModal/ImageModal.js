import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';

import { useSelector } from 'react-redux';

import styles from "./imageModal.module.scss"

const ImageModal = ({image, open, handleClose}) => {

   const {width} = useSelector(state => state.width)

   return(
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         >
         <Box 
            //className={styles.modal}
            sx={{
               position: "absolute",
               top: "45%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               width: width > 576 ? "400px" : "70%",
               height: "400px",
               //border: "2px solid #000",
               //boxShadow: "24px",
            }}>
            <CardMedia
               //className={styles.image}
               sx={{
                  objectFit: "contain"
               }}
               component="img"
               image={`http://localhost:5000${image}`}
               alt="green iguana"/>
         </Box>
      </Modal>
   )
}

export default ImageModal