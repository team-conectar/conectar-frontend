import React, {
  ChangeEvent,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { BodyTextarea } from './styles'
import { Link } from 'react-router-dom'
import { useField } from '@unform/core'
import FieldText from '../FieldText'
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
 *   <Textarea label="Objetivo do projeto" name="objetivo" />
 * )
 */
const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  subLabel,
  pathSubLabel,
  ...rest
}) => {
  const textareRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])
  const [textareaIsEmpty, setTextareaIsEmpty] = useState(
    !rest.defaultValue && rest.defaultValue !== '',
  )
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (event.target.value !== '') {
        setTextareaIsEmpty(false)
      } else {
        setTextareaIsEmpty(true)
      }
    },
    [],
  )
  return (
    <BodyTextarea>
      <FieldText
        name={name}
        label={label}
        error={error && error}
        isEmpty={textareaIsEmpty}
        subLabel={subLabel}
        pathSubLabel={pathSubLabel}
      >
        <textarea
          onChange={handleChange}
          id={fieldName}
          ref={textareRef}
          defaultValue={defaultValue}
          {...rest}
        />
      </FieldText>
    </BodyTextarea>
  )
}

export default Textarea
