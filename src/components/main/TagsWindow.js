import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts } from '@/http/postApi';

import { setTags, setActiveTag, setActiveDop } from '@/store/slices/postSlice';

import styles from "../../styles/main/tags.module.scss"

const Tags = ({fetchPostsStart}) => {
   const dispatch = useDispatch()

   const {post, tags} = useSelector(state => state.post)

   useEffect(() =>  {
      const tagCounts = {};
         fetchPosts().then(data => {
            data.posts.forEach(obj => {
               obj.tags.forEach((tag) => {
                  if (!tagCounts[tag]) {
                     tagCounts[tag] = 1;
                  } else {
                     tagCounts[tag]++;
                  }
               });
               });
         }).then(() => {
            const uniqueTags = Object.keys(tagCounts).map((tag) => {
               return { tag: tag, count: tagCounts[tag] };
            });
            dispatch(setTags(uniqueTags))
         })
   }, [post])

   const changeActiveTag = (item) => {
      if(tags.dopActive !== item){
         dispatch(setActiveTag(item))
         dispatch(setActiveDop(item))
      }
   }

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
               fontSize: "14px",
               marginBottom: "20px"
            }}>
            Trend for you
         </Typography>
         {tags.items.length !== 0 && tags.items.slice(0, 10).map((item) => 
            <Button onClick={() => changeActiveTag(item.tag)} 
               key={item.tag} 
               className={styles.content}
               sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignItems: 'flex-start',
                  textTransform: "capitalize"
               }}>
               <Typography 
                  className={styles.titleTweet}
                  sx={{
                     fontSize: "12px"
                  }}>
                     #{item.tag}
               </Typography>
               <Typography 
                  className={styles.currentTweet}
                  sx={{
                     fontSize: "10px",
                     marginBottom: "5px",
                     color: "rgba($color: #ffffff, $alpha: 0.3)"
                  }}>
                     {item.count} Tweets
               </Typography>
            </Button>
         )}
         <Button 
            onClick={() => fetchPostsStart()} 
            className={styles.showButton} 
            variant="text"
            sx={{
               textTransform: "capitalize",
               fontSize: '12px'
            }}>
               Show more
         </Button>
      </Card>
   )
}

export default Tags