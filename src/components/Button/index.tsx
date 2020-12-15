import React, { ButtonHTMLAttributes } from 'react'
import { BodyButton } from './styles'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: string
  color?: string
}
/**
 *
 * @param theme Accept primary-green, secundary-green , primary-yellow or secundary-yellow
 *
 */
const Button: React.FC<ButtonProps> = ({ theme, color, children, ...rest }) => {
  return (
    <BodyButton theme={theme} color={color} type="button" {...rest}>
      {children}
    </BodyButton>
  )
}

export default Button
