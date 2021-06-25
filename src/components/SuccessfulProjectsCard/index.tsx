import React, {
  InputHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react'
import { BodyCard, ProfileLink } from './styles'
import { Link, useHistory } from 'react-router-dom'
import id from '../../assets/icon/id.svg'
import al from '../../assets/icon/al.svg'
import twoUsers from '../../assets/icon/twoUsers.svg'
import { Context } from '../../context/AuthContext'
import { AxiosError } from 'axios'
import { AreaType } from '../UI/SelectArea'
import { ToolType } from '../UI/SelectTools'
import api from '../../services/api'
import { IProject } from '../ProjectCard'

interface IPessoa {
  foto_perfil: string
  usuario: string
  nome: string
  id: number
}

const SuccessfulProjectsCard: React.FC = () => {
  const history = useHistory()
  const [users, setUsers] = useState<IPessoa[]>([])
  const [projects, setProjects] = useState<IProject[]>([])

  useEffect(() => {
    const res = api
      .get(`/api/v1/projeto/destaque/2`)
      .then(response => {
        setProjects(response.data)
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail
      })
    console.log(res)
  }, [])

  useEffect(() => {
    projects.map(project => {
      api.get(`/api/v1/pessoas/${project.pessoa_id}`).then(response => {
        setUsers(user => user.concat([response.data]))
      })
    })
    setUsers(users.reverse())
  }, [projects])

  return (
    <BodyCard>
      <h2>Projetos de sucesso</h2>
      {projects?.map((project, index) => (
        <ProfileLink key={project.id} to={`/projeto/${project.id}`}>
          <img
            src={`https://conectar.s3.sa-east-1.amazonaws.com/uploads/${project.foto_capa}`}
            alt=""
          />
          <aside>
            <h2>{project.nome}</h2>
            <p>@{users[index]?.usuario}</p>
          </aside>
        </ProfileLink>
      ))}

      <button
        onClick={() => {
          history.push('/pesquisar/projeto/nome/')
        }}
      >
        <img src={twoUsers} alt="botao encontrar projetos" /> Encontre os que
        você conhece
      </button>
    </BodyCard>
  )
}
export default SuccessfulProjectsCard
