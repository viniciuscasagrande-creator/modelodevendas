import React, { useState } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import {
  BarChart3,
  Users,
  ShoppingBag,
  Plus,
  CheckCircle,
  ArrowRightLeft,
  ChevronRight,
  ChevronLeft,
  X,
  FileText,
  Search,
  Trash2,
  DollarSign,
  Briefcase,
  Send,
  Loader2,
  Building,
  Clock,
  Target,
  Award,
  Music,
  Globe,
  Terminal,
  FileSpreadsheet
} from 'lucide-react';

export default function CrmPage() {
  const {
    crmSubTab,
    setCrmSubTab,
    leads,
    setLeads,
    clients,
    setClients,
    companies,
    setCompanies,
    appointments,
    setAppointments,
    proposals,
    setProposals,
    contracts,
    setContracts,
    goals,
    setGoals,
    commissions,
    setCommissions,
    triggerToast,
    theme,
    cardClass,
    bgCard,
    inputClass,
    borderCol,
    textTitle,
    textSec,
    textBody,
    bgInput,
    selectThemeText
  } = useDiskHub();

  const btnSecondary = theme === 'dark' 
    ? 'bg-[#1E293B] text-slate-350 hover:bg-[#273449] hover:text-white border-0 cursor-pointer' 
    : 'bg-slate-100 text-slate-650 hover:bg-slate-200 border border-slate-200 cursor-pointer';

    const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', company: '', value: '', stage: 'prospect', tag: 'Novo' });
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', company: '', email: '', phone: '', status: 'Ativo' });
  const [crmSearch, setCrmSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [crmApiRoute, setCrmApiRoute] = useState('GET_DASHBOARD');
  const [crmApiLoading, setCrmApiLoading] = useState(false);
  const [crmApiResponse, setCrmApiResponse] = useState(null);
  const [crmApiInputs, setCrmApiInputs] = useState({ leadId: '', name: '', company: '', value: '' });

  const [producers, setProducers] = useState([
    { id: 'prod-1', name: 'Prime Show Eventos LTDA', eventsCount: 15, rating: '4.8', contact: 'roberto@primeshow.com.br', specialty: 'Shows Nacionais' },
    { id: 'prod-2', name: 'Gisele Lima Produções', eventsCount: 8, rating: '4.9', contact: 'gisele@diskhub.com.br', specialty: 'Festivais' },
    { id: 'prod-3', name: 'Arena Music Curitiba', eventsCount: 12, rating: '4.7', contact: 'contato@arenamusic.com.br', specialty: 'Eventos Corporativos' }
  ]);

  const [organizers, setOrganizers] = useState([
    { id: 'org-1', name: 'Associação de Criadores do Sul', region: 'Paraná', contact: 'contato@criadoresdosul.com.br', activeEvents: 3 },
    { id: 'org-2', name: 'Curitiba Eventos e Convenções', region: 'Curitiba', contact: 'comercial@curitibaeventos.com.br', activeEvents: 5 }
  ]);

  const [artists, setArtists] = useState([
    { id: 'art-1', name: 'Thiaguinho do Pagode', genre: 'Samba & Pagode', cachet: 150000, contact: 'agenda@thiaguinho.com.br' },
    { id: 'art-2', name: 'Iron Maiden Tribute', genre: 'Heavy Metal', cachet: 45000, contact: 'tribute@ironmaiden.com' }
  ]);

  const [bands, setBands] = useState([
    { id: 'band-1', name: 'Orquestra Sinfônica de Curitiba', membersCount: 45, genre: 'Clássica', cachet: 65000, contact: 'contato@orquestrasinfonica.org' }
  ]);

  const [sponsors, setSponsors] = useState([
    { id: 'spon-1', company: 'Itaú Unibanco', sponsoredEvent: 'Metal Fest 2026', value: 150000, contact: 'sponsorship@itau.com.br' },
    { id: 'spon-2', company: 'Coca-Cola FEMSA', sponsoredEvent: 'Festival de Inverno Curitiba', value: 120000, contact: 'marketing@cocacolafemsa.com' }
  ]);

  const [suppliers, setSuppliers] = useState([
    { id: 'sup-1', name: 'Master Luz Som e Imagem', service: 'Som e Iluminação', rating: '4.9', contact: 'comercial@masterluzsom.com.br' },
    { id: 'sup-2', name: 'Grades e Estruturas Sul', service: 'Grades e Portarias', rating: '4.6', contact: 'grades@estruturassul.com.br' }
  ]);

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.company || !newLead.value) return;
    const addedLead = {
      id: `lead-${Date.now()}`,
      name: newLead.name,
      company: newLead.company,
      value: parseFloat(newLead.value),
      stage: newLead.stage,
      date: 'Hoje',
      tag: newLead.tag
    };
    setLeads(prev => [...prev, addedLead]);
    setShowAddLeadModal(false);
    setNewLead({ name: '', company: '', value: '', stage: 'prospect', tag: 'Novo' });
    triggerToast("Sucesso", "Novo lead adicionado ao CRM.");
  };

    const handleCreateClient = (e) => {
    e.preventDefault();
    if (!newClient.name || !newClient.company || !newClient.email) return;
    const addedClient = {
      id: `c-${Date.now()}`,
      name: newClient.name,
      company: newClient.company,
      email: newClient.email,
      phone: newClient.phone || '(41) 99999-0000',
      spend: 0,
      status: newClient.status
    };
    setClients(prev => [addedClient, ...prev]);
    setShowAddClientModal(false);
    setNewClient({ name: '', company: '', email: '', phone: '', status: 'Ativo' });
    triggerToast("Sucesso", "Novo cliente cadastrado.");
  };

  return (
    <>
      {(() => {
                    // Handle switching sub-tabs cleanly

            // Handle switching sub-tabs cleanly
            const handleSubTabChange = (tabId) => {
              setCrmSubTab(tabId);
              setCrmSearch('');
              setShowAddForm(false);
            };

            // Sidebar sub-tab lists
            const comercialTabs = [
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'pipeline', label: 'Pipeline (Kanban)', icon: ArrowRightLeft },
              { id: 'leads', label: 'Leads', icon: Users, badge: leads.filter(l => l.stage !== 'won').length },
              { id: 'clientes', label: 'Clientes', icon: CheckCircle, badge: clients.length },
              { id: 'empresas', label: 'Empresas', icon: Building, badge: companies.length },
              { id: 'agenda', label: 'Agenda', icon: Clock, badge: appointments.filter(a => a.status === 'Pendente').length },
              { id: 'propostas', label: 'Propostas', icon: FileSpreadsheet, badge: proposals.filter(p => p.status === 'Enviada').length },
              { id: 'contratos', label: 'Contratos', icon: FileText, badge: contracts.filter(c => c.status === 'Ativo').length },
              { id: 'metas', label: 'Metas', icon: Target },
              { id: 'comissoes', label: 'Comissões', icon: Award, badge: commissions.filter(c => c.paymentStatus === 'Pendente').length }
            ];

            const eventTabs = [
              { id: 'produtores', label: 'Produtores', icon: Globe, badge: producers.length },
              { id: 'organizadores', label: 'Organizadores', icon: Briefcase, badge: organizers.length },
              { id: 'artistas', label: 'Artistas', icon: Music, badge: artists.length },
              { id: 'bandas', label: 'Bandas', icon: Users, badge: bands.length },
              { id: 'patrocinadores', label: 'Patrocinadores', icon: DollarSign, badge: sponsors.length },
              { id: 'fornecedores', label: 'Fornecedores', icon: ShoppingBag, badge: suppliers.length }
            ];

            // Execute simulated API call
            const handleExecuteApi = (e) => {
              e.preventDefault();
              setCrmApiLoading(true);
              setCrmApiResponse(null);

              setTimeout(() => {
                setCrmApiLoading(false);
                let responseData = {};

                if (crmApiRoute === 'GET_DASHBOARD') {
                  const wonLeads = leads.filter(l => l.stage === 'won');
                  const totalRevenue = wonLeads.reduce((acc, l) => acc + l.value, 0);
                  const conversionRate = leads.length > 0 ? ((wonLeads.length / leads.length) * 100).toFixed(1) + '%' : '0%';
                  const avgTicket = wonLeads.length > 0 ? totalRevenue / wonLeads.length : 0;

                  responseData = {
                    status: 200,
                    statusText: "OK",
                    data: {
                      conversao: conversionRate,
                      ticketMedio: avgTicket,
                      receitaTotal: totalRevenue,
                      eventosFechados: wonLeads.length,
                      leadsTotais: leads.length,
                      propostasAtivas: proposals.length
                    }
                  };
                } else if (crmApiRoute === 'GET_LEADS') {
                  responseData = {
                    status: 200,
                    statusText: "OK",
                    data: leads
                  };
                } else if (crmApiRoute === 'POST_CLIENTES') {
                  if (!crmApiInputs.name || !crmApiInputs.company || !crmApiInputs.email) {
                    responseData = {
                      status: 400,
                      statusText: "Bad Request",
                      data: { error: "Os campos 'name', 'company' e 'email' são obrigatórios." }
                    };
                  } else {
                    const newClientObj = {
                      id: `c-${Date.now()}`,
                      name: crmApiInputs.name,
                      company: crmApiInputs.company,
                      email: crmApiInputs.email,
                      phone: crmApiInputs.phone || '(41) 99999-0000',
                      spend: 0,
                      status: crmApiInputs.status
                    };
                    setClients(prev => [newClientObj, ...prev]);
                    responseData = {
                      status: 201,
                      statusText: "Created",
                      data: {
                        success: true,
                        message: "Cliente cadastrado via API com sucesso!",
                        client: newClientObj
                      }
                    };
                    triggerToast("API: Cliente Criado", `${crmApiInputs.name} foi adicionado via API POST.`);
                    // Reset inputs
                    setCrmApiInputs({ name: '', company: '', email: '', phone: '', status: 'Ativo' });
                  }
                } else if (crmApiRoute === 'GET_PRODUTORES') {
                  responseData = {
                    status: 200,
                    statusText: "OK",
                    data: producers
                  };
                }

                setCrmApiResponse(responseData);
              }, 600);
            };

            return (
              <div className="space-y-4 animate-fadeIn">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-bottom pb-3 border-slate-200 dark:border-white/5">
                  <div>
                    <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>CRM Enterprise</h2>
                    <p className={`text-xs ${textSec} mb-0`}>Módulo integrado comercial, relacionamento de eventos, comissões e sandbox de APIs.</p>
                  </div>
                </div>

                {/* Mobile Sub-Tab Navigation Dropdown */}
                <div className="md:hidden">
                  <label className={`text-[10px] font-semibold ${textSec} uppercase block mb-1`}>Navegação CRM</label>
                  <select 
                    value={crmSubTab} 
                    onChange={(e) => handleSubTabChange(e.target.value)} 
                    className={`form-control form-select ${inputClass} text-xs p-2.5 rounded focus:outline-none w-full`}
                  >
                    <optgroup label="CRM Comercial">
                      {comercialTabs.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.label} {t.badge !== undefined ? `(${t.badge})` : ''}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="CRM Eventos">
                      {eventTabs.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.label} {t.badge !== undefined ? `(${t.badge})` : ''}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Desenvolvedor">
                      <option value="api_sandbox">💻 Console de APIs</option>
                    </optgroup>
                  </select>
                </div>

                {/* Desktop Grid Layout */}
                <div className="row g-4">
                  {/* Left Side Navigation (Hidden on mobile) */}
                  <div className="col-lg-3 col-md-4 hidden md:block">
                    <div className={`card ${cardClass} p-3 space-y-4`}>
                      <div>
                        <h3 className={`text-[10px] font-bold ${textSec} uppercase tracking-wider mb-2 px-2`}>CRM Comercial</h3>
                        <div className="space-y-0.5">
                          {comercialTabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = crmSubTab === tab.id;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => handleSubTabChange(tab.id)}
                                className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-all border-0 ${
                                  isActive 
                                    ? 'bg-[#3B82F6]/10 text-[#3B82F6] font-bold' 
                                    : `${textSec} hover:bg-slate-100 dark:hover:bg-white/5 bg-transparent`
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <Icon className="w-3.5 h-3.5" />
                                  <span>{tab.label}</span>
                                </div>
                                {tab.badge !== undefined && tab.badge > 0 && (
                                  <span className="badge bg-[#3B82F6]/15 text-[#3B82F6] font-mono text-[9px] px-1.5 py-0.5 rounded-full">
                                    {tab.badge}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-[10px] font-bold ${textSec} uppercase tracking-wider mb-2 px-2`}>CRM Eventos</h3>
                        <div className="space-y-0.5">
                          {eventTabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = crmSubTab === tab.id;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => handleSubTabChange(tab.id)}
                                className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-all border-0 ${
                                  isActive 
                                    ? 'bg-[#3B82F6]/10 text-[#3B82F6] font-bold' 
                                    : `${textSec} hover:bg-slate-100 dark:hover:bg-white/5 bg-transparent`
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <Icon className="w-3.5 h-3.5" />
                                  <span>{tab.label}</span>
                                </div>
                                {tab.badge !== undefined && tab.badge > 0 && (
                                  <span className="badge bg-[#10B981]/15 text-[#10B981] font-mono text-[9px] px-1.5 py-0.5 rounded-full">
                                    {tab.badge}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="border-top pt-3 border-slate-200 dark:border-white/5">
                        <h3 className={`text-[10px] font-bold ${textSec} uppercase tracking-wider mb-2 px-2`}>Desenvolvedor</h3>
                        <button
                          onClick={() => handleSubTabChange('api_sandbox')}
                          className={`w-full text-left flex items-center space-x-2 px-2.5 py-1.5 rounded text-xs transition-all border-0 ${
                            crmSubTab === 'api_sandbox' 
                              ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] font-bold' 
                              : `${textSec} hover:bg-slate-100 dark:hover:bg-white/5 bg-transparent`
                          }`}
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Console de APIs</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Side Content Panel */}
                  <div className="col-lg-9 col-md-8">
                    
                    {/* ================= SUB-TAB: DASHBOARD ================= */}
                    {crmSubTab === 'dashboard' && (() => {
                      const wonLeads = leads.filter(l => l.stage === 'won');
                      const totalRevenue = wonLeads.reduce((acc, l) => acc + l.value, 0);
                      const conversionRate = leads.length > 0 ? ((wonLeads.length / leads.length) * 100).toFixed(1) : '0';
                      const avgTicket = wonLeads.length > 0 ? totalRevenue / wonLeads.length : 0;
                      
                      return (
                        <div className="space-y-4">
                          {/* KPIs Grid */}
                          <div className="row">
                            <div className="col-lg-3 col-6 mb-3">
                              <div className={`card ${cardClass} p-3 flex flex-col justify-between h-100`}>
                                <span className={`text-[10px] font-bold ${textSec} uppercase tracking-wider`}>Taxa Conversão</span>
                                <div className="flex items-baseline space-x-1.5 mt-2">
                                  <span className={`text-xl font-bold ${textTitle}`}>{conversionRate}%</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-white/5 rounded-full h-1 mt-2">
                                  <div className="bg-[#22C55E] h-1 rounded-full" style={{ width: `${Math.min(parseFloat(conversionRate), 100)}%` }}></div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-6 mb-3">
                              <div className={`card ${cardClass} p-3 flex flex-col justify-between h-100`}>
                                <span className={`text-[10px] font-bold ${textSec} uppercase tracking-wider`}>Ticket Médio</span>
                                <div className="flex items-baseline space-x-1.5 mt-2">
                                  <span className={`text-xl font-bold ${textTitle}`}>R$ {(avgTicket / 1000).toFixed(0)}k</span>
                                </div>
                                <span className="text-[9px] text-[#22C55E] font-semibold mt-1">Negócios Ganhos</span>
                              </div>
                            </div>
                            <div className="col-lg-3 col-6 mb-3">
                              <div className={`card ${cardClass} p-3 flex flex-col justify-between h-100`}>
                                <span className={`text-[10px] font-bold ${textSec} uppercase tracking-wider`}>Receita CRM</span>
                                <div className="flex items-baseline space-x-1.5 mt-2">
                                  <span className={`text-xl font-bold ${textTitle}`}>R$ {(totalRevenue / 1000).toFixed(0)}k</span>
                                </div>
                                <span className="text-[9px] text-slate-400 mt-1">R$ {totalRevenue.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="col-lg-3 col-6 mb-3">
                              <div className={`card ${cardClass} p-3 flex flex-col justify-between h-100`}>
                                <span className={`text-[10px] font-bold ${textSec} uppercase tracking-wider`}>Eventos Fechados</span>
                                <div className="flex items-baseline space-x-1.5 mt-2">
                                  <span className={`text-xl font-bold ${textTitle}`}>{wonLeads.length}</span>
                                </div>
                                <span className="text-[9px] text-[#3B82F6] font-semibold mt-1">Convertidos em Clientes</span>
                              </div>
                            </div>
                          </div>

                          {/* Charts / Funnel and Reminders */}
                          <div className="row">
                            <div className="col-lg-7 mb-3">
                              <div className={`card ${cardClass} p-4 h-100`}>
                                <h3 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-3`}>Funil de Vendas Comercial</h3>
                                <div className="space-y-3">
                                  {['prospect', 'qualified', 'negotiation', 'won'].map(stage => {
                                    const stageLabels = { prospect: 'Prospecção', qualified: 'Qualificado', negotiation: 'Negociação', won: 'Fechado/Ganho' };
                                    const count = leads.filter(l => l.stage === stage).length;
                                    const total = leads.length || 1;
                                    const percentage = ((count / total) * 100).toFixed(0);
                                    const barColor = stage === 'won' ? 'bg-[#22C55E]' : stage === 'negotiation' ? 'bg-[#F59E0B]' : stage === 'qualified' ? 'bg-[#3B82F6]' : 'bg-[#6B7280]';
                                    
                                    return (
                                      <div key={stage} className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                          <span className={`${textBody} font-medium`}>{stageLabels[stage]}</span>
                                          <span className={`${textSec} font-mono font-semibold`}>{count} ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-slate-200 dark:bg-white/5 rounded-full h-2">
                                          <div className={`${barColor} h-2 rounded-full transition-all duration-500`} style={{ width: `${Math.max(count/total*100, 4)}%` }}></div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                            
                            <div className="col-lg-5 mb-3">
                              <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                                <div>
                                  <h3 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-3`}>Agenda Próximos Compromissos</h3>
                                  <div className="space-y-2">
                                    {appointments.slice(0, 3).map(apt => (
                                      <div key={apt.id} className="flex items-start space-x-2 p-2 rounded bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                        <Clock className="w-3.5 h-3.5 text-[#3B82F6] shrink-0 mt-0.5" />
                                        <div>
                                          <p className={`text-xs font-bold ${textTitle} mb-0`}>{apt.title}</p>
                                          <p className="text-[9px] text-slate-400 mb-0 font-semibold">{apt.date} às {apt.time} • {apt.type}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <button 
                                  onClick={() => handleSubTabChange('agenda')} 
                                  className="text-xs font-bold text-[#3B82F6] hover:underline mt-4 text-left border-0 bg-transparent cursor-pointer p-0"
                                >
                                  Ver agenda completa &rarr;
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: PIPELINE ================= */}
                    {crmSubTab === 'pipeline' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-0`}>Funil Kanban Comercial (Trello Style)</h3>
                          <button 
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-2.5 py-1 text-[10px] rounded border-0 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>{showAddForm ? 'Cancelar' : 'Adicionar Lead'}</span>
                          </button>
                        </div>

                        {showAddForm && (
                          <div className={`card ${cardClass} p-3 animate-fadeIn mb-3`}>
                            <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Novo Lead Comercial</h4>
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              const data = new FormData(e.target);
                              const name = data.get('name');
                              const company = data.get('company');
                              const value = parseFloat(data.get('value'));
                              const tag = data.get('tag') || 'Novo';
                              if (!name || !company || isNaN(value)) return;
                              
                              const added = {
                                id: `lead-${Date.now()}`,
                                name,
                                company,
                                value,
                                stage: 'prospect',
                                date: 'Hoje',
                                tag
                              };
                              setLeads(prev => [...prev, added]);
                              setShowAddForm(false);
                              triggerToast("Sucesso", "Lead adicionado ao Funil.");
                            }} className="row g-2">
                              <div className="col-md-3">
                                <input type="text" name="name" required placeholder="Nome do Lead" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                              </div>
                              <div className="col-md-3">
                                <input type="text" name="company" required placeholder="Empresa / Produtora" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                              </div>
                              <div className="col-md-3">
                                <input type="number" name="value" required placeholder="Valor Estimado (R$)" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                              </div>
                              <div className="col-md-2">
                                <select name="tag" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`}>
                                  <option value="VIP">VIP</option>
                                  <option value="Quente">Quente</option>
                                  <option value="Novo">Novo</option>
                                  <option value="Corporate">Corporate</option>
                                </select>
                              </div>
                              <div className="col-md-1">
                                <button type="submit" className="btn btn-success btn-sm w-full bg-[#22C55E] text-white p-1 rounded border-0 text-xs font-semibold cursor-pointer">Salvar</button>
                              </div>
                            </form>
                          </div>
                        )}

                        <div className="row g-2 overflow-x-auto flex-nowrap pb-3">
                          {['prospect', 'qualified', 'proposal', 'negotiation', 'won'].map(stage => {
                            const stageLabels = { 
                              prospect: '📌 Lead', 
                              qualified: '📞 Contato', 
                              proposal: '📄 Proposta', 
                              negotiation: '🤝 Negociação', 
                              won: '🏆 Contrato' 
                            };
                            const stageColors = {
                              prospect: 'border-t-2 border-t-slate-400 bg-slate-100/50 dark:bg-[#1E293B]/20',
                              qualified: 'border-t-2 border-t-blue-400 bg-blue-100/10 dark:bg-blue-900/5',
                              proposal: 'border-t-2 border-t-purple-400 bg-purple-100/10 dark:bg-purple-900/5',
                              negotiation: 'border-t-2 border-t-amber-400 bg-amber-100/10 dark:bg-amber-900/5',
                              won: 'border-t-2 border-t-emerald-400 bg-emerald-100/10 dark:bg-emerald-900/5'
                            };
                            const stageLeads = leads.filter(l => l.stage === stage);
                            return (
                              <div key={stage} className="col-lg-[20%] col-md-4 min-w-[240px]">
                                <div className={`card ${cardClass} ${stageColors[stage]} p-3 flex flex-col space-y-3 min-h-[420px] transition-all border-0`}>
                                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                                    <span className={`text-[10px] font-bold ${textTitle} uppercase tracking-wider`}>{stageLabels[stage]}</span>
                                    <span className="badge bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded-full text-[9px] font-mono font-black">
                                      {stageLeads.length}
                                    </span>
                                  </div>
                                  <div className="space-y-2 flex-1 overflow-y-auto max-h-[350px]">
                                    {stageLeads.map(lead => (
                                      <div key={lead.id} className={`card ${theme === 'dark' ? 'bg-[#0F172A]' : 'bg-white'} border ${borderCol} p-3 rounded-lg shadow-sm space-y-2 hover:-translate-y-0.5 transition-transform duration-200 group border-0`}>
                                        <div className="flex justify-between items-start">
                                          <span className="badge bg-[#2563EB]/10 text-[#2563EB] font-bold px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider">{lead.tag}</span>
                                          <span className="text-[9px] text-slate-400 font-mono">Simulando Drag</span>
                                        </div>
                                        <div>
                                          <h4 className={`text-xs font-bold ${textTitle} mb-0.5`}>{lead.name}</h4>
                                          <p className={`text-[10px] ${textSec} mb-0`}>{lead.company}</p>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-white/5">
                                          <span className={`text-xs font-mono font-bold text-slate-800 dark:text-white`}>R$ {lead.value.toLocaleString('pt-BR')}</span>
                                          <div className="flex items-center space-x-1">
                                            {stage !== 'prospect' && (
                                              <button 
                                                onClick={() => moveLeadStage(lead.id, lead.stage, 'backward')}
                                                className="p-1 bg-slate-100 dark:bg-white/5 hover:bg-[#EF4444]/10 text-[#EF4444] rounded border-0 cursor-pointer flex items-center justify-center transition-colors"
                                                title="Recuar estágio"
                                              >
                                                <ChevronLeft className="w-3.5 h-3.5" />
                                              </button>
                                            )}
                                            {stage !== 'won' && (
                                              <button 
                                                onClick={() => moveLeadStage(lead.id, lead.stage, 'forward')}
                                                className="p-1 bg-slate-100 dark:bg-white/5 hover:bg-[#2563EB]/10 text-[#2563EB] rounded border-0 cursor-pointer flex items-center justify-center transition-colors"
                                                title="Avançar estágio"
                                              >
                                                <ChevronRight className="w-3.5 h-3.5" />
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                    {stageLeads.length === 0 && (
                                      <div className="flex flex-col items-center justify-center h-28 border border-dashed border-slate-300 dark:border-white/10 rounded-lg text-slate-400 text-[10px]">
                                        <span>Nenhum lead nesta etapa</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* ================= SUB-TAB: LEADS ================= */}
                    {crmSubTab === 'leads' && (() => {
                      const filteredLeads = leads.filter(l => 
                        l.name.toLowerCase().includes(crmSearch.toLowerCase()) || 
                        l.company.toLowerCase().includes(crmSearch.toLowerCase())
                      );

                      return (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="relative flex-1 w-full max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input 
                                type="text" 
                                placeholder="Filtrar Leads..." 
                                value={crmSearch} 
                                onChange={(e) => setCrmSearch(e.target.value)} 
                                className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} 
                              />
                            </div>
                            <button 
                              onClick={() => setShowAddForm(!showAddForm)}
                              className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-2.5 py-1.5 text-[10px] rounded border-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showAddForm ? 'Cancelar' : 'Adicionar Lead'}</span>
                            </button>
                          </div>

                          {showAddForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Novo Lead</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const name = data.get('name');
                                const company = data.get('company');
                                const value = parseFloat(data.get('value'));
                                const stage = data.get('stage');
                                const tag = data.get('tag');

                                if (!name || !company || isNaN(value)) return;
                                setLeads(prev => [...prev, { id: `lead-${Date.now()}`, name, company, value, stage, tag, date: 'Hoje' }]);
                                setShowAddForm(false);
                                triggerToast("Sucesso", "Lead adicionado com sucesso.");
                              }} className="row g-2">
                                <div className="col-md-3">
                                  <input type="text" name="name" required placeholder="Nome do Lead" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="text" name="company" required placeholder="Empresa" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="number" name="value" required placeholder="Valor R$" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <select name="stage" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`}>
                                    <option value="prospect">Prospecção</option>
                                    <option value="qualified">Qualificado</option>
                                    <option value="negotiation">Negociação</option>
                                    <option value="won">Fechado</option>
                                  </select>
                                </div>
                                <div className="col-md-2">
                                  <select name="tag" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`}>
                                    <option value="VIP">VIP</option>
                                    <option value="Quente">Quente</option>
                                    <option value="Novo">Novo</option>
                                  </select>
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 text-xs font-semibold">Salvar Lead</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Nome</th>
                                    <th className="p-3 border-0">Empresa</th>
                                    <th className="p-3 border-0">Valor Contrato</th>
                                    <th className="p-3 border-0">Estágio</th>
                                    <th className="p-3 border-0">Tag</th>
                                    <th className="p-3 border-0">Criado</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredLeads.map(lead => (
                                    <tr key={lead.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{lead.name}</td>
                                      <td className="p-3 border-0">{lead.company}</td>
                                      <td className="p-3 border-0 font-mono font-semibold text-slate-600 dark:text-slate-300">R$ {lead.value.toLocaleString()}</td>
                                      <td className="p-3 border-0">
                                        <span className={`badge text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                          lead.stage === 'won' ? 'bg-[#22C55E]/15 text-[#22C55E]' :
                                          lead.stage === 'negotiation' ? 'bg-[#F59E0B]/15 text-[#F59E0B]' :
                                          lead.stage === 'qualified' ? 'bg-[#3B82F6]/15 text-[#3B82F6]' : 'bg-slate-400/15 text-slate-400'
                                        }`}>
                                          {lead.stage === 'won' ? 'Fechado/Ganho' : lead.stage === 'negotiation' ? 'Negociação' : lead.stage === 'qualified' ? 'Qualificado' : 'Prospecção'}
                                        </span>
                                      </td>
                                      <td className="p-3 border-0">
                                        <span className="badge bg-slate-200 dark:bg-white/5 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">{lead.tag}</span>
                                      </td>
                                      <td className="p-3 border-0 text-slate-400 font-mono text-[10px]">{lead.date}</td>
                                      <td className="p-3 border-0 text-center">
                                        <div className="flex justify-center items-center space-x-1.5">
                                          {lead.stage !== 'won' && (
                                            <button 
                                              onClick={() => moveLeadStage(lead.id, lead.stage)}
                                              className="p-1 text-[#3B82F6] hover:bg-[#3B82F6]/10 rounded border-0 bg-transparent cursor-pointer"
                                              title="Avançar estágio"
                                            >
                                              <ChevronRight className="w-3.5 h-3.5" />
                                            </button>
                                          )}
                                          <button 
                                            onClick={() => {
                                              setLeads(prev => prev.filter(l => l.id !== lead.id));
                                              triggerToast("Deletado", "Lead excluído com sucesso.");
                                            }}
                                            className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                  {filteredLeads.length === 0 && (
                                    <tr>
                                      <td colSpan="7" className="p-4 text-center text-slate-400">Nenhum lead encontrado.</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: CLIENTES ================= */}
                    {crmSubTab === 'clientes' && (() => {
                      const filteredClients = clients.filter(c => 
                        c.name.toLowerCase().includes(crmSearch.toLowerCase()) || 
                        c.company.toLowerCase().includes(crmSearch.toLowerCase())
                      );

                      return (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="relative flex-1 w-full max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input 
                                type="text" 
                                placeholder="Filtrar Clientes..." 
                                value={crmSearch} 
                                onChange={(e) => setCrmSearch(e.target.value)} 
                                className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} 
                              />
                            </div>
                            <button 
                              onClick={() => setShowAddForm(!showAddForm)}
                              className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-2.5 py-1.5 text-[10px] rounded border-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showAddForm ? 'Cancelar' : 'Adicionar Cliente'}</span>
                            </button>
                          </div>

                          {showAddForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Cadastrar Novo Cliente</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const name = data.get('name');
                                const company = data.get('company');
                                const email = data.get('email');
                                const phone = data.get('phone');
                                const status = data.get('status');

                                if (!name || !company || !email) return;
                                setClients(prev => [{ id: `c-${Date.now()}`, name, company, email, phone: phone || '(41) 99999-0000', spend: 0, status }, ...prev]);
                                setShowAddForm(false);
                                triggerToast("Sucesso", "Novo cliente cadastrado.");
                              }} className="row g-2">
                                <div className="col-md-3">
                                  <input type="text" name="name" required placeholder="Nome do Cliente" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="text" name="company" required placeholder="Empresa" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="email" name="email" required placeholder="E-mail" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="text" name="phone" placeholder="Telefone" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <select name="status" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`}>
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inativo">Inativo</option>
                                    <option value="Em Negociação">Em Negociação</option>
                                  </select>
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 text-xs font-semibold">Salvar Cliente</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Nome</th>
                                    <th className="p-3 border-0">Empresa</th>
                                    <th className="p-3 border-0">E-mail</th>
                                    <th className="p-3 border-0">Telefone</th>
                                    <th className="p-3 border-0">Volume Compras (R$)</th>
                                    <th className="p-3 border-0">Status</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredClients.map(client => (
                                    <tr key={client.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{client.name}</td>
                                      <td className="p-3 border-0">{client.company}</td>
                                      <td className="p-3 border-0 text-slate-500 font-mono">{client.email}</td>
                                      <td className="p-3 border-0 font-mono">{client.phone}</td>
                                      <td className="p-3 border-0 font-mono font-semibold text-[#22C55E]">R$ {client.spend.toLocaleString()}</td>
                                      <td className="p-3 border-0">
                                        <span className={`badge text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                          client.status === 'Ativo' ? 'bg-[#22C55E]/15 text-[#22C55E]' :
                                          client.status === 'Em Negociação' ? 'bg-[#F59E0B]/15 text-[#F59E0B]' : 'bg-red-500/15 text-red-500'
                                        }`}>
                                          {client.status}
                                        </span>
                                      </td>
                                      <td className="p-3 border-0 text-center">
                                        <button 
                                          onClick={() => {
                                            setClients(prev => prev.filter(c => c.id !== client.id));
                                            triggerToast("Deletado", "Cliente removido com sucesso.");
                                          }}
                                          className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: EMPRESAS ================= */}
                    {crmSubTab === 'empresas' && (() => {
                      const filteredCompanies = companies.filter(c => 
                        c.name.toLowerCase().includes(crmSearch.toLowerCase()) || 
                        c.city.toLowerCase().includes(crmSearch.toLowerCase())
                      );

                      return (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="relative flex-1 w-full max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input 
                                type="text" 
                                placeholder="Filtrar Empresas..." 
                                value={crmSearch} 
                                onChange={(e) => setCrmSearch(e.target.value)} 
                                className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} 
                              />
                            </div>
                            <button 
                              onClick={() => setShowAddForm(!showAddForm)}
                              className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-2.5 py-1.5 text-[10px] rounded border-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showAddForm ? 'Cancelar' : 'Adicionar Empresa'}</span>
                            </button>
                          </div>

                          {showAddForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Nova Empresa Cadastrada</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const name = data.get('name');
                                const cnpj = data.get('cnpj');
                                const industry = data.get('industry');
                                const employees = parseInt(data.get('employees')) || 0;
                                const city = data.get('city');
                                const phone = data.get('phone');

                                if (!name || !cnpj) return;
                                setCompanies(prev => [...prev, { id: `emp-${Date.now()}`, name, cnpj, industry, employees, city, phone }]);
                                setShowAddForm(false);
                                triggerToast("Sucesso", "Empresa adicionada.");
                              }} className="row g-2">
                                <div className="col-md-3">
                                  <input type="text" name="name" required placeholder="Razão Social" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="text" name="cnpj" required placeholder="CNPJ" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="text" name="industry" placeholder="Setor (ex: Entretenimento)" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="number" name="employees" placeholder="Funcionários" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="text" name="city" placeholder="Cidade" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 text-xs font-semibold">Salvar Empresa</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Nome da Empresa</th>
                                    <th className="p-3 border-0">CNPJ</th>
                                    <th className="p-3 border-0">Setor</th>
                                    <th className="p-3 border-0 font-right">Funcionários</th>
                                    <th className="p-3 border-0">Cidade</th>
                                    <th className="p-3 border-0">Telefone</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredCompanies.map(emp => (
                                    <tr key={emp.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{emp.name}</td>
                                      <td className="p-3 border-0 font-mono text-[10px]">{emp.cnpj}</td>
                                      <td className="p-3 border-0">{emp.industry}</td>
                                      <td className="p-3 border-0 font-mono">{emp.employees}</td>
                                      <td className="p-3 border-0">{emp.city}</td>
                                      <td className="p-3 border-0 font-mono">{emp.phone}</td>
                                      <td className="p-3 border-0 text-center">
                                        <button 
                                          onClick={() => {
                                            setCompanies(prev => prev.filter(c => c.id !== emp.id));
                                            triggerToast("Deletada", "Empresa excluída com sucesso.");
                                          }}
                                          className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: AGENDA ================= */}
                    {crmSubTab === 'agenda' && (() => {
                      const filteredAppointments = appointments.filter(a => 
                        a.title.toLowerCase().includes(crmSearch.toLowerCase()) || 
                        a.host.toLowerCase().includes(crmSearch.toLowerCase())
                      );

                      return (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="relative flex-1 w-full max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input 
                                type="text" 
                                placeholder="Filtrar Compromissos..." 
                                value={crmSearch} 
                                onChange={(e) => setCrmSearch(e.target.value)} 
                                className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} 
                              />
                            </div>
                            <button 
                              onClick={() => setShowAddForm(!showAddForm)}
                              className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-2.5 py-1.5 text-[10px] rounded border-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showAddForm ? 'Cancelar' : 'Agendar Reunião'}</span>
                            </button>
                          </div>

                          {showAddForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Agendar Reunião ou Compromisso</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const title = data.get('title');
                                const date = data.get('date');
                                const time = data.get('time');
                                const host = data.get('host');
                                const client = data.get('client');
                                const type = data.get('type');

                                if (!title || !date || !time) return;
                                setAppointments(prev => [{ id: `apt-${Date.now()}`, title, date, time, host: host || 'Roberto Carlos', client, type, status: 'Pendente' }, ...prev]);
                                setShowAddForm(false);
                                triggerToast("Sucesso", "Compromisso agendado na fila.");
                              }} className="row g-2">
                                <div className="col-md-3">
                                  <input type="text" name="title" required placeholder="Título do Compromisso" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="date" name="date" required className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="time" name="time" required className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="text" name="client" placeholder="Lead / Cliente" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <select name="type" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`}>
                                    <option value="Reunião Presencial">Reunião Presencial</option>
                                    <option value="Videoconferência">Videoconferência</option>
                                    <option value="Call Telefônica">Call Telefônica</option>
                                    <option value="Visita Local">Visita Local</option>
                                  </select>
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 text-xs font-semibold">Salvar Agenda</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Compromisso</th>
                                    <th className="p-3 border-0">Data</th>
                                    <th className="p-3 border-0 font-right">Horário</th>
                                    <th className="p-3 border-0">Vendedor Responsável</th>
                                    <th className="p-3 border-0">Cliente / Lead</th>
                                    <th className="p-3 border-0">Canal / Tipo</th>
                                    <th className="p-3 border-0">Status</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredAppointments.map(apt => (
                                    <tr key={apt.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{apt.title}</td>
                                      <td className="p-3 border-0 font-mono">{apt.date}</td>
                                      <td className="p-3 border-0 font-mono font-bold text-[#3B82F6]">{apt.time}</td>
                                      <td className="p-3 border-0">{apt.host}</td>
                                      <td className="p-3 border-0">{apt.client}</td>
                                      <td className="p-3 border-0 text-slate-400">{apt.type}</td>
                                      <td className="p-3 border-0">
                                        <span className={`badge text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                          apt.status === 'Confirmado' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-[#F59E0B]/15 text-[#F59E0B]'
                                        }`}>
                                          {apt.status}
                                        </span>
                                      </td>
                                      <td className="p-3 border-0 text-center">
                                        <div className="flex justify-center items-center space-x-1.5">
                                          {apt.status !== 'Confirmado' && (
                                            <button 
                                              onClick={() => {
                                                setAppointments(prev => prev.map(a => a.id === apt.id ? { ...a, status: 'Confirmado' } : a));
                                                triggerToast("Confirmado", "Compromisso confirmado.");
                                              }}
                                              className="p-1 text-success bg-transparent border-0 cursor-pointer"
                                              title="Confirmar"
                                            >
                                              <CheckCircle className="w-3.5 h-3.5 text-[#22C55E]" />
                                            </button>
                                          )}
                                          <button 
                                            onClick={() => {
                                              setAppointments(prev => prev.filter(a => a.id !== apt.id));
                                              triggerToast("Deletado", "Agenda limpa.");
                                            }}
                                            className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: PROPOSTAS ================= */}
                    {crmSubTab === 'propostas' && (() => {
                      const filteredProposals = proposals.filter(p => 
                        p.title.toLowerCase().includes(crmSearch.toLowerCase()) || 
                        p.client.toLowerCase().includes(crmSearch.toLowerCase())
                      );

                      return (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="relative flex-1 w-full max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input 
                                type="text" 
                                placeholder="Filtrar Propostas..." 
                                value={crmSearch} 
                                onChange={(e) => setCrmSearch(e.target.value)} 
                                className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} 
                              />
                            </div>
                            <button 
                              onClick={() => setShowAddForm(!showAddForm)}
                              className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-2.5 py-1.5 text-[10px] rounded border-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showAddForm ? 'Cancelar' : 'Nova Proposta'}</span>
                            </button>
                          </div>

                          {showAddForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Gerar Proposta Comercial</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const title = data.get('title');
                                const client = data.get('client');
                                const value = parseFloat(data.get('value'));
                                const validUntil = data.get('validUntil');

                                if (!title || !client || isNaN(value)) return;
                                setProposals(prev => [{ id: `prop-${Date.now()}`, title, client, value, validUntil, status: 'Enviada', date: '2026-07-17' }, ...prev]);
                                setShowAddForm(false);
                                triggerToast("Sucesso", "Proposta enviada ao cliente.");
                              }} className="row g-2">
                                <div className="col-md-4">
                                  <input type="text" name="title" required placeholder="Título da Proposta" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="text" name="client" required placeholder="Empresa Cliente" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="number" name="value" required placeholder="Valor R$" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="date" name="validUntil" required className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 text-xs font-semibold">Salvar Proposta</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Descrição da Proposta</th>
                                    <th className="p-3 border-0">Cliente Relacionado</th>
                                    <th className="p-3 border-0">Faturamento Previsto</th>
                                    <th className="p-3 border-0">Data Emissão</th>
                                    <th className="p-3 border-0 font-right">Validade</th>
                                    <th className="p-3 border-0">Status</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredProposals.map(prop => (
                                    <tr key={prop.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{prop.title}</td>
                                      <td className="p-3 border-0">{prop.client}</td>
                                      <td className="p-3 border-0 font-mono font-bold text-slate-700 dark:text-slate-300">R$ {prop.value.toLocaleString()}</td>
                                      <td className="p-3 border-0 font-mono">{prop.date}</td>
                                      <td className="p-3 border-0 font-mono text-red-400">{prop.validUntil}</td>
                                      <td className="p-3 border-0">
                                        <span className={`badge text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                          prop.status === 'Aceita' ? 'bg-[#22C55E]/15 text-[#22C55E]' :
                                          prop.status === 'Enviada' ? 'bg-[#3B82F6]/15 text-[#3B82F6]' : 'bg-[#F59E0B]/15 text-[#F59E0B]'
                                        }`}>
                                          {prop.status}
                                        </span>
                                      </td>
                                      <td className="p-3 border-0 text-center">
                                        <div className="flex justify-center items-center space-x-1.5">
                                          {prop.status === 'Enviada' && (
                                            <button 
                                              onClick={() => {
                                                setProposals(prev => prev.map(p => p.id === prop.id ? { ...p, status: 'Aceita' } : p));
                                                // Create active contract as well
                                                setContracts(prev => [{
                                                  id: `con-${Date.now()}`,
                                                  title: `Contrato de Locação: ${prop.title}`,
                                                  value: prop.value,
                                                  client: prop.client,
                                                  startDate: '2026-07-17',
                                                  endDate: '2026-12-31',
                                                  status: 'Ativo'
                                                }, ...prev]);
                                                triggerToast("Ganho!", "Proposta aceita! Um contrato correspondente foi gerado.");
                                              }}
                                              className="p-1 bg-[#22C55E]/10 hover:bg-[#22C55E] hover:text-white rounded text-[#22C55E] border-0 transition-all cursor-pointer text-[10px] font-bold"
                                            >
                                              Aceitar
                                            </button>
                                          )}
                                          <button 
                                            onClick={() => {
                                              setProposals(prev => prev.filter(p => p.id !== prop.id));
                                              triggerToast("Deletado", "Proposta excluída.");
                                            }}
                                            className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: CONTRATOS ================= */}
                    {crmSubTab === 'contratos' && (() => {
                      const filteredContracts = contracts.filter(c => 
                        c.title.toLowerCase().includes(crmSearch.toLowerCase()) || 
                        c.client.toLowerCase().includes(crmSearch.toLowerCase())
                      );

                      return (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="relative flex-1 w-full max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input 
                                type="text" 
                                placeholder="Filtrar Contratos..." 
                                value={crmSearch} 
                                onChange={(e) => setCrmSearch(e.target.value)} 
                                className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} 
                              />
                            </div>
                            <button 
                              onClick={() => setShowAddForm(!showAddForm)}
                              className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-2.5 py-1.5 text-[10px] rounded border-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showAddForm ? 'Cancelar' : 'Novo Contrato'}</span>
                            </button>
                          </div>

                          {showAddForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Lançar Contrato Firmado</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const title = data.get('title');
                                const client = data.get('client');
                                const value = parseFloat(data.get('value'));
                                const startDate = data.get('startDate');
                                const endDate = data.get('endDate');

                                if (!title || !client || isNaN(value)) return;
                                setContracts(prev => [{ id: `con-${Date.now()}`, title, client, value, startDate, endDate, status: 'Ativo' }, ...prev]);
                                setShowAddForm(false);
                                triggerToast("Sucesso", "Contrato gerado e ativo.");
                              }} className="row g-2">
                                <div className="col-md-3">
                                  <input type="text" name="title" required placeholder="Título do Contrato" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="text" name="client" required placeholder="Contratante" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="number" name="value" required placeholder="Valor Anual (R$)" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="date" name="startDate" required className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="date" name="endDate" required className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 text-xs font-semibold">Salvar Contrato</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Descrição do Contrato</th>
                                    <th className="p-3 border-0">Contratante</th>
                                    <th className="p-3 border-0">Faturamento Anual</th>
                                    <th className="p-3 border-0">Vigência Inicial</th>
                                    <th className="p-3 border-0 font-right">Fim de Vigência</th>
                                    <th className="p-3 border-0">Status</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredContracts.map(con => (
                                    <tr key={con.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{con.title}</td>
                                      <td className="p-3 border-0">{con.client}</td>
                                      <td className="p-3 border-0 font-mono font-bold text-[#22C55E]">R$ {con.value.toLocaleString()}</td>
                                      <td className="p-3 border-0 font-mono">{con.startDate}</td>
                                      <td className="p-3 border-0 font-mono">{con.endDate}</td>
                                      <td className="p-3 border-0">
                                        <span className={`badge text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                          con.status === 'Ativo' ? 'bg-[#22C55E]/15 text-[#22C55E]' :
                                          con.status === 'Finalizado' ? 'bg-slate-400/15 text-slate-400' : 'bg-[#3B82F6]/15 text-[#3B82F6]'
                                        }`}>
                                          {con.status}
                                        </span>
                                      </td>
                                      <td className="p-3 border-0 text-center">
                                        <button 
                                          onClick={() => {
                                            setContracts(prev => prev.filter(c => c.id !== con.id));
                                            triggerToast("Cancelado", "Contrato deletado do sistema.");
                                          }}
                                          className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: METAS ================= */}
                    {crmSubTab === 'metas' && (() => {
                      return (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-0`}>Gestão de Metas de Vendedores</h3>
                            <button 
                              onClick={() => setShowAddForm(!showAddForm)}
                              className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-2.5 py-1.5 text-[10px] rounded border-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showAddForm ? 'Cancelar' : 'Adicionar Meta'}</span>
                            </button>
                          </div>

                          {showAddForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Adicionar Meta para Vendedor</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const seller = data.get('seller');
                                const target = parseFloat(data.get('target'));
                                const achieved = parseFloat(data.get('achieved')) || 0;
                                const period = data.get('period');

                                if (!seller || isNaN(target)) return;
                                setGoals(prev => [{ id: `goal-${Date.now()}`, seller, target, achieved, period }, ...prev]);
                                setShowAddForm(false);
                                triggerToast("Sucesso", "Nova meta adicionada.");
                              }} className="row g-2">
                                <div className="col-md-4">
                                  <input type="text" name="seller" required placeholder="Nome do Vendedor" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="number" name="target" required placeholder="Meta (R$)" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="number" name="achieved" placeholder="Atingido Inicial (R$)" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="text" name="period" required placeholder="Período" defaultValue="Julho 2026" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 text-xs font-semibold">Salvar Meta</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className="space-y-3">
                            {goals.map(goal => {
                              const pct = Math.round((goal.achieved / goal.target) * 100);
                              let barColor = 'bg-red-500';
                              if (pct >= 100) barColor = 'bg-[#22C55E]';
                              else if (pct >= 50) barColor = 'bg-[#F59E0B]';

                              return (
                                <div key={goal.id} className={`card ${cardClass} p-3 space-y-2`}>
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h4 className={`text-xs font-bold ${textTitle} mb-0`}>{goal.seller}</h4>
                                      <span className={`text-[9px] ${textSec} font-semibold font-mono`}>{goal.period}</span>
                                    </div>
                                    <div className="text-right">
                                      <span className={`text-xs font-mono font-bold ${textTitle}`}>{pct}% Atingido</span>
                                      <p className="text-[9px] text-slate-400 mb-0 font-mono">Meta: R$ {goal.target.toLocaleString()}</p>
                                    </div>
                                  </div>
                                  <div className="w-full bg-slate-200 dark:bg-white/5 rounded-full h-2">
                                    <div className={`${barColor} h-2 rounded-full`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
                                  </div>
                                  <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                                    <span>Vendido: R$ {goal.achieved.toLocaleString()}</span>
                                    <button 
                                      onClick={() => {
                                        const extra = prompt("Adicionar valor de venda para este vendedor (R$):", "5000");
                                        if (extra && !isNaN(parseFloat(extra))) {
                                          setGoals(prev => prev.map(g => g.id === goal.id ? { ...g, achieved: g.achieved + parseFloat(extra) } : g));
                                          triggerToast("Atualizado", "Faturamento do vendedor somado.");
                                        }
                                      }}
                                      className="text-blue-500 border-0 bg-transparent p-0 cursor-pointer font-bold"
                                    >
                                      + Lançar Venda
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: COMISSÕES ================= */}
                    {crmSubTab === 'comissoes' && (() => {
                      const totalPaid = commissions.filter(c => c.paymentStatus === 'Pago').reduce((acc, c) => acc + c.commission, 0);
                      const totalPending = commissions.filter(c => c.paymentStatus === 'Pendente').reduce((acc, c) => acc + c.commission, 0);

                      return (
                        <div className="space-y-4">
                          {/* Metrics summary */}
                          <div className="row">
                            <div className="col-6 mb-3">
                              <div className={`card ${cardClass} p-3 text-center`}>
                                <span className={`text-[10px] font-bold ${textSec} uppercase tracking-wider`}>Comissões Pagas</span>
                                <h3 className="text-lg font-bold text-[#22C55E] mt-1 font-mono">R$ {totalPaid.toLocaleString()}</h3>
                              </div>
                            </div>
                            <div className="col-6 mb-3">
                              <div className={`card ${cardClass} p-3 text-center`}>
                                <span className={`text-[10px] font-bold ${textSec} uppercase tracking-wider`}>Comissões Pendentes</span>
                                <h3 className="text-lg font-bold text-[#F59E0B] mt-1 font-mono">R$ {totalPending.toLocaleString()}</h3>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <h3 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-0`}>Histórico de Comissões</h3>
                            <button 
                              onClick={() => setShowAddForm(!showAddForm)}
                              className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-2.5 py-1.5 text-[10px] rounded border-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showAddForm ? 'Cancelar' : 'Lançar Comissão'}</span>
                            </button>
                          </div>

                          {showAddForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Registrar Comissão de Venda</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const seller = data.get('seller');
                                const dealValue = parseFloat(data.get('dealValue'));
                                const rate = parseFloat(data.get('rate'));

                                if (!seller || isNaN(dealValue) || isNaN(rate)) return;
                                const commission = Math.round(dealValue * (rate / 100));
                                setCommissions(prev => [{ id: `com-${Date.now()}`, seller, dealValue, rate, commission, paymentStatus: 'Pendente', date: '2026-07-17' }, ...prev]);
                                setShowAddForm(false);
                                triggerToast("Sucesso", "Comissão cadastrada.");
                              }} className="row g-2">
                                <div className="col-md-4">
                                  <input type="text" name="seller" required placeholder="Vendedor" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-4">
                                  <input type="number" name="dealValue" required placeholder="Valor da Venda (R$)" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-4">
                                  <input type="number" name="rate" required placeholder="Porcentagem de comissão (ex: 5)" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 text-xs font-semibold">Salvar Comissão</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Vendedor</th>
                                    <th className="p-3 border-0">Valor do Fechamento</th>
                                    <th className="p-3 border-0">Comissão (%)</th>
                                    <th className="p-3 border-0">Valor Comissão</th>
                                    <th className="p-3 border-0">Emissão</th>
                                    <th className="p-3 border-0">Faturamento Status</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {commissions.map(com => (
                                    <tr key={com.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{com.seller}</td>
                                      <td className="p-3 border-0 font-mono">R$ {com.dealValue.toLocaleString()}</td>
                                      <td className="p-3 border-0 font-mono">{com.rate}%</td>
                                      <td className="p-3 border-0 font-mono font-bold text-[#22C55E]">R$ {com.commission.toLocaleString()}</td>
                                      <td className="p-3 border-0 font-mono">{com.date}</td>
                                      <td className="p-3 border-0">
                                        <span className={`badge text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                          com.paymentStatus === 'Pago' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-[#F59E0B]/15 text-[#F59E0B]'
                                        }`}>
                                          {com.paymentStatus}
                                        </span>
                                      </td>
                                      <td className="p-3 border-0 text-center">
                                        <div className="flex justify-center items-center space-x-1.5">
                                          {com.paymentStatus === 'Pendente' && (
                                            <button 
                                              onClick={() => {
                                                setCommissions(prev => prev.map(c => c.id === com.id ? { ...c, paymentStatus: 'Pago' } : c));
                                                triggerToast("Comissão Paga", "Vendedor remunerado com sucesso.");
                                              }}
                                              className="p-1 text-xs font-bold text-success border-0 bg-transparent cursor-pointer"
                                            >
                                              Pagar
                                            </button>
                                          )}
                                          <button 
                                            onClick={() => {
                                              setCommissions(prev => prev.filter(c => c.id !== com.id));
                                              triggerToast("Deletada", "Comissão removida.");
                                            }}
                                            className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= EVENTOS SUB-TABS: PRODUTORES ================= */}
                    {crmSubTab === 'produtores' && (() => {
                      const filteredProducers = producers.filter(p => 
                        p.name.toLowerCase().includes(crmSearch.toLowerCase()) || 
                        p.specialty.toLowerCase().includes(crmSearch.toLowerCase())
                      );

                      return (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="relative flex-1 w-full max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input 
                                type="text" 
                                placeholder="Filtrar Produtores..." 
                                value={crmSearch} 
                                onChange={(e) => setCrmSearch(e.target.value)} 
                                className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} 
                              />
                            </div>
                            <button 
                              onClick={() => setShowAddForm(!showAddForm)}
                              className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#10B981] hover:bg-[#059669] text-white px-2.5 py-1.5 text-[10px] rounded border-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showAddForm ? 'Cancelar' : 'Adicionar Produtor'}</span>
                            </button>
                          </div>

                          {showAddForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Novo Produtor de Eventos</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const name = data.get('name');
                                const specialty = data.get('specialty');
                                const eventsCount = parseInt(data.get('eventsCount')) || 0;
                                const rating = parseFloat(data.get('rating')) || 5.0;
                                const contact = data.get('contact');

                                if (!name || !specialty) return;
                                setProducers(prev => [...prev, { id: `prod-${Date.now()}`, name, specialty, eventsCount, rating, contact }]);
                                setShowAddForm(false);
                                triggerToast("Sucesso", "Produtor cadastrado no CRM.");
                              }} className="row g-2">
                                <div className="col-md-3">
                                  <input type="text" name="name" required placeholder="Nome do Produtor / Empresa" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="text" name="specialty" required placeholder="Especialidade (ex: Shows Nacionais)" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="number" name="eventsCount" placeholder="Total de Eventos" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="number" step="0.1" max="5" name="rating" placeholder="Avaliação" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="text" name="contact" placeholder="Contato" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 text-xs font-semibold">Salvar Produtor</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Nome do Produtor</th>
                                    <th className="p-3 border-0">Especialidade Principal</th>
                                    <th className="p-3 border-0">Eventos Executados</th>
                                    <th className="p-3 border-0">Classificação</th>
                                    <th className="p-3 border-0">Contato Comercial</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredProducers.map(prod => (
                                    <tr key={prod.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{prod.name}</td>
                                      <td className="p-3 border-0">{prod.specialty}</td>
                                      <td className="p-3 border-0 font-mono font-bold text-[#3B82F6]">{prod.eventsCount} eventos</td>
                                      <td className="p-3 border-0 font-bold text-yellow-500">⭐ {prod.rating} / 5.0</td>
                                      <td className="p-3 border-0 font-mono text-[10px]">{prod.contact}</td>
                                      <td className="p-3 border-0 text-center">
                                        <button 
                                          onClick={() => {
                                            setProducers(prev => prev.filter(p => p.id !== prod.id));
                                            triggerToast("Deletado", "Produtor removido do CRM.");
                                          }}
                                          className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= EVENTOS SUB-TABS: ORGANIZADORES ================= */}
                    {crmSubTab === 'organizadores' && (() => {
                      const filteredOrganizers = organizers.filter(o => 
                        o.name.toLowerCase().includes(crmSearch.toLowerCase()) || 
                        o.region.toLowerCase().includes(crmSearch.toLowerCase())
                      );

                      return (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="relative flex-1 w-full max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input 
                                type="text" 
                                placeholder="Filtrar Organizadores..." 
                                value={crmSearch} 
                                onChange={(e) => setCrmSearch(e.target.value)} 
                                className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} 
                              />
                            </div>
                            <button 
                              onClick={() => setShowAddForm(!showAddForm)}
                              className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#10B981] hover:bg-[#059669] text-white px-2.5 py-1.5 text-[10px] rounded border-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showAddForm ? 'Cancelar' : 'Adicionar Organizador'}</span>
                            </button>
                          </div>

                          {showAddForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Novo Organizador de Feiras / Shows</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const name = data.get('name');
                                const region = data.get('region');
                                const contact = data.get('contact');
                                const activeEvents = parseInt(data.get('activeEvents')) || 0;

                                if (!name || !region) return;
                                setOrganizers(prev => [...prev, { id: `org-${Date.now()}`, name, region, contact, activeEvents }]);
                                setShowAddForm(false);
                                triggerToast("Sucesso", "Organizador adicionado.");
                              }} className="row g-2">
                                <div className="col-md-3">
                                  <input type="text" name="name" required placeholder="Nome do Organizador" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="text" name="region" required placeholder="Região de Atuação" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="text" name="contact" placeholder="E-mail / Telefone" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="number" name="activeEvents" placeholder="Eventos Ativos" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-1">
                                  <button type="submit" className="btn btn-success btn-sm w-full bg-[#22C55E] text-white p-1 rounded border-0 text-xs font-semibold">Salvar</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Organizador / Associação</th>
                                    <th className="p-3 border-0">Região Governamental</th>
                                    <th className="p-3 border-0 font-mono">Contato</th>
                                    <th className="p-3 border-0">Eventos Ativos do Semestre</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredOrganizers.map(org => (
                                    <tr key={org.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{org.name}</td>
                                      <td className="p-3 border-0">{org.region}</td>
                                      <td className="p-3 border-0 font-mono text-[10px]">{org.contact}</td>
                                      <td className="p-3 border-0 font-mono font-bold text-[#F59E0B]">{org.activeEvents} ativos</td>
                                      <td className="p-3 border-0 text-center">
                                        <button 
                                          onClick={() => {
                                            setOrganizers(prev => prev.filter(o => o.id !== org.id));
                                            triggerToast("Deletado", "Organizador removido.");
                                          }}
                                          className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= EVENTOS SUB-TABS: ARTISTAS ================= */}
                    {crmSubTab === 'artistas' && (() => {
                      const filteredArtists = artists.filter(a => 
                        a.name.toLowerCase().includes(crmSearch.toLowerCase()) || 
                        a.genre.toLowerCase().includes(crmSearch.toLowerCase())
                      );

                      return (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="relative flex-1 w-full max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input 
                                type="text" 
                                placeholder="Filtrar Artistas..." 
                                value={crmSearch} 
                                onChange={(e) => setCrmSearch(e.target.value)} 
                                className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} 
                              />
                            </div>
                            <button 
                              onClick={() => setShowAddForm(!showAddForm)}
                              className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#10B981] hover:bg-[#059669] text-white px-2.5 py-1.5 text-[10px] rounded border-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showAddForm ? 'Cancelar' : 'Adicionar Artista'}</span>
                            </button>
                          </div>

                          {showAddForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Novo Artista no Banco de Dados</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const name = data.get('name');
                                const genre = data.get('genre');
                                const cachet = parseFloat(data.get('cachet'));
                                const contact = data.get('contact');

                                if (!name || !genre || isNaN(cachet)) return;
                                setArtists(prev => [...prev, { id: `art-${Date.now()}`, name, genre, cachet, contact }]);
                                setShowAddForm(false);
                                triggerToast("Sucesso", "Artista registrado.");
                              }} className="row g-2">
                                <div className="col-md-3">
                                  <input type="text" name="name" required placeholder="Nome Artístico" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="text" name="genre" required placeholder="Estilo / Gênero" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="number" name="cachet" required placeholder="Cachê Médio (R$)" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="text" name="contact" placeholder="E-mail / Produtor" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 text-xs font-semibold">Salvar Artista</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Artista</th>
                                    <th className="p-3 border-0">Gênero Musical</th>
                                    <th className="p-3 border-0">Cachê por Apresentação</th>
                                    <th className="p-3 border-0">Contato / Assessoria</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredArtists.map(art => (
                                    <tr key={art.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{art.name}</td>
                                      <td className="p-3 border-0">{art.genre}</td>
                                      <td className="p-3 border-0 font-mono font-bold text-[#8B5CF6]">R$ {art.cachet.toLocaleString()}</td>
                                      <td className="p-3 border-0 font-mono text-[10px]">{art.contact}</td>
                                      <td className="p-3 border-0 text-center">
                                        <button 
                                          onClick={() => {
                                            setArtists(prev => prev.filter(a => a.id !== art.id));
                                            triggerToast("Deletado", "Artista removido.");
                                          }}
                                          className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= EVENTOS SUB-TABS: BANDAS ================= */}
                    {crmSubTab === 'bandas' && (() => {
                      const filteredBands = bands.filter(b => 
                        b.name.toLowerCase().includes(crmSearch.toLowerCase()) || 
                        b.genre.toLowerCase().includes(crmSearch.toLowerCase())
                      );

                      return (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="relative flex-1 w-full max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input 
                                type="text" 
                                placeholder="Filtrar Bandas..." 
                                value={crmSearch} 
                                onChange={(e) => setCrmSearch(e.target.value)} 
                                className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} 
                              />
                            </div>
                            <button 
                              onClick={() => setShowAddForm(!showAddForm)}
                              className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#10B981] hover:bg-[#059669] text-white px-2.5 py-1.5 text-[10px] rounded border-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showAddForm ? 'Cancelar' : 'Adicionar Banda'}</span>
                            </button>
                          </div>

                          {showAddForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Nova Banda Registrada</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const name = data.get('name');
                                const membersCount = parseInt(data.get('membersCount')) || 4;
                                const genre = data.get('genre');
                                const cachet = parseFloat(data.get('cachet'));
                                const contact = data.get('contact');

                                if (!name || !genre || isNaN(cachet)) return;
                                setBands(prev => [...prev, { id: `band-${Date.now()}`, name, membersCount, genre, cachet, contact }]);
                                setShowAddForm(false);
                                triggerToast("Sucesso", "Banda registrada.");
                              }} className="row g-2">
                                <div className="col-md-3">
                                  <input type="text" name="name" required placeholder="Nome da Banda" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="number" name="membersCount" required placeholder="Membros" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="text" name="genre" required placeholder="Gênero" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="number" name="cachet" required placeholder="Cachê por show (R$)" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="text" name="contact" placeholder="Contato" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 text-xs font-semibold">Salvar Banda</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Nome da Banda</th>
                                    <th className="p-3 border-0">Membros</th>
                                    <th className="p-3 border-0">Estilo Musical</th>
                                    <th className="p-3 border-0">Cachê Médio</th>
                                    <th className="p-3 border-0">Contato</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredBands.map(band => (
                                    <tr key={band.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{band.name}</td>
                                      <td className="p-3 border-0 font-mono">{band.membersCount} integrantes</td>
                                      <td className="p-3 border-0">{band.genre}</td>
                                      <td className="p-3 border-0 font-mono font-bold text-[#8B5CF6]">R$ {band.cachet.toLocaleString()}</td>
                                      <td className="p-3 border-0 font-mono text-[10px]">{band.contact}</td>
                                      <td className="p-3 border-0 text-center">
                                        <button 
                                          onClick={() => {
                                            setBands(prev => prev.filter(b => b.id !== band.id));
                                            triggerToast("Deletado", "Banda removida.");
                                          }}
                                          className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= EVENTOS SUB-TABS: PATROCINADORES ================= */}
                    {crmSubTab === 'patrocinadores' && (() => {
                      const filteredSponsors = sponsors.filter(s => 
                        s.company.toLowerCase().includes(crmSearch.toLowerCase()) || 
                        s.sponsoredEvent.toLowerCase().includes(crmSearch.toLowerCase())
                      );

                      return (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="relative flex-1 w-full max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input 
                                type="text" 
                                placeholder="Filtrar Patrocinadores..." 
                                value={crmSearch} 
                                onChange={(e) => setCrmSearch(e.target.value)} 
                                className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} 
                              />
                            </div>
                            <button 
                              onClick={() => setShowAddForm(!showAddForm)}
                              className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#10B981] hover:bg-[#059669] text-white px-2.5 py-1.5 text-[10px] rounded border-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showAddForm ? 'Cancelar' : 'Adicionar Patrocínio'}</span>
                            </button>
                          </div>

                          {showAddForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Novo Contrato de Patrocínio</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const company = data.get('company');
                                const sponsoredEvent = data.get('sponsoredEvent');
                                const value = parseFloat(data.get('value'));
                                const contact = data.get('contact');

                                if (!company || !sponsoredEvent || isNaN(value)) return;
                                setSponsors(prev => [...prev, { id: `spon-${Date.now()}`, company, sponsoredEvent, value, contact }]);
                                setShowAddForm(false);
                                triggerToast("Sucesso", "Patrocínio adicionado com sucesso.");
                              }} className="row g-2">
                                <div className="col-md-3">
                                  <input type="text" name="company" required placeholder="Marca Patrocinadora" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="text" name="sponsoredEvent" required placeholder="Evento Destinado" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="number" name="value" required placeholder="Cota Investimento (R$)" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="text" name="contact" placeholder="Gestor de Conta" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 text-xs font-semibold">Salvar Patrocínio</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Marca / Empresa</th>
                                    <th className="p-3 border-0">Evento Vinculado</th>
                                    <th className="p-3 border-0">Valor Patrocinado</th>
                                    <th className="p-3 border-0">Contato / Key-Account</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredSponsors.map(spon => (
                                    <tr key={spon.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{spon.company}</td>
                                      <td className="p-3 border-0 font-bold text-slate-600 dark:text-slate-300">{spon.sponsoredEvent}</td>
                                      <td className="p-3 border-0 font-mono font-bold text-[#22C55E]">R$ {spon.value.toLocaleString()}</td>
                                      <td className="p-3 border-0 font-mono text-[10px]">{spon.contact}</td>
                                      <td className="p-3 border-0 text-center">
                                        <button 
                                          onClick={() => {
                                            setSponsors(prev => prev.filter(s => s.id !== spon.id));
                                            triggerToast("Deletado", "Patrocinador excluído.");
                                          }}
                                          className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= EVENTOS SUB-TABS: FORNECEDORES ================= */}
                    {crmSubTab === 'fornecedores' && (() => {
                      const filteredSuppliers = suppliers.filter(s => 
                        s.name.toLowerCase().includes(crmSearch.toLowerCase()) || 
                        s.service.toLowerCase().includes(crmSearch.toLowerCase())
                      );

                      return (
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="relative flex-1 w-full max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input 
                                type="text" 
                                placeholder="Filtrar Fornecedores..." 
                                value={crmSearch} 
                                onChange={(e) => setCrmSearch(e.target.value)} 
                                className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} 
                              />
                            </div>
                            <button 
                              onClick={() => setShowAddForm(!showAddForm)}
                              className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#10B981] hover:bg-[#059669] text-white px-2.5 py-1.5 text-[10px] rounded border-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showAddForm ? 'Cancelar' : 'Adicionar Fornecedor'}</span>
                            </button>
                          </div>

                          {showAddForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Novo Fornecedor Credenciado</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const name = data.get('name');
                                const service = data.get('service');
                                const rating = parseFloat(data.get('rating')) || 5.0;
                                const contact = data.get('contact');

                                if (!name || !service) return;
                                setSuppliers(prev => [...prev, { id: `sup-${Date.now()}`, name, service, rating, contact }]);
                                setShowAddForm(false);
                                triggerToast("Sucesso", "Fornecedor cadastrado.");
                              }} className="row g-2">
                                <div className="col-md-3">
                                  <input type="text" name="name" required placeholder="Nome Comercial / Empresa" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-3">
                                  <select name="service" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`}>
                                    <option value="Som e Iluminação">Som e Iluminação</option>
                                    <option value="Segurança e Portaria">Segurança e Portaria</option>
                                    <option value="Alimentação e Bebidas">Alimentação e Bebidas</option>
                                    <option value="Estruturas e Palcos">Estruturas e Palcos</option>
                                    <option value="Limpeza e Apoio">Limpeza e Apoio</option>
                                  </select>
                                </div>
                                <div className="col-md-2">
                                  <input type="number" step="0.1" max="5" name="rating" placeholder="Avaliação" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-md-4">
                                  <input type="text" name="contact" placeholder="Contato (E-mail / Telefone)" className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 text-xs font-semibold">Salvar Fornecedor</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Nome do Fornecedor</th>
                                    <th className="p-3 border-0">Serviço Fornecido</th>
                                    <th className="p-3 border-0">Classificação</th>
                                    <th className="p-3 border-0 font-mono">Contato Comercial</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredSuppliers.map(sup => (
                                    <tr key={sup.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{sup.name}</td>
                                      <td className="p-3 border-0">{sup.service}</td>
                                      <td className="p-3 border-0 font-bold text-yellow-500">⭐ {sup.rating} / 5.0</td>
                                      <td className="p-3 border-0 font-mono text-[10px]">{sup.contact}</td>
                                      <td className="p-3 border-0 text-center">
                                        <button 
                                          onClick={() => {
                                            setSuppliers(prev => prev.filter(s => s.id !== sup.id));
                                            triggerToast("Deletado", "Fornecedor removido.");
                                          }}
                                          className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: API EXPLORER ================= */}
                    {crmSubTab === 'api_sandbox' && (() => {
                      const curlCommand = crmApiRoute === 'GET_DASHBOARD' ? 'curl -X GET "https://api.diskhub.com/v1/crm/dashboard"'
                                        : crmApiRoute === 'GET_LEADS' ? 'curl -X GET "https://api.diskhub.com/v1/crm/leads"'
                                        : crmApiRoute === 'POST_CLIENTES' ? `curl -X POST "https://api.diskhub.com/v1/crm/clientes" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "name": "${crmApiInputs.name || 'Nome do Cliente'}",\n    "company": "${crmApiInputs.company || 'Empresa'}",\n    "email": "${crmApiInputs.email || 'email@empresa.com'}",\n    "phone": "${crmApiInputs.phone || '(41) 99999-0000'}",\n    "status": "${crmApiInputs.status}"\n  }'`
                                        : 'curl -X GET "https://api.diskhub.com/v1/eventos/produtores"';

                      return (
                        <div className="space-y-4">
                          <div>
                            <h3 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-2`}>Sandbox de APIs (Simulador de Endpoints)</h3>
                            <p className={`text-xs ${textSec} mb-0`}>Use este console interativo para testar os endpoints expostos pelo microserviço de CRM. Requisições de alteração (POST) se refletirão instantaneamente nos dados das tabelas da interface.</p>
                          </div>

                          <div className="row">
                            {/* Request Form */}
                            <div className="col-lg-5 mb-3">
                              <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                                <form onSubmit={handleExecuteApi} className="space-y-3">
                                  <div>
                                    <label className={`text-[10px] font-bold ${textSec} uppercase block mb-1`}>Selecionar Rota (Endpoint)</label>
                                    <select
                                      value={crmApiRoute}
                                      onChange={(e) => {
                                        setCrmApiRoute(e.target.value);
                                        setCrmApiResponse(null);
                                      }}
                                      className={`form-control form-select ${inputClass} text-xs p-2.5 rounded focus:outline-none w-full`}
                                    >
                                      <option value="GET_DASHBOARD">GET /crm/dashboard</option>
                                      <option value="GET_LEADS">GET /crm/leads</option>
                                      <option value="POST_CLIENTES">POST /crm/clientes</option>
                                      <option value="GET_PRODUTORES">GET /eventos/produtores</option>
                                    </select>
                                  </div>

                                  <div className="p-2.5 rounded bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 space-y-1.5 text-xs">
                                    <div className="flex items-center space-x-2">
                                      <span className={`badge ${crmApiRoute.startsWith('GET') ? 'bg-[#22C55E]' : 'bg-[#F59E0B]'} text-white text-[8px] font-bold px-1.5 py-0.5 rounded`}>
                                        {crmApiRoute.startsWith('GET') ? 'GET' : 'POST'}
                                      </span>
                                      <span className={`font-mono text-[10px] ${textTitle}`}>
                                        {crmApiRoute === 'GET_DASHBOARD' ? '/crm/dashboard'
                                         : crmApiRoute === 'GET_LEADS' ? '/crm/leads'
                                         : crmApiRoute === 'POST_CLIENTES' ? '/crm/clientes'
                                         : '/eventos/produtores'}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mb-0">
                                      {crmApiRoute === 'GET_DASHBOARD' ? 'Retorna os KPIs consolidados e estatísticas gerais do pipeline comercial.'
                                       : crmApiRoute === 'GET_LEADS' ? 'Lista todos os leads atuais cadastrados no CRM de Vendas.'
                                       : crmApiRoute === 'POST_CLIENTES' ? 'Cria e persiste um novo Cliente ativo na base de dados.'
                                       : 'Retorna a lista de Produtores cadastrados para parcerias de eventos.'}
                                    </p>
                                  </div>

                                  {crmApiRoute === 'POST_CLIENTES' && (
                                    <div className="space-y-2 border-top pt-3 border-dashed border-slate-200 dark:border-white/5">
                                      <h4 className={`text-[10px] font-bold ${textSec} uppercase mb-2`}>Corpo da Requisição (JSON Params)</h4>
                                      <div className="space-y-1.5">
                                        <input 
                                          type="text" 
                                          placeholder="name (obrigatório)" 
                                          value={crmApiInputs.name}
                                          onChange={(e) => setCrmApiInputs(prev => ({ ...prev, name: e.target.value }))}
                                          className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} 
                                          required 
                                        />
                                        <input 
                                          type="text" 
                                          placeholder="company (obrigatório)" 
                                          value={crmApiInputs.company}
                                          onChange={(e) => setCrmApiInputs(prev => ({ ...prev, company: e.target.value }))}
                                          className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} 
                                          required 
                                        />
                                        <input 
                                          type="email" 
                                          placeholder="email (obrigatório)" 
                                          value={crmApiInputs.email}
                                          onChange={(e) => setCrmApiInputs(prev => ({ ...prev, email: e.target.value }))}
                                          className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} 
                                          required 
                                        />
                                        <input 
                                          type="text" 
                                          placeholder="phone (opcional)" 
                                          value={crmApiInputs.phone}
                                          onChange={(e) => setCrmApiInputs(prev => ({ ...prev, phone: e.target.value }))}
                                          className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} 
                                        />
                                        <select
                                          value={crmApiInputs.status}
                                          onChange={(e) => setCrmApiInputs(prev => ({ ...prev, status: e.target.value }))}
                                          className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`}
                                        >
                                          <option value="Ativo">Ativo</option>
                                          <option value="Inativo">Inativo</option>
                                          <option value="Em Negociação">Em Negociação</option>
                                        </select>
                                      </div>
                                    </div>
                                  )}

                                  <button
                                    type="submit"
                                    disabled={crmApiLoading}
                                    className={`w-full btn ${crmApiRoute.startsWith('GET') ? 'bg-[#22C55E] hover:bg-[#16a34a]' : 'bg-[#F59E0B] hover:bg-[#d97706]'} text-white p-2.5 rounded text-xs font-bold border-0 mt-3 flex items-center justify-center space-x-1.5`}
                                  >
                                    {crmApiLoading ? (
                                      <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        <span>Processando...</span>
                                      </>
                                    ) : (
                                      <>
                                        <Send className="w-3.5 h-3.5" />
                                        <span>Enviar Requisição</span>
                                      </>
                                    )}
                                  </button>
                                </form>

                                <div className="mt-4 border-top pt-3 border-slate-200 dark:border-white/5">
                                  <span className={`text-[9px] font-bold ${textSec} uppercase block mb-1`}>Equivalente cURL</span>
                                  <pre className="p-2.5 rounded bg-slate-900 text-slate-300 font-mono text-[9px] overflow-x-auto select-all mb-0 whitespace-pre-wrap leading-tight">
                                    {curlCommand}
                                  </pre>
                                </div>
                              </div>
                            </div>

                            {/* Response Terminal */}
                            <div className="col-lg-7 mb-3">
                              <div className="card bg-[#0F172A] border border-white/10 shadow-2xl p-4 rounded h-100 flex flex-col justify-between font-mono text-xs">
                                <div>
                                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                                    <div className="flex items-center space-x-1.5">
                                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                      <span className="text-[10px] text-slate-400 ml-2">api_response.json</span>
                                    </div>
                                    {crmApiLoading && (
                                      <div className="flex items-center space-x-1 text-slate-400">
                                        <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-ping"></span>
                                        <span className="text-[9px]">Aguardando Resposta...</span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="text-slate-300 overflow-y-auto max-h-[350px] leading-relaxed">
                                    {crmApiResponse ? (
                                      <div className="space-y-2">
                                        <div>
                                          <span className="text-[#34D399]">HTTP/1.1 {crmApiResponse.status} {crmApiResponse.statusText}</span>
                                          <br />
                                          <span className="text-slate-500">Date: {new Date().toUTCString()}</span>
                                          <br />
                                          <span className="text-slate-500">Content-Type: application/json</span>
                                          <br />
                                          <span className="text-slate-500">Access-Control-Allow-Origin: *</span>
                                        </div>
                                        <div className="border-t border-white/5 pt-2">
                                          <pre className="text-[#F1F5F9] text-[10.5px] overflow-x-auto whitespace-pre leading-normal tab-size-2">
                                            {JSON.stringify(crmApiResponse.data, null, 2)}
                                          </pre>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="text-slate-500 text-center py-12">
                                        <span>// Resposta da API aparecerá aqui após o envio da requisição.</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="text-[10px] text-slate-500 border-t border-white/5 pt-2 flex justify-between">
                                  <span>Server: DiskHub CRM Microservice</span>
                                  <span>200ms latency simulated</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                  </div>
                </div>
              </div>
            );
      })()}

            {/* 1. ADD LEAD MODAL */}
      {showAddLeadModal && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${bgCard} border ${borderCol} rounded w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp`}>
            <div className={`p-4 border-bottom ${borderCol} flex justify-between items-center ${bgCard}`}>
              <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Adicionar Lead ao Funil</h3>
              <button onClick={() => setShowAddLeadModal(false)} className={`bg-transparent border-0 cursor-pointer ${textSec} ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-905'}`}>
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateLead} className="p-4 space-y-3">
              <div className="form-group mb-2">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Nome do Lead *</label>
                <input 
                  type="text" 
                  value={newLead.name}
                  onChange={(e) => setNewLead(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Roberto Alencar"
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle}`}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Nome da Produtora / Empresa *</label>
                <input 
                  type="text" 
                  value={newLead.company}
                  onChange={(e) => setNewLead(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Ex: Prime Show Eventos"
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle}`}
                  required
                />
              </div>

              <div className="row mb-2">
                <div className="col-6 form-group">
                  <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Valor (R$) *</label>
                  <input 
                    type="number" 
                    value={newLead.value}
                    onChange={(e) => setNewLead(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="Ex: 85000"
                    className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle}`}
                    required
                  />
                </div>
                <div className="col-6 form-group">
                  <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Fase Inicial *</label>
                  <select 
                    value={newLead.stage}
                    onChange={(e) => setNewLead(prev => ({ ...prev, stage: e.target.value }))}
                    className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${selectThemeText}`}
                  >
                    <option value="prospect">Prospecção</option>
                    <option value="qualified">Qualificado</option>
                    <option value="negotiation">Negociação</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex space-x-3 justify-end border-top border-light/5 mt-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddLeadModal(false)}
                  className={`btn ${btnSecondary} text-xs font-semibold rounded py-2 px-3`}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary text-white text-xs font-semibold rounded py-2 px-3 border-0 bg-[#2563EB] hover:bg-[#1D4ED8]"
                >
                  Salvar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

            {/* 2. CADASTRAR CLIENTE MODAL */}
      {showAddClientModal && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${bgCard} border ${borderCol} rounded w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp`}>
            <div className={`p-4 border-bottom ${borderCol} flex justify-between items-center ${bgCard}`}>
              <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Cadastrar Cliente Contato</h3>
              <button onClick={() => setShowAddClientModal(false)} className={`bg-transparent border-0 cursor-pointer ${textSec} ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-905'}`}>
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateClient} className="p-4 space-y-3">
              <div className="form-group mb-2">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Nome Completo *</label>
                <input 
                  type="text" 
                  value={newClient.name}
                  onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Felipe Silveira"
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle}`}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Nome da Empresa *</label>
                <input 
                  type="text" 
                  value={newClient.company}
                  onChange={(e) => setNewClient(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Ex: Prime Eventos Ltda"
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle}`}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>E-mail de Contato *</label>
                <input 
                  type="email" 
                  value={newClient.email}
                  onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="felipe@empresa.com.br"
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle} font-mono`}
                  required
                />
              </div>

              <div className="pt-3 flex space-x-3 justify-end border-top border-light/5 mt-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddClientModal(false)}
                  className={`btn ${btnSecondary} text-xs font-semibold rounded py-2 px-3`}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary text-white text-xs font-semibold rounded py-2 px-3 border-0 bg-[#2563EB] hover:bg-[#1D4ED8]"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
