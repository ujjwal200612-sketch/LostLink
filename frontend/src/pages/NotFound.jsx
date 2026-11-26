import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';
import Button from '../components/Button';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container not-found-container">
        <div className="not-found-badge">
          <Compass size={40} className="not-found-icon" />
        </div>
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-desc">
          Looks like this link is lost! Don’t worry, we’ll help guide you back to where you need to be.
        </p>
        <div className="not-found-actions">
          <Link to="/">
            <Button variant="primary" size="lg" icon={Home}>
              Return Home
            </Button>
          </Link>
          <Link to="/items">
            <Button variant="outline" size="lg" icon={Search}>
              Browse Items
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
