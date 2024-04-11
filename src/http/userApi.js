import { $host, $authHost} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, name) => {
   const {data} = await $host.post("api/user/registration", {email, password, name})
   return data
}

export const login = async (email, password) => {
   const {data} = await $host.post("api/user/login", {email, password})
   return data
}

export const checkUser = async (_id) => {
   const {data} = await $host.get("api/user/check", {params: {
      _id
   }})
   return data
}

export const updateInfo = async (id, name, experience, aboutMe, location, age) => {
   const {data} = await $host.patch("api/user/updateProfile", {id, name, experience, aboutMe, location, age})
   return data
}

export const updatePhoto = async (id, userImage, avatarImage) => {
   const {data} = await $host.patch("api/user/updatePhoto", {userImage, avatarImage, id})
   return data
}

export const updateBackground = async (id, backgroundImage) => {
   const {data} = await $host.patch("api/user/updateBack", {backgroundImage, id})
   return data
}

export const getAllUsers = async (limit, user) => {
   const {data} = await $host.get("api/user", {params: {limit, user}})
   return data
}

export const updateFriends = async (id, friends, friendId) => {
   const {data} = await $host.patch("api/user/updateFriends", {id, friends, friendId})
   return data
}

export const updateView = async (id) => {
   const {data} = await $host.patch("api/user/updateView", {id})
   return data
}


