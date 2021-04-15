import React, {
  useEffect,
  useRef,
  InputHTMLAttributes,
  ChangeEvent,
  useCallback,
  useState,
} from 'react'
import { useField } from '@unform/core'
import { BodyInput } from './styles'
import { Link } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'
import FieldText from '../FieldText'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  subLabel?: string
  pathSubLabel?: string
}
/**
 * This component receives text in your field
 *
 * @component
 * @param {string} name is the name on the form data
 * @param {string} label is the title that is displayed above the component
 * @param {string} subLabel is a link for redirecting to the pathSubLabel
 * @param {string} pathSubLabel is the url of link subLabel
 * @example
 * return (
 *   <Input name="senha" type="password" label="Senha" subLabel="Esqueceu a senha?" pathSubLabel="/alterar-senha" />
 * )
 */
const Input: React.FC<InputProps> = ({
  name,
  label,
  subLabel,
  pathSubLabel,
  ...rest
}) => {
  const inputRef = useRef<any>(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  const [inputIsEmpty, setInputIsEmpty] = useState(true)
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      setInputIsEmpty(false)
    } else {
      setInputIsEmpty(true)
    }
  }, [])
  useEffect(() => {
    setInputIsEmpty(!rest.defaultValue && rest.defaultValue !== '')
  }, [rest])

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
        <input
          onChange={handleChange}
          ref={inputRef}
          defaultValue={defaultValue}
          type="text"
          id={fieldName}
          {...rest}
        />
      </FieldText>
    </BodyInput>
  )
}

export default Input
