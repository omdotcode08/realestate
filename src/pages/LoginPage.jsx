import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatedSection, FadeIn } from '../components/AnimatedSection';
import './AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <AnimatedSection className="auth-card glass-panel" delay={0.1}>
          <div className="auth-header">
            <h2>Welcome Back to <span className="text-gold">NestFinder</span></h2>
            <p>Enter your credentials to access your account</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon password-input-wrap">
                <i className="fas fa-lock"></i>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <button type="button" className="show-hide-btn" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="auth-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="btn btn-primary w-100 btn-submit">
              Sign In
            </button>
            
            <div className="social-login">
              <div className="divider"><span>Or continue with</span></div>
              <div className="social-buttons">
                <button type="button" className="btn btn-outline"><i className="fab fa-google text-danger"></i> Google</button>
                <button type="button" className="btn btn-outline"><i className="fab fa-facebook text-info"></i> Facebook</button>
              </div>
            </div>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup" className="text-gold">Sign up here</Link></p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default LoginPage;
