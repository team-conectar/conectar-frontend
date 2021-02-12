import React, {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
  useCallback,
  useEffect,
  OptionHTMLAttributes,
} from 'react'
import Input from '../Input'
import Textarea from '../Textarea'
import Select from '../Select'
import ToggleSwitch from '../ToggleSwitch'
import Button from '../Button'
import { BodyVacancy } from './styles'
import { inputChange } from '../../utils/inputChange'
import { selectChange } from '../../utils/selectChange'
import { textareaChange } from '../../utils/textareaChange'
import { finalYearOptions, yearOptions } from '../../utils/dates'
import { AxiosError } from 'axios'
import api from '../../services/api'
import edit from '../../assets/icon/editar.svg'
import trash from '../../assets/icon/lixeira.svg'
import Modal from '../Modal'
import { AreaType } from '../../components/SelectArea'
import { ToolType } from '../../components/SelectTools'
import { createOptionAreas, createOptionTools } from '../../utils/projects'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import getValidationErrors from '../../utils/getValidationErrors'
import VacancieListItem from '../VacancieListItem'

export interface VacanciesType {
  projeto_id: number
  pessoa_id: number
  papel_id: number
  tipo_acordo_id: number
  descricao: string
  situacao?:
    | 'PENDENTE_IDEALIZADOR'
    | 'PENDENTE_COLABORADOR'
    | 'ACEITE_COLABORADOR'
    | 'FINALIZADO'
  habilidades: Array<ToolType>
  areas: Array<AreaType>
  id: number
}
interface ProjectType {
  nome: string
  descricao: string
  visibilidade: boolean
  objetivo: string
  foto_capa: string
  areas: AreaType[]
  habilidades: ToolType[]
  id: number
}
interface IFormData {
  cargo: string
  perfil: string
  quantidade: number
  descricao: string
  tipoContrato: string
  areas: Array<string>
  habilidade: Array<string>
  remunerado: boolean
}
interface VacancyProps {
  project: ProjectType
}

const Vacancy: React.FC<VacancyProps> = ({ project }) => {
  const [showRegister, setShowRegister] = useState<boolean>(false)
  const [vacancies, setVacancies] = useState<Array<VacanciesType>>([])
  const [editingId, setEditingId] = useState<number>(0)
  const formRef = useRef<FormHandles>(null)
  const optionsContrato: Array<OptionHTMLAttributes<HTMLOptionElement>> = [
    { value: 'trainee', label: 'Trainee' },
    { value: 'terceirizado', label: 'Terceirizado' },
    { value: 'intermitente', label: 'Intermitente' },
    { value: 'aprendiz', label: 'Aprendiz' },
    { value: 'estágio', label: 'Estágio' },
    { value: 'temporário', label: 'Temporário' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'autônomo', label: 'Autônomo' },
    { value: 'meioPeríodo', label: 'Meio Período' },
    { value: 'tempoIntegral', label: ' Tempo Integral' },
  ]

  const optionsAreas: Array<
    OptionHTMLAttributes<HTMLOptionElement>
  > = createOptionAreas(project.areas)
  const optionsTools: Array<
    OptionHTMLAttributes<HTMLOptionElement>
  > = createOptionTools(project.habilidades)
  useEffect(() => {
    api
      .get('/api/v1/experiencias/academica/me', {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail
      })
  }, [editingId, showRegister])
  const handleSubmit = useCallback(async (formData: IFormData) => {
    console.log(formData)
    try {
      // Remove all previogeus errors
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        cargo: Yup.string().required('Cargo é obrigatório'),
        perfil: Yup.string().required('Perfil é obrigatório'),
        quantidade: Yup.number()
          .required('Quantidade é obrigatório')
          .min(1, 'Deve conter no mínimo uma vaga'),
        descricao: Yup.string().required('Descrição é obrigatório'),
        tipoContrato: Yup.string().required('Tipo de contrato é obrigatório'),
        areas: Yup.array().min(1, 'Áreas de contrato é obrigatório'),
        habilidade: Yup.array().min(1, 'Habilidades de contrato é obrigatório'),
      })
      await schema.validate(formData, {
        abortEarly: false,
      })
      // Validation passed
      let papel_id = 0
      let tipo_acordo_id = 0

      const res = [
        await api
          .post(
            '/api/v1/tipo_acordo',
            { descricao: formData.tipoContrato },
            { withCredentials: true },
          )
          .then(response => {
            tipo_acordo_id = response.data.id
          })
          .catch((err: AxiosError) => {
            return err?.response?.data.detail
          }),
        await api
          .post(
            '/api/v1/papel',
            { descricao: formData.cargo },
            { withCredentials: true },
          )
          .then(response => {
            papel_id = response.data.id
          })
          .catch((err: AxiosError) => {
            return err?.response?.data.detail
          }),
      ]
      const areas = [{} as AreaType]
      // formData.areas.map(area => {
      //   areas.push({ descricao: area })
      // })

      const vacancy = {
        projeto_id: project.id,
        papel_id,
        tipo_acordo_id,
      } as VacanciesType
      await api
        .post('/api/v1/pessoa_projeto', vacancy, {
          withCredentials: true,
        })
        .then(() => {})
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
  }, [])
  useEffect(() => {
    api.get(`/api/v1/pessoa_projeto/projeto/${project.id}`).then(response => {
      setVacancies(response.data)
    })
  }, [project.id])
  return (
    <BodyVacancy>
      <h1>Vagas</h1>
      {!showRegister ? (
        <div className="vagas">
          {vacancies.map(vacancy => (
            <VacancieListItem key={vacancy.id} vacancy={vacancy} />
          ))}

          <button onClick={() => setShowRegister(true)}>
            <span>+ </span>
            Adicionar
          </button>
        </div>
      ) : (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            label="Cargo"
            name="cargo"
            // defaultValue={academicFormData?.instituicao}
          />
          <Input
            label="Perfil"
            name="perfil"
            // defaultValue={academicFormData?.instituicao}
          />
          <Input
            label="Quantidade"
            name="quantidade"
            type="number"
            // defaultValue={academicFormData?.instituicao}
          />

          <Select
            label="Habilidade ou Ferramentas"
            name="habilidade"
            options={optionsTools}
            multi
          />
          <div className="bloco-area">
            <Select label="Áreas" name="areas" options={optionsAreas} multi />
          </div>

          <Textarea name="descricao" label="Descrição" />
          <section className="bloco-contrato">
            <Select
              label="Tipo de contrato"
              options={optionsContrato}
              name="tipoContrato"
            />
            <ToggleSwitch
              label="Remunerado"
              name="remunerado"
              id="remunerado"
            />
          </section>
          <section className="area-botoes">
            <Button type="submit" theme="primary">
              Salvar
            </Button>
            <Button theme="secondary">Excluir</Button>
            <Button
              onClick={() => {
                setShowRegister(false)
                setEditingId(0)
              }}
              theme="secondary"
            >
              Cancelar
            </Button>
          </section>
        </Form>
      )}
    </BodyVacancy>
  )
}

export default Vacancy
