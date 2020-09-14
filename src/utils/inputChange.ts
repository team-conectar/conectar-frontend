import { ChangeEvent } from 'react';

export function inputChange(event: ChangeEvent<HTMLInputElement>, setFormData: Function, formData: {}) {
  /**
   * Helper function to handle inputChanges when using hooks
   * @param {ChangeEvent<HTMLInputElement>} event
   * @param {Function} setFormData
   * @param {Object} formData
   */
  const { name, value } = event.target;
  setFormData({...formData, [name]: value });
}