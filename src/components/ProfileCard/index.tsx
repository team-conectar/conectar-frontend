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
import co from '../../assets/icon/co.svg'
import { Context } from '../../context/AuthContext'
import { AxiosError } from 'axios'
import { AreaType } from '../../components/SelectArea'
import { ToolType } from '../../components/SelectTools'
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
const ProfileCard: React.FC = () => {
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
      <img
        src="https://upload.wikimedia.org/wikipedia/pt/thumb/4/4d/Clube_do_Remo.png/120px-Clube_do_Remo.png"
        alt=""
      />
      <p>
        <h2>{profile.nome}</h2>@{profile.usuario}
      </p>

      <aside>
        {profile.idealizador && <img src={id} alt="" />}
        {profile.aliado && <img src={al} alt="" />}
        {profile.colaborador && <img src={co} alt="" />}
      </aside>
      <button>Ver Perfil</button>
    </BodyCard>
  )
}
export default ProfileCard
