import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RevenueModel from './pages/RevenueModel';
import MarketingStrategy from './pages/MarketingStrategy';
import CRM from './pages/CRM';
import Security from './pages/Security';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/revenue" element={<RevenueModel />} />
        <Route path="/marketing" element={<MarketingStrategy />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/security" element={<Security />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
