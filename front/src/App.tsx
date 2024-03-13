import { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import AppRoutes from './router'
import Spinner from './components/Spinner'
import Axios from './utils/axiosConfig'
import Cookies from 'js-cookie'

function App() {
  const { setIsAuthenticated } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csrfResponse = await Axios.get('get-csrf-token/')
        Cookies.set('csrftoken', csrfResponse.data.csrf_token)
        Axios.defaults.headers.common['X-CSRFToken'] = Cookies.get('csrftoken')
        
        const authResponse = await Axios.get('check-auth/')
        setIsAuthenticated(authResponse.status === 200)
      } catch (error) {
        console.error('Error fetching CSRF token or checking auth:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setIsAuthenticated])

  if (loading) {
    return <Spinner />
  }

  return <AppRoutes />
}

export default App