import React, {
  InputHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react'
import { BodyCard, DropdownList } from './styles'
import { Link } from 'react-router-dom'
import id from '../../assets/icon/id.svg'
import al from '../../assets/icon/al.svg'
import co from '../../assets/icon/co.svg'
import { Context } from '../../context/AuthContext'
import { AxiosError } from 'axios'
import { AreaType } from '../SelectArea'
import { ToolType } from '../SelectTools'
import api from '../../services/api'
import Button from '../Button'
import Dropdown from '../Dropdown'
import { GiHamburgerMenu } from 'react-icons/gi'

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
const VacancieCard: React.FC = () => {
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
    <BodyCard isAvailable status="refused">
      <label>
        <DropdownList DropButton={<GiHamburgerMenu />}>
          <li>Clonar vaga</li>
          <li>Editar vaga</li>
          <li>Exluir vaga</li>
        </DropdownList>
      </label>
      <img
        src="https://upload.wikimedia.org/wikipedia/pt/thumb/4/4d/Clube_do_Remo.png/120px-Clube_do_Remo.png"
        alt=""
      />
      <h2>Maynara</h2>
      <h3>
        Colaborador
        <br />
        UX Designer
      </h3>

      <Button theme="green">Ver currículo</Button>
      <DropdownList DropButton={<Button theme="greenG">Nova busca</Button>}>
        <li>Perfis similares</li>
        <li>Perfis interessados</li>
      </DropdownList>
      <aside>
        <h4>Convite enviado</h4>
        <span>Recusado</span>
      </aside>
      <legend>Vaga disponível</legend>
    </BodyCard>
  )
}
export default VacancieCard
