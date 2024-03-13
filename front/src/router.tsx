import { BrowserRouter, Route, Routes, Outlet, Navigate, useLocation, useNavigate } from "react-router-dom"
import XOR from "./utils/XOR"
import { useAuth } from "./context/AuthContext"
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import MainPage from "./pages/MainPage/MainPage"
import MatchingPage from "./pages/MatchingPage/MatchingPage"
import LogoutPage from "./pages/LogoutPage"

type PrivateRouteProps = {
    isForAuthenticated: boolean,
}

function PrivateRoute({isForAuthenticated}: PrivateRouteProps) {
    const { pathname, search } = useLocation()
    const redirectRoute = new URLSearchParams(search).get('redirect') ?? '/'
    const { isAuthenticated } = useAuth()
    return (
        !XOR(isAuthenticated, isForAuthenticated) ? <Outlet></Outlet> : <Navigate  to={!isForAuthenticated ? `${redirectRoute}` : `/signin/?redirect=${pathname}`}/>
    )
}

function AppRoutes() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<PrivateRoute isForAuthenticated={true} />}>
                    </Route>

                    <Route element={<PrivateRoute isForAuthenticated={false} />}>
                        <Route path="/signup" element={<RegistrationPage/>}></Route>
                        <Route path="/signin" element={<LoginPage/>}></Route>
                    </Route>

                    <Route path="/" element={<MainPage/>}></Route>

                    {/*
                        этот маршрут стоит здесь только для тестирования.
                        нужно будет переместить его первый роут 
                    */}
                    <Route path="/matching" element={<MatchingPage/>}></Route>
                    <Route path="/logout" element={<LogoutPage/>}></Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoutes
