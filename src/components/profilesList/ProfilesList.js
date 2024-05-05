import {Box} from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { useRouter } from "next/router"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react"
import { checkUser } from '@/http/userApi'
import { getAllUsers, updateFriends, updateView } from '@/http/userApi';

import { setUser, setAllUsers } from "@/store/slices/userSlice"

import Profile from '../main/ProfileWindow';
import Tags from '../main/TagsWindow';
import ProfilesItem from './ProfilesItem';

import styles from "../../styles/tags/tagsPage.module.scss"

const ProfilesList = () => {
   const dispatch = useDispatch()
   const router = useRouter()

   const [profiles, setProfiles] = useState([])

   const {user, allUsers} = useSelector(state => state.user)
   const {width} = useSelector(state => state.width)


   useEffect(() => {
      getAllUsers(null, user).then(res => {
         const allUsersFilter = res.filter(item => item._id !== user._id)
         //let filteredArray = allUsersFilter.slice(0, 3);
         dispatch(setAllUsers(allUsersFilter))
      })
   }, [user])

   const submitLike = (anotherUser) => {
      const checkUserLike = user.friends.filter(item => item._id === anotherUser._id)
      let newLikesUsers = checkUserLike.length !== 0 ? user.friends.filter(item => item._id !== anotherUser._id) : [...user.friends, anotherUser]
      updateFriends(user._id, newLikesUsers, anotherUser._id).then(data => {
         dispatch(setUser(data.doc))
         //console.log(data.doc);
      } )
      console.log(newLikesUsers);
   }
   

   const navigateProfile = (id) => {
      router.push(`ProfilePage/${id}`)
      localStorage.setItem("anotherUser", JSON.stringify(id))
      updateView(id)
   }

   useEffect(() => {
      checkUser(JSON.parse(localStorage.getItem("user"))).then(data => dispatch(setUser(data)))
   }, [])

   let ui = () => {
      if(width > 992){
         return(
            <Grid container spacing={2}>
               <Grid item xs={3}>
                  <Grid>
                     <Profile user={user}/>
                  </Grid>
                  <Grid>
                     <Tags/>
                  </Grid>
               </Grid>
               <Grid item xs={8}>
                  <Typography 
                     className={styles.title}
                     sx={{
                        fontSize: "16px",
                        marginBottom: "10px"
                     }}>
                     Profiles
                  </Typography>
                     {allUsers.length !== 0 && allUsers.map(user => {
                        return (<ProfilesItem submitLike={submitLike} userItem={user} navigateProfile={navigateProfile}/>)
                     }
                     )}
               </Grid>
            </Grid>
         )
      }else if(width > 768){
         return(
            <Grid container spacing={2}>
               <Grid item xs={3}>
                  <Grid>
                     <Profile user={user}/>
                  </Grid>
                  <Grid>
                     <Tags/>
                  </Grid>
               </Grid>
               <Grid item xs={8}>
                  <Typography 
                     className={styles.title}
                     sx={{
                        fontSize: "16px",
                        marginBottom: "10px"
                     }}>
                     Profiles
                  </Typography>
                     {allUsers.length !== 0 && allUsers.map(user => {
                        return (<ProfilesItem submitLike={submitLike} userItem={user} navigateProfile={navigateProfile}/>)
                     }
                     )}
               </Grid>
            </Grid>
         )
      }else if(width < 768){
         return(
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Typography 
                     className={styles.title}
                     sx={{
                        fontSize: "16px",
                        marginBottom: "10px"
                     }}>
                     Profiles
                  </Typography>
                     {allUsers.length !== 0 && allUsers.map(user => {
                        return (<ProfilesItem submitLike={submitLike} userItem={user} navigateProfile={navigateProfile}/>)
                     }
                     )}
               </Grid>
            </Grid>
         )
      }
   }

   return (
      <>
         {ui()}
      </>
   )
}

export default ProfilesList