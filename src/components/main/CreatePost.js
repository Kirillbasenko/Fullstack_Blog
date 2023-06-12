import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import { upload } from '@/http/imageApi';

import styles from "../../styles/main/search.module.scss"
import { useState, useRef } from 'react';
import CreatePostModal from '../modal/mainModal/CreatePostModal';

const CreatePost = ({fetchPostsStart, user}) => {
   const [open, setOpen] = useState(false);
   const file = useRef(null)
   const [src, setSrc] = useState("")

   const douwload = async (e) => {
      const formData = new FormData()
         const file =  e.target.files[0]
         formData.append("image", file)
         upload(formData).then(data => setSrc(data.url))
   }

   return(
      <Card 
         className={styles.parent}
         sx={{
            display: "flex",
            borderRadius: '15px',
            color: "aliceblue",
            backgroundColor: "#14204bad",
            padding: "13px",
            marginBottom: "10px"
         }}>
         <CardMedia
            sx={{objectFit: "contain", borderRadius: "50%", width: 40, height: 40, display: "inline"}}
            component="img"
            image={user.avatarImage ? `http://localhost:5000${user.avatarImage}` : "/avatarUser.jpg"}
            alt="green iguana"/>
         <Box 
            className={styles.content}
            sx={{
               padding: 0,
               display: "flex",
               flexDirection: "column",
               flex: "1 1 auto",
               marginLeft: "10px"
            }}>
            <Button 
               onClick={() => setOpen(true)} 
               className={styles.modalButton} 
               sx={{
                  backgroundColor: "rgba(76, 76, 84 , 0.5)",
                  borderRadius: "10px",
                  color: "rgb(189, 191, 192)",
                  textTransform: "none",
                  border: 0,
                  marginBottom: "15px",
                  justifyContent: "left",
                  height: "40px"
               }}
               variant="outlined">What's happening? </Button>
            <Button 
               component="label" 
               className={styles.icon} 
               variant="outlined" 
               sx={{
                  paddingX: 3,
                  textTransform: "none",
                  cursor: "pointer",
                  width: "100px",
                  borderRadius: "15px",
                  transition: ".3s",
                  fontSize: "12px"
                  }} startIcon={<InsertPhotoIcon sx={{width: 22, height: 22}} color='info' />}>
               Photo
               <input onChange={(e) => {
                     douwload(e)
                     setOpen(true)
                  }} 
                  ref={file} hidden accept="image/*" type="file" />
            </Button>
            <CreatePostModal fetchPostsStart={fetchPostsStart} removeImage={() => setSrc("")} srcImage={src} open={open} handleClose={() => setOpen(false)}/>
         </Box>
      </Card>
   )
}

export default CreatePost