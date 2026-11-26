import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  FileText,
  MapPin,
  Calendar,
  IndianRupee,
  Image,
  User,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Check,
} from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import { itemService } from '../services/api';
import { useAuth } from '../context/useAuth';
import './ReportItem.css';

const categories = [
  'Electronics',
  'Wallets & Bags',
  'Keys',
  'ID & Documents',
  'Clothing & Accessories',
  'Jewelry',
  'Pets',
  'Other',
];

const ReportItem = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const initialType = searchParams.get('type') === 'found' ? 'found' : 'lost';

  const [type, setType] = useState(initialType);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Electronics',
    location: '',
    dateOccurred: new Date().toISOString().split('T')[0],
    description: '',
    reward: 0,
    imageUrl: '',
    contactName: user?.name || '',
    contactEmail: user?.email || '',
    contactPhone: user?.phone || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Please provide an item title.');
      return;
    }

    if (!formData.location.trim()) {
      setError('Please provide the location.');
      return;
    }

    if (!formData.description.trim()) {
      setError('Please provide a detailed description.');
      return;
    }

    if (formData.contactPhone && formData.contactPhone.trim()) {
      const cleanPhone = formData.contactPhone.trim().replace(/[\s\-()]/g, '');
      const indianPhoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
      if (!indianPhoneRegex.test(cleanPhone)) {
        setError('Please enter a valid Indian mobile number (e.g. +91 98765 43210).');
        return;
      }
    }

    setLoading(true);
    try {
      await itemService.createItem({
        ...formData,
        type,
        reward: Number(formData.reward) || 0,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/items');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">
      <div className="container report-container">
        <div className="report-header">
          <span className="badge badge-category">Instant Reporting</span>
          <h1 className="report-title">Report an Item</h1>
          <p className="report-subtitle">
            Catalog a lost or found item to notify community members and trigger smart matching.
          </p>
        </div>

        {/* Type Toggle Segment */}
        <div className="type-toggle-selector">
          <button
            type="button"
            className={`toggle-option ${type === 'lost' ? 'active-lost' : ''}`}
            onClick={() => setType('lost')}
          >
            <div className="toggle-icon-wrap lost">
              {type === 'lost' && <Check size={14} className="check-icon" />}
            </div>
            <div>
              <div className="toggle-label">I Lost an Item</div>
              <div className="toggle-sub">Help me locate what I misplaced</div>
            </div>
          </button>

          <button
            type="button"
            className={`toggle-option ${type === 'found' ? 'active-found' : ''}`}
            onClick={() => setType('found')}
          >
            <div className="toggle-icon-wrap found">
              {type === 'found' && <Check size={14} className="check-icon" />}
            </div>
            <div>
              <div className="toggle-label">I Found an Item</div>
              <div className="toggle-sub">Help reunite it with the owner</div>
            </div>
          </button>
        </div>

        <Card padding="large" className="report-form-card">
          {error && (
            <div className="form-alert error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="form-alert success">
              <CheckCircle2 size={18} />
              <span>Report created successfully! Redirecting to directory...</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-section-title">Item Details</div>

            <Input
              label="Item Title *"
              name="title"
              placeholder={
                type === 'lost'
                  ? 'e.g. Samsung Galaxy S24 in Black Spigen Case or HP Laptop'
                  : 'e.g. Black Leather Wallet or Honda Activa Key'
              }
              value={formData.title}
              onChange={handleChange}
              required
            />

            <div className="form-row">
              <Input
                label="Category *"
                type="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categories}
              />

              <Input
                label="Date Occurred *"
                type="date"
                name="dateOccurred"
                value={formData.dateOccurred}
                onChange={handleChange}
                icon={Calendar}
                required
              />
            </div>

            <Input
              label="Exact Location or Vicinity *"
              name="location"
              placeholder="e.g. HKBK College Library 2nd Floor or Indiranagar Metro Station, Bengaluru"
              value={formData.location}
              onChange={handleChange}
              icon={MapPin}
              required
            />

            <Input
              label="Item Description *"
              type="textarea"
              name="description"
              rows={4}
              placeholder="Provide identifiable markings, color, brand, stickers, serial numbers or distinctive features..."
              value={formData.description}
              onChange={handleChange}
              required
            />

            <div className="form-row">
              <Input
                label="Photo Image URL (Optional)"
                name="imageUrl"
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.imageUrl}
                onChange={handleChange}
                icon={Image}
                helperText="Leave empty to use a default high-quality category placeholder."
              />

              {type === 'lost' && (
                <Input
                  label="Reward Amount (₹ INR, Optional)"
                  type="number"
                  name="reward"
                  min="0"
                  placeholder="500"
                  value={formData.reward}
                  onChange={handleChange}
                  icon={IndianRupee}
                />
              )}
            </div>

            <div className="form-section-title mt-4">Contact Information</div>
            <p className="form-section-sub">
              Your contact details will only be used to facilitate return inquiries.
            </p>

            <div className="form-row">
              <Input
                label="Your Name / Organization"
                name="contactName"
                placeholder="e.g. Rahul Sharma"
                value={formData.contactName}
                onChange={handleChange}
                icon={User}
              />

              <Input
                label="Email Address"
                type="email"
                name="contactEmail"
                placeholder="rahul.sharma@example.in"
                value={formData.contactEmail}
                onChange={handleChange}
                icon={Mail}
              />

              <Input
                label="Phone Number"
                type="tel"
                name="contactPhone"
                placeholder="+91 98765 43210"
                value={formData.contactPhone}
                onChange={handleChange}
                icon={Phone}
              />
            </div>

            <div className="report-submit-actions">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                icon={CheckCircle2}
              >
                Submit {type === 'lost' ? 'Lost' : 'Found'} Notice
              </Button>
              <Link to="/items">
                <Button variant="ghost" size="lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ReportItem;
