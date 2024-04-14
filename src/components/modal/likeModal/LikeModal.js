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


import styles from "./likeModal.module.scss"

const LikeModal = ({likeList, open, handleClose}) => {
   return(
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         >
         <Box className={styles.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               Likes
            </Typography>
            <Box sx={{ width: '100%', }}>
               <List>
               {likeList.length !== 0 && likeList.map(item => 
                  <Box key={item._id} className={styles.listItem}>
                     <ListItem disablePadding>
                        <ListItemButton>
                           <CardMedia
                              component="img"
                              className={styles.userImage}
                              sx={{width: "40px", height: "40px"}}
                              image={item.avatarImage ? `http://localhost:5000${item.avatarImage}` : "/avatarUser.jpg"}
                              alt="green iguana"/>
                           <Typography>{item.name}</Typography>
                        </ListItemButton>
                     </ListItem>
                     <Divider />
                  </Box>)}
                  </List>
                  
            </Box>
         </Box>
      </Modal>
   )
}

export default LikeModal