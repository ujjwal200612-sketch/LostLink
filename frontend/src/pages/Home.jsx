import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  PlusCircle,
  ShieldCheck,
  Zap,
  Users,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  MapPin,
  Sparkles,
  Laptop,
  Briefcase,
  Key,
  FileText,
  Shirt,
  Gem,
  Dog,
  MessageSquare,
  Lock,
  Clock,
  Star,
  Quote,
  Compass,
  ChevronRight,
  AlertCircle,
  HeartHandshake,
} from 'lucide-react';
import Button from '../components/Button';
import ItemCard from '../components/ItemCard';
import StatCard from '../components/StatCard';
import { itemService } from '../services/api';
import './Home.css';

// Categories requested by the user
const heroCategories = [
  'All Categories',
  'Electronics',
  'Wallets & Bags',
  'Keys',
  'ID & Documents',
  'Clothing',
  'Jewelry',
  'Pets',
];

// Detailed category cards
const categoryCards = [
  {
    name: 'Electronics',
    query: 'Electronics',
    icon: Laptop,
    desc: 'Laptops, smartphones, headphones, tablets & chargers',
    itemCount: '120+ reported',
    color: '#38BDF8',
  },
  {
    name: 'Wallets & Bags',
    query: 'Wallets & Bags',
    icon: Briefcase,
    desc: 'Wallets, purses, backpacks, cardholders & luggage',
    itemCount: '85+ reported',
    color: '#818CF8',
  },
  {
    name: 'Keys',
    query: 'Keys',
    icon: Key,
    desc: 'Car fobs, house keys, university lanyards & rings',
    itemCount: '64+ reported',
    color: '#FBBF24',
  },
  {
    name: 'ID & Documents',
    query: 'ID & Documents',
    icon: FileText,
    desc: 'Student IDs, passports, driver licenses & cards',
    itemCount: '52+ reported',
    color: '#34D399',
  },
  {
    name: 'Clothing',
    query: 'Clothing',
    icon: Shirt,
    desc: 'Jackets, hoodies, caps, sunglasses, shoes & scarves',
    itemCount: '47+ reported',
    color: '#F472B6',
  },
  {
    name: 'Jewelry',
    query: 'Jewelry',
    icon: Gem,
    desc: 'Watches, rings, necklaces, bracelets & earrings',
    itemCount: '38+ reported',
    color: '#A78BFA',
  },
  {
    name: 'Pets',
    query: 'Pets',
    icon: Dog,
    desc: 'Lost dogs, friendly cats, collar-tagged domestic pets',
    itemCount: '19+ reported',
    color: '#FB923C',
  },
];

// 4 How It Works steps
const howItWorksSteps = [
  {
    step: '01',
    title: 'Report a Lost or Found Item',
    desc: 'Submit key details, approximate location, date, and an optional photo in under 60 seconds to immediately alert the network.',
    icon: FileText,
    link: '/report',
    linkText: 'Create a Report',
  },
  {
    step: '02',
    title: 'Browse Matching Items',
    desc: 'Explore our live directory with smart category filters, keyword search, and automatic location-proximity matching.',
    icon: Search,
    link: '/items',
    linkText: 'Search Directory',
  },
  {
    step: '03',
    title: 'Contact the Reporter',
    desc: 'Connect safely with the finder or rightful owner through protected communication channels and verified contact details.',
    icon: MessageSquare,
    link: '/items',
    linkText: 'Connect Safely',
  },
  {
    step: '04',
    title: 'Verify Ownership & Recover',
    desc: 'Confirm ownership through private security questions or serial numbers, then recover your item at designated safe return points.',
    icon: ShieldCheck,
    link: '/items',
    linkText: 'Claim Your Item',
  },
];

