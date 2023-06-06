import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';

import { useSelector } from 'react-redux';

import { useState, useEffect } from 'react';

import styles from "../../styles/main/recommendations.module.scss"

const Recommendations = () => {
   
   const {width} = useSelector(state => state.width)

   return(
      <Card 
         className={styles.parent}
         sx={{
            padding: "13px",
            borderRadius: "15px",
            color: "aliceblue",
            backgroundColor: "#14204bad"
         }}>
         <Typography 
            className={styles.title}
            sx={{
               fontWeight: 500,
               fontSize: "15px",
               marginBottom: "20px"
            }}>
            Your recommended accounts
         </Typography>
         <CardContent 
            className={styles.content}
            sx={{
               display: "flex",
               flexDirection: "column",
               padding: 0
            }}>
            <Box 
               className={styles.box}
               sx={{
                  display: "flex",
                  marginBottom: "15px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 0,
                  cursor: "pointer"
               }}>
               <CardMedia
                  className={styles.image}
                  sx={{
                     objectFit: "contain",
                     borderRadius: "50%",
                     width: "42px",
                     height: "42px",
                     display: "inline"
                  }}
                  component="img"
                  image="https://images.theconversation.com/files/500899/original/file-20221214-461-22jr1l.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
                  alt="green iguana"/>
               <Typography 
                  //className={styles.name} 
                  sx={{
                     fontSize: "12px"
                  }}
                  variant="body1">
                  Name
               </Typography>
               <Button 
                  className={styles.followButton} 
                  sx={{
                     backgroundColor: "aliceblue",
                     fontSize: "11px",
                     color: "rgb(5, 5, 5)",
                     textTransform: "capitalize",
                     borderRadius: "15px",
                  }}
                  variant="outlined">
                  Follow
               </Button>
            </Box>
            <Box 
               className={styles.box}
               sx={{
                  display: "flex",
                  marginBottom: "15px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 0,
                  cursor: "pointer"
               }}>
               <CardMedia
               className={styles.image}
               sx={{
                  objectFit: "contain",
                  borderRadius: "50%",
                  width: width > 992 ? "42px" : "37px",
                  height: width > 992 ? "42px" : "37px",
                  display: "inline"
               }}
               component="img"
               image="https://images.theconversation.com/files/500899/original/file-20221214-461-22jr1l.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
               alt="green iguana"/>
               <Typography 
                  //className={styles.name} 
                  variant="body1"
                  sx={{
                     fontSize: "12px"
                  }}>
                  Name
               </Typography>
               <Button 
                  className={styles.followButton} 
                  variant="outlined"
                  sx={{
                     backgroundColor: "aliceblue",
                     fontSize: "11px",
                     color: "rgb(5, 5, 5)",
                     textTransform: "capitalize",
                     borderRadius: "15px",
                  }}>
                  Follow
               </Button>
            </Box>
            <Box className={styles.box}>
               <CardMedia
                  className={styles.image}
                  sx={{
                     objectFit: "contain",
                     borderRadius: "50%",
                     width: "42px",
                     height: "42px",
                     display: "inline"
                  }}
                  component="img"
                  image="https://images.theconversation.com/files/500899/original/file-20221214-461-22jr1l.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
                  alt="green iguana"/>
               <Typography 
                  //className={styles.name} 
                  sx={{
                     fontSize: "12px"
                  }}
                  variant="body1">
                  Name
               </Typography>
               <Button 
                  className={styles.followButton} 
                  sx={{
                     backgroundColor: "aliceblue",
                     fontSize: "11px",
                     color: "rgb(5, 5, 5)",
                     textTransform: "capitalize",
                     borderRadius: "15px",
                  }}
                  variant="outlined">
                     Follow
               </Button>
            </Box>
         </CardContent>
         <Button 
            className={styles.showButton} 
            variant="text"
            sx={{
               textTransform: "capitalize",
               fontSize: "14px"
            }}>
            Show more
         </Button>
      </Card>
   )
}

export default Recommendations