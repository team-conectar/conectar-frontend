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
  async function onClickWithLoading(event: any) {
    if (!loading) {
      try {
        rest.onClick && rest.onClick(event)
      } finally {
        setLoading(false)
      }
    }
  }
  return (
    <BodyButton
      theme={theme}
      color={color}
      type="button"
      onClick={onClickWithLoading}
      {...rest}
    >
      {children}
    </BodyButton>
  )
}

export default Button
