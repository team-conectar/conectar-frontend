import React, {
  HTMLAttributes,
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
import { AreaType } from '../UI/SelectArea'
import { ToolType } from '../UI/SelectTools'
import Dropdown from '../UI/Dropdown'
import api from '../../services/api'
import Button from '../UI/Button'
import { GiHamburgerMenu } from 'react-icons/gi'
import { TypeSituationVacancy } from '../Vacancy'
export interface IVacancyCard {
  projeto_id: number
  pessoa_id: number
  papel_id: number
  tipo_acordo_id: number
  descricao: string
  situacao?: TypeSituationVacancy
  id: number
}
interface Props extends HTMLAttributes<HTMLLIElement> {
  vacancy: IVacancyCard
}
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
export type TypeStatusVacancy = 'Aceito' | 'Pendente' | 'Recusado'
interface ISituationVacancy {
  [key: string]: {
    status?: TypeStatusVacancy
    invite: string
    isAvaliable: boolean
  }
}
const VacancieCard: React.FC<Props> = ({ vacancy, ...rest }) => {
  const [profile, setProfile] = useState<ProfileType>({} as ProfileType)
  const [agreement, setAgreement] = useState<string>('')
  const [office, setOffice] = useState<string>('')
  const situation: ISituationVacancy = {
    FINALIZADO: {
      invite: 'Acordo Finalizado',
      isAvaliable: false,
    },
    PENDENTE_IDEALIZADOR: {
      status: 'Pendente',
      invite: 'Sem convite',
      isAvaliable: true,
    },
    PENDENTE_COLABORADOR: {
      status: 'Pendente',
      invite: 'Convite enviado',
      isAvaliable: true,
    },
    ACEITE_COLABORADOR: {
      status: 'Aceito',
      invite: 'Convite enviado',
      isAvaliable: true,
    },
    NEGADO: {
      status: 'Recusado',
      invite: 'Convite enviado',
      isAvaliable: true,
    },
  }
  useEffect(() => {
    const res = [
      api
        .get(`/api/v1/pessoas/${vacancy.pessoa_id}`)
        .then(response => {
          setProfile(response.data)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        }),
      api
        .get(`/api/v1/tipoAcordo?tipo_acordo_id=${vacancy.tipo_acordo_id}`)
        .then(response => {
          setAgreement(response.data.descricao)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        }),
      api
        .get(`/api/v1/papel/${vacancy.papel_id}`)
        .then(response => {
          setOffice(response.data.descricao)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        }),
    ]
    console.log(res)
  }, [vacancy.papel_id, vacancy.pessoa_id, vacancy.tipo_acordo_id])
  return (
    <BodyCard
      isAvailable={situation[`${vacancy.situacao}`].isAvaliable}
      status={situation[`${vacancy.situacao}`].status}
      {...rest}
    >
      <label>
        <DropdownList IconButton={<GiHamburgerMenu />}>
          <li>Clonar vaga</li>
          <li>Excluir vaga</li>
        </DropdownList>
      </label>
      <img
        src="https://upload.wikimedia.org/wikipedia/pt/thumb/4/4d/Clube_do_Remo.png/120px-Clube_do_Remo.png"
        alt=""
      />
      <h2>{profile.nome?.split(` `)[0]}</h2>
      <h3>
        {office}
        <br />
        {agreement}
      </h3>

      <Button theme="primary">Ver currículo</Button>
      <DropdownList IconButton={<Button theme="secondary">Nova busca</Button>}>
        <li>Perfis similares</li>
        <li>Perfis interessados</li>
        <li>Perfis interessados</li>
        <li>Perfis interessados</li>
      </DropdownList>
      <aside>
        <h4>{situation[`${vacancy.situacao}`].invite}</h4>
        <span>{situation[`${vacancy.situacao}`].status}</span>
      </aside>
      <legend>
        Vaga{' '}
        {situation[`${vacancy.situacao}`].isAvaliable
          ? 'disponível'
          : 'preenchida'}
      </legend>
    </BodyCard>
  )
}
export default VacancieCard
