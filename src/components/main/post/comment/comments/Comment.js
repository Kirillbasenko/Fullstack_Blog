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

import { remuveComment, updateComment } from '@/http/commentApi';
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
         //console.log(data);
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

   const editCommentSecond = async (id, comment, img) => {
      let newComments
      await updateComment(id, comment, img).then(data => {
         newComments = comments.map(item => {
            if (item._id === id) {
               return data;
            } else {
               return item;
            }
         })
      })
      setComments(newComments)
      fetchComments(comment._id, commentsLength, 1).then(data => {
         setComments(data.comments)
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
      checkComment(comment._id).then(data => {
         if(data){
            setUserComments(data.likesUsers)
         }
      })
   }, [userLike])

   const addComment = (com) => {
      setComments(comments => [com, ...comments])
      setCommentsLength(commentsLength => commentsLength + 1)
      setCurrent(2)
   }

   console.log(text, image);

   return(
      <Box 
         //className={styles.container}
         sx={{
            display: "flex",
            marginTop: "20px",
            //marginBottom: "20px",
            flex: "1 1 auto",
            //maxWidth: "90%",
            marginLeft: "35px"
            }}>
            <CardMedia
               sx={{
                  objectFit: "contain", 
                  borderRadius: "50%", 
                  width: 30, 
                  height: 30, 
                  display: "inline",
                  marginRight: "10px"
               }}
               component="img"
               className={styles.userPhoto}
               image={comment.user.avatarImage ? `http://localhost:5000${comment.user.avatarImage}` : "/avatarUser.jpg"}
               alt="green iguana"/>
            <Box 
               className={styles.content}
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: "1 1 auto"
                  }}>
               <Box 
                  className={styles.comment}
                  sx={{
                     backgroundColor: "#11266E",
                     padding: "5px 10px 10px 10px",
                     borderRadius: "5px",
                     marginBottom: "5px",
                     position: "relative"
                  }}>
                  <Box 
                     className={styles.flexBetween}
                     sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "35px"
                     }}>
                     <Typography 
                        className={styles.userName}
                        sx={{
                           fontSize: "18px",
                           fontWeight: "500"
                        }}>
                        {comment.user.name}
                     </Typography>
                     <Box 
                        className={styles.absolute}
                        sx={{
                           display: "flex"
                        }}>
                        <Typography 
                           className={styles.date}
                           sx={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "12px",
                              opacity: "0.5",
                              color: "#C1C1C2"
                           }}>
                           {formatDistance(subDays(new Date(comment.createdAt), 0), new Date(), { addSuffix: true })}
                        </Typography>
                        {user._id === comment.user._id ? 
                        <>
                           <IconButton onClick={() => setOpen(true)} aria-label="delete" size="large">
                              <MoreHorizIcon 
                                 className={styles.editButton}
                                 sx={{
                                    cursor: "pointer",
                                    marginRight: "-10px"
                                 }}/>
                           </IconButton>
                           <Select
                              labelId="demo-controlled-open-select-label"
                              id="demo-controlled-open-select"
                              open={open}
                              onClose={() => setOpen(false)}
                              onOpen={() => setOpen(true)}
                              label="Age"
                              className={styles.select}
                              sx={{
                                 zIndex: -1,
                                 position: 'absolute',
                                 top: 0,
                                 right: 0,
                                 fontSize: "12px"
                              }} >
                              <MenuItem 
                                 className={styles.menuItem} 
                                 onClick={() => setEdit(true)}
                                 sx={{
                                    fontSize: '12px'
                                 }}>
                                    Edit
                              </MenuItem>
                              <MenuItem 
                                 className={styles.menuItem} 
                                 onClick={() => deleteCommentFirst(comment._id)}
                                 sx={{
                                    fontSize: '12px'
                                 }}>
                                    Delete
                              </MenuItem>
                           </Select>
                        </> : null}
                     </Box>
                  </Box>
                  <Box
                     sx={{
                        maxWidth: "220px",
                        display: "flex",
                        flex: "0 0 auto"
                     }}>
                     {!edit ? <Typography 
                        sx={{
                           maxWidth: !checkParent ? "160%" : "125%",
                           marginTop: "10px",
                           fontSize: "14px",
                           wordWrap: "break-word"
                        }} 
                        className={styles.text} 
                        variant='body2'>
                           {comment.comment}
                        </Typography>
                     : <TextField
                        className={styles.textField}
                        variant="standard"
                        multiline
                        sx={{
                           minWidth: "170%"
                        }}
                        onChange={(e) => setText(e.target.value)} 
                        value={text} 
                        name="title"
                     />}
                  </Box>
                  {comment.img.length !== 0 && !edit ?
                  <CardMedia
                     onClick={() => setImageModal(true)}
                     //className={styles.image}
                     sx={{
                        cursor: "pointer",
                        maxWidth: "180px",
                        objectFit: "contain",
                        maxHeight: "200px",
                        borderRadius: "5px",
                        marginTop: "5px",
                        zIndex: 1
                     }}
                     component="img"
                     image={`http://localhost:5000${comment.img}`}
                     alt="green iguana"/> : null}
                  {image.length !== 0 && edit ?
                  <Box 
                     //className={styles.imageContainer}
                     sx={{
                        display: "flex",
                        position: "relative",
                        //justifyContent: "center",
                        marginTop: "10px",
                        zIndex: 1,
                        borderRadius: "0px 0px 20px 20px"
                     }}>
                     <CardMedia
                        //className={styles.imageEdit}
                        sx={{
                           width: 180, 
                           height: 180,
                           objectFit: "fill",
                           borderRadius: "5px",
                           border: "1px solid rgb(141, 140, 140)",
                           marginTop: "30px",
                           marginBottom: "15px",
                           zIndex: 1
                        }}
                        component="img"
                        image={`http://localhost:5000${image}`}
                        alt="green iguana"/>
                     <IconButton 
                        className={styles.removeImageButton} 
                        onClick={() => setImage("")} 
                        color="error" 
                        aria-label="upload picture" 
                        component="label"
                        sx={{
                           position: "absolute",
                           top: "35px",
                           left: "140px",
                           zIndex: 3,
                           width: "35px",
                           height: "35px",
                           //backgroundColor: "grey"
                        }}>
                        <CloseIcon />
                     </IconButton>
                  </Box> : edit ?
                  <IconButton color="primary" aria-label="upload picture" component="label">
                     <input onChange={douwload} 
                     ref={file} hidden accept="image/*" type="file" />
                     <PhotoCamera />
                  </IconButton> : null}
                  {edit ? 
                     <Box>
                        <Button 
                           onClick={() => setEdit(false)} 
                           size='small' 
                           className={styles.buttonEdit} 
                           color='error'
                           variant="outlined"
                           sx={{
                              marginRight: "10px",
                              marginTop: "10px"
                           }}>
                              Cancel
                        </Button>
                        <Button 
                        onClick={() => {
                           editComment(comment._id, text, image)
                           setEdit(false)
                           }} 
                           size='small' 
                           className={styles.buttonEdit} 
                           color='success' 
                           disabled={text.length === 0 && image.length === 0}
                           variant="outlined"
                           sx={{
                              marginRight: "10px",
                              marginTop: "10px"
                           }}>
                              Save
                        </Button>
                     </Box> : null}
               </Box>
               <Box 
                  className={styles.flex}
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     maxHeight: "20px"
                  }}>
                  <Box 
                     className={styles.flex}
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        maxHeight: "20px",
                        marginTop: "8px"
                     }}>
                     <IconButton 
                        className={styles.button} 
                        onClick={submitLike}
                        //color="error"
                        color={checkUserLike.length === 0 ? "inherit" : "error"}
                        sx={{
                           height: "18px",
                           minWidth: "23px"
                        }}>
                        <FavoriteIcon 
                           //color="error"
                           sx={{
                              width: "20px",
                              height: "20px"
                           }} 
                           className={styles.icon}/>
                     </IconButton>
                     {like !== 0 ? 
                     <Button 
                        className={styles.flexLike} 
                        onClick={() => setLikeModal(true)}
                        sx={{
                           fontSize: "12px",
                           display: "flex",
                           alignItems: "center",
                           textAlign: "center",
                           justifyContent: "center",
                           minWidth: "20px",
                        }}>
                        <Typography sx={{color: "white"}} className={styles.current}>{like}</Typography>
                     </Button> : null}
                     
                  </Box>
                  { !checkParent ? 
                  <Box 
                     className={styles.flex}
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        maxHeight: "20px",
                        marginTop: "8px"
                     }}>
                     <IconButton 
                        className={styles.button} 
                        onClick={() => setOpenComment(!openComment)}
                        color="inherit"
                        sx={{
                           height: "18px",
                           minWidth: "23px"
                        }}>
                        <ChatBubbleIcon
                           sx={{
                                 width: "20px",
                                 height: "20px"
                              }} 
                           className={styles.icon}/>
                     </IconButton>
                     {commentsLength !== 0 ? <Typography sx={{padding: "8px"}} className={styles.currentComment}>{commentsLength}</Typography> : null}
                  </Box> : null}
               </Box>
               {openComment ? 
               <Box>
                  <CommentField userPhoto={user.avatarImage} setArr={addComment} id={comment._id} commentParent={true}/>
                  <CommemtsList editComment={editCommentSecond} checkParent={true}  deleteCommentFirst={deleteCommentSecond} comments={comments} id={comment._id} userPhoto={user.avatarImage}/>
                  {comments.length < commentsLength && !fetching ?
                     <Button 
                        variant="text" 
                        className={styles.buttonAdd} 
                        onClick={() => setFetching(true)}
                        sx={{
                           marginTop: "10px",
                           marginRight: "10px"
                        }}>
                        load more answers
                     </Button> : null}
               </Box> : null}
            </Box>
            <LikeModal likeList={userComments} open={openLikeModal} handleClose={() => setLikeModal(false)}/>
            <ImageModal image={comment.img} open={openImageModal} handleClose={() => setImageModal(false)}/>
      </Box>
   )
}

export default Comments