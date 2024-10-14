import axios from "axios";


const clientApi = axios.create({
    baseURL: 'http://localhost:3002/bp/'
})

export default clientApi;