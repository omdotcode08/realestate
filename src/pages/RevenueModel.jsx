import React, { useState } from 'react';
import KPICard from '../components/shared/KPICard';
import Button from '../components/shared/Button';
import Badge from '../components/shared/Badge';
import Modal from '../components/shared/Modal';
import DataTable from '../components/shared/DataTable';
import { Check, X, TrendingUp, Users, Activity, DollarSign, Plus, FileText, Receipt } from 'lucide-react';

export default function RevenueModel() {
  // --- Live Transaction State ---
  const [transactions, setTransactions] = useState([
    { id: 'tx1', amount: 150000, source: 'Subscription Plans', note: 'Enterprise Annual Signup', date: new Date().toISOString().split('T')[0] },
    { id: 'tx2', amount: 25000, source: 'Featured Listings', note: 'Top Banner Ads Placements', date: new Date().toISOString().split('T')[0] },
  ]);
  const [showTxModal, setShowTxModal] = useState(false);
  const [txForm, setTxForm] = useState({ amount: '', source: 'Subscription Plans', note: '' });

  // --- Invoicing State ---
  const [invoices, setInvoices] = useState([
    { id: 'INV-2026-001', client: 'Arun Properties', amount: 12000, status: 'Paid', due: '2026-04-10' },
    { id: 'INV-2026-002', client: 'Dream Homes Agency', amount: 45000, status: 'Pending', due: '2026-04-20' },
    { id: 'INV-2026-003', client: 'Skyline Builders', amount: 18000, status: 'Overdue', due: '2026-04-05' },
  ]);

  const totalActualRevenue = transactions.reduce((acc, tx) => acc + Number(tx.amount), 0);
  const activeSubs = 450;
  const mrr = 1250000;
  const outstandingAmount = invoices.filter(i => i.status !== 'Paid').reduce((acc, i) => acc + i.amount, 0);

  const handleTxSubmit = (e) => {
    e.preventDefault();
    if (!txForm.amount) return;
    const newTx = {
      id: `tx${Date.now()}`,
      amount: Number(txForm.amount),
      source: txForm.source,
      note: txForm.note,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions([newTx, ...transactions]);
    setShowTxModal(false);
    setTxForm({ amount: '', source: 'Subscription Plans', note: '' });
  };

  const txColumns = [
    { label: 'Date', key: 'date', sortable: true },
    { label: 'Source', key: 'source', sortable: true },
    { label: 'Notes', key: 'note' },
    { 
      label: 'Amount (₹)', 
      key: 'amount', 
      sortable: true,
      render: (row) => `₹${Number(row.amount).toLocaleString()}`
    }
  ];

  const invoiceColumns = [
    { label: 'Invoice #', key: 'id' },
    { label: 'Client', key: 'client', sortable: true },
    { label: 'Due Date', key: 'due', sortable: true },
    { 
      label: 'Amount (₹)', 
      key: 'amount', 
      sortable: true,
      render: (row) => `₹${row.amount.toLocaleString()}`
    },
    { 
      label: 'Status', 
      key: 'status',
      render: (row) => (
        <Badge variant={row.status === 'Paid' ? 'success' : row.status === 'Pending' ? 'warning' : 'danger'}>
          {row.status}
        </Badge>
      )
    }
  ];

  // --- Subscription Tier State ---
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
          <Badge variant="gold" className="uppercase tracking-widest mb-3">Finance Center</Badge>
          <h1 className="text-4xl font-bold text-navy-900 mb-4">Billing & Transactions System</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">Manage invoices, record incoming payments, and oversee subscription plans directly from the localized system state.</p>
        </div>

        {/* Dashboard KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard title="Total Collected Balance" value={`₹${totalActualRevenue.toLocaleString()}`} icon={DollarSign} change={8.5} />
          <KPICard title="Current MRR" value={`₹${(mrr / 100000).toFixed(1)}L`} icon={TrendingUp} change={4.2} />
          <KPICard title="Active Subscribers" value={activeSubs.toLocaleString()} icon={Users} change={2.1} />
          <KPICard title="Outstanding Invoices" value={`₹${outstandingAmount.toLocaleString()}`} icon={FileText} change={-5.4} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
          {/* Outstanding Bills / Invoices */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-navy-900 text-white">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-gold-500" /> System Invoices
                </h3>
              </div>
              <Button variant="outline" className="text-sm py-1.5 px-3 border-white text-white hover:bg-white hover:text-navy-900">Generate Invoice</Button>
            </div>
            <div className="flex-1 p-4 bg-white">
              <DataTable 
                columns={invoiceColumns}
                data={invoices}
                searchKey="client"
                searchPlaceholder="Search invoices..."
              />
            </div>
          </div>

          {/* Transaction Ledger */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-500" /> Incoming Ledger
                </h3>
              </div>
              <Button variant="primary" className="text-sm py-1.5 px-3" onClick={() => setShowTxModal(true)}>
                <Plus className="w-4 h-4 mr-1" /> Add Record
              </Button>
            </div>
            <div className="flex-1 p-4 bg-white">
              <DataTable 
                columns={txColumns}
                data={transactions}
                searchKey="source"
                searchPlaceholder="Search ledgers..."
              />
            </div>
          </div>
        </div>

        {/* Record Transaction Modal */}
        <Modal isOpen={showTxModal} onClose={() => setShowTxModal(false)} title="Record New Transaction">
          <form onSubmit={handleTxSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹)</label>
              <input 
                type="number" 
                required
                className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gold-500"
                value={txForm.amount}
                onChange={(e) => setTxForm({...txForm, amount: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Income Source</label>
              <select
                className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gold-500"
                value={txForm.source}
                onChange={(e) => setTxForm({...txForm, source: e.target.value})}
              >
                <option value="Subscription Plans">Subscription Plans</option>
                <option value="Featured Listings">Featured Listings</option>
                <option value="Lead Generation">Lead Generation</option>
                <option value="Home Loans">Home Loans</option>
                <option value="Legal Services">Legal Services</option>
                <option value="Interior Referrals">Interior Referrals</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reference Notes (Optional)</label>
              <input 
                type="text" 
                className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gold-500"
                value={txForm.note}
                onChange={(e) => setTxForm({...txForm, note: e.target.value})}
                placeholder="e.g. Enterprise Annual Payment"
              />
            </div>
            <div className="pt-4 flex gap-4">
              <Button variant="ghost" type="button" onClick={() => setShowTxModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="flex-1">
                Save Record
              </Button>
            </div>
          </form>
        </Modal>

        {/* Subscription Tier Comparison */}
        <div className="mt-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Manage Subscription Tiers</h2>
            <p className="text-slate-500">Configure the pricing plans currently offered in the system.</p>
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
                     alert(`Manage ${plan.name} Plan limits`);
                   }}
                 >
                   Manage {plan.name}
                 </Button>
               </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
