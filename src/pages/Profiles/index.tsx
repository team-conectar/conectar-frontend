import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
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
import { useHistory, useParams } from 'react-router'
import Button from '../../components/UI/Button'
import api from '../../services/api'
import { AxiosError } from 'axios'
import SelectArea, { AreaType } from '../../components/UI/SelectArea'
import SelectTool, { ToolType } from '../../components/UI/SelectTools'
import Modal from '../../components/UI/Modal'
import { Context } from '../../context/AuthContext'
import NavBar from '../../components/UI/NavBar'
import ProjectCard, { IProject } from '../../components/ProjectCard'
import { AcademicType } from '../ProfileFeatures/experiences/AcademicExperiences'
import { ProfessionalType } from '../ProfileFeatures/experiences/ProfessionalExperiences'
import { IExperienceProject } from '../ProfileFeatures/experiences/ProjectExperiences'
import { toMonth } from '../../utils/dates'
import Skeleton from 'react-loading-skeleton'
import ContainerScroll from '../../components/UI/ContainerScroll'
import { FileWatcherEventKind } from 'typescript'

interface routeParms {
  id: string
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
  const [showFavoritesList, setShowFavoritesList] = useState<boolean>(false)
  const [profile, setProfile] = useState<ProfileType>({} as ProfileType)
  const [projects, setProjects] = useState<IProject[]>([] as IProject[])
  const profile_id = useParams<routeParms>().id

  function experiencia_profissional(array: ProfessionalType[]) {
    const found = array.filter(element => element.data_fim == null);
    if (!found.length) {
      const filter = array.filter((element, index) => {
        if (index == 0)
          return true
        var limpa = array[index - 1].data_fim.replace(/\-([^>])/g, '$1');
        return element.data_fim.replace(/\-([^>])/g, '$1') > limpa
      })
      console.log(filter[filter.length - 1]) // maior elemento se nao tiver nenhum em andamento
      return filter[filter.length - 1]
    }
    console.log(found[found.length - 1]); // se tiver um em andamento
    return found[found.length - 1]
  }

  function experiencia_projetos(array: IExperienceProject[]) {
    const found = array.find(element => element.data_fim == null);
    
    
    if (!found) {
      const filter = array.filter((element, index) => {
        if (index == 0)
          return true
        var limpa = array[index - 1].data_fim.replace(/\-([^>])/g, '$1');
        return element.data_fim.replace(/\-([^>])/g, '$1') > limpa
      })
      console.log(filter[filter.length - 1]) // maior elemento se nao tiver nenhum em andamento
      return filter[filter.length - 1]
    }
    console.log(found); // se tiver um em andamento
    return found
  }

  function experiencia_academica(array: AcademicType[]) {
    const found = array.find(element => element.data_fim == null);
    
    
    if (!found) {
      const filter = array.filter((element, index) => {
        if (index == 0)
          return true
        var limpa = array[index - 1].data_fim.replace(/\-([^>])/g, '$1');
        return element.data_fim.replace(/\-([^>])/g, '$1') > limpa
      })
      console.log(filter[filter.length - 1]) // maior elemento se nao tiver nenhum em andamento
      return filter[filter.length - 1]
    }
    console.log(found); // se tiver um em andamento
    return found
  }

  useEffect(() => {
    api
      .get(`/api/v1/pessoas/${profile_id}`)
      .then((response: { data: any }) => {
        console.log(response.data)
        setProfile(response.data)
        setProfile({
          ...response.data,
          experiencia_profissional: experiencia_profissional(response.data.experiencia_profissional),
          experiencia_projetos:  experiencia_projetos(response.data.experiencia_projetos),
          experiencia_academica: experiencia_academica(response.data.experiencia_academica)
        })
      })
      .catch((err: AxiosError) => {
        // if (err.code === undefined) history.push('/404')
        return err?.response?.data.detail
      })
    api
      .get(`/api/v1/projetos?pessoa_id=${profile_id}&visibilidade=true`)
      .then(response => {
        setProjects(response.data)
        setLoadingPage(false)
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail
      })
  }, [history, profile_id])

