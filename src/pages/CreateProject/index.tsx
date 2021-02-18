import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from 'react'
import { BodyCreateProject } from './styles'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Button from '../../components/Button'
import ToggleSwitch from '../../components/ToggleSwitch'
import { useHistory } from 'react-router'
import SelectArea, { AreaType } from '../../components/SelectArea'
import SelectTool, { ToolType } from '../../components/SelectTools'
import api from '../../services/api'
import Modal from '../../components/Modal'
import Login from '../../components/Login'
import Dropzone from '../../components/Dropzone'
import { Context } from '../../context/AuthContext'
import { useLoggedUser } from '../../context/LoggedUserContext'
import Logged from '../../components/Logged'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import getValidationErrors from '../../utils/getValidationErrors'
import Vacancy from '../../components/Vacancy'
import { AxiosError } from 'axios'

interface ProjectType {
  nome: string
  descricao: string
  visibilidade: Array<string>
  objetivo: string
  foto_capa: string
  areas: AreaType[]
  habilidades: ToolType[]
  id: number
}

const CreateProject: React.FC = () => {
  const { isAuthenticated } = useContext(Context)
  const id_pessoa = useLoggedUser().id
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()
  const [shownStep, setShownStep] = useState<1 | 2 | 3>(1)
  const [showModal, setShowModal] = useState<boolean>(!isAuthenticated)
  const [idProject, setIdProject] = useState(0)
  const [project, setProject] = useState<ProjectType>({} as ProjectType)
  const [selectedFile, setSelectedFile] = useState<File>()
  useEffect(() => {
    if (idProject !== 0) {
      api.get(`/api/v1/projeto/${idProject}`).then(response => {
        setProject(response.data)
      })
    }
  }, [idProject])
  const handleSubmit = useCallback(
    async (formData: ProjectType) => {
      console.log(formData)
      try {
        // Remove all previogeus errors
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome é obrigatório'),

          areas: Yup.array()
            .min(1, 'Seleciono pelo menos 1 item')
            .max(5, 'Seleciono no máximo 5'),
        })
        await schema.validate(formData, {
          abortEarly: false,
        })
        // Validation passed

        const data = new FormData()

        data.append('nome', formData.nome)
        if (formData.visibilidade.length > 0) {
        }
        data.append(
          'visibilidade',
          JSON.stringify(formData.visibilidade[0] === 'visivel'),
        )
        selectedFile &&
          data.append('foto_capa', selectedFile, `${formData.nome}pic.jpg`)
        data.append('descricao', 'Não informado')
        data.append('objetivo', 'Não informado')
        console.log(JSON.stringify(formData.visibilidade[0] === 'visivel'))

        const { id } = await (
          await api.post('/api/v1/projeto', data, {
            withCredentials: true,
          })
        ).data
        setIdProject(id)
        setShownStep(2)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }
      }
    },
    [selectedFile],
  )

  const handleSecondSubmit = useCallback(
    async (formData: ProjectType) => {
      console.log(formData)
      try {
        // Remove all previogeus errors
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          descricao: Yup.string().required('Descrição é obrigatório'),
          objetivo: Yup.string().required('Objetivo é obrigatório'),
          habilidades: Yup.array()
            .min(1, 'Seleciono pelo menos 1 área')
            .max(5, 'Seleciono no máximo 5'),
        })
        await schema.validate(formData, {
          abortEarly: false,
        })
        // Validation passed
        const data = {
          objetivo: formData.objetivo,
          descricao: formData.descricao,
          pessoa_id: id_pessoa,
          areas: formData.areas.map(area => {
            return { destricao: area }
          }),
          habilidades: formData.habilidades.map(habilidade => {
            return { nome: habilidade }
          }),
        }
        await api
          .put(`/api/v1/projeto/${idProject}`, data, {
            withCredentials: true,
          })
          .then(() => setShownStep(3))
          .catch((err: AxiosError) => {
            return err?.response?.data.detail
          })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }
      }
    },
    [idProject],
  )

  return (
    <BodyCreateProject>
      <Logged />
      <Modal
        open={showModal}
        setOpen={setShowModal}
        onAfterClose={() => {
          setShowModal(!isAuthenticated)
        }}
      >
        <h1>Para prosseguir, você precisa estar logado</h1>
        <Login onSuccessLogin={() => setShowModal(isAuthenticated)} />
      </Modal>
      <main>
        {shownStep === 1 || (shownStep === 2 && <h1>Criar Projeto</h1>)}
        {(shownStep === 1 && (
          <Form
            ref={formRef}
            className="primeira-etapa"
            onSubmit={handleSubmit}
          >
            <div className="coluna-um">
              <Input name="nome" label="Título do projeto" />
              <div className="upload-img">
                <Dropzone name="img" />
              </div>

              <ToggleSwitch
                name="visibilidade"
                options={[
                  {
                    label: 'Tornar este projeto privado',
                    id: 'visibilidade',
                    value: 'visivel',
                  },
                ]}
              />
            </div>
            <div className="coluna-dois">
              <SelectArea name="areas" label="Área de desenvolvimento" />
            </div>
            <section>
              <Button type="button" onClick={history.goBack} theme="secondary">
                Cancelar
              </Button>
              <Button theme="primary" type="submit">
                Continuar
              </Button>
            </section>
          </Form>
        )) ||
          (shownStep === 2 && (
            <Form
              ref={formRef}
              className="segunda-etapa"
              onSubmit={handleSecondSubmit}
            >
              <div className="coluna-um">
                <Textarea label="Objetivo do projeto" name="objetivo" />
                <Textarea label="Descrição simples" name="descricao" />
              </div>
              <div className="coluna-dois">
                <SelectTool
                  name="habilidades"
                  label="Ferramentas, matérias e habilidades que o time precisa dominar"
                />
              </div>
              <section>
                <Button
                  className="voltar"
                  type="button"
                  onClick={() => setShownStep(1)}
                  theme="secondary"
                >
                  Voltar
                </Button>
                <Button theme="primary" type="submit">
                  Continuar
                </Button>
              </section>
            </Form>
          )) ||
          (shownStep === 3 && (
            <aside>
              <Vacancy project={{ ...project, id: idProject }} />
              <Button theme="primary" onClick={() => history.push('/')}>
                Concluir
              </Button>
            </aside>
          ))}
      </main>
    </BodyCreateProject>
  )
}
export default CreateProject
