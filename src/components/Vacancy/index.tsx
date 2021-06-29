import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  OptionHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  Ref,
  ForwardRefRenderFunction,
} from 'react'
import Input from '../UI/Input'
import Textarea from '../UI/Textarea'
import Select from '../UI/Select'
import ToggleSwitch from '../UI/ToggleSwitch'
import Button from '../UI/Button'
import { BodyVacancy } from './styles'
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
import { showToast } from '../Toast/Toast'
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
  situacao: TypeSituationVacancy
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
  dontRender?: boolean
}
export interface handleVacancy {
  setEditVacancy(vacancies: VacanciesType): void
  setShowRegister(register: boolean): void
}
const Vacancy: ForwardRefRenderFunction<handleVacancy, VacancyProps> = (
  { project, dontRender },
  ref,
) => {
  const [showRegister, setShowRegister] = useState<boolean>(false)
  const [vacancies, setVacancies] = useState<Array<VacanciesType>>([])
  const [editVacancy, setEditVacancy] = useState<VacanciesType>()

  const [optionsAcordo, setOptionsAcordo] = useState<
    Array<OptionHTMLAttributes<HTMLOptionElement>>
  >([])
  const [optionsPapel, setOptionsPapel] = useState<
    Array<OptionHTMLAttributes<HTMLOptionElement>>
  >([])
  const formRef = useRef<FormHandles>(null)
  useImperativeHandle(ref, () => ({ setEditVacancy, setShowRegister }), [])

  useEffect(() => {
    async function get_async() {
      await api
        .get('/api/v1/papel')
        .then((response: AxiosResponse<ITipoAcordo[]>) => {
          setOptionsPapel(
            response.data.map(item => {
              return { value: item.id, label: item.descricao }
            }),
          )
        })
        .catch((err: AxiosError) => {
          // Returns error message from backend
          return err?.response?.data.detail
        })
      await api
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
    }
    get_async()
  }, [editVacancy])
  const get_pessoa_projeto = useCallback(() => {
    api
      .get(`/api/v1/pessoa_projeto/projeto/${project.id}`)
      .then((response: AxiosResponse<VacanciesType[]>) => {
        setVacancies(response.data)
      })
  }, [project.id])
  const handleDeleteVacancy = useCallback(
    (vacancy: VacanciesType) => {
      const res = api
        .delete(`/api/v1/pessoa_projeto/${vacancy.id}`)
        .then(() => {
          get_pessoa_projeto()
          showToast('success', 'Vaga removida com Sucesso!')
        })
        .catch((error: AxiosError) => {
          return error?.response?.data.detail
        })
      console.log(res)
    },
    [get_pessoa_projeto],
  )
  async function put_pessoa_projeto(formData: IFormData, id: number) {
    const data = {
      ...formData,
      titulo: formData.cargo,
      papel_id: formData.perfil,
      tipo_acordo_id: formData.tipoContrato,
      remunerado: !!(formData.remunerado[0] === 'remunerado'),
    }
    await api
      .put(`/api/v1/pessoa_projeto/${id}`, data, {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        showToast(
          'error',
          err?.response?.data.detail ||
            'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        )
        return err?.response?.data.detail
      })
  }
  async function post_pessoa_projeto(formData: IFormData) {
    const data = {
      ...formData,
      projeto_id: project.id,
      titulo: formData.cargo,
      papel_id: formData.perfil,
      tipo_acordo_id: formData.tipoContrato,
      remunerado: !!(formData.remunerado[0] === 'remunerado'),
      situacao: 'PENDENTE_IDEALIZADOR',
    }
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
              showToast(
                'error',
                err?.response?.data.detail ||
                  'Ocorreu um erro inesperado. Tente novamente mais tarde.',
              )
              return err?.response?.data.detail
            })
          console.log(res)
        })
        .catch((err: AxiosError) => {
          showToast('error', err?.response?.data.detail)
          return err?.response?.data.detail
        })
    }
  }
  const handleSubmit = useCallback(
    async (formData: IFormData) => {
      console.log(formData)
      try {
        // Remove all previogeus errors
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          cargo: Yup.string().required('Cargo é obrigatório'),
          perfil: Yup.string().required('Perfil é obrigatório'),
          quantidade: !editVacancy?.id
            ? Yup.number()
                .required('Quantidade é obrigatório')
                .min(1, 'Deve conter no mínimo uma vaga')
            : Yup.number(),
          descricao: Yup.string().required('Descrição é obrigatório'),
          tipoContrato: Yup.string().required('Tipo de contrato é obrigatório'),
          areas: Yup.array()
            .min(1, 'Seleciono pelo menos 1 item')
            .max(15, 'Seleciono no máximo 15'),
          habilidades: Yup.array()
            .min(1, 'Seleciono pelo menos 1 item')
            .max(15, 'Seleciono no máximo 15'),
        })
        await schema.validate(formData, {
          abortEarly: false,
        })
        // Validation passed
        if (editVacancy?.id) {
          put_pessoa_projeto(formData, editVacancy?.id)
        } else {
          post_pessoa_projeto(formData)
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
    [editVacancy, handleDeleteVacancy, project.id],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(get_pessoa_projeto, [project.id, showRegister])
  return !dontRender ? (
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
          {vacancies.map(vacancy => (
            <VacancieListItem
              key={vacancy.id}
              vacancy={{ ...vacancy, quantidade: 0 }}
              onDelete={() => {
                handleDeleteVacancy(vacancy)
              }}
              onEdit={() => {
                setShowRegister(true)
                setEditVacancy(vacancy)
              }}
            />
          ))}
        </ContainerScroll>
      ) : (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            label="Cargo"
            name="cargo"
            defaultValue={editVacancy?.titulo}
          />
          <div className="quantidade-e-perfil">
            <Select
              label="Perfil"
              options={optionsPapel}
              name="perfil"
              defaultValue={optionsPapel?.find(
                option => Number(option.value) === editVacancy?.papel_id,
              )}
            />
            {!editVacancy?.id && (
              <Input label="Quantidade" name="quantidade" type="number" />
            )}
          </div>
          <Select
            label="Habilidade ou Ferramentas"
            name="habilidades"
            multi
            options={project.habilidades.map(tool => {
              return { value: tool.nome, label: tool.nome }
            })}
            defaultValue={editVacancy?.habilidades?.map(tool => {
              return { value: tool.nome, label: tool.nome }
            })}
          />
          <div className="bloco-area">
            <Select
              label="Áreas"
              name="areas"
              multi
              options={project.areas.map(area => {
                return { value: area.descricao, label: area.descricao }
              })}
              defaultValue={editVacancy?.areas?.map(area => {
                return { value: area.descricao, label: area.descricao }
              })}
            />
          </div>

          <Textarea
            name="descricao"
            label="Descrição"
            defaultValue={editVacancy?.descricao}
          />
          <section className="bloco-contrato">
            <Select
              label="Tipo de contrato"
              options={optionsAcordo}
              name="tipoContrato"
              defaultValue={optionsAcordo.find(
                option =>
                  Number(option.value) === Number(editVacancy?.tipo_acordo_id),
              )}
            />
            <ToggleSwitch
              name="remunerado"
              defaultChecked={editVacancy?.remunerado}
              options={[
                {
                  label: 'Remunerado',
                  id: 'remunerado',
                  value: 'remunerado',
                },
              ]}
            />
          </section>
          <section className="area-botoes">
            <Button type="submit" theme="primary">
              Salvar
            </Button>
            <Button
              theme="secondary"
              onClick={() => {
                editVacancy && handleDeleteVacancy(editVacancy)
                setShowRegister(false)
              }}
            >
              Excluir
            </Button>
            <Button
              theme="secondary"
              onClick={() => {
                setShowRegister(false)
                setEditVacancy({} as VacanciesType)
              }}
            >
              Cancelar
            </Button>
          </section>
        </Form>
      )}
    </BodyVacancy>
  ) : (
    <></>
  )
}

export default forwardRef(Vacancy)