  return (
    <Page>
      <NavBar />
      <main>
        <header>
          <aside>
            {profile.idealizador && <img src={capa_id} alt="Idealizador" />}
            {profile.aliado && <img src={capa_al} alt="Aliado" />}
            {profile.colaborador && <img src={capa_co} alt="Colaborador" />}
          </aside>
          <section>
            <ButtonList
              borderBottom={!showFavoritesList}
              onClick={() => {
                setShowFavoritesList(false)
              }}
            >
              Projetos
            </ButtonList>
            <ButtonList
              borderBottom={showFavoritesList}
              onClick={() => {
                setShowFavoritesList(true)
              }}
            >
              Favoritos
            </ButtonList>
          </section>
        </header>
        <PerfilDiv>
          <PerfilMain>
            <figure>
              {/* <img
                      src="https://upload.wikimedia.org/wikipedia/pt/thumb/4/4d/Clube_do_Remo.png/120px-Clube_do_Remo.png"
                      alt=""
                    /> */}
              <Skeleton circle height="100px" width="100px" />
              <figcaption>
                <h2>{profile.nome || <Skeleton width="150px" />}</h2>
                <p>
                  {(profile.usuario && '@' + profile.usuario) || (
                    <Skeleton width="100px" />
                  )}
                </p>
              </figcaption>
            </figure>
            <section>
              {profile.id ? (
                <Button
                  theme="primary"
                  onClick={() => {
                    user.id === profile.id &&
                      history.push(`/editar-perfil/${user.id}`)
                  }}
                >
                  {user.id === profile.id ? 'EDITAR' : 'SEGUIR'}
                </Button>
              ) : (
                <Skeleton width="150px" height="30px" />
              )}
              <aside>
                {profile.idealizador && <img src={id} alt="" />}
                {profile.aliado && <img src={al} alt="" />}
                {profile.colaborador && <img src={co} alt="" />}
              </aside>
            </section>
          </PerfilMain>

          <ContainerScroll autoHeight autoHeightMax="50vh">
            <ul>
              {profile.areas?.length && <h3>Áreas de atuação</h3>}
              {profile.areas?.map(area => (
                <li key={area.id}>{area.descricao}</li>
              ))}
              {profile.habilidades?.length && (
                <h3>Habilidades e ferramentas de domínio</h3>
              )}
              {profile.habilidades?.map(habilidade => (
                <li key={habilidade.id}>{habilidade.nome}</li>
              ))}
            </ul>
            <ExperienciasDiv>
              {profile.experiencia_academica && (
                <button>
                  <img
                    src={educação}
                    alt={profile.experiencia_academica.curso}
                  />
                  <aside>
                    <legend>
                      {profile.experiencia_academica.instituicao}
                    </legend>
                    <p>
                      {profile.experiencia_academica.curso} <br />
                      {profile.experiencia_academica.situacao}
                    </p>
                  </aside>
                </button>
              )}
              {profile?.experiencia_profissional && (
                <button>
                  <img
                    src={trabalho}
                    alt={profile.experiencia_profissional.cargo}
                  />
                  <aside>
                    <legend>
                      {profile.experiencia_profissional.organizacao}
                    </legend>
                    <p>
                      {`
                      ${profile.experiencia_profissional.cargo} | 
                      ${profile.experiencia_profissional.vinculo} 
                      `}
                      <br />
                      {`${toMonth(
                        profile.experiencia_profissional.data_inicio?.split(
                          '-',
                        )[1],
                      )} de  ${
                        profile.experiencia_profissional.data_inicio?.split(
                          '-',
                        )[0]
                      } até ${ 
                        profile.experiencia_profissional.data_fim ==  null ? 'o momento': 
                        toMonth(profile.experiencia_profissional.data_fim?.split(
                          '-',
                        )[1]) + ' de ' + profile.experiencia_profissional.data_fim?.split(
                        '-',
                      )[0]
                        
                      }`}
                    </p>
                  </aside>
                </button>
              )}
              {(profile.experiencia_projetos?.nome) && (
                <button>
                  <img
                    src={projeto}
                    alt={profile.experiencia_projetos.cargo}
                  />
                  <aside>
                    <legend>{profile.experiencia_projetos.nome}</legend>
                    <p>
                      {profile.experiencia_projetos.cargo}
                      <br />
                      {`${toMonth(
                        profile.experiencia_projetos.data_inicio?.split(
                          '-',
                        )[1],
                      )} de  ${
                        profile.experiencia_projetos.data_inicio?.split(
                          '-',
                        )[0]
                      } até 
                      ${ 
                        profile.experiencia_projetos.situacao ===  'Em andamento' ? 'o momento': 
                        toMonth(profile.experiencia_projetos.data_fim?.split(
                          '-',
                        )[1]) + ' de ' + profile.experiencia_projetos.data_fim?.split(
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

          {profile.id && <h4>Exibir currículo completo</h4>}
        </PerfilDiv>

        <ul>
          <ProjetosSection>
            {profile.id ? (
              !showFavoritesList ? (
                <ul>
                  {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </ul>
              ) : (
                <ul></ul>
              )
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
