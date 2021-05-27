import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  OptionHTMLAttributes,
} from 'react'
import Input from '../UI/Input'
import Textarea from '../UI/Textarea'
import Select from '../UI/Select'
import ToggleSwitch from '../UI/ToggleSwitch'
import Button from '../UI/Button'
import { BodyVacancy } from './styles'
import { finalYearOptions, yearOptions } from '../../utils/dates'
import { AxiosError, AxiosResponse } from 'axios'
import api from '../../services/api'
import { AreaType } from '../UI/SelectArea'
import { ToolType } from '../UI/SelectTools'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import getValidationErrors from '../../utils/getValidationErrors'
import VacancieListItem from '../VacancieListItem'
import { ProjectType } from '../../pages/CreateProject'
import ContainerScroll from '../UI/ContainerScroll'
export type TypeSituationVacancy =
  | 'PENDENTE_IDEALIZADOR'
  | 'PENDENTE_COLABORADOR'
  | 'ACEITO'
  | 'RECUSADO'
  | 'FINALIZADO'
export interface VacanciesType {
  projeto_id: number
  remunerado: boolean
  titulo: string
  pessoa_id: number
  papel_id: number
  tipo_acordo_id: number
  descricao: string
  situacao?: TypeSituationVacancy
  habilidades: Array<ToolType>
  areas: Array<AreaType>
  id: number
  quantidade?: number
}
interface ITipoAcordo {
  id: number
  descricao: string
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
  const [groupedVacancies, setGroupedVacancies] = useState<
    Array<VacanciesType[]>
  >([])
  const [optionsAcordo, setOptionsAcordo] = useState<
    Array<OptionHTMLAttributes<HTMLOptionElement>>
  >([])
  const [optionsPeapel, setOptionsPeapel] = useState<
    Array<OptionHTMLAttributes<HTMLOptionElement>>
  >([])
  const [editingId, setEditingId] = useState<number>(0)
  const formRef = useRef<FormHandles>(null)
  useEffect(() => {
    api
      .get('/api/v1/papel')
      .then((response: AxiosResponse<ITipoAcordo[]>) => {
        setOptionsPeapel(
          response.data.map(item => {
            return { value: item.id, label: item.descricao }
          }),
        )
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail
      })
    api
      .get('/api/v1/tipoAcordo/all')
      .then((response: AxiosResponse<ITipoAcordo[]>) => {
        setOptionsAcordo(
          response.data.map(item => {
            return { value: item.id, label: item.descricao }
          }),
        )
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail
      })
  }, [])

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
          // areas: Yup.array().min(1, 'Áreas de contrato é obrigatório'),
          // habilidades: Yup.array().min(
          //   1,
          //   'Habilidades de contrato é obrigatório',
          // ),
        })
        await schema.validate(formData, {
          abortEarly: false,
        })
        // Validation passed

        const data = {
          ...formData,
          projeto_id: project.id,
          titulo: formData.cargo,
          papel_id: formData.perfil,
          tipo_acordo_id: formData.tipoContrato,
          remunerado: !!(formData.remunerado[0] === 'remunerado'),
          situacao: 'PENDENTE_IDEALIZADOR',
        }
        console.log(data)
        for (let index = 1; index <= formData.quantidade; index++) {
          await api
            .post('/api/v1/pessoa_projeto', data, {
              withCredentials: true,
            })
            .then(async response => {
              const res = await api
                .put(
                  `/api/v1/pessoa_projeto/${response.data.id}`,
                  {
                    areas: formData.areas.map(area => {
                      return { descricao: area }
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
              console.log(res)
            })
            .catch((err: AxiosError) => {
              return err?.response?.data.detail
            })
        }
        setShowRegister(false)
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
    api
      .get(`/api/v1/pessoa_projeto/projeto/${project.id}`)
      .then((response: AxiosResponse<VacanciesType[]>) => {
        const GroupResponse = response.data.map(vacancy => {
          return response.data.filter(data => {
            return (
              JSON.stringify(data.areas) === JSON.stringify(vacancy.areas) &&
              JSON.stringify(data.habilidades) ===
                JSON.stringify(vacancy.habilidades) &&
              data.remunerado === vacancy.remunerado &&
              data.tipo_acordo_id === vacancy.tipo_acordo_id &&
              data.papel_id === vacancy.papel_id &&
              data.titulo === vacancy.titulo
            )
          })
        })
        setGroupedVacancies(
          GroupResponse.filter((vacancies, index) => {
            return (
              JSON.stringify(vacancies) !==
              JSON.stringify(GroupResponse[index + 1])
            )
          }),
        )
        setVacancies(response.data)
      })
  }, [project.id, showRegister])
  return (
    <BodyVacancy className={showRegister ? 'registro' : ''}>
      <h1>
        Vagas
        {!showRegister && (
          <button onClick={() => setShowRegister(true)}>
            <span>+ </span>
            Adicionar
          </button>
        )}
      </h1>
      {!showRegister ? (
        <ContainerScroll autoHeight autoHeightMax="50vh">
          {groupedVacancies.map(vacancies => (
            <VacancieListItem
              key={vacancies[0].id}
              vacancy={{ ...vacancies[0], quantidade: vacancies.length }}
              onDelete={() => {
                vacancies.forEach(vacancy => {
                  api
                    .delete(`/api/v1/pessoa_projeto/${vacancy.id}`)
                    .finally(() => console.log('sdf'))
                })
              }}
            />
          ))}
        </ContainerScroll>
      ) : (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            label="Cargo"
            name="cargo"
            // defaultValue={academicFormData?.instituicao}
          />
          <Select label="Perfil" options={optionsPeapel} name="perfil" />
          <Input
            label="Quantidade"
            name="quantidade"
            type="number"
            // defaultValue={academicFormData?.instituicao}
          />

          <Select
            label="Habilidade ou Ferramentas"
            name="habilidades"
            options={project.habilidades.map(tool => {
              return { value: tool.nome, label: tool.nome }
            })}
            multi
          />
          <div className="bloco-area">
            <Select
              label="Áreas"
              name="areas"
              options={project.areas.map(area => {
                return { value: area.descricao, label: area.descricao }
              })}
              multi
            />
          </div>

          <Textarea name="descricao" label="Descrição" />
          <section className="bloco-contrato">
            <Select
              label="Tipo de contrato"
              options={optionsAcordo}
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
