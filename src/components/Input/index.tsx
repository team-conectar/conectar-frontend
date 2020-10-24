import React, { InputHTMLAttributes, ChangeEvent } from 'react';
import { BodyInput } from './styles';
import { Link } from 'react-router-dom';
import InputMask, {Props} from 'react-input-mask';

interface InputProps extends Props {
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
      <InputMask type="text" id={name} name={name} maskChar="" {...rest}/>
    </BodyInput>

  )

}

export default Input;