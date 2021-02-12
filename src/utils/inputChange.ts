import { ChangeEvent } from 'react'

export function inputChange(
  event: ChangeEvent<HTMLInputElement>,
  setFormData: Function,
  formData: {},
) {
  /**
   * Helper function to handle inputChanges when using hooks
   * @param {ChangeEvent<HTMLInputElement>} event
   * @param {Function} setFormData
   * @param {Object} formData
   */
  const target = event.target
  const name = target.name
  const value = target.type === 'checkbox' ? target.checked : target.value
  setFormData({ ...formData, [name]: value })
}
