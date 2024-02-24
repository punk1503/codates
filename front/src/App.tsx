import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './components/Form/Form'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={
            <Form action_url='/signin' fields_data={[
              {
                label: 'Имя пользователя',
                placeholder: 'example_username1503',
                requestFieldName: 'username',
                fieldType: 'text',
                isRequired: true
              },
              {
                label: 'Электронная почта',
                placeholder: 'example@email.ru',
                requestFieldName: 'email',
                fieldType: 'email',
                isRequired: true
              },
              {
                label: 'Номер телефона',
                placeholder: '8 900 555 35 35',
                requestFieldName: 'telephone',
                fieldType: 'telephone',
                isRequired: true
              }
            ]}></Form>
          }></Route>
          <Route path='/signup'></Route>
          <Route path='/' element={<div>345</div>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
