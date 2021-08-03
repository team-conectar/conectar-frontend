import React, { useEffect, useState } from 'react'
import { BodyCard, ProfileLink } from './styles'
import { useHistory } from 'react-router-dom'
import twoUsers from '../../assets/icon/twoUsers.svg'
import { AxiosError } from 'axios'
import { AreaType } from '../UI/SelectArea'
import { ToolType } from '../UI/SelectTools'
import api from '../../services/api'
import userDefault from '../../assets/icon/user.svg'

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
  const history = useHistory()
  const [profile, setProfile] = useState<ProfileType[]>({} as ProfileType[])
  useEffect(() => {
    const res = api
      .get(`/api/v1/pessoas/destaque/2`)
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

      <ProfileLink to={`/perfil/${profile[0]?.usuario}`}>
        <img
          src={
            profile[0]?.foto_perfil
              ? `https://conectar.s3.sa-east-1.amazonaws.com/uploads/${profile[0]?.foto_perfil}`
              : userDefault
          }
          alt={profile[0]?.nome}
        />
        <aside>
          <h2>{profile[0]?.nome}</h2>
          <p>@{profile[0]?.usuario}</p>
        </aside>
      </ProfileLink>
      <ProfileLink to={`/perfil/${profile[1]?.usuario}`}>
        <img
          src={
            profile[1]?.foto_perfil
              ? `https://conectar.s3.sa-east-1.amazonaws.com/uploads/${profile[1]?.foto_perfil}`
              : userDefault
          }
          alt={profile[1]?.nome}
        />
        <aside>
          <h2>{profile[1]?.nome}</h2>
          <p>@{profile[1]?.usuario}</p>
        </aside>
      </ProfileLink>

      <button
        onClick={() => {
          history.push('/pesquisar/pessoa/nome/')
        }}
      >
        <img src={twoUsers} alt="botao encontrar usuarios" /> Encontre os que
        você conhece
      </button>
    </BodyCard>
  )
}
export default SuccessfulCreatorsCard
