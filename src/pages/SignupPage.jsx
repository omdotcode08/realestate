import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import './AuthPages.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userType: 'buyer',
    password: '',
    confirmPassword: ''
  });
  
  const [passwordStrength, setPasswordStrength] = useState(0); 
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Password strength logic
  useEffect(() => {
    let strength = 0;
    const { password } = formData;
    if (password.length > 5) strength += 1;
    if (password.length > 8) strength += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Simulate API call
    setTimeout(() => {
      navigate('/login');
    }, 1000);
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
    <div className="auth-page signup-bg">
      <div className="container auth-container">
        <AnimatedSection className="auth-card glass-panel signup-card" delay={0.1}>
          <div className="auth-header">
            <h2>Create an Account</h2>
            <p>Join NestFinder to unlock premium properties and tools</p>
          </div>

          <form className="auth-form" onSubmit={handleSignup}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" placeholder="+91" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>I am a...</label>
              <select name="userType" value={formData.userType} onChange={handleChange} required>
                <option value="buyer">Buyer / Tenant</option>
                <option value="agent">Real Estate Agent</option>
                <option value="builder">Builder / Developer</option>
                <option value="owner">Property Owner</option>
              </select>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Password</label>
                <div className="password-input-wrap">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                  />
                  <button type="button" className="show-hide-btn" onClick={() => setShowPassword(!showPassword)}>
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {formData.password.length > 0 && (
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

              <div className="form-group">
                <label>Confirm Password</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="terms-checkbox">
              <label>
                <input type="checkbox" required /> I agree to the <a href="#">Terms of Service</a> & <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100 btn-submit mt-3">
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="text-gold">Sign in here</Link></p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SignupPage;
