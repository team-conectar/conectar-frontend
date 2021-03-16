import React, { createContext, useContext, useEffect, useState } from 'react'
import { AreaType } from '../components/UI/SelectArea'
import { ToolType } from '../components/UI/SelectTools'
import api from '../services/api'

import useAuth from './hooks/useAuth'
interface IUserContext {
  usuario: string
  email: string
  ativo: boolean
  nome: string
  colaborador: boolean
  idealizador: boolean
  aliado: boolean
  foto_perfil: string
  id: number
  areas: AreaType[]
  habilidades: ToolType[]
}
const UserContext = createContext({
  usuario: '',
  email: '',
  ativo: false,
  nome: '',
  colaborador: false,
  idealizador: false,
  aliado: false,
  foto_perfil: '',
  id: 0,
  areas: [],
  habilidades: [],
} as IUserContext)
const LoggedUserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({} as IUserContext)
  const { isAuthenticated } = useAuth()
  const [loadingUserRequest, setLoadingUserRequest] = useState(true)
  useEffect(() => {
    api
      .get('/api/v1/pessoas/me')
      .then(response => {
        setUser(response.data)
      })
      .finally(() => {
        setLoadingUserRequest(false)
      })
  }, [user, isAuthenticated])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
function useLoggedUser(): IUserContext {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useLoggedUser muste be user within as LoggedUserProvider')
  }

  return context
}
export { useLoggedUser, LoggedUserProvider }
