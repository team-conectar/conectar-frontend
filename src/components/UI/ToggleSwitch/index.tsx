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

const ToogleSwitch: React.FC<InputProps> = ({ name, options, ...rest }) => {
  const inputRefs = useRef<HTMLInputElement[]>([])
  const { fieldName, registerField, defaultValue = [] } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        const checked = refs.find(ref => ref.checked)
        return rest.type === 'radio'
          ? checked
            ? checked?.value
            : ''
          : refs.filter(ref => ref.checked).map(ref => ref.value)
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(ref => {
          ref.checked = false
        })
      },
      setValue: (refs: HTMLInputElement[], value) => {
        if (rest.type === 'radio') {
          const item = refs.find(ref => ref.value === value)
          if (item) {
            item.checked = true
          }
        } else {
          refs.forEach(ref => {
            if (value.includes(ref.id)) {
              ref.checked = true
            }
          })
        }
      },
    })
  }, [defaultValue, fieldName, registerField, rest.type])
  return (
    <BodySwitch>
      {options.map((option, index) => (
        <label htmlFor={option.id} key={option.id}>
          {option.label}
          <input
            className="checkbox"
            defaultChecked={
              rest.type === 'radio'
                ? defaultValue === option.id
                : defaultValue.find((dv: string) => dv === option.id)
            }
            ref={ref => {
              inputRefs.current[index] = ref as HTMLInputElement
            }}
            name={fieldName}
            value={option.value}
            type={rest.type || 'checkbox'}
            id={option.id}
            {...rest}
          />
          <label htmlFor={option.id} className="switch" />
        </label>
      ))}
    </BodySwitch>
  )
}

export default ToogleSwitch
