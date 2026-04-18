import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Building2, Menu, X, User } from 'lucide-react';
import Button from './shared/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Financials', path: '/revenue' },
    { name: 'Growth', path: '/marketing' },
    { name: 'Workspace', path: '/crm' },
    { name: 'Security', path: '/security' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-navy-900/95 backdrop-blur-md shadow-lg py-3' : 'bg-navy-900 py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gold-500 text-navy-900 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Nest<span className="text-gold-500">Finder</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `font-medium transition-colors ${
                    isActive ? 'text-gold-500' : 'text-slate-300 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={() => navigate('/login')} className="text-slate-200 hover:text-white border border-slate-600 hover:border-slate-400 hover:bg-slate-800 transition-all rounded-full px-5 py-2 font-medium flex items-center gap-2 shadow-sm text-sm">
              <User className="w-4 h-4" /> Sign In
            </button>
            <Button variant="primary" onClick={() => navigate('/list')} className="rounded-full shadow-lg hover:shadow-xl transition-shadow px-6">
              Post Property
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-navy-900 border-t border-slate-800 shadow-xl">
          <div className="flex flex-col px-4 py-6 gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-lg font-medium ${
                    isActive ? 'bg-gold-500/10 text-gold-500' : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-800">
              <Button variant="outline" className="w-full justify-center" onClick={() => { navigate('/login'); setIsOpen(false); }}>Login</Button>
              <Button variant="primary" className="w-full justify-center" onClick={() => { navigate('/list'); setIsOpen(false); }}>Post Property</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
