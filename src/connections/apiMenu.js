import axios from 'axios';

const api= axios.create({
    baseURL: "http://localhost:8070/bff/menu"
})

export default api;