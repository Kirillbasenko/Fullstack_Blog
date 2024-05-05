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

import { useSelector } from 'react-redux';

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

   const {width} = useSelector(state => state.width)

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
         <Box sx={{width: width > 768 ? 500 : "85%"}} className={styles.modal}>
            <Box className={styles.flex}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Update info
               </Typography>
               <IconButton onClick={handleClose} color="warning" aria-label="upload picture" component="label">
                  <CloseIcon />
               </IconButton>
            </Box>
            <TextField label="Name" onChange={(e) => setName(e.target.value)}  className={styles.input} size='small'  color="warning" value={name} variant="standard" />
            <TextField
                     className={styles.input}
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
                     className={styles.input}
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
            <FormControl className={styles.select} fullWidth>
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
            <Box className={styles.buttonCenter}>
               <Button onClick={() => submitUserBackground()} className={styles.buttonSubmit} color='success' variant="contained" endIcon={<SendIcon />}>
                  upload
               </Button>
            </Box>
         </Box>
      </Modal>
   )
}

export default UpdateInfo