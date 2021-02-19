import React, {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
  useCallback,
  useEffect,
  OptionHTMLAttributes,
  InputHTMLAttributes,
} from 'react'
import Input from '../Input'
import Textarea from '../Textarea'
import Select from '../Select'
import ToggleSwitch from '../ToggleSwitch'
import Button from '../Button'
import { BodyVacancy } from './styles'
import { finalYearOptions, yearOptions } from '../../utils/dates'
import { AxiosError } from 'axios'
import api from '../../services/api'
import Modal from '../Modal'
import { AreaType } from '../../components/SelectArea'
import { ToolType } from '../../components/SelectTools'
import { createOptionAreas, createOptionTools } from '../../utils/projects'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import getValidationErrors from '../../utils/getValidationErrors'
import VacancieListItem from '../VacancieListItem'
import { ProjectType } from '../../pages/CreateProject'

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

interface IFormData {
  cargo: string
  perfil: string
  quantidade: number
  descricao: string
  tipoContrato: string
  areas: Array<string>
  habilidades: Array<string>
  remunerado: string
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
    { value: '1', label: 'Trainee' },
    { value: '2', label: 'Terceirizado' },
    { value: '3', label: 'Intermitente' },
    { value: '4', label: 'Aprendiz' },
    { value: '5', label: 'Estágio' },
    { value: '6', label: 'Temporário' },
    { value: '7', label: 'Freelance' },
    { value: '8', label: 'Autônomo' },
    { value: '9', label: 'Meio Período' },
    { value: '10', label: ' Tempo Integral' },
  ]
  const optionsPerfil: Array<OptionHTMLAttributes<HTMLOptionElement>> = [
    { value: '1', label: 'Aliado' },
    { value: '2', label: 'Colaborador' },
    { value: '3', label: 'Idealizador' },
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
  const handleSubmit = useCallback(
    async (formData: IFormData) => {
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
          habilidades: Yup.array().min(
            1,
            'Habilidades de contrato é obrigatório',
          ),
        })
        await schema.validate(formData, {
          abortEarly: false,
        })
        // Validation passed

        const areas = [{} as AreaType]
        // formData.areas.map(area => {
        //   areas.push({ descricao: area })
        // })

        const data = {
          ...formData,
          projeto_id: project.id,
          titulo: formData.cargo,
          papel_id: formData.perfil,
          tipo_acordo_id: formData.tipoContrato,
          remunerado: !!(formData.remunerado === 'remunerado'),
          situacao: 'Não enviado',
        }
        const res = await api
          .post('/api/v1/pessoa_projeto', data, {
            withCredentials: true,
          })
          .then(async response => {
            await api
              .put(
                `/api/v1/pessoa_projeto/${response.data.id}`,
                {
                  areas: formData.areas.map(area => {
                    return { destricao: area }
                  }),
                  habilidades: formData.habilidades.map(habilidade => {
                    return { nome: habilidade }
                  }),
                },
                {
                  withCredentials: true,
                },
              )
              .catch((err: AxiosError) => {
                return err?.response?.data.detail
              })
          })
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
    [project.id],
  )
  useEffect(() => {
    api.get(`/api/v1/pessoa_projeto/projeto/${project.id}`).then(response => {
      setVacancies(response.data)
    })
  }, [project.id])
  return (
    <BodyVacancy className={showRegister ? 'registro' : ''}>
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
          <Select label="Perfil" options={optionsPerfil} name="perfil" />
          <Input
            label="Quantidade"
            name="quantidade"
            type="number"
            // defaultValue={academicFormData?.instituicao}
          />

          <Select
            label="Habilidade ou Ferramentas"
            name="habilidades"
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
              options={[
                { label: 'Remunerado', id: 'remunerado', value: 'remunerado' },
              ]}
              name="remunerado"
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
