import React, { SelectHTMLAttributes, OptionHTMLAttributes,InputHTMLAttributes } from 'react';
import { BodySelect } from './styles';
// import { Link } from 'react-router-dom';
import SelectReact, { NamedProps, OptionTypeBase, Props } from "react-select";
import makeAnimated from 'react-select/animated';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
  name: string;
  label?: string;
  value?: any;
  defaultOption?: any;
  options: Array<OptionHTMLAttributes<HTMLOptionElement>>;
  isMulti?: boolean;
}
const Select: React.FC<SelectProps> = ({ name, value, isMulti, label, options, defaultOption, ...rest }) => {
  const animatedComponents = makeAnimated();

  return (
    <BodySelect>
      <label htmlFor={name}>{label}</label>
      
      <SelectReact
        name={name}
        id={name}
        closeMenuOnSelect={true}
        components={animatedComponents}
        options={options}
        placeholder={defaultOption || "Selecione"}
        className="select"
        isMulti={isMulti}
      />

    </BodySelect>

  )

}

export default Select;