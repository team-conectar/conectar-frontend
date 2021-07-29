import React, { ButtonHTMLAttributes, useState } from 'react'
import { BodyButton } from './styles'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'primary' | 'secondary' | 'error' | 'tertiary'
  color?: string
}
/**
 * Button.
 *
 * @component
 * @example
 * return (
 *   <Button theme="primary">Enviar convite</Button>
 * )
 */
const Button: React.FC<ButtonProps> = ({ theme, color, children, ...rest }) => {
  return (
    <BodyButton theme={theme} color={color} type="button" {...rest}>
      {children}
    </BodyButton>
  )
}

export default Button
