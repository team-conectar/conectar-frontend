import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useContext,
  Fragment,
  useCallback,
} from 'react'
import { Link } from 'react-router-dom'
import { BodyProjects, DivSobre, DivTags, DivVagas } from './styles'
import edit from '../../assets/icon/editar.svg'
import TrashIcon from '../../assets/icon/lixeira.svg'
import { Scrollbars } from 'react-custom-scrollbars'

// import clone from '../../assets/icon/clone.svg'
import config from '../../assets/icon/config.svg'
import no_couver from '../../assets/image/no_couver.svg'
import objetivo from '../../assets/icon/objetivo.svg'
import id from '../../assets/icon/id.svg'
import al from '../../assets/icon/al.svg'
import co from '../../assets/icon/co.svg'
import vagas from '../../assets/icon/vagas.svg'
import like from '../../assets/icon/like.svg'
import { useHistory, useParams } from 'react-router'
import Button from '../../components/Button'
import api from '../../services/api'
import { AxiosError } from 'axios'
import SelectArea, { AreaType } from '../../components/SelectArea'
import SelectTool, { ToolType } from '../../components/SelectTools'
import Modal from '../../components/Modal'
import { Context } from '../../context/AuthContext'
import Login from '../../components/Login'
import NavBar from '../../components/NavBar'
import Vacancy, { VacanciesType } from '../../components/Vacancy'
import Textarea from '../../components/Textarea'
import Input from '../../components/Input'
import Dropzone from '../../components/Dropzone'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import getValidationErrors from '../../utils/getValidationErrors'
import { ButtonList } from '../Profiles/styles'
import ContainerScroll from '../../components/ContainerScroll'
import VacancieListItem from '../../components/VacancieListItem'
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
/**
 * @constructor
 * @content is the iten of the modal
 */

