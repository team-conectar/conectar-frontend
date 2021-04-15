import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react'
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
import getValidationErrors from '../../utils/getValidationErrors'
import * as Yup from 'yup'

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
interface IFormDataBasicInformations {
  email: string
  telefone: string
  nome: string
  username: string
  password: string
  year: string
  month: string
  day: string
  idealizador: string
  colaborador: string
  aliado: string
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
interface IEditForm {
  profile: ProfileType
  updateProfile(): void
}
const FormAreas: React.FC<IEditForm> = ({ profile, updateProfile }) => {
  const formRef = useRef<FormHandles>(null)
  const handleSubmit = useCallback(
    async (formData: { areas: string[] }) => {
      console.log(formData)
      try {
        // Remove all previogeus errors
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          areas: Yup.array()
            .min(1, 'Seleciono pelo menos 1 área')
            .max(5, 'Seleciono no máximo 5'),
        })
        await schema.validate(formData, {
          abortEarly: false,
        })
        // Validation passed
        const data = {
          areas: formData.areas.map(area => {
            return { descricao: area }
          }),
        }
        const res = await api
          .put('/api/v1/pessoas', data, {
            withCredentials: true,
          })
          .then(() => updateProfile())
          .catch((err: AxiosError) => {
            return err?.response?.data.detail
          })
        console.log(res)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }
      }
    },
    [updateProfile],
  )
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <SelectArea
        label="Selecione suas áreas de atuação (máx. 5)"
        name="areas"
        defaultValue={profile?.areas.map(area => {
          return area.descricao
        })}
      />
      <section>
        <Button theme="secondary">Cancelar</Button>
        <Button theme="primary" type="submit">
          Salvar
        </Button>
      </section>
    </Form>
  )
}
const FormTools: React.FC<IEditForm> = ({ profile, updateProfile }) => {
  const formRef = useRef<FormHandles>(null)
  const handleSubmit = useCallback(
    async (formData: { habilidades: string[] }) => {
      console.log(formData)
      try {
        // Remove all previogeus errors
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          habilidades: Yup.array()
            .min(1, 'Seleciono pelo menos 1 item')
            .max(5, 'Seleciono no máximo 5'),
        })
        await schema.validate(formData, {
          abortEarly: false,
        })
        // Validation passed
        const data = {
          habilidades: formData.habilidades.map(habilidade => {
            return { nome: habilidade }
          }),
        }
        console.log(data)

        const res = await api
          .put('/api/v1/pessoas', data, {
            withCredentials: true,
          })
          .then(() => updateProfile())
          .catch((err: AxiosError) => {
            return err?.response?.data.detail
          })
        console.log(res)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }
      }
    },
    [updateProfile],
  )
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <SelectTool
        label="Adicione suas habilidades e ferramentas de domínio"
        name="habilidades"
        defaultValue={profile.habilidades?.map(tool => {
          return tool.nome
        })}
      />

      <section>
        <Button theme="secondary">Cancelar</Button>
        <Button theme="primary" type="submit">
          Salvar
        </Button>
      </section>
    </Form>
  )
}

const EditProfile: React.FC = () => {
  // const [modalContent, setModalContent] = useState<ReactNode>(null);

  const formRef = useRef<FormHandles>(null)
  const history = useHistory()
  const [menuOptionSelected, setMenuOptionSelected] = useState<TypeMenuOptions>(
    'Informações básicas',
  )
  const { user } = useContext(Context)
  const [profile, setProfile] = useState<ProfileType>({} as ProfileType)
  const profile_id = Number(useParams<routeParms>().id)
  const OptionsMenu = [
    'Informações básicas',
    'Educação',
    'Atuação profissional',
    'Pesquisa e extensão',
    'Áreas de atuação',
    'Habilidades e ferramentas',
  ] as Array<TypeMenuOptions>
  const updateProfile = useCallback(() => {
    const res = api
      .get(`/api/v1/pessoas/${profile_id}`)
      .then((response: { data: ProfileType }) => {
        setProfile(response.data)
      })
      .catch((err: AxiosError) => {
        // if (err.code === undefined) history.push('/404')
        return err?.response?.data.detail
      })
    console.log(res)
  }, [profile_id])
  const handleSubmit = useCallback(
    async (formData: IFormDataBasicInformations) => {
      console.log(formData)

      try {
        // Remove all previogeus errors
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          nome: Yup.string()
            .max(80)
            .matches(/(?=.*[ ])/g, 'Informe o nome completo')
            .required('Usuário é obrigatório'),
          usuario: Yup.string()
            .min(4, 'Deve conter no mínimo 4 caracteres')
            .max(20, 'Deve conter no máximo 20 caracteres')
            .required('Usuário é obrigatório'),
        })

        await schema.validate(formData, {
          abortEarly: false,
        })
        // Validation passed
        // const { year, month, day, telefone } = formData

        // const data_nascimento = `${year}-${month}-${day}`

        // const aliado = !!(formData.aliado[0] === 'aliado')
        // const colaborador = !!(formData.colaborador[0] === 'colaborador')
        // const idealizador = !!(formData.idealizador[0] === 'idealizador')

        // const data = {
        //   data_nascimento,
        //   aliado,
        //   colaborador,
        //   idealizador,
        //   telefone,
        // }

        await api
          .put('/api/v1/pessoas', formData, {
            withCredentials: true,
          })
          .then(updateProfile)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // Validation failed
          console.log(err)

          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }
      }
    },
    [updateProfile],
  )
  useEffect(() => {
    updateProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile_id])
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
            <Form ref={formRef} onSubmit={handleSubmit} className="Info-perfil">
              <Input
                label="Nome completo"
                name="nome"
                defaultValue={profile.nome}
              />
              <aside></aside>
              <Input
                label="Nome de usuário"
                name="usuario"
                defaultValue={profile.usuario}
              />
              <section>
                <Button theme="secondary">Cancelar</Button>
                <Button theme="primary" type="submit">
                  Salvar
                </Button>
              </section>
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
              <FormAreas profile={profile} updateProfile={updateProfile} />
            )) ||
            (menuOptionSelected === 'Habilidades e ferramentas' && (
              <FormTools profile={profile} updateProfile={updateProfile} />
            ))}
        </div>
      </main>
    </Page>
  )
}
export default EditProfile
