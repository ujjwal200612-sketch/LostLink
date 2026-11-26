import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, PlusCircle, RefreshCw, AlertCircle } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import Button from '../components/Button';
import { itemService } from '../services/api';
import './Items.css';

const categories = [
  'All',
  'Electronics',
  'Wallets & Bags',
  'Keys',
  'ID & Documents',
  'Clothing & Accessories',
  'Jewelry',
  'Pets',
  'Other',
];

const Items = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters from URL
  const currentType = searchParams.get('type') || '';
  const currentCategory = searchParams.get('category') || 'All';
  const currentSearch = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    setLoading(true);
    itemService
      .getItems({
        type: currentType,
        category: currentCategory,
        search: currentSearch,
      })
      .then((res) => {
        setItems(res.items || []);
      })
      .catch((err) => {
        console.error('Error fetching items:', err);
      })
      .finally(() => setLoading(false));
  }, [currentType, currentCategory, currentSearch]);

  const setTypeFilter = (type) => {
    const next = new URLSearchParams(searchParams);
    if (type) {
      next.set('type', type);
    } else {
      next.delete('type');
    }
    setSearchParams(next);
  };

  const setCategoryFilter = (cat) => {
    const next = new URLSearchParams(searchParams);
    if (cat && cat !== 'All') {
      next.set('category', cat);
    } else {
      next.delete('category');
    }
    setSearchParams(next);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      next.set('search', searchInput.trim());
    } else {
      next.delete('search');
    }
    setSearchParams(next);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  return (
    <div className="items-page">
      {/* Top Header */}
      <div className="items-header-bar">
        <div className="container">
          <div className="items-header-inner">
            <div>
              <span className="badge badge-category">Directory</span>
              <h1 className="items-title">Lost &amp; Found Directory</h1>
              <p className="items-subtitle">
                Search, filter, and discover items reported across your campus or community.
              </p>
            </div>

            <Link to="/report">
              <Button variant="primary" size="md" icon={PlusCircle}>
                Report an Item
              </Button>
            </Link>
          </div>

          {/* Type Toggle Tabs */}
          <div className="type-toggle-tabs">
            <button
              className={`type-tab ${currentType === '' ? 'active' : ''}`}
              onClick={() => setTypeFilter('')}
            >
              All Items
            </button>
            <button
              className={`type-tab ${currentType === 'lost' ? 'active lost' : ''}`}
              onClick={() => setTypeFilter('lost')}
            >
              Lost Items
            </button>
            <button
              className={`type-tab ${currentType === 'found' ? 'active found' : ''}`}
              onClick={() => setTypeFilter('found')}
            >
              Found Items
            </button>
          </div>
        </div>
      </div>

      <div className="container items-content-container">
        {/* Filter Controls Row */}
        <div className="filters-control-card">
          <form className="items-search-form" onSubmit={handleSearchSubmit}>
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by keywords, model, or location..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="items-search-input"
            />
            <Button type="submit" variant="primary" size="sm">
              Search
            </Button>
          </form>

          {/* Category Chips */}
          <div className="category-chips-list">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`category-chip ${currentCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="results-header-info">
          <div className="results-count">
            Showing <strong>{items.length}</strong> {items.length === 1 ? 'item' : 'items'}
            {currentType && ` in ${currentType}`}
            {currentCategory !== 'All' && ` • ${currentCategory}`}
          </div>

          {(currentType || currentCategory !== 'All' || currentSearch) && (
            <button onClick={handleResetFilters} className="reset-filters-btn">
              <RefreshCw size={13} />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="items-grid">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="item-skeleton" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="items-grid">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="empty-results-card">
            <AlertCircle size={48} className="empty-icon" />
            <h3 className="empty-title">No matching items found</h3>
            <p className="empty-desc">
              We couldn’t find any items matching your selected criteria. Try adjusting your filters or report a new lost/found notice.
            </p>
            <div className="empty-actions">
              <Button variant="outline" size="md" onClick={handleResetFilters}>
                Clear All Filters
              </Button>
              <Link to="/report">
                <Button variant="primary" size="md" icon={PlusCircle}>
                  Report New Item
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;
