import { createSlice } from "@reduxjs/toolkit"; 

const initialState = { 
   isAuth: false,
   user: {},
   allUsers: [],
   anotherUser: {}
} 

const userSlice = createSlice({ 
   name: 'user', 
   initialState, 
   reducers: { 
      setIsAuth: (state, action) => { 
         state.isAuth = action.payload 
      }, 
      setUser: (state, action) => { 
         state.user = action.payload 
      },
      setAnotherUser: (state, action) => { 
         state.anotherUser = action.payload 
      },
      setAllUsers: (state, action) => { 
         state.allUsers = action.payload 
      },
   } 
}) 

export const {setIsAuth, setUser, setAnotherUser, setAllUsers} = userSlice.actions 

export default userSlice.reducer