import { IconButton, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, CardMedia, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PeopleIcon from '@mui/icons-material/People';

import { useRouter } from "next/router"
import styles from "../../styles/header.module.scss"

import Link from 'next/link';

import { useSelector } from 'react-redux';

import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
   const router = useRouter()

   const {user} = useSelector(state => state.user)

   const logout = () => {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      router.push("/AuthPage")
   }

   return(
      <Box 
         component="header" 
         className={styles.parent}
         sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            justifyContent: "space-between"
         }}>
            <Link href="/">
               <TwitterIcon 
                  className={styles.logo}
                  sx={{
                     width: "30px",
                     height: "30px",
                     marginRight: "12px"
                  }}/>
            </Link>
            <FormControl fullWidth>
               <OutlinedInput
               //className={styles.input}
               sx={{
                  color: "white",
                  borderRadius: "10px",
                  width: "170px",
                  backgroundColor: "rgba(20, 32, 75, 0.6784313725)",
                  height: "30px"
               }}
               placeholder='Explore'
               id="outlined-adornment-amount"
               startAdornment={
                  <InputAdornment sx={{color: "#9F9FA1"}} position="start">
                     <Box sx={{fontSize: 16}}>
                        #
                     </Box>
                  </InputAdornment>}
               />
            </FormControl>
            <Button 
               variant="outlined" 
               className={styles.homeButton} 
               sx={{paddingX: 4}} startIcon={<HomeIcon sx={{width: 25, height: 25}} color='info' />}>
               Home
               </Button>
            <Badge 
               className={styles.icon} 
               sx={{
                  marginLeft: "25px",
                  width: "25px",
                  height: "25px",
                  cursor: "pointer"
               }}
               badgeContent={1} 
               color="info">
               <EmailIcon/>
            </Badge>
            <Badge 
               className={styles.icon} 
               sx={{
                  marginLeft: "25px",
                  width: "25px",
                  height: "25px",
                  cursor: "pointer"
               }}
               badgeContent={1} 
               color="info">
               <PeopleIcon/>
            </Badge>
         
         <FormControl fullWidth sx={{marginLeft: 4, width: 300}} size="small">
            <InputLabel 
               shrink={false} 
               className={styles.selectedInput}
               sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  color: "aliceblue"
               }}>
               <CardMedia
               height={22}
               width={22}
               sx={{objectFit: "contain", borderRadius: "50%", marginRight: 1, width: 25, height: 25,  }}
               component="img"
               image={user.avatarImage ? `http://localhost:5000${user.avatarImage}` : "/avatarUser.jpg"}
               alt="green iguana"/>
               <Typography sx={{fontSize: "14px"}}>{user.name.length < 12 ? user.name : `${user.name.substring(0, 12)}...`}</Typography>
            </InputLabel>
            <Select
            className={styles.selected}
            sx={{
               borderRadius: "16px",
               color: "aliceblue",
               backgroundColor: "rgba(20, 32, 75, 0.6784313725)",
            }}
            >
            <MenuItem onClick={() => {
               if(router.query.id !== user._id){
                  router.push(`ProfilePage/${user._id}`)
               }
            } } sx={{fontSize: 12}}>Подив. профіль</MenuItem>
            <MenuItem onClick={() => logout()} sx={{fontSize: 12}}>Вийти</MenuItem>
            </Select>
         </FormControl>
      </Box>
   )
}

export default Header