// Why LostLink 4 Pillars
const whyLostLinkFeatures = [
  {
    title: 'Fast Reporting',
    desc: 'File comprehensive notices in under 60 seconds with simple guided fields, quick photo uploads, and location pins.',
    icon: Zap,
    metric: '< 60s Fast Submission',
  },
  {
    title: 'Smart Item Discovery',
    desc: 'Intelligent category hierarchy, keyword filtering, and location matching ensure relevant items surface instantly.',
    icon: Sparkles,
    metric: '94.2% Match Rate',
  },
  {
    title: 'Secure Ownership Verification',
    desc: 'Multi-layer security questions and serial checks protect users against fraudulent claims and privacy breaches.',
    icon: ShieldCheck,
    metric: '100% Privacy Protected',
  },
  {
    title: 'Community-Based Assistance',
    desc: 'Brings together campus safety, city transit desks, local hubs, and good samaritans into one coordinated network.',
    icon: Users,
    metric: '18,400+ Active Members',
  },
];

// Sample Testimonials with authentic user profiles
const sampleTestimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'CS Student, HKBK College, Bengaluru',
    item: 'Samsung Galaxy S24 (Onyx Black)',
    badge: 'Reunited in 3 hours',
    rating: 5,
    quote:
      'I accidentally left my Samsung S24 in the HKBK College Library right before lab submissions. Within three hours of submitting a LostLink report, another student contacted me. The security question verified it was mine. A lifesaver!',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 2,
    name: 'Rohan Verma',
    role: 'Daily Metro Commuter, Indiranagar',
    item: 'Black Leather Wallet with ID & Metro Card',
    badge: 'Reunited same evening',
    rating: 5,
    quote:
      'Dropping my wallet on the Indiranagar Metro train seemed like a lost cause. Someone reported finding it on LostLink that same afternoon. I had it back with my Driving License and Metro card before dinner!',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 3,
    name: 'Ananya Rao',
    role: 'Community Volunteer & Resident, MG Road',
    item: 'Golden Retriever (Leo)',
    badge: 'Reunited in 5 hours',
    rating: 5,
    quote:
      'Our dog Leo panicked during evening fireworks and slipped through the gate near Commercial Street. A shopkeeper uploaded a photo on LostLink. Thanks to the real-time community feed, Leo was home safely!',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  },
];

