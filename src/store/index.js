import user from "./slices/userSlice"
import post from "./slices/postSlice";
import { configureStore } from '@reduxjs/toolkit';

export function makeStore() {
   return configureStore({
      reducer: { user: user, post: post },
   })
   }

const store = makeStore()

export default store;