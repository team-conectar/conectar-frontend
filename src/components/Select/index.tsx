import { BodySelect } from './styles'
import makeAnimated from 'react-select/animated'
import React, {
  useRef,
  useEffect,
  useCallback,
  ChangeEvent,
  useState,
} from 'react'
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select'
import { useField } from '@unform/core'
import FieldText from '../FieldText'

interface Props extends SelectProps<OptionTypeBase> {
  name: string
  label?: string
  multi?: boolean
  onChange?(option: any): void
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
const Select: React.FC<Props> = ({ name, label, multi, onChange, ...rest }) => {
  const animatedComponents = makeAnimated()
  const selectRef = useRef<any>(null)
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
  }, [fieldName, multi, registerField, rest.isMulti])
  const [selectIsEmpty, setSelectIsEmpty] = useState(!rest.defaultValue)
  const handleChange = useCallback(
    (option: any) => {
      if (!multi && onChange) {
        onChange(option)
        setSelectIsEmpty(false)
      } else {
        if (
          multi ? option !== null && option.length !== 0 : option.value !== ''
        ) {
          setSelectIsEmpty(false)
        } else {
          setSelectIsEmpty(true)
        }
      }
    },
    [multi, onChange],
  )

  return (
    <BodySelect>
      <FieldText
        name={name}
        label={label}
        error={error && error}
        isEmpty={selectIsEmpty}
      >
        <ReactSelect
          inputId={fieldName}
          ref={selectRef}
          closeMenuOnSelect={true}
          components={animatedComponents}
          placeholder=""
          className="react-select-container"
          classNamePrefix="react-select"
          isMulti={multi}
          onChange={handleChange}
          options={rest.options}
          defaultValue={rest.defaultValue}
        />
      </FieldText>
    </BodySelect>
  )
}

export default Select
