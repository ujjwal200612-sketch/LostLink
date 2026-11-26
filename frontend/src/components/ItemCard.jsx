import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Award } from 'lucide-react';
import Badge from './Badge';
import Card from './Card';
import { formatDateDDMMYYYY } from '../utils/dateUtils';
import './ItemCard.css';

const defaultFallbackImage =
  'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80';

const ItemCard = ({ item }) => {
  const {
    _id,
    title,
    description,
    type,
    category,
    location,
    dateOccurred,
    reward,
    imageUrl,
    status,
  } = item;

  const [imgSrc, setImgSrc] = useState(imageUrl || defaultFallbackImage);

  const formattedDate = formatDateDDMMYYYY(dateOccurred);

  return (
    <Card hoverable padding="none" className="item-card">
      <div className="item-card-image-wrap">
        <img
          src={imgSrc}
          alt={title}
          className="item-card-image"
          loading="lazy"
          onError={() => setImgSrc(defaultFallbackImage)}
        />
        <div className="item-card-badges">
          <Badge type={type === 'lost' ? 'lost' : 'found'}>
            {type === 'lost' ? 'Lost' : 'Found'}
          </Badge>
          {status === 'claimed' && <Badge type="claimed">Claimed</Badge>}
        </div>

        {reward > 0 && (
          <div className="item-reward-chip">
            <Award size={14} />
            <span>₹{Number(reward).toLocaleString('en-IN')} Reward</span>
          </div>
        )}
      </div>

      <div className="item-card-content">
        <div className="item-card-meta">
          <span className="item-card-category">{category}</span>
          <span className="item-card-dot">•</span>
          <span className="item-card-date">
            <Calendar size={13} />
            {formattedDate}
          </span>
        </div>

        <h3 className="item-card-title">{title}</h3>
        <p className="item-card-desc">{description}</p>

        <div className="item-card-footer">
          <div className="item-card-location" title={location}>
            <MapPin size={14} className="location-pin-icon" />
            <span>{location}</span>
          </div>

          <Link to={`/items/${_id}`} className="item-card-link">
            <span>Details</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