const Projects: React.FC = () => {
  const { loading, isAuthenticated } = useContext(Context)
  // const [modalContent, setModalContent] = useState<ReactNode>(null);
  const initialModalContent = {
    nome: false,
    descricao: false,
    objetivo: false,
    vaga: false,
    areas: false,
    habilidades: false,
  }
  const [modalContent, setModalContent] = useState(initialModalContent)
  const history = useHistory()
  const [openModal, setOpenModal] = useState<boolean>(isAuthenticated)
  const projeto_id = useParams<routeParms>().id
  const [project, setProject] = useState({} as ProjectType)
  const [storedAreas, setStoredAreas] = useState<Array<AreaType>>([])
  const [storedTools, setStoredTools] = useState<Array<ToolType>>([])
  const [selectedImage, setSelectedImage] = useState<File>()
  const [vacanciesList, setVacanciesList] = useState<boolean>(false)
  const [vacancies, setVacancies] = useState<Array<VacanciesType>>([])
  const [vacancyDetail, setVacancyDetail] = useState<VacanciesType>(
    vacancies[0],
  )
  const formRef = useRef<FormHandles>(null)
  useEffect(() => {
    const res = [
      api
        .get(`/api/v1/projeto/${projeto_id}`)
        .then(response => {
          setProject(response.data)
          setStoredTools(response.data.habilidades)
          setStoredAreas(response.data.areas)
        })
        .catch((err: AxiosError) => {
          console.log(err?.response?.data.detail)
        }),
      api
        .get(`/api/v1/pessoa_projeto/projeto/${projeto_id}`)
        .then(response => {
          setVacancies(response.data)
          setVacancyDetail(response.data[0])
        })
        .catch((err: AxiosError) => {
          console.log(err?.response?.data.detail)
        }),
    ]
    console.log(res)
  }, [projeto_id])

  const handleSubmit = useCallback(
    async (formData: ProjectType) => {
      console.log(formData)
      try {
        // Remove all previogeus errors
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          nome: modalContent.nome
            ? Yup.string().required('Nome é obrigatório')
            : Yup.string(),
          descricao: modalContent.descricao
            ? Yup.string().required('Descrição é obrigatória')
            : Yup.string(),
          objetivo: modalContent.objetivo
            ? Yup.string().required('Objetivo é obrigatório')
            : Yup.string(),
          habilidades: modalContent.habilidades
            ? Yup.array()
                .min(1, 'Seleciono pelo menos 1 item')
                .max(5, 'Seleciono no máximo 5')
            : Yup.array(),
          areas: modalContent.areas
            ? Yup.array()
                .min(1, 'Seleciono pelo menos 1 item')
                .max(5, 'Seleciono no máximo 5')
            : Yup.array(),
        })
        await schema.validate(formData, {
          abortEarly: false,
        })
        // Validation passed
        await api.put(`/api/v1/projeto/${projeto_id}`, formData)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }
      }
    },
    [modalContent, projeto_id],
  )
  function areaTypeToString() {
    const defo: Array<string> = []

    storedAreas.forEach(area => {
      defo.push(area.descricao)
    })

    return defo
  }
  function toolTypeToString() {
    const defo: Array<string> = []

    storedTools.forEach(tool => {
      defo.push(tool.nome)
    })

    return defo
  }
  return (
    <BodyProjects>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        onAfterClose={() => {
          setOpenModal(!isAuthenticated)
        }}
      >
        {!loading && !isAuthenticated ? (
          <>
            <h1>Para prosseguir, você precisa estar logado</h1>
            <Login onSuccessLogin={() => setOpenModal(isAuthenticated)} />
          </>
        ) : (
          <>
            {!modalContent.vaga && (
              <Form ref={formRef} onSubmit={handleSubmit}>
                {modalContent.nome && (
                  <>
                    <Input
                      name="nome"
                      label="Nome do projeto"
                      defaultValue={project.nome}
                    />
                    <Dropzone name="capa" />
                  </>
                )}
                {modalContent.objetivo && (
                  <Textarea
                    name="objetivo"
                    label="Objetivo breve do projeto"
                    defaultValue={project.objetivo}
                  />
                )}
                {modalContent.descricao && (
                  <Textarea
                    name="descricao"
                    label="Descrição sobre o projeto"
                    defaultValue={project.descricao}
                  />
                )}
                {modalContent.areas && (
                  <SelectArea
                    name="area"
                    label="Selecione as àreas de atuação"
                    defaultValue={areaTypeToString()}
                  />
                )}
                {modalContent.habilidades && (
                  <SelectTool
                    name="habilidades"
                    label="Selecione as ferramentas ou habilidades"
                    defaultValue={toolTypeToString()}
                  />
                )}
                <Button theme="primary" type="submit">
                  Salvar
                </Button>
              </Form>
            )}
            {modalContent.vaga && <Vacancy project={project} />}
          </>
        )}
      </Modal>

      <header>
        <img src={no_couver} alt="imagem de capa do projeto" />
        <span>
          <img
            src={edit}
            alt="editar o nome"
            onClick={() => {
              setModalContent({ ...initialModalContent, nome: true })
              setOpenModal(true)
            }}
          />
        </span>
        <div>
          <section>
            <h1>{project.nome}</h1>
          </section>

          <section>
            <Button theme="secondary">
              <img src={like} alt="curtidas" /> Favoritar
            </Button>
            <a>
              <span>
                <img src={like} alt="curtidas" />
                194
              </span>
              <p>Publicado em:</p>
            </a>
          </section>
          <aside>
            <ButtonList
              borderBottom={!vacanciesList}
              onClick={() => {
                setVacanciesList(false)
              }}
            >
              Sobre
            </ButtonList>
            <ButtonList
              borderBottom={vacanciesList}
              onClick={() => {
                setVacanciesList(true)
              }}
            >
              Vagas
            </ButtonList>
          </aside>
        </div>
      </header>
      {!vacanciesList && (
        <DivSobre>
          <div className="objdes">
            <section>
              <legend>
                <img className="icon-objetivo" src={objetivo} alt="objetivo" />
                Objetivo
                <img
                  src={edit}
                  alt="editar"
                  onClick={() => {
                    setModalContent({ ...initialModalContent, objetivo: true })
                    setOpenModal(true)
                  }}
                />
              </legend>

              <p>{project.objetivo}</p>
            </section>
            <section>
              <legend>
                Descrição
                <img
                  src={edit}
                  alt="editar"
                  onClick={() => {
                    setModalContent({ ...initialModalContent, descricao: true })
                    setOpenModal(true)
                  }}
                />
              </legend>

              <p>{project.descricao}</p>
            </section>
          </div>
          <DivTags>
            <legend>
              Áreas de desenvolvimento
              <img
                src={edit}
                alt="editar"
                onClick={() => {
                  setModalContent({ ...initialModalContent, areas: true })
                  setOpenModal(true)
                }}
              />
            </legend>
            <aside>
              {project.areas?.map(area => (
                <span key={area.id}>{area.descricao}</span>
              ))}
            </aside>
            <legend>
              Habilidades e ferramentas
              <img
                src={edit}
                alt="editar"
                onClick={() => {
                  setModalContent({ ...initialModalContent, habilidades: true })
                  setOpenModal(true)
                }}
              />
            </legend>
            <aside>
              {project.habilidades?.map(habilidade => (
                <span key={habilidade.id}>{habilidade.nome}</span>
              ))}
            </aside>
          </DivTags>
        </DivSobre>
      )}
      {vacanciesList && (
        <DivVagas>
          <section>
            <legend>
              <img src={vagas} alt="vagas" />
              Vagas
              <img
                src={edit}
                alt="editar"
                onClick={() => {
                  setModalContent({ ...initialModalContent, vaga: true })
                  setOpenModal(true)
                }}
              />
            </legend>

            <ContainerScroll>
              {vacancies.map(vacancy => (
                <VacancieListItem
                  key={vacancy.id}
                  vacancy={vacancy}
                  onClick={() => setVacancyDetail(vacancy)}
                  style={
                    vacancyDetail === vacancy
                      ? { background: 'var(--backgroudElevation)' }
                      : { background: 'transparent' }
                  }
                />
              ))}
            </ContainerScroll>
          </section>
          <section>
            <legend>Descrição da vaga</legend>
            <aside>
              <p>{vacancyDetail.descricao}</p>
              <DivTags>
                <legend>
                  Áreas de desenvolvimento
                  <img
                    src={edit}
                    alt="editar"
                    onClick={() => {
                      setModalContent({ ...initialModalContent, areas: true })
                      setOpenModal(true)
                    }}
                  />
                </legend>
                <aside>
                  {vacancyDetail.areas?.map(area => (
                    <span key={area.id}>{area.descricao}</span>
                  ))}
                </aside>
                <legend>
                  Habilidades e ferramentas
                  <img
                    src={edit}
                    alt="editar"
                    onClick={() => {
                      setModalContent({
                        ...initialModalContent,
                        habilidades: true,
                      })
                      setOpenModal(true)
                    }}
                  />
                </legend>
                <aside>
                  {vacancyDetail.habilidades?.map(habilidade => (
                    <span key={habilidade.id}>{habilidade.nome}</span>
                  ))}
                </aside>
              </DivTags>
            </aside>
          </section>
        </DivVagas>
      )}
    </BodyProjects>
  )
}
export default Projects
