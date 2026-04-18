import React, { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Button from '../components/shared/Button';
import Badge from '../components/shared/Badge';
import Modal from '../components/shared/Modal';
import Toast from '../components/shared/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Key, Phone, User, CheckCircle, ShieldCheck, ShieldAlert, Monitor, LogOut, XCircle, Upload, FileText } from 'lucide-react';

export default function Security() {
  const [authStep, setAuthStep] = useState('login'); // 'login' | '2fa' | 'dashboard'
  const [toastMessage, setToastMessage] = useState(null);

  // --- Step 1: Login / Sign Up State ---
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [signupData, setSignupData] = useState({ 
    name: '', email: '', phone: '', password: '', confirm: '', 
    userType: 'buyer', companyName: '', gstin: '', reraStatus: '', kycNumber: '' 
  });

  // Password Strength
  const evaluatePassword = (pw) => {
    if (!pw) return { level: 0, label: 'None', color: 'bg-slate-200' };
    let score = 0;
    if (pw.length > 7) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    
    if (score < 2) return { level: 25, label: 'Weak', color: 'bg-red-500' };
    if (score === 2) return { level: 50, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { level: 75, label: 'Strong', color: 'bg-blue-500' };
    return { level: 100, label: 'Very Strong', color: 'bg-emerald-500' };
  };
  const pwStrength = evaluatePassword(signupData.password);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email === "aryan@nestfinder.in" && password === "Secure@123") {
      setLoginError(false);
      setAuthStep('2fa');
      setToastMessage("OTP sent to ******47");
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 500); // Remove shake class
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if(signupData.password !== signupData.confirm) {
      alert("Passwords do not match"); return;
    }
    setAuthStep('2fa');
    setToastMessage("OTP sent to registered number");
  };

  // --- Step 2: 2FA State ---
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef([]);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [countdown, setCountdown] = useState(30);
  const [lockedOut, setLockedOut] = useState(false);
  const [otpError, setOtpError] = useState(false);

  useEffect(() => {
    let timer;
    if (authStep === '2fa' && countdown > 0 && !lockedOut) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [authStep, countdown, lockedOut]);

  const handleOTPChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    // allow single char
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const verifyOTP = () => {
    const code = otp.join('');
    if (code === '374829') {
      setAuthStep('dashboard');
      setToastMessage("Login Successful");
    } else {
      setOtpError(true);
      setAttemptsLeft(prev => prev - 1);
      setTimeout(() => setOtpError(false), 500);
      if (attemptsLeft <= 1) {
        setLockedOut(true);
      }
    }
  };

  // --- Step 3: Secure Dashboard State ---
  const [settings, setSettings] = useLocalStorage('crm_security_settings', {
    twoFactor: true, loginAlerts: true, trustedDevices: false
  });
  const [checklist, setChecklist] = useState({
    email: true, twoFa: true, aadhaar: false, pan: false, profile: false
  });
  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: 'MacBook Pro 14"', location: 'Mumbai, India', ip: '192.168.1.45', current: true, time: 'Active now' },
    { id: 2, device: 'iPhone 13', location: 'Pune, India', ip: '114.67.23.1', current: false, time: 'Last active 2 hrs ago' }
  ]);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(30);

  // Derive score
  const score = Math.round((Object.values(checklist).filter(v => v).length / Object.keys(checklist).length) * 100);

  // Inactivity timeout simulation
  useEffect(() => {
    if (authStep !== 'dashboard') return;
    
    let inactivityTimer;
    let countdownTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      clearInterval(countdownTimer);
      setShowTimeoutModal(false);
      setSessionTimeLeft(30);
      
      inactivityTimer = setTimeout(() => {
        setShowTimeoutModal(true);
        countdownTimer = setInterval(() => {
          setSessionTimeLeft(prev => {
            if (prev <= 1) {
              setAuthStep('login');
              setToastMessage("Session expired");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 2 * 60 * 1000); // 2 minutes inactivity
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      clearTimeout(inactivityTimer);
      clearInterval(countdownTimer);
    };
  }, [authStep]);


  const CircularProgress = ({ progress }) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    return (
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="transform -rotate-90 w-32 h-32">
          <circle cx="64" cy="64" r="45" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
          <circle 
            cx="64" cy="64" r="45" stroke="currentColor" strokeWidth="8" fill="transparent" 
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ${progress >= 80 ? 'text-emerald-500' : progress >= 50 ? 'text-gold-500' : 'text-red-500'}`} 
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-bold text-navy-900">{progress}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-24 pb-20 bg-slate-100 min-h-screen flex flex-col justify-center items-center">
      <Toast isVisible={!!toastMessage} message={toastMessage} onClose={() => setToastMessage(null)} />

      <AnimatePresence mode="wait">
        {/* ================= STEP 1: LOGIN / SIGNUP ================= */}
        {authStep === 'login' && (
          <motion.div 
            key="login"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
            className={`bg-white p-8 rounded-2xl shadow-xl w-full transition-all duration-300 ${activeTab === 'signup' ? 'max-w-lg' : 'max-w-md'} border border-slate-200 ${loginError ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
          >
            <div className="text-center mb-8">
               <div className="w-16 h-16 bg-navy-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                 <ShieldCheck className="w-8 h-8 text-gold-500" />
               </div>
               <h2 className="text-2xl font-bold text-navy-900">NestFinder Auth</h2>
               <p className="text-slate-500 text-sm">Sign in to access your secure CRM</p>
            </div>

            <div className="flex p-1 bg-slate-100 rounded-lg mb-6">
              <button onClick={() => setActiveTab('login')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'login' ? 'bg-white shadow-sm text-navy-900' : 'text-slate-500 hover:text-navy-900'}`}>Login</button>
              <button onClick={() => setActiveTab('signup')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'signup' ? 'bg-white shadow-sm text-navy-900' : 'text-slate-500 hover:text-navy-900'}`}>Sign Up</button>
            </div>

            {activeTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 drop-shadow-sm flex items-center gap-2"><XCircle className="w-4 h-4"/> Invalid credentials</div>}
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none" />
                </div>
                <div className="relative">
                  <Key className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type={showPassword ? "text" : "password"} placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gold-600 font-bold">
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
                <div className="text-right text-xs">
                   <a href="#" className="font-bold text-navy-900 hover:underline">Forgot password?</a>
                </div>
                <Button type="submit" variant="primary" className="w-full py-3">Secure Login</Button>
                <div className="text-center text-xs text-slate-500 mt-4">Hint: aryan@nestfinder.in / Secure@123</div>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Full Name" required value={signupData.name} onChange={e => setSignupData({...signupData, name: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors" />
                  </div>
                  <div className="relative">
                    <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="tel" placeholder="Phone Number" required value={signupData.phone} onChange={e => setSignupData({...signupData, phone: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors" />
                  </div>
                </div>
                
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" placeholder="Email Address" required value={signupData.email} onChange={e => setSignupData({...signupData, email: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors" />
                </div>
                
                <div className="pt-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Account Role</label>
                  <select required value={signupData.userType} onChange={e => setSignupData({...signupData, userType: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors text-slate-700 font-medium">
                    <option value="buyer">Buyer / Tenant</option>
                    <option value="owner">Property Owner</option>
                    <option value="agent">Real Estate Agent</option>
                    <option value="builder">Builder / Developer</option>
                  </select>
                </div>

                {/* Conditional Fields Wrapper */}
                <div className="space-y-4 pt-1 animate-in slide-in-from-top-2 fade-in duration-300">
                  {signupData.userType === 'builder' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input type="text" placeholder="Company Name" required value={signupData.companyName} onChange={e => setSignupData({...signupData, companyName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors" />
                      </div>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center p-3 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setToastMessage("GSTIN Document Uploaded!")}>
                        <Upload className="w-5 h-5 text-slate-400 mr-2" />
                        <span className="text-sm font-semibold text-slate-600">Upload GSTIN PDF</span>
                      </div>
                    </div>
                  )}

                  {(signupData.userType === 'agent' || signupData.userType === 'builder') && (
                    <div className="border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center p-3 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setToastMessage("RERA License Uploaded!")}>
                      <FileText className="w-5 h-5 text-slate-400 mr-2" />
                      <span className="text-sm font-semibold text-slate-600">Upload RERA License Document</span>
                    </div>
                  )}

                  {(signupData.userType === 'buyer' || signupData.userType === 'owner' || signupData.userType === 'agent') && (
                    <div className="border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center p-4 cursor-pointer hover:bg-slate-50 transition-colors group" onClick={() => setToastMessage("Aadhar/PAN Document Attached!")}>
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm group-hover:scale-110 transition-transform">
                        <Upload className="w-5 h-5 text-gold-500" />
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-bold text-navy-900 block">{signupData.userType === 'buyer' ? "Upload Aadhar/PAN (Optional)" : "Upload Aadhar/PAN Document"}</span>
                        <span className="text-xs text-slate-500 block">Required for KYC verification. JPG/PDF (Max 5MB)</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="relative">
                    <Key className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="password" placeholder="Create Password" required value={signupData.password} onChange={e => setSignupData({...signupData, password: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors" />
                  </div>
                  <div className="relative">
                    <Key className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="password" placeholder="Confirm Password" required value={signupData.confirm} onChange={e => setSignupData({...signupData, confirm: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors" />
                  </div>
                </div>
                
                {/* Password Strength Meter */}
                {signupData.password && (
                  <div className="px-1">
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span className="font-medium text-slate-600">Password strength:</span>
                      <span className={`font-bold ${pwStrength.color.replace('bg-', 'text-')}`}>{pwStrength.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex transition-all">
                      <div className={`h-full ${pwStrength.color} transition-all duration-300`} style={{width: `${pwStrength.level}%`}}></div>
                    </div>
                  </div>
                )}

                <Button type="submit" variant="primary" className="w-full py-3 mt-4 shadow-md hover:shadow-lg">Create Secure Account</Button>
              </form>
            )}
          </motion.div>
        )}

        {/* ================= STEP 2: 2FA ================= */}
        {authStep === '2fa' && (
          <motion.div 
            key="2fa"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            className={`bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 ${otpError ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
          >
            <div className="text-center mb-8">
               <div className="w-16 h-16 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Lock className="w-8 h-8" />
               </div>
               <h2 className="text-2xl font-bold text-navy-900 mb-2">Two-Step Verification</h2>
               <p className="text-slate-500 text-sm">Enter the 6-digit code sent to your registered device (Hint: 374829)</p>
            </div>

            {lockedOut ? (
              <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <h3 className="font-bold text-red-700 mb-2">Account Locked</h3>
                <p className="text-red-600 text-sm">Too many failed attempts. Try again in 10:00.</p>
                <Button variant="outline" className="mt-4" onClick={() => {setLockedOut(false); setAttemptsLeft(3); setAuthStep('login');}}>Back to Login</Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => otpRefs.current[i] = el}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOTPChange(i, e.target.value)}
                      onKeyDown={e => handleOTPKeyDown(i, e)}
                      className="w-12 h-14 text-center text-2xl font-bold rounded-lg border border-slate-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-500 outline-none"
                    />
                  ))}
                </div>

                {otpError && <p className="text-red-500 text-sm text-center font-bold">Incorrect code. {attemptsLeft} attempts remaining.</p>}

                <Button variant="primary" className="w-full py-3" onClick={verifyOTP}>Verify Code</Button>

                <div className="text-center">
                  <p className="text-slate-500 text-sm">
                    Didn't receive code? {countdown > 0 ? (
                      <span className="font-bold">Resend in 00:{countdown.toString().padStart(2, '0')}</span>
                    ) : (
                      <button className="font-bold text-gold-600 hover:text-gold-700" onClick={() => {setCountdown(30); setToastMessage("OTP Resent");}}>Resend Now</button>
                    )}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ================= STEP 3: DASHBOARD ================= */}
        {authStep === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl"
          >
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-bold text-navy-900">Welcome back, Aryan 👋</h1>
                <p className="text-slate-500 flex items-center gap-2 mt-1">
                  Last login: Today, 09:41 AM <span className="w-1 h-1 bg-slate-400 rounded-full"></span> IP: 192.168.1.45
                </p>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => setAuthStep('login')}>
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Security Score Widget */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
                <h3 className="font-bold text-slate-600 mb-6 w-full text-left">Your Security Score</h3>
                <CircularProgress progress={score} />
                <p className="mt-6 text-sm text-slate-500 leading-relaxed">
                  {score === 100 ? "Excellent! Your account is fully secured." : "Complete the checklist below to improve your security score."}
                </p>
              </div>

              {/* Checklist */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-6 text-lg">Security Checklist</h3>
                <div className="space-y-4">
                  
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                      <div>
                        <p className="font-bold text-navy-900">Email Verified</p>
                        <p className="text-xs text-slate-500">aryan@nestfinder.in</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                      <div>
                        <p className="font-bold text-navy-900">Two-Factor Authentication</p>
                        <p className="text-xs text-slate-500">Enabled via SMS</p>
                      </div>
                    </div>
                  </div>

                  <div className={`flex justify-between items-center p-4 rounded-xl border ${checklist.aadhaar ? 'bg-slate-50 border-slate-100' : 'bg-amber-50 border-amber-200'}`}>
                    <div className="flex items-center gap-3">
                      {checklist.aadhaar ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : <ShieldAlert className="w-6 h-6 text-amber-500" />}
                      <div>
                        <p className={`font-bold ${checklist.aadhaar ? 'text-navy-900' : 'text-amber-800'}`}>Aadhaar Card Linkage</p>
                        <p className="text-xs text-slate-500">{checklist.aadhaar ? 'Verified' : 'Required for property listings.'}</p>
                      </div>
                    </div>
                    {!checklist.aadhaar && (
                      <Button variant="primary" className="py-1.5 px-4 text-xs" onClick={() => {setChecklist({...checklist, aadhaar: true}); setToastMessage("Aadhaar Linked Successfully");}}>Link Now</Button>
                    )}
                  </div>

                  <div className={`flex justify-between items-center p-4 rounded-xl border ${checklist.pan ? 'bg-slate-50 border-slate-100' : 'bg-red-50 border-red-200'}`}>
                    <div className="flex items-center gap-3">
                      {checklist.pan ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
                      <div>
                        <p className={`font-bold ${checklist.pan ? 'text-navy-900' : 'text-red-800'}`}>PAN Card Details</p>
                        <p className="text-xs text-slate-500">{checklist.pan ? 'Verified' : 'Mandatory for financial transactions.'}</p>
                      </div>
                    </div>
                    {!checklist.pan && (
                       <Button variant="danger" className="py-1.5 px-4 text-xs" onClick={() => {setChecklist({...checklist, pan: true}); setToastMessage("PAN Linked Successfully");}}>Link Now</Button>
                    )}
                  </div>

                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Active Sessions */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-6 text-lg">Active Sessions</h3>
                <div className="space-y-4">
                  {activeSessions.map(session => (
                    <div key={session.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Monitor className={`w-10 h-10 p-2 rounded-lg ${session.current ? 'bg-gold-100 text-gold-600' : 'bg-slate-100 text-slate-500'}`} />
                        <div>
                          <p className="font-bold text-navy-900">{session.device} {session.current && <span className="text-xs ml-2 text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Current</span>}</p>
                          <p className="text-xs text-slate-500">{session.location} • {session.ip}</p>
                          <p className="text-xs text-slate-400 mt-1">{session.time}</p>
                        </div>
                      </div>
                      {!session.current && (
                        <button 
                          onClick={() => setActiveSessions(activeSessions.filter(s => s.id !== session.id))}
                          className="text-xs font-bold text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-6 text-lg">Settings</h3>
                <div className="space-y-6">
                  {Object.entries({
                    twoFactor: { title: "Enforce 2FA via authenticator app", desc: "Requires scanning a QR code." },
                    loginAlerts: { title: "Unrecognized login alerts", desc: "Get an SMS when logging from new device." },
                    trustedDevices: { title: "Remember Trusted Devices", desc: "Skip 2FA on devices you trust." }
                  }).map(([key, info]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">{info.title}</p>
                        <p className="text-xs text-slate-500">{info.desc}</p>
                      </div>
                      
                      {/* Custom Toggle */}
                      <button 
                        onClick={() => setSettings({...settings, [key]: !settings[key]})}
                        className={`w-12 h-6 rounded-full relative transition-colors ${settings[key] ? 'bg-gold-500' : 'bg-slate-300'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings[key] ? 'left-7' : 'left-1'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Session Timeout Warning Modal */}
            <Modal isOpen={showTimeoutModal} onClose={() => {}} title="Session Expiring" maxWidth="max-w-md">
               <div className="text-center py-4">
                 <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Lock className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-navy-900 mb-2">Are you still there?</h3>
                 <p className="text-slate-500 mb-6">For your security, your session will automatically log out in {sessionTimeLeft} seconds due to inactivity.</p>
                 
                 <div className="flex gap-4">
                   <Button variant="outline" className="flex-1" onClick={() => setAuthStep('login')}>Log Out</Button>
                   <Button variant="primary" className="flex-1" onClick={() => setShowTimeoutModal(false)}>Stay Logged In</Button>
                 </div>
               </div>
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}
