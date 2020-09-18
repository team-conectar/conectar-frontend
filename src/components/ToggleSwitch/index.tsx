import React, { InputHTMLAttributes } from 'react';
import { BodySwitch } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  return (
    <BodySwitch>
      <label htmlFor={name}>{label}</label>

      <input type="checkbox" id={name} name={name} className="checkbox" {...rest} />
      <label htmlFor={name} className="switch"></label>


    </BodySwitch>
  )
}

export default Input;