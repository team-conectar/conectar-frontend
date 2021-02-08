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
import Button from '../../components/Button'
import api from '../../services/api'
import { AxiosError } from 'axios'
import SelectArea, { AreaType } from '../../components/SelectArea'
import SelectTool, { ToolType } from '../../components/SelectTools'
import Modal from '../../components/Modal'
import { Context } from '../../context/AuthContext'
import NavBar from '../../components/NavBar'
import ProjectCard, { IProject } from '../../components/ProjectCard'

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
}
/**
 * @constructor
 * @content is the iten of the modal
 */

const Profiles: React.FC = () => {
  const { loading, isAuthenticated } = useContext(Context)
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
  const history = useHistory()
  const [showFavoritesList, setShowFavoritesList] = useState<boolean>(false)
  const [profile, setProfile] = useState<ProfileType>({} as ProfileType)
  const [projects, setProjects] = useState<IProject[]>([] as IProject[])
  const profile_id = useParams<routeParms>().id

  useEffect(() => {
    api
      .get(`/api/v1/pessoas/${profile_id}`)
      .then(response => {
        setProfile(response.data)
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail
      })
    api
      .get(`/api/v1/projetos?pessoa_id=${profile_id}&visibilidade=true`)
      .then(response => {
        setProjects(response.data)
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail
      })
  }, [profile_id])

  return (
    <Page>
      {/* <NavBar /> */}
      <main>
        <header>
          <aside>
            {profile.idealizador && <img src={capa_id} alt="" />}
            {profile.aliado && <img src={capa_al} alt="" />}
            {profile.colaborador && <img src={capa_co} alt="" />}
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
          <PerfilDiv>
            <PerfilMain>
              <figure>
                <img
                  src="https://upload.wikimedia.org/wikipedia/pt/thumb/4/4d/Clube_do_Remo.png/120px-Clube_do_Remo.png"
                  alt=""
                />
                <figcaption>
                  <h2>{profile.nome}</h2>
                  <p>@{profile.usuario}</p>
                </figcaption>
              </figure>
              <section>
                <Button theme="green">SEGUIR</Button>
                <aside>
                  {profile.idealizador && <img src={id} alt="" />}
                  {profile.aliado && <img src={al} alt="" />}
                  {profile.colaborador && <img src={co} alt="" />}
                </aside>
              </section>
            </PerfilMain>

            <ul>
              <h3>Áreas de atuação</h3>
              {profile.areas?.map(area => (
                <li key={area.id}>{area.descricao}</li>
              ))}
              <h3>Habilidades e ferramentas de domínio</h3>
              {profile.habilidades?.map(habilidade => (
                <li key={habilidade.id}>{habilidade.nome}</li>
              ))}
            </ul>
            <ExperienciasDiv>
              <button>
                <img src={educação} alt="" />
                <aside>
                  <legend>UTFPR</legend>
                  <p>
                    Engenharia de Software <br />
                    Em andamento
                  </p>
                </aside>
              </button>
              <button>
                <img src={trabalho} alt="" />
                <aside>
                  <legend>Maynart</legend>
                  <p>
                    Digital Artist | Freelancer <br />
                    Fevereiro de 2018 - Até o momento
                  </p>
                </aside>
              </button>
              <button>
                <img src={projeto} alt="" />
                <aside>
                  <legend>Conectar</legend>
                  <p>
                    UTFPR | UI/UX Designer
                    <br />
                    Projeto em andamento
                    <br />
                    Agosto de 2020 - Até o momento
                  </p>
                </aside>
              </button>
            </ExperienciasDiv>

            <h4>Exibir currículo completo</h4>
          </PerfilDiv>
        </header>
        <div>
          <ProjetosSection>
            {!showFavoritesList ? (
              <ul>
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </ul>
            ) : (
              <ul></ul>
            )}
          </ProjetosSection>
        </div>
      </main>
    </Page>
  )
}
export default Profiles
