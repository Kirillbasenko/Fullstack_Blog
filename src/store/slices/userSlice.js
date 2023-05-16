import { createSlice } from "@reduxjs/toolkit"; 

const initialState = { 
   isAuth: false,
   user: {},
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
      setUserId: (state, action) => { 
         state.userId = action.payload 
      },
   } 
}) 

export const {setIsAuth, setUser, setUserId} = userSlice.actions 

export default userSlice.reducer