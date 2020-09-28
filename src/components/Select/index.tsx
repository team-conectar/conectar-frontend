import React, { SelectHTMLAttributes, OptionHTMLAttributes } from 'react';
import { BodySelect } from './styles';
// import { Link } from 'react-router-dom';


interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  value?:any;
  defaultOption: string;
  options: Array<OptionHTMLAttributes<HTMLOptionElement>>;
}
const Select: React.FC<SelectProps> = ({ name,value, label, options, defaultOption,...rest }) => {
  return (
    <BodySelect>
      <label htmlFor={name}>{label}</label>

      <select id={name} name={name} {...rest} >
        <option value={defaultOption} hidden >{defaultOption}</option>
        {options.map(option => {
          return <option key={option.value?.toString()} value={option.value}>{option.label}</option>
        })}
      </select>
    </BodySelect>

  )

}

export default Select;