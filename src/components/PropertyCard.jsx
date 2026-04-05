import { Link } from 'react-router-dom';
import { Heart, MapPin, Maximize, Bed, Bath } from 'lucide-react';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <div className="property-img">
        <img src={property.image} alt={property.title} />
        <div className="property-badges">
          <span className="property-type">{property.type}</span>
          <span className="property-status">{property.status}</span>
        </div>
        <button className="btn-save" aria-label="Save Property">
          <Heart size={20} />
        </button>
      </div>
      
      <div className="property-info">
        <h3 className="property-price">{property.price}</h3>
        <h4 className="property-title">{property.title}</h4>
        <p className="property-location">
          <MapPin size={16} /> {property.location}
        </p>
        
        <div className="property-meta">
          {property.beds > 0 && (
            <span title="Bedrooms">
              <Bed size={18} /> {property.beds}
            </span>
          )}
          {property.baths > 0 && (
            <span title="Bathrooms">
              <Bath size={18} /> {property.baths}
            </span>
          )}
          <span title="Area">
            <Maximize size={18} /> {property.area}
          </span>
        </div>
        
        <Link to={`/property/${property.id}`} className="btn btn-outline w-100 mt-3 btn-view-details">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
