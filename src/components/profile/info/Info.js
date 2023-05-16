import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styles from "./info.module.scss"

const Info = ({user}) => {
   return(
      <Box className={styles.container}>
         <Box>
            <Typography className={styles.title}>Location</Typography>
            <Typography className={styles.description} variant='body2'>{user.location}</Typography>
         </Box>
         <Box>
            <Typography className={styles.title}>Age</Typography>
            <Typography className={styles.description} variant='body2'>{user.age} years old</Typography>
         </Box>
         <Box>
            <Typography className={styles.title}>Email</Typography>
            <Typography className={styles.description} variant='body2'>{user.email}</Typography>
         </Box>
      </Box>
   )
}

export default Info