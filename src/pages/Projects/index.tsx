import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from 'react'
import {
  BodyProjects,
  ButtonFavorite,
  DivConvite,
  DivParticipants,
  DivSobre,
  DivTags,
  DivVagas,
} from './styles'
import userDefault from '../../assets/icon/user.svg'

import urlConvite from '../../assets/image/convite_dias.svg'
// import clone from '../../assets/icon/clone.svg'
import objetivo from '../../assets/icon/objetivo.svg'
import vagas from '../../assets/icon/vagas.svg'
import like from '../../assets/icon/like.svg'
import { useHistory, useParams } from 'react-router'
import Button from '../../components/UI/Button'
import api from '../../services/api'
import { AxiosError, AxiosResponse } from 'axios'
import SelectArea, { AreaType } from '../../components/UI/SelectArea'
import SelectTool, { ToolType } from '../../components/UI/SelectTools'
import Modal from '../../components/UI/Modal'
import Textarea from '../../components/UI/Textarea'
import Input from '../../components/UI/Input'
import Dropzone from '../../components/UI/Dropzone'
import { Context } from '../../context/AuthContext'
import Login from '../../components/UI/Login'
import NavBar from '../../components/UI/NavBar'
import Vacancy, {
  handleVacancy,
  TypeSituationVacancy,
  VacanciesType,
} from '../../components/Vacancy'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import getValidationErrors from '../../utils/getValidationErrors'
import { ButtonList } from '../Profiles/styles'
import ContainerScroll from '../../components/UI/ContainerScroll'
import VacancieListItem from '../../components/VacancieListItem'
import Skeleton from 'react-loading-skeleton'
import { IconEdit } from '../../assets/icon'
import { ProfileLink } from '../../components/SuccessfulCreatorsCard/styles'
import { showToast } from '../../components/Toast/Toast'
import { IReaction } from '../../components/ProjectCard'
import { BsFillStarFill } from 'react-icons/bs'
interface routeParms {
  id: string
}
interface ProjectType {
  nome: string
  descricao: string
  visibilidade: Array<string>
  objetivo: string
  foto_capa: string
  data_criacao: string
  areas: AreaType[]
  habilidades: ToolType[]
  projeto_reacoes?: IReaction[]
  id: number
  pessoa_id: number
}
interface IPeopleLink {
  usuario: string
  foto_perfil: string
  nome: string
  id: number
}

/**
 * @constructor
 * @content is the iten of the modal
 */
