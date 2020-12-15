import { ChangeEvent } from 'react'

export function selectChange(
  event: ChangeEvent<HTMLSelectElement>,
  setFormData: Function,
  formData: {},
) {
  /**
   * Helper function to handle selectChanges when using hooks
   * @param {ChangeEvent<HTMLSelectElement>} event
   * @param {Function} setFormData
   * @param {Object} formData
   */
  const { name, value } = event.target
  setFormData({ ...formData, [name]: value })
}
