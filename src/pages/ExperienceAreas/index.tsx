import React, {
  useState,
  useEffect,
  useRef,
  FormEvent,
  useCallback,
} from 'react'
import { BodyExperienceAreas } from './styles'
import Button from '../../components/Button'
import { useHistory } from 'react-router-dom'
import SelectArea, { AreaType } from '../../components/SelectArea'
import Logged from '../../components/Logged'

import axios, { AxiosError } from 'axios'
import api from '../../services/api'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import getValidationErrors from '../../utils/getValidationErrors'

const ExperienceAreas: React.FC = () => {
  const history = useHistory()
  const formRef = useRef<FormHandles>(null)
  const handleSubmit = useCallback(
    async (formData: { areas: string[] }) => {
      console.log(formData)
      try {
        // Remove all previogeus errors
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          areas: Yup.array()
            .min(1, 'Seleciono pelo menos 1 área')
            .max(5, 'Seleciono no máximo 5'),
        })
        await schema.validate(formData, {
          abortEarly: false,
        })
        // Validation passed
        const res = await api
          .put('/api/v1/pessoas', formData, {
            withCredentials: true,
          })
          .then(() => {
            history.push('/masterytools')
          })
          .catch((err: AxiosError) => {
            return err?.response?.data.detail
          })
        console.log(res)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }
      }
    },
    [history],
  )

  return (
    <BodyExperienceAreas onSubmit={handleSubmit} ref={formRef}>
      <Logged />
      <div className="area-central container">
        <h1>Selecione até 5 áreas de atuação de seu conhecimento</h1>
        <SelectArea defaultValue={['striasdng', 'outro']} name="areas" />
      </div>
      <footer>
        <Button
          theme="yellowG"
          onClick={() => {
            history.push('/masterytools')
          }}
        >
          Pular
        </Button>
        <Button type="submit" theme="yellow">
          Continuar
        </Button>
      </footer>
    </BodyExperienceAreas>
  )
}
export default ExperienceAreas
