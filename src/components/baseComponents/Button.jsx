import React from 'react';
import PropTypes from 'prop-types'; 
const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  className = '',
  ...restProps
}) => {
 
  const baseClasses = `
    inline-flex
    items-center
    justify-center
    font-medium
    rounded-md
    shadow-sm
    transition-colors
    duration-200
    ease-in-out
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  // Size-specific classes
  const sizeClasses = {
    small: 'px-2.5 py-1.5 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  };

  // Variant-specific classes
  const variantClasses = {
    primary: `
      bg-indigo-600
      text-white
      hover:bg-indigo-700
      focus:ring-indigo-500
    `,
    secondary: `
      bg-gray-200
      text-gray-800
      hover:bg-gray-300
      focus:ring-gray-500
    `,
    outline: `
      border
      border-indigo-600
      text-indigo-600
      hover:bg-indigo-50
      focus:ring-indigo-500
    `,
    ghost: `
      text-indigo-600
      hover:bg-indigo-50
      focus:ring-indigo-500
    `,
    danger: `
      bg-red-600
      text-white
      hover:bg-red-700
      focus:ring-red-500
    `,
  };

  // Combine all classes
  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.replace(/\s+/g, ' ').trim(); // Clean up extra spaces

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={combinedClasses}
      {...restProps}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

// Add PropTypes for validation
Button.propTypes = {
  children: PropTypes.node.isRequired, 
  onClick: PropTypes.func, 
  type: PropTypes.oneOf(['button', 'submit', 'reset']), 
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']), 
  size: PropTypes.oneOf(['small', 'medium', 'large']), 
  isLoading: PropTypes.bool,
  className: PropTypes.string, 
  
};

export default Button;