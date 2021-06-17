import React, {
  InputHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react'
import { BodyCard, ProfileLink } from './styles'
import { Link, useHistory } from 'react-router-dom'
import id from '../../assets/icon/id.svg'
import al from '../../assets/icon/al.svg'
import twoUsers from '../../assets/icon/twoUsers.svg'
import { Context } from '../../context/AuthContext'
import { AxiosError } from 'axios'
import { AreaType } from '../UI/SelectArea'
import { ToolType } from '../UI/SelectTools'
import api from '../../services/api'

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
          src="https://upload.wikimedia.org/wikipedia/pt/thumb/4/4d/Clube_do_Remo.png/120px-Clube_do_Remo.png"
          alt=""
        />
        <aside>
          <h2>{profile[0]?.nome}</h2>
          <p>@{profile[0]?.usuario}</p>
        </aside>
      </ProfileLink>
      <ProfileLink to={`/perfil/${profile[1]?.usuario}`}>
        <img
          src="https://upload.wikimedia.org/wikipedia/pt/thumb/4/4d/Clube_do_Remo.png/120px-Clube_do_Remo.png"
          alt=""
        />
        <aside>
          <h2>{profile[1]?.nome}</h2>
          <p>@{profile[1]?.usuario}</p>
        </aside>
      </ProfileLink>

      <button onClick={() => {
            history.push('/pesquisar/pessoa/nome/')
          }}>
        <img src={twoUsers} alt="botao encontrar usuarios" /> Encontre os que
        você conhece
      </button>
    </BodyCard>
  )
}
export default SuccessfulCreatorsCard
