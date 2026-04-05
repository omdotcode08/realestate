import { useState, useEffect } from 'react';
import { AnimatedSection, FadeIn } from '../components/AnimatedSection';
import './SecurityPage.css';

const SecurityPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [authStep, setAuthStep] = useState('credentials'); // credentials -> 2fa -> success
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // Password strength logic
  useEffect(() => {
    let strength = 0;
    if (password.length > 5) strength += 1;
    if (password.length > 8) strength += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [password]);

  // Timer logic for 2FA
  useEffect(() => {
    let timer;
    if (authStep === '2fa' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [authStep, timeLeft]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setAuthStep('2fa');
      setTimeLeft(60);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError(false);

    // Auto-focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify2FA = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue === '123456') { // Mock correct OTP
      setAuthStep('success');
    } else {
      setOtpError(true);
      setOtp(['', '', '', '', '', '']);
      const firstInput = document.getElementById('otp-0');
      if (firstInput) firstInput.focus();
    }
  };

  const getStrengthColor = () => {
    switch(passwordStrength) {
      case 0: return '#e2e8f0';
      case 1: return '#ef4444'; // Red
      case 2: return '#f59e0b'; // Yellow
      case 3: return '#3b82f6'; // Blue
      case 4: return '#10b981'; // Green
      default: return '#e2e8f0';
    }
  };

  return (
    <div className="security-page">
      <div className="page-hero security-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content text-center">
          <FadeIn delay={0.1}>
            <div className="hero-badge"><i className="fas fa-shield-alt"></i> Enterprise Grade</div>
            <h1 className="hero-title">Platform <span className="text-gold">Security</span></h1>
            <p className="hero-subtitle mx-auto">Your data and transactions are protected by bank-level encryption and advanced authentication mechanisms.</p>
          </FadeIn>
        </div>
      </div>

      <section className="security-features-section">
        <div className="container">
          <AnimatedSection delay={0.1}>
            <div className="section-header">
              <h2 className="section-title">Security <span className="text-gold">Infrastructure</span></h2>
            </div>
            
            <div className="security-grid">
              {[
                { icon: 'fa-lock', title: 'End-to-End Encryption', desc: 'All data in transit and at rest is secured using AES-256 bit encryption protocols.' },
                { icon: 'fa-user-shield', title: 'Fraud Prevention', desc: 'AI-driven systems monitor suspicious activity and block unauthorized transaction attempts.' },
                { icon: 'fa-file-signature', title: 'Legal Verification', desc: 'Every property goes through a strict 30-point legal checklist before being listed.' },
                { icon: 'fa-mobile-alt', title: 'Multi-Factor Auth', desc: 'Mandatory 2FA adds an extra layer of protection to all user accounts and transactions.' }
              ].map((feat, i) => (
                <div key={i} className="security-card">
                  <div className="security-icon"><i className={`fas ${feat.icon}`}></i></div>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="login-demo-section bg-muted">
        <div className="container">
          <AnimatedSection delay={0.1}>
            <div className="section-header">
              <h2 className="section-title">Test Our <span className="text-gold">Secure Login</span></h2>
              <p className="section-subtitle">Experience our seamless Multi-Factor Authentication flow (Hint: OTP is 123456)</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="auth-demo-wrapper">
              {authStep === 'credentials' && (
                <div className="auth-screen">
                  <div className="auth-tabs">
                    <button className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Sign In</button>
                    <button className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>Create Account</button>
                  </div>

                  <form className="auth-form" onSubmit={handleLoginSubmit}>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    
                    <div className="form-group">
                      <label>Password</label>
                      <div className="password-input-wrap">
                        <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="button" className="show-hide-btn" onClick={() => setShowPassword(!showPassword)}>
                          <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                      </div>
                      
                      {activeTab === 'register' && password.length > 0 && (
                        <div className="password-strength">
                          <div className="strength-bar-wrap">
                            <div className="strength-bar" style={{ width: `${(passwordStrength / 4) * 100}%`, backgroundColor: getStrengthColor() }}></div>
                          </div>
                          <div className="strength-label" style={{ color: getStrengthColor() }}>
                            {['Weak', 'Fair', 'Good', 'Strong', 'Excellent'][passwordStrength]}
                          </div>
                        </div>
                      )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-3">{activeTab === 'login' ? 'Secure Sign In' : 'Create Account'}</button>
                  </form>
                </div>
              )}

              {authStep === '2fa' && (
                <div className="auth-screen text-center">
                  <div className="tfa-icon"><i className="fas fa-mobile-alt"></i></div>
                  <h3>Two-Step Verification</h3>
                  <p className="text-muted mb-4">Enter the 6-digit code sent to your registered mobile number ending in **89</p>

                  <form onSubmit={handleVerify2FA}>
                    <div className="otp-inputs">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength="1"
                          className={`otp-digit ${otpError ? 'error' : ''}`}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                        />
                      ))}
                    </div>
                    
                    {otpError && <div className="otp-error">Incorrect OTP. Please try again.</div>}

                    <div className="otp-timer">
                      Time remaining: <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Verify Code</button>
                    <button type="button" className="btn btn-outline w-100 mt-2" disabled={timeLeft > 0}>Resend Code</button>
                  </form>
                </div>
              )}

              {authStep === 'success' && (
                <div className="auth-screen text-center">
                  <div className="success-animation">
                    <div className="success-circle"><i className="fas fa-check"></i></div>
                  </div>
                  <h3>Authentication Successful</h3>
                  <p className="text-muted">Your session has been securely established.</p>
                  
                  <div className="session-info mt-4">
                    <div className="session-detail"><i className="fas fa-shield-alt text-success"></i> 2FA Verified</div>
                    <div className="session-detail"><i className="fas fa-map-marker-alt text-info"></i> Mumbai, India (IP: 192.168.1.*)</div>
                    <div className="session-detail"><i className="fas fa-desktop text-muted"></i> Windows - Chrome Browser</div>
                  </div>

                  <button className="btn btn-outline w-100 mt-4" onClick={() => {setAuthStep('credentials'); setPassword(''); setOtp(['', '', '', '', '', '']);}}>Reset Demo</button>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default SecurityPage;
