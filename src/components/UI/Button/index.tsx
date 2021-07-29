import React, { ButtonHTMLAttributes, useState } from 'react'
import { BodyButton } from './styles'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'yellow' | 'yellowG' | 'primary' | 'secondary' | 'error' | 'tertiary'
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
  const [loading, setLoading] = useState(false)
  function onClickWithLoading() {
    if (!loading) {
      try {
        setLoading(true)
        rest.onClick
      } finally {
        setLoading(false)
      }
    }
  }
  return (
    <BodyButton
      {...rest}
      theme={theme}
      color={color}
      type="button"
      onClick={onClickWithLoading}
    >
      {children}
    </BodyButton>
  )
}

export default Button
