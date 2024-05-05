import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import styles from "./profile.module.scss"

import { useState, useEffect } from 'react';
import { setUser, setAnotherUser } from "@/store/slices/userSlice"
import { useSelector, useDispatch } from 'react-redux'
import { checkUser, updateFriends, updateView } from '@/http/userApi';
import { fetchPostsOnlyUser } from '@/http/postApi';
import { setUserLikes } from '@/store/slices/postSlice';
import { useRouter } from 'next/router'

import Analytics from './analytics/Analytics';
import Info from './info/Info';
import MyPosts from './myPosts/MyPosts';
import AboutMe from './aboutMe/AboutMe';
import UpdatePhoto from '../modal/profileModal/updatePhoto/UpdatePhoto';
import UpdateBackground from '../modal/profileModal/updateBackground/UpdateBackground';
import UpdateInfo from '../modal/profileModal/updateInfo/UpdateInfo';
import ImageModal from '../modal/imageModal/ImageModal';

const Profile = () => {
   const dispatch = useDispatch()
   const router = useRouter()
   
   const [view, setView] = useState({})
   const [myProfile, setMyProfile] = useState(null)
   const [checkFriend, setCheckFriend] = useState([])
   const [openInfoModal, setOpenInfoModal] = useState(false);
   const [openPhotoModal, setOpenPhotoModal] = useState(false);
   const [openPhotoViewModal, setOpenPhotoViewModal] = useState(false);
   const [openBackgroundModal, setOpenBackgroundModal] = useState(false);

   const {user, anotherUser} = useSelector(state => state.user)
   const {width} = useSelector(state => state.width)
   const {userLikes} = useSelector(state => state.post)

   useEffect(() => {
      checkUser(JSON.parse(localStorage.getItem("user"))).then(data => {
         dispatch(setUser(data))
      })
   }, [openPhotoModal, openInfoModal, openBackgroundModal])

   console.log(myProfile);

   useEffect(() => {
      if(localStorage.getItem("user") === localStorage.getItem("anotherUser") /*&& localStorage.getItem("anotherUser") === null*/){
         checkUser(JSON.parse(localStorage.getItem("user")))
         .then(data => {

            dispatch(setUser(data))
            dispatch(setAnotherUser(null))
            setView(data)
            console.log(6);
            setMyProfile(true)
            //fetchPostsOnlyUser(data._id).then(data => console.log(data))
         })
      }else{
         checkUser(JSON.parse(localStorage.getItem("anotherUser"))).then(data => {
            dispatch(setAnotherUser(data))
            console.log(5);
            setView(data)
            setMyProfile(false)
            //fetchPostsOnlyUser(data._id).then(data => console.log(data))
         })
      }
   }, [openInfoModal, openPhotoModal, openBackgroundModal, router.asPath])

   /*useEffect(() => {
      if(localStorage.getItem("user") === localStorage.getItem("anotherUser") || localStorage.getItem("anotherUser") === null){
         checkUser(JSON.parse(localStorage.getItem("user")))
         .then(data => {

            dispatch(setUser(data))
            dispatch(setAnotherUser(null))
            setView(data)
            console.log(6);
            setMyProfile(true)
            //fetchPostsOnlyUser(data._id).then(data => console.log(data))
         })
      }else{
         checkUser(JSON.parse(localStorage.getItem("anotherUser"))).then(data => {
            dispatch(setAnotherUser(data))
            console.log(5);
            setView(data)
            setMyProfile(false)
            //fetchPostsOnlyUser(data._id).then(data => console.log(data))
         })
      }
   }, [router.asPath])*/

   useEffect(() => {
      const checkUserLike = user.friends && anotherUser ? user.friends.filter(item => item._id === anotherUser._id) : []
      setCheckFriend(checkUserLike)
   }, [view])

   const submitLike = () => {
      const checkUserLike = user.friends.filter(item => item._id === anotherUser._id)
      let newLikesUsers = checkUserLike.length !== 0 ? user.friends.filter(item => item._id !== anotherUser._id) : [...user.friends, anotherUser]
      updateFriends(user._id, newLikesUsers, anotherUser._id).then(data => {
         setView(data.userData)
         dispatch(setUser(data.doc))
      } )
   }

   return(
      <Box 
         component="div" 
         //className={styles.conteiner}
         sx={{
            display: "flex",
            flexDirection: "column"
         }}>
         <Box 
            //className={styles.contentCenter}
            sx={{
               textAlign: "center",
               marginBottom: "40px",
            }}>
            <CardMedia
               onClick={() => {
                  if(myProfile){
                     setOpenBackgroundModal(true)
                  }else{
                     console.log(1);
                  }
               }}
               //className={styles.backGroung}
               sx={{
                  height: "150px",
                  borderRadius: "10px 10px 0px 0px",
                  cursor: myProfile ? "pointer" : "default",
                  zIndex: -1
               }}
               component="img"
               image={view.backgroundImage ? `http://localhost:5000${view.backgroundImage}` : "/backGround.jpg"}
               alt="green iguana"/>
            <CardMedia
               onClick={() => {
                  if(myProfile){
                     setOpenPhotoModal(true)
                  }else if(view.avatarImage){
                     setOpenPhotoViewModal(true)
                  }else{
                     console.log(1);
                  }
               }}
               component="img"
               //className={styles.userImage}
               sx={{
                  objectFit: "contain",
                  borderRadius: "50%",
                  display: "inline",
                  width: "130px",
                  height: "130px",
                  border: "2px solid rgb(180, 178, 178)",
                  cursor: myProfile || view.avatarImage ? "pointer" : "default",
                  marginTop: "-30px"
               }}
               image={view.avatarImage ? `http://localhost:5000${view.avatarImage}` : "/avatarUser.jpg"}
               alt="green iguana"/>
            <Typography 
               //className={styles.userName}
               sx={{
                  color: "aliceblue",
                  margin: "5px 0px"
               }}>
               {view.name}
            </Typography>
            {myProfile ?
               <Button 
               onClick={() => setOpenInfoModal(true)} 
               variant="outlined" 
               color='info' 
               //className={styles.followButton} 
               sx={{
                  padding: "7px",
                  textTransform: "capitalize",
                  borderRadius: "10px",
                  marginTop: "10px"
               }}
               endIcon={<EditIcon sx={{width: 20, height: 20}}/>}>
               {"Edit"}
            </Button> : 
            <Button 
               onClick={() => submitLike()} 
               variant="outlined" 
               color={checkFriend.length === 0 ? 'info' : "error"} 
               //className={styles.followButton} 
               sx={{
                  padding: "7px 10px",
                  textTransform: "capitalize",
                  borderRadius: "10px",
                  marginTop: "10px"
               }}
               endIcon={checkFriend.length === 0 ? <PersonAddIcon sx={{width: 20, height: 20}}/> : <PersonRemoveIcon sx={{width: 20, height: 20}}/>}>
               {checkFriend.length === 0 ? "Follow" : "Remove"}
            </Button>}
         </Box>
         <Grid container spacing={3}>
            <Grid 
               //className={styles.content} 
               sx={{
                  display: "block",
                  flexDirection: "column"
               }}
               item 
               xs={width > 768 ? 9 : 12}>
               {width < 768 ? <Info user={view}/> : null}
               <AboutMe title={"Experience"} description={view.experience}/>
               <AboutMe title={"About me"} description={view.aboutMe}/>
               <Analytics userLikes={userLikes} viewsCount={view.viewsCount}/>
               <MyPosts/>
            </Grid>
            {width > 768 ? 
            <Grid item xs={3}>
               <Info user={view}/>
            </Grid> : null}
         </Grid>
         <UpdatePhoto id={user._id} avatarImage={user.avatarImage ? user.avatarImage : ""} userImage={user.userImage ? user.userImage : ""} open={openPhotoModal} handleClose={() => setOpenPhotoModal(false)}/>
         <UpdateBackground id={user._id} background={user.backgroundImage ? user.backgroundImage : ""} open={openBackgroundModal} handleClose={() => setOpenBackgroundModal(false)}/>
         <UpdateInfo id={user._id} userName={user.name} userExperience={user.experience} userAboutMe={user.aboutMe} userLocation={user.location} userAge={user.age} open={openInfoModal} handleClose={() => setOpenInfoModal(false)}/>
         <ImageModal image={view.avatarImage ? view.avatarImage : "/backGround.jpg"} open={openPhotoViewModal} handleClose={() => setOpenPhotoViewModal(false)}/>
      </Box>
   )
}

export default Profile