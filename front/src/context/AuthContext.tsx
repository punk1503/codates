import { ReactNode, createContext, useContext, useState } from "react"

type AuthContextType = {
    isAuthenticated: boolean,
    setIsAuthenticated: (newValue: boolean) => any
}

const authContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: (newValue: boolean) => {}
});

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return (
        <authContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext);