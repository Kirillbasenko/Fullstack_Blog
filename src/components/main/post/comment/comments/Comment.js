import { Box, CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';

import { upload } from '@/http/imageApi';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { checkComment } from '@/http/commentApi';

import LikeModal from '@/components/modal/likeModal/LikeModal';

import { updateLikeComment } from '@/http/commentApi';

import { remuveComment } from '@/http/commentApi';
import CommemtsList from '../CommentsList';

import { formatDistance, subDays } from 'date-fns'

import { useSelector } from 'react-redux';

import { fetchComments } from "@/http/commentApi"

import { useState, useEffect, useRef } from 'react';

import styles from "./comments.module.scss"
import CommentField from '../commentField/CommentField';
import ImageModal from '@/components/modal/imageModal/ImageModal';

const Comments = ({editComment, checkParent, deleteCommentFirst, comment}) => {
   const [open, setOpen] = useState(false);
   const [openComment, setOpenComment] = useState(false);
   const [like, setLike] = useState(comment.like || 0)
   const [fetching, setFetching] = useState(false)
   const [comments, setComments] = useState([])
   const [userComments, setUserComments] = useState([])
   const [text, setText] = useState(comment.comment)
   const [image, setImage] = useState(comment.img)
   const [edit, setEdit] = useState(false)
   const [openLikeModal, setLikeModal] = useState(false)
   const [openImageModal, setImageModal] = useState(false)
   const [commentsLength, setCommentsLength] = useState(null)
   const [current, setCurrent] = useState(2)
   const [userLike, setUserLike] = useState(comment.likesUsers)

   const file = useRef(null)

   const {user} = useSelector(state => state.user)

   const checkUserLike = userLike.filter(item => item._id === user._id)

   useEffect(() => {
      fetchComments(comment._id, 3, 1).then(data => {
         setComments(data.comments)
         setCommentsLength(data.commentsLength.length)
      })
      
   }, [commentsLength])

   const deleteCommentSecond = (id) => {
      remuveComment(id)
      let newCommentsList = comments.filter(item => item._id !== id)
      setComments(newCommentsList)
      fetchComments(comment._id, 3, 1).then(data => {
         setCommentsLength(data.commentsLength.length)
      })
   }

   const douwload = async (e) => {
      try{
         const formData = new FormData()
         const file =  e.target.files[0]
         formData.append("image", file)
         upload(formData).then(data => setImage(data.url))
      }catch(e){
         console.log(e);
      }
   }

   useEffect(() => {
      if(fetching){
      fetchComments(comment._id, 3, current || 1).then(data => {
         setComments([...comments, ...data.comments])
         setCommentsLength(data.commentsLength.length)
      }).finally(() => {
            setFetching(false)
            setCurrent(current => current + 1)
         })}
         
   }, [fetching])

   const submitLike = () => {
      const checkUserLike = userLike.filter(item => item._id === user._id)
      const likes = checkUserLike.length === 0 ? like + 1 : like - 1 
      let newLikesUsers = checkUserLike.length !== 0 ? comment.likesUsers.filter(item => item._id !== user._id) : [...userLike, user]
      updateLikeComment(comment._id, likes, newLikesUsers).then(data => {
         setUserLike(data.likesUsers)
         setLike(data.like)
      })
   }

   useEffect(() => {
      checkComment(comment._id).then(data => setUserComments(data.likesUsers))
      
   }, [userLike])

   const addComment = (com) => {
      setComments(comments => [com, ...comments])
      setCommentsLength(commentsLength => commentsLength + 1)
      setCurrent(2)
   }

   return(
      <Box className={styles.container}>
            <CardMedia
               sx={{objectFit: "contain", borderRadius: "50%", width: 27, height: 27, display: "inline"}}
               component="img"
               className={styles.userPhoto}
               image={comment.user.avatarImage ? `http://localhost:5000${comment.user.avatarImage}` : "/avatarUser.jpg"}
               alt="green iguana"/>
            <Box className={styles.content}>
               <Box className={styles.comment}>
                  <Box className={styles.flexBetween}>
                     <Typography className={styles.userName}>{comment.user.name}</Typography>
                     <Box className={styles.absolute}>
                        <Typography className={styles.date}>{formatDistance(subDays(new Date(comment.createdAt), 0), new Date(), { addSuffix: true })}</Typography>
                        {user._id === comment.user._id ? 
                        <>
                           <IconButton onClick={() => setOpen(true)} aria-label="delete" size="large">
                              <MoreHorizIcon className={styles.editButton}/>
                           </IconButton>
                           <Select
                              labelId="demo-controlled-open-select-label"
                              id="demo-controlled-open-select"
                              open={open}
                              onClose={() => setOpen(false)}
                              onOpen={() => setOpen(true)}
                              label="Age"
                              className={styles.select}>
                              <MenuItem className={styles.menuItem} onClick={() => setEdit(true)}>Edit</MenuItem>
                              <MenuItem className={styles.menuItem} onClick={() => deleteCommentFirst(comment._id)}>Delete</MenuItem>
                           </Select>
                        </> : null}
                     </Box>
                  </Box>
                  <Box className={styles.textConteiner}>
                     {!edit ? <Typography 
                        sx={{maxWidth: !checkParent ? "160%" : "125%"}} 
                        className={styles.text} 
                        variant='body2'>
                           {comment.comment}
                        </Typography>
                     : <TextField
                        className={styles.textField}
                        variant="standard"
                        multiline
                        sx={{color: "rgba(0, 0, 0, 0.87)"}}
                        onChange={(e) => setText(e.target.value)} 
                        value={text} 
                        name="title"
                     />}
                  </Box>
                  {comment.img.length !== 0 && !edit ?
                  <CardMedia
                     onClick={() => setImageModal(true)}
                     className={styles.image}
                     component="img"
                     image={`http://localhost:5000${comment.img}`}
                     alt="green iguana"/> : null}
                  {image.length !== 0 && edit ?
                  <Box className={styles.imageContainer}>
                     <CardMedia
                        className={styles.imageEdit}
                        sx={{maxWidth: 180, height: 180}}
                        component="img"
                        image={`http://localhost:5000${image}`}
                        alt="green iguana"/>
                     <IconButton className={styles.removeImageButton} onClick={() => setImage("")} color="primary" aria-label="upload picture" component="label">
                        <CloseIcon />
                     </IconButton>
                  </Box> : edit ?
                  <IconButton color="primary" aria-label="upload picture" component="label">
                     <input onChange={douwload} 
                     ref={file} hidden accept="image/*" type="file" />
                     <PhotoCamera />
                  </IconButton> : null}
                  {edit ? 
                     <Box className={styles.buttons}>
                        <Button onClick={() => setEdit(false)} size='small' className={styles.buttonEdit} color='error' variant="outlined">Cancel</Button>
                        <Button onClick={() => {
                           editComment(comment._id, text, image)
                           setEdit(false)
                        }} size='small' className={styles.buttonEdit} color='success' variant="outlined">Save</Button>
                     </Box> : null}
               </Box>
               
               <Box className={styles.flex}>
                  <Box className={styles.flex}>
                     <IconButton className={styles.button} onClick={submitLike}>
                        <FavoriteIcon style={{color: checkUserLike.length === 0 ? "#ECEAEA" : "red"}} className={styles.icon}/>
                     </IconButton>
                     <Button className={styles.flexLike} onClick={() => setLikeModal(true)}>
                        <Typography className={styles.current}>{like}</Typography>
                     </Button>
                  </Box>
                  { !checkParent ? <Box className={styles.flex}>
                     <IconButton className={styles.button} onClick={() => setOpenComment(!openComment)}>
                        <ChatBubbleIcon className={styles.icon}/>
                     </IconButton>
                     <Typography className={styles.current}>{commentsLength}</Typography>
                  </Box> : null}
               </Box>
               {openComment ? 
               <Box>
                  <CommentField userPhoto={user.avatarImage} setArr={addComment} id={comment._id} commentParent={true}/>
                  <CommemtsList checkParent={true}  deleteCommentFirst={deleteCommentSecond} comments={comments} id={comment._id} userPhoto={user.avatarImage}/>
                  {comments.length < commentsLength && !fetching ?
                     <Button variant="text" className={styles.buttonAdd} onClick={() => setFetching(true)}>load more answers</Button> : null}
               </Box> : null}
            </Box>
            <LikeModal likeList={userComments} open={openLikeModal} handleClose={() => setLikeModal(false)}/>
            <ImageModal image={comment.img} open={openImageModal} handleClose={() => setImageModal(false)}/>
      </Box>
   )
}

export default Comments