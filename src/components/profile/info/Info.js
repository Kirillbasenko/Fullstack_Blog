import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styles from "./info.module.scss"

const Info = ({user}) => {
   return(
      <Box 
         //className={styles.container}
         sx={{
            border: "1px solid rgba(222, 222, 222, 0.3)",
            padding: "0px 10px 10px 10px",
            borderRadius: "10px",
            //textAlign: "center"
         }}>
         <Box>
            <Typography 
               //className={styles.title}
               sx={{
                  fontSize: "14px",
                  margin: "10px 0px 5px 0px"
               }}>
               Location
            </Typography>
            <Typography 
               //className={styles.description} 
               variant='body2'
               sx={{
                  fontSize: "12px"
               }}>
               {user.location}
            </Typography>
         </Box>
         <Box>
            <Typography 
               //className={styles.title}
               sx={{
                  fontSize: "14px",
                  margin: "10px 0px 5px 0px"
               }}>
               Age
            </Typography>
            <Typography 
               //className={styles.description} 
               variant='body2'
               sx={{
                  fontSize: "12px"
               }}>
               {user.age} years old
            </Typography>
         </Box>
         <Box>
            <Typography 
               //className={styles.title}
               sx={{
                  fontSize: "14px",
                  margin: "10px 0px 5px 0px"
               }}>
               Email
            </Typography>
            <Typography 
               //className={styles.description} 
               variant='body2'
               sx={{
                  fontSize: "12px"
               }}>
               {user.email}
            </Typography>
         </Box>
      </Box>
   )
}

export default Info