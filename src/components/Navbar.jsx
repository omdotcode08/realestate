import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <i className="fas fa-home"></i>
          <span>Nest<span className="logo-accent">Finder</span></span>
        </div>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            <i className="fas fa-house"></i> Home
          </NavLink>
          <NavLink to="/revenue" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            <i className="fas fa-chart-line"></i> Revenue Model
          </NavLink>
          <NavLink to="/marketing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            <i className="fas fa-bullhorn"></i> Marketing
          </NavLink>
          <NavLink to="/crm" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            <i className="fas fa-users"></i> CRM
          </NavLink>
          <NavLink to="/security" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            <i className="fas fa-shield-halved"></i> Security
          </NavLink>
          
          <div className="nav-divider"></div>
          
          <NavLink to="/login" className={({ isActive }) => `nav-link auth-nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            <i className="fas fa-user-circle"></i> Sign In
          </NavLink>

          <button className="btn btn-outline btn-list-property" onClick={() => { navigate('/list-property'); closeMenu(); }}>
            <i className="fas fa-arrow-up-right-from-square"></i> List Property
          </button>
        </div>

        <button className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
