import axios from 'axios';

const api= axios.create({
    baseURL: "http://localhost:8070/bff/consulta/get_user"
})

export default api;