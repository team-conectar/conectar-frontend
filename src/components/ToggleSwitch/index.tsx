import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import { BodySwitch } from './styles'

interface IOptionsCheckbox {
  id: string
  value: string
  label?: string
}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  options: Array<IOptionsCheckbox>
}

const Input: React.FC<InputProps> = ({ name, options, ...rest }) => {
  const inputRefs = useRef<HTMLInputElement[]>([])
  const { fieldName, registerField, defaultValue = [] } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter(ref => ref.checked !== null).map(ref => ref.value)
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(ref => {
          ref.checked = false
        })
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true
          }
        })
      },
    })
  }, [defaultValue, fieldName, registerField])
  return (
    <BodySwitch>
      {options.map((option, index) => (
        <label htmlFor={option.id} key={option.id}>
          {option.label}
          <input
            className="checkbox"
            defaultChecked={defaultValue.find((dv: string) => dv === option.id)}
            ref={ref => {
              inputRefs.current[index] = ref as HTMLInputElement
            }}
            value={option.value}
            type="checkbox"
            id={option.id}
            {...rest}
          />
          <label htmlFor={option.id} className="switch" />
        </label>
      ))}
    </BodySwitch>
  )
}

export default Input
