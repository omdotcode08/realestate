import { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import { AnimatedSection, FadeIn } from '../components/AnimatedSection';
import { MOCK_PROPERTIES } from '../data/properties';
import { MapPin, Building, Search, Star } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const [searchToggle, setSearchToggle] = useState('buy');
  const [filterType, setFilterType] = useState('all');

  const filteredProperties = filterType === 'all' 
    ? MOCK_PROPERTIES 
    : MOCK_PROPERTIES.filter(p => p.type.toLowerCase() === filterType);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <FadeIn delay={0.1}>
            <div className="hero-badge"><Star size={16} className="text-gold" /> India's Premium Real Estate Platform</div>
            <h1 className="hero-title">Find Your <span className="text-gold">Dream Home</span></h1>
            <p className="hero-subtitle">Explore 10,000+ verified properties across top cities. Buy, Rent, or Invest with absolute confidence.</p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="search-box glass-panel">
              <div className="search-toggle">
                <button className={`toggle-btn ${searchToggle === 'buy' ? 'active' : ''}`} onClick={() => setSearchToggle('buy')}>Buy</button>
                <button className={`toggle-btn ${searchToggle === 'rent' ? 'active' : ''}`} onClick={() => setSearchToggle('rent')}>Rent</button>
              </div>
              <div className="search-inputs">
                <div className="search-field">
                  <MapPin size={20} className="text-muted" />
                  <input type="text" placeholder="Enter city, locality or project" />
                </div>
                <div className="search-field">
                  <Building size={20} className="text-muted" />
                  <select defaultValue="">
                    <option value="">Property Type</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Plot</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <button className="btn btn-primary btn-search-hero">
                  <Search size={20} /> Search
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection delay={0.1}>
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon"><Building /></div>
                <div className="stat-number">12,500+</div>
                <div className="stat-label">Verified Listings</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><Star /></div>
                <div className="stat-number">4.9/5</div>
                <div className="stat-label">Client Rating</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><MapPin /></div>
                <div className="stat-number">200+</div>
                <div className="stat-label">Cities Covered</div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Listings Section */}
      <section className="listings-section bg-muted">
        <div className="container">
          <AnimatedSection delay={0.1}>
            <div className="section-header">
              <h2 className="section-title">Premium <span className="text-gold">Properties</span></h2>
              <p className="section-subtitle">Handpicked luxury properties verified by our experts for your peace of mind.</p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className="filter-tabs">
              {['all', 'apartment', 'villa', 'plot', 'commercial'].map(type => (
                <button 
                  key={type}
                  className={`filter-tab ${filterType === type ? 'active' : ''}`}
                  onClick={() => setFilterType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="properties-grid">
            {filteredProperties.map((property, idx) => (
              <AnimatedSection key={property.id} delay={0.1 * (idx % 3)}>
                <PropertyCard property={property} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <AnimatedSection delay={0.1}>
            <div className="section-header">
              <h2 className="section-title">What Our <span className="text-gold">Clients Say</span></h2>
            </div>
          </AnimatedSection>
          
          <div className="testimonials-grid">
            {[1, 2, 3].map((i, idx) => (
              <AnimatedSection key={i} delay={0.2 * idx}>
                <div className="testimonial-card">
                  <div className="stars">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="var(--secondary)" color="var(--secondary)" />)}
                  </div>
                  <p>"NestFinder made buying my luxury villa an absolute breeze. Their curated listings, verified properties, and expert legal support are simply unmatched in the market."</p>
                  <div className="client-info">
                    <div className="client-avatar">AS</div>
                    <div>
                      <h5>Anjali Sharma</h5>
                      <span>Villa Owner, Bangalore</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
