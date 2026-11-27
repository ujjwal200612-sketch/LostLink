import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, MapPin, PlusCircle } from 'lucide-react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuth } from '../context/useAuth';
import { itemService } from '../services/api';
import { formatDateDDMMYYYY } from '../utils/dateUtils';
import './MyReports.css';

const isReunited = (status) => ['resolved', 'reunited'].includes(status?.toLowerCase());

const MyReports = ({ type }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isActive = type === 'active';
  const title = isActive ? 'Active Reports' : 'Items Reunited';

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    itemService
      .getMyReports()
      .then((response) => {
        setItems(
          response.items.filter((item) =>
            isActive
              ? item.status?.toLowerCase() === 'open'
              : isReunited(item.status)
          )
        );
      })
      .catch((requestError) => {
        setError(requestError.message || 'Unable to load your reports. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [authLoading, isAuthenticated, isActive]);

  return (
    <div className="my-reports-page">
      <div className="container my-reports-container">
        <Link to="/dashboard" className="my-reports-back-link">
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>

        <header className="my-reports-header">
          <h1>{title}</h1>
          <p>
            {isActive
              ? 'Reports you submitted that are currently open.'
              : 'Items from your reports that have been successfully reunited.'}
          </p>
        </header>

        {authLoading || loading ? (
          <div className="my-reports-message" role="status">Loading your reports...</div>
        ) : !isAuthenticated ? (
          <div className="my-reports-empty">
            <h2>Sign in to view your reports</h2>
            <p>Your reports are available after you sign in to your LostLink account.</p>
            <Link to="/login">
              <Button variant="primary">Sign In</Button>
            </Link>
          </div>
        ) : error ? (
          <div className="my-reports-error" role="alert">{error}</div>
        ) : items.length === 0 ? (
          <div className="my-reports-empty">
            <h2>{isActive ? 'No active reports yet' : 'No reunited items yet'}</h2>
            <p>
              {isActive
                ? 'When you submit a report, it will appear here while it is open.'
                : 'Items you have marked as resolved will appear here.'}
            </p>
            {isActive && (
              <Link to="/report">
                <Button variant="primary" icon={PlusCircle}>Report an Item</Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            <p className="my-reports-count">
              <strong>{items.length}</strong> {items.length === 1 ? 'report' : 'reports'}
            </p>
            <div className="my-reports-grid">
              {items.map((item) => (
                <Link
                  to={`/items/${item._id}`}
                  className="my-report-link"
                  key={item._id}
                  aria-label={`View ${item.title}, status ${item.status}`}
                >
                  <Card padding="none" hoverable className="my-report-card">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="my-report-image" loading="lazy" />
                    ) : (
                      <div className="my-report-image-placeholder" aria-hidden="true">
                        <ImageIcon size={34} />
                      </div>
                    )}
                    <div className="my-report-content">
                      <div className="my-report-meta">
                        <Badge type={item.type === 'lost' ? 'lost' : 'found'} size="sm">
                          {item.type === 'lost' ? 'Lost' : 'Found'}
                        </Badge>
                        <Badge
                          type={isReunited(item.status) ? 'found' : item.status === 'claimed' ? 'claimed' : 'default'}
                          size="sm"
                        >
                          {isReunited(item.status) ? 'Reunited' : item.status}
                        </Badge>
                      </div>
                      <h2>{item.title}</h2>
                      <p className="my-report-category">{item.category} · {formatDateDDMMYYYY(item.dateOccurred)}</p>
                      <p className="my-report-description">{item.description}</p>
                      <p className="my-report-location">
                        <MapPin size={15} />
                        <span>{item.location}</span>
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyReports;
