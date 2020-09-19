import React, { InputHTMLAttributes } from 'react';
import { BodySwitch } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({id, name, label, ...rest }) => {
  return (
    <BodySwitch>
      <label htmlFor={id}>{label}</label>

      <input type="checkbox" id={id} name={name} className="checkbox" {...rest} />
      <label htmlFor={id} className="switch"></label>


    </BodySwitch>
  )
}

export default Input;