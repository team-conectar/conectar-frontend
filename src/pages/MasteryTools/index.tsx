import React, { useCallback, useRef } from 'react'
import { BodyMasteryTools } from './styles'
import Button from '../../components/Button'
import { useHistory } from 'react-router-dom'
import SelectTool from '../../components/SelectTools'
import { AxiosError } from 'axios'
import api from '../../services/api'
import Logged from '../../components/Logged'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import getValidationErrors from '../../utils/getValidationErrors'

const MasteryTools: React.FC = () => {
  const history = useHistory()
  const formRef = useRef<FormHandles>(null)
  const handleSubmit = useCallback(
    async (formData: { habilidades: string[] }) => {
      console.log(formData)
      try {
        // Remove all previogeus errors
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          habilidades: Yup.array()
            .min(1, 'Seleciono pelo menos 1 item')
            .max(5, 'Seleciono no máximo 5'),
        })
        await schema.validate(formData, {
          abortEarly: false,
        })
        // Validation passed
        const data = {
          habilidades: formData.habilidades.map(habilidade => {
            return { nome: habilidade }
          }),
        }
        console.log(data)

        const res = await api
          .put('/api/v1/pessoas', data, {
            withCredentials: true,
          })
          .then(() => {
            history.push('/experiencias-do-usuario')
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
    <BodyMasteryTools onSubmit={handleSubmit} ref={formRef}>
      <Logged />
      <div className="area-central container">
        <h1>Selecione suas habilidades e ferramentas de domínio</h1>
        <SelectTool name="habilidades" />
      </div>
      <footer>
        <Button
          theme="primary"
          onClick={() => {
            history.push('/experiencias-do-usuario')
          }}
        >
          Pular
        </Button>
        <Button theme="primary" type="submit">
          Continuar
        </Button>
      </footer>
    </BodyMasteryTools>
  )
}
export default MasteryTools
