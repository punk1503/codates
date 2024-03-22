import XOR from "./utils/XOR"
import { BrowserRouter, Route, Routes, Outlet, Navigate, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import BottomBar from "./components/BottomBar"
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import MainPage from "./pages/MainPage/MainPage"
import MatchingPage from "./pages/MatchingPage/MatchingPage"
import LogoutPage from "./pages/LogoutPage"
import ChatsPage from "./pages/ChatsPage/ChatsPage"
import ChatPage from "./pages/ChatPage/ChatPage"
import AccountPage from "./pages/AccountPage/AccountPage"
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
	const { isAuthenticated	} = useAuth()
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<PrivateRoute isForAuthenticated={true} />}>
						<Route path="/matching" element={<MatchingPage/>}></Route>
						<Route path="/chat" element={<ChatsPage/>}></Route>
						<Route path="/chat/:user_id" element={<ChatPage/>}></Route>
						<Route path="/profile" element={<AccountPage/>}></Route>
					</Route>

					<Route element={<PrivateRoute isForAuthenticated={false} />}>
						<Route path="/signup" element={<RegistrationPage/>}></Route>
						<Route path="/signin" element={<LoginPage/>}></Route>
					</Route>

					<Route path="/" element={<MainPage/>}></Route>
					<Route path="/logout" element={<LogoutPage/>}></Route>
				</Routes>
				{isAuthenticated ? <BottomBar></BottomBar> : <></>}
			</BrowserRouter>
		</>
	)
}

export default AppRoutes
