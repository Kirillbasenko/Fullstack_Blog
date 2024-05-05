import { $host, $authHost} from "./index";

export const upload = async (image) => {
   const {data} = await $authHost.post("upload", image)
   return data
}

export const uploadVideo = async (image) => {
   const {data} = await $authHost.post("uploadVideo", image)
   return data
}