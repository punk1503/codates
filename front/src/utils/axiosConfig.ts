import axios from "axios"
import { backendAdress } from "./env";

const Axios = axios.create({
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: backendAdress + 'api/',
})

Axios.interceptors.request.use(function (config) {
    console.log(config)
    return config;
  }, function (error) {
    console.warn(error)
    return Promise.reject(error);
  });

Axios.interceptors.response.use(function (response) {
    console.log(response)
    return response;
  }, function (error) {
    console.log(error)
    return Promise.reject(error);
  });

export default Axios