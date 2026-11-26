import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  PlusCircle,
  Package,
  CheckCircle,
  Clock,
  ShieldCheck,
  LogOut,
  Mail,
  Phone,
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { formatDateDDMMYYYY } from '../utils/dateUtils';
import { useAuth } from '../context/useAuth';
import { itemService } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    itemService
      .getItems()
      .then((res) => {
        setItems(res.items || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
    itemService
      .getMyInquiries()
      .then((res) => {
        setInquiries(res.inquiries || []);
      })
      .catch((err) => console.error('Error loading inquiries:', err));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <div className="container dashboard-container">
        {/* Top Profile Banner */}
        <div className="dashboard-profile-card">
          <div className="profile-info-group">
            <div className="profile-avatar-circle">
              <User size={32} />
            </div>
            <div>
              <div className="profile-badge-row">
                <span className="badge badge-category">Community Member</span>
                {isAuthenticated && <span className="verified-chip"><ShieldCheck size={13} /> Verified</span>}
              </div>
              <h1 className="profile-name">{user?.name || 'Guest User'}</h1>
              <div className="profile-contact-row">
                <span className="contact-item">
                  <Mail size={14} />
                  <span>{user?.email || 'rahul.sharma@lostlink.in'}</span>
                </span>
                {user?.phone && (
                  <span className="contact-item">
                    <Phone size={14} />
                    <span>{user.phone}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="profile-actions-group">
            <Link to="/report">
              <Button variant="primary" size="md" icon={PlusCircle}>
                Report Item
              </Button>
            </Link>
            {isAuthenticated && (
              <Button variant="outline" size="md" icon={LogOut} onClick={handleLogout}>
                Sign Out
              </Button>
            )}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="dashboard-metrics-grid">
          <Card padding="normal" className="metric-box">
            <div className="metric-icon-wrap blue">
              <Package size={22} />
            </div>
            <div className="metric-num">
              {items.filter(item => item.status?.toLowerCase() === 'open').length}
            </div>
            <div className="metric-title">Active Reports</div>
          </Card>

          <Card padding="normal" className="metric-box">
            <div className="metric-icon-wrap green">
              <CheckCircle size={22} />
            </div>
            <div className="metric-num">
              {items.filter(item => item.status?.toLowerCase() === 'reunited').length}
            </div>
            <div className="metric-title">Items Reunited</div>
          </Card>

          <Card
            padding="normal"
            className="metric-box"
            onClick={() => document.getElementById('received-inquiries')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="metric-icon-wrap amber">
              <Clock size={22} />
            </div>
            <div className="metric-num">{inquiries.length}</div>
            <div className="metric-title">Open Inquiries</div>
          </Card>
        </div>

        {/* User Items List */}
        <div className="dashboard-section-header">
          <div>
            <h2 className="dashboard-section-title">Your Recent Activities</h2>
            <p className="dashboard-section-sub">
              Manage status and review inquiries for items reported by you.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="items-loading-grid">
            {[1, 2].map((n) => (
              <div key={n} className="item-skeleton" />
            ))}
          </div>
        ) : (
          <div className="user-items-table-card">
            <div className="table-responsive">
              <table className="user-items-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.slice(0, 4).map((item) => (
                    <tr key={item._id}>
                      <td data-label="Item" className="item-name-cell">
                        <div className="table-thumb-wrap">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="table-thumb"
                          />
                          <div>
                            <div className="table-item-title">{item.title}</div>
                            <div className="table-item-sub">
                              {formatDateDDMMYYYY(item.dateOccurred)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td data-label="Type">
                        <Badge type={item.type === 'lost' ? 'lost' : 'found'} size="sm">
                          {item.type}
                        </Badge>
                      </td>
                      <td data-label="Category">
                        <span className="table-category">{item.category}</span>
                      </td>
                      <td>
                        <span className="table-location">{item.location}</span>
                      </td>
                      <td data-label="Status">
                        <span className={`status-pill ${item.status}`}>
                          {item.status}
                        </span>
                      </td>
                      <td data-label="Action">
                        <Link to={`/items/${item._id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Received Inquiries */}
        <div className="dashboard-section-header" id="received-inquiries">
          <div>
            <h2 className="dashboard-section-title">Received Inquiries</h2>
            <p className="dashboard-section-sub">
              Messages from people who may have information about your items.
            </p>
          </div>
        </div>

        <div className="user-items-table-card">
          {inquiries.length === 0 ? (
            <p style={{ padding: '24px', textAlign: 'center' }}>
              No inquiries received yet.
            </p>
          ) : (
            inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                style={{ padding: '20px', borderBottom: '1px solid #eee' }}
              >
                <h3>{inquiry.itemTitle || 'Your reported item'}</h3>
                <p>{inquiry.message}</p>
                <small>
                  Received: {formatDateDDMMYYYY(inquiry.created_at)}
                </small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
