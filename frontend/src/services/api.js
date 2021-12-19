import axios from 'axios'

const api = axios.create({
    baseURL: `http://${window.location.hostname}:8080`,
    //responseType: 'blob'
})

export default api;