import {Navigate, Outlet, Routes, useLocation, BrowserRouter, Route} from 'react-router-dom'
import XOR from "./utils/XOR"
import { useContext } from 'react'
import { authContext } from './context/authContext'
import LoginPage from './pages/LoginPage'
import MainPage from "./pages/MainPage"
import RegistrationPage from './pages/RegistrationPage'

type PrivateRouteProps = {
    isForAuthenticated: boolean,
}

function PrivateRoutes({ isForAuthenticated }: PrivateRouteProps) {
    const { pathname, search } = useLocation()
    const redirectRoute = new URLSearchParams(search).get('redirect') ?? '/'
    const { isAuthenticated } = useContext(authContext)
    return (
    !XOR(isAuthenticated, isForAuthenticated) ? <Outlet></Outlet> : <Navigate  to={!isForAuthenticated ? `${redirectRoute}` : `/signin/?redirect=${pathname}`}/>
    )
}

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                /* для анонимных */
                <Route element={<PrivateRoutes isForAuthenticated={false} />}>
                    <Route path='/signin' element={<LoginPage/>}></Route>
                    <Route path='/signup' element={<RegistrationPage/>}></Route>
                </Route>
                /* для залогиненных */
                <Route element={<PrivateRoutes isForAuthenticated={true}/>}>
                </Route>
                /* для всех */
                <Route path='/' element={<MainPage/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes