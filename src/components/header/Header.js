import { IconButton, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, CardMedia, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PeopleIcon from '@mui/icons-material/People';

import { useRouter } from "next/router"
import styles from "../../styles/header.module.scss"

import Link from 'next/link';

import {setActiveTag, setActiveDop } from '@/store/slices/postSlice';
import { setWidth } from '@/store/slices/widthSlice';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { styled } from '@mui/material/styles';

import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
   const router = useRouter()
   const dispatch = useDispatch()

   const {user} = useSelector(state => state.user)
   const {width} = useSelector(state => state.width)

   const logout = () => {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      router.push("/AuthPage")
   }

   console.log(router);

   const routProfiles = () => {
      router.push("/Profiles")
   }

   useEffect(() => {
      dispatch(setWidth(window.innerWidth));
   }, []);

   useEffect(() => {
      const handleResize = () => {
         dispatch(setWidth(window.innerWidth));
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   /*return(
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
               onClick={() => {
                  dispatch(setActiveTag(null))
                  dispatch(setActiveDop(null))
               }}
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
               image={user.avatarImage ? `${process.env.API_URL}${user.avatarImage}` : "/avatarUser.jpg"}
               alt="green iguana"/>
               <Typography sx={{fontSize: "14px"}}>{user.name && user.name.length > 15 ? `${user.name.slice(0, 15)}...` : user.name}</Typography>
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
                  if(router.pathname === "/" ){
                     router.push(`ProfilePage/${user._id}`)
                  }else{
                     router.push(`${user._id}`)
                  }
                  
                  localStorage.setItem("anotherUser", JSON.stringify(user._id))
               }
            } } sx={{fontSize: 12}}>Подив. профіль</MenuItem>
            <MenuItem onClick={() => logout()} sx={{fontSize: 12}}>Вийти</MenuItem>
            </Select>
         </FormControl>
      </Box>
   )*/
    return(
      <Box 
         component="header" 
         className={styles.parent}
         sx={{
            display: "flex",
            position: "sticky",
            paddingTop: "10px",
            paddingBottom: "5px",
            top: 0,
            left: 0,
            zIndex: 5,
            alignItems: "center",
            marginBottom: "5px",
            justifyContent: "space-between",
            backgroundColor: "rgba(2, 8, 30, 0.9)"
         }}>
            <Box>
               <Link href="/">
                  <TwitterIcon 
                     //className={styles.logo}
                     color='info'
                     sx={{
                        width: "30px",
                        height: "30px",
                        marginRight: "12px"
                     }}/>
               </Link>
               {width > 900 ?
                  <FormControl >
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
                  </FormControl> : null}
               </Box>
               <Box>
            <Button 
               variant="outlined" 
               className={styles.homeButton}
               onClick={() => {
                  dispatch(setActiveTag(null))
                  dispatch(setActiveDop(null))
                  router.push(`/`)
               }}
               sx={{
                  paddingX: width > 530 ? 4 : 1,
                  }} 
               startIcon={<HomeIcon sx={{width: 25, height: 25}} 
               color='info' />}>
               Home
               </Button>
            <Badge 
               //className={styles.icon} 
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
            <IconButton 
               style={{backgroundColor: "inherit", width: "25px"}} 
               onClick={() => routProfiles()}>
               <Badge  
                  //className={styles.icon} 
                  sx={{
                     marginLeft: "25px",
                     width: "25px",
                     height: "25px",
                     cursor: "pointer",
                     color: "white"
                  }}
                  badgeContent={1} 
                  color="info">
                  <PeopleIcon/>
               </Badge>
            </IconButton>
         <FormControl sx={{marginLeft: 4}} size="small">
            <InputLabel 
               shrink={false} 
               //className={styles.selectedInput}
               sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  color: "aliceblue",
               }}>
               <CardMedia
               height={22}
               width={22}
               sx={{objectFit: "contain", borderRadius: "50%", marginRight: 1, width: 25, height: 25,  }}
               component="img"
               image={user.avatarImage ? `${process.env.API_URL}${user.avatarImage}` : "/avatarUser.jpg"}
               alt="green iguana"/>
               {width > 530 ? 
                  <Typography sx={{fontSize: "14px"}}>
                     {user.name && user.name.length > 15 ? `${user.name.slice(0, 15)}...` : user.name}
                  </Typography> : null}
            </InputLabel>
            <Select
               //className={styles.selected}
               sx={{
                  borderRadius: "16px",
                  color: "aliceblue",
                  width: width > 530 ? "140px" : "50px",
                  backgroundColor: "rgba(20, 32, 75, 0.6784313725)",
               }}>
               <MenuItem onClick={() => {
                  if(router.query.id !== user._id){
                     if(router.pathname === "/"){
                        console.log(user._id);
                        router.push(`ProfilePage/${user._id}`)
                     }else{
                        localStorage.setItem("anotherUser", localStorage.getItem("user"))
                        router.push(`${user._id}`)
                     }
                  }
               } } sx={{fontSize: 12}}>Подив. профіль</MenuItem>
               <MenuItem onClick={() => logout()} sx={{fontSize: 12}}>Вийти</MenuItem>
            </Select>
         </FormControl>
         </Box>
      </Box>
   )
}

export default Header