import axios from "axios"

const Axios = axios.create({
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: 'http://127.0.0.1:8000/api/'
})


export default Axios