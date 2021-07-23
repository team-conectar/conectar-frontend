/* eslint-disable no-useless-escape */
import React, { useState, useEffect, useContext } from 'react'
import {
  Page,
  ButtonList,
  PerfilDiv,
  ProjetosSection,
  ExperienciasDiv,
  PerfilMain,
} from './styles'
import trabalho from '../../assets/icon/trabalho.svg'
import educação from '../../assets/icon/educação.svg'
import userDefault from '../../assets/icon/user.svg'
import projeto from '../../assets/icon/projeto.svg'
import capa_id from '../../assets/image/capa_id.svg'
import capa_al from '../../assets/image/capa_al.svg'
import capa_co from '../../assets/image/capa_co.svg'
import id from '../../assets/icon/id.svg'
import al from '../../assets/icon/al.svg'
import co from '../../assets/icon/co.svg'
import { useHistory, useParams } from 'react-router'
import Button from '../../components/UI/Button'
import api from '../../services/api'
import { AxiosError, AxiosResponse } from 'axios'
import { AreaType } from '../../components/UI/SelectArea'
import { ToolType } from '../../components/UI/SelectTools'
import { Context } from '../../context/AuthContext'
import NavBar from '../../components/UI/NavBar'
import ProjectCard, { IProject } from '../../components/ProjectCard'
import { AcademicType } from '../ProfileFeatures/experiences/AcademicExperiences'
import { ProfessionalType } from '../ProfileFeatures/experiences/ProfessionalExperiences'
import { IExperienceProject } from '../ProfileFeatures/experiences/ProjectExperiences'
import { toMonth } from '../../utils/dates'
import Skeleton from 'react-loading-skeleton'
import ContainerScroll from '../../components/UI/ContainerScroll'
import { FaCircle, FaUserFriends } from 'react-icons/fa'
import ProfileCard, { IProfile } from '../../components/ProfileCard'
import { BsPeople } from 'react-icons/bs'

interface routeParms {
  id: string
}

export interface ProfileType {
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
  experiencia_profissional: ProfessionalType
  experiencia_projetos: IExperienceProject
  experiencia_academica: AcademicType
}
/**
 * @constructor
 * @content is the iten of the modal
 */

