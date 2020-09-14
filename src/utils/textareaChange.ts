import { ChangeEvent } from 'react';

export function textareaChange(event: ChangeEvent<HTMLTextAreaElement>, setFormData: Function, formData: {}) {
  /**
   * Helper function to handle textareaChanges when using hooks
   * @param {ChangeEvent<HTMLTextAreaElement>} event
   * @param {Function} setFormData
   * @param {Object} formData
   */
  const { name, value } = event.target;
  setFormData({...formData, [name]: value });
}