import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, User, Mail, Phone, Key, Eye, EyeOff, Upload, FileText, ArrowRight } from 'lucide-react';
import Button from '../components/shared/Button';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userType: 'buyer',
    password: '',
    confirmPassword: '',
    companyName: '',
    gstin: '',
    reraStatus: '',
    kycNumber: ''
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
      case 0: return 'bg-slate-200';
      case 1: return 'bg-red-500';
      case 2: return 'bg-amber-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-emerald-500';
      default: return 'bg-slate-200';
    }
  };

  return (
    <div className="min-h-screen flex text-slate-900 bg-slate-50">
      {/* Left side: branding/imagery */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/3 relative bg-navy-900 overflow-hidden text-white flex-col justify-between p-12 fixed h-screen">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
           <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80" alt="Building" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent"></div>
        
        <Link to="/" className="relative z-10 flex items-center gap-2 group w-max">
          <div className="bg-gold-500 text-navy-900 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-lg">
            <Building2 className="w-8 h-8" />
          </div>
          <span className="text-3xl font-bold tracking-tight">Nest<span className="text-gold-500">Finder</span></span>
        </Link>
        
        <div className="relative z-10 mt-auto pb-8">
          <h1 className="text-4xl font-bold leading-tight mb-4">Join the Elite Real Estate Network.</h1>
          <p className="text-slate-300 text-lg">Create your professional account to list premium properties, verify leads, and scale your operations instantly.</p>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium text-slate-200">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400">✓</div>
              Verified Listings & Leads
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-200">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400">✓</div>
              Advanced Analytics Dashboard
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-200">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400">✓</div>
              Instant Support Ticketing
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Signup Form */}
      <div className="w-full lg:w-7/12 xl:w-2/3 lg:ml-auto flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-2xl w-full animate-in fade-in slide-in-from-bottom-8 duration-700 py-8">
           
           <div className="lg:hidden mb-8 flex justify-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-gold-500 text-navy-900 p-2 rounded-xl shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-navy-900">Nest<span className="text-gold-500">Finder</span></span>
              </Link>
           </div>
           
           <div className="mb-10 text-center lg:text-left">
             <h2 className="text-3xl font-bold text-navy-900 mb-2">Create an Account</h2>
             <p className="text-slate-500">Fill in your details below to get started.</p>
           </div>

           <form onSubmit={handleSignup} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
             
             {/* Name Row */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                 <div className="relative">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                   <input 
                     type="text" name="firstName" required value={formData.firstName} onChange={handleChange}
                     className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:bg-white outline-none transition-colors"
                   />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                 <div className="relative">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                   <input 
                     type="text" name="lastName" required value={formData.lastName} onChange={handleChange}
                     className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:bg-white outline-none transition-colors"
                   />
                 </div>
               </div>
             </div>

             {/* Contact Row */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                 <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                   <input 
                     type="email" name="email" required value={formData.email} onChange={handleChange}
                     className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:bg-white outline-none transition-colors"
                   />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                 <div className="relative">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                   <input 
                     type="tel" name="phone" required placeholder="+91" value={formData.phone} onChange={handleChange}
                     className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:bg-white outline-none transition-colors"
                   />
                 </div>
               </div>
             </div>

             <div className="border-t border-slate-100 pt-6"></div>

             {/* Role Selection */}
             <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">I am registering as a...</label>
                <select name="userType" value={formData.userType} onChange={handleChange} required
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:bg-white outline-none transition-colors font-medium text-slate-700 appearance-none"
                >
                  <option value="buyer">Buyer / Tenant</option>
                  <option value="owner">Property Owner</option>
                  <option value="agent">Real Estate Agent</option>
                  <option value="builder">Builder / Developer</option>
                </select>
             </div>

             {/* Conditional Fields Wrapper with Animation */}
             <div className="space-y-6 pt-2 animate-in slide-in-from-top-4 fade-in duration-300">
                {formData.userType === 'builder' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                      <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:bg-white outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">GSTIN Number</label>
                      <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} required placeholder="29ABCDE1234F1Z5" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:bg-white outline-none transition-colors" />
                    </div>
                  </div>
                )}
                
                {(formData.userType === 'agent' || formData.userType === 'builder') && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">RERA Registration</label>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                      <div className="sm:col-span-3">
                         <input type="text" name="reraStatus" value={formData.reraStatus} onChange={handleChange} required placeholder="e.g. RERA/KA/PR/..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:bg-white outline-none transition-colors h-full" />
                      </div>
                      <div className="sm:col-span-2 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center p-3 cursor-pointer hover:bg-slate-50 transition-colors bg-slate-50 relative overflow-hidden" onClick={(e) => {e.currentTarget.innerHTML = '<span class="text-emerald-600 font-bold text-sm">✓ Attached Info</span>'}}>
                        <FileText className="w-5 h-5 text-slate-400 mr-2" />
                        <span className="text-xs font-semibold text-slate-600">Upload PDF</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {(formData.userType === 'buyer' || formData.userType === 'owner' || formData.userType === 'agent') && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Government Identity Verification</label>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                      <div className="sm:col-span-3">
                        <input type="text" name="kycNumber" value={formData.kycNumber} onChange={handleChange} required={formData.userType !== 'buyer'} placeholder={formData.userType === 'buyer' ? "Aadhar/PAN (Optional)" : "Aadhar/PAN Number (Required)"} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:bg-white outline-none transition-colors h-full" />
                      </div>
                      <div className="sm:col-span-2 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center p-3 cursor-pointer hover:bg-slate-50 transition-colors bg-slate-50" onClick={(e) => {e.currentTarget.innerHTML = '<span class="text-emerald-600 font-bold text-sm">✓ Uploaded</span>'}}>
                        <Upload className="w-5 h-5 text-slate-400 mr-2" />
                        <span className="text-xs font-semibold text-slate-600">Front Back JPG</span>
                      </div>
                    </div>
                  </div>
                )}
             </div>

             <div className="border-t border-slate-100 pt-6"></div>

             {/* Password Row */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                 <div className="relative">
                   <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                   <input 
                     type={showPassword ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleChange}
                     className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:bg-white outline-none transition-colors"
                   />
                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                   </button>
                 </div>
                 {formData.password.length > 0 && (
                   <div className="mt-2 px-1">
                     <div className="flex justify-between items-center mb-1 text-xs">
                        <span className="font-medium text-slate-500">Strength:</span>
                        <span className={`font-bold ${['text-slate-200', 'text-red-500', 'text-amber-500', 'text-blue-500', 'text-emerald-500'][passwordStrength]}`}>
                          {['None', 'Weak', 'Fair', 'Strong', 'Excellent'][passwordStrength]}
                        </span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                       <div className={`h-full ${getStrengthColor()} transition-all duration-300`} style={{ width: `${(passwordStrength / 4) * 100}%` }}></div>
                     </div>
                   </div>
                 )}
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Confirm Password</label>
                 <div className="relative">
                   <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                   <input 
                     type={showPassword ? 'text' : 'password'} name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange}
                     className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:bg-white outline-none transition-colors"
                   />
                 </div>
               </div>
             </div>

             <div className="flex items-start gap-3 pt-2">
               <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 text-gold-500 rounded border-slate-300 focus:ring-gold-500" />
               <label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed cursor-pointer">
                 By creating an account, I agree to NestFinder's <a href="#" className="font-bold text-navy-900 hover:text-gold-600">Terms of Service</a> & <a href="#" className="font-bold text-navy-900 hover:text-gold-600">Privacy Policy</a>
               </label>
             </div>

             <Button variant="primary" type="submit" className="w-full py-4 text-lg justify-center shadow-md hover:shadow-lg mt-6">
               Create Secure Account
             </Button>
             
             <p className="text-center text-slate-600 mt-6 pb-2">
                Already have an account? <Link to="/login" className="font-bold text-gold-600 hover:text-gold-500">Sign in here</Link>
             </p>
           </form>
           
        </div>
      </div>
    </div>
  );
}
