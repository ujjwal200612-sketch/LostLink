import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Heart,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { authService } from '../services/api';
import './Footer.css';

const Footer = () => {
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    let isMounted = true;
    authService
      .getHealth()
      .then((data) => {
        if (isMounted) setBackendStatus(data.status === 'ok' ? 'connected' : 'degraded');
      })
      .catch(() => {
        if (isMounted) setBackendStatus('mock');
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="footer-root">
      {/* Upper Footer Grid */}
      <div className="container footer-container">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-brand">
            <div className="footer-logo-badge">
              <Compass size={22} className="footer-logo-icon" />
            </div>
            <span className="footer-brand-title">
              Lost<span className="footer-highlight">Link</span>
            </span>
          </Link>

          <p className="footer-desc">
            The next-generation smart platform reuniting communities, campuses, and transit riders
            with what matters most. Fast reporting, smart matching, and verified secure returns.
          </p>

          <div className="footer-status-pill">
            <span className={`status-indicator-dot ${backendStatus}`} />
            <span className="status-indicator-text">
              {backendStatus === 'connected' && 'API & Supabase Connected'}
              {backendStatus === 'mock' && 'Running in Preview Mode'}
              {backendStatus === 'checking' && 'Connecting to Backend...'}
              {backendStatus === 'degraded' && 'Backend Service Degraded'}
            </span>
          </div>

          {/* Social Links */}
          <div className="footer-socials">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="Twitter / X"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/items">Browse All Items</Link>
            </li>
            <li>
              <Link to="/items?type=lost">Reported Lost Items</Link>
            </li>
            <li>
              <Link to="/items?type=found">Found Items Directory</Link>
            </li>
            <li>
              <Link to="/report?type=lost">Report Lost Item</Link>
            </li>
            <li>
              <Link to="/report?type=found">Report Found Item</Link>
            </li>
            <li>
              <Link to="/dashboard">User Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="footer-col">
          <h4 className="footer-heading">Categories</h4>
          <ul className="footer-links">
            <li>
              <Link to="/items?category=Electronics">Electronics &amp; Laptops</Link>
            </li>
            <li>
              <Link to="/items?category=Wallets+%26+Bags">Wallets &amp; Bags</Link>
            </li>
            <li>
              <Link to="/items?category=Keys">Keys &amp; Fobs</Link>
            </li>
            <li>
              <Link to="/items?category=ID+%26+Documents">ID &amp; Documents</Link>
            </li>
            <li>
              <Link to="/items?category=Clothing+%26+Accessories">Clothing &amp; Wear</Link>
            </li>
            <li>
              <Link to="/items?category=Jewelry">Jewelry &amp; Watches</Link>
            </li>
            <li>
              <Link to="/items?category=Pets">Pets &amp; Animals</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Information */}
        <div className="footer-col">
          <h4 className="footer-heading">Contact &amp; Support</h4>
          <ul className="footer-contact-list">
            <li className="footer-contact-item">
              <Mail size={16} className="contact-icon" />
              <div>
                <span className="contact-label">Email Support</span>
                <a href="mailto:lostlink.support@gmail.com" className="contact-value">
                  lostlink.support@gmail.com
                </a>
              </div>
            </li>

          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="footer-copyright">
            © {new Date().getFullYear()} LostLink Technologies. All rights reserved.
          </p>

          <div className="footer-legal-links">
            <span className="legal-link">Privacy Policy</span>
            <span className="legal-dot">•</span>
            <span className="legal-link">Terms of Service</span>
            <span className="legal-dot">•</span>
            <span className="legal-link">Community Safety</span>
          </div>

          <div className="footer-tech-stack">
            <span>React</span> • <span>Vite</span> • <span>Node.js</span> • <span>Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
