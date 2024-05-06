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
import VideocamIcon from '@mui/icons-material/Videocam';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import { useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import data from "@emoji-mart/data"
import Picker from '@emoji-mart/react';

import { setAllPostsAndUpdatePost, setAddNewPost } from '@/store/slices/postSlice';
import { updatePost } from '@/http/postApi';
import { createPost } from '@/http/postApi';
import { upload, uploadVideo } from '@/http/imageApi';

import styles from "./createPostModal.module.scss"

const CreatePostModal = ({open, handleClose, srcImage, titlePost, removeImage, typePost, id, video, fetchPostsStart}) => {
   const dispatch = useDispatch()
   const [type, setType] = useState(typePost ? typePost : "Public");
   const file = useRef(null)
   const modalRef = useRef(null);
   const [showEmoji, setShowEmoji] = useState(false)
   const [clientY, setСlientY] = useState(false)
   const [text, setText] = useState(titlePost ? titlePost : "")
   const [src, setSrc] = useState("")
   const [srcVideo, setSrcVideo] = useState("")

   const {user} = useSelector(state => state.user)
   const {post} = useSelector(state => state.post)
   const {width} = useSelector(state => state.width)

   useEffect(() => {
      setSrc(srcImage)
   }, [srcImage])

   useEffect(() => {
      if(video){
         setSrcVideo(video)
      }
   }, [video])

   //console.log(srcImage);

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
      setSrcVideo("")
      /*if(!titlePost && !srcImage && !srcVideo){
         removeImage()
      }*/
   }

   const addEmoji = (e) => {
      const sym = e.unified.split("_")
      const codeArray = []
      sym.forEach((el) => codeArray.push("0x" + el))
      let emoji = String.fromCodePoint(...codeArray)
      setText(text + emoji)
   }

   /*const douwloadImage = async (e) => {
      try{
         const formData = new FormData()
         const file =  e.target.files[0]
         formData.append("image", file)
         upload(formData).then(data => setSrc(data.url))
      }catch(e){
         console.log(e);
      }
   }*/

   const douwloadImage = async () => {
      let reader = new FileReader()
      //reader.readAsDataURL(file.current.files[0])
      console.log(reader);
      reader.onload = function (){
         //setSrc(reader.result)
         //console.log(reader.result);
      }
   }

   const douwloadVideo = async (e) => {
      try{
         const formData = new FormData()
         const file =  e.target.files[0]
         formData.append("video", file)
         uploadVideo(formData).then(data => setSrcVideo(data.url))
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
            "video": srcVideo
         }
         if(!titlePost && !srcImage){
            createPost(data).then(fetchPostsStart())
            //dispatch(setAddNewPost(data))
            
         }else{
            updatePost(id, data).then(data => dispatch(setAllPostsAndUpdatePost(data)))
         }
      }catch(e){
         console.log(e);
      }finally{
         clear()
         handleClose()
         fetchPostsStart()
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
                  image={user.avatarImage ? `${process.env.API_URL}${user.avatarImage}` : "/avatarUser.jpg"}
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
                           {width > 778 ?<SentimentSatisfiedAltIcon sx={{padding: 0}} className={styles.smile} color='info'/> : null}
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
                     image={`${process.env.API_URL}${src}`}
                     alt="green iguana"/>
                     <IconButton className={styles.removeImageButton} onClick={() => setSrc("")} color="primary" aria-label="upload picture" component="label">
                        <CloseIcon />
                     </IconButton>
                  </Box> : null}
               {srcVideo && srcVideo.length !== 0 ? 
                  <Box className={styles.imageContainer}>
                     <video muted={true} height={width < 778 ? 200 : 500} width={"100%"} className={styles.video} src={`${process.env.API_URL}${srcVideo}`} controls>
                     </video>
                     <IconButton className={styles.removeImageButton} onClick={() => setSrcVideo("")} color="primary" aria-label="upload picture" component="label">
                        <CloseIcon />
                     </IconButton>
                  </Box> : null}
               <Box className={styles.flexBetween}>
                  <Box>
                     <IconButton color="primary" aria-label="upload picture" component="label">
                        <input onChange={douwloadImage} 
                        ref={file} hidden accept="image/*" type="file" />
                        <PhotoCamera />
                     </IconButton>
                     <IconButton color="primary" aria-label="upload picture" component="label">
                        <input onChange={douwloadVideo} 
                        ref={file} hidden accept="video/mp4" type="file" />
                        <VideocamIcon />
                     </IconButton>
                  </Box>
                  <Button onClick={(e) => addPost(e)} disabled={text.length === 0 && src.length === 0 && srcVideo.length === 0} type='submit' variant="contained" endIcon={<SendIcon />}>
                     publication
                  </Button>
               </Box>
            </form>
         </Box>
      </Modal>
   )
}

export default CreatePostModal