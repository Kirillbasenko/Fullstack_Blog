import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';

import styles from "./analytics.module.scss"

const Analytics = ({viewsCount}) => {
   return(
      <Box 
         //className={styles.container}
         sx={{
            border: "1px solid rgba(222, 222, 222, 0.3)",
            padding: "20px 10px",
            textAlign: "center",
            borderRadius: "10px",
            margin: "20px 0px"
         }}>
         <Typography variant='h6'>Analytics</Typography>
         <Box 
            //className={styles.flex}
            sx={{
               display: "flex",
               justifyContent: "space-around"
            }}>
            <Box 
               //className={styles.content}
               sx={{
                  display: "flex",
                  textAlign: "center",
                  marginTop: "10px"
               }}>
               <PeopleIcon 
                  //className={styles.icon}
                  sx={{
                     marginRight: "8px"
                  }}/>
               <Typography >
                  {viewsCount} profile view
               </Typography>
            </Box>
            <Box 
               //className={styles.content}
               sx={{
                  display: "flex",
                  textAlign: "center",
                  marginTop: "10px"
               }}>
               <BarChartIcon 
                  //className={styles.icon}
                  sx={{
                     marginRight: "8px"
                  }}/>
               <Typography >
                  11 likes posts
               </Typography>
            </Box>
         </Box>
      </Box>
   )
}

export default Analytics