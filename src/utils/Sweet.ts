import Swal, { SweetAlertCustomClass } from 'sweetalert2'
import { GlobalStyle } from '../assets/style/global'

interface SweetAlert {
  title?: string
  text?: string
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question'
  textButton?: string
  deleted?: boolean
}

export default async function Sweet({
  title,
  text,
  icon,
  textButton,
  deleted,
}: SweetAlert) {
  if (deleted) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: textButton,
      confirmButtonColor: `var(--gray)`,
      customClass: {
        confirmButton: 'confirmButtonSweet',
      },
    })
    return true
  } else {
    return await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: textButton,
      confirmButtonColor: `var(--green)`,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: `var(--gray)`,
      customClass: {
        confirmButton: 'confirmButtonSweet',
        cancelButton: 'cancelButtonSweet',
      },
    }).then(result => {
      console.log(result)
      return result.isConfirmed
    })
  }
}
