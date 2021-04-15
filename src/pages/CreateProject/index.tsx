import React, { useState, useContext, useRef, useCallback } from 'react'
import { BodyCreateProject } from './styles'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import Textarea from '../../components/UI/Textarea'
import { useHistory } from 'react-router'
import SelectArea, { AreaType } from '../../components/UI/SelectArea'
import SelectTool, { ToolType } from '../../components/UI/SelectTools'
import Dropzone from '../../components/UI/Dropzone'
import Modal from '../../components/UI/Modal'
import api from '../../services/api'
import Login from '../../components/UI/Login'
import { Context } from '../../context/AuthContext'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import getValidationErrors from '../../utils/getValidationErrors'
import Vacancy from '../../components/Vacancy'
import { AxiosError } from 'axios'

export interface ProjectType {
  descricao: string
  objetivo: string
  habilidades: ToolType[]
  nome: string
  visibilidade: string[]
  foto_capa: string
  areas: AreaType[]
  id: number
}
interface FirstFormData {
  nome: string
  visibilidade: Array<string>
  areas: string[]
}
interface SecondFormData {
  descricao: string
  objetivo: string
  habilidades: string[]
}
const CreateProject: React.FC = () => {
  const { isAuthenticated } = useContext(Context)
  const id_pessoa = useContext(Context).user.id
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()
  const [shownStep, setShownStep] = useState<1 | 2 | 3>(1)
  const [firstData, setfirstData] = useState<FirstFormData>({
    areas: [],
    nome: '',
    visibilidade: [],
  })
  const [showModal, setShowModal] = useState<boolean>(!isAuthenticated)
  const [idProject, setIdProject] = useState(0)
  const [project, setProject] = useState<ProjectType>({} as ProjectType)
  const [selectedFile, setSelectedFile] = useState<File>()

  const handleSubmit = useCallback(async (formData: FirstFormData) => {
    console.log(formData)
    try {
      // Remove all previogeus errors
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        nome: Yup.string()
          .required('Nome é obrigatório')
          .matches(/^[A-Za-z ]*$/, 'Insira um nome válido'),
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
      data.append('visibilidade', JSON.stringify(true))
      // selectedFile &&
      //   data.append('foto_capa', selectedFile, `${formData.nome}pic.jpg`)
      data.append('descricao', 'Não informado')
      data.append('objetivo', 'Não informado')
      setfirstData(formData)
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
  }, [])

  const handleSecondSubmit = useCallback(
    async (formData: SecondFormData) => {
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
          areas: firstData.areas.map(area => {
            return { descricao: area }
          }),
          habilidades: formData.habilidades.map(habilidade => {
            return { nome: habilidade }
          }),
        }
        console.log(data)

        await api
          .put(`/api/v1/projeto/${idProject}`, data, {
            withCredentials: true,
          })
          .then(response => {
            console.log(response.data)
            setProject(response.data)
          })
        setShownStep(3)
      } catch (err) {
        console.log(err)

        if (err instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }
      }
    },
    [firstData.areas, idProject, id_pessoa],
  )

  return (
    <BodyCreateProject>
      <main>
        {(shownStep === 1 || shownStep === 2) && <h1>Criar Projeto</h1>}
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
            <aside className="terceira-etapa">
              <Vacancy project={project} />
              <Button
                theme="primary"
                onClick={() => history.push(`/projeto/${idProject}`)}
              >
                Concluir
              </Button>
            </aside>
          ))}
      </main>
    </BodyCreateProject>
  )
}
export default CreateProject
