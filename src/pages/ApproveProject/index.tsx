import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { BodyApproveProject } from './styles'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Button from '../../components/Button'
import ToggleSwitch from '../../components/ToggleSwitch'
import { useHistory } from 'react-router'
import { useDropzone } from 'react-dropzone'
import SelectArea from '../../components/SelectArea'
import SelectTool from '../../components/SelectTools'
import axios, { AxiosError } from 'axios'
import NavBar from '../../components/NavBar'
import ProjectCard, { IProject } from '../../components/ProjectCard'
import api from '../../services/api'
import ProfileCard from '../../components/ProfileCard'
import LinksCard from '../../components/LinksCard'
import SuccessfulCreatorsCard from '../../components/SuccessfulCreatorsCard'
import VacancieCard from '../../components/VacancieCard'
import { useParams } from 'react-router-dom'
interface routeParms {
  id: string
}
const ApproveProject: React.FC = () => {
  const project_id = useParams<routeParms>().id
  const [project, setProject] = useState<IProject>({} as IProject)
  useEffect(() => {
    api
      .get(`/api/v1/projeto/${project_id}`)
      .then(response => {
        setProject(response.data)
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail
      })
  }, [project_id])
  return (
    <>
      <NavBar />
      <BodyApproveProject>
        <ProfileCard />
        <main>
          <section>
            <img src="" alt="" />
            <h1>Confira as respostas dos candidatos aos convites enviados</h1>
          </section>
          <section>
            <ProjectCard project={project} />
          </section>
          <section>
            <ul>
              <VacancieCard />
              <VacancieCard />
              <VacancieCard />
              <VacancieCard />
              <VacancieCard />
            </ul>
            <Button theme="green">Enviar convite</Button>
          </section>
        </main>
        <LinksCard />
        <SuccessfulCreatorsCard />
      </BodyApproveProject>
    </>
  )
}
export default ApproveProject
