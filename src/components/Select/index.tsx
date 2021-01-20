import { BodySelect } from './styles'
import makeAnimated from 'react-select/animated'
import React, { useRef, useEffect } from 'react'
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select'
import { useField } from '@unform/core'
interface Props extends SelectProps<OptionTypeBase> {
  name: string
  label?: string
  multi?: boolean
}
/**
 * This component receives text in your field by selection
 *
 * @component
 * @param {string} name is the name on the form data
 * @param {string} label is the title that is displayed above the component
 * @param {boolean} multi optional, is the multiple selection control provided by react-select
 * @example
 * return (
 *   <Select label="Habilidade ou Ferramentas" name="habilidade" options={optionsTools} multi />
 * )
 */
const Select: React.FC<Props> = ({ name, label, multi, ...rest }) => {
  const animatedComponents = makeAnimated()
  const selectRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (multi) {
          if (!ref.state.value) {
            return []
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value)
        }
        if (!ref.state.value) {
          return ''
        }
        return ref.state.value.value
      },
    })
  }, [fieldName, registerField, rest.isMulti])
  return (
    <BodySelect>
      <label htmlFor={name}>{label}</label>

      <ReactSelect
        ref={selectRef}
        closeMenuOnSelect={true}
        components={animatedComponents}
        placeholder={defaultValue || 'Selecione'}
        className="react-select-container"
        classNamePrefix="react-select"
        isMulti={multi}
      />
      {error && <span>{error}</span>}
    </BodySelect>
  )
}

export default Select
