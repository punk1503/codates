import { BrowserRouter, Route, Routes, Outlet, Navigate, useLocation } from "react-router-dom"
import XOR from "./utils/XOR"
import { useAuth } from "./context/AuthContext"
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import MainPage from "./pages/MainPage/MainPage"

type PrivateRouteProps = {
    isForAuthenticated: boolean,
}

function PrivateRoute({isForAuthenticated}: PrivateRouteProps) {
    const { pathname, search } = useLocation()
    const redirectRoute = new URLSearchParams(search).get('redirect') ?? '/'
    const { user } = useAuth()
    return (
        !XOR(user, isForAuthenticated) ? <Outlet></Outlet> : <Navigate  to={!isForAuthenticated ? `${redirectRoute}` : `/signin/?redirect=${pathname}`}/>
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
                        <Route path="/signin" element={<RegistrationPage/>}></Route>
                        <Route path="/signup" element={<LoginPage/>}></Route>
                    </Route>

                    <Route path="/" element={<MainPage/>}></Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoutes
