import React, { useState } from 'react'
import { BodyProfileFeatures } from './styles'
import Button from '../../components/UI/Button'
import { useHistory } from 'react-router-dom'
import AcademicExperiences from './experiences/AcademicExperiences'
import ProfessionalExperiences from './experiences/ProfessionalExperiences'
import ProjectExperiences from './experiences/ProjectExperiences'

const ProfileFeatures: React.FC = () => {
  const history = useHistory()

  return (
    <BodyProfileFeatures>
      <div className="area-central container experiencias-do-usuario">
        <h1>Nos conte sua experiência</h1>
        <AcademicExperiences />
        <ProfessionalExperiences />
        <ProjectExperiences />
        <footer>
          <Button
            theme="secondary"
            onClick={() => history.push('/areas-de-atuacao')}
          >
            Pular
          </Button>{' '}
          <Button
            onClick={() => history.push('/areas-de-atuacao')}
            theme="primary"
          >
            Continuar
          </Button>
        </footer>
      </div>
    </BodyProfileFeatures>
  )
}
export default ProfileFeatures
