import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';

import styles from "../../styles/main/recommendations.module.scss"

const Recommendations = () => {
   return(
      <Card className={styles.parent}>
         <Typography className={styles.title}>
            Your recommended accounts
         </Typography>
         <CardContent className={styles.content}>
            <Box className={styles.box}>
               <CardMedia
               className={styles.image}
               component="img"
               image="https://images.theconversation.com/files/500899/original/file-20221214-461-22jr1l.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
               alt="green iguana"/>
               <Typography className={styles.name} variant="body1">
                  Name
               </Typography>
               <Button className={styles.followButton} variant="outlined">Follow</Button>
            </Box>
            <Box className={styles.box}>
               <CardMedia
               className={styles.image}
               component="img"
               image="https://images.theconversation.com/files/500899/original/file-20221214-461-22jr1l.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
               alt="green iguana"/>
               <Typography className={styles.name} variant="body1">
                  Name
               </Typography>
               <Button className={styles.followButton} variant="outlined">Follow</Button>
            </Box>
            <Box className={styles.box}>
               <CardMedia
               className={styles.image}
               component="img"
               image="https://images.theconversation.com/files/500899/original/file-20221214-461-22jr1l.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
               alt="green iguana"/>
               <Typography className={styles.name} variant="body1">
                  Name
               </Typography>
               <Button className={styles.followButton} variant="outlined">Follow</Button>
            </Box>
         </CardContent>
         <Button className={styles.showButton} variant="text">Show more</Button>
      </Card>
   )
}

export default Recommendations