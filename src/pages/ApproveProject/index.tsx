import React, { useState, ChangeEvent, FormEvent } from 'react'
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
import ProjectCard from '../../components/ProjectCard'
import api from '../../services/api'
import ProfileCard from '../../components/ProfileCard'
import LinksCard from '../../components/LinksCard'

const ApproveProject: React.FC = () => {
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
            <ProjectCard />
          </section>
          <section>
            <Button theme="green">Enviar convite</Button>
          </section>
        </main>
        <LinksCard />
      </BodyApproveProject>
    </>
  )
}
export default ApproveProject
