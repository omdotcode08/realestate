import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, Compass, Calendar, ArrowLeft, Phone, Mail, Share2, Heart, Award } from 'lucide-react';
import { MOCK_PROPERTIES } from '../data/properties';
import './PropertyDetailsPage.css';
import { AnimatedSection, FadeIn } from '../components/AnimatedSection';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProperty = MOCK_PROPERTIES.find(p => p.id === parseInt(id));
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!property) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="property-details-page">
      {/* Header Bar */}
      <div className="details-header-bar">
        <div className="container">
          <button onClick={() => navigate(-1)} className="btn-back">
            <ArrowLeft size={20} /> Back to Search
          </button>
          <div className="header-actions">
            <button className="icon-btn"><Share2 size={20} /></button>
            <button className="icon-btn"><Heart size={20} /></button>
          </div>
        </div>
      </div>

      <div className="container details-container">
        {/* Title & Price Section */}
        <FadeIn delay={0.1}>
          <div className="title-row">
            <div>
              <div className="badges">
                <span className="badge-primary">{property.type}</span>
                <span className="badge-secondary">{property.status}</span>
              </div>
              <h1 className="details-title">{property.title}</h1>
              <p className="details-location"><MapPin size={18} /> {property.location}</p>
            </div>
            <div className="price-block">
              <h2 className="details-price">{property.price}</h2>
              <p className="emi-text">EMI starts at ₹1.2L / month</p>
            </div>
          </div>
        </FadeIn>

        {/* Gallery Section */}
        <FadeIn delay={0.2}>
          <div className="gallery-section">
            <div className="main-image">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  src={property.images[activeImage]} 
                  alt="Main Property View" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>
            <div className="thumbnail-list">
              {property.images.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="details-content-grid">
          {/* Left Column: Details */}
          <div className="main-details">
            <AnimatedSection delay={0.3}>
              <div className="overview-container glass-panel">
                <div className="overview-item">
                  <Bed className="text-gold" />
                  <div>
                    <span>Bedrooms</span>
                    <strong>{property.beds} Beds</strong>
                  </div>
                </div>
                <div className="overview-item">
                  <Bath className="text-gold" />
                  <div>
                    <span>Bathrooms</span>
                    <strong>{property.baths} Baths</strong>
                  </div>
                </div>
                <div className="overview-item">
                  <Maximize className="text-gold" />
                  <div>
                    <span>Carpet Area</span>
                    <strong>{property.area}</strong>
                  </div>
                </div>
                <div className="overview-item">
                  <Compass className="text-gold" />
                  <div>
                    <span>Facing</span>
                    <strong>{property.facing}</strong>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="section-block">
                <h3>About Property</h3>
                <p className="description-text">{property.description}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="section-block bg-muted">
                <h3>Premium Amenities</h3>
                <div className="amenities-grid">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="amenity-item">
                      <Award className="text-gold" size={20} />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="sidebar">
            <AnimatedSection delay={0.6}>
              <div className="agent-card glass-panel">
                <h3>Contact Realtor</h3>
                
                <div className="agent-profile">
                  <div className="agent-avatar" style={{background: property.agent.color}}>
                    {property.agent.initial}
                  </div>
                  <div>
                    <h4>{property.agent.name}</h4>
                    <span className="agent-rating">⭐ {property.agent.rating} (120+ reviews)</span>
                  </div>
                </div>

                <div className="contact-buttons">
                  <button className="btn btn-primary w-100">
                    <Phone size={18} /> Request Call Back
                  </button>
                  <button className="btn btn-outline w-100">
                    <Calendar size={18} /> Book Site Visit
                  </button>
                </div>

                <div className="safety-note">
                  <p><i className="fas fa-shield-alt text-gold"></i> This property is 100% verified by our legal team. Secure your visit today.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
