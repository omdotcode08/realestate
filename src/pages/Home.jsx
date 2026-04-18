import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { mockProperties, mockCities, mockTestimonials } from '../data/mockData';
import { Search, MapPin, Building, DollarSign, Heart, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import Button from '../components/shared/Button';
import Badge from '../components/shared/Badge';
import Modal from '../components/shared/Modal';
import Toast from '../components/shared/Toast';
import KPICard from '../components/shared/KPICard';
import { motion } from 'framer-motion';

export default function Home() {
  // --- Hero Search State ---
  const [location, setLocation] = useState('');
  const [type, setType] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [mode, setMode] = useState('Buy'); // Buy or Rent
  
  // --- Property Grid & Filters ---
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [activeTab, setActiveTab] = useState('All'); // All / Apartment / Villa / Plot / Commercial
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [budgetLimit, setBudgetLimit] = useState(150000000); // 15 Cr max initially

  // --- Saved logic ---
  const [savedIds, setSavedIds] = useLocalStorage('nestfinder_saved', []);
  const [toastMessage, setToastMessage] = useState(null);

  // --- Detail Modal ---
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // --- EMI variables ---
  const [emiAmount, setEmiAmount] = useState(0);

  // --- Testimonial Carousel ---
  const [testiIndex, setTestiIndex] = useState(0);

  // Combine filters for property grid
  useEffect(() => {
    let result = mockProperties;

    // Filter by Tab
    if (activeTab !== 'All') {
      result = result.filter(p => p.type === activeTab);
    }

    // Filter by max budget slider
    result = result.filter(p => p.price <= budgetLimit);

    // Initial Search Box Match
    if (location) {
      result = result.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (type !== 'All') {
      result = result.filter(p => p.type === type);
    }
    if (minPrice) {
      result = result.filter(p => p.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => p.price <= parseInt(maxPrice));
    }

    // Sort
    if (sortOrder === 'Price Low–High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'Price High–Low') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Newest first (mock random or by id)
      result.sort((a, b) => a.id.localeCompare(b.id)); // Simple mock sort fallback
    }

    setFilteredProperties(result);
  }, [activeTab, budgetLimit, location, type, minPrice, maxPrice, sortOrder]);

  // Testimonial Auto-Advance
  useEffect(() => {
    const timer = setInterval(() => {
      setTestiIndex(prev => (prev + 1) % mockTestimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    // In this SPA demo, search filters automatically propagate due to useEffect
    // Could scroll down to listings grid...
    const gridId = document.getElementById('property-grid');
    if(gridId) gridId.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleSave = (id, e) => {
    e.stopPropagation();
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter(savedId => savedId !== id));
      setToastMessage('Removed from saved properties');
    } else {
      setSavedIds([...savedIds, id]);
      setToastMessage('Added to saved properties');
    }
  };

  const calculateEMI = (price) => {
    const loanAmount = price * 0.8; // 80% loan
    const rate = 8.5 / 12 / 100; // 8.5% annual
    const tenure = 20 * 12; // 20 years
    const emi = (loanAmount * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
    setEmiAmount(Math.round(emi));
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    calculateEMI(property.price);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Toast Notification */}
      <Toast 
        isVisible={!!toastMessage} 
        message={toastMessage} 
        onClose={() => setToastMessage(null)} 
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 flex items-center justify-center min-h-[85vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-900/70 bg-gradient-to-t from-navy-900/90 to-transparent mix-blend-multiply"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-md"
            >
              Find Your <span className="text-gold-500">Dream Home</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
              className="text-xl text-slate-200"
            >
              Discover premium properties across India's top locations.
            </motion.p>
          </div>

          {/* Search Box */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="glass p-3 rounded-2xl max-w-5xl mx-auto"
          >
            <div className="flex gap-2 mb-3 px-3 pt-2">
              <button 
                onClick={() => setMode('Buy')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${mode === 'Buy' ? 'bg-gold-500 text-navy-900' : 'text-slate-300 hover:bg-white/10'}`}
              >
                Buy
              </button>
              <button 
                onClick={() => setMode('Rent')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${mode === 'Rent' ? 'bg-gold-500 text-navy-900' : 'text-slate-300 hover:bg-white/10'}`}
              >
                Rent
              </button>
            </div>
            
            <form onSubmit={handleHeroSearch} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl">
              <div className="flex-1 relative">
                <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Location or City" 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-none bg-slate-50 focus:ring-2 focus:ring-gold-500 outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  list="city-suggestions"
                />
                <datalist id="city-suggestions">
                  {mockCities.map(city => <option key={city} value={city} />)}
                </datalist>
              </div>
              
              <div className="w-full md:w-48 relative">
                <Building className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-none bg-slate-50 focus:ring-2 focus:ring-gold-500 outline-none appearance-none"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plot">Plot</option>
                </select>
              </div>

              <div className="flex gap-2 w-full md:w-64 relative">
                <DollarSign className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                <input 
                  type="number" 
                  placeholder="Min ₹" 
                  className="w-1/2 pl-10 pr-2 py-3 rounded-lg border-none bg-slate-50 focus:ring-2 focus:ring-gold-500 outline-none"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input 
                  type="number" 
                  placeholder="Max ₹" 
                  className="w-1/2 px-4 py-3 rounded-lg border-none bg-slate-50 focus:ring-2 focus:ring-gold-500 outline-none"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <Button type="submit" variant="primary" className="md:w-32 py-3 text-lg">
                Search
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="py-16 bg-white border-b border-slate-100 relative z-20 -mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             <KPICard title="Total Properties" value="0" numericValue={10000} suffix="+" />
             <KPICard title="Happy Clients" value="0" numericValue={5000} suffix="+" />
             <KPICard title="Cities Covered" value="0" numericValue={200} suffix="+" />
             <KPICard title="Transactions" value="0" numericValue={500} prefix="₹" suffix="Cr+" />
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section id="property-grid" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-2">Featured Listings</h2>
              <p className="text-slate-500">Discover handpicked properties matching your criteria</p>
            </div>
            
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-200 overflow-x-auto">
                {['All', 'Apartment', 'Villa', 'Plot', 'Commercial'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab ? 'bg-navy-900 text-white' : 'text-slate-600 hover:text-navy-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <select 
                className="bg-white border border-slate-200 rounded-lg px-4 py-2 outline-none focus:border-gold-500 shadow-sm text-sm"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option>Newest First</option>
                <option>Price Low–High</option>
                <option>Price High–Low</option>
              </select>
            </div>
          </div>

          <div className="mb-8 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <span className="text-sm font-medium text-slate-600 whitespace-nowrap">Max Budget</span>
            <input 
              type="range" 
              min="1000000" 
              max="200000000" 
              step="1000000"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(Number(e.target.value))}
            />
            <span className="text-sm font-bold text-navy-900 whitespace-nowrap w-24 text-right">
              ₹{(budgetLimit / 10000000).toFixed(2)} Cr
            </span>
          </div>

          {/* Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={property.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="primary">{property.type}</Badge>
                    </div>
                    <button 
                      onClick={(e) => toggleSave(property.id, e)}
                      className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${savedIds.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-navy-900'}`} />
                    </button>
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">{property.priceStr}</h3>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h4 className="font-semibold text-lg text-navy-900 line-clamp-1 mb-1">{property.title}</h4>
                    <p className="text-slate-500 text-sm flex items-center mb-4">
                      <MapPin className="w-4 h-4 mr-1 opacity-70" /> {property.location}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-5 pb-5 border-b border-slate-100">
                      {property.bhk !== 'N/A' && (
                         <div className="flex flex-col">
                           <span className="font-bold text-navy-900">{property.bhk}</span>
                         </div>
                      )}
                      <div className="w-px h-8 bg-slate-200"></div>
                      <div className="flex flex-col">
                        <span className="font-bold text-navy-900">{property.area} <span className="font-normal text-xs text-slate-500">sq.ft</span></span>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleViewDetails(property)}
                    >
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="bg-white inline-block p-6 rounded-full shadow-sm mb-4">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">No Properties Found</h3>
              <p className="text-slate-500">We couldn't find any properties matching your current filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-navy-900 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">What Our Clients Say</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Trusted by thousands of families and businesses across India.</p>
          </div>

          <div className="max-w-4xl mx-auto flex items-center">
            <button 
              onClick={() => setTestiIndex(prev => prev === 0 ? mockTestimonials.length - 1 : prev - 1)}
              className="p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden sm:block"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <div className="flex-1 overflow-hidden px-4">
              <motion.div 
                key={testiIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-5xl text-gold-500 mb-6 font-serif">"</div>
                <p className="text-2xl text-slate-200 italic mb-8 leading-relaxed">
                  {mockTestimonials[testiIndex].text}
                </p>
                <div className="h-px w-20 bg-gold-500/50 mx-auto mb-6"></div>
                <h4 className="text-xl font-bold text-white">{mockTestimonials[testiIndex].name}</h4>
                <p className="text-gold-500">{mockTestimonials[testiIndex].role}</p>
              </motion.div>
            </div>

            <button 
              onClick={() => setTestiIndex(prev => (prev + 1) % mockTestimonials.length)}
              className="p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden sm:block"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
          
          <div className="flex justify-center gap-2 mt-10">
            {mockTestimonials.map((_, i) => (
              <button 
                key={i} 
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === testiIndex ? 'bg-gold-500 w-8' : 'bg-white/30'}`}
                onClick={() => setTestiIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Property Detail Modal */}
      <Modal 
        isOpen={!!selectedProperty} 
        onClose={() => setSelectedProperty(null)}
        title="Listing Details"
        maxWidth="max-w-4xl"
      >
        {selectedProperty && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-64 object-cover rounded-xl mb-4" />
                
                <h4 className="font-bold text-navy-900 mb-3 border-b pb-2">Amenities</h4>
                <ul className="grid grid-cols-2 gap-y-2">
                  {selectedProperty.amenities.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-600 gap-2">
                      <Check className="w-4 h-4 text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="primary">{selectedProperty.type}</Badge>
                  <h3 className="text-2xl font-bold text-navy-900">{selectedProperty.priceStr}</h3>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">{selectedProperty.title}</h2>
                <p className="text-slate-500 flex items-center gap-1 mb-6">
                  <MapPin className="w-4 h-4" /> {selectedProperty.location}
                </p>

                <p className="text-slate-700 leading-relaxed mb-8 flex-1">
                  {selectedProperty.description}
                </p>

                {/* EMI Calculator */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6">
                  <h4 className="font-bold text-navy-900 mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gold-500" /> EMI Estimator
                  </h4>
                  <div className="flex justify-between items-end border-b border-slate-200 pb-3 mb-3">
                    <span className="text-sm text-slate-500">Based on 80% loan, 8.5% interest, 20 yr tenure</span>
                    <span className="text-xl font-bold text-emerald-600">₹{emiAmount.toLocaleString()}/mo</span>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setToastMessage("Loan advisor contact requested.")}>
                    Apply for Home Loan
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="primary" 
                    className="flex-1"
                    onClick={() => {
                      setToastMessage("Visit booking form opened (dummy action)");
                      setSelectedProperty(null);
                    }}
                  >
                    Schedule Visit
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-16 px-0"
                    onClick={(e) => toggleSave(selectedProperty.id, e)}
                  >
                     <Heart className={`w-5 h-5 ${savedIds.includes(selectedProperty.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
