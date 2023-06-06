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

import styles from "./likeModal.module.scss"

const LikeModal = ({likeList, open, handleClose}) => {

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
               top: "32%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               minWidth: width > 576 ? "510px" : "90%",
               maxHeight: "510px",
               backgroundColor: "#143685",
               border: "2px solid #000",
               boxShadow: "24px",
               borderRadius: "10px",
               padding: "16px 16px 0px 16px",
               overflowY: "auto"
            }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               Likes
            </Typography>
            <Box sx={{ width: '100%', }}>
               <List>
               {likeList.length !== 0 && likeList.map(item => 
                  <Box 
                     key={item._id} 
                     //className={styles.listItem}
                     sx={{
                        marginBottom: "10px"
                     }}>
                     <ListItem disablePadding>
                        <ListItemButton>
                           <CardMedia
                              component="img"
                              //className={styles.userImage}
                              sx={{
                                 objectFit: "contain",
                                 borderRadius: "50%",
                                 width: "40px",
                                 height: "40px",
                                 marginRight: "10px"
                              }}
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