const Profiles: React.FC = () => {
  // const [modalContent, setModalContent] = useState<ReactNode>(null);
  const initialModalContent = {
    nome: false,
    descricao: false,
    objetivo: false,
    foto: false,
    vaga: false,
    areas: false,
    habilidades: false,
  }

  const [loadingPage, setLoadingPage] = useState(true)
  const history = useHistory()
  const { user } = useContext(Context)
  const [showProjectList, setShowProjectList] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [profile, setProfile] = useState<ProfileType>({} as ProfileType)
  const [projects, setProjects] = useState<IProject[]>([] as IProject[])
  const [favoreteProjects, setFavoriteProjects] = useState<IProject[]>(
    [] as IProject[],
  )
  const [followed, setFollowed] = useState(false)
  const [qtdfollowers, setFollowersqtd] = useState()
  const [qtdfollowing, setFollowingqtd] = useState()
  const [peoplesfrs, setPeoplesfrs] = useState<IProfile[]>([])
  const [peoplesfng, setPeoplesfng] = useState<IProfile[]>([])
  const [participantsProjects, setParticipantsProjects] = useState<IProject[]>(
    [] as IProject[],
  )
  const profile_username = useParams<routeParms>().id
  function experiencia_profissional(array: ProfessionalType[]) {
    const found = array.filter(element => element.data_fim == null)
    if (!found.length) {
      const filter = array.filter((element, index) => {
        if (index === 0) return true
        const limpa = array[index - 1].data_fim.replace(/\-([^>])/g, '$1')
        return element.data_fim.replace(/\-([^>])/g, '$1') > limpa
      })
      console.log(filter[filter.length - 1]) // maior elemento se nao tiver nenhum em andamento
      return filter[filter.length - 1]
    }
    console.log(found[found.length - 1]) // se tiver um em andamento
    return found[found.length - 1]
  }

  function experiencia_projetos(array: IExperienceProject[]) {
    const found = array.find(element => element.data_fim == null)

    if (!found) {
      const filter = array.filter((element, index) => {
        if (index === 0) return true
        const limpa = array[index - 1].data_fim.replace(/\-([^>])/g, '$1')
        return element.data_fim.replace(/\-([^>])/g, '$1') > limpa
      })
      console.log(filter[filter.length - 1]) // maior elemento se nao tiver nenhum em andamento
      return filter[filter.length - 1]
    }
    console.log(found) // se tiver um em andamento
    return found
  }

  function experiencia_academica(array: AcademicType[]) {
    const found = array.find(element => element.data_fim == null)

    if (!found) {
      const filter = array.filter((element, index) => {
        if (index === 0) return true
        const limpa = array[index - 1].data_fim.replace(/\-([^>])/g, '$1')
        return element.data_fim.replace(/\-([^>])/g, '$1') > limpa
      })
      console.log(filter[filter.length - 1]) // maior elemento se nao tiver nenhum em andamento
      return filter[filter.length - 1]
    }
    console.log(found) // se tiver um em andamento
    return found
  }

  useEffect(() => {
    api
      .get(`/api/v1/pessoas/${profile_username}`)
      .then((response: { data: any }) => {
        console.log(response.data)
        setProfile(response.data)
        setProfile({
          ...response.data,
          experiencia_profissional: experiencia_profissional(
            response.data.experiencia_profissional,
          ),
          experiencia_projetos: experiencia_projetos(
            response.data.experiencia_projetos,
          ),
          experiencia_academica: experiencia_academica(
            response.data.experiencia_academica,
          ),
        })
      })
      .catch((err: AxiosError) => {
        // if (err.code === undefined) history.push('/404')
        return err?.response?.data.detail
      })
  }, [history, profile_username])
  useEffect(() => {
    if (profile.id) {
      api
        .get(`/api/v1/projetos?pessoa_id=${profile.id}&visibilidade=true`)
        .then(response => {
          setProjects(response.data)
          setLoadingPage(false)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        })
    }
  }, [profile.id])
  useEffect(() => {
    if (profile.id) {
      api
        .get(`/api/v1/projeto/reacao/${profile.id}?reacao=FAVORITO`)
        .then(response => {
          setFavoriteProjects(response.data)
          setLoadingPage(false)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        })
      console.log(profile.id)
      console.log('blabla')
      api
        .get(`/api/v1/qtd_seguidores?pessoa_id=${profile.id}`)
        .then(response => {
          setFollowersqtd(response.data)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        })
      api
        .get(`/api/v1/qtd_seguindo?pessoa_id=${profile.id}`)
        .then(response => {
          setFollowingqtd(response.data)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        })
      api
        .get(`/api/v1/seguidores?pessoa_id=${profile.id}`)
        .then((response: AxiosResponse<IProfile[]>) => {
          setPeoplesfrs(response.data)
          setFollowed(
            !!response.data.find(people => {
              return people.id === user.id
            }),
          )
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        })
      api
        .get(`/api/v1/seguindo?pessoa_id=${profile.id}`)
        .then(response => {
          setPeoplesfng(response.data)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        })
    }
  }, [profile.id, user.id, followed])
  async function ToogleFollow() {
    if (followed) {
      await api
        .delete(
          `/api/v1/seguir?seguido_id=${profile.id}&seguidor_id=${user.id}`,
        )
        .then(() => {
          setFollowed(false)
        })
    } else {
      await api
        .post('/api/v1/seguir', {
          seguidor_id: user?.id,
          seguido_id: profile.id,
        })
        .then(() => {
          setFollowed(true)
        })
    }
  }
  useEffect(() => {
    if (profile.id) {
      api
        .get(`/api/v1/projeto/participando/${profile.id}`)
        .then(response => {
          setParticipantsProjects(response.data)
          setLoadingPage(false)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        })
    }
  }, [profile.id])
  return (
    <Page>
      <NavBar />
      <main>
        <header>
          <aside>
            {profile?.idealizador && <img src={capa_id} alt="Idealizador" />}
            {profile?.aliado && <img src={capa_al} alt="Aliado" />}
            {profile?.colaborador && <img src={capa_co} alt="Colaborador" />}
          </aside>
          <section>
            <ButtonList
              borderBottom={showProjectList === 1}
              onClick={() => {
                setShowProjectList(1)
              }}
            >
              Projetos
            </ButtonList>
            <ButtonList
              borderBottom={showProjectList === 2}
              onClick={() => {
                setShowProjectList(2)
              }}
            >
              Favoritos
            </ButtonList>
            <ButtonList
              borderBottom={showProjectList === 3}
              onClick={() => {
                setShowProjectList(3)
              }}
            >
              Participando
            </ButtonList>
          </section>
        </header>
        <PerfilDiv>
          <PerfilMain>
            <figure>
              <img
                src={
                  profile?.foto_perfil
                    ? `https://conectar.s3.sa-east-1.amazonaws.com/uploads/${profile.foto_perfil}`
                    : userDefault
                }
                alt={profile.nome}
              />

              <figcaption>
                <h2>{profile?.nome || <Skeleton width="150px" />}</h2>
                <p>
                  {(profile?.usuario && '@' + profile?.usuario) || (
                    <Skeleton width="100px" />
                  )}
                </p>
              </figcaption>
            </figure>
            <div>
              <Button
                theme="tertiary"
                onClick={() => {
                  setShowProjectList(4)
                }}
              >
                <FaUserFriends />
                {qtdfollowing} Seguindo&ensp;
              </Button>
              <FaCircle />
              <Button
                theme="tertiary"
                onClick={() => {
                  setShowProjectList(5)
                }}
              >
                &ensp; {qtdfollowers} Seguidores
              </Button>
            </div>
            <section>
              {profile?.id ? (
                <Button
                  theme="primary"
                  onClick={() => {
                    user.id === profile?.id
                      ? history.push(`/editar-perfil/${user.id}`)
                      : ToogleFollow()
                  }}
                >
                  {user.id === profile?.id
                    ? 'EDITAR'
                    : followed
                    ? 'deixar de seguir'
                    : 'SEGUIR'}
                </Button>
              ) : (
                <Skeleton width="150px" height="30px" />
              )}
              <aside>
                {profile?.idealizador && <img src={id} alt="" />}
                {profile?.aliado && <img src={al} alt="" />}
                {profile?.colaborador && <img src={co} alt="" />}
              </aside>
            </section>
          </PerfilMain>

          <ContainerScroll autoHeight autoHeightMax="50vh">
            <ul>
              {profile?.areas?.length > 0 && <h3>Áreas de atuação</h3>}

              {profile?.areas?.map(area => (
                <li key={area.id}>{area.descricao}</li>
              ))}

              {profile?.habilidades?.length > 0 && (
                <h3>Habilidades e ferramentas de domínio</h3>
              )}

              {profile?.habilidades?.map(habilidade => (
                <li key={habilidade.id}>{habilidade.nome}</li>
              ))}
            </ul>
            <ExperienciasDiv>
              {profile?.experiencia_academica && (
                <button>
                  <img
                    src={educação}
                    alt={profile?.experiencia_academica.curso}
                  />
                  <aside>
                    <legend>
                      {profile?.experiencia_academica.instituicao}
                    </legend>
                    <p>
                      {profile?.experiencia_academica.curso} <br />
                      {profile?.experiencia_academica.situacao}
                    </p>
                  </aside>
                </button>
              )}
              {profile?.experiencia_profissional && (
                <button>
                  <img
                    src={trabalho}
                    alt={profile?.experiencia_profissional.cargo}
                  />
                  <aside>
                    <legend>
                      {profile?.experiencia_profissional.organizacao}
                    </legend>
                    <p>
                      {`
                      ${profile?.experiencia_profissional.cargo} | 
                      ${profile?.experiencia_profissional.vinculo} 
                      `}
                      <br />
                      {`${toMonth(
                        profile?.experiencia_profissional.data_inicio?.split(
                          '-',
                        )[1],
                      )} de  ${
                        profile?.experiencia_profissional.data_inicio?.split(
                          '-',
                        )[0]
                      } até ${
                        profile?.experiencia_profissional.data_fim == null
                          ? 'o momento'
                          : toMonth(
                              profile?.experiencia_profissional.data_fim?.split(
                                '-',
                              )[1],
                            ) +
                            ' de ' +
                            profile?.experiencia_profissional.data_fim?.split(
                              '-',
                            )[0]
                      }`}
                    </p>
                  </aside>
                </button>
              )}
              {profile?.experiencia_projetos?.nome && (
                <button>
                  <img
                    src={projeto}
                    alt={profile?.experiencia_projetos.cargo}
                  />
                  <aside>
                    <legend>{profile?.experiencia_projetos.nome}</legend>
                    <p>
                      {profile?.experiencia_projetos.cargo}
                      <br />
                      {`${toMonth(
                        profile?.experiencia_projetos.data_inicio?.split(
                          '-',
                        )[1],
                      )} de  ${
                        profile?.experiencia_projetos.data_inicio?.split('-')[0]
                      } até 
                      ${
                        profile?.experiencia_projetos.situacao ===
                        'Em andamento'
                          ? 'o momento'
                          : toMonth(
                              profile?.experiencia_projetos.data_fim?.split(
                                '-',
                              )[1],
                            ) +
                            ' de ' +
                            profile?.experiencia_projetos.data_fim?.split(
                              '-',
                            )[0]
                      }
                      `}
                    </p>
                  </aside>
                </button>
              )}
            </ExperienciasDiv>
          </ContainerScroll>

          {profile?.id && <h4>Exibir currículo completo</h4>}
        </PerfilDiv>

        <ul>
          <ProjetosSection>
            {profile?.id ? (
              (showProjectList === 1 && (
                <ul>
                  {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </ul>
              )) ||
              (showProjectList === 2 && (
                <ul>
                  {favoreteProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </ul>
              )) ||
              (showProjectList === 3 && (
                <ul>
                  {participantsProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </ul>
              )) ||
              (showProjectList === 4 && (
                <>
                  {peoplesfng.length ? (
                    <ul>
                      {peoplesfng.map((profile: IProfile) => (
                        <ProfileCard key={profile.id} profile={profile} />
                      ))}
                    </ul>
                  ) : (
                    <section>
                      <BsPeople />
                      <h2>{profile.nome} </h2>
                      <h1>Não tem nenhum seguidor</h1>
                    </section>
                  )}
                </>
              )) ||
              (showProjectList === 5 && (
                <>
                  {peoplesfng.length ? (
                    <ul>
                      {peoplesfrs.map((profile: IProfile) => (
                        <ProfileCard key={profile.id} profile={profile} />
                      ))}
                    </ul>
                  ) : (
                    <section>
                      <BsPeople />
                      <h2>{profile.nome} </h2>
                      <h1>Não segue ninguém</h1>
                    </section>
                  )}
                </>
              ))
            ) : (
              <Skeleton width="100%" height="200px" />
            )}
          </ProjetosSection>
        </ul>
      </main>
    </Page>
  )
}
export default Profiles
