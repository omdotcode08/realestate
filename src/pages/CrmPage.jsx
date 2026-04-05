import { useState } from 'react';
import { AnimatedSection, FadeIn } from '../components/AnimatedSection';
import './CrmPage.css';

const INITIAL_LEADS = [
  { id: 1, name: 'Vikram Singh', phone: '+91 98765 43210', interest: '3BHK Apartment', status: 'New', agent: 'Rahul K', date: 'Today' },
  { id: 2, name: 'Pooja Reddy', phone: '+91 99887 76655', interest: '4BHK Villa', status: 'Contacted', agent: 'Priya S', date: 'Yesterday' },
  { id: 3, name: 'Amit Desai', phone: '+91 91234 56789', interest: 'Commercial Plot', status: 'Site Visit', agent: 'Rahul K', date: '2 days ago' },
  { id: 4, name: 'Neha Gupta', phone: '+91 98888 77777', interest: '2BHK Apartment', status: 'Negotiation', agent: 'Arjun J', date: '3 days ago' },
  { id: 5, name: 'Sanjay Kumar', phone: '+91 95555 44444', interest: 'Studio Apartment', status: 'Closed', agent: 'Maya N', date: '1 week ago' },
];

const CrmPage = () => {
  const [activeTab, setActiveTab] = useState('table');
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-purple-100 text-purple-800';
      case 'Site Visit': return 'bg-yellow-100 text-yellow-800';
      case 'Negotiation': return 'bg-orange-100 text-orange-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.interest.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? lead.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const handleAddLead = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newLead = {
      id: Date.now(),
      name: formData.get('name'),
      phone: formData.get('phone'),
      interest: formData.get('interest'),
      status: 'New',
      agent: formData.get('agent'),
      date: 'Just now'
    };
    setLeads([newLead, ...leads]);
    setIsModalOpen(false);
  };

  return (
    <div className="crm-page">
      <div className="page-hero crm-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content text-center">
          <FadeIn delay={0.1}>
            <div className="hero-badge"><i className="fas fa-users-cog"></i> CRM System</div>
            <h1 className="hero-title">CRM <span className="text-gold">Dashboard</span></h1>
            <p className="hero-subtitle mx-auto">End-to-end lead management and customer relationship system to maximize conversions</p>
          </FadeIn>
        </div>
      </div>

      <section className="crm-dashboard-section">
        <div className="container-full">
          <AnimatedSection delay={0.1}>
            <div className="crm-header-bar">
              <div>
                <h2>CRM <span className="text-gold">Live Dashboard</span></h2>
                <p>Mock interactive dashboard – managing {leads.length} active leads</p>
              </div>
              <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                <i className="fas fa-plus"></i> Add New Lead
              </button>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="crm-stats-bar">
              <div className="crm-stat glass-panel"><div className="crm-stat-value">{leads.length}</div><div className="crm-stat-label"><i className="fas fa-users"></i> Total Leads</div></div>
              <div className="crm-stat glass-panel"><div className="crm-stat-value">{leads.filter(l => l.status === 'Closed').length}</div><div className="crm-stat-label"><i className="fas fa-trophy"></i> Deals Closed</div></div>
              <div className="crm-stat glass-panel"><div className="crm-stat-value">24%</div><div className="crm-stat-label"><i className="fas fa-percent"></i> Conversion Rate</div></div>
              <div className="crm-stat glass-panel"><div className="crm-stat-value">₹1.5Cr</div><div className="crm-stat-label"><i className="fas fa-rupee-sign"></i> Revenue</div></div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="crm-body">
              <div className="crm-sidebar glass-panel">
                <div className="sidebar-menu">
                  <div className={`sidebar-item ${activeTab === 'table' ? 'active' : ''}`} onClick={() => setActiveTab('table')}><i className="fas fa-table"></i> Leads Table</div>
                  <div className={`sidebar-item ${activeTab === 'kanban' ? 'active' : ''}`} onClick={() => setActiveTab('kanban')}><i className="fas fa-columns"></i> Pipeline Board</div>
                </div>
                <div className="sidebar-agents">
                  <h5>Active Agents</h5>
                  {[
                    {initials: 'RK', name: 'Rahul Kumar', color: '#6366f1'},
                    {initials: 'PS', name: 'Priya Sharma', color: '#f59e0b'},
                    {initials: 'AJ', name: 'Arjun Joshi', color: '#10b981'},
                  ].map((agent, i) => (
                    <div key={i} className="agent-item">
                      <div className="agent-avatar" style={{background: agent.color}}>{agent.initials}</div>
                      <div className="agent-info"><b>{agent.name}</b></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="crm-main glass-panel">
                {activeTab === 'table' ? (
                  <div className="crm-view active">
                    <div className="table-toolbar">
                      <input type="text" placeholder="🔍  Search leads..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="lead-search-input" />
                      <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="status-filter-select">
                        <option value="">All Statuses</option>
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Site Visit</option>
                        <option>Negotiation</option>
                        <option>Closed</option>
                      </select>
                    </div>
                    <div className="table-responsive">
                      <table className="leads-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Interest</th>
                            <th>Status</th>
                            <th>Agent</th>
                            <th>Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredLeads.map(lead => (
                            <tr key={lead.id}>
                              <td><strong>{lead.name}</strong></td>
                              <td>{lead.phone}</td>
                              <td>{lead.interest}</td>
                              <td><span className={`status-badge ${getStatusColor(lead.status)}`}>{lead.status}</span></td>
                              <td>{lead.agent}</td>
                              <td>{lead.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="kanban-view">
                    {['New', 'Contacted', 'Site Visit', 'Negotiation', 'Closed'].map(status => (
                      <div key={status} className="kanban-column">
                        <div className="kanban-header">
                          <h3>{status}</h3>
                          <span className="kanban-count">{leads.filter(l => l.status === status).length}</span>
                        </div>
                        <div className="kanban-cards">
                          {leads.filter(l => l.status === status).map(lead => (
                            <div key={lead.id} className="kanban-card">
                              <h4>{lead.name}</h4>
                              <p>{lead.interest}</p>
                              <div className="kanban-footer">
                                <span className="kanban-agent"><i className="fas fa-user"></i> {lead.agent}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Add Lead Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><i className="fas fa-user-plus"></i> Add New Lead</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}><i className="fas fa-times"></i></button>
            </div>
            <form className="modal-form" onSubmit={handleAddLead}>
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="name" required placeholder="e.g. Vikram Singh" />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="form-group">
                <label>Interest</label>
                <select name="interest">
                  <option>3BHK Apartment</option>
                  <option>4BHK Villa</option>
                  <option>Commercial Plot</option>
                </select>
              </div>
              <div className="form-group">
                <label>Assigned Agent</label>
                <select name="agent">
                  <option>Rahul K</option>
                  <option>Priya S</option>
                  <option>Arjun J</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrmPage;
