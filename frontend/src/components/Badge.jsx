import React from 'react';
import './Badge.css';

const Badge = ({ type = 'default', children, size = 'md', className = '' }) => {
  return (
    <span className={`badge-pill badge-${type} badge-size-${size} ${className}`}>
      <span className="badge-dot" />
      {children}
    </span>
  );
};

export default Badge;
