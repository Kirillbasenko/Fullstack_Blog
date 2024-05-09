import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';

import { useSelector, useDispatch } from 'react-redux';

import { getAllUsers, updateFriends, updateView } from '@/http/userApi';

import RecommendationItem from './RecommendationItem';

import { useRouter } from 'next/router';

import { setAllUsers, setUser } from '@/store/slices/userSlice';

import { useEffect } from 'react';

import styles from "@/styles/main/recommendations.module.scss"

const RecommendationList = () => {
   const dispatch = useDispatch()
   const router = useRouter()
   
   //const {width} = useSelector(state => state.width)
   const {allUsers, user} = useSelector(state => state.user)

   useEffect(() => {
      console.log(user);
      getAllUsers(null).then(res => {
         const allUsersFilter = res.filter(item => item.name !== user.name)
         let filteredArray = allUsersFilter.slice(0, 3);
         dispatch(setAllUsers(filteredArray))
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

   return(
      <Card 
         //className={styles.parent}
         sx={{
            padding: "7px",
            borderRadius: "15px",
            color: "aliceblue",
            backgroundColor: "#14204bad"
         }}>
         <Typography 
            className={styles.title}
            sx={{
               fontWeight: 500,
               fontSize: "15px",
               marginBottom: "20px"
            }}>
            Your recommended accounts
         </Typography>
         <CardContent 
            className={styles.content}
            sx={{
               display: "flex",
               flexDirection: "column",
               padding: 0
            }}>
            {allUsers.length !== 0 && allUsers.map(user => {
               return (<RecommendationItem key={user._id} submitLike={submitLike} userItem={user} navigateProfile={navigateProfile}/>)
            }
            )}
         </CardContent>
         <Button 
            onClick={() => router.push("Profiles")}
            className={styles.showButton} 
            variant="text"
            sx={{
               textTransform: "capitalize",
               fontSize: "14px"
            }}>
            Show more
         </Button>
      </Card>
   )
}

export default RecommendationList