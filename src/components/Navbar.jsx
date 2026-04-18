import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';
import Button from './shared/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Revenue Model', path: '/revenue' },
    { name: 'Marketing', path: '/marketing' },
    { name: 'CRM', path: '/crm' },
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
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Login
            </Button>
            <Button variant="primary">
              List Your Property
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
              <Button variant="outline" className="w-full justify-center">Login</Button>
              <Button variant="primary" className="w-full justify-center">List Your Property</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
