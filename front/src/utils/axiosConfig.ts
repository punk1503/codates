import axios from "axios"

const axios_base_url = 'http://127.0.0.1:8000/api/'

const Axios = axios.create({
    baseURL: axios_base_url,
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
})

Axios.interceptors.response.use(function (repsonse) {
    console.log(repsonse)
    return repsonse
}, function (error) {
    console.warn(error)
    return Promise.reject(error)
})

Axios.interceptors.request.use(function (config) {
    console.log(config)
    return config
}, function (error) {
    console.warn(error)
    return Promise.reject(error)
})

export default Axios