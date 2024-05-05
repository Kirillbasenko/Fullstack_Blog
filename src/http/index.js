import axios from "axios"

const $host = axios.create({
   baseURL: ${process.env.API_URL}
})

const $authHost = axios.create({
   baseURL: ${process.env.API_URL}
})

const authInterceptor = config => {
   config.headers.authorization = JSON.parse(localStorage.getItem('token'))
   return config
}

/*$host.interceptors.request.use((config) => {
   config.headers.authorization = localStorage.getItem('user')
})*/

$authHost.interceptors.request.use(authInterceptor)

export {
   $host,
   $authHost
}