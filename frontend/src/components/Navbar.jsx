import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, PlusCircle, User, LogOut, Menu, X, Compass, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Button from './Button';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-root">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="navbar-logo-badge">
            <Compass size={22} className="navbar-logo-icon" />
          </div>
          <div className="navbar-brand-text">
            <span className="navbar-title">Lost<span className="text-highlight">Link</span></span>
            <span className="navbar-tag">PLATFORM</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/items"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Browse Items
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Dashboard
          </NavLink>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          <Link to="/report" className="navbar-report-link">
            <Button
              variant="primary"
              size="sm"
              icon={PlusCircle}
            >
              Report Item
            </Button>
          </Link>

          {isAuthenticated ? (
            <div className="user-profile-menu">
              <span className="user-greeting">
                <User size={15} />
                <span>{user?.name || 'Account'}</span>
              </span>
              <button
                onClick={handleLogout}
                className="btn-logout"
                title="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="container mobile-drawer-content">
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/items"
              onClick={closeMenu}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              Browse Items
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={closeMenu}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/report"
              onClick={closeMenu}
              className="mobile-nav-link highlight"
            >
              + Report Lost or Found Item
            </NavLink>

            <div className="mobile-auth-divider" />

            {isAuthenticated ? (
              <div className="mobile-auth-block">
                <div className="mobile-user-info">
                  <User size={18} />
                  <span>Signed in as <strong>{user?.name}</strong></span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  icon={LogOut}
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login" onClick={closeMenu} style={{ width: '100%' }}>
                  <Button variant="outline" size="md" fullWidth>
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={closeMenu} style={{ width: '100%' }}>
                  <Button variant="primary" size="md" fullWidth>
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
