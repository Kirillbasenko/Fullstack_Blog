import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import EditIcon from '@mui/icons-material/Edit';

import styles from "./profile.module.scss"

import { useState, useEffect } from 'react';
import { setUser } from "@/store/slices/userSlice"
import { useSelector, useDispatch } from 'react-redux'
import { checkUser } from '@/http/userApi';

import Analytics from './analytics/Analytics';
import Info from './info/Info';
import MyPosts from './myPosts/MyPosts';
import AboutMe from './aboutMe/AboutMe';
import UpdatePhoto from '../modal/profileModal/updatePhoto/UpdatePhoto';
import UpdateBackground from '../modal/profileModal/updateBackground/UpdateBackground';
import UpdateInfo from '../modal/profileModal/updateInfo/UpdateInfo';

const Profile = () => {
   const dispatch = useDispatch()
   const [openInfoModal, setOpenInfoModal] = useState(false);
   const [openPhotoModal, setOpenPhotoModal] = useState(false);
   const [openBackgroundModal, setOpenBackgroundModal] = useState(false);

   const {user} = useSelector(state => state.user)
   const {width} = useSelector(state => state.width)

   useEffect(() => {
      checkUser(JSON.parse(localStorage.getItem("user"))).then(data => {
         dispatch(setUser(data))
      })
   }, [openPhotoModal, openInfoModal, openBackgroundModal])

   useEffect(() => {
      checkUser(JSON.parse(localStorage.getItem("user"))).then(data => {
         dispatch(setUser(data))
      })
   }, [])

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
               marginBottom: "40px"
            }}>
            <CardMedia
               onClick={() => setOpenBackgroundModal(true)}
               //className={styles.backGroung}
               sx={{
                  height: "150px",
                  borderRadius: "10px 10px 0px 0px",
                  cursor: "pointer",
                  zIndex: -1
               }}
               component="img"
               image={user.backgroundImage ? `http://localhost:5000${user.backgroundImage}` : "/backGround.jpg"}
               alt="green iguana"/>
            <CardMedia
               onClick={() => setOpenPhotoModal(true)}
               component="img"
               //className={styles.userImage}
               sx={{
                  objectFit: "contain",
                  borderRadius: "50%",
                  display: "inline",
                  width: "130px",
                  height: "130px",
                  border: "2px solid rgb(180, 178, 178)",
                  cursor: "pointer",
                  marginTop: "-30px"
               }}
               image={user.avatarImage ? `http://localhost:5000${user.avatarImage}` : "/avatarUser.jpg"}
               alt="green iguana"/>
            <Typography 
               //className={styles.userName}
               sx={{
                  color: "aliceblue",
                  margin: "5px 0px"
               }}>
               {user.name}
            </Typography>
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
               Edit
            </Button>
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
               {width < 768 ? <Info user={user}/> : null}
               <AboutMe title={"Experience"} description={user.experience}/>
               <AboutMe title={"About me"} description={user.aboutMe}/>
               <Analytics viewsCount={user.viewsCount}/>
               <MyPosts/>
            </Grid>
            {width > 768 ? 
            <Grid item xs={3}>
               <Info user={user}/>
            </Grid> : null}
         </Grid>
         <UpdatePhoto id={user._id} avatarImage={user.avatarImage ? user.avatarImage : ""} userImage={user.userImage ? user.userImage : ""} open={openPhotoModal} handleClose={() => setOpenPhotoModal(false)}/>
         <UpdateBackground id={user._id} background={user.backgroundImage ? user.backgroundImage : ""} open={openBackgroundModal} handleClose={() => setOpenBackgroundModal(false)}/>
         <UpdateInfo id={user._id} userName={user.name} userExperience={user.experience} userAboutMe={user.aboutMe} userLocation={user.location} userAge={user.age} open={openInfoModal} handleClose={() => setOpenInfoModal(false)}/>
      </Box>
   )
}

export default Profile