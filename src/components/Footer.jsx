import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <i className="fas fa-home"></i> Nest<span>Finder</span>
            </div>
            <p>India's most trusted real estate platform. Connecting buyers, sellers, and renters since 2018.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">Buy Property</Link></li>
              <li><Link to="/">Rent Property</Link></li>
              <li><Link to="/">New Projects</Link></li>
              <li><Link to="/">Commercial</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/revenue">Revenue Model</Link></li>
              <li><Link to="/marketing">Marketing Strategy</Link></li>
              <li><Link to="/">Careers</Link></li>
              <li><Link to="/">Press</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Contact Us</h4>
            <ul>
              <li><i className="fas fa-phone"></i> +91 98765 43210</li>
              <li><i className="fas fa-envelope"></i> hello@nestfinder.in</li>
              <li><i className="fas fa-map-marker-alt"></i> 14th Floor, Prestige Tower, Bangalore – 560001</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 NestFinder Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
