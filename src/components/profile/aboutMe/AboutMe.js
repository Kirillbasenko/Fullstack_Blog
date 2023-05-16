import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styles from "./aboutMe.module.scss"

const AboutMe = ({title, description}) => {
   return(
      <Box className={styles.content}>
         <Typography className={styles.title}>{title}</Typography>
         <Typography className={styles.description}>{description}</Typography>
      </Box>
   )
}

export default AboutMe