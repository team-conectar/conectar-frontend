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
    denyButtonColor: `${rest.denyButtonColor? rest.denyButtonColor : `var(--red)`} `,
    cancelButtonText: `${rest.cancelButtonText? rest.cancelButtonText: "Cancelar"}`,
    denyButtonText: `${rest.denyButtonText? rest.denyButtonText: "Não"}`,
    customClass: {
      confirmButton: 'confirmButtonSweet',
      cancelButton: 'cancelButtonSweet',
      denyButton: 'denyButtonSweet',
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
