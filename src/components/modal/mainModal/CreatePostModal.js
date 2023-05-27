import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import { useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import data from "@emoji-mart/data"
import Picker from '@emoji-mart/react';

import { setAllPostsAndUpdatePost } from '@/store/slices/postSlice';
import { updatePost } from '@/http/postApi';
import { createPost } from '@/http/postApi';
import { upload } from '@/http/imageApi';

import styles from "./createPostModal.module.scss"

const CreatePostModal = ({open, handleClose, srcImage, titlePost, removeImage, typePost, id}) => {
   const dispatch = useDispatch()
   const [type, setType] = useState(typePost ? typePost : "Public");
   const file = useRef(null)
   const modalRef = useRef(null);
   const [showEmoji, setShowEmoji] = useState(false)
   const [clientY, setСlientY] = useState(false)
   const [text, setText] = useState(titlePost ? titlePost : "")
   const [src, setSrc] = useState("")

   const {user} = useSelector(state => state.user)

   useEffect(() => {
      setSrc(srcImage)
   }, [srcImage])

   useEffect(() => {
      function handleClickOutside(event) {
         if (modalRef.current && !modalRef.current.contains(event.target)) {
         setShowEmoji(false);
         }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [modalRef]);

   const clear = () => {
      setText("")
      setType("Public")
      setSrc("")
      if(!titlePost && !srcImage){
         removeImage()
      }
   }

   const addEmoji = (e) => {
      const sym = e.unified.split("_")
      const codeArray = []
      sym.forEach((el) => codeArray.push("0x" + el))
      let emoji = String.fromCodePoint(...codeArray)
      setText(text + emoji)
   }

   const douwload = async (e) => {
      try{
         const formData = new FormData()
         const file =  e.target.files[0]
         formData.append("image", file)
         upload(formData).then(data => setSrc(data.url))
      }catch(e){
         console.log(e);
      }
   }

   const addPost = (e) => {
      e.preventDefault()
      let tags = text.split(' ').filter(word => word.startsWith('#')).map(word => word.substring(1));
      try{
         const data = {
            "title": text,
            "tags": tags.length === 0 ? [] : tags,
            "type": type,
            "img": src,
         }
         if(!titlePost && !srcImage){
            createPost(data)
         }else{
            updatePost(id, data).then(data => dispatch(setAllPostsAndUpdatePost(data)))
         }
      }catch(e){
         console.log(e);
      }finally{
         clear()
         handleClose()
      }
   }

   return(
      <Modal
         open={open}
         onClose={() => {
            handleClose()
            setShowEmoji(false)
            clear()
         }}>
         <Box className={styles.modal}>
            <Box className={styles.flexBetween}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  {!titlePost ? "Create Post" : "Update Post"}
               </Typography>
               <IconButton onClick={() => {
                  handleClose()
                  clear()
               }} color="primary" aria-label="upload picture" component="label">
                  <CloseIcon />
               </IconButton>
            </Box>
            <Box className={styles.userInfo}>
               <CardMedia
                  sx={{objectFit: "contain", borderRadius: "50%", width: 40, height: 40, display: "inline"}}
                  component="img"
                  image={user.avatarImage ? `http://localhost:5000${user.avatarImage}` : "/avatarUser.jpg"}
                  alt="green iguana"/>
               <Box className={styles.flex}>
                  <Typography variant='body4'>{user.name}</Typography>
                  <FormControl className={styles.selectedInput} fullWidth sx={{width: 150}} size="small">
                     <Select
                     className={styles.selected}
                     value={type}
                     onChange={(e) => setType(e.target.value)}>
                     <MenuItem value={"Public"}>Public</MenuItem>
                     <MenuItem value={"Privat"}>Privat</MenuItem>
                     </Select>
                  </FormControl>
               </Box>
            </Box>
            <form>
               <FormControl className={styles.textField} sx={{color: "white"}}>
                  <TextField
                     className={styles.textField}
                     label="What do you want to talk about?"
                     variant="standard"
                     multiline
                     inputProps={{color: "rgb(122, 19, 19)"}}
                     maxRows={4}
                     sx={{color: "rgba(0, 0, 0, 0.87)"}}
                     onChange={(e) => setText(e.target.value)} 
                     value={text} 
                     name="title"
                     InputProps={{
                        endAdornment: 
                        <IconButton onClick={(e) => {
                           setShowEmoji(!showEmoji)
                           setСlientY(e.clientY)
                        } }>
                           <SentimentSatisfiedAltIcon sx={{padding: 0}} className={styles.smile} color='info'/>
                        </IconButton>
                     }}
                  />
                  {showEmoji ? <Box ref={modalRef} sx={{top: `${clientY}px`}} className={styles.picker}>
                        <Picker 
                           data={data} 
                           previewPosition="none" 
                           emojiSize={18} 
                           emojiButtonSize={26}
                           onEmojiSelect={addEmoji}/>
                  </Box>
                  : null}
               </FormControl>
               {src && src.length !== 0 ? 
                  <Box className={styles.imageContainer}>
                     <CardMedia
                     className={styles.image}
                     component="img"
                     image={`http://localhost:5000${src}`}
                     alt="green iguana"/>
                     <IconButton className={styles.removeImageButton} onClick={() => setSrc("")} color="primary" aria-label="upload picture" component="label">
                        <CloseIcon />
                     </IconButton>
                  </Box> : null}
               <Box className={styles.flexBetween}>
                  <IconButton color="primary" aria-label="upload picture" component="label">
                     <input onChange={douwload} 
                     ref={file} hidden accept="image/*" type="file" />
                     <PhotoCamera />
                  </IconButton>
                  <Button onClick={(e) => addPost(e)} disabled={text.length === 0 && src.length === 0} type='submit' variant="contained" endIcon={<SendIcon />}>
                     publication
                  </Button>
               </Box>
            </form>
         </Box>
      </Modal>
   )
}

export default CreatePostModal