import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, UserPlus, AlertCircle, Compass } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuth } from '../context/useAuth';
import './Login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.phone && formData.phone.trim()) {
      const cleanPhone = formData.phone.trim().replace(/[\s\-()]/g, '');
      const indianPhoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
      if (!indianPhoneRegex.test(cleanPhone)) {
        setError('Please enter a valid Indian mobile number (e.g. +91 98765 43210).');
        return;
      }
    }

    setLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <Card padding="large" className="auth-card">
          <div className="auth-header">
            <div className="auth-logo-badge">
              <Compass size={24} />
            </div>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join LostLink to safeguard and recover lost valuables</p>
          </div>

          {error && (
            <div className="auth-error-alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              icon={User}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="rahul.sharma@example.in"
              icon={Mail}
              required
            />

            <Input
              label="Password (min 6 chars)"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              icon={Lock}
              required
            />

            <Input
              label="Phone Number (Optional)"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              icon={Phone}
              helperText="Used to notify you via SMS when an item is claimed (+91 Indian mobile)."
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={loading}
              icon={UserPlus}
            >
              Complete Registration
            </Button>
          </form>

          <div className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
