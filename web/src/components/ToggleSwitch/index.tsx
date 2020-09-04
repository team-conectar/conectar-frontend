import React, { InputHTMLAttributes } from 'react';
import { BodySwitch } from './styles';



const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...rest}) => {

  return (
    <BodySwitch>      
      <input type="checkbox" {...rest} />
      <span className="slider"></span> 
    </BodySwitch>
  )
}

export default Input;