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

Axios.interceptors.request.use(function (config) {
    console.log(JSON.stringify(config.data))
    return config;
  }, function (error) {
    console.warn(error)
    return Promise.reject(error);
  });

Axios.interceptors.response.use(function (response) {
    console.log(JSON.stringify(response.data))
    return response;
  }, function (error) {
    console.log(error)
    return Promise.reject(error);
  });

export default Axios