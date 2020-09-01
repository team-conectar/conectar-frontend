import React, { SelectHTMLAttributes } from 'react';
import { BodySelect } from './styles';
import { Link } from 'react-router-dom';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  defaultOption: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}
const Select: React.FC<SelectProps> = ({ name, label, options, defaultOption,...rest }) => {
  return (
    <BodySelect>
      <label htmlFor={name}>{label}</label>

      <select defaultValue="" id={name} {...rest} >
  <option value="" disabled hidden >{defaultOption}</option>
        {options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })}
      </select>
    </BodySelect>

  )

}

export default Select;