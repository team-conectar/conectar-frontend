import { useState, useEffect } from 'react'
import api from '../../services/api'
import { IUserContext } from '../AuthContext'
import { useHistory } from 'react-router-dom'
export default function useAuth(): {
  isAuthenticated: boolean
  loading: boolean
  handleLogin(didAuthenticate: boolean): void
  handleLogout(): void
  user: IUserContext
} {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({} as IUserContext)
  useEffect(() => {
    try {
      api.post('/api/refresh_token').then(async req => {
        const accessToken = await req.data.access_token
        api.defaults.headers.Authorization = `Bearer ${accessToken}`
        setIsAuthenticated(true)
      })
      api.get('/api/v1/pessoas/me').then(response => {
        setUser(response.data)
      })
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  function handleLogin(didAuthenticate: boolean) {
    setIsAuthenticated(didAuthenticate)
  }

  async function handleLogout() {
    await api.post('/api/logout')
    setIsAuthenticated(false)
  }

  return { isAuthenticated, loading, handleLogin, handleLogout, user }
}
