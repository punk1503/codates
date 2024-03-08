import { User } from "../types/User.interface"
import Axios from "../utils/axiosConfig"
import { ReactNode, createContext, useContext, useState } from "react"

type AuthContextType = {
    isAuthenticated: boolean,
}

const authContext = createContext<AuthContextType>({
    isAuthenticated: false,
});

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return (
        <authContext.Provider value={{isAuthenticated}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext);