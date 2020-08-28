import React, { InputHTMLAttributes } from 'react';
import { BodyInput } from './styles';
import { Link } from 'react-router-dom';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  subLabel?: string;
  pathSubLabel?: string;
}
const Input: React.FC<InputProps> = ({ name, label, subLabel, pathSubLabel,...rest}) => {

  return (
    <BodyInput>
      <label htmlFor={name}>{label}<Link to={`/${pathSubLabel}`}>{subLabel}</Link> </label>
      <input type="text" id={name} {...rest} />
    </BodyInput>

  )

}

export default Input;