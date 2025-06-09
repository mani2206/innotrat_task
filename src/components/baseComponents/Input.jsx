import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type="text",
  label,
  value,
  onChange,
  placeholder,
  id,
  name,
  error,
  touched,
  className = '', 
  ...restProps
}) => {
  const inputId = id || name;

 
  const inputClasses = `
    block
    w-full
    px-3
    py-2
    border
    border-gray-300
    rounded-md
    shadow-sm
    placeholder-gray-400
    focus:outline-none
    focus:ring-indigo-500
    focus:border-indigo-500
    sm:text-sm
    ${error && touched ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
    ${className} // Allow custom classes passed from parent
  `.replace(/\s+/g, ' ').trim();

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
        {...restProps}
      />
      {error && touched && (
        <p className="mt-1 text-sm text-red-600" id={`${inputId}-error`} aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};




export default Input;