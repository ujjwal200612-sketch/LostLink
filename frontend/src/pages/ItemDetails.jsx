import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Award,
  Mail,
  Phone,
  User,
  ShieldCheck,
  Share2,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Card from '../components/Card';
import { formatDateDDMMYYYY } from '../utils/dateUtils';
import { itemService } from '../services/api';
import './ItemDetails.css';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const [claimMessage, setClaimMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    itemService
      .getItemById(id)
      .then((res) => {
        setItem(res.item);
      })
      .catch((err) => {
        setError(err.message || 'Item not found');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleClaimSubmit = async (e) => {
    e.preventDefault();

    try {
      await itemService.createInquiry(id, claimMessage);
      setClaimSubmitted(true);
    } catch (error) {
      alert(error.message || 'Failed to send inquiry. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container item-details-container loading-state">
        <div className="details-skeleton" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="container item-details-container error-state">
        <AlertTriangle size={48} className="error-icon" />
        <h2>Item Not Found</h2>
        <p>The item you are searching for might have been resolved or removed.</p>
        <Link to="/items">
          <Button variant="primary" icon={ArrowLeft}>
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  const {
    title,
    description,
    type,
    category,
    location,
    dateOccurred,
    reward,
    imageUrl,
    status,
    contactName,
    contactEmail,
    contactPhone,
  } = item;

  const formattedDate = formatDateDDMMYYYY(dateOccurred);

  return (
    <div className="item-details-page">
      <div className="container item-details-container">
        {/* Back Link */}
        <Link to="/items" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to Directory</span>
        </Link>

        <div className="details-layout">
          {/* Main Column */}
          <div className="details-main-col">
            <div className="details-image-card">
              <img
                src={
                  imageUrl ||
                  'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80'
                }
                alt={title}
                className="details-image"
              />
              <div className="details-image-badges">
                <Badge type={type === 'lost' ? 'lost' : 'found'} size="md">
                  {type === 'lost' ? 'Lost Item' : 'Found Item'}
                </Badge>
                <Badge type="category" size="md">
                  {category}
                </Badge>
                {status === 'claimed' && <Badge type="claimed">Claimed</Badge>}
              </div>

              {reward > 0 && (
                <div className="details-reward-badge">
                  <Award size={18} />
                  <span>₹{Number(reward).toLocaleString('en-IN')} Official Reward Offered</span>
                </div>
              )}
            </div>

            {/* Description & Overview */}
            <Card padding="large" className="details-content-card">
              <h1 className="details-title">{title}</h1>

              <div className="details-meta-grid">
                <div className="meta-item">
                  <span className="meta-label">Location</span>
                  <div className="meta-value">
                    <MapPin size={16} className="text-accent" />
                    <span>{location}</span>
                  </div>
                </div>

                <div className="meta-item">
                  <span className="meta-label">Date Reported</span>
                  <div className="meta-value">
                    <Calendar size={16} className="text-accent" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3 className="details-section-heading">Detailed Description</h3>
                <p className="details-desc-text">{description}</p>
              </div>

              <div className="safety-notice-box">
                <ShieldCheck size={20} className="safety-icon" />
                <div>
                  <strong>LostLink Safety Promise</strong>
                  <p>
                    Always arrange exchanges in public daylight locations or designated campus security desks. Never wire funds prior to receiving verified identification.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Action Column */}
          <div className="details-sidebar-col">
            <Card padding="normal" className="sidebar-action-card">
              <h3 className="sidebar-card-title">
                {type === 'lost' ? 'Did you find this?' : 'Is this your item?'}
              </h3>
              <p className="sidebar-card-desc">
                {type === 'lost'
                  ? 'Connect with the owner to help reunite them with their item.'
                  : 'Submit a verification message describing identifiable details.'}
              </p>

              {claimSubmitted ? (
                <div className="claim-success-box">
                  <CheckCircle size={28} className="success-icon" />
                  <h4>Inquiry Sent!</h4>
                  <p>
                    Your message has been safely forwarded. The reporter will be alerted immediately.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleClaimSubmit} className="claim-form">
                  <textarea
                    rows={4}
                    placeholder="Describe details (serial numbers, distinguishing marks, or exact time)..."
                    value={claimMessage}
                    onChange={(e) => setClaimMessage(e.target.value)}
                    required
                    className="claim-textarea"
                  />
                  <Button type="submit" variant="primary" fullWidth size="md">
                    Send Verification Inquiry
                  </Button>
                </form>
              )}

              <div className="sidebar-divider" />

              {/* Contact Information (if provided) */}
              <div className="reporter-contact-block">
                <span className="reporter-label">Reporter Contact</span>
                <div className="reporter-name">
                  <User size={15} />
                  <span>{contactName || 'Community Member'}</span>
                </div>
                {contactEmail && (
                  <div className="reporter-detail">
                    <Mail size={14} />
                    <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                  </div>
                )}
                {contactPhone && (
                  <div className="reporter-detail">
                    <Phone size={14} />
                    <span>{contactPhone}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
