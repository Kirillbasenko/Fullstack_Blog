import user from "./slices/userSlice"
import post from "./slices/postSlice";
import width from "./slices/widthSlice"
import { configureStore } from '@reduxjs/toolkit';

export function makeStore() {
   return configureStore({
      reducer: { user: user, post: post, width: width },
   })
   }

const store = makeStore()

export default store;