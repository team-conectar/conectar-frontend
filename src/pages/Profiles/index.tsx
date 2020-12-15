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
import { Page, ButtonList } from './styles'
import { BodyModalDefault } from '../../components/Modal/styles'
import edit from '../../assets/icon/editar.svg'
import trash from '../../assets/icon/lixeira.svg'
// import clone from '../../assets/icon/clone.svg'
import config from '../../assets/icon/config.svg'
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
import ProjectCards from '../../components/ProjectCards'

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

function Projects() {
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
  const profile_id = useParams<routeParms>().id

  useEffect(() => {
    const res = api
      .get(`/api/v1/pessoas/${profile_id}`)
      .then(response => {
        setProfile(response.data)
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail
      })
    console.log(res)
  }, [profile_id])

  return (
    <Page>
      <NavBar />
      <main>
        <header>
          <aside>
            <img src={capa_id} alt="" />
            <img src={capa_al} alt="" />
            <img src={capa_co} alt="" />
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
        <div>
          <section className="info-perfil">
            <img
              src="https://upload.wikimedia.org/wikipedia/pt/thumb/4/4d/Clube_do_Remo.png/120px-Clube_do_Remo.png"
              alt=""
            />
            <h2>{profile.nome}</h2>
            <p>@{profile.usuario}</p>
            <Button theme="primary-green">SEGUIR</Button>
            <aside>
              <img src={id} alt="" />
              <img src={al} alt="" />
              <img src={co} alt="" />
            </aside>

            <h3>Áreas de atuação</h3>
            <ul>
              {profile.areas?.map(area => (
                <li key={area.id}>{area.descricao}</li>
              ))}
            </ul>
            <h3>Habilidades e ferreamentas de domínio</h3>
            <ul>
              {profile.habilidades?.map(habilidade => (
                <li key={habilidade.id}>{habilidade.nome}</li>
              ))}
            </ul>
            <h4>Exibir currículo completo</h4>
          </section>
          <section className="projetos">
            {!showFavoritesList ? (
              <ul>
                <ProjectCards />
                <ProjectCards />
              </ul>
            ) : (
              <ul></ul>
            )}
          </section>
        </div>
      </main>
    </Page>
  )
}
export default Projects
