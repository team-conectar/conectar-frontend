import React, { InputHTMLAttributes } from 'react';
import { BodyInput } from './styles';
import { Link } from 'react-router-dom';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  subLabel?: string;
  pathSubLabel?: string;
  type?: string;
}
const Input: React.FC<InputProps> = ({ name, label, subLabel, pathSubLabel, ...rest }) => {
  return (
    <BodyInput>
      <label htmlFor={name}>{label}
        {pathSubLabel &&
          <Link to={`/${pathSubLabel}`} tabIndex={1}>{subLabel}</Link>
        }
      </label>
      <input type="text" id={name} name={name} {...rest} />
    </BodyInput>

  )

}

export default Input;