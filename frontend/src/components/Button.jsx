import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="btn-spinner" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 15 : size === 'lg' ? 20 : 17} className="btn-icon" />}
          <span className="btn-text">{children}</span>
          {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 15 : size === 'lg' ? 20 : 17} className="btn-icon" />}
        </>
      )}
    </button>
  );
};

export default Button;
