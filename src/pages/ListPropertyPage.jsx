import { useState } from 'react';
import { AnimatedSection, FadeIn } from '../components/AnimatedSection';
import './ListPropertyPage.css';

const ListPropertyPage = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    bhk: '',
    area: '',
    price: '',
    description: '',
    amenities: [],
    name: '',
    phone: '',
    email: ''
  });

  const amenitiesMap = ['Gym', 'Pool', 'Parking', 'Security', 'Clubhouse', 'Garden', 'Power Backup', 'Lift'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAmenityToggle = (amenity) => {
    const newAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity];
    setFormData({ ...formData, amenities: newAmenities });
  };

  const calculateProgress = () => {
    return (step / 3) * 100;
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="list-property-page bg-muted">
        <div className="container success-container">
          <AnimatedSection className="success-wrapper glass-panel text-center">
            <div className="success-icon-wrap">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Property Listing Submitted!</h2>
            <p>Our team will verify the details and activate your listing within 24 hours.</p>
            <div className="summary-card">
              <div className="summary-item"><strong>Location:</strong> {formData.location || 'Not Specified'}</div>
              <div className="summary-item"><strong>Type:</strong> {formData.propertyType || 'Not Specified'}</div>
              <div className="summary-item"><strong>Price:</strong> {formData.price ? `₹${formData.price}` : 'Not Specified'}</div>
            </div>
            <button className="btn btn-primary" onClick={() => window.location.href = '/'}>Return Home</button>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="list-property-page">
      <div className="page-hero list-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content text-center">
          <FadeIn delay={0.1}>
            <h1 className="hero-title">List Your <span className="text-gold">Property</span></h1>
            <p className="hero-subtitle mx-auto">Reach thousands of genuine buyers and tenants instantly.</p>
          </FadeIn>
        </div>
      </div>

      <div className="container section-padding">
        <AnimatedSection className="form-container glass-panel">
          
          <div className="progress-wrapper">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${calculateProgress()}%` }}></div>
            </div>
            <div className="step-indicators">
              <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1. Details</div>
              <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2. Features</div>
              <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3. Contact</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="list-form">
            
            {step === 1 && (
              <div className="form-step active">
                <h3>Property Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Property Type</label>
                    <select name="propertyType" value={formData.propertyType} onChange={handleChange} required>
                      <option value="">Select Type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Plot">Plot</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>City / Locality</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Bandra West, Mumbai" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>BHK (If applicable)</label>
                    <input type="number" name="bhk" value={formData.bhk} onChange={handleChange} placeholder="e.g. 3" min="1" max="10" />
                  </div>
                  <div className="form-group">
                    <label>Area (sq.ft)</label>
                    <input type="number" name="area" value={formData.area} onChange={handleChange} placeholder="e.g. 1500" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Expected Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. 25000000" required />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-step active">
                <h3>Features & Amenities</h3>
                
                <div className="form-group">
                  <label>Property Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder="Highlight the key selling points of your property..."
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Select Amenities</label>
                  <div className="amenities-selector">
                    {amenitiesMap.map((amn) => (
                      <div 
                        key={amn} 
                        className={`amenity-chip ${formData.amenities.includes(amn) ? 'selected' : ''}`}
                        onClick={() => handleAmenityToggle(amn)}
                      >
                        <i className={`fas fa-check ${formData.amenities.includes(amn) ? 'visible' : 'hidden'}`}></i> {amn}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Upload Images (Mock)</label>
                  <div className="upload-box">
                    <i className="fas fa-cloud-upload-alt fa-3x mb-3 text-muted"></i>
                    <p>Drag and drop images here or click to browse</p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step active">
                <h3>Contact Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="terms-checkbox mt-4">
                  <label>
                    <input type="checkbox" required /> I confirm that I am the owner or authorized agent of this property.
                  </label>
                </div>
              </div>
            )}

            <div className="form-actions mt-5">
              {step > 1 && (
                <button type="button" className="btn btn-outline" onClick={prevStep}>Back</button>
              )}
              {step < 3 ? (
                <button type="button" className="btn btn-primary ms-auto" onClick={nextStep}>Next Step</button>
              ) : (
                <button type="submit" className="btn btn-primary ms-auto"><i className="fas fa-paper-plane"></i> Submit Listing</button>
              )}
            </div>

          </form>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ListPropertyPage;
