import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './components/Form/Form'
import axios from 'axios'
import LoginPage from './pages/LoginPage/LoginPage';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
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
