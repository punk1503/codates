import { useEffect } from 'react'
import AppRoutes from './router'
import Axios from './utils/axiosConfig'
import Cookies from 'js-cookie'

function App() {
  // получаем csrftoken для POST, PUT, PATCH и  DELETE запросов и записываем его в куки.
  useEffect(() => {
    const fetchCSRFToken = async () => {
      Axios.get('get-csrf-token/')
      .then((response) => {
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
