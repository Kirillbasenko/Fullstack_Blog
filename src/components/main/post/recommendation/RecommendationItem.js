import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import styles from "../../../../styles/main/recommendations.module.scss"
import { checkComment } from '@/http/commentApi';

const RecommendationItem = ({submitLike, userItem, navigateProfile}) => {
   const dispatch = useDispatch()
   const [checkFriend, setCheckFriend] = useState([])
   const {user} = useSelector(state => state.user)

   useEffect(() =>  {
      setCheckFriend(user.friends ? user.friends.filter(item => item._id === userItem._id) : [])
   }, [user])

   //const checkFriend = user.friends.filter(item => item._id === userItem._id)

   return(
      <CardActionArea 
         onClick={(e) => {
               const words = e.target.className.split(" ");
               const thirdWord = words[2];
               if(thirdWord === "MuiButton-outlined"){
                  submitLike(userItem)
               }else{
                  navigateProfile(userItem._id)
               }
         }}
         className={styles.box}
         sx={{
               display: "flex",
               marginBottom: "15px",
               justifyContent: "space-between",
               alignItems: "center",
               padding: 0,
               cursor: "pointer"
         }}>
         <CardMedia
               //className={styles.image}
               sx={{
               objectFit: "contain",
               borderRadius: "50%",
               width: "42px",
               height: "42px",
               display: "inline"
               }}
               component="img"
               image={userItem.avatarImage ? `http://localhost:5000${userItem.avatarImage}` : "/avatarUser.jpg"}
               alt="green iguana"/>
         <Typography 
               //className={styles.name} 
               sx={{
               fontSize: "12px",
               //maxWidth: "100px"
               }}
               variant="body1">
               {userItem.name.length > 15 ? `${userItem.name.slice(0, 15)}...` : userItem.name}
         </Typography>
         <Button 
               //className={styles.followButton} 
               color={checkFriend.length === 0 ? 'info' : "error"}
               sx={{
                  backgroundColor: checkFriend.length === 0 ? "rgba(255, 255, 255, 0.8)" : "null" ,
                  fontSize: "11px",
                  padding: "0px 0px",
                  textTransform: "capitalize",
                  borderRadius: "15px",
               }}
               variant="outlined"
               id="navigateButton">
               {checkFriend.length === 0 ? "Follow" : "Remove"}
            </Button>
      </CardActionArea>
   )
}

export default RecommendationItem