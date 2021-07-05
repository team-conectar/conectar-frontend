import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2'

/**
 * 
 * @param SweetAlertOptions 
 * @returns Promise<SweetAlertResult>
 * @example 
 * Alert({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'
  })
 */
export default async function Alert({
  ...rest
}: SweetAlertOptions): Promise<SweetAlertResult> {
  return await Swal.fire({
    ...rest,
    confirmButtonColor: `var(--green)`,
    cancelButtonColor: `var(--gray)`,
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'confirmButtonSweet',
      cancelButton: 'cancelButtonSweet',
    },
  })
    .then(result => {
      console.log(result)
      return result
    })
    .catch(error => {
      return error
    })
}
