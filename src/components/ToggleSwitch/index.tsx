import React, { InputHTMLAttributes, useState } from 'react';
import { BodySwitch } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  return (
    <BodySwitch>
      <label htmlFor={name}>{label}</label>
      <aside>
        <input type="checkbox" id={name} {...rest} />
        <span className="slider"></span>
      </aside>
    </BodySwitch>
  )
}

export default Input;