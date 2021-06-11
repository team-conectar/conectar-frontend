import React, { InputHTMLAttributes, useEffect, useState } from 'react'
import { BodyCard, ProjectInfo, UserInfo } from './styles'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { AreaType } from '../UI/SelectArea'
import { ToolType } from '../UI/SelectTools'
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
  areas: AreaType[]
  habilidades: ToolType[]
}
interface IProjectCardProps {
  project: IProject
  hiddeOwner?: true
}
const ProjectCard: React.FC<IProjectCardProps> = ({ project, hiddeOwner }) => {
  const [user, setUser] = useState<IPessoa>()
  useEffect(() => {
    api.get(`/api/v1/pessoas/${project.pessoa_id}`).then(response => {
      setUser(response.data)
    })
  }, [project.pessoa_id])
  return (
    <BodyCard>
      {!hiddeOwner && (
        <>
          <Link to={`/perfil/${user?.id}`}>
            <img
              src="https://upload.wikimedia.org/wikipedia/pt/thumb/4/4d/Clube_do_Remo.png/120px-Clube_do_Remo.png"
              alt={user?.nome}
            />
          </Link>
          <UserInfo>
            <Link to={`/perfil/${user?.id}`}>
              <h2>{user?.nome}</h2>
              <p>@{user?.usuario}</p>
            </Link>
          </UserInfo>
        </>
      )}
      <div>
        <ProjectInfo>
          <aside>
            <Link to={`/projeto/${project.id}`}>
              <img src={`https://conectar.s3.sa-east-1.amazonaws.com/uploads/${project.foto_capa}`} alt={project.nome} />
            </Link>
            <section>
              <Link to={`/projeto/${project.id}`}>{project.nome}</Link>
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
