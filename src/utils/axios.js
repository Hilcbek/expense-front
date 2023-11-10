import axios from 'axios'
export let Axios = axios.create({
    baseURL : 'https://tracker-new-t93k.onrender.com/api',
    withCredentials : true
});
//httpp://localhost:5000/api