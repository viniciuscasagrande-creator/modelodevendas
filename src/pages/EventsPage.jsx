import React, { useState } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import {
  BarChart3,
  Users,
  ShoppingBag,
  Plus,
  CheckCircle,
  Landmark,
  ArrowRightLeft,
  Percent,
  X,
  FileText,
  Calendar,
  Search,
  Trash2,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  Send,
  Loader2,
  Layers,
  MapPin,
  Eye,
  Terminal,
  FileSpreadsheet,
  Info,
  MoreVertical,
  Ticket
} from 'lucide-react';

export default function EventsPage() {
  const {
    events,
    setEvents,
    venues,
    setVenues,
    sectors,
    setSectors,
    ticketBatches,
    setTicketBatches,
    issuedTickets,
    setIssuedTickets,
    pdvSales,
    setPdvSales,
    checkins,
    setCheckins,
    credencials,
    setCredencials,
    turnstiles,
    setTurnstiles,
    stocks,
    setStocks,
    eventWizardStep,
    setEventWizardStep,
    wizardInputs,
    setWizardInputs,
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

  const [eventsSubTab, setEventsSubTab] = useState('dashboard');
  const [eventsSearch, setEventsSearch] = useState('');
  const [showEventsForm, setShowEventsForm] = useState(false);
  const [apiRoute, setApiRoute] = useState('GET_EVENTOS');
  const [apiLoading, setApiLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [qrCodeInput, setQrCodeInput] = useState('');
  const [apiEventInputs, setApiEventInputs] = useState({ name: '', category: 'Show / Festival', date: '', time: '', city: '', venue: '' });
  const [apiCheckinInputs, setApiCheckinInputs] = useState({ ticketId: '', barcode: '', turnstileId: 'cat-1' });
  const [apiPdvInputs, setApiPdvInputs] = useState({ eventId: 'ev-1', operator: 'Sandra Costa', amount: '120', paymentMethod: 'PIX' });
  const [pdvs, setPdvs] = useState([
    { id: 'pdv-1', name: 'Bilheteria Teatro Positivo', manager: 'Sandra Costa', type: 'Local', balance: 150000, status: 'Aberto' },
    { id: 'pdv-2', name: 'Quiosque ParkShoppingBarigüi', manager: 'Daniel Santos', type: 'Shopping', balance: 85000, status: 'Aberto' }
  ]);
  const [showAddPdvModal, setShowAddPdvModal] = useState(false);
  const [newPdv, setNewPdv] = useState({ name: '', manager: '', type: 'Local', balance: '', status: 'Aberto' });

    const handleCreatePdv = (e) => {
    e.preventDefault();
    if (!newPdv.name || !newPdv.manager) return;
    const addedPdv = {
      id: `pdv-${Date.now()}`,
      name: newPdv.name,
      manager: newPdv.manager,
      type: newPdv.type,
      balance: newPdv.balance ? parseFloat(newPdv.balance) : 0,
      status: newPdv.status
    };
    setPdvs(prev => [...prev, addedPdv]);
    setShowAddPdvModal(false);
    setNewPdv({ name: '', manager: '', type: 'Local', balance: '', status: 'Aberto' });
    triggerToast("Sucesso", "Novo ponto de venda física (PDV) ativo.");
  };

  return (
    <>
      {(() => {
                    const handleEventsSubTabChange = (tabId) => {
              setEventsSubTab(tabId);
              setEventsSearch('');
              setShowEventsForm(false);
            };

            const comercialTabs = [
              { id: 'dashboard', label: 'Dashboard Executivo', icon: BarChart3 },
              { id: 'eventos', label: 'Cadastro de Eventos', icon: Calendar, badge: events.length },
              { id: 'locais', label: 'Locais & Espaços', icon: MapPin, badge: venues.length },
              { id: 'setores', label: 'Setores do Espaço', icon: Layers, badge: sectors.length },
              { id: 'lotes', label: 'Lotes de Ingressos', icon: ArrowRightLeft, badge: ticketBatches.length },
              { id: 'ingressos', label: 'Ingressos Emitidos', icon: FileText, badge: issuedTickets.length }
            ];

            const operacaoTabs = [
              { id: 'pdv', label: 'Ponto de Venda (PDV)', icon: ShoppingBag, badge: pdvSales.length },
              { id: 'checkin', label: 'Validação Check-in', icon: CheckCircle, badge: checkins.length },
              { id: 'credenciamento', label: 'Credenciamento', icon: Users, badge: credencials.filter(c=>c.status==='Pendente').length },
              { id: 'catracas', label: 'Controle de Catracas', icon: Landmark },
              { id: 'estoque', label: 'Estoque do Bar/Material', icon: FileSpreadsheet, badge: stocks.filter(s=>s.status==='Crítico').length }
            ];

            // Execute simulated API call
            const handleExecuteEventsApi = (e) => {
              e.preventDefault();
              setApiLoading(true);
              setApiResponse(null);

              setTimeout(() => {
                setApiLoading(false);
                let responseData = {};

                if (apiRoute === 'GET_EVENTOS') {
                  responseData = { status: 200, statusText: "OK", data: events };
                } else if (apiRoute === 'POST_EVENTO') {
                  if (!apiEventInputs.name || !apiEventInputs.date || !apiEventInputs.venue) {
                    responseData = {
                      status: 400,
                      statusText: "Bad Request",
                      data: { error: "Campos 'name', 'date' e 'venue' são obrigatórios." }
                    };
                  } else {
                    const newEventObj = {
                      id: `ev-${Date.now()}`,
                      ...apiEventInputs,
                      capacity: parseInt(apiEventInputs.capacity) || 1000
                    };
                    setEvents(prev => [...prev, newEventObj]);
                    responseData = {
                      status: 201,
                      statusText: "Created",
                      data: { success: true, message: "Evento criado com sucesso!", event: newEventObj }
                    };
                    triggerToast("API: Evento Criado", `${apiEventInputs.name} adicionado via API.`);
                    setApiEventInputs({ name: '', category: 'Show / Festival', date: '', time: '', city: '', venue: '', capacity: '', producer: '', organizer: '', status: 'Ativo' });
                  }
                } else if (apiRoute === 'POST_CHECKIN') {
                  const tix = issuedTickets.find(t => t.qrCode === apiCheckinInputs.qrCode || t.barcode === apiCheckinInputs.qrCode);
                  if (!tix) {
                    responseData = {
                      status: 404,
                      statusText: "Not Found",
                      data: { error: "Ingresso não encontrado ou inválido." }
                    };
                  } else if (tix.status === 'Checkin') {
                    const newChkLog = { id: `chk-${Date.now()}`, ticketId: tix.id, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), method: apiCheckinInputs.method, status: 'Duplicado' };
                    setCheckins(prev => [newChkLog, ...prev]);
                    responseData = {
                      status: 409,
                      statusText: "Conflict",
                      data: { error: "Este ingresso já teve check-in realizado anteriormente!", ticket: tix }
                    };
                    triggerToast("Erro de Validação", "Ingresso já utilizado!", "error");
                  } else {
                    // Success checkin
                    setIssuedTickets(prev => prev.map(t => t.id === tix.id ? { ...t, status: 'Checkin', checkinTime: new Date().toISOString().replace('T', ' ').substring(0, 16) } : t));
                    const newChk = { id: `chk-${Date.now()}`, ticketId: tix.id, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), method: apiCheckinInputs.method, status: 'Sucesso' };
                    setCheckins(prev => [newChk, ...prev]);
                    setEventLogs(prev => [{ id: `log-${Date.now()}`, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), type: 'Check-in', message: `Ingresso ${tix.qrCode} validado via API por ${apiCheckinInputs.method} (Sucesso).` }, ...prev]);
                    
                    responseData = {
                      status: 200,
                      statusText: "OK",
                      data: { success: true, message: "Check-in realizado com sucesso!", ticket: { ...tix, status: 'Checkin' } }
                    };
                    triggerToast("Check-in Sucesso", `${tix.customerName} validado.`);
                    setApiCheckinInputs({ qrCode: '', method: 'QR Code' });
                  }
                } else if (apiRoute === 'GET_EVENTOS_DASHBOARD') {
                  const activeEvs = events.filter(e => e.status === 'Ativo').length;
                  const closedEvs = events.filter(e => e.status === 'Finalizado').length;
                  const totalPdv = pdvSales.filter(s => s.status === 'Aprovado').reduce((acc, s) => acc + s.amount, 0);
                  
                  responseData = {
                    status: 200,
                    statusText: "OK",
                    data: {
                      eventosAtivos: activeEvs,
                      eventosFinalizados: closedEvs,
                      receitaPdv: totalPdv,
                      receitaOnline: 380000,
                      totalReceitaConsolidada: totalPdv + 380000,
                      totalCheckins: checkins.filter(c => c.status === 'Sucesso').length,
                      totalIngressosEmitidos: issuedTickets.length
                    }
                  };
                } else if (apiRoute === 'GET_PDV') {
                  responseData = { status: 200, statusText: "OK", data: pdvSales };
                } else if (apiRoute === 'POST_PDV') {
                  const amt = parseFloat(apiPdvInputs.amount);
                  if (isNaN(amt) || amt <= 0) {
                    responseData = { status: 400, statusText: "Bad Request", data: { error: "Valor da transação inválido." } };
                  } else {
                    const newSale = {
                      id: `sale-${Date.now()}`,
                      ...apiPdvInputs,
                      amount: amt,
                      status: 'Aprovado',
                      date: new Date().toISOString().substring(0, 10)
                    };
                    setPdvSales(prev => [...prev, newSale]);
                    setEventLogs(prev => [{ id: `log-${Date.now()}`, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), type: 'Venda PDV', message: `Transação PDV #${newSale.id} (R$ ${amt.toLocaleString()}) registrada via API.` }, ...prev]);
                    responseData = {
                      status: 201,
                      statusText: "Created",
                      data: { success: true, message: "Venda PDV registrada com sucesso!", transaction: newSale }
                    };
                    triggerToast("API: Venda PDV", `Transação de R$ ${amt.toLocaleString()} aprovada.`);
                    setApiPdvInputs({ eventId: 'ev-1', pdvId: 'pdv-1', operator: 'Sandra Costa', amount: '', paymentMethod: 'PIX', type: 'Ingresso' });
                  }
                }

                setApiResponse(responseData);
              }, 600);
            };

            return (
              <div className="space-y-4 animate-fadeIn">
                {/* Mobile Selector Dropdown */}
                <div className="md:hidden">
                  <label className={`text-[10px] font-semibold ${textSec} uppercase block mb-1`}>Navegação Operação</label>
                  <select 
                    value={eventsSubTab} 
                    onChange={(e) => handleEventsSubTabChange(e.target.value)} 
                    className={`form-control form-select ${inputClass} text-xs p-2.5 rounded focus:outline-none w-full`}
                  >
                    <optgroup label="Operação de Eventos">
                      {comercialTabs.map(t => (
                        <option key={t.id} value={t.id}>{t.label} {t.badge !== undefined ? `(${t.badge})` : ''}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Presencial & Controle">
                      {operacaoTabs.map(t => (
                        <option key={t.id} value={t.id}>{t.label} {t.badge !== undefined ? `(${t.badge})` : ''}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Desenvolvedor">
                      <option value="api_sandbox">💻 Console de APIs</option>
                    </optgroup>
                  </select>
                </div>

                {/* Desktop Grid Layout */}
                <div className="row">
                  {/* Left Side Sub-Navigation */}
                  <div className="col-lg-3 col-md-4 hidden md:block">
                    <div className={`card ${cardClass} p-3 space-y-4`}>
                      <div>
                        <h3 className={`text-[10px] font-bold ${textSec} uppercase tracking-wider mb-2 px-2`}>Operação & Planejamento</h3>
                        <div className="space-y-0.5">
                          {comercialTabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = eventsSubTab === tab.id;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => handleEventsSubTabChange(tab.id)}
                                className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-all border-0 bg-transparent ${
                                  isActive ? 'bg-[#3B82F6]/10 text-[#3B82F6] font-bold' : `${textSec} hover:bg-slate-100 dark:hover:bg-white/5`
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
                        <h3 className={`text-[10px] font-bold ${textSec} uppercase tracking-wider mb-2 px-2`}>Presencial & Controle</h3>
                        <div className="space-y-0.5">
                          {operacaoTabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = eventsSubTab === tab.id;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => handleEventsSubTabChange(tab.id)}
                                className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-all border-0 bg-transparent ${
                                  isActive ? 'bg-[#10B981]/10 text-[#10B981] font-bold' : `${textSec} hover:bg-slate-100 dark:hover:bg-white/5`
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <Icon className="w-3.5 h-3.5" />
                                  <span>{tab.label}</span>
                                </div>
                                {tab.badge !== undefined && tab.badge > 0 && (
                                  <span className={`badge ${tab.id === 'estoque' ? 'bg-red-500/15 text-red-500' : 'bg-[#10B981]/15 text-[#10B981]'} font-mono text-[9px] px-1.5 py-0.5 rounded-full`}>
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
                          onClick={() => handleEventsSubTabChange('api_sandbox')}
                          className={`w-full text-left flex items-center space-x-2 px-2.5 py-1.5 rounded text-xs transition-all border-0 bg-transparent ${
                            eventsSubTab === 'api_sandbox' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] font-bold' : `${textSec} hover:bg-slate-100 dark:hover:bg-white/5`
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
                    
                    {/* ================= SUB-TAB: DASHBOARD EXEC ================= */}
                    {eventsSubTab === 'dashboard' && (() => {
                      // Custom theme styling values for Eventos Dashboard
                      const cardBg = theme === 'dark' ? `card bg-[#131520] border border-white/5` : 'card bg-slate-100 border border-slate-300/80 shadow-sm';
                      const textCardVal = theme === 'dark' ? 'text-white' : 'text-slate-900';
                      const textCardLbl = theme === 'dark' ? 'text-slate-400 font-medium' : 'text-slate-700 font-bold';
                      const textBodyColor = theme === 'dark' ? 'text-slate-300' : 'text-slate-700 font-medium';

                      return (
                        <div className="space-y-5">
                          {/* 1. Header Row */}
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-3 border-slate-200 dark:border-white/5">
                            <div>
                              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight mb-0`}>Olá, Administrador 👋</h2>
                              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'} mb-0`}>Aqui está o resumo da sua operação hoje.</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border ${borderCol} text-xs font-semibold ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'}`}>
                                <Calendar className={`w-3.5 h-3.5 ${textCardLbl}`} />
                                <span>Período: Este mês</span>
                              </div>
                            </div>
                          </div>

                          {/* 2. Top Row KPIs */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* KPI 1: Receita Total */}
                            <div className={`${cardBg} p-4 relative overflow-hidden flex flex-col justify-between`}>
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <span className={`text-[11px] uppercase tracking-wider ${textCardLbl} block`}>Receita Total</span>
                                  <span className={`text-3xl font-black ${textCardVal} block`}>R$ {financialStats.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                  <DollarSign className="w-5 h-5" />
                                </div>
                              </div>
                              <div className="h-10 w-full mt-3">
                                <svg viewBox="0 0 150 40" className="w-full h-full overflow-hidden">
                                  <path d="M0 30 Q15 20 30 25 T60 10 T90 28 T120 12 T150 15 L150 40 L0 40 Z" fill="rgba(249, 115, 22, 0.1)" />
                                  <path d="M0 30 Q15 20 30 25 T60 10 T90 28 T120 12 T150 15" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                              </div>
                              <div className="mt-3 flex items-center justify-between text-[11px]">
                                <span className="text-emerald-500 font-bold">▲ 12,5%</span>
                                <span className={textCardLbl}>vs mês anterior</span>
                              </div>
                            </div>

                            {/* KPI 2: Ingressos Vendidos */}
                            <div className={`${cardBg} p-4 relative overflow-hidden flex flex-col justify-between`}>
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <span className={`text-[11px] uppercase tracking-wider ${textCardLbl} block`}>Ingressos Vendidos</span>
                                  <span className={`text-3xl font-black ${textCardVal} block`}>{financialStats.ingressos.toLocaleString('pt-BR')}</span>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                  <Ticket className="w-5 h-5" />
                                </div>
                              </div>
                              <div className="h-10 w-full mt-3">
                                <svg viewBox="0 0 150 40" className="w-full h-full overflow-hidden">
                                  <path d="M0 35 Q15 30 30 15 T60 25 T90 8 T120 22 T150 10 L150 40 L0 40 Z" fill="rgba(59, 130, 246, 0.1)" />
                                  <path d="M0 35 Q15 30 30 15 T60 25 T90 8 T120 22 T150 10" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                              </div>
                              <div className="mt-3 flex items-center justify-between text-[11px]">
                                <span className="text-emerald-500 font-bold">▲ 8,3%</span>
                                <span className={textCardLbl}>vs mês anterior</span>
                              </div>
                            </div>

                            {/* KPI 3: Clientes */}
                            <div className={`${cardBg} p-4 relative overflow-hidden flex flex-col justify-between`}>
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <span className={`text-[11px] uppercase tracking-wider ${textCardLbl} block`}>Clientes</span>
                                  <span className={`text-3xl font-black ${textCardVal} block`}>{Math.floor(financialStats.ingressos * 0.25).toLocaleString('pt-BR')}</span>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                  <Users className="w-5 h-5" />
                                </div>
                              </div>
                              <div className="h-10 w-full mt-3">
                                <svg viewBox="0 0 150 40" className="w-full h-full overflow-hidden">
                                  <path d="M0 25 Q15 28 30 18 T60 22 T90 12 T120 15 T150 8 L150 40 L0 40 Z" fill="rgba(139, 92, 246, 0.1)" />
                                  <path d="M0 25 Q15 28 30 18 T60 22 T90 12 T120 15 T150 8" fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                              </div>
                              <div className="mt-3 flex items-center justify-between text-[11px]">
                                <span className="text-emerald-500 font-bold">▲ 15,7%</span>
                                <span className={textCardLbl}>vs mês anterior</span>
                              </div>
                            </div>

                            {/* KPI 4: Eventos Ativos */}
                            <div className={`${cardBg} p-4 relative overflow-hidden flex flex-col justify-between`}>
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <span className={`text-[11px] uppercase tracking-wider ${textCardLbl} block`}>Eventos Ativos</span>
                                  <span className={`text-3xl font-black ${textCardVal} block`}>{events.length}</span>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                  <Calendar className="w-5 h-5" />
                                </div>
                              </div>
                              <div className="h-10 w-full mt-3">
                                <svg viewBox="0 0 150 40" className="w-full h-full overflow-hidden">
                                  <path d="M0 32 Q15 35 30 20 T60 12 T90 25 T120 8 T150 5 L150 40 L0 40 Z" fill="rgba(16, 185, 129, 0.1)" />
                                  <path d="M0 32 Q15 35 30 20 T60 12 T90 25 T120 8 T150 5" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                              </div>
                              <div className="mt-3 flex items-center justify-between text-[11px]">
                                <span className="text-emerald-500 font-bold">▲ 5,9%</span>
                                <span className={textCardLbl}>vs mês anterior</span>
                              </div>
                            </div>
                          </div>

                          {/* 3. Row 2: Chart & Funnel & Summary Symmetrical (col-6, col-3, col-3) */
                          <div className="row g-4">
                            {/* Col 1: Receita x Vendas Mixed Chart */}
                            <div className="col-lg-6">
                              <div className={`${cardBg} p-4 h-[280px] flex flex-col justify-between`}>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-slate-200 dark:border-white/5 gap-2 mb-3">
                                  <div className="flex items-center space-x-2">
                                    <h4 className={`text-xs font-black ${textCardVal} uppercase tracking-wider mb-0`}>Receita x Vendas</h4>
                                    <Info className={`w-3.5 h-3.5 ${textCardLbl} cursor-pointer`} />
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2.5 text-[9.5px]">
                                    <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded bg-[#F97316]"></span> <span className={textCardLbl}>Receita (R$)</span></span>
                                    <span className="flex items-center space-x-1"><span className="w-2.5 h-0.5 bg-[#3B82F6] rounded"></span> <span className={textCardLbl}>Ingressos</span></span>
                                    <select className={`form-control form-select bg-transparent border ${borderCol} rounded text-[9.5px] py-0.5 px-1.5 focus:outline-none ${textCardVal}`} style={{ width: 'auto' }}>
                                      <option value="diario">Diário</option>
                                      <option value="semanal">Semanal</option>
                                    </select>
                                    <button className={`bg-transparent border-0 p-1 ${textCardLbl} hover:text-white cursor-pointer`}><MoreVertical className="w-3.5 h-3.5" /></button>
                                  </div>
                                </div>
                                <div className="w-full flex-1 flex flex-col justify-between">
                                  {/* Custom Mixed Bar & Line SVG Chart - items-stretch to align axes */}
                                  <div className="flex-1 flex items-stretch relative h-[155px]">
                                    {/* Left Y Axis (Receita) */}
                                    <div className={`flex flex-col justify-between text-[8px] ${textCardLbl} font-mono pr-2 shrink-0 text-right`} style={{ width: '40px' }}>
                                      <span>R$ 200k</span>
                                      <span>R$ 150k</span>
                                      <span>R$ 100k</span>
                                      <span>R$ 50k</span>
                                      <span>R$ 0</span>
                                    </div>
                                    {/* Chart Canvas */}
                                    <div className="flex-1 relative border-b border-l border-slate-200 dark:border-white/5">
                                      {/* Grid lines */}
                                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                        <div className="border-t border-slate-100 dark:border-white/5 w-full h-0"></div>
                                        <div className="border-t border-slate-100 dark:border-white/5 w-full h-0"></div>
                                        <div className="border-t border-slate-100 dark:border-white/5 w-full h-0"></div>
                                        <div className="border-t border-slate-100 dark:border-white/5 w-full h-0"></div>
                                        <div></div>
                                      </div>
                                      
                                      <svg viewBox="0 0 300 180" preserveAspectRatio="none" className="w-full h-full absolute inset-0 overflow-hidden">
                                        <defs>
                                          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#F97316" stopOpacity="1" />
                                            <stop offset="100%" stopColor="#EA580C" stopOpacity="0.3" />
                                          </linearGradient>
                                          <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                                          </linearGradient>
                                          <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                                            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#3B82F6" floodOpacity="0.3" />
                                          </filter>
                                        </defs>

                                        <path 
                                          d="M15 130 L30 115 L45 125 L60 95 L75 105 L90 85 L105 70 L120 90 L135 78 L150 55 L165 72 L180 60 L195 45 L210 68 L225 82 L240 50 L255 35 L270 48 L285 62 L295 40 L295 180 L15 180 Z" 
                                          fill="url(#lineAreaGrad)"
                                        />

                                        {[45, 60, 52, 78, 65, 84, 98, 70, 85, 110, 92, 105, 125, 95, 80, 115, 138, 120, 102, 145].map((val, idx) => {
                                          const x = 12 + idx * 14.5;
                                          const height = val * 1.1;
                                          const y = 180 - height;
                                          return (
                                            <rect key={idx} x={x} y={y} width="7" height={height} fill="url(#barGrad)" rx="2" className="hover:opacity-85 transition-opacity cursor-pointer" />
                                          );
                                        })}

                                        <path 
                                          d="M15 130 L30 115 L45 125 L60 95 L75 105 L90 85 L105 70 L120 90 L135 78 L150 55 L165 72 L180 60 L195 45 L210 68 L225 82 L240 50 L255 35 L270 48 L285 62 L295 40" 
                                          fill="none" 
                                          stroke="#3B82F6" 
                                          strokeWidth="2.5" 
                                          strokeLinecap="round" 
                                          strokeLinejoin="round" 
                                          filter="url(#lineGlow)"
                                        />

                                        {[
                                          [15, 130], [30, 115], [45, 125], [60, 95], [75, 105], [90, 85], [105, 70], 
                                          [120, 90], [135, 78], [150, 55], [165, 72], [180, 60], [195, 45], [210, 68], 
                                          [225, 82], [240, 50], [255, 35], [270, 48], [285, 62], [295, 40]
                                        ].map((pt, idx) => (
                                          <circle key={idx} cx={pt[0]} cy={pt[1]} r="3" fill="#3B82F6" stroke={theme==='dark'?'#111827':'#fff'} strokeWidth="1" className="hover:scale-125 transition-transform" />
                                        ))}
                                      </svg>
                                    </div>
                                    {/* Right Y Axis (Vendas) */}
                                    <div className={`flex flex-col justify-between text-[8px] ${textCardLbl} font-mono pl-2 shrink-0 text-left`} style={{ width: '30px' }}>
                                      <span>1,000</span>
                                      <span>750</span>
                                      <span>500</span>
                                      <span>250</span>
                                      <span>0</span>
                                    </div>
                                  </div>
                                  {/* X Axis Labels */}
                                  <div className={`flex justify-between text-[8px] ${textCardLbl} font-mono mt-1`} style={{ paddingLeft: '40px', paddingRight: '30px' }}>
                                    <span>01 Mai</span>
                                    <span>05 Mai</span>
                                    <span>10 Mai</span>
                                    <span>15 Mai</span>
                                    <span>20 Mai</span>
                                    <span>25 Mai</span>
                                    <span>30 Mai</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Col 2: Funil de Vendas */}
                            <div className="col-lg-3">
                              <div className={`${cardBg} p-4 h-[280px] flex flex-col justify-between`}>
                                <div className="pb-2 border-b border-slate-200 dark:border-white/5 mb-3">
                                  <h4 className={`text-xs font-black ${textCardVal} uppercase tracking-wider mb-0`}>Funil de Vendas</h4>
                                </div>
                                <div className="flex-1 flex flex-col justify-center space-y-0.5">
                                  {[
                                    { label: 'Visitantes', val: (financialStats.ingressos * 15).toLocaleString('pt-BR'), pct: '100%', color: theme==='dark' ? 'from-indigo-600/20 to-indigo-600/5 border-indigo-500/30 text-indigo-300' : 'from-indigo-50/70 to-indigo-100/40 border-indigo-200 text-indigo-700', border: 'border-l-4 border-l-indigo-500', icon: Eye, width: 'w-full' },
                                    { label: 'Interessados', val: (financialStats.ingressos * 3).toLocaleString('pt-BR'), pct: '19%', color: theme==='dark' ? 'from-blue-600/20 to-blue-600/5 border-blue-500/30 text-blue-300' : 'from-blue-50/70 to-indigo-100/40 border-blue-200 text-blue-700', border: 'border-l-4 border-l-blue-500', icon: Users, width: 'w-full' },
                                    { label: 'Carrinhos', val: financialStats.ingressos.toLocaleString('pt-BR'), pct: '6,7%', color: theme==='dark' ? 'from-teal-600/20 to-teal-600/5 border-teal-500/30 text-teal-300' : 'from-teal-50/70 to-indigo-100/40 border-teal-200 text-teal-700', border: 'border-l-4 border-l-teal-500', icon: ShoppingBag, width: 'w-full' },
                                    { label: 'Compras', val: Math.floor(financialStats.ingressos * 0.43).toLocaleString('pt-BR'), pct: '2,9%', color: theme==='dark' ? 'from-emerald-600/20 to-emerald-600/5 border-emerald-500/30 text-emerald-300' : 'from-emerald-50/70 to-indigo-100/40 border-emerald-200 text-emerald-700', border: 'border-l-4 border-l-emerald-500', icon: CheckCircle, width: 'w-full' }
                                  ].map((step, idx) => {
                                    const StepIcon = step.icon;
                                    return (
                                      <div key={idx} className="flex flex-col items-center w-full">
                                        <div className={`py-1.5 px-2.5 rounded-xl border bg-gradient-to-r ${step.color} ${step.border} ${step.width} flex justify-between items-center text-[9.5px] font-bold shadow-sm relative overflow-hidden transition-all hover:scale-[1.01]`}>
                                          <div className="flex items-center space-x-1.5">
                                            <StepIcon className="w-3.5 h-3.5 opacity-80" />
                                            <span className="shrink-0">{step.label}</span>
                                          </div>
                                          <div className="flex items-center space-x-1.5">
                                            <span className="font-mono shrink-0 font-extrabold">{step.val}</span>
                                            <span className="text-[8px] opacity-60 font-mono font-bold bg-white/20 dark:bg-black/25 px-1.5 py-0.2 rounded">{step.pct}</span>
                                          </div>
                                        </div>
                                        {idx < 3 && (
                                          <div className={`text-[9px] ${textCardLbl} font-mono font-bold my-0.5 flex items-center justify-center`}>
                                            <span className="opacity-40">↓</span>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            {/* Col 3: Resumo Financeiro */}
                            <div className="col-lg-3">
                              <div className={`${cardBg} p-4 h-[280px] flex flex-col justify-between`}>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/5 mb-3">
                                  <h4 className={`text-xs font-black ${textCardVal} uppercase tracking-wider mb-0`}>Resumo Financeiro</h4>
                                  <button onClick={() => selectTab('financeiro')} className="bg-transparent border-0 p-0 text-[10px] text-[#3B82F6] hover:underline font-bold cursor-pointer">Ver completo</button>
                                </div>
                                <div className="flex-1 flex flex-col justify-between space-y-1.5">
                                  {[
                                    { label: 'Receitas', val: 'R$ ' + (financialStats.receita * 1.05).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), color: 'text-emerald-500', barColor: 'bg-emerald-500', pct: 100, icon: ArrowUpRight, bg: 'bg-emerald-500/10' },
                                    { label: 'Despesas', val: '- R$ ' + (financialStats.receita * 0.25).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), color: 'text-[#EF4444]', barColor: 'bg-[#EF4444]', pct: 24, icon: ArrowUpRight, rotate: 'rotate-90', bg: 'bg-[#EF4444]/10' },
                                    { label: 'Lucro Líquido', val: 'R$ ' + (financialStats.receita * 0.8).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), color: 'text-emerald-500', barColor: 'bg-[#3B82F6]', pct: 76, icon: Sparkles, bg: 'bg-emerald-500/10' },
                                    { label: 'Margem', val: '75,92%', color: 'text-emerald-500', barColor: 'bg-indigo-500', pct: 76, percent: true, icon: Percent, bg: 'bg-emerald-500/10' }
                                  ].map((fin, idx) => {
                                    const FinIcon = fin.icon;
                                    return (
                                      <div key={idx} className={`p-1.5 px-2.5 rounded-lg border ${borderCol} ${theme === 'dark' ? 'bg-[#111827]/40 hover:bg-[#111827]/60' : 'bg-slate-50/40 hover:bg-slate-50/80'} transition-all flex flex-col space-y-1.5`}>
                                        <div className="flex items-center justify-between w-full">
                                          <div className="flex items-center space-x-2">
                                            <div className={`w-6 h-6 rounded-lg ${fin.bg} ${fin.color} flex items-center justify-center`}>
                                              <FinIcon className={`w-3.5 h-3.5 ${fin.rotate || ''}`} />
                                            </div>
                                            <span className={`text-[10px] font-semibold ${textCardLbl}`}>{fin.label}</span>
                                          </div>
                                          <div className="flex items-center space-x-1.5">
                                            <span className={`text-[11px] font-black ${fin.valColor || textCardVal}`}>{fin.val}</span>
                                            {fin.percent && (
                                              <span className="text-[7.5px] font-bold text-emerald-500 bg-emerald-500/15 px-1.5 py-0.2 rounded">Saudável</span>
                                            )}
                                          </div>
                                        </div>
                                        <div className="w-full bg-slate-200 dark:bg-white/5 h-1 rounded-full overflow-hidden">
                                          <div className={`h-full ${fin.barColor} rounded-full`} style={{ width: `${fin.pct}%` }}></div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          /* 4. Row 3: Fluxo de Caixa, Contas a Receber, Marketing, Próximos Eventos */}
                          <div className="row g-4">
                            {/* Card 1: Fluxo de Caixa */}
                            <div className="col-lg-3 col-md-6">
                              <div className={`${cardBg} p-3.5 h-100 flex flex-col justify-between`}>
                                <div className="flex justify-between items-center mb-3">
                                  <span className={`text-[10px] ${textCardLbl} uppercase tracking-wider`}>Fluxo de Caixa</span>
                                  <span className={`text-[10px] ${textCardLbl} font-mono`}>Este mês</span>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <span className={`text-[9px] ${textCardLbl} block`}>Saldo atual</span>
                                    <span className={`text-lg font-black ${textCardVal} block`}>R$ {financialStats.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                  </div>
                                  <div className="flex justify-between text-[10px] pt-1">
                                    <div>
                                      <span className={`text-slate-600 dark:text-slate-350 block text-[9px] font-bold`}>Entradas</span>
                                      <span className="text-emerald-500 font-bold">R$ {(financialStats.receita * 1.05).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="text-right">
                                      <span className={`text-slate-600 dark:text-slate-350 block text-[9px] font-bold`}>Saídas</span>
                                      <span className="text-[#EF4444] font-bold">- R$ {(financialStats.receita * 0.25).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="h-8 w-full mt-2">
                                  <svg viewBox="0 0 100 30" className="w-full h-full overflow-hidden">
                                    <path d="M0 20 Q20 10 40 25 T80 5 T100 12" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                                  </svg>
                                </div>
                                <button onClick={() => selectTab('financeiro')} className="bg-transparent border-0 p-0 text-[10px] text-[#3B82F6] hover:underline font-bold text-left cursor-pointer mt-3">Ver fluxo de caixa ➔</button>
                              </div>
                            </div>

                            {/* Card 2: Contas a Receber */}
                            <div className="col-lg-3 col-md-6">
                              <div className={`${cardBg} p-3.5 h-100 flex flex-col justify-between`}>
                                <div className="flex justify-between items-center mb-2">
                                  <span className={`text-[10px] ${textCardLbl} uppercase tracking-wider`}>Contas a Receber</span>
                                  <span className={`text-[10px] ${textCardLbl} font-mono`}>Total: R$ {(financialStats.saldo * 0.06).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex items-center space-x-3 my-2">
                                  {/* Doughnut SVG representation */}
                                  <div className="relative w-14 h-14 shrink-0">
                                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3B82F6" strokeWidth="4.2" strokeDasharray="60 40" strokeDashoffset="0" />
                                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F97316" strokeWidth="4.2" strokeDasharray="25 75" strokeDashoffset="-60" />
                                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="4.2" strokeDasharray="15 85" strokeDashoffset="-85" />
                                    </svg>
                                    <div className={`absolute inset-0 flex items-center justify-center text-[9px] font-bold ${textCardVal}`}>60%</div>
                                  </div>
                                  <div className={`text-[9px] space-y-1 ${textCardLbl} font-semibold flex-1`}>
                                    <div className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span> <span className="truncate text-slate-800 dark:text-slate-300">A vencer: 60%</span></div>
                                    <div className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span> <span className="truncate text-slate-800 dark:text-slate-300">Vencidas: 25%</span></div>
                                    <div className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> <span className="truncate text-slate-800 dark:text-slate-300">Pagas: 15%</span></div>
                                  </div>
                                </div>
                                <button onClick={() => selectTab('financeiro')} className="bg-transparent border-0 p-0 text-[10px] text-[#3B82F6] hover:underline font-bold text-left cursor-pointer mt-2">Ver todas contas ➔</button>
                              </div>
                            </div>

                            {/* Card 3: Marketing */}
                            <div className="col-lg-3 col-md-6">
                              <div className={`${cardBg} p-3.5 h-100 flex flex-col justify-between`}>
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <span className={`text-[10px] ${textCardLbl} uppercase tracking-wider block`}>Marketing</span>
                                    <span className={`text-[10px] ${textCardLbl} font-mono`}>Campanhas: 12</span>
                                  </div>
                                  <button onClick={() => selectTab('marketing')} className="w-7 h-7 rounded bg-[#3B82F6]/10 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white border-0 flex items-center justify-center cursor-pointer transition-colors">
                                    <Send className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <div className="grid grid-cols-3 gap-1 text-center py-1">
                                  <div className="border-r border-slate-200 dark:border-white/5">
                                    <span className={`text-[9px] ${textCardLbl} block`}>Cliques</span>
                                    <span className={`text-xs font-bold ${textCardVal} block`}>{Math.floor(financialStats.ingressos * 1.8).toLocaleString('pt-BR')}</span>
                                  </div>
                                  <div className="border-r border-slate-200 dark:border-white/5">
                                    <span className={`text-[9px] ${textCardLbl} block`}>Conv.</span>
                                    <span className={`text-xs font-bold ${textCardVal} block`}>{Math.floor(financialStats.ingressos * 0.33).toLocaleString('pt-BR')}</span>
                                  </div>
                                  <div>
                                    <span className={`text-[9px] ${textCardLbl} block`}>ROI</span>
                                    <span className="text-emerald-500 text-xs font-bold block">342%</span>
                                  </div>
                                </div>
                                <button onClick={() => selectTab('marketing')} className="bg-transparent border-0 p-0 text-[10px] text-[#3B82F6] hover:underline font-bold text-left cursor-pointer mt-2">Ver campanhas ➔</button>
                              </div>
                            </div>

                            {/* Card 4: Próximos Eventos */}
                            <div className="col-lg-3 col-md-6">
                              <div className={`${cardBg} p-3.5 h-100 flex flex-col justify-between`}>
                                <div className="flex justify-between items-center mb-2">
                                  <span className={`text-[10px] ${textCardLbl} uppercase tracking-wider`}>Próximos Eventos</span>
                                  <button onClick={() => handleEventsSubTabChange('eventos')} className="bg-transparent border-0 p-0 text-[9px] text-[#3B82F6] hover:underline font-bold cursor-pointer">Ver todos</button>
                                </div>
                                <div className="space-y-2 flex-1 flex flex-col justify-center">
                                  {[
                                    { date: '25 MAI', name: 'Show de Rock', venue: 'Arena DiskHub', tix: '2.450 vendidos' },
                                    { date: '28 MAI', name: 'Festival de Verão', venue: 'Praia Central', tix: '5.120 vendidos' },
                                    { date: '02 JUN', name: 'Noite da Comédia', venue: 'Teatro DiskHub', tix: '1.150 vendidos' }
                                  ].map((ev, idx) => (
                                    <div key={idx} className="flex items-center space-x-2 text-[9.5px]">
                                      <div className="w-8 h-8 rounded bg-slate-200 dark:bg-white/5 border border-slate-350 dark:border-white/5 flex flex-col items-center justify-center shrink-0 leading-tight">
                                        <span className="font-bold text-[8.5px] block font-mono text-slate-800 dark:text-slate-350">{ev.date.split(' ')[0]}</span>
                                        <span className="text-[7.5px] text-slate-500 dark:text-slate-400 block font-mono font-bold">{ev.date.split(' ')[1]}</span>
                                      </div>
                                      <div className="min-w-0 flex-1 text-left">
                                        <span className={`font-bold ${textCardVal} block truncate`}>{ev.name}</span>
                                        <span className={`${textCardLbl} block truncate leading-none text-[8.5px] mt-0.5`}>{ev.venue} • <span className="text-emerald-500 font-bold">{ev.tix}</span></span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 5. Row 4: Últimas Vendas, Agenda, Atividades Recentes */}
                          <div className="row g-4">
                            {/* Col 1: Últimas Vendas table */}
                            <div className="col-lg-6">
                              <div className={`${cardBg} p-4 h-100`}>
                                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-white/5 mb-3">
                                  <h4 className={`text-xs font-black ${textCardVal} uppercase tracking-wider mb-0`}>Últimas Vendas</h4>
                                  <button onClick={() => selectTab('crm')} className="bg-transparent border-0 p-0 text-[10px] text-[#3B82F6] hover:underline font-bold cursor-pointer">Ver todas</button>
                                </div>
                                <div className="table-responsive">
                                  <table className="table text-[10.5px] mb-0 align-middle">
                                    <thead>
                                      <tr className={`border-bottom ${borderCol} ${textCardLbl} uppercase text-[8.5px]`}>
                                        <th className="pb-2 border-0">Cliente</th>
                                        <th className="pb-2 border-0">Evento</th>
                                        <th className="pb-2 border-0 text-center">Ingressos</th>
                                        <th className="pb-2 border-0 text-right">Valor</th>
                                        <th className="pb-2 border-0 text-center">Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {[
                                        { name: 'João da Silva', event: 'Show de Rock', count: 2, value: 'R$ 240,00', status: 'Pago', date: '23/05/2025' },
                                        { name: 'Maria Oliveira', event: 'Festival de Verão', count: 4, value: 'R$ 480,00', status: 'Pago', date: '23/05/2025' },
                                        { name: 'Carlos Santos', event: 'Noite da Comédia', count: 1, value: 'R$ 120,00', status: 'Pago', date: '23/05/2025' },
                                        { name: 'Ana Paula', event: 'Show de Rock', count: 3, value: 'R$ 360,00', status: 'Pendente', date: '23/05/2025' },
                                        { name: 'Lucas Ferreira', event: 'Festival de Verão', count: 2, value: 'R$ 240,00', status: 'Pago', date: '23/05/2025' }
                                      ].map((sale, idx) => (
                                        <tr key={idx} className={`border-bottom ${borderCol}/40 hover:bg-slate-50/10`}>
                                          <td className={`py-2.5 border-0 font-bold ${textCardVal}`}>{sale.name}</td>
                                          <td className={`py-2.5 border-0 ${textCardLbl}`}>{sale.event}</td>
                                          <td className={`py-2.5 border-0 text-center font-mono font-bold ${textCardLbl}`}>{sale.count}</td>
                                          <td className="py-2.5 border-0 text-right font-mono font-black text-[#22C55E]">{sale.value}</td>
                                          <td className="py-2.5 border-0 text-center">
                                            <span className={`badge ${sale.status === 'Pago' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#F97316]/10 text-[#F97316]'} text-[8.5px] font-bold px-1.5 py-0.5 rounded`}>
                                              {sale.status}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            {/* Col 2: Agenda calendar & meetings */}
                            <div className="col-lg-3">
                              <div className={`${cardBg} p-4 h-100 flex flex-col justify-between`}>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/5 mb-3">
                                  <h4 className={`text-xs font-black ${textCardVal} uppercase tracking-wider mb-0`}>Agenda</h4>
                                  <button onClick={() => selectTab('crm')} className="bg-transparent border-0 p-0 text-[10px] text-[#3B82F6] hover:underline font-bold cursor-pointer">Ver agenda</button>
                                </div>
                                <div className="space-y-3 flex-1 flex flex-col justify-between">
                                  {/* Compact Mini Calendar */}
                                  <div className="p-2 rounded bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5">
                                    <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 mb-1.5 font-mono">
                                      <span>‹</span>
                                      <span>MAIO 2025</span>
                                      <span>›</span>
                                    </div>
                                    <div className="grid grid-cols-7 gap-0.5 text-center text-[8.5px] font-semibold text-slate-400 font-mono">
                                      {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => <span key={i} className="font-bold">{d}</span>)}
                                      {[...Array(14)].map((_, i) => <span key={i} className="text-slate-600">.</span>)}
                                      {[...Array(31)].map((_, i) => {
                                        const day = i + 1;
                                        const isActive = day === 23;
                                        return (
                                          <span key={i} className={`p-0.5 rounded ${isActive ? 'bg-[#F97316] text-white font-bold' : theme==='dark'?'text-slate-350':'text-slate-800'}`}>
                                            {day}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  {/* Daily Schedule List */}
                                  <div className="space-y-2 text-[9.5px]">
                                    {[
                                      { time: '10:00', label: 'Reunião de Equipe', desc: 'Online' },
                                      { time: '14:00', label: 'Análise de Relatórios', desc: 'Financeiro' },
                                      { time: '16:00', label: 'Planejamento Marketing', desc: 'Lote 2 VIP' }
                                    ].map((meet, idx) => (
                                      <div key={idx} className={`p-2 rounded border ${borderCol} flex items-center justify-between`}>
                                        <div className="flex items-center space-x-2">
                                          <span className="font-mono font-bold text-[#F97316]">{meet.time}</span>
                                          <div className="text-left">
                                            <span className={`font-bold ${textCardVal} block`}>{meet.label}</span>
                                            <span className={`block text-[8px] ${textCardLbl}`}>{meet.desc}</span>
                                          </div>
                                        </div>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Col 3: Atividades Recentes */}
                            <div className="col-lg-3">
                              <div className={`${cardBg} p-4 h-100 flex flex-col justify-between`}>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/5 mb-3">
                                  <h4 className={`text-xs font-black ${textCardVal} uppercase tracking-wider mb-0`}>Atividades Recentes</h4>
                                  <button onClick={() => selectTab('crm')} className="bg-transparent border-0 p-0 text-[10px] text-[#3B82F6] hover:underline font-bold cursor-pointer">Ver todas</button>
                                </div>
                                <div className="space-y-3 flex-1 flex flex-col justify-center">
                                  {[
                                    { text: 'Maria Oliveira criou novo evento: Show de Rock', time: '10:24', type: 'event' },
                                    { text: 'João Santos aprovou um pagamento: Praia Central', time: '10:15', type: 'payment' },
                                    { text: 'Cliente realizou uma compra: R$ 120,00', time: '10:12', type: 'sale' },
                                    { text: 'Cupom de desconto utilizado: VERAO25', time: '09:58', type: 'coupon' },
                                    { text: 'Estorno realizado: R$ 240,00', time: '09:30', type: 'refund' }
                                  ].map((act, idx) => (
                                    <div key={idx} className="flex items-start space-x-2 text-[9.5px] leading-tight text-left">
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-1.5 shrink-0"></div>
                                      <div className="flex-1">
                                        <p className={`${textBodyColor} mb-0`}>{act.text}</p>
                                        <span className={`text-[8px] ${textCardLbl} font-mono mt-0.5 block`}>{act.time}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: CADASTRO EVENTOS ================= */}
                    {eventsSubTab === 'eventos' && (() => {
                      const filtered = events.filter(e => e.name.toLowerCase().includes(eventsSearch.toLowerCase()) || e.venue.toLowerCase().includes(eventsSearch.toLowerCase()));
                      return (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="relative flex-1 max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input type="text" placeholder="Filtrar Eventos..." value={eventsSearch} onChange={(e)=>setEventsSearch(e.target.value)} className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} />
                            </div>
                            <button onClick={()=>setShowEventsForm(!showEventsForm)} className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] text-white px-2.5 py-1.5 text-[10px] rounded border-0 cursor-pointer">
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showEventsForm ? 'Cancelar' : 'Criar Evento'}</span>
                            </button>
                          </div>

                          {showEventsForm && (
                            <div className={`card ${cardClass} p-4 animate-fadeIn mb-4`}>
                              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                                <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-0`}>🚀 Lançar Novo Evento (Wizard)</h4>
                                <span className="text-[10px] font-mono text-slate-400 font-bold">Passo {eventWizardStep} de 5</span>
                              </div>

                              {/* Progress Line */}
                              <div className="flex items-center justify-between mb-4 px-2">
                                {[
                                  { s: 1, label: 'Informações' },
                                  { s: 2, label: 'Local' },
                                  { s: 3, label: 'Ingressos' },
                                  { s: 4, label: 'Financeiro' },
                                  { s: 5, label: 'Marketing' }
                                ].map(st => (
                                  <div key={st.s} className="flex items-center flex-1 last:flex-initial">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                      eventWizardStep === st.s 
                                        ? 'bg-[#2563EB] text-white shadow' 
                                        : eventWizardStep > st.s 
                                        ? 'bg-[#10B981] text-white' 
                                        : 'bg-slate-200 dark:bg-white/10 text-slate-400'
                                    }`}>
                                      {eventWizardStep > st.s ? '✓' : st.s}
                                    </div>
                                    <span className={`text-[10px] ml-1.5 font-semibold hidden md:inline ${eventWizardStep === st.s ? textTitle : 'text-slate-400'}`}>{st.label}</span>
                                    {st.s < 5 && <div className={`flex-1 h-0.5 mx-2 ${eventWizardStep > st.s ? 'bg-[#10B981]' : 'bg-slate-200 dark:bg-white/10'}`}></div>}
                                  </div>
                                ))}
                              </div>

                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const newEv = {
                                  id: `ev-${Date.now()}`,
                                  name: data.get('name'),
                                  category: data.get('category'),
                                  date: data.get('date'),
                                  time: data.get('time'),
                                  city: data.get('city'),
                                  venue: data.get('venue'),
                                  capacity: parseInt(data.get('capacity')) || 1000,
                                  producer: data.get('producer') || 'DiskIngressos',
                                  organizer: data.get('organizer') || 'Associação Comercial',
                                  status: 'Ativo'
                                };
                                setEvents(prev => [...prev, newEv]);
                                setEventLogs(prev => [{ id: `log-${Date.now()}`, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), type: 'Evento', message: `Evento ${newEv.name} cadastrado com sucesso.` }, ...prev]);
                                setShowEventsForm(false);
                                setEventWizardStep(1);
                                triggerToast("Sucesso", "Novo evento adicionado com sucesso.");
                              }} className="space-y-4 text-xs">
                                
                                {/* Passo 1: Informações Gerais */}
                                {eventWizardStep === 1 && (
                                  <div className="row g-2 animate-fadeIn">
                                    <div className="col-md-7">
                                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nome do Evento</label>
                                      <input type="text" name="name" required defaultValue={wizardInputs.name} onChange={(e)=>setWizardInputs(prev=>({...prev, name: e.target.value}))} placeholder="Ex: Show de Inverno 2026" className={`form-control ${inputClass} p-2 text-xs rounded w-full`} />
                                    </div>
                                    <div className="col-md-5">
                                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Categoria</label>
                                      <select name="category" defaultValue={wizardInputs.category} onChange={(e)=>setWizardInputs(prev=>({...prev, category: e.target.value}))} className={`form-control form-select ${inputClass} p-2 text-xs rounded w-full`}>
                                        <option value="Show / Festival">Show / Festival</option>
                                        <option value="Festa / Balada">Festa / Balada</option>
                                        <option value="Teatro / Cultural">Teatro / Cultural</option>
                                        <option value="Feira / Exposição">Feira / Exposição</option>
                                      </select>
                                    </div>
                                  </div>
                                )}

                                {/* Passo 2: Localização */}
                                {eventWizardStep === 2 && (
                                  <div className="row g-2 animate-fadeIn">
                                    <div className="col-md-4">
                                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Cidade</label>
                                      <input type="text" name="city" required defaultValue={wizardInputs.city} onChange={(e)=>setWizardInputs(prev=>({...prev, city: e.target.value}))} placeholder="Ex: Curitiba" className={`form-control ${inputClass} p-2 text-xs rounded w-full`} />
                                    </div>
                                    <div className="col-md-5">
                                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Local / Espaço</label>
                                      <input type="text" name="venue" required defaultValue={wizardInputs.venue} onChange={(e)=>setWizardInputs(prev=>({...prev, venue: e.target.value}))} placeholder="Ex: Pedreira Paulo Leminski" className={`form-control ${inputClass} p-2 text-xs rounded w-full`} />
                                    </div>
                                    <div className="col-md-3">
                                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Capacidade Total</label>
                                      <input type="number" name="capacity" required defaultValue={wizardInputs.capacity} onChange={(e)=>setWizardInputs(prev=>({...prev, capacity: e.target.value}))} placeholder="Ex: 20000" className={`form-control ${inputClass} p-2 text-xs rounded w-full`} />
                                    </div>
                                  </div>
                                )}

                                {/* Passo 3: Ingressos */}
                                {eventWizardStep === 3 && (
                                  <div className="row g-2 animate-fadeIn">
                                    <div className="col-md-4">
                                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Preço Sugerido (R$)</label>
                                      <input type="number" name="ticketsPrice" required defaultValue={wizardInputs.ticketsPrice} onChange={(e)=>setWizardInputs(prev=>({...prev, ticketsPrice: e.target.value}))} placeholder="150" className={`form-control ${inputClass} p-2 text-xs rounded w-full`} />
                                    </div>
                                    <div className="col-md-4">
                                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Data</label>
                                      <input type="date" name="date" required defaultValue={wizardInputs.date} onChange={(e)=>setWizardInputs(prev=>({...prev, date: e.target.value}))} className={`form-control ${inputClass} p-2 text-xs rounded w-full`} />
                                    </div>
                                    <div className="col-md-4">
                                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Horário de Abertura</label>
                                      <input type="time" name="time" required defaultValue={wizardInputs.time} onChange={(e)=>setWizardInputs(prev=>({...prev, time: e.target.value}))} className={`form-control ${inputClass} p-2 text-xs rounded w-full`} />
                                    </div>
                                  </div>
                                )}

                                {/* Passo 4: Financeiro */}
                                {eventWizardStep === 4 && (
                                  <div className="row g-2 animate-fadeIn">
                                    <div className="col-md-6">
                                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Produtor Responsável</label>
                                      <input type="text" name="producer" required defaultValue={wizardInputs.producer} onChange={(e)=>setWizardInputs(prev=>({...prev, producer: e.target.value}))} placeholder="Ex: Prime Show" className={`form-control ${inputClass} p-2 text-xs rounded w-full`} />
                                    </div>
                                    <div className="col-md-6">
                                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Organizador Associado</label>
                                      <input type="text" name="organizer" required defaultValue={wizardInputs.organizer} onChange={(e)=>setWizardInputs(prev=>({...prev, organizer: e.target.value}))} placeholder="Ex: Associação Comercial" className={`form-control ${inputClass} p-2 text-xs rounded w-full`} />
                                    </div>
                                  </div>
                                )}

                                {/* Passo 5: Marketing */}
                                {eventWizardStep === 5 && (
                                  <div className="row g-2 animate-fadeIn">
                                    <div className="col-md-12">
                                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Plano MaaS Marketing Hub Associado</label>
                                      <select name="marketingPlan" defaultValue={wizardInputs.marketingPlan} onChange={(e)=>setWizardInputs(prev=>({...prev, marketingPlan: e.target.value}))} className={`form-control form-select ${inputClass} p-2 text-xs rounded w-full`}>
                                        <option value="start">Plano Start / Essencial (Divulgação básica, redes sociais)</option>
                                        <option value="profissional">Plano Profissional (Anúncios pagos, tráfego, CRM)</option>
                                        <option value="premium">Plano Premium (IA recommendations, Influenciadores, Fidelidade)</option>
                                        <option value="enterprise">Plano Enterprise (Branding, assessoria de imprensa)</option>
                                      </select>
                                      <p className="text-[10px] text-slate-400 mt-2">Os módulos MaaS correspondentes serão licenciados dinamicamente para o produtor deste evento.</p>
                                    </div>
                                  </div>
                                )}

                                {/* Wizard Controls */}
                                <div className="flex justify-between items-center pt-3 border-t">
                                  <button 
                                    type="button" 
                                    disabled={eventWizardStep === 1}
                                    onClick={() => setEventWizardStep(prev => prev - 1)}
                                    className={`btn btn-xs px-3 py-1.5 rounded font-bold border ${borderCol} bg-transparent ${eventWizardStep === 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${theme === 'dark' ? 'text-white' : 'text-slate-700'}`}
                                  >
                                    Voltar
                                  </button>

                                  <div className="flex items-center space-x-2">
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        setShowEventsForm(false);
                                        setEventWizardStep(1);
                                      }}
                                      className={`btn btn-xs px-3 py-1.5 rounded font-bold border border-transparent bg-transparent text-[#EF4444] cursor-pointer`}
                                    >
                                      Cancelar
                                    </button>
                                    
                                    {eventWizardStep < 5 ? (
                                      <button 
                                        type="button"
                                        onClick={() => setEventWizardStep(prev => prev + 1)}
                                        className="btn btn-xs bg-[#2563EB] text-white px-4 py-1.5 rounded font-bold border-0 cursor-pointer"
                                      >
                                        Avançar
                                      </button>
                                    ) : (
                                      <button 
                                        type="submit"
                                        className="btn btn-xs bg-[#10B981] hover:bg-[#059669] text-white px-4 py-1.5 rounded font-bold border-0 cursor-pointer"
                                      >
                                        Publicar Evento
                                      </button>
                                    )}
                                  </div>
                                </div>

                              </form>
                            </div>
                          )}

                          <div className="row g-3">
                            {filtered.map(ev => {
                              // Get actual ticket count if present, otherwise simulate realistic sold count for visualization
                              const actualSold = issuedTickets.filter(t => t.eventId === ev.id && t.status !== 'Cancelado').length;
                              const simulatedPercentages = { 'ev-1': 0.73, 'ev-2': 0.84, 'ev-3': 0.61 };
                              const soldPct = simulatedPercentages[ev.id] || 0.45;
                              const totalSold = actualSold > 0 ? actualSold : Math.floor(ev.capacity * soldPct);
                              const ticketPrice = ev.id === 'ev-1' ? 140 : ev.id === 'ev-2' ? 120 : 150;
                              const revenue = totalSold * ticketPrice;

                              const categoryGradients = {
                                'Show / Festival': 'from-orange-500 to-rose-600',
                                'Festa / Balada': 'from-violet-600 to-indigo-700',
                                'Corporativo': 'from-emerald-500 to-teal-600'
                              };
                              const gradient = categoryGradients[ev.category] || 'from-blue-600 to-indigo-600';

                              return (
                                <div key={ev.id} className="col-md-6 col-lg-4">
                                  <div className={`card ${cardClass} overflow-hidden h-100 flex flex-col justify-between hover:shadow-md transition-all duration-200 border-0`}>
                                    
                                    {/* Card Header Cover Gradient */}
                                    <div className={`h-28 bg-gradient-to-br ${gradient} p-3.5 flex flex-col justify-between text-white relative overflow-hidden`}>
                                      <div className="absolute right-[-10%] top-[-20%] w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
                                      <div className="flex justify-between items-start z-10 w-full">
                                        <span className="badge bg-white/20 text-white text-[8px] uppercase tracking-wider font-mono px-2 py-0.5 rounded border border-white/10">{ev.category}</span>
                                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${
                                          ev.status === 'Ativo' ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-200 border border-amber-500/30'
                                        }`}>
                                          {ev.status === 'Ativo' ? '● Ativo' : '○ Pendente'}
                                        </span>
                                      </div>
                                      <div className="z-10 text-left w-full">
                                        <h3 className="text-xs font-black truncate mb-0.5 text-white tracking-tight">{ev.name}</h3>
                                        <span className="text-[9px] opacity-85 block truncate flex items-center"><MapPin className="w-3 h-3 mr-1 shrink-0" /> {ev.venue} • {ev.city}</span>
                                      </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                                      <div className="space-y-2.5 w-full">
                                        <div className="flex justify-between items-center text-[10.5px]">
                                          <span className={`${textSec} flex items-center`}><Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" /> Data / Hora</span>
                                          <span className={`font-mono font-bold ${textTitle}`}>{ev.date} às {ev.time}</span>
                                        </div>

                                        <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5 w-full">
                                          <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                                            <span>Ingressos Vendidos</span>
                                            <span className={textTitle}>{totalSold.toLocaleString()} / {ev.capacity.toLocaleString()}</span>
                                          </div>
                                          <div className="progress rounded-full bg-slate-200 dark:bg-white/10 w-full" style={{ height: '6px' }}>
                                            <div className={`progress-bar rounded-full ${ev.id === 'ev-1' ? 'bg-[#F97316]' : ev.id === 'ev-2' ? 'bg-[#3B82F6]' : 'bg-[#10B981]'}`} role="progressbar" style={{ width: `${Math.min(100, (totalSold / ev.capacity * 100))}%` }}></div>
                                          </div>
                                          <div className="flex justify-between text-[8px] text-slate-400 font-mono w-full">
                                            <span>Progresso de Vendas</span>
                                            <span>{Math.round(totalSold / ev.capacity * 100)}%</span>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex justify-between items-center text-[10.5px] pt-2.5 border-t border-slate-100 dark:border-white/5 mt-auto w-full">
                                        <span className={textSec}>Receita Estimada:</span>
                                        <span className="font-black text-emerald-500 text-[11.5px]">R$ {revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                      </div>
                                    </div>

                                    {/* Card Footer Actions */}
                                    <div className={`p-2 px-3.5 ${theme === 'dark' ? 'bg-[#111827]/40' : 'bg-slate-50/60'} border-t ${borderCol} flex justify-between items-center text-[10px] w-full`}>
                                      <span className={`text-[9.5px] font-semibold ${textSec}`}>
                                        Produtor: <span className={`font-bold ${textTitle}`}>{ev.producer}</span>
                                      </span>

                                      <div className="flex items-center space-x-1.5">
                                        {ev.status === 'Pendente' && (
                                          <button 
                                            onClick={() => {
                                              setEvents(prev => prev.map(e => e.id === ev.id ? { ...e, status: 'Ativo' } : e));
                                              triggerToast("Ativado", "Evento aprovado!");
                                            }} 
                                            className="btn btn-xs bg-[#10B981] hover:bg-[#059669] text-white border-0 px-2 py-0.8 rounded font-bold cursor-pointer text-[9px]"
                                          >
                                            Aprovar
                                          </button>
                                        )}
                                        <button 
                                          onClick={() => {
                                            setEvents(prev => prev.filter(e => e.id !== ev.id));
                                            triggerToast("Deletado", "Evento excluído.");
                                          }} 
                                          className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer transition-colors"
                                          title="Excluir Evento"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              );
                            })}
                          </div></div>
                      );
                    })()}

                    {/* ================= SUB-TAB: LOCAIS ================= */}
                    {eventsSubTab === 'locais' && (() => {
                      const filtered = venues.filter(v => v.name.toLowerCase().includes(eventsSearch.toLowerCase()));
                      return (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="relative flex-1 max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input type="text" placeholder="Filtrar Locais..." value={eventsSearch} onChange={(e)=>setEventsSearch(e.target.value)} className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} />
                            </div>
                            <button onClick={()=>setShowEventsForm(!showEventsForm)} className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] text-white px-2.5 py-1.5 text-[10px] rounded border-0 cursor-pointer">
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showEventsForm ? 'Cancelar' : 'Adicionar Local'}</span>
                            </button>
                          </div>

                          {showEventsForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Adicionar Espaço / Local de Show</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const newVen = {
                                  id: `ven-${Date.now()}`,
                                  name: data.get('name'),
                                  capacity: parseInt(data.get('capacity')) || 0,
                                  accessibility: data.get('accessibility') || 'Total',
                                  parking: data.get('parking') || 'Não possui',
                                  backstage: data.get('backstage') || 'Normal',
                                  infrastructure: data.get('infrastructure') || 'Normal'
                                };
                                setVenues(prev => [...prev, newVen]);
                                setShowEventsForm(false);
                                triggerToast("Sucesso", "Espaço de evento cadastrado.");
                              }} className="row g-2 text-xs">
                                <div className="col-md-4">
                                  <input type="text" name="name" required placeholder="Nome do Estabelecimento / Espaço" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="number" name="capacity" required placeholder="Capacidade Nominal" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="text" name="accessibility" placeholder="Acessibilidade (ex: Total)" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="text" name="parking" placeholder="Estacionamento" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="text" name="backstage" placeholder="Backstage" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 font-semibold">Salvar Local</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Local</th>
                                    <th className="p-3 border-0">Capacidade Máxima</th>
                                    <th className="p-3 border-0">Acessibilidade</th>
                                    <th className="p-3 border-0">Estacionamento</th>
                                    <th className="p-3 border-0">Camarins / Backstage</th>
                                    <th className="p-3 border-0">Infraestrutura</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filtered.map(ven => (
                                    <tr key={ven.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{ven.name}</td>
                                      <td className="p-3 border-0 font-mono font-bold text-[#8B5CF6]">{ven.capacity.toLocaleString()} pessoas</td>
                                      <td className="p-3 border-0">{ven.accessibility}</td>
                                      <td className="p-3 border-0 font-mono text-slate-400">{ven.parking}</td>
                                      <td className="p-3 border-0">{ven.backstage}</td>
                                      <td className="p-3 border-0"><span className="badge bg-slate-200 dark:bg-white/5 text-[9px] font-bold px-2 py-0.5 rounded">{ven.infrastructure}</span></td>
                                      <td className="p-3 border-0 text-center">
                                        <button onClick={()=>{
                                          setVenues(prev => prev.filter(v => v.id !== ven.id));
                                          triggerToast("Deletado", "Local excluído.");
                                        }} className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer">
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

                    {/* ================= SUB-TAB: SETORES ================= */}
                    {eventsSubTab === 'setores' && (() => {
                      const filtered = sectors.filter(s => {
                        const ev = events.find(e => e.id === s.eventId);
                        const evName = ev ? ev.name : '';
                        return s.name.toLowerCase().includes(eventsSearch.toLowerCase()) || evName.toLowerCase().includes(eventsSearch.toLowerCase());
                      });

                      return (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="relative flex-1 max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input type="text" placeholder="Filtrar Setores..." value={eventsSearch} onChange={(e)=>setEventsSearch(e.target.value)} className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} />
                            </div>
                            <button onClick={()=>setShowEventsForm(!showEventsForm)} className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] text-white px-2.5 py-1.5 text-[10px] rounded border-0 cursor-pointer">
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showEventsForm ? 'Cancelar' : 'Adicionar Setor'}</span>
                            </button>
                          </div>

                          {showEventsForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Configurar Setor no Espaço</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const newSec = {
                                  id: `sec-${Date.now()}`,
                                  eventId: data.get('eventId'),
                                  name: data.get('name'),
                                  capacity: parseInt(data.get('capacity')) || 0,
                                  price: parseFloat(data.get('price')) || 0
                                };
                                setSectors(prev => [...prev, newSec]);
                                setShowEventsForm(false);
                                triggerToast("Sucesso", "Setor cadastrado para o evento.");
                              }} className="row g-2 text-xs">
                                <div className="col-md-4">
                                  <select name="eventId" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`}>
                                    {events.map(ev=>(
                                      <option key={ev.id} value={ev.id}>{ev.name}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select name="name" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`}>
                                    <option value="Arena">Arena</option>
                                    <option value="VIP">VIP</option>
                                    <option value="Camarote">Camarote</option>
                                    <option value="Front Stage">Front Stage</option>
                                    <option value="Bistrô">Bistrô</option>
                                    <option value="Área PCD">Área PCD</option>
                                    <option value="Área Preferencial">Área Preferencial</option>
                                  </select>
                                </div>
                                <div className="col-md-2">
                                  <input type="number" name="capacity" required placeholder="Capacidade Limite" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="number" name="price" required placeholder="Preço Base R$" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 font-semibold">Salvar Setor</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Evento Vinculado</th>
                                    <th className="p-3 border-0">Setor do Mapa</th>
                                    <th className="p-3 border-0">Lotação Permitida</th>
                                    <th className="p-3 border-0 font-right">Preço do Ingresso Base</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filtered.map(sec => {
                                    const ev = events.find(e => e.id === sec.eventId);
                                    return (
                                      <tr key={sec.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                        <td className="p-3 border-0 font-semibold">{ev ? ev.name : 'N/A'}</td>
                                        <td className="p-3 border-0 font-bold text-slate-600 dark:text-slate-300">{sec.name}</td>
                                        <td className="p-3 border-0 font-mono">{sec.capacity.toLocaleString()} ingressos</td>
                                        <td className="p-3 border-0 font-mono text-[#22C55E] font-bold">R$ {sec.price.toLocaleString()}</td>
                                        <td className="p-3 border-0 text-center">
                                          <button onClick={()=>{
                                            setSectors(prev => prev.filter(s => s.id !== sec.id));
                                            triggerToast("Deletado", "Setor deletado.");
                                          }} className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer">
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: LOTES ================= */}
                    {eventsSubTab === 'lotes' && (() => {
                      const filtered = ticketBatches.filter(b => {
                        const ev = events.find(e => e.id === b.eventId);
                        return b.name.toLowerCase().includes(eventsSearch.toLowerCase()) || (ev && ev.name.toLowerCase().includes(eventsSearch.toLowerCase()));
                      });

                      return (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="relative flex-1 max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input type="text" placeholder="Filtrar Lotes..." value={eventsSearch} onChange={(e)=>setEventsSearch(e.target.value)} className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} />
                            </div>
                            <button onClick={()=>setShowEventsForm(!showEventsForm)} className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] text-white px-2.5 py-1.5 text-[10px] rounded border-0 cursor-pointer">
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showEventsForm ? 'Cancelar' : 'Lançar Lote'}</span>
                            </button>
                          </div>

                          {showEventsForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Gerar Lote de Ingressos</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const newLot = {
                                  id: `lot-${Date.now()}`,
                                  eventId: data.get('eventId'),
                                  sectorId: data.get('sectorId'),
                                  name: data.get('name'),
                                  autoSwitch: data.get('autoSwitch') === 'true',
                                  qty: parseInt(data.get('qty')) || 0,
                                  price: parseFloat(data.get('price')) || 0,
                                  fee: parseFloat(data.get('fee')) || 0,
                                  status: 'Ativo'
                                };
                                setTicketBatches(prev => [...prev, newLot]);
                                setShowEventsForm(false);
                                triggerToast("Sucesso", "Novo lote ativo cadastrado.");
                              }} className="row g-2 text-xs">
                                <div className="col-md-3">
                                  <select name="eventId" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`}>
                                    {events.map(ev=>(
                                      <option key={ev.id} value={ev.id}>{ev.name}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select name="sectorId" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`}>
                                    {sectors.map(sec=>(
                                      <option key={sec.id} value={sec.id}>{sec.name}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="col-md-2">
                                  <input type="text" name="name" required placeholder="Lote (ex: Lote 3)" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="number" name="qty" required placeholder="Quantidade" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="number" name="price" required placeholder="Preço R$" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="number" name="fee" required placeholder="Taxa R$" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-3">
                                  <select name="autoSwitch" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`}>
                                    <option value="true">Virada Automática</option>
                                    <option value="false">Manual</option>
                                  </select>
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 font-semibold">Salvar Lote</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Evento / Setor</th>
                                    <th className="p-3 border-0">Nome do Lote</th>
                                    <th className="p-3 border-0 font-mono">Virada Automática</th>
                                    <th className="p-3 border-0 text-center">Volume Total</th>
                                    <th className="p-3 border-0 font-right">Preço</th>
                                    <th className="p-3 border-0 font-right">Taxa Conveniência</th>
                                    <th className="p-3 border-0 text-center">Status</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filtered.map(lot => {
                                    const ev = events.find(e => e.id === lot.eventId);
                                    const sec = sectors.find(s => s.id === lot.sectorId);
                                    return (
                                      <tr key={lot.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                        <td className="p-3 border-0 font-semibold">
                                          {ev ? ev.name : 'N/A'} <br />
                                          <span className="text-[10px] text-slate-400 font-normal">Setor: {sec ? sec.name : 'N/A'}</span>
                                        </td>
                                        <td className="p-3 border-0 font-bold">{lot.name}</td>
                                        <td className="p-3 border-0 font-mono text-center">
                                          <span className={`badge text-[8px] font-bold px-1.5 py-0.5 rounded ${lot.autoSwitch ? 'bg-green-500/10 text-green-500' : 'bg-slate-400/10 text-slate-400'}`}>
                                            {lot.autoSwitch ? 'Ativo (Auto)' : 'Manual'}
                                          </span>
                                        </td>
                                        <td className="p-3 border-0 text-center font-mono">{lot.qty.toLocaleString()} ingressos</td>
                                        <td className="p-3 border-0 font-mono text-[#22C55E] font-bold">R$ {lot.price.toLocaleString()}</td>
                                        <td className="p-3 border-0 font-mono text-slate-400">R$ {lot.fee.toLocaleString()}</td>
                                        <td className="p-3 border-0 text-center">
                                          <span className={`badge text-[9px] font-bold px-2 py-0.5 rounded-full ${lot.status === 'Ativo' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-red-500/15 text-red-500'}`}>
                                            {lot.status}
                                          </span>
                                        </td>
                                        <td className="p-3 border-0 text-center">
                                          <div className="flex justify-center items-center space-x-1.5">
                                            {lot.status === 'Ativo' && (
                                              <button onClick={()=>{
                                                setTicketBatches(prev=>prev.map(l=>l.id===lot.id ? {...l, status: 'Encerrado'} : l));
                                                triggerToast("Finalizado", "Lote encerrado comercialmente.");
                                              }} className="p-1 text-xs text-red-500 bg-transparent border-0 font-bold cursor-pointer">Fechar</button>
                                            )}
                                            <button onClick={()=>{
                                              setTicketBatches(prev => prev.filter(l => l.id !== lot.id));
                                              triggerToast("Deletado", "Lote removido.");
                                            }} className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer">
                                              <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: INGRESSOS ================= */}
                    {eventsSubTab === 'ingressos' && (() => {
                      const filtered = issuedTickets.filter(t => t.customerName.toLowerCase().includes(eventsSearch.toLowerCase()) || t.qrCode.toLowerCase().includes(eventsSearch.toLowerCase()));
                      return (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="relative flex-1 max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input type="text" placeholder="Filtrar Ingressos..." value={eventsSearch} onChange={(e)=>setEventsSearch(e.target.value)} className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} />
                            </div>
                            <button onClick={()=>setShowEventsForm(!showEventsForm)} className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] text-white px-2.5 py-1.5 text-[10px] rounded border-0 cursor-pointer">
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showEventsForm ? 'Cancelar' : 'Emitir Cortesia'}</span>
                            </button>
                          </div>

                          {showEventsForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Emitir Ingresso / Cortesia</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const newTix = {
                                  id: `tix-${Date.now()}`,
                                  eventId: data.get('eventId'),
                                  sectorId: data.get('sectorId'),
                                  batchId: 'lot-5',
                                  type: data.get('type'),
                                  price: data.get('type') === 'Cortesia' || data.get('type') === 'Staff' ? 0 : 100,
                                  barcode: `78912345600${issuedTickets.length+1}`,
                                  qrCode: `TIX-${data.get('eventId').toUpperCase()}-${Date.now().toString().slice(-4)}`,
                                  status: 'Pendente',
                                  customerName: data.get('customerName'),
                                  checkinTime: null
                                };
                                setIssuedTickets(prev => [...prev, newTix]);
                                setShowEventsForm(false);
                                triggerToast("Sucesso", "Ingresso emitido e enviado ao portador.");
                              }} className="row g-2 text-xs">
                                <div className="col-md-3">
                                  <select name="eventId" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`}>
                                    {events.map(ev=>(
                                      <option key={ev.id} value={ev.id}>{ev.name}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select name="sectorId" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`}>
                                    {sectors.map(sec=>(
                                      <option key={sec.id} value={sec.id}>{sec.name}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <input type="text" name="customerName" required placeholder="Nome do Beneficiário" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-3">
                                  <select name="type" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`}>
                                    <option value="Cortesia">Cortesia (Grátis)</option>
                                    <option value="VIP">VIP</option>
                                    <option value="Inteira">Inteira</option>
                                    <option value="Meia">Meia</option>
                                    <option value="Staff">Staff</option>
                                    <option value="Imprensa">Imprensa</option>
                                  </select>
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 font-semibold">Emitir Ingresso</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Portador</th>
                                    <th className="p-3 border-0">Evento / Setor</th>
                                    <th className="p-3 border-0">Tipo de Credencial</th>
                                    <th className="p-3 border-0 font-mono">Código QR / Barras</th>
                                    <th className="p-3 border-0 font-right">Preço</th>
                                    <th className="p-3 border-0 text-center">Status</th>
                                    <th className="p-3 border-0 font-right">Entrada Check-in</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filtered.map(tix => {
                                    const ev = events.find(e => e.id === tix.eventId);
                                    const sec = sectors.find(s => s.id === tix.sectorId);
                                    return (
                                      <tr key={tix.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                        <td className="p-3 border-0 font-semibold">{tix.customerName}</td>
                                        <td className="p-3 border-0">
                                          {ev ? ev.name : 'N/A'}<br />
                                          <span className="text-[10px] text-slate-400 font-normal">{sec ? sec.name : 'N/A'}</span>
                                        </td>
                                        <td className="p-3 border-0">
                                          <span className={`badge ${
                                            tix.type === 'VIP' ? 'bg-purple-500/10 text-purple-500' :
                                            tix.type === 'Cortesia' ? 'bg-green-500/10 text-green-500' :
                                            tix.type === 'Staff' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-slate-400/10 text-slate-400'
                                          } text-[8px] font-bold px-1.5 py-0.5 rounded uppercase`}>{tix.type}</span>
                                        </td>
                                        <td className="p-3 border-0 font-mono text-[9px] text-slate-400">
                                          QR: {tix.qrCode}<br />
                                          Cod: {tix.barcode}
                                        </td>
                                        <td className="p-3 border-0 font-mono">R$ {tix.price.toLocaleString()}</td>
                                        <td className="p-3 border-0 text-center">
                                          <span className={`badge text-[9px] font-bold px-2 py-0.5 rounded-full ${tix.status === 'Checkin' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-[#3B82F6]/15 text-[#3B82F6]'}`}>
                                            {tix.status === 'Checkin' ? 'Validado' : 'Pendente'}
                                          </span>
                                        </td>
                                        <td className="p-3 border-0 font-mono text-slate-400 text-right">{tix.checkinTime || '--:--'}</td>
                                        <td className="p-3 border-0 text-center">
                                          <button onClick={()=>{
                                            setIssuedTickets(prev => prev.filter(t => t.id !== tix.id));
                                            triggerToast("Cancelado", "Ingresso cancelado.");
                                          }} className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer">
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: PDV (CAIXAS) ================= */}
                    {eventsSubTab === 'pdv' && (() => {
                      const totalCash = pdvSales.filter(s=>s.status==='Aprovado' && s.paymentMethod === 'Dinheiro').reduce((acc,s)=>acc+s.amount, 0);
                      const totalPix = pdvSales.filter(s=>s.status==='Aprovado' && s.paymentMethod === 'PIX').reduce((acc,s)=>acc+s.amount, 0);
                      const totalCard = pdvSales.filter(s=>s.status==='Aprovado' && s.paymentMethod === 'Cartão').reduce((acc,s)=>acc+s.amount, 0);
                      const activePdvs = pdvs.length;

                      return (
                        <div className="space-y-4">
                          {/* Top Metrics */}
                          <div className="row">
                            <div className="col-lg-3 col-6 mb-3">
                              <div className={`card ${cardClass} p-3 text-center`}>
                                <span className={`text-[9px] font-bold ${textSec} uppercase tracking-wider`}>Caixas Totais</span>
                                <h4 className={`text-md font-bold ${textTitle} mt-1 mb-0`}>{activePdvs} abertos</h4>
                              </div>
                            </div>
                            <div className="col-lg-3 col-6 mb-3">
                              <div className={`card ${cardClass} p-3 text-center`}>
                                <span className={`text-[9px] font-bold ${textSec} uppercase tracking-wider`}>Total Dinheiro</span>
                                <h4 className="text-md font-bold text-[#22C55E] mt-1 mb-0 font-mono">R$ {totalCash.toLocaleString()}</h4>
                              </div>
                            </div>
                            <div className="col-lg-3 col-6 mb-3">
                              <div className={`card ${cardClass} p-3 text-center`}>
                                <span className={`text-[9px] font-bold ${textSec} uppercase tracking-wider`}>Total PIX</span>
                                <h4 className="text-md font-bold text-[#3B82F6] mt-1 mb-0 font-mono">R$ {totalPix.toLocaleString()}</h4>
                              </div>
                            </div>
                            <div className="col-lg-3 col-6 mb-3">
                              <div className={`card ${cardClass} p-3 text-center`}>
                                <span className={`text-[9px] font-bold ${textSec} uppercase tracking-wider`}>Total Cartão</span>
                                <h4 className="text-md font-bold text-[#8B5CF6] mt-1 mb-0 font-mono">R$ {totalCard.toLocaleString()}</h4>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <h3 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-0`}>Histórico de Vendas Físicas (Caixa)</h3>
                            <div className="flex space-x-2">
                              <button onClick={()=>{
                                const flow = prompt("Lançar suprimento de troco (R$):", "100");
                                if (flow && !isNaN(parseFloat(flow))) {
                                  setPdvSales(prev => [{ id: `sale-${Date.now()}`, eventId: 'ev-1', pdvId: 'pdv-1', operator: 'Sandra Costa', amount: parseFloat(flow), paymentMethod: 'Dinheiro', type: 'Suprimento', status: 'Aprovado', date: new Date().toISOString().substring(0, 10) }, ...prev]);
                                  triggerToast("Suprimento", "Suprimento de caixa adicionado com sucesso.");
                                }
                              }} className="btn btn-outline-success btn-xs border border-[#22C55E] text-[#22C55E] hover:bg-[#22C55E]/10 px-2 py-1 text-[9px] rounded font-bold bg-transparent cursor-pointer">
                                + Suprimento
                              </button>
                              <button onClick={()=>{
                                const val = prompt("Digite o valor para realizar sangria de caixa (R$):", "500");
                                if (val && !isNaN(parseFloat(val))) {
                                  setPdvSales(prev => [{ id: `sale-${Date.now()}`, eventId: 'ev-1', pdvId: 'pdv-1', operator: 'Sandra Costa', amount: -parseFloat(val), paymentMethod: 'Dinheiro', type: 'Sangria', status: 'Aprovado', date: new Date().toISOString().substring(0, 10) }, ...prev]);
                                  triggerToast("Sangria realizada", "Recolhimento de valores computado.");
                                }
                              }} className="btn btn-outline-danger btn-xs border border-red-500 text-red-500 hover:bg-red-500/10 px-2 py-1 text-[9px] rounded font-bold bg-transparent cursor-pointer">
                                - Sangria
                              </button>
                            </div>
                          </div>

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Caixa ID</th>
                                    <th className="p-3 border-0">Operador</th>
                                    <th className="p-3 border-0 font-mono">Data</th>
                                    <th className="p-3 border-0">Categoria</th>
                                    <th className="p-3 border-0">Método</th>
                                    <th className="p-3 border-0 font-right">Valor Movimentado</th>
                                    <th className="p-3 border-0 text-center">Status</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {pdvSales.map(sale => (
                                    <tr key={sale.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-mono font-semibold">{sale.id}</td>
                                      <td className="p-3 border-0">{sale.operator}</td>
                                      <td className="p-3 border-0 font-mono">{sale.date}</td>
                                      <td className="p-3 border-0">
                                        <span className={`badge text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                                          sale.type === 'Ingresso' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' :
                                          sale.type === 'Consumo' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' :
                                          sale.type === 'Suprimento' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                        }`}>{sale.type}</span>
                                      </td>
                                      <td className="p-3 border-0 font-semibold">{sale.paymentMethod}</td>
                                      <td className={`p-3 border-0 font-mono font-bold ${sale.amount < 0 ? 'text-red-500' : 'text-[#22C55E]'}`}>
                                        R$ {sale.amount.toLocaleString()}
                                      </td>
                                      <td className="p-3 border-0 text-center">
                                        <span className={`badge text-[9px] font-bold px-2 py-0.5 rounded-full ${sale.status === 'Aprovado' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-red-500/15 text-red-500'}`}>
                                          {sale.status}
                                        </span>
                                      </td>
                                      <td className="p-3 border-0 text-center">
                                        {sale.status === 'Aprovado' && (
                                          <button onClick={()=>{
                                            setPdvSales(prev => prev.map(s => s.id === sale.id ? { ...s, status: 'Cancelado' } : s));
                                            triggerToast("Estornado", "Venda de caixa cancelada.");
                                          }} className="btn btn-xs btn-link text-red-500 p-0 border-0 bg-transparent cursor-pointer font-bold">Estornar</button>
                                        )}
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

                    {/* ================= SUB-TAB: CHECK-IN ================= */}
                    {eventsSubTab === 'checkin' && (() => {
                      const totalCheckins = checkins.filter(c=>c.status==='Sucesso').length;
                      const duplicates = checkins.filter(c=>c.status==='Duplicado').length;

                      const handleLocalValidate = (e) => {
                        e.preventDefault();
                        if (!qrCodeInput) return;
                        
                        const tix = issuedTickets.find(t => t.qrCode === qrCodeInput || t.barcode === qrCodeInput);
                        if (!tix) {
                          const newLog = { id: `chk-${Date.now()}`, ticketId: 'N/A', timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), method: 'QR Code', status: 'Invalido' };
                          setCheckins(prev => [newLog, ...prev]);
                          setEventLogs(prev => [{ id: `log-${Date.now()}`, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), type: 'Check-in', message: `Erro: Código ${qrCodeInput} não localizado na base (Inválido).` }, ...prev]);
                          triggerToast("Check-in Inválido", "Ingresso não localizado na base de dados!", "error");
                        } else if (tix.status === 'Checkin') {
                          const newLog = { id: `chk-${Date.now()}`, ticketId: tix.id, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), method: 'QR Code', status: 'Duplicado' };
                          setCheckins(prev => [newLog, ...prev]);
                          setEventLogs(prev => [{ id: `log-${Date.now()}`, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), type: 'Check-in', message: `Alerta: Duplicidade tentada para o ingresso ${tix.qrCode} de ${tix.customerName}.` }, ...prev]);
                          triggerToast("Check-in Duplicado", "Ingresso já utilizado anteriormente!", "error");
                        } else {
                          // success checkin
                          setIssuedTickets(prev => prev.map(t => t.id === tix.id ? { ...t, status: 'Checkin', checkinTime: new Date().toISOString().replace('T', ' ').substring(0, 16) } : t));
                          const newChkObj = { id: `chk-${Date.now()}`, ticketId: tix.id, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), method: 'QR Code', status: 'Sucesso' };
                          setCheckins(prev => [newChkObj, ...prev]);
                          setEventLogs(prev => [{ id: `log-${Date.now()}`, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), type: 'Check-in', message: `Check-in confirmado para ${tix.customerName} (Ingresso: ${tix.qrCode}) no setor ${sectors.find(s=>s.id===tix.sectorId)?.name || 'N/A'}.` }, ...prev]);
                          triggerToast("Check-in Confirmado 🚀", `${tix.customerName} liberado!`);
                        }
                        setQrCodeInput('');
                      };

                      return (
                        <div className="space-y-4">
                          {/* Validation Console Panel */}
                          <div className="row">
                            <div className="col-lg-6 mb-3">
                              <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                                <form onSubmit={handleLocalValidate} className="space-y-3">
                                  <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-2`}>Validar Ingresso / Acesso</h4>
                                  <p className="text-[10px] text-slate-400 leading-normal">
                                    Simule a leitura do QR Code ou Código de barras do ingresso para registrar a entrada do cliente no evento.
                                  </p>
                                  <div className="space-y-2">
                                    <label className={`text-[10px] font-bold ${textSec} uppercase block`}>Digite o Código QR (Ex: TIX-EV1-SEC2-LOT4-003)</label>
                                    <div className="flex space-x-2">
                                      <input 
                                        type="text" 
                                        placeholder="TIX-EV1-SEC2-LOT4-003"
                                        value={qrCodeInput}
                                        onChange={(e)=>setQrCodeInput(e.target.value)}
                                        className={`form-control ${inputClass} text-xs p-2 rounded flex-1 focus:outline-none`} 
                                      />
                                      <button type="submit" className="btn btn-primary bg-[#2563EB] text-white px-4 py-2 text-xs font-bold rounded border-0 cursor-pointer">
                                        Validar Acesso
                                      </button>
                                    </div>
                                  </div>
                                </form>

                                <div className="mt-4 border-top pt-3 border-slate-200 dark:border-white/5 space-y-2">
                                  <span className={`text-[10px] font-bold ${textSec} uppercase block`}>Ingressos disponíveis para teste rápido:</span>
                                  <div className="space-y-1 text-[10px] font-mono">
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">TIX-EV1-SEC2-LOT4-003 (Pendente)</span>
                                      <button onClick={()=>setQrCodeInput('TIX-EV1-SEC2-LOT4-003')} className="text-blue-500 bg-transparent border-0 p-0 cursor-pointer hover:underline">Copiar</button>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">TIX-EV1-SEC1-LOT1-001 (Já validado)</span>
                                      <button onClick={()=>setQrCodeInput('TIX-EV1-SEC1-LOT1-001')} className="text-blue-500 bg-transparent border-0 p-0 cursor-pointer hover:underline">Copiar</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Validation History Logs */}
                            <div className="col-lg-6 mb-3">
                              <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                                <div>
                                  <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-2`}>Logs de Entrada Real-time</h4>
                                  <div className="flex justify-between text-[10px] text-slate-400 mb-3 font-semibold">
                                    <span>Validados: <span className="text-[#22C55E]">{totalCheckins}</span></span>
                                    <span>Duplicados: <span className="text-red-500">{duplicates}</span></span>
                                  </div>
                                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                                    {checkins.map(chk => {
                                      const tix = issuedTickets.find(t=>t.id===chk.ticketId);
                                      return (
                                        <div key={chk.id} className="text-[10px] p-2 bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 rounded flex justify-between items-center">
                                          <div>
                                            <span className="font-semibold text-slate-400">{chk.timestamp.substring(11)} • {chk.method}</span>
                                            <p className={`font-bold ${textTitle} mb-0`}>{tix ? tix.customerName : 'Desconhecido'}</p>
                                          </div>
                                          <span className={`badge text-[8px] font-bold px-1.5 py-0.5 rounded ${
                                            chk.status === 'Sucesso' ? 'bg-[#22C55E]/15 text-[#22C55E]' :
                                            chk.status === 'Duplicado' ? 'bg-[#F59E0B]/15 text-[#F59E0B]' : 'bg-red-500/15 text-red-500'
                                          }`}>{chk.status}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: CREDENCIAMENTO ================= */}
                    {eventsSubTab === 'credenciamento' && (() => {
                      const filtered = credencials.filter(c => c.name.toLowerCase().includes(eventsSearch.toLowerCase()) || c.cpf.includes(eventsSearch) || c.company.toLowerCase().includes(eventsSearch.toLowerCase()));
                      return (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="relative flex-1 max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input type="text" placeholder="Filtrar Credenciais..." value={eventsSearch} onChange={(e)=>setEventsSearch(e.target.value)} className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} />
                            </div>
                            <button onClick={()=>setShowEventsForm(!showEventsForm)} className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#10B981] text-white px-2.5 py-1.5 text-[10px] rounded border-0 cursor-pointer">
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showEventsForm ? 'Cancelar' : 'Nova Credencial'}</span>
                            </button>
                          </div>

                          {showEventsForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Emitir Nova Credencial de Acesso</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const newCrd = {
                                  id: `crd-${Date.now()}`,
                                  name: data.get('name'),
                                  cpf: data.get('cpf'),
                                  type: data.get('type'),
                                  company: data.get('company'),
                                  item: data.get('item'),
                                  status: 'Pendente'
                                };
                                setCredencials(prev => [...prev, newCrd]);
                                setEventLogs(prev => [{ id: `log-${Date.now()}`, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), type: 'Credenciamento', message: `Credencial criada para ${newCrd.name} (${newCrd.type}).` }, ...prev]);
                                setShowEventsForm(false);
                                triggerToast("Sucesso", "Credencial de Staff cadastrada.");
                              }} className="row g-2 text-xs">
                                <div className="col-md-3">
                                  <input type="text" name="name" required placeholder="Nome Completo" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-2">
                                  <input type="text" name="cpf" required placeholder="CPF" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-2">
                                  <select name="type" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`}>
                                    <option value="Staff">Staff</option>
                                    <option value="Artistas">Artistas</option>
                                    <option value="Imprensa">Imprensa</option>
                                    <option value="Fornecedores">Fornecedores</option>
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <input type="text" name="company" placeholder="Empresa / Banda / Veículo" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-2">
                                  <select name="item" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`}>
                                    <option value="Crachá + Pulseira">Crachá + Pulseira</option>
                                    <option value="Pulseira VIP">Pulseira VIP</option>
                                    <option value="Pulseira Staff">Pulseira Staff</option>
                                    <option value="Crachá Imprensa">Crachá Imprensa</option>
                                  </select>
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 font-semibold">Salvar Credencial</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Nome do Portador</th>
                                    <th className="p-3 border-0 font-mono">CPF</th>
                                    <th className="p-3 border-0">Grupo / Tipo</th>
                                    <th className="p-3 border-0">Empresa / Afiliação</th>
                                    <th className="p-3 border-0">Material Entregue</th>
                                    <th className="p-3 border-0 text-center">Status</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filtered.map(crd => (
                                    <tr key={crd.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{crd.name}</td>
                                      <td className="p-3 border-0 font-mono">{crd.cpf}</td>
                                      <td className="p-3 border-0">
                                        <span className={`badge ${
                                          crd.type === 'Artistas' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' :
                                          crd.type === 'Staff' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' :
                                          crd.type === 'Imprensa' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'bg-slate-400/10 text-slate-400'
                                        } text-[8px] font-bold px-1.5 py-0.5 rounded uppercase`}>{crd.type}</span>
                                      </td>
                                      <td className="p-3 border-0">{crd.company}</td>
                                      <td className="p-3 border-0 text-slate-400">{crd.item}</td>
                                      <td className="p-3 border-0 text-center">
                                        <span className={`badge text-[9px] font-bold px-2 py-0.5 rounded-full ${crd.status === 'Entregue' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-[#F59E0B]/15 text-[#F59E0B]'}`}>
                                          {crd.status}
                                        </span>
                                      </td>
                                      <td className="p-3 border-0 text-center">
                                        <div className="flex justify-center items-center space-x-1.5">
                                          {crd.status === 'Pendente' && (
                                            <button onClick={()=>{
                                              setCredencials(prev => prev.map(c => c.id === crd.id ? { ...c, status: 'Entregue' } : c));
                                              setEventLogs(prev => [{ id: `log-${Date.now()}`, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), type: 'Credenciamento', message: `Material ${crd.item} entregue para ${crd.name}.` }, ...prev]);
                                              triggerToast("Credencial Entregue", "Crachá/Pulseira liberado.");
                                            }} className="p-1 text-xs font-bold text-success border-0 bg-transparent cursor-pointer">
                                              Entregar
                                            </button>
                                          )}
                                          <button onClick={()=>{
                                            setCredencials(prev => prev.filter(c => c.id !== crd.id));
                                            triggerToast("Deletado", "Credencial cancelada.");
                                          }} className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer">
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

                    {/* ================= SUB-TAB: CATRACAS ================= */}
                    {eventsSubTab === 'catracas' && (() => {
                      return (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-0`}>Controle e Monitoramento de Catracas</h3>
                            <button onClick={()=>{
                              const name = prompt("Nome da nova catraca / portão:", "Catraca Pista Leste");
                              const type = prompt("Tipo da catraca (Entrada/Saída):", "Entrada") || 'Entrada';
                              if (name) {
                                setTurnstiles(prev => [...prev, { id: `cat-${Date.now()}`, name, type, status: 'Ativo', logsCount: 0, alertasCount: 0 }]);
                                triggerToast("Catraca cadastrada", "Equipamento ativado com sucesso.");
                              }
                            }} className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#10B981] hover:bg-[#059669] text-white px-2.5 py-1.5 text-[10px] rounded border-0 cursor-pointer">
                              <Plus className="w-3 h-3" />
                              <span>Instalar Catraca</span>
                            </button>
                          </div>

                          <div className="row">
                            {turnstiles.map(cat => (
                              <div key={cat.id} className="col-lg-4 col-sm-6 mb-3">
                                <div className={`card ${cardClass} p-3 flex flex-col justify-between h-100 space-y-3`}>
                                  <div>
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h4 className={`text-xs font-bold ${textTitle} mb-0`}>{cat.name}</h4>
                                        <span className="text-[9px] text-slate-400 font-semibold">{cat.type} • ID: {cat.id}</span>
                                      </div>
                                      <div className="flex items-center space-x-1.5">
                                        <span className={`w-2 h-2 rounded-full ${cat.status === 'Ativo' ? 'bg-[#22C55E] animate-pulse' : 'bg-red-500'}`}></span>
                                        <span className={`text-[8px] font-bold ${cat.status === 'Ativo' ? 'text-[#22C55E]' : 'text-red-500'}`}>{cat.status}</span>
                                      </div>
                                    </div>

                                    <div className="row g-2 mt-3 text-center">
                                      <div className="col-6">
                                        <div className="p-2 bg-slate-50 dark:bg-white/2 rounded border border-slate-100 dark:border-white/5">
                                          <span className="text-[8px] text-slate-400 uppercase block font-semibold">Passagens</span>
                                          <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-200">{cat.logsCount}</span>
                                        </div>
                                      </div>
                                      <div className="col-6">
                                        <div className={`p-2 rounded border ${cat.alertasCount > 0 ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-slate-50 dark:bg-white/2 border-slate-100 dark:border-white/5 text-slate-400'}`}>
                                          <span className="text-[8px] uppercase block font-semibold">Alertas</span>
                                          <span className="text-xs font-bold font-mono">{cat.alertasCount}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex space-x-1">
                                    <button 
                                      onClick={() => {
                                        setTurnstiles(prev => prev.map(c => c.id === cat.id ? { ...c, logsCount: c.logsCount + 1 } : c));
                                        setEventLogs(prev => [{ id: `log-${Date.now()}`, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), type: 'Catraca', message: `Entrada autorizada e computada na ${cat.name}.` }, ...prev]);
                                      }}
                                      className={`flex-1 py-1 text-[9px] font-bold rounded ${theme==='dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'} border-0 cursor-pointer`}
                                    >
                                      Simular Giro
                                    </button>
                                    <button 
                                      onClick={() => {
                                        setTurnstiles(prev => prev.map(c => c.id === cat.id ? { ...c, alertasCount: c.alertasCount + 1 } : c));
                                        setEventLogs(prev => [{ id: `log-${Date.now()}`, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), type: 'Catraca', message: `Erro de Validação na ${cat.name}: Bilhete inválido ou já lido.` }, ...prev]);
                                        triggerToast("Erro na catraca", "Simulação de tentativa inválida.", "error");
                                      }}
                                      className="py-1 px-2.5 text-[9px] font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 border-0 rounded cursor-pointer"
                                    >
                                      Simular Erro
                                    </button>
                                    <button 
                                      onClick={() => {
                                        setTurnstiles(prev => prev.map(c => c.id === cat.id ? { ...c, status: c.status === 'Ativo' ? 'Inativo' : 'Ativo' } : c));
                                        triggerToast("Status Alterado", `Catraca colocada como ${cat.status === 'Ativo' ? 'Inativa' : 'Ativa'}.`);
                                      }}
                                      className={`p-1 rounded ${theme==='dark' ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-600'} border-0 cursor-pointer text-[9px]`}
                                    >
                                      {cat.status === 'Ativo' ? 'Desligar' : 'Ligar'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* ================= SUB-TAB: ESTOQUE ================= */}
                    {eventsSubTab === 'estoque' && (() => {
                      const filtered = stocks.filter(s => s.item.toLowerCase().includes(eventsSearch.toLowerCase()));
                      return (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="relative flex-1 max-w-xs">
                              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${textSec}`} />
                              <input type="text" placeholder="Filtrar Almoxarifado..." value={eventsSearch} onChange={(e)=>setEventsSearch(e.target.value)} className={`form-control form-control-sm pl-8 pr-3 py-1.5 text-xs rounded w-full ${inputClass} focus:outline-none`} />
                            </div>
                            <button onClick={()=>setShowEventsForm(!showEventsForm)} className="btn btn-primary btn-xs flex items-center space-x-1 bg-[#2563EB] text-white px-2.5 py-1.5 text-[10px] rounded border-0 cursor-pointer">
                              <Plus className="w-3.5 h-3.5" />
                              <span>{showEventsForm ? 'Cancelar' : 'Novo Item'}</span>
                            </button>
                          </div>

                          {showEventsForm && (
                            <div className={`card ${cardClass} p-3 animate-fadeIn`}>
                              <h4 className={`text-xs font-bold ${textTitle} mb-3`}>Adicionar Item no Inventário do Evento</h4>
                              <form onSubmit={(e) => {
                                e.preventDefault();
                                const data = new FormData(e.target);
                                const qty = parseInt(data.get('qty')) || 0;
                                const minQty = parseInt(data.get('minQty')) || 0;
                                let status = 'OK';
                                if (qty <= minQty * 0.5) status = 'Crítico';
                                else if (qty <= minQty) status = 'Baixo';

                                const newStk = {
                                  id: `stk-${Date.now()}`,
                                  item: data.get('item'),
                                  qty,
                                  minQty,
                                  status
                                };
                                setStocks(prev => [...prev, newStk]);
                                setShowEventsForm(false);
                                triggerToast("Sucesso", "Item cadastrado.");
                              }} className="row g-2 text-xs">
                                <div className="col-md-5">
                                  <input type="text" name="item" required placeholder="Nome do Material (ex: Copo Descartável 300ml)" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-3">
                                  <input type="number" name="qty" required placeholder="Quantidade Atual" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-md-4">
                                  <input type="number" name="minQty" required placeholder="Estoque Mínimo de Alerta" className={`form-control form-control-sm ${inputClass} rounded p-1.5 text-xs`} />
                                </div>
                                <div className="col-12 text-right mt-2">
                                  <button type="submit" className="btn btn-success btn-sm bg-[#22C55E] text-white px-3 py-1 rounded border-0 font-semibold">Salvar Item</button>
                                </div>
                              </form>
                            </div>
                          )}

                          <div className={`card ${cardClass} overflow-hidden`}>
                            <div className="table-responsive">
                              <table className={`table table-hover text-xs mb-0 ${textBody}`}>
                                <thead>
                                  <tr className="border-bottom border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                                    <th className="p-3 border-0">Material / Item</th>
                                    <th className="p-3 border-0 font-mono">Qtd Atual</th>
                                    <th className="p-3 border-0 font-mono">Qtd Mínima Alerta</th>
                                    <th className="p-3 border-0 text-center">Status</th>
                                    <th className="p-3 border-0 text-center">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filtered.map(stk => (
                                    <tr key={stk.id} className="border-bottom border-slate-200 dark:border-white/5 align-middle">
                                      <td className="p-3 border-0 font-semibold">{stk.item}</td>
                                      <td className="p-3 border-0 font-mono font-bold text-slate-600 dark:text-slate-200">{stk.qty} unidades</td>
                                      <td className="p-3 border-0 font-mono text-slate-400">{stk.minQty} unidades</td>
                                      <td className="p-3 border-0 text-center">
                                        <span className={`badge text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                          stk.status === 'OK' ? 'bg-[#22C55E]/15 text-[#22C55E]' :
                                          stk.status === 'Baixo' ? 'bg-[#F59E0B]/15 text-[#F59E0B]' : 'bg-red-500/15 text-red-500 animate-pulse'
                                        }`}>{stk.status}</span>
                                      </td>
                                      <td className="p-3 border-0 text-center">
                                        <div className="flex justify-center space-x-1.5">
                                          <button onClick={()=>{
                                            const add = prompt(`Adicionar estoque de entrada para ${stk.item}:`, "500");
                                            if (add && !isNaN(parseInt(add))) {
                                              const newQty = stk.qty + parseInt(add);
                                              let nStat = 'OK';
                                              if (newQty <= stk.minQty * 0.5) nStat = 'Crítico';
                                              else if (newQty <= stk.minQty) nStat = 'Baixo';
                                              
                                              setStocks(prev => prev.map(s => s.id === stk.id ? { ...s, qty: newQty, status: nStat } : s));
                                              triggerToast("Estoque Abastecido", "Quantidade somada ao almoxarifado.");
                                            }
                                          }} className="text-blue-500 border-0 bg-transparent cursor-pointer font-bold">+ Reabastecer</button>
                                          <button onClick={()=>{
                                            setStocks(prev => prev.filter(s => s.id !== stk.id));
                                            triggerToast("Deletado", "Item removido.");
                                          }} className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer">
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

                    {/* ================= SUB-TAB: DEVELOPER API SANDBOX ================= */}
                    {eventsSubTab === 'api_sandbox' && (() => {
                      const curlCommand = apiRoute === 'GET_EVENTOS' ? 'curl -X GET "https://api.diskhub.com/v1/eventos"'
                                        : apiRoute === 'POST_EVENTO' ? `curl -X POST "https://api.diskhub.com/v1/eventos" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "name": "${apiEventInputs.name || 'Nome do Show'}",\n    "category": "${apiEventInputs.category}",\n    "date": "${apiEventInputs.date || '2026-12-31'}",\n    "time": "${apiEventInputs.time || '20:00'}",\n    "city": "${apiEventInputs.city || 'Curitiba'}",\n    "venue": "${apiEventInputs.venue || 'Pedreira'}",\n    "capacity": ${apiEventInputs.capacity || 10000},\n    "producer": "${apiEventInputs.producer || 'Prime Show'}",\n    "organizer": "${apiEventInputs.organizer || 'Associacao'}",\n    "status": "${apiEventInputs.status}"\n  }'`
                                        : apiRoute === 'POST_CHECKIN' ? `curl -X POST "https://api.diskhub.com/v1/eventos/checkin" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "qrCode": "${apiCheckinInputs.qrCode || 'TIX-EV1-SEC2-LOT4-003'}",\n    "method": "${apiCheckinInputs.method}"\n  }'`
                                        : apiRoute === 'GET_EVENTOS_DASHBOARD' ? 'curl -X GET "https://api.diskhub.com/v1/eventos/dashboard"'
                                        : apiRoute === 'GET_PDV' ? 'curl -X GET "https://api.diskhub.com/v1/eventos/pdv"'
                                        : `curl -X POST "https://api.diskhub.com/v1/eventos/pdv" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "eventId": "${apiPdvInputs.eventId}",\n    "pdvId": "${apiPdvInputs.pdvId}",\n    "operator": "${apiPdvInputs.operator}",\n    "amount": ${apiPdvInputs.amount || 150},\n    "paymentMethod": "${apiPdvInputs.paymentMethod}",\n    "type": "${apiPdvInputs.type}"\n  }'`;

                      return (
                        <div className="space-y-4">
                          <div>
                            <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-2`}>Sandbox de APIs (Eventos & Operação)</h4>
                            <p className={`text-xs ${textSec} mb-0`}>Use este painel para validar a conformidade dos endpoints de Operação, Vendas e Catracas da Fase 4. Alterações efetuadas através do Sandbox atualizam o estado local da interface automaticamente.</p>
                          </div>

                          <div className="row">
                            {/* Form Input Parameters */}
                            <div className="col-lg-5 mb-3">
                              <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                                <form onSubmit={handleExecuteEventsApi} className="space-y-3">
                                  <div>
                                    <label className={`text-[10px] font-bold ${textSec} uppercase block mb-1`}>Selecionar Endpoint (Fase 4)</label>
                                    <select
                                      value={apiRoute}
                                      onChange={(e) => {
                                        setApiRoute(e.target.value);
                                        setApiResponse(null);
                                      }}
                                      className={`form-control form-select ${inputClass} text-xs p-2.5 rounded focus:outline-none w-full`}
                                    >
                                      <option value="GET_EVENTOS">GET /eventos</option>
                                      <option value="POST_EVENTO">POST /eventos</option>
                                      <option value="GET_EVENTOS_DASHBOARD">GET /eventos/dashboard</option>
                                      <option value="POST_CHECKIN">POST /eventos/checkin</option>
                                      <option value="GET_PDV">GET /eventos/pdv</option>
                                      <option value="POST_PDV">POST /eventos/pdv</option>
                                    </select>
                                  </div>

                                  <div className="p-2.5 rounded bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 space-y-1 text-xs">
                                    <div className="flex items-center space-x-2">
                                      <span className={`badge ${apiRoute.startsWith('GET') ? 'bg-[#22C55E]' : 'bg-[#F59E0B]'} text-white text-[8px] font-bold px-1.5 py-0.5 rounded`}>
                                        {apiRoute.startsWith('GET') ? 'GET' : 'POST'}
                                      </span>
                                      <span className={`font-mono text-[9px] ${textTitle}`}>
                                        {apiRoute === 'GET_EVENTOS' ? '/eventos'
                                         : apiRoute === 'POST_EVENTO' ? '/eventos'
                                         : apiRoute === 'GET_EVENTOS_DASHBOARD' ? '/eventos/dashboard'
                                         : apiRoute === 'POST_CHECKIN' ? '/eventos/checkin'
                                         : apiRoute === 'GET_PDV' ? '/eventos/pdv'
                                         : '/eventos/pdv'}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mb-0">
                                      {apiRoute === 'GET_EVENTOS' ? 'Lista todos os eventos cadastrados na operação.'
                                       : apiRoute === 'POST_EVENTO' ? 'Adiciona um novo evento e agenda sua abertura de lotes.'
                                       : apiRoute === 'GET_EVENTOS_DASHBOARD' ? 'Retorna consolidados de bilheteria e taxas de check-in.'
                                       : apiRoute === 'POST_CHECKIN' ? 'Valida um QR Code na catraca e registra a entrada.'
                                       : apiRoute === 'GET_PDV' ? 'Retorna logs de movimentações nos pontos de venda.'
                                       : 'Registra uma nova compra local (bilhete/cerveja/água) nos caixas.'}
                                    </p>
                                  </div>

                                  {/* Route specific inputs */}
                                  {apiRoute === 'POST_EVENTO' && (
                                    <div className="space-y-2 border-top pt-3 border-dashed border-slate-200 dark:border-white/5 text-xs">
                                      <input type="text" placeholder="Nome do Evento" value={apiEventInputs.name} onChange={(e)=>setApiEventInputs(prev=>({...prev, name: e.target.value}))} className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} required />
                                      <input type="date" value={apiEventInputs.date} onChange={(e)=>setApiEventInputs(prev=>({...prev, date: e.target.value}))} className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} required />
                                      <input type="text" placeholder="Local (ex: Pedreira)" value={apiEventInputs.venue} onChange={(e)=>setApiEventInputs(prev=>({...prev, venue: e.target.value}))} className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} required />
                                      <input type="number" placeholder="Capacidade" value={apiEventInputs.capacity} onChange={(e)=>setApiEventInputs(prev=>({...prev, capacity: e.target.value}))} className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                      <input type="text" placeholder="Produtor" value={apiEventInputs.producer} onChange={(e)=>setApiEventInputs(prev=>({...prev, producer: e.target.value}))} className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} />
                                    </div>
                                  )}

                                  {apiRoute === 'POST_CHECKIN' && (
                                    <div className="space-y-2 border-top pt-3 border-dashed border-slate-200 dark:border-white/5 text-xs">
                                      <input type="text" placeholder="Código QR ou de barras (ex: TIX-EV1-SEC2-LOT4-003)" value={apiCheckinInputs.qrCode} onChange={(e)=>setApiCheckinInputs(prev=>({...prev, qrCode: e.target.value}))} className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} required />
                                      <select value={apiCheckinInputs.method} onChange={(e)=>setApiCheckinInputs(prev=>({...prev, method: e.target.value}))} className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`}>
                                        <option value="QR Code">Leitor QR Code</option>
                                        <option value="Código de Barras">Leitor de Barras</option>
                                        <option value="NFC">Leitor NFC Portão</option>
                                        <option value="Offline">Validador Local Offline</option>
                                      </select>
                                    </div>
                                  )}

                                  {apiRoute === 'POST_PDV' && (
                                    <div className="space-y-2 border-top pt-3 border-dashed border-slate-200 dark:border-white/5 text-xs">
                                      <select value={apiPdvInputs.eventId} onChange={(e)=>setApiPdvInputs(prev=>({...prev, eventId: e.target.value}))} className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`}>
                                        {events.map(ev=>(
                                          <option key={ev.id} value={ev.id}>{ev.name}</option>
                                        ))}
                                      </select>
                                      <input type="number" placeholder="Valor Transação R$" value={apiPdvInputs.amount} onChange={(e)=>setApiPdvInputs(prev=>({...prev, amount: e.target.value}))} className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`} required />
                                      <select value={apiPdvInputs.paymentMethod} onChange={(e)=>setApiPdvInputs(prev=>({...prev, paymentMethod: e.target.value}))} className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`}>
                                        <option value="PIX">PIX</option>
                                        <option value="Cartão">Cartão Débito/Crédito</option>
                                        <option value="Dinheiro">Dinheiro Físico</option>
                                      </select>
                                      <select value={apiPdvInputs.type} onChange={(e)=>setApiPdvInputs(prev=>({...prev, type: e.target.value}))} className={`form-control form-control-sm ${inputClass} text-xs p-1.5 rounded`}>
                                        <option value="Ingresso">Venda de Ingresso</option>
                                        <option value="Consumo">Consumo no Bar</option>
                                      </select>
                                    </div>
                                  )}

                                  <button
                                    type="submit"
                                    disabled={apiLoading}
                                    className={`w-full btn ${apiRoute.startsWith('GET') ? 'bg-[#22C55E]' : 'bg-[#F59E0B]'} text-white p-2.5 rounded text-xs font-bold border-0 mt-3 flex items-center justify-center space-x-1`}
                                  >
                                    {apiLoading ? (
                                      <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        <span>Executando...</span>
                                      </>
                                    ) : (
                                      <>
                                        <Send className="w-3.5 h-3.5" />
                                        <span>Enviar Chamada</span>
                                      </>
                                    )}
                                  </button>
                                </form>

                                <div className="mt-3 border-top pt-3 border-slate-200 dark:border-white/5">
                                  <span className={`text-[8px] font-bold ${textSec} uppercase block mb-1`}>Equivalente cURL</span>
                                  <pre className="p-2 bg-slate-900 text-slate-300 font-mono text-[9px] overflow-x-auto select-all mb-0 whitespace-pre-wrap leading-tight">
                                    {curlCommand}
                                  </pre>
                                </div>
                              </div>
                            </div>

                            {/* Response Terminal */}
                            <div className="col-lg-7 mb-3">
                              <div className="card bg-[#0F172A] border border-white/10 shadow-2xl p-4 rounded h-100 flex flex-col justify-between font-mono text-xs text-slate-300">
                                <div>
                                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                                    <div className="flex items-center space-x-1.5">
                                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                      <span className="text-[10px] text-slate-400 ml-2">api_response.json</span>
                                    </div>
                                    {apiLoading && (
                                      <div className="flex items-center space-x-1 text-slate-400 animate-pulse">
                                        <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full"></span>
                                        <span className="text-[9px]">Aguardando Gateway...</span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="overflow-y-auto max-h-[350px] leading-relaxed">
                                    {apiResponse ? (
                                      <div className="space-y-2">
                                        <div>
                                          <span className="text-[#34D399]">HTTP/1.1 {apiResponse.status} {apiResponse.statusText}</span>
                                          <br />
                                          <span className="text-slate-500">Date: {new Date().toUTCString()}</span>
                                          <br />
                                          <span className="text-slate-500">Content-Type: application/json</span>
                                        </div>
                                        <div className="border-t border-white/5 pt-2">
                                          <pre className="text-[#F1F5F9] text-[10.5px] overflow-x-auto whitespace-pre leading-normal tab-size-2">
                                            {JSON.stringify(apiResponse.data, null, 2)}
                                          </pre>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="text-slate-500 text-center py-12">
                                        <span>// Submeta a chamada no console para visualizar os dados de retorno.</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="text-[9px] text-slate-500 border-t border-white/5 pt-2 flex justify-between">
                                  <span>Server: Gateway DiskHub Eventos</span>
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

            {/* 4. ADD PDV MODAL */}
      {showAddPdvModal && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${bgCard} border ${borderCol} rounded w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp`}>
            <div className={`p-4 border-bottom ${borderCol} flex justify-between items-center ${bgCard}`}>
              <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Ativar Ponto de Venda (PDV)</h3>
              <button onClick={() => setShowAddPdvModal(false)} className={`bg-transparent border-0 cursor-pointer ${textSec} ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-905'}`}>
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreatePdv} className="p-4 space-y-3">
              <div className="form-group mb-2">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Nome do PDV *</label>
                <input 
                  type="text" 
                  value={newPdv.name}
                  onChange={(e) => setNewPdv(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Bilheteria Principal - Portão B"
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle}`}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Operador Responsável *</label>
                <input 
                  type="text" 
                  value={newPdv.manager}
                  onChange={(e) => setNewPdv(prev => ({ ...prev, manager: e.target.value }))}
                  placeholder="Ex: Sandra Costa"
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle}`}
                  required
                />
              </div>

              <div className="row mb-3">
                <div className="col-6 form-group">
                  <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Tipo de PDV</label>
                  <select 
                    value={newPdv.type}
                    onChange={(e) => setNewPdv(prev => ({ ...prev, type: e.target.value }))}
                    className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${selectThemeText}`}
                  >
                    <option value="Local">Local</option>
                    <option value="Físico Externo">Físico Externo</option>
                    <option value="Teatro">Teatro</option>
                  </select>
                </div>
                <div className="col-6 form-group">
                  <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Saldo Inicial (R$)</label>
                  <input 
                    type="number" 
                    value={newPdv.balance}
                    onChange={(e) => setNewPdv(prev => ({ ...prev, balance: e.target.value }))}
                    placeholder="0"
                    className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle} font-mono`}
                  />
                </div>
              </div>

              <div className="pt-3 flex space-x-3 justify-end border-top border-light/5 mt-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddPdvModal(false)}
                  className={`btn ${btnSecondary} text-xs font-semibold rounded py-2 px-3`}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary text-white text-xs font-semibold rounded py-2 px-3 border-0 bg-[#2563EB] hover:bg-[#1D4ED8]"
                >
                  Ativar PDV
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
