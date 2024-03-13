import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Axios from "../utils/axiosConfig"
import { useAuth } from "../context/AuthContext"

export default function LogoutPage() {
    const navigate = useNavigate()
    const { setIsAuthenticated } = useAuth()
    useEffect(() => {
        Axios.get('logout/')
        .then((response) => {
            console.log(response)
            navigate('/')
            setIsAuthenticated(false)
        })
    }, [])
    return null
}