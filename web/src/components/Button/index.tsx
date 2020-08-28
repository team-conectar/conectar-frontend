import React, {ButtonHTMLAttributes } from 'react';
import { BodyButton } from './styles';
import { Link } from 'react-router-dom';


const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest}) => {

  return (
    <BodyButton {...rest} >
      {children}
    </BodyButton>

  )

}

export default Button;