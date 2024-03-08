    import { User } from "../types/User.interface"
    import Axios from "../utils/axiosConfig"
    import { ReactNode, createContext, useContext, useState } from "react"

    type AuthContextType = {
        isAuthenticated: boolean,
        login: (username: string, password: string) => void,
        logout: () => void,
        register: (user: User) => void,
    }

    const authContext = createContext<AuthContextType>({
        isAuthenticated: false,
        login: () => {},
        logout: () => {},
        register: () => {}
    });

    type AuthProviderProps = {
        children: ReactNode
    }

    export function AuthProvider({children}: AuthProviderProps) {
        const [isAuthenticated, setIsAuthenticated] = useState(false)

        function login(username: string, password: string) {
            Axios.post('drf-auth/login', {username, password})
            .then((response) => {
                setIsAuthenticated(true)
            })
            .catch((error) => {
            })
        }

        function logout() {
            Axios.post('logout/')
        }

        function register(user: User) {
            Axios.post('signup/', user)
            .then((response) => {
            })
            .catch((error) => {
            })
        }

        return (
            <authContext.Provider value={{isAuthenticated, login, logout, register}}>
                {children}
            </authContext.Provider>
        )
    }

    export const useAuth = () => useContext(authContext);