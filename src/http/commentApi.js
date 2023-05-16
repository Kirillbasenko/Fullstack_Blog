import { $host, $authHost} from "./index";

export const createComment = async (postId, comment, img) => {
   const {data} = await $authHost.post("api/comment", {postId, comment, img})
   return data
}

export const fetchComments = async (postId, limit, page) => {
   const {data} = await $host.get("api/comment", {params: {postId, limit, page}})
   return data
}

export const remuveComment = async (id) => {
   const {data} = await $authHost.delete("api/comment", {params: {id}})
   return data
}

export const updateComment = async (id, comment, img) => {
   const {data} = await $authHost.patch("api/comment/update", {id, comment, img})
   return data
}

export const updateLikeComment = async (id, like, likesUsers) => {
   const {data} = await $authHost.patch("api/comment", {id, like, likesUsers})
   return data
}

export const checkComment = async (id) => {
   const {data} = await $host.get("api/comment/check", {params: {id}})
   return data
}