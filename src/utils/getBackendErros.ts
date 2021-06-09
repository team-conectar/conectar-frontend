import { AxiosError } from 'axios'
import { ValidationError } from 'yup'
import { showToast } from '../components/Toast/Toast'

interface Errors {
  fieldName: string
  error: string
}
interface IData {
  detail: {
    message: string
    fieldName: string
  }
}
export default function getBackendErrors(err: AxiosError<IData>): Errors {
  if (err.response) {
    showToast('error', err.response.data.detail.message)

    return {
      fieldName: err.response.data.detail.fieldName,
      error: err.response.data.detail.message,
    }
  } else return { fieldName: 'aa', error: 'aa' }
}
