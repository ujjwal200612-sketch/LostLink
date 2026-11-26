import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Compass, Zap } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuth } from '../context/useAuth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('rahul.sharma@lostlink.in');
    setPassword('secret123');
  };

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <Card padding="large" className="auth-card">
          <div className="auth-header">
            <div className="auth-logo-badge">
              <Compass size={24} />
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to manage your lost &amp; found reports</p>
          </div>

          {error && (
            <div className="auth-error-alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={Mail}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={Lock}
              required
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={loading}
              icon={LogIn}
            >
              Sign In to Account
            </Button>
          </form>

          {/* Quick Demo Fill */}
          <div className="demo-fill-box">
            <button
              type="button"
              className="btn-demo-fill"
              onClick={handleDemoFill}
            >
              <Zap size={14} />
              <span>Fill with Instant Demo Credentials</span>
            </button>
          </div>

          <div className="auth-footer-text">
            Don’t have an account?{' '}
            <Link to="/register" className="auth-link">
              Create an account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
