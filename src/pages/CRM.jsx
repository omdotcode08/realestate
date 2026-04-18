import React, { useState, useEffect } from 'react';
import { mockKanbanData, mockVisits, mockTickets, mockProperties, mockAgents } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LayoutDashboard, Users, Columns, Calendar, LifeBuoy, Plus, Phone, CalendarPlus, Search, CheckCircle, X, ChevronRight, UserPlus } from 'lucide-react';
import Badge from '../components/shared/Badge';
import Button from '../components/shared/Button';
import Toast from '../components/shared/Toast';
import Modal from '../components/shared/Modal';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

export default function CRM() {
  const [activeView, setActiveView] = useState('Pipeline'); // Dashboard, Pipeline, Scheduled Visits, Support
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [toastMessage, setToastMessage] = useState(null);

  // --- Pipeline / Kanban State ---
  const [kanbanData, setKanbanData] = useState(mockKanbanData);
  const [draggedLead, setDraggedLead] = useState(null);
  
  // --- Lead Detail Panel ---
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadNotes, setLeadNotes] = useLocalStorage('crm_lead_notes', {});

  // --- Calendar State ---
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDragStart = (e, lead, sourceCol) => {
    setDraggedLead({ lead, sourceCol });
    // setTimeout to slightly delay opacity change
    setTimeout(() => { e.target.style.opacity = '0.5'; }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedLead(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetCol) => {
    e.preventDefault();
    if (!draggedLead) return;
    
    const { lead, sourceCol } = draggedLead;
    if (sourceCol === targetCol) return;

    setKanbanData((prev) => {
      const newData = { ...prev };
      // Remove from source
      newData[sourceCol] = newData[sourceCol].filter(l => l.id !== lead.id);
      // Update status and add to target
      const updatedLead = { ...lead, status: targetCol };
      newData[targetCol] = [...newData[targetCol], updatedLead];
      return newData;
    });
    setToastMessage(`Moved ${lead.name} to ${targetCol}`);
  };

  const saveNote = (leadId, text) => {
    setLeadNotes({ ...leadNotes, [leadId]: text });
  };

  const NavItem = ({ icon: Icon, label }) => (
    <button
      onClick={() => { setActiveView(label); setIsMobileMenuOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
        activeView === label ? 'bg-gold-500 text-navy-900 shadow-sm' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="pt-20 min-h-screen bg-slate-50 flex">
      <Toast isVisible={!!toastMessage} message={toastMessage} onClose={() => setToastMessage(null)} />
      
      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-navy-900 border-r border-slate-800 pt-24 pb-6 px-4 transform transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="space-y-2">
          <NavItem icon={LayoutDashboard} label="Dashboard" />
          <NavItem icon={Columns} label="Pipeline" />
          <NavItem icon={Calendar} label="Scheduled Visits" />
          <NavItem icon={LifeBuoy} label="Support" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 lg:ml-64 relative ${selectedLead ? 'mr-96' : ''}`}>
        
        {/* Mobile header toggle */}
        <div className="lg:hidden p-4 border-b border-slate-200 bg-white flex justify-between items-center">
          <h2 className="font-bold text-navy-900">{activeView}</h2>
          <Button variant="outline" className="px-3" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            Menu
          </Button>
        </div>

        <div className="p-6 h-[calc(100vh-80px)] overflow-y-auto">
          
          {activeView === 'Dashboard' && <DashboardView />}
          
          {activeView === 'Pipeline' && (
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-navy-900">Lead Pipeline</h1>
                  <p className="text-slate-500">Drag and drop leads to advance deals.</p>
                </div>
                <Button variant="primary" onClick={() => setToastMessage("New lead modal opened")}>
                  <Plus className="w-4 h-4 mr-1" /> Add Lead
                </Button>
              </div>
              
              <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
                {Object.keys(kanbanData).map(column => (
                  <div 
                    key={column} 
                    className="flex-none w-80 bg-slate-100/50 border border-slate-200 rounded-xl p-4 flex flex-col"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, column)}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-slate-700">{column}</h3>
                      <Badge variant="neutral">{kanbanData[column].length}</Badge>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                      {kanbanData[column].map(lead => (
                        <div 
                          key={lead.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, lead, column)}
                          onDragEnd={handleDragEnd}
                          onClick={() => setSelectedLead(lead)}
                          className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-gold-500 transition-all active:cursor-grabbing"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-navy-900">{lead.name}</h4>
                            <div className={`w-2.5 h-2.5 rounded-full ${
                              lead.priority === 'high' ? 'bg-red-500' : lead.priority === 'medium' ? 'bg-orange-400' : 'bg-emerald-400'
                            }`} />
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{lead.interest}</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="gold">{lead.budget}</Badge>
                            <span className="text-xs text-slate-400 truncate w-20">{lead.agent}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'Scheduled Visits' && (
            <ScheduledVisitsView currentDate={currentDate} setCurrentDate={setCurrentDate} />
          )}

          {activeView === 'Support' && <SupportView />}

        </div>
      </main>

      {/* Lead Detail Side Panel */}
      <div 
        className={`fixed top-20 right-0 bottom-0 w-96 bg-white border-l border-slate-200 shadow-2xl transition-transform duration-300 z-40 transform ${
          selectedLead ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedLead && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-navy-900">Lead Details</h3>
              <button onClick={() => setSelectedLead(null)} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Profile Card */}
              <div className="text-center pb-6 border-b border-slate-100">
                <div className="w-20 h-20 bg-navy-100 text-navy-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                  {selectedLead.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold text-navy-900">{selectedLead.name}</h2>
                <p className="text-slate-500 mb-2">{selectedLead.interest}</p>
                <Badge variant={selectedLead.kyc === 'Verified' ? 'success' : 'warning'}>KYC {selectedLead.kyc}</Badge>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 px-0" onClick={() => setToastMessage("Scheduling modal opened.")}>
                  <CalendarPlus className="w-4 h-4 mr-2" /> Schedule
                </Button>
                <Button variant="outline" className="flex-1 px-0 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white">
                  <Phone className="w-4 h-4 mr-2" /> Call
                </Button>
              </div>

              {/* Specs */}
              <div>
                <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">Requirements</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg"><span className="text-xs text-slate-500 block">Budget</span><span className="font-bold text-navy-900">{selectedLead.budget}</span></div>
                  <div className="bg-slate-50 p-3 rounded-lg"><span className="text-xs text-slate-500 block">Agent</span><span className="font-bold text-navy-900">{selectedLead.agent}</span></div>
                </div>
              </div>

              {/* Recommended properties */}
              <div>
                <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">Suggested Properties</h4>
                <div className="space-y-3">
                  {mockProperties.slice(0, 2).map(prop => (
                    <div key={prop.id} className="flex gap-3 items-center border border-slate-200 p-2 rounded-lg">
                      <img src={prop.image} className="w-16 h-16 rounded object-cover" alt="" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-navy-900 text-sm truncate">{prop.title}</p>
                        <p className="text-xs text-slate-500">{prop.priceStr}</p>
                      </div>
                      <button 
                        onClick={() => setToastMessage("Property details sent via WhatsApp ✅")}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        Send
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">Agent Notes</h4>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 h-24"
                  placeholder="Add a note... (autosaves)"
                  defaultValue={leadNotes[selectedLead.id] || ''}
                  onBlur={(e) => saveNote(selectedLead.id, e.target.value)}
                ></textarea>
              </div>

              {/* Timeline */}
              <div>
                 <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">Interaction Timeline</h4>
                 <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-gold-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                        <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-sm">Called on 3 Apr - Showed interest</div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                        <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-sm">Sent brochure on 1 Apr</div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}

// Sub-components for views

function DashboardView() {
  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ label: 'Leads this week', data: [12, 19, 15, 25, 22, 30, 20], backgroundColor: '#0F172A', borderRadius: 4 }]
  };
  
  const doughnutData = {
    labels: ['Apartment', 'Villa', 'Commercial', 'Plot'],
    datasets: [{ data: [45, 25, 15, 15], backgroundColor: ['#0F172A', '#F59E0B', '#3b82f6', '#10b981'], borderWidth: 0 }]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">CRM Dashboard</h1>
          <p className="text-slate-500">Overview of pipeline and agent performance.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"><p className="text-slate-500 text-sm mb-1">Total Leads</p><h3 className="text-2xl font-bold text-navy-900">2,405</h3></div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"><p className="text-slate-500 text-sm mb-1">Visits Scheduled</p><h3 className="text-2xl font-bold text-emerald-600">42</h3></div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"><p className="text-slate-500 text-sm mb-1">Deals Closed</p><h3 className="text-2xl font-bold text-gold-500">18</h3></div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"><p className="text-slate-500 text-sm mb-1">Pipeline Value</p><h3 className="text-2xl font-bold text-navy-900">₹45 Cr</h3></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <h3 className="font-bold text-slate-700 mb-4">Lead Generation Trend</h3>
           <div className="h-64"><Bar data={barData} options={{ maintainAspectRatio: false }} /></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <h3 className="font-bold text-slate-700 mb-4">Interest by Sector</h3>
           <div className="h-64 flex justify-center"><Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} /></div>
        </div>
      </div>
    </div>
  );
}

function ScheduledVisitsView({ currentDate, setCurrentDate }) {
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  // Dummy filter
  const dayVisits = mockVisits.filter(v => {
    const d = new Date(v.dateStr);
    return d.getDate() === selectedDate && d.getMonth() === month && d.getFullYear() === year;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-navy-900">Scheduled Visits</h1>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">&lt;</button>
            <span className="px-4 py-1 font-bold text-navy-900">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
            <button onClick={nextMonth} className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">&gt;</button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="py-3 text-center text-sm font-bold text-slate-500">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 h-96">
            {days.map((day, i) => {
              const hasVisit = day && mockVisits.some(v => new Date(v.dateStr).getDate() === day && new Date(v.dateStr).getMonth() === month);
              return (
                <div 
                  key={i} 
                  onClick={() => day && setSelectedDate(day)}
                  className={`border-b border-r border-slate-100 p-2 cursor-pointer transition-colors relative 
                    ${day === selectedDate ? 'bg-gold-50' : 'hover:bg-slate-50'} 
                    ${!day ? 'bg-slate-50/50' : ''}`
                  }
                >
                  <span className={`text-sm font-medium ${day === selectedDate ? 'text-gold-600' : 'text-slate-600'}`}>{day}</span>
                  {hasVisit && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full"></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="lg:w-1/3">
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full min-h-[400px]">
           <h3 className="font-bold text-lg text-navy-900 mb-4">Visits on {selectedDate} {currentDate.toLocaleString('default', { month: 'short' })}</h3>
           
           <div className="space-y-4">
             {dayVisits.length > 0 ? dayVisits.map((v, i) => (
                <div key={i} className="p-4 rounded-lg border border-slate-100 bg-slate-50 relative">
                  <div className={`absolute top-0 bottom-0 left-0 w-1 rounded-l-lg ${v.status === 'Confirmed' ? 'bg-emerald-500' : v.status==='Completed' ? 'bg-navy-400' : 'bg-amber-400'}`}></div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-navy-900">{v.buyer}</h4>
                    <span className="text-xs font-bold text-slate-500">{v.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{v.property}</p>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200">
                     <span className="text-xs text-slate-500">Agent: {v.agent}</span>
                     <select className="text-xs font-bold bg-transparent outline-none cursor-pointer" defaultValue={v.status}>
                       <option value="Pending">Pending</option>
                       <option value="Confirmed">Confirmed</option>
                       <option value="Completed">Completed</option>
                     </select>
                  </div>
                </div>
             )) : (
               <div className="text-center text-slate-500 py-10">
                 <Calendar className="w-8 h-8 opacity-20 mx-auto mb-2" />
                 <p>No visits scheduled.</p>
               </div>
             )}
           </div>
         </div>
      </div>
    </div>
  );
}

function SupportView() {
  const [tickets, setTickets] = useState(mockTickets);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Support Desk</h1>
          <p className="text-slate-500">Manage client queries and issues.</p>
        </div>
        <Button variant="primary">Create Ticket</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
         <table className="w-full text-left">
           <thead className="bg-slate-50 border-b border-slate-200">
             <tr>
               <th className="px-6 py-4 text-sm font-bold text-slate-500">Issue</th>
               <th className="px-6 py-4 text-sm font-bold text-slate-500">Client</th>
               <th className="px-6 py-4 text-sm font-bold text-slate-500">Priority</th>
               <th className="px-6 py-4 text-sm font-bold text-slate-500">Status</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
             {tickets.map((t, idx) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-navy-900">{t.issue}</td>
                  <td className="px-6 py-4 text-slate-600">{t.client}</td>
                  <td className="px-6 py-4">
                    <Badge variant={t.priority === 'High' ? 'danger' : t.priority === 'Medium' ? 'warning' : 'info'}>{t.priority}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      className={`text-sm font-semibold p-1.5 rounded-lg outline-none cursor-pointer border ${
                        t.status === 'Open' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                        t.status === 'In Progress' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        'bg-emerald-100 text-emerald-800 border-emerald-200'
                      }`}
                      value={t.status}
                      onChange={(e) => {
                        const newTickets = [...tickets];
                        newTickets[idx].status = e.target.value;
                        setTickets(newTickets);
                      }}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
             ))}
           </tbody>
         </table>
      </div>
    </div>
  );
}
