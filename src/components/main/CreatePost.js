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

const CreatePost = ({user}) => {
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
      <Card className={styles.parent}>
         <CardMedia
            sx={{objectFit: "contain", borderRadius: "50%", width: 40, height: 40, display: "inline"}}
            component="img"
            image={user.avatarImage ? `https://zebra-gabardine.cyclic.app${user.avatarImage}` : "/avatarUser.jpg"}
            alt="green iguana"/>
         <Box className={styles.content}>
            <Button onClick={() => setOpen(true)} className={styles.modalButton} variant="outlined">What's happening?</Button>
            <Button component="label" className={styles.icon} variant="outlined" sx={{paddingX: 3}} startIcon={<InsertPhotoIcon sx={{width: 22, height: 22}} color='info' />}>
               Photo
               <input onChange={(e) => {
                     douwload(e)
                     setOpen(true)
                  }} 
                  ref={file} hidden accept="image/*" type="file" />
            </Button>
            <CreatePostModal removeImage={() => setSrc("")} srcImage={src} open={open} handleClose={() => setOpen(false)}/>
         </Box>
      </Card>
   )
}

export default CreatePost