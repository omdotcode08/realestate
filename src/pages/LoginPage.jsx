import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Key, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Button from '../components/shared/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex text-slate-900 bg-slate-50">
      {/* Left side: branding/imagery */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-navy-900 overflow-hidden text-white flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
           <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80" alt="Building" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
        
        <Link to="/" className="relative z-10 flex items-center gap-2 group w-max">
          <div className="bg-gold-500 text-navy-900 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-lg">
            <Building2 className="w-8 h-8" />
          </div>
          <span className="text-3xl font-bold tracking-tight">Nest<span className="text-gold-500">Finder</span></span>
        </Link>
        
        <div className="relative z-10 max-w-lg mt-auto pb-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Welcome Back to the Premium Ecosystem.</h1>
          <p className="text-lg text-slate-300">Access your exclusive dashboard to manage listings, track financials, and scale your real estate business efficiently.</p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
           
           <div className="lg:hidden mb-10 flex justify-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-gold-500 text-navy-900 p-2 rounded-xl shadow-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-3xl font-bold text-navy-900">Nest<span className="text-gold-500">Finder</span></span>
              </Link>
           </div>
           
           <div className="mb-10 text-center lg:text-left">
             <h2 className="text-3xl font-bold text-navy-900 mb-2">Sign in to Account</h2>
             <p className="text-slate-500">Enter your credentials to proceed.</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-6">
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                 <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                   <input 
                     type="email" required placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)}
                     className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all shadow-sm"
                   />
                 </div>
               </div>

               <div>
                 <div className="flex justify-between items-center mb-2">
                   <label className="block text-sm font-bold text-slate-700">Password</label>
                   <a href="#" className="text-sm font-bold text-gold-600 hover:text-gold-500 transition-colors">Forgot Password?</a>
                 </div>
                 <div className="relative">
                   <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                   <input 
                     type={showPassword ? 'text' : 'password'} required placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}
                     className="w-full pl-12 pr-12 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all shadow-sm"
                   />
                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                   </button>
                 </div>
               </div>
               
               <div className="flex items-center gap-2 pt-2">
                 <input type="checkbox" id="remember" className="w-4 h-4 text-gold-500 rounded border-slate-300 focus:ring-gold-500" />
                 <label htmlFor="remember" className="text-sm font-medium text-slate-600 cursor-pointer">Keep me logged in</label>
               </div>
             </div>

             <Button variant="primary" type="submit" className="w-full py-4 text-lg justify-center shadow-md hover:shadow-lg flex items-center gap-2 mt-4">
               Sign In <ArrowRight className="w-5 h-5" />
             </Button>
             
             <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">Or continue with</span>
                <div className="flex-grow border-t border-slate-200"></div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm font-bold text-slate-700">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 01-6.723-4.823l-4.04 3.067A11.965 11.965 0 0012 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z"/><path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"/><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 014.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 000 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"/></svg>
                  Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1877F2] text-white rounded-xl hover:bg-[#166fe5] transition-colors shadow-sm font-bold">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </button>
             </div>
             
             <p className="text-center text-slate-600 mt-8">
                Don't have an account? <Link to="/signup" className="font-bold text-gold-600 hover:text-gold-500">Sign up here</Link>
             </p>
           </form>
        </div>
      </div>
    </div>
  );
}
