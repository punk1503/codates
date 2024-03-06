import { ReactNode, useState, createContext } from "react"

type AuthContextProviderProps = {
    children?: ReactNode,
}

type AuthContext = {
    isAuthenticated: boolean,
    setIsAuthenticated: (isAuthenticated: boolean) => void,
}    

const authContext = createContext<AuthContext>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
})

const AuthContextProvider = ({children}: AuthContextProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return (
        <authContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </authContext.Provider>
    )

}

export { authContext, AuthContextProvider }