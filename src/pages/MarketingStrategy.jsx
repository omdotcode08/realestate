import React, { useState } from 'react';
import { mockCampaigns } from '../data/mockData';
import DataTable from '../components/shared/DataTable';
import Modal from '../components/shared/Modal';
import Button from '../components/shared/Button';
import Badge from '../components/shared/Badge';
import Toast from '../components/shared/Toast';
import { Target, Users, Eye, TrendingUp, Handshake, Filter, Plus, Send, Clock, CheckCircle } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MarketingStrategy() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  
  // --- Trigger Hub State ---
  const [triggerLog, setTriggerLog] = useState([
    { id: 'tr1', channel: 'Email', audience: 'Interest', message: 'Send Drip Campaign Invite', status: 'Delivered', time: '2 mins ago' },
    { id: 'tr2', channel: 'Social Media', audience: 'Awareness', message: 'Retargeting Ad Image Swap', status: 'Delivered', time: '1 hour ago' },
  ]);
  const [triggerForm, setTriggerForm] = useState({ channel: 'Email', audience: 'Interest', message: '' });
  const [isTriggering, setIsTriggering] = useState(false);

  const handleDispatchTrigger = (e) => {
    e.preventDefault();
    if (!triggerForm.message) return;
    setIsTriggering(true);
    
    setTimeout(() => {
      const newTrigger = {
        id: `tr${Date.now()}`,
        channel: triggerForm.channel,
        audience: triggerForm.audience,
        message: triggerForm.message,
        status: 'Delivered',
        time: 'Just now'
      };
      setTriggerLog([newTrigger, ...triggerLog]);
      setIsTriggering(false);
      setTriggerForm({ ...triggerForm, message: '' });
      setToastMessage("Trigger Dispatched Successfully!");
    }, 1500);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Marketing Funnel State
  const [activeStage, setActiveStage] = useState('Awareness');
  
  // ROI Calculator State
  const [adSpend, setAdSpend] = useState(50000);

  const toggleCampaignStatus = (id) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) return { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' };
      return c;
    }));
  };

  const columns = [
    { label: 'Campaign Name', key: 'name', sortable: true },
    { label: 'Channel', key: 'channel', sortable: true },
    { 
      label: 'Budget Spent', 
      key: 'spent', 
      sortable: true,
      render: (row) => `₹${row.spent.toLocaleString()}`
    },
    { label: 'Leads generated', key: 'leads', sortable: true },
    { 
      label: 'Conversion', 
      key: 'conversion', 
      sortable: true,
      render: (row) => `${row.conversion}%`
    },
    { 
      label: 'Status', 
      key: 'status', 
      render: (row) => (
        <Badge variant={row.status === 'Active' ? 'success' : 'neutral'}>
          {row.status}
        </Badge>
      )
    },
    {
      label: 'Actions',
      key: 'actions',
      render: (row) => (
        <button 
          onClick={() => toggleCampaignStatus(row.id)}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          {row.status === 'Active' ? 'Pause' : 'Activate'}
        </button>
      )
    }
  ];

  // --- Campaign Form ---
  const [formData, setFormData] = useState({ name: '', channel: 'Google', audience: '', budget: '' });
  const [errors, setErrors] = useState({});

  const handleCampaignSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.name) newErrors.name = "Campaign name required";
    if (!formData.audience) newErrors.audience = "Target audience required";
    if (!formData.budget || formData.budget <= 0) newErrors.budget = "Valid budget required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newCampaign = {
      id: `c${Date.now()}`,
      name: formData.name,
      channel: formData.channel,
      status: 'Active',
      spent: 0,
      leads: 0,
      conversion: 0.0
    };

    setCampaigns([newCampaign, ...campaigns]);
    setIsModalOpen(false);
    setToastMessage("Campaign Created Successfully!");
    setFormData({ name: '', channel: 'Google', audience: '', budget: '' });
    setErrors({});
  };

  // --- Funnel Data ---
  const funnelStages = [
    { title: 'Awareness', icon: Eye, users: 12500, dropoff: '45%', time: '14 days', action: 'Increase Retargeting Ads' },
    { title: 'Interest', icon: Target, users: 6800, dropoff: '60%', time: '7 days', action: 'Send Email Drip Campaign' },
    { title: 'Site Visit', icon: Users, users: 2700, dropoff: '70%', time: '3 days', action: 'Follow-up Call within 24h' },
    { title: 'Negotiation', icon: TrendingUp, users: 810, dropoff: '25%', time: '10 days', action: 'Offer Limited Time Discount' },
    { title: 'Closed', icon: Handshake, users: 600, dropoff: '0%', time: '-', action: 'Request Review / Referral' }
  ];

  const activeStageData = funnelStages.find(s => s.title === activeStage);

  const funnelChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: `Users in ${activeStage}`,
      data: [activeStageData.users * 0.8, activeStageData.users * 0.9, activeStageData.users * 1.1, activeStageData.users],
      backgroundColor: '#F59E0B',
      borderRadius: 4
    }]
  };

  // --- ROI Calculator Outputs ---
  const roiReach = adSpend * 0.5; // Dummy formula
  const roiInquiries = Math.floor(roiReach * 0.05);
  const roiVisits = Math.floor(roiInquiries * 0.3);
  const roiDeals = Math.floor(roiVisits * 0.1);
  const projectedRevenue = roiDeals * 200000; // Assuming 2L profit per deal
  const roiPercentage = adSpend > 0 ? (((projectedRevenue - adSpend) / adSpend) * 100).toFixed(0) : 0;

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <Toast isVisible={!!toastMessage} message={toastMessage} onClose={() => setToastMessage(null)} />
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <Badge variant="info" className="uppercase tracking-widest mb-3">Growth Engine</Badge>
            <h1 className="text-4xl font-bold text-navy-900 mb-2">Marketing Hub</h1>
            <p className="text-slate-500">Manage campaigns, analyze funnel drop-offs, and predict ROI.</p>
          </div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-5 h-5 mr-1" /> New Campaign
          </Button>
        </div>

        {/* Funnel & ROI Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Interactive Flow */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 bg-navy-900 text-white">
              <h3 className="text-xl font-bold mb-2">Conversion Funnel</h3>
              <p className="text-slate-300 text-sm">Click a stage to view metrics and recommendations</p>
            </div>
            
            <div className="flex flex-1">
              {/* Funnel Steps */}
              <div className="w-1/3 border-r border-slate-100 bg-slate-50 p-4 space-y-2">
                {funnelStages.map((stage, i) => (
                  <button
                    key={stage.title}
                    onClick={() => setActiveStage(stage.title)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeStage === stage.title ? 'bg-gold-500 text-navy-900 shadow-sm font-bold' : 'hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    <stage.icon className="w-5 h-5 opacity-70" />
                    <span className="text-sm">{stage.title}</span>
                  </button>
                ))}
              </div>
              
              {/* Funnel Stage Details */}
              <div className="w-2/3 p-6">
                <h4 className="text-2xl font-bold text-navy-900 mb-6">{activeStageData.title} Stage</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 font-medium uppercase">Active Users</span>
                    <p className="text-2xl font-bold text-navy-900 mt-1">{activeStageData.users.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 font-medium uppercase">Drop-off Rate</span>
                    <p className="text-2xl font-bold text-red-500 mt-1">{activeStageData.dropoff}</p>
                  </div>
                  <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 font-medium uppercase">Avg Time in Stage</span>
                    <p className="text-xl font-bold text-navy-900 mt-1">{activeStageData.time}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-xs text-emerald-600 font-bold uppercase mb-2 block">AI Recommendation</span>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-emerald-800 text-sm font-medium">
                    {activeStageData.action}
                  </div>
                </div>

                <div className="h-32">
                  <Bar data={funnelChartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                </div>
              </div>
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
             <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><TrendingUp className="w-6 h-6" /></div>
               <h3 className="text-xl font-bold text-navy-900">Live ROI Estimator</h3>
             </div>
             
             <div className="mb-8">
               <label className="text-sm font-medium text-slate-700 block mb-2">Planned Ad Spend (₹)</label>
               <input 
                  type="number"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="w-full text-2xl font-bold text-navy-900 border-b-2 border-slate-200 focus:border-gold-500 pb-2 outline-none"
               />
             </div>

             <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="p-4 bg-slate-50 rounded-xl">
                 <span className="text-xs text-slate-500">Est. Reach</span>
                 <p className="text-lg font-bold text-navy-900">{roiReach.toLocaleString()}</p>
               </div>
               <div className="p-4 bg-slate-50 rounded-xl">
                 <span className="text-xs text-slate-500">Inquiries</span>
                 <p className="text-lg font-bold text-navy-900">{roiInquiries}</p>
               </div>
               <div className="p-4 bg-slate-50 rounded-xl">
                 <span className="text-xs text-slate-500">Site Visits</span>
                 <p className="text-lg font-bold text-navy-900">{roiVisits}</p>
               </div>
               <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                 <span className="text-xs text-emerald-600">Expected Deals</span>
                 <p className="text-lg font-bold text-emerald-700">{roiDeals}</p>
               </div>
             </div>

             <div className="p-6 bg-navy-900 rounded-xl text-white">
               <div className="flex justify-between items-end mb-2">
                 <span className="text-slate-400">Projected Commission</span>
                 <span className="text-2xl font-bold text-gold-500">₹{projectedRevenue.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-end">
                 <span className="text-slate-400">Estimated ROI</span>
                 <span className="text-xl font-bold text-emerald-400">{roiPercentage}%</span>
               </div>
             </div>
          </div>
        </div>

        {/* Trigger Automation Hub */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-navy-900">Trigger Automation Hub</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Dispatcher */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-gold-500" /> Dispatch Action
            </h3>
            <form onSubmit={handleDispatchTrigger} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Channel</label>
                <select 
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gold-500"
                  value={triggerForm.channel} onChange={e => setTriggerForm({...triggerForm, channel: e.target.value})}
                >
                  <option value="Email">Email Platform</option>
                  <option value="Social Media">Social Media</option>
                  <option value="SMS">SMS / WhatsApp</option>
                  <option value="Meta Ads">Meta Ads (FB/IG)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Segment</label>
                <select 
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gold-500"
                  value={triggerForm.audience} onChange={e => setTriggerForm({...triggerForm, audience: e.target.value})}
                >
                  {funnelStages.map(s => <option key={s.title} value={s.title}>{s.title} Stage Users</option>)}
                </select>
                <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 flex justify-between items-center">
                  <span>Audience Size:</span>
                  <span className="font-bold text-navy-900 px-2 py-0.5 bg-gold-100 text-gold-800 rounded">
                    {funnelStages.find(s => s.title === triggerForm.audience)?.users?.toLocaleString() || 0} Users
                  </span>
                </div>
              </div>
              {triggerForm.channel === 'Meta Ads' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Daily Ad Budget (₹)</label>
                  <input 
                    type="number"
                    required
                    placeholder="e.g. 5000"
                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Action Message / Ad Copy</label>
                <textarea 
                  rows="3"
                  required
                  placeholder="e.g. Follow-up discount offer..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gold-500 resize-none"
                  value={triggerForm.message} onChange={e => setTriggerForm({...triggerForm, message: e.target.value})}
                ></textarea>
              </div>
              <Button variant="primary" type="submit" className="w-full justify-center flex items-center gap-2" disabled={isTriggering}>
                {isTriggering ? 'Dispatching...' : 'Fire Trigger'}
                {!isTriggering && <Target className="w-4 h-4" />}
              </Button>
            </form>
          </div>

          {/* Trigger Log */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
               <Clock className="w-5 h-5 text-slate-500" /> Output Stream (Live)
             </h3>
             <div className="h-80 overflow-y-auto space-y-3 pr-2">
               {triggerLog.map((log) => (
                 <div key={log.id} className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full mt-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-bold text-navy-900">{log.channel} Output</span>
                        <span className="text-xs text-slate-500">{log.time}</span>
                      </div>
                      <p className="text-sm text-slate-700 mb-2">{log.message}</p>
                      <div className="inline-block bg-white px-2 py-1 border border-slate-200 text-xs font-bold text-slate-600 rounded-md">
                        Target: {log.audience}
                      </div>
                    </div>
                 </div>
               ))}
               {triggerLog.length === 0 && (
                 <div className="text-center text-slate-500 py-10">No triggers fired yet.</div>
               )}
             </div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-navy-900">Current Campaigns</h2>
        </div>
        <DataTable 
          columns={columns}
          data={campaigns}
          searchKey="name"
          searchPlaceholder="Search campaigns..."
        />
      </div>

      {/* Create Campaign Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Campaign">
        <form onSubmit={handleCampaignSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Name</label>
            <input 
              type="text" 
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-gold-500'}`}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Channel</label>
            <select
              className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gold-500"
              value={formData.channel}
              onChange={(e) => setFormData({...formData, channel: e.target.value})}
            >
              <option value="Google">Google Ads</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Email">Email Marketing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
            <select
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 ${errors.audience ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-gold-500'}`}
              value={formData.audience}
              onChange={(e) => setFormData({...formData, audience: e.target.value})}
            >
              <option value="">Select Audience</option>
              <option value="First-time Buyers">First-time Buyers</option>
              <option value="Investors">Investors</option>
              <option value="NRIs">NRIs</option>
              <option value="Renters">Renters</option>
            </select>
            {errors.audience && <span className="text-xs text-red-500">{errors.audience}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Budget (₹)</label>
            <input 
              type="number" 
              className={`w-full p-2.5 border rounded-lg outline-none focus:ring-2 ${errors.budget ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-gold-500'}`}
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
            />
            {errors.budget && <span className="text-xs text-red-500">{errors.budget}</span>}
          </div>

          <div className="pt-4 flex gap-4">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="flex-1">
              Launch Campaign
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
