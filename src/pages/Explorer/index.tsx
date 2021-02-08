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
import NavBar from '../../components/NavBar'
import ProjectCard, { IProject } from '../../components/ProjectCard'
import ProfileCard from '../../components/ProfileCard'
import LinksCard from '../../components/LinksCard'
import SuccessfulCreatorsCard from '../../components/SuccessfulCreatorsCard'
import api from '../../services/api'
import { AxiosError } from 'axios'

const Explorer: React.FC = () => {
  const { loading, isAuthenticated } = useContext(Context)
  const [projects, setProjects] = useState<IProject[]>([] as IProject[])
  useEffect(() => {
    api
      .get(`/api/v1/projetos?visibilidade=true`)
      .then(response => {
        setProjects(response.data)
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail
      })
  }, [])
  return (
    <Fragment>
      <NavBar pageIsExplorar />
      <Page>
        <ProfileCard />

        <ul>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
        <LinksCard />
        <SuccessfulCreatorsCard />
      </Page>
    </Fragment>
  )
}
export default Explorer
