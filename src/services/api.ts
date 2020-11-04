import axios from 'axios';

const api = axios.create({
   //  baseURL: 'http://localhost:3333'
    baseURL: process.env.API_URL
})

export default api;