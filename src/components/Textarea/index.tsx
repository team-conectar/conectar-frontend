import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react'
import { BodyTextarea } from './styles'
import { Link } from 'react-router-dom'
import { useField } from '@unform/core'
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

  return (
    <BodyTextarea>
      <label htmlFor={name}>
        {label}
        <Link to={`/${pathSubLabel}`}>{subLabel}</Link>{' '}
      </label>
      <textarea
        id={fieldName}
        ref={textareRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span>{error}</span>}
    </BodyTextarea>
  )
}

export default Textarea
