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

   //console.log(cursorPosition);

   const pickEmoji = (e) => {
      const ref = inputRef.current;
      ref.focus()
      const start = comment.substring(0, ref.selectionStart);
      const end = comment.substring(ref.selectionStart);
      const msg = start + e.native  + end;
      setComment(msg);
      
      setCursorPosition(start.length + e.native.length);
      //inputRef.current.selectionEnd = cursorPosition
      console.log(cursorPosition);
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
         <Box className={styles.content}>
            <CardMedia
               sx={{objectFit: "contain", borderRadius: "50%", width: !commentParent ? 34 : 27, height: !commentParent ? 34 : 27, display: "inline"}}
               component="img"
               className={styles.userPhoto}
               image={userPhoto ? `https://zebra-gabardine.cyclic.app${userPhoto}` : "/avatarUser.jpg"}
               alt="green iguana"/>
            <Box className={styles.relative}>
                  <Box component="div" className={styles.textFieldContent}>
                     <OutlinedInput
                        inputRef={inputRef}
                        className={styles.textField}
                        id="outlined-adornment-password"
                        type='text'
                        size='small'
                        sx={{width: !commentParent ? 410 : 340}}
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
                              <SentimentSatisfiedAltIcon className={styles.smile}/>
                           </IconButton>
                        </InputAdornment>}
                     />
                     
                  </Box>
                  
               {src && src.length !== 0 ? 
                  <Box className={styles.imageContainer}>
                     <CardMedia
                     className={styles.image}
                     sx={{maxWidth: !commentParent ? 250 : 180, height: !commentParent ? 250 : 180}}
                     component="img"
                     image={`https://zebra-gabardine.cyclic.app${src}`}
                     alt="green iguana"/>
                     <IconButton className={styles.removeImageButton} onClick={() => setSrc("")} color="primary" aria-label="upload picture" component="label">
                        <CloseIcon />
                     </IconButton>
                  </Box> : null}
               {comment.length !== 0 || src.length !== 0 ? <Button onClick={addComment} className={styles.button} size='small' variant="contained">comment</Button> : null}
            </Box>
            {showEmoji ? <Box ref={modalRef} sx={{top: `${clientY}px`}} className={styles.picker}>
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