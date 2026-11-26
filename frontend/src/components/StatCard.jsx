import React from 'react';
import Card from './Card';
import './StatCard.css';

const StatCard = ({ icon: Icon, value, label, trend, subtitle }) => {
  return (
    <Card className="stat-card" padding="normal">
      <div className="stat-card-header">
        <div className="stat-icon-wrap">
          <Icon size={24} />
        </div>
        {trend && <span className="stat-trend">{trend}</span>}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {subtitle && <div className="stat-subtitle">{subtitle}</div>}
    </Card>
  );
};

export default StatCard;
