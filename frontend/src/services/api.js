import axios from 'axios'

const api = axios.create({
    baseURL: `http://${ process.env.REACT_APP_HOSTNAME }:8080`,
    //responseType: 'blob'
})

export default api;