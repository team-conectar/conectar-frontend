import { ValidationError } from 'yup'
import { showToast } from '../components/Toast/Toast'

interface Errors {
  [key: string]: string
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {}
  showToast(
    'error',
    err.inner.length > 1
      ? 'Informe os campos corretamente'
      : err.inner[0].message,
  )
  err.inner.forEach(error => {
    validationErrors[error.path] = error.message
  })

  return validationErrors
}
