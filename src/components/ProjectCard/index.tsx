import React, { InputHTMLAttributes, useEffect, useState } from 'react'
import { BodyCard, ProjectInfo, UserInfo } from './styles'
import { Link } from 'react-router-dom'
import api from '../../services/api'
interface IPessoa {
  foto_perfil: string
  usuario: string
  nome: string
  id: number
}
export interface IProject {
  nome: string
  descricao: string
  visibilidade: true
  objetivo: string
  pessoa_id: number
  id: string
  areas: [
    {
      descricao: string
      id: number
    },
  ]
  habilidades: [
    {
      nome: string
      id: number
    },
  ]
}
interface IProjectCardProps {
  project: IProject
}
const ProjectCard: React.FC<IProjectCardProps> = ({ project }) => {
  const [user, setUser] = useState<IPessoa>()
  useEffect(() => {
    api.get(`/api/v1/pessoas/${project.pessoa_id}`).then(response => {
      setUser(response.data)
    })
  }, [project.pessoa_id])
  return (
    <BodyCard>
      <Link to={`/profiles/${user?.id}`}>
        <img
          src="https://upload.wikimedia.org/wikipedia/pt/thumb/4/4d/Clube_do_Remo.png/120px-Clube_do_Remo.png"
          alt={user?.nome}
        />
      </Link>
      <UserInfo>
        <Link to={`/profiles/${user?.id}`}>
          <h2>{user?.nome}</h2>
          <p>@{user?.usuario}</p>
        </Link>
      </UserInfo>
      <div>
        <ProjectInfo>
          <aside>
            <Link to={`/projects/${project.id}`}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9foYOCHad0GC_wSsRh3q3FGuXmjidN0Gq1g&usqp=CAU"
                alt={project.nome}
              />
            </Link>
            <section>
              <Link to={`/projects/${project.id}`}>{project.nome}</Link>
              <ul>
                {project.habilidades?.map(habilidade => (
                  <li key={habilidade.id}>{habilidade.nome}</li>
                ))}
                {project.areas?.map(area => (
                  <li key={area.id}>{area.descricao}</li>
                ))}
              </ul>
              <p>publicado em </p>
            </section>
          </aside>
          <p>{project.descricao}</p>
        </ProjectInfo>
        <aside>
          <button>Favoritar</button>
          <button>Tenho interesse</button>
        </aside>
      </div>
    </BodyCard>
  )
}
export default ProjectCard
