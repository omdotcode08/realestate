import { AnimatedSection, FadeIn } from '../components/AnimatedSection';
import './MarketingPage.css';

const MarketingPage = () => {
  return (
    <div className="marketing-page">
      <div className="page-hero marketing-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content text-center">
          <FadeIn delay={0.1}>
            <div className="hero-badge"><i className="fas fa-rocket"></i> Growth Strategy</div>
            <h1 className="hero-title">Marketing <span className="text-gold">Strategy</span></h1>
            <p className="hero-subtitle mx-auto">Multi-channel approach to reach millions of property seekers and build NestFinder as India's most recognizable real estate brand</p>
          </FadeIn>
        </div>
      </div>

      <section className="marketing-strategies-section">
        <div className="container">
          <AnimatedSection delay={0.1}>
            <div className="section-header">
              <h2 className="section-title">Our <span className="text-gold">Growth Channels</span></h2>
              <p className="section-subtitle">A holistic, data-driven approach to customer acquisition</p>
            </div>
          </AnimatedSection>
          
          <div className="strategies-grid">
            {[
              { icon: 'fa-search', title: 'SEO & Content', desc: 'Dominating search results with local area guides, property tips, and market analysis blogs.', impact: '+45% Organic Traffic' },
              { icon: 'fa-hashtag', title: 'Social Media', desc: 'Viral Instagram reels, YouTube property tours, and targeted Facebook lead generation ads.', impact: '2M+ Reach/Mo' },
              { icon: 'fa-ad', title: 'Google PPC Ads', desc: 'High-intent search campaigns capturing users actively looking to buy or rent in specific micro-markets.', impact: '12% Conversion Rate' },
              { icon: 'fa-users', title: 'Referral Program', desc: '"Refer a Friend, Earn ₹5000" program leveraging our existing happy user base to drive word-of-mouth.', impact: '30% Lower CAC' },
              { icon: 'fa-envelope-open-text', title: 'Email Marketing', desc: 'Automated property alerts and weekly newsletters personalized to user search behavior.', impact: '40% Open Rate' },
              { icon: 'fa-handshake', title: 'Influencer Collabs', desc: 'Partnering with finance and lifestyle influencers to review properties and educate first-time buyers.', impact: 'Brand Trust +++' }
            ].map((strategy, i) => (
              <AnimatedSection key={i} delay={0.1 * (i % 2)}>
                <div className="strategy-card">
                  <div className="strategy-icon"><i className={`fas ${strategy.icon}`}></i></div>
                  <div className="strategy-content">
                    <h3>{strategy.title}</h3>
                    <p>{strategy.desc}</p>
                    <div className="impact-badge">{strategy.impact}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="funnel-section">
        <div className="container">
          <AnimatedSection delay={0.1}>
            <div className="section-header">
              <h2 className="section-title">Marketing <span className="text-gold">Funnel</span></h2>
            </div>
          </AnimatedSection>
          
          <div className="funnel-diagram">
            <AnimatedSection delay={0.1}>
              <div className="funnel-stage awareness">
                <div className="funnel-shape"></div>
                <div className="funnel-content">
                  <div className="funnel-icon"><i className="fas fa-eye"></i></div>
                  <h3>Awareness</h3>
                  <p>Social Ads, PR, Influencers</p>
                  <div className="funnel-metric">2M+ Reach</div>
                </div>
              </div>
              <div className="funnel-arrow"><i className="fas fa-chevron-down"></i></div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="funnel-stage interest">
                <div className="funnel-shape"></div>
                <div className="funnel-content">
                  <div className="funnel-icon"><i className="fas fa-heart"></i></div>
                  <h3>Interest</h3>
                  <p>Blog, Property Guides, SEO</p>
                  <div className="funnel-metric">800K+ Engaged</div>
                </div>
              </div>
              <div className="funnel-arrow"><i className="fas fa-chevron-down"></i></div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <div className="funnel-stage intent">
                <div className="funnel-shape"></div>
                <div className="funnel-content">
                  <div className="funnel-icon"><i className="fas fa-search-dollar"></i></div>
                  <h3>Intent</h3>
                  <p>Google PPC, WhatsApp Outreach</p>
                  <div className="funnel-metric">250K+ Leads</div>
                </div>
              </div>
              <div className="funnel-arrow"><i className="fas fa-chevron-down"></i></div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.4}>
              <div className="funnel-stage purchase">
                <div className="funnel-shape"></div>
                <div className="funnel-content">
                  <div className="funnel-icon"><i className="fas fa-key"></i></div>
                  <h3>Purchase</h3>
                  <p>Site Visits, CRM, Negotiation</p>
                  <div className="funnel-metric">15K+ Deals</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="email-section">
        <div className="container">
          <AnimatedSection delay={0.1}>
            <div className="section-header">
              <h2 className="section-title">Email <span className="text-gold">Marketing</span></h2>
            </div>
          </AnimatedSection>
          <div className="email-layout">
            <AnimatedSection delay={0.1}>
              <div className="newsletter-signup">
                <h3>Join 500K+ Property Seekers</h3>
                <p>Get weekly curated property picks, market insights, and exclusive deals straight to your inbox.</p>
                <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
                  <input type="text" placeholder="Your Full Name" required />
                  <input type="email" placeholder="Your Email Address" required />
                  <button type="submit" className="btn btn-primary w-100">
                    <i className="fas fa-paper-plane"></i> Subscribe Now
                  </button>
                </form>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="email-preview">
                <div className="email-mock">
                  <div className="email-header">
                    <div><i className="fas fa-home"></i> NestFinder Weekly</div>
                    <div style={{fontSize: '0.8rem'}}>Apr 2026</div>
                  </div>
                  <div className="email-body">
                    <div className="email-hero-img"></div>
                    <h4>🏡 This Week's Top Picks</h4>
                    <p>Based on your search history, here are 2 properties we think you'll love...</p>
                    <div className="email-prop-list">
                      <div className="email-prop">
                        <span>🏢 3BHK in Koramangala</span>
                        <strong>₹1.2 Cr</strong>
                      </div>
                      <div className="email-prop">
                        <span>🏠 4BHK Villa, Whitefield</span>
                        <strong>₹2.8 Cr</strong>
                      </div>
                    </div>
                    <button className="email-cta">View Matches &rarr;</button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketingPage;
