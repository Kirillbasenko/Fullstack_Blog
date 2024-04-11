import { $host, $authHost} from "./index";

export const createPost = async (post) => {
   const {data} = await $authHost.post("api/post", post)
   return data
}

export const fetchPosts = async (limit, page, tag, userId) => {
   const {data} = await $host.get("api/post", {params: {limit, page, tag, userId}})
   return data
}

export const fetchPostsOnlyUser = async (userId) => {
   const {data} = await $authHost.get("api/post/onlyUser", {params: {userId}})
   return data
}

export const checkPost = async (id) => {
   const {data} = await $host.get("api/post/check", {params: {id}})
   return data
}

export const fetchOnePost = async (id) => {
   const {data} = await $host.get("api/post", {params: {id}})
   return data
}

export const deletePost = async (id) => {
   const {data} = await $authHost.delete("api/post", {params: {id}})
   return data
}

export const updatePost = async (id, post) => {
   const {data} = await $authHost.patch("api/post/update", {id, ...post})
   return data
}

export const updateLike = async (id, likes, likesUsers, userId) => {
   const {data} = await $authHost.patch("api/post", {id, likes, likesUsers, userId})
   return data
}
