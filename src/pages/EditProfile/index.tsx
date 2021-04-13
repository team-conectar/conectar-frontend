import React, { useState, useEffect, useContext, useRef } from 'react'
import { Page, ButtonList } from './styles'
import educação from '../../assets/icon/educação.svg'
// import clone from '../../assets/icon/clone.svg'
import projeto from '../../assets/icon/projeto.svg'
import no_couver from '../../assets/image/no_couver.svg'
import view from '../../assets/icon/view.svg'
import like from '../../assets/icon/like.svg'
import capa_id from '../../assets/image/capa_id.svg'
import capa_al from '../../assets/image/capa_al.svg'
import capa_co from '../../assets/image/capa_co.svg'
import id from '../../assets/icon/id.svg'
import al from '../../assets/icon/al.svg'
import co from '../../assets/icon/co.svg'
import { Redirect, useHistory, useParams } from 'react-router'
import Button from '../../components/UI/Button'
import api from '../../services/api'
import { AxiosError } from 'axios'
import SelectArea, { AreaType } from '../../components/UI/SelectArea'
import SelectTool, { ToolType } from '../../components/UI/SelectTools'
import Modal from '../../components/UI/Modal'
import { Context } from '../../context/AuthContext'
import NavBar from '../../components/UI/NavBar'
import ProjectCard, { IProject } from '../../components/ProjectCard'
import AcademicExperiences, {
  AcademicType,
} from '../ProfileFeatures/experiences/AcademicExperiences'
import ProfessionalExperiences, {
  ProfessionalType,
} from '../ProfileFeatures/experiences/ProfessionalExperiences'
import ProjectExperiences, {
  IExperienceProject,
} from '../ProfileFeatures/experiences/ProjectExperiences'
import { toMonth } from '../../utils/dates'
import Skeleton from 'react-loading-skeleton'
import { Type } from 'typescript'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import Input from '../../components/UI/Input'

interface routeParms {
  id: string
}
interface ProjectType {
  nome: string
  descricao: string
  visibilidade: true
  objetivo: string
  foto_capa: string
  areas: AreaType[]
  habilidades: ToolType[]
  id: number
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
  experiencia_profissional: ProfessionalType[]
  experiencia_projetos: IExperienceProject[]
  experiencia_academica: AcademicType[]
}
/**
 * @constructor
 * @content is the iten of the modal
 */
type TypeMenuOptions =
  | 'Informações básicas'
  | 'Educação'
  | 'Atuação profissional'
  | 'Pesquisa e extensão'
  | 'Áreas de atuação'
  | 'Habilidades e ferramentas'

const EditProfile: React.FC = () => {
  // const [modalContent, setModalContent] = useState<ReactNode>(null);
  const formRef = useRef<FormHandles>(null)
  const [loadingPage, setLoadingPage] = useState(true)
  const history = useHistory()
  const [menuOptionSelected, setMenuOptionSelected] = useState<TypeMenuOptions>(
    'Informações básicas',
  )
  const { user } = useContext(Context)
  const [showFavoritesList, setShowFavoritesList] = useState<boolean>(false)
  const [profile, setProfile] = useState<ProfileType>({} as ProfileType)
  const [projects, setProjects] = useState<IProject[]>([] as IProject[])
  const profile_id = Number(useParams<routeParms>().id)
  useEffect(() => {
    api
      .get(`/api/v1/pessoas/${profile_id}`)
      .then((response: { data: ProfileType }) => {
        console.log(response.data)
        setProfile(response.data)
        setProfile({
          ...response.data,
          experiencia_profissional: response.data.experiencia_profissional.filter(
            (experience: ProfessionalType) => {
              return experience.data_fim === undefined
            },
          ),
          experiencia_projetos: response.data.experiencia_projetos.filter(
            (experience: IExperienceProject) => {
              return experience.situacao === 'Em andamento'
            },
          ),
          experiencia_academica: response.data.experiencia_academica.filter(
            (experience: AcademicType) => {
              return experience.situacao === 'Em andamento'
            },
          ),
        })
      })
      .catch((err: AxiosError) => {
        // if (err.code === undefined) history.push('/404')
        return err?.response?.data.detail
      })
    api
      .get(`/api/v1/projetos?pessoa_id=${profile_id}&visibilidade=true`)
      .then(response => {
        setProjects(response.data)
        setLoadingPage(false)
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail
      })
  }, [history, profile_id])
  console.log(profile.experiencia_academica)
  const OptionsMenu = [
    'Informações básicas',
    'Educação',
    'Atuação profissional',
    'Pesquisa e extensão',
    'Áreas de atuação',
    'Habilidades e ferramentas',
  ] as Array<TypeMenuOptions>
  return user.id !== profile_id ? (
    <Redirect to={`/editar-perfil/${user.id}`} />
  ) : (
    <Page>
      <NavBar />
      <main>
        <header>
          <Button
            theme="primary"
            onClick={() => history.push(`/perfil/${user.id}`)}
          >
            voltar ao perfil
          </Button>
        </header>
        <aside>
          {OptionsMenu.map((description, index) => (
            <ButtonList
              isSelected={description === menuOptionSelected}
              key={index}
              onClick={() => setMenuOptionSelected(description)}
            >
              {description}
            </ButtonList>
          ))}
        </aside>
        <div>
          {(menuOptionSelected === 'Informações básicas' && (
            <Form
              ref={formRef}
              onSubmit={() => {
                console.log('o')
              }}
              className="Info-perfil"
            >
              <Input label="Nome completo" name="nome" defaultValue="rte" />
              <aside></aside>
              <Input label="Nome de usuário" name="ususario" />
            </Form>
          )) ||
            (menuOptionSelected === 'Educação' && <AcademicExperiences />) ||
            (menuOptionSelected === 'Atuação profissional' && (
              <ProfessionalExperiences />
            )) ||
            (menuOptionSelected === 'Pesquisa e extensão' && (
              <ProjectExperiences />
            )) ||
            (menuOptionSelected === 'Áreas de atuação' && (
              <Form
                ref={formRef}
                onSubmit={() => {
                  console.log('o')
                }}
              >
                <SelectArea name="areas" />
              </Form>
            )) ||
            (menuOptionSelected === 'Habilidades e ferramentas' && (
              <Form
                ref={formRef}
                onSubmit={() => {
                  console.log('o')
                }}
              >
                <SelectTool name="habilidades" />
              </Form>
            ))}
        </div>
      </main>
    </Page>
  )
}
export default EditProfile
