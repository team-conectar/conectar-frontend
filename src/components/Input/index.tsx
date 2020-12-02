import React, { useEffect, useRef,InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';
import { BodyInput } from './styles';
import { Link } from 'react-router-dom';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  subLabel?: string;
  pathSubLabel?: string;
}
const Input: React.FC<InputProps> = ({ name, label, subLabel, pathSubLabel, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <BodyInput>
      <label htmlFor={name}>{label}
        {pathSubLabel &&
          <Link to={`/${pathSubLabel}`} tabIndex={1}>{subLabel}</Link>
        }
      </label>
      <input ref={inputRef} defaultValue={defaultValue} type="text" id={fieldName} {...rest}/>
      {error && <span>{error}</span>}
      
    </BodyInput>

  )

}

export default Input;