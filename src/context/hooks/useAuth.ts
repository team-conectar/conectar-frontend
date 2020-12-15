import { useState, useEffect } from 'react'
import api from '../../services/api'
export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .post('/api/refresh_token')
      .then(async req => {
        const accessToken = await req.data.access_token
        api.defaults.headers.Authorization = `Bearer ${accessToken}`
        setIsAuthenticated(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [isAuthenticated])

  function handleLogin(didAuthenticate: boolean) {
    setIsAuthenticated(didAuthenticate)
  }

  async function handleLogout() {
    await api.post('/api/logout')
    setIsAuthenticated(false)
  }

  return { isAuthenticated, loading, handleLogin, handleLogout }
}
