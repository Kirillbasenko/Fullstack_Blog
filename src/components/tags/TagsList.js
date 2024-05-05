import {Box} from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useRouter } from "next/router"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"
import { checkUser } from '@/http/userApi'
import { fetchPosts } from '@/http/postApi';

import { setUser } from "@/store/slices/userSlice"
import { setTags, setActiveTag, setActiveDop } from '@/store/slices/postSlice';

import Profile from '../main/ProfileWindow';
import RecommendationList from '../main/recommendation/RecommendationList';

import styles from "../../styles/tags/tagsPage.module.scss"

const TagsList = () => {
   const dispatch = useDispatch()
   const router = useRouter()

   const {user} = useSelector(state => state.user)
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
         
   }, [])

   const changeActiveTag = (item) => {
      if(tags.dopActive !== item){
         dispatch(setActiveTag(item))
         dispatch(setActiveDop(item))
      }
   }

   useEffect(() => {
      checkUser(JSON.parse(localStorage.getItem("user"))).then(data => dispatch(setUser(data)))
   }, [])

   return (
      <>
         <Grid container spacing={2}>
            <Grid item xs={3}>
               <Grid>
                  <Profile user={user}/>
               </Grid>
               <Grid>
                  <RecommendationList/>
               </Grid>
            </Grid>
            <Grid item xs={8}>
               <Typography 
                  className={styles.title}
                  sx={{
                     fontSize: "16px",
                     marginBottom: "10px"
                  }}>
                  Trends
               </Typography>
               {tags.items.length !== 0 && tags.items.map((item) => 
                  <Button onClick={() => {
                     changeActiveTag(item.tag)
                     router.push(`/`)
                  }} 
                     key={item.tag} 
                     className={styles.content}
                     sx={{
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        alignItems: 'flex-start',
                        textTransform: "capitalize",
                        backgroundColor: "#14204bad",
                        marginBottom: "5px",
                        padding: "5px"
                     }}>
                     <Typography 
                        className={styles.titleTweet}
                        sx={{
                           fontSize: "14px"
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
            </Grid>
         </Grid>
      </>
   )
}

export default TagsList