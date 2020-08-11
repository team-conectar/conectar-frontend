import React, { InputHTMLAttributes } from 'react';
import { BodyInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}
const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {

  return (
    <BodyInput>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...rest} />
    </BodyInput>

  )

}

export default Input;