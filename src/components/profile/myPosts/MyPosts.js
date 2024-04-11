import Box from '@mui/material/Box';

import Posts from '@/components/main/post/Posts';

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { fetchPosts } from "@/http/postApi"
import { setAllPosts, setActiveDop, setPosts } from "@/store/slices/postSlice"

const MyPosts = () => {
   const dispatch = useDispatch()
   const router = useRouter()

   const {user, anotherUser} = useSelector(state => state.user)

   const [userProfile, setUserProfile] = useState(anotherUser ? anotherUser : user)
   const [arr, setArr] = useState([])
   const [current, setCurrent] = useState(0)
   const [fetching, setFetching] = useState(true)

   return(
      <Box>
         My Posts
         <Box sx={{marginTop: "20px"}}>
            <Posts profile={router.query.id} arrStart={arr} currentStart={current} fetchingStart={fetching}/>
         </Box>
         
      </Box>
   )
}

export default MyPosts