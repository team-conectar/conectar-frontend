import React, {ButtonHTMLAttributes } from 'react';
import { BodyButton } from './styles';
import { Link } from 'react-router-dom';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  theme?:string;
  color?:string;
}

const Button: React.FC<ButtonProps> = ({theme, color, children, ...rest }) => {
  return (
    <BodyButton theme={theme} color={color} {...rest}>
      {children}
    </BodyButton>

  )

}

export default Button;