import React, {
  InputHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react'
import { BodyCard } from './styles'
import { Link } from 'react-router-dom'
import id from '../../assets/icon/id.svg'
import al from '../../assets/icon/al.svg'
import twoUsers from '../../assets/icon/twoUsers.svg'
import { Context } from '../../context/AuthContext'
import { AxiosError } from 'axios'
import { AreaType } from '../SelectArea'
import { ToolType } from '../SelectTools'
import api from '../../services/api'
import ProfileLink from '../ProfileLink'

interface ProfileType {
  data_nascimento: string
  usuario: string
  email: string
  ativo: boolean
  nome: string
  telefone: string
  colaborador: boolean
  idealizador: boolean
  aliado: boolean
  foto_perfil: string
  habilidades: ToolType[]
  areas: AreaType[]
  id: number
  data_criacao: string
  data_atualizacao: string
}
const SuccessfulCreatorsCard: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType>({} as ProfileType)
  useEffect(() => {
    const res = api
      .get(`/api/v1/pessoas/me`)
      .then(response => {
        setProfile(response.data)
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail
      })
    console.log(res)
  }, [])
  return (
    <BodyCard>
      <h2>Criadores de sucesso</h2>
      <ProfileLink />
      <ProfileLink />
      <ProfileLink />

      <button>
        <img src={twoUsers} alt="botao ecncontrar usuarios" /> Encontre os que
        você conhece
      </button>
    </BodyCard>
  )
}
export default SuccessfulCreatorsCard
