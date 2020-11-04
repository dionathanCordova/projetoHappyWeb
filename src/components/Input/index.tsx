import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
   label?: string;
   name: string;
}

const Input: React.FC<IInput> = ({label, type, name, ...rest}) => {
   return (
      <div className="input-block">
         <label htmlFor={name}>{label}</label>
         <input type={type} id={name} {...rest }/>
      </div>
   )
}

export default Input;