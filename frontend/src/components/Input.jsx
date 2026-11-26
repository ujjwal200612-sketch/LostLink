import React from 'react';
import './Input.css';

const Input = ({
  label,
  id,
  type = 'text',
  error,
  helperText,
  icon: Icon,
  className = '',
  rows = 4,
  options = [],
  ...rest
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}

      <div className={`input-wrapper ${Icon ? 'has-icon' : ''} ${error ? 'has-error' : ''}`}>
        {Icon && <Icon className="input-icon" size={18} />}

        {type === 'textarea' ? (
          <textarea
            id={inputId}
            rows={rows}
            className="form-control"
            {...rest}
          />
        ) : type === 'select' ? (
          <select id={inputId} className="form-control" {...rest}>
            {options.map((opt) => (
              <option key={opt.value ?? opt} value={opt.value ?? opt}>
                {opt.label ?? opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={inputId}
            type={type}
            className="form-control"
            {...rest}
          />
        )}
      </div>

      {error ? (
        <span className="form-error">{error}</span>
      ) : helperText ? (
        <span className="form-helper">{helperText}</span>
      ) : null}
    </div>
  );
};

export default Input;
