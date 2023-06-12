import { createSlice } from "@reduxjs/toolkit"; 

const initialState = { 
   post: {
      items: [],
      currentAll: null,
      status: "idle"
   },
   tags: {
      items: [],
      activeTag: null,
      dopActive: null
   },
   userLikes: null
} 

const postSlice = createSlice({ 
   name: 'post', 
   initialState, 
   reducers: { 
      setPosts: (state, action) => { 
         state.post.items = action.payload 
      },
      addNewPost: (state, action) => { 
         state.post.items = [action.payload, ...state.post.items]
      },
      setAllPosts: (state, action) => { 
         state.post.currentAll = action.payload 
      },
      setAllPostsAndUpdatePost: (state, action) => { 
         let indexElem = state.post.items.findIndex((elem) => elem._id === action.payload._id)
         state.post.items[indexElem].title = action.payload.title
         state.post.items[indexElem].img = action.payload.img
         state.post.items[indexElem].type = action.payload.type
         state.post.items[indexElem].tags = action.payload.tags
      },
      setTags: (state, action) => { 
         state.tags.items = action.payload.sort((a, b) => b.count - a.count) 
      },
      setActiveTag: (state, action) => { 
         state.tags.activeTag = action.payload 
      },
      setActiveDop: (state, action) => { 
         state.tags.dopActive = action.payload 
      },
      setUserLikes: (state, action) => { 
         state.userLikes = action.payload 
      },
   },
}) 

export const {
   setPosts, 
   setAllPostsAndUpdatePost, 
   setTags, 
   setActiveTag, 
   setAllPosts, 
   setActiveDop,
   setUserLikes,
   addNewPost} = postSlice.actions 

export default postSlice.reducer