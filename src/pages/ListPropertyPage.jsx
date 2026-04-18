import React, { useState } from 'react';
import { Building, MapPin, CheckCircle, Upload, Home, ArrowRight, ArrowLeft, Building2, User, Phone, Mail, Image as ImageIcon } from 'lucide-react';
import Button from '../components/shared/Button';
import Badge from '../components/shared/Badge';

export default function ListPropertyPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    propertyType: 'Apartment',
    location: '',
    bhk: '',
    area: '',
    price: '',
    description: '',
    amenities: [],
    name: '',
    phone: '',
    email: ''
  });

  const amenitiesMap = ['Gym', 'Pool', 'Parking', 'Security', 'Clubhouse', 'Garden', 'Power Backup', 'Lift'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAmenityToggle = (amenity) => {
    const newAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity];
    setFormData({ ...formData, amenities: newAmenities });
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-xl w-full rounded-3xl shadow-xl border border-slate-100 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12" />
          </div>
          
          <h2 className="text-3xl font-bold text-navy-900 mb-4">Listing Submitted!</h2>
          <p className="text-slate-500 mb-8">
            Your property has been successfully queued for review. Our team will verify the details and activate your listing within 24 hours.
          </p>
          
          <div className="bg-slate-50 rounded-2xl p-6 text-left mb-8 border border-slate-100">
            <h3 className="font-bold text-navy-900 mb-3 border-b border-slate-200 pb-2">Listing Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-slate-500">Location</span><span className="font-bold text-navy-900">{formData.location || 'Not Specified'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Type</span><span className="font-bold text-navy-900">{formData.propertyType}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Expected Price</span><span className="font-bold text-gold-600">₹{Number(formData.price).toLocaleString()}</span></div>
            </div>
          </div>
          
          <Button variant="primary" className="w-full justify-center py-4 text-lg" onClick={() => window.location.href = '/'}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 flex">
      {/* Left Decorative Side */}
      <div className="hidden lg:flex lg:w-1/3 bg-navy-900 relative items-center justify-center overflow-hidden p-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000" 
            alt="Interior" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-navy-900/40"></div>
        </div>
        
        <div className="relative z-10 w-full">
          <Badge variant="gold" className="mb-6 uppercase tracking-widest">Post Property</Badge>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Reach 10,000+ <br/><span className="text-gold-500">Genuine Buyers</span>
          </h1>
          <p className="text-slate-300 text-lg mb-12">List your property on NestFinder in three simple steps and close deals seamlessly.</p>
          
          <div className="space-y-6">
             <div className="flex items-center gap-4 text-white">
               <div className={`p-3 rounded-full ${step >= 1 ? 'bg-gold-500 text-navy-900' : 'bg-white/10 text-slate-400'}`}><Home className="w-6 h-6" /></div>
               <div className="font-semibold text-lg">Property Details</div>
             </div>
             <div className="h-8 border-l-2 border-slate-700 ml-6"></div>
             <div className="flex items-center gap-4 text-white">
               <div className={`p-3 rounded-full ${step >= 2 ? 'bg-gold-500 text-navy-900' : 'bg-white/10 text-slate-400'}`}><ImageIcon className="w-6 h-6" /></div>
               <div className="font-semibold text-lg">Features & Layout</div>
             </div>
             <div className="h-8 border-l-2 border-slate-700 ml-6"></div>
             <div className="flex items-center gap-4 text-white">
               <div className={`p-3 rounded-full ${step >= 3 ? 'bg-gold-500 text-navy-900' : 'bg-white/10 text-slate-400'}`}><User className="w-6 h-6" /></div>
               <div className="font-semibold text-lg">Contact Info</div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="flex-1 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-20 overflow-y-auto">
        <div className="max-w-2xl w-full mx-auto">
           {/* Mobile Header indicator */}
           <div className="lg:hidden mb-8 text-center">
             <Badge variant="gold" className="mb-2">Step {step} of 3</Badge>
             <h2 className="text-3xl font-bold text-navy-900">List Your Property</h2>
           </div>

           <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 relative overflow-hidden">
             
             {/* Progress Bar top */}
             <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
               <div className="h-full bg-gold-500 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
             </div>

             <form onSubmit={handleSubmit} className="mt-4">
               {/* STEP 1 */}
               {step === 1 && (
                 <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="mb-8">
                     <h3 className="text-2xl font-bold text-navy-900">Let's start with the basics</h3>
                     <p className="text-slate-500">Provide the foundational details of your property.</p>
                   </div>
                   
                   <div className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Property Type</label>
                          <div className="relative">
                            <Building2 className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <select 
                              name="propertyType" value={formData.propertyType} onChange={handleChange} required
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-gold-500 outline-none transition-all appearance-none"
                            >
                              <option value="Apartment">Apartment</option>
                              <option value="Villa">Villa</option>
                              <option value="Commercial">Commercial</option>
                              <option value="Plot">Plot</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">City / Location</label>
                          <div className="relative">
                            <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                              type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Bandra West, Mumbai"
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">BHK Configuration</label>
                          <input 
                            type="number" name="bhk" value={formData.bhk} onChange={handleChange} placeholder="e.g. 3" min="1" max="10"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Super Built-up Area (sq.ft)</label>
                          <input 
                            type="number" name="area" value={formData.area} onChange={handleChange} required placeholder="e.g. 1500"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                          />
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Expected Price (₹)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                          <input 
                            type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="2,50,00,000"
                            className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-gold-500 outline-none transition-all text-lg font-bold text-navy-900"
                          />
                        </div>
                     </div>
                   </div>
                 </div>
               )}

               {/* STEP 2 */}
               {step === 2 && (
                 <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="mb-8">
                     <h3 className="text-2xl font-bold text-navy-900">Amenities & Details</h3>
                     <p className="text-slate-500">What makes your property stand out from the rest?</p>
                   </div>
                   
                   <div className="space-y-6">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Property Description</label>
                       <textarea 
                         name="description" value={formData.description} onChange={handleChange} required rows="4"
                         placeholder="Highlight the key selling points, neighborhood perks, and layout description..."
                         className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-gold-500 outline-none transition-all resize-none"
                       ></textarea>
                     </div>

                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-3">Select Amenities</label>
                       <div className="flex flex-wrap gap-3">
                         {amenitiesMap.map((amn) => (
                           <button
                             type="button"
                             key={amn} 
                             onClick={() => handleAmenityToggle(amn)}
                             className={`px-4 py-2 border rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                               formData.amenities.includes(amn) 
                               ? 'bg-gold-50 border-gold-500 text-gold-700 shadow-sm' 
                               : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                             }`}
                           >
                             {formData.amenities.includes(amn) && <CheckCircle className="w-4 h-4 text-gold-600" />}
                             {amn}
                           </button>
                         ))}
                       </div>
                     </div>

                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Upload Photos</label>
                       <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                         <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                           <Upload className="w-8 h-8 text-slate-400" />
                         </div>
                         <h4 className="font-bold text-navy-900 mb-1">Click or drag images here</h4>
                         <p className="text-sm text-slate-500">Supports JPG, PNG (Max 5MB per image)</p>
                       </div>
                     </div>
                   </div>
                 </div>
               )}

               {/* STEP 3 */}
               {step === 3 && (
                 <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="mb-8">
                     <h3 className="text-2xl font-bold text-navy-900">Contact Information</h3>
                     <p className="text-slate-500">How should verified buyers reach you?</p>
                   </div>
                   
                   <div className="space-y-6">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                       <div className="relative">
                         <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                         <input 
                           type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe"
                           className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                         />
                       </div>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                         <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                         <div className="relative">
                           <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                           <input 
                             type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 99999 00000"
                             className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                           />
                         </div>
                       </div>
                       <div>
                         <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                         <div className="relative">
                           <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                           <input 
                             type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com"
                             className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                           />
                         </div>
                       </div>
                     </div>

                     <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                       <input type="checkbox" required className="mt-1 w-4 h-4 text-gold-600 rounded" />
                       <p className="text-sm text-blue-900 leading-snug">
                         I verify that I am the rightful owner or authorized agent for this property, and the information provided is accurate to the best of my knowledge. I agree to the <a href="#" className="font-bold underline">Terms of Service</a>.
                       </p>
                     </div>
                   </div>
                 </div>
               )}

               {/* Form Navigation Controls */}
               <div className="mt-10 flex items-center justify-between pt-6 border-t border-slate-100">
                  <Button 
                    variant="ghost" 
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1}
                    className={`flex items-center gap-2 ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  
                  {step < 3 ? (
                    <Button variant="primary" type="button" onClick={nextStep} className="flex items-center gap-2 px-8 py-3">
                      Next Step <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button variant="primary" type="submit" className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white px-8 py-3">
                      Submit Listing <CheckCircle className="w-4 h-4" />
                    </Button>
                  )}
               </div>

             </form>
           </div>
        </div>
      </div>
    </div>
  );
}