const Home = () => {
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [itemTypeFilter, setItemTypeFilter] = useState('all'); // 'all', 'lost', 'found'
  const navigate = useNavigate();

  useEffect(() => {
    itemService
      .getRecentItems()
      .then((res) => {
        setRecentItems(res.items || []);
      })
      .catch((err) => {
        console.error('Error fetching recent items:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.append('search', searchQuery.trim());
    }
    if (selectedCategory !== 'All Categories') {
      params.append('category', selectedCategory);
    }
    navigate(`/items?${params.toString()}`);
  };

  // Filter the displayed recent items by type if user toggles pills
  const filteredRecentItems = recentItems
    .filter((item) => {
      if (itemTypeFilter === 'all') return true;
      return item.type?.toLowerCase() === itemTypeFilter;
    })
    .slice(0, 6);

  return (
    <div className="home-page">
      {/* ===================================================================
          1. HERO SECTION
          =================================================================== */}
      <section className="hero-section">
        {/* Visual Background Elements */}
        <div className="hero-bg-grid" />
        <div className="hero-ambient-glow hero-glow-top-left" />
        <div className="hero-ambient-glow hero-glow-bottom-right" />
        <div className="hero-ambient-glow hero-glow-center" />

        <div className="container hero-container">
          {/* Top Trust Pill */}
          <div className="hero-badge">
            <Sparkles size={14} className="hero-badge-icon" />
            <span>Smart, Community-Powered Lost &amp; Found Network</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title">
            Reuniting What’s <span className="hero-gradient-text">Lost</span> With Where It{' '}
            <span className="hero-gradient-text">Belongs</span>.
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            LostLink connects campuses, transit systems, and local communities to recover misplaced
            belongings in hours. File reports in seconds, discover matching items, and verify ownership safely.
          </p>

          {/* Large Elevated Search Box */}
          <form className="hero-search-card" onSubmit={handleSearchSubmit}>
            <div className="search-input-group">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="What did you lose or find? (e.g. Samsung Galaxy S24, HP Laptop, Honda Activa key...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="search-category-group">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="search-category-select"
                aria-label="Filter by Category"
              >
                {heroCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" variant="primary" size="lg" icon={Search} className="hero-search-btn">
              Search Items
            </Button>
          </form>

          {/* Action CTAs: Lost Something & Found Something */}
          <div className="hero-action-buttons">
            <Link to="/report?type=lost" className="hero-action-link">
              <button type="button" className="hero-btn hero-btn-lost">
                <PlusCircle size={18} />
                <span>I Lost Something</span>
              </button>
            </Link>

            <Link to="/report?type=found" className="hero-action-link">
              <button type="button" className="hero-btn hero-btn-found">
                <CheckCircle2 size={18} />
                <span>I Found Something</span>
              </button>
            </Link>
          </div>

          {/* Floating Quick Trust Highlights */}
          <div className="hero-trust-row">
            <div className="hero-trust-item">
              <Clock size={15} className="hero-trust-icon" />
              <span>Under 4 hrs average match time</span>
            </div>
            <div className="hero-trust-dot">•</div>
            <div className="hero-trust-item">
              <ShieldCheck size={15} className="hero-trust-icon" />
              <span>100% verified ownership returns</span>
            </div>
            <div className="hero-trust-dot">•</div>
            <div className="hero-trust-item">
              <Users size={15} className="hero-trust-icon" />
              <span>18,000+ active community members</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. RECENTLY REPORTED ITEMS SECTION
          =================================================================== */}
      <section className="section recent-items-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="badge badge-category">Live Directory Feed</span>
              <h2 className="section-title">Recently Reported Items</h2>
              <p className="section-subtitle">
                Latest verified notices across campuses, libraries, and transit stations.
              </p>
            </div>

            {/* Filter Toggle & Directory Link */}
            <div className="recent-filter-bar">
              <div className="type-toggle-group">
                <button
                  type="button"
                  className={`type-toggle-btn ${itemTypeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setItemTypeFilter('all')}
                >
                  All Recent (6)
                </button>
                <button
                  type="button"
                  className={`type-toggle-btn ${itemTypeFilter === 'lost' ? 'active' : ''}`}
                  onClick={() => setItemTypeFilter('lost')}
                >
                  Lost
                </button>
                <button
                  type="button"
                  className={`type-toggle-btn ${itemTypeFilter === 'found' ? 'active' : ''}`}
                  onClick={() => setItemTypeFilter('found')}
                >
                  Found
                </button>
              </div>

              <Link to="/items" className="view-all-link">
                <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                  Browse All Directory
                </Button>
              </Link>
            </div>
          </div>

          {/* Grid of 6 items */}
          {loading ? (
            <div className="items-loading-grid">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="item-skeleton" />
              ))}
            </div>
          ) : filteredRecentItems.length > 0 ? (
            <div className="items-grid">
              {filteredRecentItems.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="empty-recent-box">
              <AlertCircle size={36} className="empty-icon" />
              <p>No recent items found matching this filter.</p>
              <Button variant="outline" size="sm" onClick={() => setItemTypeFilter('all')}>
                Show All Items
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================
          3. CATEGORY SECTION
          =================================================================== */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-category">Explore By Category</span>
            <h2 className="section-title">Browse Items by Category</h2>
            <p className="section-subtitle mx-auto">
              Find misplaced objects fast or catalog a discovered item under the appropriate classification.
            </p>
          </div>

          <div className="categories-grid">
            {categoryCards.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/items?category=${encodeURIComponent(cat.query)}`}
                  className="category-card"
                >
                  <div className="category-icon-wrap" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                    <IconComponent size={26} />
                  </div>
                  <div className="category-info">
                    <div className="category-title-row">
                      <h3 className="category-name">{cat.name}</h3>
                      <span className="category-badge">{cat.itemCount}</span>
                    </div>
                    <p className="category-desc">{cat.desc}</p>
                    <span className="category-action-link">
                      <span>Browse items</span>
                      <ChevronRight size={14} className="cat-arrow" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. HOW IT WORKS SECTION
          =================================================================== */}
      <section className="section how-it-works-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-category">Simple 4-Step Process</span>
            <h2 className="section-title">How LostLink Works</h2>
            <p className="section-subtitle mx-auto">
              From the moment an item is misplaced to the verified reunion, our process is fast, safe, and transparent.
            </p>
          </div>

          <div className="how-it-works-grid">
            {howItWorksSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.step} className="how-step-card">
                  <div className="how-step-header">
                    <span className="how-step-badge">{step.step}</span>
                    <div className="how-step-icon-box">
                      <StepIcon size={24} />
                    </div>
                  </div>

                  <h3 className="how-step-title">{step.title}</h3>
                  <p className="how-step-desc">{step.desc}</p>

                  <Link to={step.link} className="how-step-link">
                    <span>{step.linkText}</span>
                    <ArrowRight size={14} />
                  </Link>

                  {/* Connecting visual arrow for desktop except last step */}
                  {index < howItWorksSteps.length - 1 && (
                    <div className="how-step-connector" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. WHY LOSTLINK SECTION
          =================================================================== */}
      <section className="section why-lostlink-section">
        <div className="container">
          <div className="why-lostlink-top">
            <div className="why-text-col">
              <span className="badge badge-category">Platform Advantages</span>
              <h2 className="section-title">Why Communities Choose LostLink</h2>
              <p className="section-subtitle">
                Traditional bulletin boards and lost-and-found boxes are slow and disorganized. LostLink delivers a smart, secure, and coordinated recovery system.
              </p>
            </div>

            <div className="why-stats-pill-group">
              <div className="why-highlight-chip">
                <Sparkles size={16} className="chip-icon" />
                <span>3x Faster Reunions than campus bulletin boards</span>
              </div>
            </div>
          </div>

          <div className="why-grid">
            {whyLostLinkFeatures.map((feat) => {
              const FeatIcon = feat.icon;
              return (
                <div key={feat.title} className="why-card">
                  <div className="why-card-top">
                    <div className="why-icon-wrap">
                      <FeatIcon size={24} />
                    </div>
                    <span className="why-metric-pill">{feat.metric}</span>
                  </div>
                  <h3 className="why-title">{feat.title}</h3>
                  <p className="why-desc">{feat.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Trust Banner Bar */}
          <div className="why-trust-banner">
            <div className="why-trust-col">
              <ShieldCheck size={28} className="trust-banner-icon" />
              <div>
                <h4 className="trust-banner-title">Zero-Tolerance for Fraudulent Claims</h4>
                <p className="trust-banner-desc">
                  Every handoff can require unique identifying marks, private questions, or secure campus desk intermediation.
                </p>
              </div>
            </div>
            <Link to="/report">
              <Button variant="primary" size="md" icon={PlusCircle}>
                Start Reporting
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          6. TESTIMONIALS SECTION
          =================================================================== */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-category">Verified Stories</span>
            <h2 className="section-title">Loved by Students &amp; Community Members</h2>
            <p className="section-subtitle mx-auto">
              Real accounts of how LostLink helped people recover what seemed lost forever.
            </p>
          </div>

          <div className="testimonials-grid">
            {sampleTestimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="star-rating">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} className="star-filled" />
                    ))}
                  </div>
                  <span className="testimonial-badge">{t.badge}</span>
                </div>

                <div className="testimonial-item-pill">
                  <span className="item-label">Recovered:</span>
                  <span className="item-value">{t.item}</span>
                </div>

                <p className="testimonial-quote">“{t.quote}”</p>

                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} className="author-avatar" loading="lazy" />
                  <div className="author-info">
                    <h4 className="author-name">{t.name}</h4>
                    <span className="author-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          CTA BANNER SECTION
          =================================================================== */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <span className="cta-mini-pill">Get Started Today</span>
              <h2 className="cta-title">Lost or Found Something Valuable?</h2>
              <p className="cta-desc">
                Don’t wait. File a notice in less than 60 seconds and notify nearby finders and campus security instantly.
              </p>
              <div className="cta-buttons">
                <Link to="/report?type=lost">
                  <Button variant="secondary" size="lg" icon={PlusCircle}>
                    Report Lost Item
                  </Button>
                </Link>
                <Link to="/report?type=found">
                  <button type="button" className="btn-found-cta">
                    <CheckCircle2 size={18} />
                    <span>Report Found Item</span>
                  </button>
                </Link>
                <Link to="/items">
                  <Button variant="outline" size="lg" icon={Search}>
                    Search All Directory
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
