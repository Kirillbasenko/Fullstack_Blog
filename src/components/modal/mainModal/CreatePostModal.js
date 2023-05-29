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
         <Box 
            //className={styles.modal}
            sx={{
               position: "absolute",
               top: "32%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               minWidth: "510px",
               backgroundColor: "#143685",
               border: "2px solid #000",
               boxShadow: "24px",
               borderRadius: "10px",
               padding: "16px"
            }}>
            <Box 
               className={styles.flexBetween}
               sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
               }}>
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
            <Box 
               className={styles.userInfo}
               sx={{
                  display: "flex",
                  marginTop: "15px"
               }}>
               <CardMedia
                  sx={{
                     objectFit: "contain", 
                     borderRadius: "50%", 
                     width: 40, 
                     height: 40, 
                     display: "inline"
                  }}
                  component="img"
                  image={user.avatarImage ? `http://localhost:5000${user.avatarImage}` : "/avatarUser.jpg"}
                  alt="green iguana"/>
               <Box 
                  className={styles.flex}
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     margin: "0px 0px 10px 10px",
                     fontSize: "12px",
                     fontWeight: 500
                  }}>
                  <Typography variant='body4'>{user.name}</Typography>
                  <FormControl 
                     //className={styles.selectedInput} 
                     fullWidth 
                     sx={{width: 150}} 
                     size="small">
                     <Select
                        sx={{
                           color: "rgba(209, 206, 206, 0.7)",
                           backgroundColor: "rgba(209, 206, 206, 0.7)",
                           height: "25px",
                           borderRadius: "10px",
                           marginTop: "2px",
                           fontSize: "12px"
                        }}
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
               <FormControl 
                  //className={styles.textField} 
                  sx={{
                     color: "white",
                     width: "100%",
                     //paddingBottom: "-0px",
                     marginBottom: "20px"
                     }}>
                  <TextField
                     className={styles.textField}
                     label="What do you want to talk about?"
                     variant="standard"
                     multiline
                     inputProps={{color: "rgb(122, 19, 19)"}}
                     maxRows={4}
                     sx={{
                        color: "rgba(0, 0, 0, 0.87)",
                        width: "100%",
                        marginBottom: "20px"
                     }}
                     onChange={(e) => setText(e.target.value)} 
                     value={text} 
                     name="title"
                     InputProps={{
                        endAdornment: 
                        <IconButton onClick={(e) => {
                           setShowEmoji(!showEmoji)
                           setСlientY(e.clientY)
                        } }>
                           <SentimentSatisfiedAltIcon 
                              sx={{
                                 padding: 0,
                                 cursor: "pointer"
                              }} 
                              className={styles.smile} 
                              color='info'/>
                        </IconButton>
                     }}
                  />
                  {showEmoji ? 
                  <Box 
                     ref={modalRef} 
                     sx={{
                        top: `${clientY}px`,
                        position: "absolute",
                        right: "-210px",
                        zIndex: 2
                     }} 
                     className={styles.picker}>
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
                  <Box 
                     className={styles.imageContainer}
                     sx={{
                        position: "relative",
                        zIndex: 1
                     }}>
                     <CardMedia
                        className={styles.image}
                        sx={{
                           position: "relative",
                           maxWidth: "480px",
                           objectFit: "fill",
                           height: "400px",
                           borderRadius: "5px",
                           border: "1px solid rgb(141, 140, 140)",
                           marginBottom: "15px",
                           zIndex: 1
                        }}
                        component="img"
                        image={`http://localhost:5000${src}`}
                        alt="green iguana"/>
                     <IconButton 
                        className={styles.removeImageButton} 
                        sx={{
                           position: "absolute",
                           top: "10px",
                           right: "10px",
                           zIndex: 3,
                           backgroundColor: "rgba(0, 0, 0, 0.5)"
                        }}
                        onClick={() => setSrc("")} 
                        color="primary" 
                        aria-label="upload picture" 
                        component="label">
                        <CloseIcon />
                     </IconButton>
                  </Box> : null}
               <Box 
                  className={styles.flexBetween}
                  sx={{
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center"
                  }}>
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