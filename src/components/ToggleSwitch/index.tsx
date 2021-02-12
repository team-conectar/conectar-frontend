import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import { BodySwitch } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRefs = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, defaultValue = [] } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (ref: HTMLInputElement) => {
        return ref.checked ? ref.value : ''
      },
      clearValue: (ref: HTMLInputElement) => {
        ref.checked = false
      },
      setValue: (ref: HTMLInputElement, value: string) => {
        if (value === ref.value) {
          ref.checked = true
        }
      },
    })
  }, [defaultValue, fieldName, registerField])
  return (
    <BodySwitch>
      <label htmlFor={fieldName}>{label}</label>

      <input
        ref={inputRefs}
        type="checkbox"
        id={fieldName}
        className="checkbox"
        defaultValue={defaultValue}
        {...rest}
      />
      <label htmlFor={fieldName} className="switch"></label>
    </BodySwitch>
  )
}

export default Input
