import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUserLikes } from '@/store/slices/postSlice';

import { setAllPosts } from '@/store/slices/postSlice';
import { setPosts } from '@/store/slices/postSlice';
import { fetchPosts } from '@/http/postApi';
import { setActiveTag } from '@/store/slices/postSlice';
import { deletePost } from '@/http/postApi';

import Post from './Post';

import styles from "../../../styles/main/posts.module.scss"

const Posts = ({arrStart, currentStart, fetchingStart}) => {
   const dispatch = useDispatch()

   const [a, setA] = useState(false)
   const [fetching, setFetching] = useState(true)
   const [arr, setArr] = useState([])
   const [checkAllPosts, setCheckAllPosts] = useState(null)
   const [current, setCurrent] = useState(0)

   const {post, tags} = useSelector(state => state.post)
   const {user} = useSelector(state => state.user)

   const removePost = (id) => {
      deletePost(id)
      let arrWithoutOnePost = arr.filter(item => item._id !== id)
      dispatch(setPosts(arrWithoutOnePost))
      setArr(arrWithoutOnePost)
   }

   useEffect(() => {
      fetchPosts().then(data => {
         const likesTotal = data.posts.reduce((total, item) => {
            if(item.user._id === user._id){
               return total + item.likes; 
            }
            return total
         }, 0);
         dispatch(setUserLikes(likesTotal));
      })
   }, [fetching])

   useEffect(() => {
      setArr(arrStart)
      setCurrent(currentStart)
      setFetching(fetchingStart)
   }, [arrStart])

   useEffect(() => {
      dispatch(setActiveTag(null))
   }, [arr])

   useEffect(() => {
      fetchPosts().then(data => {
         setCheckAllPosts(data.posts.length)
      })
      if(arr.length < 5 ){
         setFetching(true)
      }
   }, [arr])

   useEffect(() => {
      dispatch(setPosts([...arr]))
      if(fetching){
         fetchPosts(6, current || 1, tags.activeTag || tags.dopActive).then(data => {
            setArr([...arr, ...data.posts])
            dispatch(setAllPosts(data.current))
         })
         .finally(() => {
            
            setFetching(false)
            setCurrent(current => current + 1)
            console.log(fetching);
         })
      }else if(fetching && tags.activeTag){
         fetchPosts(6, current || 1, tags.activeTag || tags.dopActive).then(data => {
            setArr([...arr, ...data.posts])
            dispatch(setAllPosts(data.current))
         })
         .finally(() => {
            setFetching(false)
            setCurrent(current => current + 1)
         })
      }
   }, [fetching])

   useEffect(() => {
      console.log(current);
      dispatch(setPosts([...arr]))
      if(tags.activeTag ){
         fetchPosts(6, 1, tags.activeTag).then(data => {
            setArr([...data.posts])
            dispatch(setAllPosts(data.current))
         })
         .finally(() => {
            setCurrent(2)
         })
      }
   }, [tags.activeTag])

   useEffect(() => {
      document.addEventListener("scroll", (e) => scrollHandler(e))
      return  () => {
         document.removeEventListener("scroll", (e) => scrollHandler(e))
      }
   }, [])

   const scrollHandler = (e) => {
      if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200){
         setFetching(true)
      }else(
         setFetching(false)
      )
   };

   useEffect(() => {
      let a = []
      const interval = setInterval(() => {
         fetchPosts().then(data => a = data.posts)
         if(a.length > checkAllPosts){
            setA(true)
            console.log(a.length, checkAllPosts);
            
         }
      }, 2000);
      return () => {
         clearInterval(interval);
      };
      
   }, [checkAllPosts])

   return(
      <Box className={styles.container}>
         <Button style={{opacity: a ? 1 : 0, zIndex: a ? 1 : -1}} startIcon={<ArrowUpwardIcon sx={{width: 15, height: 15}} />} className={styles.button} 
         onClick={() => {
            fetchPosts(6, 1)
            .then(data => {
               setArr(data.posts)
               dispatch(setAllPosts(data.current))
            })
            .finally(() => {
               setFetching(true)
               setCurrent(2)
               setA(false)
            })
         }} size='small' variant="contained">Show new posts</Button>
         <Box className={styles.content} component="div">
            {post.items.length !== 0 && post.items.map((post, index) => 
               <Post deletePost={removePost} key={post._id} post={post}/>) }
         </Box>
         {fetching && post.items.length !== checkAllPosts ? <Box className={styles.spinner}><CircularProgress/></Box> : null}
      </Box>
   )
}

export default Posts