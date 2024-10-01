import axios from "axios";
const service = axios.create({

  baseURL: import.meta.env.VITE_BASE_URL_API,

  withCredentials: false,
  timeout: 5000,
  headers: {
    'allow-origin': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE',
  }
})

service.interceptors.request.use(
  (config) => {
  return config;
  },
  (error) => {
   console.log("request err", error);
    return Promise.reject(error);
  }
)

service.interceptors.response.use(

  response => {
    

    const res = response.data
   




    return res

  },
  error => {
    
    console.log('err', error) 

    return Promise.reject(error)
  }
)

export default service
