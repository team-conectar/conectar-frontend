import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useField } from '@unform/core'
import { BodyInput } from '../Input/styles'
import FieldText from '../FieldText'
import ReactInputMask, { Props } from 'react-input-mask'
interface InputProps extends Props {
  name: string
  label?: string
  subLabel?: string
  pathSubLabel?: string
  type?: string
}
/**
 * This component receives text in your field whit a possibility of masking
 *
 * @component
 * @param {string} name is the name on the form data
 * @param {string} label is the title that is displayed above the component
 * @param {string} subLabel is a link for redirecting to the pathSubLabel
 * @param {string} pathSubLabel is the url of link subLabel
 * @param {string | RegExp} mask is the expression for the masking
 * @example
 * return (
 *   <InputMask  type="tel"  name="telefone"  label="Celular"  mask="(99) 99999-9999 "/>
 * )
 */
const InputMask: React.FC<InputProps> = ({
  name,
  label,
  subLabel,
  pathSubLabel,
  ...rest
}) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value)
      },
      clearValue(ref: any) {
        ref.setInputValue('')
      },
    })
  }, [fieldName, registerField])
  const [inputIsEmpty, setInputIsEmpty] = useState(
    !rest.defaultValue && rest.defaultValue !== '',
  )
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '' || rest.defaultValue !== '') {
      setInputIsEmpty(false)
    } else setInputIsEmpty(true)
  }, [])
  return (
    <BodyInput>
      <FieldText
        name={name}
        label={label}
        error={error && error}
        isEmpty={inputIsEmpty}
        subLabel={subLabel}
        pathSubLabel={pathSubLabel}
      >
        <ReactInputMask
          onChange={handleChange}
          ref={inputRef}
          defaultValue={defaultValue}
          type="text"
          id={fieldName}
          maskChar=""
          {...rest}
        />
      </FieldText>
    </BodyInput>
  )
}

export default InputMask
