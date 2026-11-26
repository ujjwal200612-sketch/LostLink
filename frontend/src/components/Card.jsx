import React from 'react';
import './Card.css';

const Card = ({
  children,
  hoverable = false,
  className = '',
  onClick,
  padding = 'normal',
  ...rest
}) => {
  return (
    <div
      onClick={onClick}
      className={`custom-card ${hoverable ? 'custom-card-hover' : ''} custom-card-padding-${padding} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
