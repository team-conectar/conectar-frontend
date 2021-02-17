import React, { useState } from 'react'
import { BodyProfileFeatures } from './styles'
import Button from '../../components/Button'
import { useHistory } from 'react-router-dom'
import AcademicExperiences from './experiences/AcademicExperiences'
import ProfessionalExperiences from './experiences/ProfessionalExperiences'
import ProjectExperiences from './experiences/ProjectExperiences'
import Modal from '../../components/Modal'
import Login from '../../components/Login'

import Logged from '../../components/Logged'

function ProfileFeatures() {
  function sla() {
    console.log('ḧello world')
  }
  const history = useHistory()
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <BodyProfileFeatures>
      <Logged />
      <div className="area-central container">
        <h1>Nos conte sua experiência</h1>
        <AcademicExperiences />
        <ProfessionalExperiences />
        <ProjectExperiences />
        <footer>
          <Button theme="primary" onClick={() => setShowModal(true)}>
            Pular
          </Button>{' '}
          <Button onClick={() => history.push('/')} theme="primary">
            Continuar
          </Button>
        </footer>
      </div>
    </BodyProfileFeatures>
  )
}
export default ProfileFeatures
