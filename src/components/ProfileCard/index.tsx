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
import { useLoggedUser } from '../../context/LoggedUserContext'
import { AxiosError } from 'axios'
import { AreaType } from '../../components/SelectArea'
import { ToolType } from '../../components/SelectTools'
import api from '../../services/api'
import Skeleton from 'react-loading-skeleton'

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
  const profile = useLoggedUser()

  return (
    <BodyCard>
      {/* <img
        src="https://upload.wikimedia.org/wikipedia/pt/thumb/4/4d/Clube_do_Remo.png/120px-Clube_do_Remo.png"
        alt=""
      /> */}
      <Skeleton circle height="100px" width="100px" />
      <p>
        <h2>{profile.nome || <Skeleton width="150px" />}</h2>
        {(profile.usuario && '@' + profile.usuario) || (
          <Skeleton width="100px" />
        )}
      </p>

      <aside>
        {profile.idealizador && <img src={id} alt="" />}
        {profile.aliado && <img src={al} alt="" />}
        {profile.colaborador && <img src={co} alt="" />}
      </aside>
      <Link to={`perfil/${profile.id}`}>Ver Perfil</Link>
    </BodyCard>
  )
}
export default ProfileCard
