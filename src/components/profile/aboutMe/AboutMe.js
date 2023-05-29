import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styles from "./aboutMe.module.scss"

const AboutMe = ({title, description}) => {
   return(
      <Box 
         className={styles.content}
         sx={{
            marginTop: "15px",
            position: "relative"
         }}>
         <Typography 
            className={styles.title}
            sx={{
               fontSize: "16px",
               fontWeight: 600,
               marginBottom: "10px"
            }}>
            {title}
         </Typography>
         <Typography 
            className={styles.description}
            sx={{
               fontSize: "16px"
            }}>
            {description}
         </Typography>
      </Box>
   )
}

export default AboutMe