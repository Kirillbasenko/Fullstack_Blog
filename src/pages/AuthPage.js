import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

import AuthForm from "../components/auth/AuthForm"
import AuthFormMobile from '@/components/auth/AuthFormMobile';

import styles from "../styles/authPage.module.scss"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

const AuthPage = () => {
   const [position, setPosition] = useState(false)
   const [width, setWidth] = useState(null)

   useEffect(() => {
      setWidth(window.innerWidth);
   }, []);

   useEffect(() => {
      const handleResize = () => {
         setWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return(
      
      <Card 
         //className={styles.parent} 
         sx={{
            position: "relative",
            marginTop: "20%",
            minWidth: width > 768 ? "800px" : "90%",
            minHeight: width > 620 ? "750px" : width > 450 ? "600px" : "520px",
            backgroundColor: "#14204bad",
            borderRadius: "12px"
            }}>
         {width > 768 ?<Grid container className={styles.wrapper}>
            <Grid item xs={6}>
               <CardMedia
                  sx={{
                     width: "50%",
                     height: "100%",
                     position: "absolute",
                     top: 0,
                     left: 0,
                     zIndex: 2,
                     transition: "transform 1s",
                     transform: position ? "translateX(100%)" : "translateX(0)",}}
                  component="img"
                  image={position ? "/avatar4.jpg" : "/avatar3.jpg"}
                  alt="green iguana"/>
                  <Box sx={{
                           transition: "transform 1s",
                           transform: position ? "translateX(100%)" : "translateX(0)",
                           position: "relative",
                           zIndex: 3,
                           textAlign: "center",
                           display: "flex",
                           top: "550px",
                           flexDirection: "column",
                           justifyContent: "center"
                        }}
                        className={styles.content}>
                     <Typography 
                        variant='h4' 
                        className={styles.title}
                        sx={{
                           color: "#386BE2",
                           marginBottom: "15px"
                        }}>
                        Welcome to Pandora
                     </Typography>
                     <Typography 
                        className={styles.text}
                        sx={{
                           color: "#386BE2"
                        }}>
                        {position ? "Already a user?" : "Need an account?"}
                     </Typography>
                     <Button 
                        onClick={() => setPosition(!position)} 
                        className={styles.button} 
                        variant="outlined"
                        sx={{
                           margin: "0 auto",
                           width: "170px",
                           padding: "5px",
                           fontSize: "12px"
                        }}>
                        {position ? "sing in" : "sing up"}
                     </Button>
                  </Box>
            </Grid>
            <Grid item xs={6}>
               <AuthForm position={position}/>
            </Grid>
         </Grid>: <AuthFormMobile/>}
      </Card> 
   )
}

export default AuthPage