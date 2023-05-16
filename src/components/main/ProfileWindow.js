import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';


import styles from "../../styles/main/profile.module.scss"

const Profile = ({user}) => {
   const router = useRouter()

   const navigateProfile = () => {
      router.push(`ProfilePage/${user._id}`)
   }

   const {userLikes} = useSelector(state => state.post)

   return(
      <Card className={styles.parent}>
         <CardActionArea onClick={navigateProfile}>
            <CardMedia
                  sx={{ height: 75 }}
                  component="img"
                  image={user.backgroundImage ? `http://localhost:5000${user.backgroundImage}` : "/backGround.jpg"}
                  alt="green iguana"/>
            <CardMedia
               sx={{objectFit: "contain", borderRadius: "50%", width: 60, height: 60, display: "inline", marginTop: -4}}
               component="img"
               className={styles.userImage}
               image={user.avatarImage ? `http://localhost:5000${user.avatarImage}` : "/avatarUser.jpg"}
               alt="green iguana"/>
            <CardContent sx={{padding: 1}}>
               <Typography gutterBottom variant="h6" component="div">
                  {user.name}
               </Typography>
               <Typography className={styles.decor} variant="body3">
                  {user.aboutMe && user.aboutMe.length > 25 ? `${user.aboutMe.slice(0, 35)}...` : user.aboutMe}
               </Typography>
            </CardContent>
         </CardActionArea>
            <Box className={styles.boxContent}>
               <Box className={styles.content}>
                  <Typography>
                     {user.viewsCount}
                  </Typography>
                  <Typography variant='body3' className={styles.textGrey}>
                     Profile views
                  </Typography>
               </Box>
               <Box className={styles.decor2}></Box>
               <Box sx={{padding: 0}} className={styles.content}>
                  <Typography sx={{padding: 0}}>
                     {userLikes ? userLikes : 0}
                  </Typography>
                  <Typography variant='body3' sx={{padding: 0}} className={styles.textGrey}>
                     Likes posts
                  </Typography>
               </Box>
            </Box>
         <Button onClick={navigateProfile} className={styles.button} variant="text">My Profile</Button>
      </Card>
   )
}

export default Profile