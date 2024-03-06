import { useEffect } from 'react'
import './App.css'
<<<<<<< Updated upstream
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './components/Form/Form'
import axios from 'axios'
import LoginPage from './pages/LoginPage/LoginPage';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';
=======
import AppRoutes from './router'
import Axios from './utils/axiosConfig'
import Cookies from 'js-cookie'
>>>>>>> Stashed changes

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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<LoginPage/>}></Route>
          <Route path='/signup'></Route>
          <Route path='/' element={<div>345</div>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
