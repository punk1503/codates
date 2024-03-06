import { useEffect } from 'react'
import { useEffect } from 'react'
import './App.css'
import AppRoutes from './router'
import Axios from './utils/axiosConfig'
import Cookies from 'js-cookie'

function App() {
  // получаем csrftoken для POST, PUT, PATCH и  DELETE запросов и записываем его в куки.
  useEffect(() => {
    const fetchCSRFToken = async () => {
      Axios.get('get-csrf-token/')
      .then((response) => {
        console.log('cookie set')
        Cookies.set('csrftoken', response.data.csrf_token)
        Axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken')
      })
    }

    fetchCSRFToken()
  }, [])

  // получаем csrftoken для POST, PUT, PATCH и  DELETE запросов и записываем его в куки.
  useEffect(() => {
    const fetchCSRFToken = async () => {
      Axios.get('get-csrf-token/')
      .then((response) => {
        console.log('cookie set')
        Cookies.set('csrftoken', response.data.csrf_token)
        Axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken')
      })
    }

    fetchCSRFToken()
  }, [])

  return (
    <>
      <AppRoutes></AppRoutes>
    </>
  )
}

export default App
