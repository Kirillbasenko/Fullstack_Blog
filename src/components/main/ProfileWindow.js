import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import styles from "../../styles/main/profile.module.scss"

const Profile = ({user}) => {
   const router = useRouter()

   //const [width, setWidth] = useState(null)
   const [mobileOpenWindow, setMobileOpenWindow] = useState(false)

   const {width} = useSelector(state => state.width)
   const {userLikes} = useSelector(state => state.post)

   const navigateProfile = () => {
      router.push(`ProfilePage/${user._id}`)
   }

   return(
      <Card 
         className={styles.parent}
         sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: "15px",
            color: "aliceblue",
            backgroundColor: "#14204bad",
            marginBottom: "10px"
         }}>
         <CardActionArea onClick={navigateProfile}>
            <CardMedia
                  sx={{ height: 75 }}
                  component="img"
                  image={user.backgroundImage ? `http://localhost:5000${user.backgroundImage}` : "/backGround.jpg"}
                  alt="green iguana"/>
            <CardMedia
               sx={{
                  objectFit: "contain", 
                  borderRadius: "50%", 
                  width: 60, 
                  height: 60, 
                  display: "inline", 
                  marginTop: -4,
               }}
               component="img"
               className={styles.userImage}
               image={user.avatarImage ? `http://localhost:5000${user.avatarImage}` : "/avatarUser.jpg"}
               alt="green iguana"/>
            <CardContent sx={{padding: 1}}>
               <Typography gutterBottom variant="h6" component="div">
                  {user.name}
               </Typography>
               {width > 768 ? <Typography 
                  className={styles.decor} 
                  variant="body3"
                  sx={{
                     display: "flex",
                     flexDirection: "column"
                  }}>
                  {user.aboutMe && user.aboutMe.length > 25 ? `${user.aboutMe.slice(0, 35)}...` : user.aboutMe}
               </Typography> : null}
            </CardContent>
         </CardActionArea>
            {width > 768 ?<Box 
               className={styles.boxContent}
               sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "5px 0px"
               }}>
               <Box className={styles.content}>
                  <Typography>
                     {user.viewsCount}
                  </Typography>
                  <Typography 
                     variant='body3' 
                     className={styles.textGrey}
                     sx={{
                        opacity: 0.5,
                        fontSize: "12px"
                     }}>
                     Profile views
                  </Typography>
               </Box>
               <Box 
                  className={styles.decor2}
                  sx={{
                     height: "50px",
                     width: "1px",
                     backgroundColor: "rgba($color: #FFFFFF, $alpha: 0.2)"
                  }}></Box>
               <Box sx={{padding: 0}} className={styles.content}>
                  <Typography sx={{padding: 0}}>
                     {userLikes ? userLikes : 0}
                  </Typography>
                  <Typography 
                     variant='body3' 
                     sx={{
                        padding: 0,
                        opacity: 0.5,
                        fontSize: "12px"
                     }} 
                     className={styles.textGrey}>
                     Likes posts
                  </Typography>
               </Box>
            </Box> : null}
         {width > 768 ?<Button 
            onClick={navigateProfile} 
            className={styles.button} 
            variant="text"
            sx={{
               display: "flex",
               flexDirection: "column",
               textTransform: "capitalize",
               paddingBottom: "15px"
            }}>
               My Profile
         </Button>
         : 
         <Accordion
            sx={{
               //backgroundColor: "#14204bad",
               backgroundColor: "rgba(20, 32, 75, 1)",
               color: "aliceblue"
            }}>
            <AccordionSummary
               expandIcon={<ExpandMoreIcon color='error' />}
               aria-controls="panel1a-content"
               id="panel1a-header"
            >
               <Typography sx={{
                  margin: "0 auto",
                  fontSize: "12px",
                  opacity: "0.5"
               }}>Show more</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <Typography 
                  className={styles.decor} 
                  variant="body3"
                  sx={{
                     display: "flex",
                     flexDirection: "column"
                  }}>
                  {user.aboutMe}
               </Typography>
               <Box 
                  className={styles.boxContent}
                  sx={{
                     display: "flex",
                     justifyContent: "space-around",
                     padding: "5px 0px"
                  }}>
                  
                  <Box className={styles.content}>
                     <Typography>
                        {user.viewsCount}
                     </Typography>
                     <Typography 
                        variant='body3' 
                        className={styles.textGrey}
                        sx={{
                           opacity: 0.5,
                           fontSize: "12px"
                        }}>
                        Profile views
                     </Typography>
                  </Box>
                  <Box 
                     className={styles.decor2}
                     sx={{
                        height: "50px",
                        width: "1px",
                        backgroundColor: "rgba($color: #FFFFFF, $alpha: 0.2)"
                     }}></Box>
                  <Box sx={{padding: 0}} className={styles.content}>
                     <Typography sx={{padding: 0}}>
                        {userLikes ? userLikes : 0}
                     </Typography>
                     <Typography 
                        variant='body3' 
                        sx={{
                           padding: 0,
                           opacity: 0.5,
                           fontSize: "12px"
                        }} 
                        className={styles.textGrey}>
                        Likes posts
                     </Typography>
                  </Box>
               </Box>
            </AccordionDetails>
         </Accordion>}
      </Card>
   )
}

export default Profile