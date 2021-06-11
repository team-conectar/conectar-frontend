import React from 'react'
import { BodyField, Error } from './styles'

import { Link } from 'react-router-dom'
import { IoMdAlert } from 'react-icons/io'

interface FieldProps {
  name: string
  label?: string
  subLabel?: string
  pathSubLabel?: string
  error?: string
  isEmpty: boolean
}
const FieldText: React.FC<FieldProps> = ({
  name,
  label,
  subLabel,
  pathSubLabel,
  error,
  isEmpty,
  children,
}) => {
  return (
    <BodyField isEmpty={isEmpty} htmlFor={name}>
      {children}
      {pathSubLabel && (
        <Link to={pathSubLabel} tabIndex={1}>
          {subLabel}
        </Link>
      )}
      <label htmlFor={name}>{label}</label>
      {error && (
        <Error message={error}>
          <IoMdAlert />
        </Error>
      )}
    </BodyField>
  )
}

export default FieldText
