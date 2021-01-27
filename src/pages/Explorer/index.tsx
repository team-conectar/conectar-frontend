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
import ProjectCard from '../../components/ProjectCard'
import ProfileCard from '../../components/ProfileCard'
import LinksCard from '../../components/LinksCard'
import SuccessfulCreatorsCard from '../../components/SuccessfulCreatorsCard'

const Explorer: React.FC = () => {
  const { loading, isAuthenticated } = useContext(Context)

  return (
    <Fragment>
      <NavBar pageIsExplorar />
      <Page>
        <ProfileCard />

        <ul>
          <ProjectCard />

          <ProjectCard />
        </ul>
        <LinksCard />
        <SuccessfulCreatorsCard />
      </Page>
    </Fragment>
  )
}
export default Explorer