interface IVacancyDetail extends VacanciesType {
  pessoas_ids: number[]
  pessoas_projeto_ids: number[]
  aceito_ids: number[]
}
interface IParmsProps {
  id: string
  step?: string
}
const Projects: React.FC = () => {
  const { loading, isAuthenticated, user } = useContext(Context)
  const routeParms = useParams<IParmsProps>()

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
  const [openModal, setOpenModal] = useState<boolean>(
    loading && isAuthenticated,
  )
  const [projectOwner, setProjectOwner] = useState({} as IPeopleLink)
  const [participantsDetail, setParticipantsDetail] = useState<IPeopleLink[]>(
    [],
  )
  const [project, setProject] = useState({} as ProjectType)
  const [storedAreas, setStoredAreas] = useState<Array<AreaType>>([])
  const [storedTools, setStoredTools] = useState<Array<ToolType>>([])
  const [vacanciesList, setVacanciesList] = useState<boolean>(
    routeParms.step === 'vagas',
  )
  const [favoriteId, setFavoriteId] = useState<Number>(0)
  const [vacancies, setVacancies] = useState<Array<VacanciesType>>([])
  const [likeCount, setLikeCount] = useState<Number>(0)
  const vacancyComponentRef = useRef<handleVacancy>(null)
  const [groupedVacancies, setGroupedVacancies] = useState<
    Array<VacanciesType[]>
  >([])
  const [vacancyDetail, setVacancyDetail] = useState<IVacancyDetail>({
    ...vacancies[0],
    pessoas_ids: [],
    pessoas_projeto_ids: [],
    aceito_ids: [],
  })

  const getset_pessoa_projeto = useCallback(async () => {
    if (routeParms.id)
      await api
        .get(`/api/v1/pessoa_projeto/projeto/${routeParms.id}`)
        .then((response: AxiosResponse<VacanciesType[]>) => {
          setVacancies(response.data)

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
            GroupResponse.filter((vacancies, index, self) => {
              let indexOfDuplicated = -1
              for (let i = 0; i < self.length; i++) {
                if (JSON.stringify(self[i]) === JSON.stringify(vacancies)) {
                  indexOfDuplicated = i
                }
              }
              return index === indexOfDuplicated
            }),
          )
        })
        .catch((error: AxiosError) => {
          return error?.response?.data.detail
        })
    return true
  }, [routeParms.id])
  const handleDeclineInvitation = useCallback(
    (pessoa_projeto_id: number) => {
      api
        .put(`api/v1/pessoa_projeto/${pessoa_projeto_id}`, {
          situacao: 'RECUSADO',
        })
        .then(() => getset_pessoa_projeto())
    },
    [getset_pessoa_projeto],
  )
  const handleAcceptInvitation = useCallback(
    (pessoa_projeto_id: number) => {
      api
        .put(`api/v1/pessoa_projeto/${pessoa_projeto_id}`, {
          situacao: 'ACEITO',
        })
        .then(() => getset_pessoa_projeto())
    },
    [getset_pessoa_projeto],
  )

  useEffect(() => {
    if (project.projeto_reacoes && isAuthenticated) {
      setFavoriteId(
        project.projeto_reacoes.find(reaction => {
          return (
            reaction.pessoa_id === user.id && reaction.reacao === 'FAVORITO'
          )
        })?.id || 0,
      )
    }
  }, [user.id, project.id, project.projeto_reacoes])

  function ToogleFavorite() {
    if (favoriteId) {
      api
        .delete(
          `/api/v1/reacoes?pessoa_id=${user.id}&projeto_id=${project.id}&reacao=FAVORITO`,
        )
        .then(response => {
          setFavoriteId(0)
        })
    } else {
      api
        .post('/api/v1/reacoes', {
          reacao: 'FAVORITO',
          pessoa_id: user?.id,
          projeto_id: project.id,
        })
        .then(response => {
          setFavoriteId(response.data.id)
        })
    }
    console.log(!favoriteId ? 'FAVORITO' : 'NAO FAVORITO')
  }

  const formRef = useRef<FormHandles>(null)
  const handleDeleteVacancy = useCallback(
    (vacancies: VacanciesType[]) => {
      vacancies.forEach(vacancy => {
        const res = api
          .delete(`/api/v1/pessoa_projeto/${vacancy.id}`)
          .then(getset_pessoa_projeto)
          .catch((error: AxiosError) => {
            return error?.response?.data.detail
          })
        console.log(res)
      })
    },
    [getset_pessoa_projeto],
  )
  const handleFindTeam = useCallback(() => {
    const res = api
      .get(`/api/v1/pessoa_projeto/similaridade_projeto/${routeParms.id}`)
      .finally(() => {
        history.push(`/projeto-conectado/${routeParms.id}`)
      })
      .catch((error: AxiosError) => {
        return error?.response?.data.detail
      })
    console.log(res)
  }, [history, routeParms.id])
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
          img: Yup.mixed()
            .required('Insira a capa do projeto!')
            .test(
              'tipo do arquivo',
              'Insira arquivos com a extensão .png ou .jpg',
              file => {
                let valid = true
                if (file) {
                  if (!['image/jpeg', 'image/png'].includes(file.type)) {
                    valid = false
                  }
                }
                return valid
              },
            ),
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
        if (modalContent.areas) {
          const data = {
            areas: formData.areas.map(area => {
              return { descricao: area }
            }),
          }
          await api
            .put(`/api/v1/projeto/${routeParms.id}`, data, {
              withCredentials: true,
            })
            .then(() => {
              setOpenModal(false)
            })
        } else if (modalContent.habilidades) {
          const data = {
            habilidades: formData.habilidades.map(tool => {
              return { nome: tool }
            }),
          }
          await api
            .put(`/api/v1/projeto/${routeParms.id}`, data, {
              withCredentials: true,
            })
            .then(() => {
              setOpenModal(false)
            })
        } else {
          await api
            .put(`/api/v1/projeto/${routeParms.id}`, formData)
            .then(() => {
              setOpenModal(false)
            })
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }
      }
    },
    [modalContent, routeParms.id],
  )
  function isOwner() {
    if (project.pessoa_id && user.id) {
      return !!(project.pessoa_id === user.id)
    } else return false
  }
  useEffect(() => {
    const res = api
      .get(`/api/v1/projeto/${routeParms.id}`)
      .then((response: AxiosResponse<ProjectType>) => {
        setProject(response.data)
        setLikeCount(
          response.data.projeto_reacoes?.filter(project => {
            return project.reacao === 'FAVORITO'
          }).length || 0,
        )
        setStoredTools(response.data.habilidades)
        setStoredAreas(response.data.areas)
        api.get(`/api/v1/pessoas/${response.data.pessoa_id}`).then(response => {
          setProjectOwner(response.data)
        })
      })
      .catch((error: AxiosError) => {
        return error?.response?.data.detail
      })

    getset_pessoa_projeto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeParms.id, openModal, favoriteId])
  useEffect(() => {
    if (groupedVacancies.length > 0) {
      setVacancyDetail({
        ...groupedVacancies[0][0],
        pessoas_ids: groupedVacancies[0].map(vacancy => {
          return vacancy.pessoa_id
        }),
        pessoas_projeto_ids: groupedVacancies[0].map(vacancy => {
          return vacancy.id
        }),
        aceito_ids: groupedVacancies[0]
          .filter(vacancy => {
            return (
              vacancy.situacao === 'ACEITO' || vacancy.situacao === 'FINALIZADO'
            )
          })
          .map(vacancy => vacancy.pessoa_id),
      })
    }
  }, [groupedVacancies])

  useEffect(() => {
    const res = api
      .get(`/api/v1/pessoas/${project.pessoa_id}`)
      .then(response => {
        setProjectOwner(response.data)
      })
      .catch((error: AxiosError) => {
        return error?.response?.data.detail
      })
    console.log(res)
  }, [project.pessoa_id, openModal])

  useEffect(() => {
    setParticipantsDetail(
      vacancyDetail.aceito_ids?.map(id => {
        let res: IPeopleLink = {} as IPeopleLink
        api
          .get(`/api/v1/pessoas/${id}`)
          .then((response: AxiosResponse<IPeopleLink>) => {
            res = response.data
          })
          .catch((error: AxiosError) => {
            return error?.response?.data.detail
          })
        return res
      }),
    )
  }, [vacancyDetail])
  console.log(vacancyDetail.aceito_ids)
  function buttonMatchContent(option?: TypeSituationVacancy) {
    switch (option) {
      case 'FINALIZADO':
        return (
          <Button
            theme="primary"
            onClick={() => history.push(`/projeto-conectado/${routeParms.id}`)}
          >
            Relatório do Time
          </Button>
        )
      case 'PENDENTE_IDEALIZADOR':
        return (
          <Button theme="primary" onClick={handleFindTeam}>
            Buscar Time
          </Button>
        )
      default:
        return (
          <Button
            theme="primary"
            onClick={() => history.push(`/projeto-conectado/${routeParms.id}`)}
          >
            Status do time
          </Button>
        )
    }
  }
  return (
    <BodyProjects>
      <NavBar />
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        onAfterClose={() => {
          setOpenModal(!isAuthenticated)
          vacancyComponentRef.current?.setShowRegister(false)
          vacancyComponentRef.current?.setEditVacancies([])
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
                    <Dropzone
                      name="img"
                      defaultValue={`https://conectar.s3.sa-east-1.amazonaws.com/uploads/${project.foto_capa}`}
                    />
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
                    name="areas"
                    label="Selecione as àreas de atuação"
                    defaultValue={storedAreas.map(area => {
                      return area.descricao
                    })}
                  />
                )}
                {modalContent.habilidades && (
                  <SelectTool
                    name="habilidades"
                    label="Selecione as ferramentas ou habilidades"
                    defaultValue={storedTools.map(tool => {
                      return tool.nome
                    })}
                  />
                )}
                <Button theme="primary" type="submit">
                  Salvar
                </Button>
              </Form>
            )}
            {
              <Vacancy
                project={project}
                ref={vacancyComponentRef}
                dontRender={!modalContent.vaga}
              />
            }
          </>
        )}
      </Modal>

      <header>
        {project.foto_capa ? (
          <img
            src={`https://conectar.s3.sa-east-1.amazonaws.com/uploads/${project.foto_capa}`}
            alt="imagem de capa do projeto"
          />
        ) : (
          <Skeleton height={180} />
        )}
        {isOwner() ? (
          <IconEdit
            onClick={() => {
              setModalContent({ ...initialModalContent, nome: true })
              setOpenModal(true)
            }}
          />
        ) : (
          <ProfileLink to={`/perfil/${projectOwner?.usuario}`}>
            <img
              src={
                projectOwner?.foto_perfil
                  ? `https://conectar.s3.sa-east-1.amazonaws.com/uploads/${projectOwner?.foto_perfil}`
                  : userDefault
              }
              alt={projectOwner?.nome}
            />
            <aside>
              <h2>{projectOwner?.nome?.split(' ')[0]}</h2>
              <p>@{projectOwner?.usuario}</p>
            </aside>
          </ProfileLink>
        )}
        <div>
          <section>
            <h1>{project.nome || <Skeleton width="200px" />} </h1>
          </section>

          <section>
            {isOwner() && groupedVacancies.length > 0 ? (
              buttonMatchContent(groupedVacancies[0][0].situacao)
            ) : (
              <ButtonFavorite
                checked={!!favoriteId}
                onClick={ToogleFavorite}
                theme="secondary"
              >
                <BsFillStarFill />
                Favoritar
              </ButtonFavorite>
            )}
            <a>
              {likeCount !== 0 && (
                <span>
                  {<img src={like} alt="curtidas" />}
                  {likeCount}
                </span>
              )}

              {
                <p>
                  Publicado em:{' '}
                  {`${
                    project.data_criacao?.split('T')[0]?.split('-')[2] +
                    '/' +
                    project.data_criacao?.split('T')[0]?.split('-')[1] +
                    '/' +
                    project.data_criacao?.split('T')[0]?.split('-')[0]
                  }`}
                </p>
              }
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

      <DivSobre showSobre={!vacanciesList}>
        <div className="objdes">
          <section>
            <legend>
              <img className="icon-objetivo" src={objetivo} alt="objetivo" />
              Objetivo
              {isOwner() && (
                <IconEdit
                  onClick={() => {
                    setModalContent({ ...initialModalContent, objetivo: true })
                    setOpenModal(true)
                  }}
                />
              )}
            </legend>

            <p>{project.objetivo || <Skeleton width={350} />}</p>
          </section>
          <section>
            <legend>
              Descrição
              {isOwner() && (
                <IconEdit
                  onClick={() => {
                    setModalContent({ ...initialModalContent, descricao: true })
                    setOpenModal(true)
                  }}
                />
              )}
            </legend>

            <p>
              {project.descricao || (
                <>
                  <Skeleton width={300} />
                  <Skeleton width={300} />
                  <Skeleton width={300} />
                </>
              )}
            </p>
          </section>
        </div>
        <DivTags>
          <legend>
            Áreas de desenvolvimento
            {isOwner() && (
              <IconEdit
                onClick={() => {
                  setModalContent({ ...initialModalContent, areas: true })
                  setOpenModal(true)
                }}
              />
            )}
          </legend>
          {project.areas?.length ? (
            <aside>
              {project.areas?.map(area => (
                <span key={area.id}>{area.descricao}</span>
              ))}
            </aside>
          ) : (
            <Skeleton width={50} />
          )}
          <legend>
            Habilidades e ferramentas
            {isOwner() && (
              <IconEdit
                onClick={() => {
                  setModalContent({ ...initialModalContent, habilidades: true })
                  setOpenModal(true)
                }}
              />
            )}
          </legend>
          {project.habilidades?.length ? (
            <aside>
              {project.habilidades?.map(habilidade => (
                <span key={habilidade.id}>{habilidade.nome}</span>
              ))}
            </aside>
          ) : (
            <Skeleton width={50} />
          )}
        </DivTags>
      </DivSobre>
      {vacanciesList &&
        vacancyDetail?.situacao === 'PENDENTE_COLABORADOR' &&
        vacancyDetail?.pessoas_ids?.includes(user.id) && (
          <DivConvite>
            <figure>
              <img
                src={urlConvite}
                alt="Mulher apertando a mão de um homem simbolizando um acordo"
              />
              <figcaption>
                Você tem apenas {3} dias para responder este convite
              </figcaption>
            </figure>
            <aside>
              <Button
                theme="secondary"
                onClick={() => {
                  showToast('error', 'Vaga recusada com sucesso!')
                  handleDeclineInvitation(
                    vacancyDetail?.pessoas_projeto_ids[
                      vacancyDetail.pessoas_ids.indexOf(user.id)
                    ],
                  )
                }}
              >
                Recusar
              </Button>
              <Button
                theme="primary"
                onClick={() => {
                  showToast('success', 'Vaga aceita com sucesso!')
                  handleAcceptInvitation(
                    vacancyDetail?.pessoas_projeto_ids[
                      vacancyDetail.pessoas_ids.indexOf(user.id)
                    ],
                  )
                }}
              >
                Aceitar
              </Button>
            </aside>
          </DivConvite>
        )}
      <DivVagas showVagas={vacanciesList}>
        <section>
          <legend>
            <img src={vagas} alt="vagas" />
            Vagas
            {isOwner() && (
              <IconEdit
                onClick={() => {
                  setModalContent({ ...initialModalContent, vaga: true })
                  setOpenModal(true)
                }}
              />
            )}
          </legend>

          <ContainerScroll>
            {groupedVacancies.map(vacancies => (
              <VacancieListItem
                dontShowOption={isOwner() ? undefined : true}
                key={vacancies[0].id}
                vacancy={{
                  ...vacancies[0],
                  quantidade: vacancies.length,
                }}
                onDelete={() => handleDeleteVacancy(vacancies)}
                onEdit={() => {
                  setOpenModal(true)
                  setModalContent({ ...initialModalContent, vaga: true })
                  vacancyComponentRef.current?.setShowRegister(true)
                  vacancyComponentRef.current?.setEditVacancies(vacancies)
                  console.log(vacancies)
                }}
                onClick={() => {
                  setVacancyDetail({
                    ...vacancies[0],
                    pessoas_ids: vacancies.map(vacancy => {
                      return vacancy.pessoa_id
                    }),
                    pessoas_projeto_ids: vacancies.map(vacancy => {
                      return vacancy.id
                    }),
                    aceito_ids: vacancies
                      .filter(vacancy => {
                        return (
                          vacancy.situacao === 'ACEITO' ||
                          vacancy.situacao === 'FINALIZADO'
                        )
                      })
                      .map(vacancy => vacancy.pessoa_id),
                  })
                }}
                style={
                  vacancyDetail.titulo === vacancies[0].titulo
                    ? { background: 'var(--backgroundElevation)' }
                    : { background: 'transparent' }
                }
              />
            ))}
          </ContainerScroll>
        </section>
        <section>
          <legend>Descrição da vaga</legend>
          <aside>
            <p>{vacancyDetail?.descricao}</p>
            <DivTags>
              <legend>
                Áreas de desenvolvimento
                {isOwner() && (
                  <IconEdit
                    onClick={() => {
                      setModalContent({ ...initialModalContent, areas: true })
                      setOpenModal(true)
                    }}
                  />
                )}
              </legend>
              <aside>
                {vacancyDetail?.areas?.map(area => (
                  <span key={area.id}>{area.descricao}</span>
                ))}
              </aside>
              <legend>
                Habilidades e ferramentas
                {isOwner() && (
                  <IconEdit
                    onClick={() => {
                      setModalContent({
                        ...initialModalContent,
                        habilidades: true,
                      })
                      setOpenModal(true)
                    }}
                  />
                )}
              </legend>
              <aside>
                {vacancyDetail?.habilidades?.map(habilidade => (
                  <span key={habilidade.id}>{habilidade.nome}</span>
                ))}
              </aside>
            </DivTags>
            {participantsDetail.length > 0 && (
              <DivParticipants>
                <legend>Pessoas participando dessa vaga:</legend>
                <aside>
                  {participantsDetail?.map(participant => (
                    <ProfileLink
                      key={participant?.usuario}
                      to={`/perfil/${participant?.usuario}`}
                    >
                      <img
                        src={`https://conectar.s3.sa-east-1.amazonaws.com/uploads/${participant.foto_perfil}`}
                        alt=""
                      />
                      <h2>{participant?.nome?.split(' ')[0]}</h2>
                    </ProfileLink>
                  ))}
                </aside>
              </DivParticipants>
            )}
          </aside>
        </section>
      </DivVagas>
    </BodyProjects>
  )
}
export default Projects
