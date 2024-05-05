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


import styles from "./imageModal.module.scss"

const ImageModal = ({image, open, handleClose}) => {
   return(
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         >
         <Box className={styles.modal}>
            <CardMedia
               className={styles.image}
               component="img"
               image={`process.env.API_URL${image}`}
               alt="green iguana"/>
         </Box>
      </Modal>
   )
}

export default ImageModal