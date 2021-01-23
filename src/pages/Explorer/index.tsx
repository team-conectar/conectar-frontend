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

const Explorer: React.FC = () => {
  const { loading, isAuthenticated } = useContext(Context)

  return (
    <Fragment>
      <NavBar pageIsExplorar />
      <Page>
        <ProfileCard />

        <ul>
          <li>
            <ProjectCard />
          </li>
        </ul>
        <LinksCard />
      </Page>
    </Fragment>
  )
}
export default Explorer
