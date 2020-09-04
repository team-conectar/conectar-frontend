import React, { TextareaHTMLAttributes } from 'react';
import { BodyTextarea } from './styles';
import { Link } from 'react-router-dom';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  subLabel?: string;
  pathSubLabel?: string;
}
const Textarea: React.FC<TextareaProps> = ({ name, label, subLabel, pathSubLabel,...rest}) => {

  return (
    <BodyTextarea>
      <label htmlFor={name}>{label}<Link to={`/${pathSubLabel}`}>{subLabel}</Link> </label>
      <textarea id={name} {...rest} />
    </BodyTextarea>

  )

}

export default Textarea;