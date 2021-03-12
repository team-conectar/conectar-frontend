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
import { Page } from './styles'

import { Context } from '../../context/AuthContext'
import NavBar from '../../components/UI/NavBar'
import ProjectCard, { IProject } from '../../components/ProjectCard'
import ProfileCard from '../../components/ProfileCard'
import LinksCard from '../../components/LinksCard'
import SuccessfulCreatorsCard from '../../components/SuccessfulCreatorsCard'
import api from '../../services/api'
import { AxiosError } from 'axios'
import Skeleton from 'react-loading-skeleton'
import { useHistory, useParams } from 'react-router'
import SearchInput from '../../components/UI/SearchInput'
import { ProjectType } from '../CreateProject'
import noProject from '../../assets/image/sem_projetos.svg'
interface IParmsProps {
  for?: 'projeto' | 'pessoa' | 'area'
  attribute?: 'area' | 'habilidade' | 'objetivo' | 'nome'
  key?: string
}
const Explorer: React.FC = () => {
  const parms = useParams<IParmsProps>()
  console.log(parms)
  const [projects, setProjects] = useState<IProject[]>([] as IProject[])
  const [peoples, setPeoples] = useState<IProject[]>([] as IProject[])

  useEffect(() => {
    setProjects([])
    setPeoples([])
    if (parms.key) {
      api
        .get(`/api/v1/${parms.for}/${parms.attribute}/${parms.key}`)
        .then(response => {
          parms.for === 'projeto' && setProjects(response.data)
          parms.for === 'pessoa' && setProjects(response.data)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        })
    }
  }, [parms])
  return (
    <Fragment>
      <NavBar />
      <Page>
        <SearchInput defaultValue={parms.key} />
        {projects ? (
          <ul>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} hiddeOwner />
            )) || <Skeleton width="100%" height="200px" />}
          </ul>
        ) : (
          <aside>
            <h2>Nenhum projeto encontado :(</h2>
            <img src={noProject} />
          </aside>
        )}
      </Page>
    </Fragment>
  )
}
export default Explorer
