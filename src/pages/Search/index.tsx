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
import { Page, Tag } from './styles'

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
import { useLoggedUser } from '../../context/LoggedUserContext'
import { AreaType } from '../../components/UI/SelectArea'
import { ToolType } from '../../components/UI/SelectTools'
interface IParmsProps {
  for?: 'projeto' | 'pessoa'
  attribute?: 'area' | 'habilidade' | 'objetivo' | 'nome'
  key?: string
}
interface IFilterAreaOrTool {
  type: 'area' | 'habilidade'
  attribute: string
}
const Explorer: React.FC = () => {
  const parms = useParams<IParmsProps>()
  const user = useLoggedUser()
  const [filtredProjects, setFiltredProjects] = useState<IProject[]>(
    [] as IProject[],
  )
  const [projects, setProjects] = useState<IProject[]>([] as IProject[])
  const [peoples, setPeoples] = useState<IProject[]>([] as IProject[])
  const [filterAreaOrTool, setFilterAreaOrTool] = useState<IFilterAreaOrTool>()
  useEffect(() => {
    setProjects([])
    setPeoples([])
    if (parms.key) {
      api
        .get(`/api/v1/${parms.for}/${parms.attribute}/${parms.key}`)
        .then(response => {
          if (parms.for === 'projeto') {
            setProjects(response.data)
            setFiltredProjects(response.data)
          } else if (parms.for === 'pessoa') {
            setPeoples(response.data)
          }
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        })
    } else {
      api
        .get(`/api/v1/${parms.for}s`)
        .then(response => {
          if (parms.for === 'projeto') {
            setFiltredProjects(response.data)
            setProjects(response.data)
          } else if (parms.for === 'pessoa') setPeoples(response.data)
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail
        })
    }
  }, [parms, filterAreaOrTool])
  useEffect(() => {
    if (filterAreaOrTool) {
      if (parms.for === 'projeto') {
        setFiltredProjects(projects)
        setFiltredProjects(
          filtredProjects?.filter(project => {
            return filterAreaOrTool?.type === 'habilidade'
              ? project.habilidades?.some(
                  tool => tool.nome === filterAreaOrTool.attribute,
                )
              : project.areas?.some(
                  area => area.descricao === filterAreaOrTool.attribute,
                )
          }),
        )
      } else if (parms.for === 'pessoa') {
      }
    }
  }, [filterAreaOrTool, parms.for])
  return (
    <Fragment>
      <NavBar />
      <Page>
        <SearchInput defaultValue={parms.key} />
        {(user.areas || user.habilidades) && <p>selecione uma para filtrar</p>}
        <section>
          {user.areas?.map(area => (
            <Tag
              key={area.id}
              onClick={() =>
                filterAreaOrTool?.attribute === area.descricao
                  ? setFilterAreaOrTool({} as IFilterAreaOrTool)
                  : setFilterAreaOrTool({
                      type: 'area',
                      attribute: area.descricao,
                    })
              }
              isSelected={filterAreaOrTool?.attribute === area.descricao}
            >
              {area.descricao}
            </Tag>
          ))}
          {user.habilidades?.map(habilidade => (
            <Tag
              key={habilidade.id}
              onClick={() =>
                filterAreaOrTool?.attribute === habilidade.nome
                  ? setFilterAreaOrTool({} as IFilterAreaOrTool)
                  : setFilterAreaOrTool({
                      type: 'habilidade',
                      attribute: habilidade.nome,
                    })
              }
              isSelected={filterAreaOrTool?.attribute === habilidade.nome}
            >
              {habilidade.nome}
            </Tag>
          ))}
        </section>
        {filtredProjects ? (
          <ul>
            {filtredProjects.map(project => (
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
