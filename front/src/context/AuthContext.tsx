import { User } from "../types/User.interface"
import Axios from "../utils/axiosConfig"
import { ReactNode, createContext, useContext, useState } from "react"

const authContext = createContext({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    register: () => {},
})

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    function login(userData: {username: string, password: string}) {
        Axios.post('drf-auth/login', userData)
        .then((response) => {
            setIsAuthenticated(true)
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    function logout() {
        Axios.post('logout/')
    }

    function register(userData: User) {

    }

    function whoami() {

    }

    return (
        <authContext.Provider value={{isAuthenticated, login, logout, register, whoami}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext);