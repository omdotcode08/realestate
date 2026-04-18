import React, { useState, useEffect } from 'react';
import { revenueSimulatorFormula } from '../data/mockData';
import KPICard from '../components/shared/KPICard';
import Button from '../components/shared/Button';
import Badge from '../components/shared/Badge';
import { Check, X, TrendingUp, Users, Target, Activity } from 'lucide-react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function RevenueModel() {
  // --- Simulator State ---
  const [agents, setAgents] = useState(5000);
  const [proPct, setProPct] = useState(25);
  const [featuredAvg, setFeaturedAvg] = useState(5);
  const [kpis, setKpis] = useState({ arr: '0', growth: '0', monthlyRevenue: 0, leadsGenerated: 0 });

  // Update KPIs and chart data on slider change
  useEffect(() => {
    const result = revenueSimulatorFormula(agents, proPct, featuredAvg);
    setKpis(result);
  }, [agents, proPct, featuredAvg]);

  // --- Chart Data ---
  const doughnutData = {
    labels: ['Subscription Plans', 'Featured Listings', 'Lead Generation', 'Home Loans', 'Legal Services', 'Interior Referrals'],
    datasets: [{
      data: [30, 20, 25, 15, 7, 3],
      backgroundColor: [
        '#0F172A', // navy-900
        '#F59E0B', // gold-500
        '#3b82f6', // blue-500
        '#10b981', // emerald-500
        '#8b5cf6', // violet-500
        '#f43f5e', // rose-500
      ],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Make bar chart dynamic based on simulated monthly revenue
  const dynamicBarData = months.map((_, i) => {
    const base = kpis.monthlyRevenue || 50000000;
    // Add some random seasonal fluctuation -10% to +10%
    const variation = 0.9 + (Math.sin(i) * 0.1); 
    return base * variation;
  });

  const barData = {
    labels: months,
    datasets: [{
      label: 'Monthly Revenue (₹)',
      data: dynamicBarData,
      backgroundColor: '#0F172A',
      borderRadius: 4,
    }]
  };

  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Listings Growth',
        data: months.map((_, i) => 1000 + (agents * 0.1 * i)),
        borderColor: '#0F172A',
        backgroundColor: 'transparent',
        tension: 0.4,
        yAxisID: 'y'
      },
      {
        label: 'Revenue Growth',
        data: dynamicBarData.map(v => v / 1000000), // Scale to millions for visual balance
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    scales: {
      y: { type: 'linear', display: true, position: 'left', title: { display: true, text: 'Listings Count' } },
      y1: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: 'Rev (Millions)' } }
    }
  };

  // --- Subscription TIer State ---
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  
  const plans = [
    {
      name: 'Basic',
      price: '₹1,999/mo',
      features: ['5 Listings', 'Basic Support', 'Standard Profile', 'No Lead Priority']
    },
    {
      name: 'Pro',
      price: '₹4,999/mo',
      popular: true,
      features: ['50 Listings', 'Priority Support', 'Verified Badge', 'High Lead Priority', 'CRM Access']
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited Listings', 'Dedicated RM', 'Premium Placement', 'Highest Lead Priority', 'Full CRM + API Access']
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        
        <div className="mb-10 text-center">
          <Badge variant="gold" className="uppercase tracking-widest mb-3">Admin Analytics</Badge>
          <h1 className="text-4xl font-bold text-navy-900 mb-4">Revenue Model & Dashboard</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">Track real-time growth, adjust monetization levers, and monitor financial performance of the platform.</p>
        </div>

        {/* Dashboard KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard title="Total ARR" value={kpis.arr} icon={Activity} change={12.4} />
          <KPICard title="MoM Revenue Growth" value={kpis.growth} icon={TrendingUp} change={2.1} />
          <KPICard title="Active Agent Subscriptions" value={agents.toLocaleString()} icon={Users} change={5.8} />
          <KPICard title="Leads Generated (Month)" value={kpis.leadsGenerated.toLocaleString()} icon={Target} change={18.2} />
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Controls */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
              Revenue Simulator
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Active Agents</label>
                  <span className="font-bold text-navy-900">{agents.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="100" max="10000" step="100"
                  value={agents} onChange={(e) => setAgents(Number(e.target.value))}
                  className="w-full accent-gold-500 bg-slate-200 rounded-lg h-2"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">% on Pro/Premium Plan</label>
                  <span className="font-bold text-navy-900">{proPct}%</span>
                </div>
                <input 
                  type="range" min="5" max="70" step="1"
                  value={proPct} onChange={(e) => setProPct(Number(e.target.value))}
                  className="w-full accent-gold-500 bg-slate-200 rounded-lg h-2"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Avg Featured Listings / Agent</label>
                  <span className="font-bold text-navy-900">{featuredAvg} / mo</span>
                </div>
                <input 
                  type="range" min="1" max="20" step="1"
                  value={featuredAvg} onChange={(e) => setFeaturedAvg(Number(e.target.value))}
                  className="w-full accent-gold-500 bg-slate-200 rounded-lg h-2"
                />
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-2">Projected Monthly Revenue</p>
              <h2 className="text-3xl font-bold text-emerald-600">₹{(kpis.monthlyRevenue / 1000000).toFixed(2)} M</h2>
            </div>
          </div>

          {/* Charts */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-600 mb-4">Revenue by Stream</h3>
              <div className="h-64 flex justify-center">
                <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-600 mb-4">Monthly Revenue Projection</h3>
              <div className="h-64">
                <Bar data={barData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-600 mb-4">Listings Growth vs Revenue</h3>
              <div className="h-72">
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
          </div>
          
        </div>

        {/* Subscription Tier Comparison */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Subscription Tiers</h2>
            <p className="text-slate-500">Pick the plan that works best for your agency or builder portfolio.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                onClick={() => setSelectedPlan(plan.name)}
                className={`relative bg-white rounded-2xl p-8 border-2 transition-all cursor-pointer overflow-hidden ${
                  selectedPlan === plan.name ? 'border-gold-500 shadow-xl scale-105' : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-navy-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-slate-800 mb-6">{plan.price}</div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-600">
                      {feature.includes('No') ? <X className="w-5 h-5 text-red-400" /> : <Check className="w-5 h-5 text-emerald-500" />}
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={selectedPlan === plan.name ? 'primary' : 'outline'} 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`${plan.name} Selected`);
                  }}
                >
                  Choose {plan.name}
                </Button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
