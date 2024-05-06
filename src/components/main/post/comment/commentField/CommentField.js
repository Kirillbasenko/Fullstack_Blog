import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import data from "@emoji-mart/data"
import Picker from '@emoji-mart/react';

import { upload } from '@/http/imageApi';

import { useRef } from 'react';

import { createComment } from '@/http/commentApi';

import { useEffect } from 'react';

import styles from "./commentField.module.scss"
import { useState } from 'react';

const CommentField = ({setArr, focus, id, userPhoto, commentParent}) => {
   const [comment, setComment] = useState("")
   const file = useRef(null)
   const inputRef = useRef(null)
   const modalRef = useRef(null);
   const [showEmoji, setShowEmoji] = useState(false)
   const [clientY, setСlientY] = useState(false)
   const [src, setSrc] = useState("")
   const [cursorPosition, setCursorPosition] = useState(null)

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

   const pickEmoji = (e) => {
      const ref = inputRef.current;
      ref.focus()
      const start = comment.substring(0, ref.selectionStart);
      const end = comment.substring(ref.selectionStart);
      const msg = start + e.native  + end;
      setComment(msg);
      setCursorPosition(start.length + e.native.length);
   };

   const addComment = () => {
      createComment(id, comment, src).then(data => setArr(data))
      setComment("")
      setSrc("")
   }

   useEffect(() => {
      inputRef.current.selectionEnd = cursorPosition
   }, [cursorPosition])

   const douwload = async (e) => {
      const formData = new FormData()
         const file =  e.target.files[0]
         formData.append("image", file)
         upload(formData).then(data => setSrc(data.url))
   }

   return(
      <Box>
         <Box 
            sx={{
               display: "flex",
               marginTop: "15px",
               }}>
            <CardMedia
               sx={{
                  objectFit: "contain", 
                  borderRadius: "50%", 
                  width: !commentParent ? 38 : 31, 
                  height: !commentParent ? 38 : 31, 
                  display: "inline",
                  marginRight: "10px"
               }}
               component="img"
               className={styles.userPhoto}
               image={userPhoto ? `${process.env.API_URL}${userPhoto}` : "/avatarUser.jpg"}
               alt="green iguana"/>
            <Box 
               sx={{
                  width: "100%"
               }}>
                  <Box 
                     component="div" 
                     //className={styles.textFieldContent}
                     sx={{
                        position: "relative",
                        zIndex: 2,
                        width: "100%"
                     }}>
                     <OutlinedInput
                        inputRef={inputRef}
                        //className={styles.textField}
                        id="outlined-adornment-password"
                        type='text'
                        size='small'
                        multiline
                        maxRows={4}
                        sx={{
                           //width: !commentParent ? 583 : 513,
                           width: "100%",
                           boxSizing: "border-box",
                           borderRadius: "20px",
                           position: "relative",
                           zIndex: 1,
                           fontSize: "14px",
                           backgroundColor: "rgba(207, 208, 209, 1)",
                        }}
                        value={comment}
                        placeholder='Add comment'
                        onChange={(e) => setComment(e.target.value)}
                        endAdornment={ 
                        <InputAdornment position="end">
                           {src.length === 0 ?
                           <IconButton  aria-label="upload picture" component="label">
                              <input onChange={douwload} 
                              ref={file} hidden accept="image/*" type="file" />
                              <ImageIcon />
                           </IconButton> : null}
                           <IconButton onClick={(e) => {
                              setShowEmoji(!showEmoji)
                              let windowHeight = window.innerHeight;
                              let clickPosition = e.clientY;
                              let distanceToBottom = windowHeight - clickPosition;
                              if(distanceToBottom > 400){
                                 setСlientY(e.clientY)
                              }else{
                                 setСlientY(e.clientY - 400)
                              }
                           }}>
                              <SentimentSatisfiedAltIcon/>
                           </IconButton>
                        </InputAdornment>}
                     />
                     
                  </Box>
                  
               {src && src.length !== 0 ? 
                  <Box 
                     className={styles.imageContainer}
                     sx={{
                        display: "flex",
                        position: "relative",
                        justifyContent: "center",
                        marginTop: "-20px",
                        zIndex: 1,
                        borderRadius: " 0px 0px 20px 20px",
                        backgroundColor: "rgba(207, 208, 209, 0.7)"
                     }}>
                     <CardMedia
                        className={styles.image}
                        sx={{
                           maxWidth: !commentParent ? 280 : 210, 
                           height: !commentParent ? 280 : 210,
                           objectFit: "fill",
                           borderRadius: "5px",
                           border: "1px solid rgb(141, 140, 140)",
                           marginTop: "30px",
                           marginBottom: "15px",
                           zIndex: 1
                        }}
                        component="img"
                        image={`${process.env.API_URL}${src}`}
                        alt="green iguana"/>
                     <IconButton 
                        className={styles.removeImageButton} 
                        onClick={() => setSrc("")} 
                        color="primary" 
                        aria-label="upload picture" 
                        component="label"
                        onHo
                        sx={{
                           position: "absolute",
                           top: "30px",
                           right: "10px",
                           zIndex: 3,
                           //backgroundColor: "#3D3F40",
                        }}>
                        <CloseIcon />
                     </IconButton>
                  </Box> : null}
               {comment.trim().length !== 0 || src.length !== 0 ? <Button sx={{textTransform: "capitalize", borderRadius: "20px", marginTop: "20px"}} onClick={addComment} className={styles.button} size='small' variant="contained">comment</Button> : null}
            </Box>
            {showEmoji ? <Box ref={modalRef} sx={{top: `${clientY}px`, position: "fixed", right: "7%", zIndex: 10}} className={styles.picker}>
                        <Picker 
                           data={data} 
                           previewPosition="none" 
                           emojiSize={16} 
                           emojiButtonSize={24}
                           onEmojiSelect={pickEmoji}
                           />
                     </Box> : null}
         </Box>
      </Box>
   )
}

export default CommentField