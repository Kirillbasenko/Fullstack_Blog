import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

import { useRef, useState, useEffect } from 'react';

import { updateInfo } from '@/http/userApi';

import { ukraineCities } from './cities';

import styles from "./updateInfo.module.scss"

const UpdateInfo = ({open, handleClose, id, userName, userExperience, userAboutMe, userLocation, userAge}) => {
   const [name, setName] = useState(userName)
   const [experience, setExperience] = useState(userExperience)
   const [aboutMe, setAboutMe] = useState(userAboutMe)
   const [location, setLocation] = useState(userLocation)
   const [age, setAge] = useState(userAge)

   const submitUserBackground = () => {
      updateInfo(id, name, experience, aboutMe, location, age)
      handleClose()
   }

   useEffect(() => {
      setName(userName)
      setExperience(userExperience)
      setAboutMe(userAboutMe)
      setLocation(userLocation)
      setAge(userAge)
   }, [userName])

   return(
      <Modal
         open={open}
         onClose={handleClose}>
         <Box //className={styles.modal}
            sx={{
               position: "absolute",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               minWidth: "510px",
               background: "#143685",
               border: "2px solid #000",
               boxShadow: "24px",
               borderRadius: "10px",
               padding: "16px",
               display: "flex",
               flexDirection: "column"
            }}>
            <Box 
               //className={styles.flex}
               sx={{
                  display: "flex",
                  justifyContent: "space-between"
               }}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Update info
               </Typography>
               <IconButton onClick={handleClose} color="warning" aria-label="upload picture" component="label">
                  <CloseIcon />
               </IconButton>
            </Box>
            <TextField label="Name" onChange={(e) => setName(e.target.value)}  className={styles.input} size='small'  color="warning" value={name} variant="standard" />
            <TextField
               //className={styles.input}
               sx={{
                  marginBottom: "15px",
                  fontSize: "13px"
               }}
               value={experience}
               label="Experience"
               variant="standard"
               color="warning"
               multiline
               maxRows={6}
               onChange={(e) => setExperience(e.target.value)} 
               name="title"
            />
            <TextField
               //className={styles.input}
               sx={{
                  marginBottom: "15px",
                  fontSize: "13px"
               }}
               value={aboutMe}
               label="AboutMe"
               variant="standard"
               color="warning"
               multiline
               maxRows={6}
               onChange={(e) => setAboutMe(e.target.value)} 
               name="title"
            />
            <TextField value={age} onChange={(e) => setAge(e.target.value)} type='number' className={styles.input} color="warning" size='small' id="outlined-basic" label="Age" variant="standard" />
            <FormControl 
               //className={styles.select} 
               sx={{
                  margin: "15px 0px",
                  width: "200px"
               }}
               fullWidth>
               <InputLabel  color="warning" id="demo-simple-select-label">Location</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={location}
                  label="Location"
                  color="warning"
                  onChange={(e) => setLocation(e.target.value)}
               > 
                  {ukraineCities && ukraineCities.map(item => {
                     return(<MenuItem key={item} value={item}>{item}</MenuItem>)
                  })}
                  
               </Select>
            </FormControl>
            <Box 
               //className={styles.buttonCenter}
               sx={{
                  textAlign: "center",
                  marginTop: "20px"
               }}>
               <Button 
                  onClick={() => submitUserBackground()} 
                  //className={styles.buttonSubmit} 
                  sx={{
                     marginRight: "10px"
                  }}
                  color='success' 
                  variant="contained" 
                  endIcon={<SendIcon />}>
                  upload
               </Button>
            </Box>
         </Box>
      </Modal>
   )
}

export default UpdateInfo