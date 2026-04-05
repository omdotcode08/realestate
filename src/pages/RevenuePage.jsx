import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { AnimatedSection, FadeIn } from '../components/AnimatedSection';
import './RevenuePage.css';

const RevenuePage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Subscriptions', 'Lead Generation', 'Home Loans', 'Featured Listings', 'Legal', 'Interior'],
          datasets: [{
            data: [22, 28, 18, 15, 10, 7],
            backgroundColor: [
              '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'
            ],
            borderWidth: 0,
            hoverOffset: 10
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right', labels: { font: { family: 'Inter' } } },
            tooltip: { callbacks: { label: (context) => ` ${context.label}: ${context.raw}% of Total Revenue` } }
          },
          cutout: '70%'
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="revenue-page">
      <div className="page-hero revenue-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content text-center">
          <FadeIn delay={0.1}>
            <div className="hero-badge"><i className="fas fa-chart-pie"></i> Business Model</div>
            <h1 className="hero-title">Our <span className="text-gold">Revenue Model</span></h1>
            <p className="hero-subtitle mx-auto">Discover how NestFinder generates sustainable revenue while delivering immense value to all stakeholders</p>
          </FadeIn>
        </div>
      </div>

      <section className="revenue-streams-section">
        <div className="container">
          <AnimatedSection delay={0.1}>
            <div className="section-header">
              <h2 className="section-title">Revenue <span className="text-gold">Streams</span></h2>
              <p className="section-subtitle">Multiple diversified income channels ensuring long-term sustainability</p>
            </div>
          </AnimatedSection>
          
          <div className="revenue-cards-grid">
            {[
              { icon: 'fa-crown', title: 'Subscription Plans', desc: 'Monthly/annual subscriptions for agents, builders, and developers.', rev: '₹18 Crore', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
              { icon: 'fa-star', title: 'Featured Listing Fees', desc: 'Builders pay premium fees to have their listings appear at the top.', rev: '₹12 Crore', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
              { icon: 'fa-user-plus', title: 'Lead Generation', desc: 'Verified buyer leads are charged on a per-lead or CPL model.', rev: '₹22 Crore', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
              { icon: 'fa-hand-holding-usd', title: 'Home Loans', desc: 'Earn referral commissions from 15+ banking partners.', rev: '₹15 Crore', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
              { icon: 'fa-file-signature', title: 'Legal Services', desc: 'Property registration, title verification, and document drafting.', rev: '₹8 Crore', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
              { icon: 'fa-paint-roller', title: 'Interior Referrals', desc: 'Commission-based referrals to interior designers and contractors.', rev: '₹5 Crore', color: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' }
            ].map((stream, i) => (
              <AnimatedSection key={i} delay={0.1 * (i % 3)}>
                <div className="revenue-card glass-panel">
                  <div className="revenue-card-icon" style={{ background: stream.color }}>
                    <i className={`fas ${stream.icon}`}></i>
                  </div>
                  <h3>{stream.title}</h3>
                  <p>{stream.desc}</p>
                  <div className="revenue-badge">{stream.rev} / Year</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-section">
        <div className="container">
          <AnimatedSection delay={0.1}>
            <div className="section-header">
              <h2 className="section-title">Agent Subscription <span className="text-gold">Plans</span></h2>
            </div>
            
            <div className="pricing-toggle-wrap">
              <span className={!isAnnual ? 'active-text' : ''}>Monthly</span>
              <label className="pricing-switch">
                <input type="checkbox" checked={isAnnual} onChange={() => setIsAnnual(!isAnnual)} />
                <span className="pricing-slider"></span>
              </label>
              <span className={isAnnual ? 'active-text' : ''}>Annual <span className="discount-badge">Save 20%</span></span>
            </div>
          </AnimatedSection>

          <div className="pricing-grid">
            <AnimatedSection delay={0.1}>
              <div className="pricing-card">
                <div className="plan-name">Basic</div>
                <div className="plan-price">₹{isAnnual ? '799' : '999'}<span>/mo</span></div>
                <div className="plan-desc">Perfect for independent agents</div>
                <ul className="plan-features">
                  <li><i className="fas fa-check"></i> 10 Active Listings</li>
                  <li><i className="fas fa-check"></i> Basic Analytics</li>
                  <li><i className="fas fa-check"></i> 5 Lead Credits/Mo</li>
                  <li className="disabled"><i className="fas fa-times"></i> Featured Listings</li>
                </ul>
                <button className="btn btn-outline w-100 mt-4">Get Started</button>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="pricing-card popular">
                <div className="popular-badge">Most Popular</div>
                <div className="plan-name">Pro</div>
                <div className="plan-price">₹{isAnnual ? '2399' : '2999'}<span>/mo</span></div>
                <div className="plan-desc">Best for growing agents</div>
                <ul className="plan-features">
                  <li><i className="fas fa-check"></i> 50 Active Listings</li>
                  <li><i className="fas fa-check"></i> Advanced Analytics</li>
                  <li><i className="fas fa-check"></i> 25 Lead Credits/Mo</li>
                  <li><i className="fas fa-check"></i> 3 Featured Listings</li>
                </ul>
                <button className="btn btn-primary w-100 mt-4">Get Started</button>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <div className="pricing-card">
                <div className="plan-name">Enterprise</div>
                <div className="plan-price">₹{isAnnual ? '7999' : '9999'}<span>/mo</span></div>
                <div className="plan-desc">For large developer firms</div>
                <ul className="plan-features">
                  <li><i className="fas fa-check"></i> Unlimited Listings</li>
                  <li><i className="fas fa-check"></i> API Access</li>
                  <li><i className="fas fa-check"></i> Unlimited Leads</li>
                  <li><i className="fas fa-check"></i> 10 Featured Listings</li>
                </ul>
                <button className="btn btn-outline w-100 mt-4">Contact Sales</button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="revenue-flow-section">
        <div className="container">
          <AnimatedSection delay={0.1}>
            <div className="section-header">
              <h2 className="section-title">Revenue <span className="text-gold">Distribution</span></h2>
            </div>
            <div className="chart-container" style={{ position: 'relative', height: '400px', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
              <canvas ref={chartRef}></canvas>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default RevenuePage;
