import React, { createContext } from 'react'
import { AreaType } from '../components/UI/SelectArea'
import { ToolType } from '../components/UI/SelectTools'

import useAuth from './hooks/useAuth'
export interface IUserContext {
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
const Context = createContext({
  loading: false,
  isAuthenticated: false,
  user: {
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
  } as IUserContext,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleLogin: (didAuthenticate: boolean) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleLogout: () => {},
})

const AuthProvider: React.FC = ({ children }) => {
  const {
    loading,
    handleLogin,
    isAuthenticated,
    handleLogout,
    user,
  } = useAuth()

  return (
    <Context.Provider
      value={{ loading, isAuthenticated, handleLogin, handleLogout, user }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, AuthProvider }
