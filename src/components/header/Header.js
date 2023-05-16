import { IconButton, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, CardMedia } from '@mui/material';
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
      <Box component="header" className={styles.parent}>
            <Link href="/">
               <TwitterIcon className={styles.logo}/>
            </Link>
            <FormControl fullWidth>
               <OutlinedInput
               className={styles.input}
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
            <Button variant="outlined" className={styles.homeButton} sx={{paddingX: 4}} startIcon={<HomeIcon sx={{width: 25, height: 25}} color='info' />}>
               Home
               </Button>
            <Badge className={styles.icon} badgeContent={1} color="info">
               <EmailIcon/>
            </Badge>
            <Badge className={styles.icon} badgeContent={1} color="info">
               <PeopleIcon/>
            </Badge>
         
         <FormControl fullWidth sx={{marginLeft: 4, width: 300}} size="small">
            <InputLabel shrink={false} className={styles.selectedInput}>
               <CardMedia
               height={22}
               width={22}
               sx={{objectFit: "contain", borderRadius: "50%", marginRight: 1, width: 25, height: 25 }}
               component="img"
               image={user.avatarImage ? `http://localhost:5000${user.avatarImage}` : "/avatarUser.jpg"}
               alt="green iguana"/>
               {user.name}
            </InputLabel>
            <Select
            className={styles.selected}
            sx={{borderRadius: "50%" }}
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