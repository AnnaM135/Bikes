// import axios from "axios"

// export const post =async (url,data) => {
//     return await axios.post(`http://localhost:8888/api${url}`,data)
// }
// export const get =async (url) => {
//     return await axios.get(`http://localhost:8888/api${url}`)
// }  
import axios from 'axios';

export default axios.create({
    baseURL:"http://localhost:8888/api",

   //baseURL: "http://46.4.249.19:8888/api",
    headers:{
        'Content-type':'application/json'
    }
})