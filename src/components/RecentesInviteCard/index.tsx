import React, { useEffect, useState } from 'react'
import { BodyCard, ProjectLink } from './styles'
import { useHistory } from 'react-router-dom'
import twoUsers from '../../assets/icon/twoUsers.svg'
import { AxiosError } from 'axios'
import { AreaType } from '../UI/SelectArea'
import { ToolType } from '../UI/SelectTools'
import api from '../../services/api'
import userDefault from '../../assets/icon/user.svg'
import { IProject } from '../ProjectCard'
import { profile } from 'console'

const RecentesInviteCard: React.FC = () => {
  const history = useHistory()
  const [projects, setProjects] = useState<IProject[]>([])
  useEffect(() => {
    const res = api
      .get(`/api/v1/pessoa_projeto/convites/3`)
      .then(response => {
        setProjects(response.data)
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail
      })
    console.log(res)
  }, [])
  return (
    <BodyCard>
      <h2>Convites recentes</h2>
      {projects.map(project => (
        <ProjectLink key={project.id} to={`/projeto/${project.id}/vagas`}>
          <img
            src={`https://conectar.s3.sa-east-1.amazonaws.com/uploads/${project.foto_capa}`}
            alt={project.nome}
          />
          <aside>
            <h2>{project.nome}</h2>
            <a>ver mais</a>
          </aside>
        </ProjectLink>
      ))}

      {/* <button
        onClick={() => {
          history.push('/pesquisar/pessoa/nome/')
        }}
      >
        ver todos os convites
      </button> */}
    </BodyCard>
  )
}
export default RecentesInviteCard
