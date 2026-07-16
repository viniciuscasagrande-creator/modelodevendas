import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  ShoppingBag, 
  Brain, 
  Plus, 
  CheckCircle, 
  RefreshCw, 
  Landmark, 
  ArrowRightLeft, 
  Percent, 
  Mail, 
  ChevronRight, 
  X, 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp,
  Search,
  Bell,
  Trash2,
  DollarSign,
  Briefcase,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  Send,
  Loader2
} from 'lucide-react';

export default function App() {
  // App states
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [plan, setPlan] = useState('standard');
  const [installedApps, setInstalledApps] = useState({
    financeiro: true,
    contabilidade: true,
    crm: false,
    mkt: false
  });
  
  // Toast notifications state
  const [toast, setToast] = useState({ show: false, title: '', body: '', type: 'success' });
  
  // AI Chat states
  const [chatOpen, setChatOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Olá **Vinicius**! 👋 Sou o Disk AI, assistente do seu ecossistema ERP & CRM. Estou pronto para realizar análises financeiras e de vendas. O que deseja fazer?',
      timestamp: '13:00'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // CRM Lead Data
  const [leads, setLeads] = useState([
    // Prospecção
    { id: 'lead-1', name: 'Roberto Alencar', company: 'Prime Show Eventos', value: 120000, stage: 'prospect', date: '10 Jul', tag: 'VIP' },
    { id: 'lead-2', name: 'Ana Beatriz Souza', company: 'Festival Sertanejo', value: 85000, stage: 'prospect', date: '12 Jul', tag: 'Quente' },
    // Qualificado
    { id: 'lead-3', name: 'Carlos Henrique', company: 'Sunset Lounge Bar', value: 45000, stage: 'qualified', date: '08 Jul', tag: 'Novo' },
    { id: 'lead-4', name: 'Mariana Costa', company: 'Arena Music Curitiba', value: 150000, stage: 'qualified', date: '14 Jul', tag: 'Corporate' },
    // Negociação
    { id: 'lead-5', name: 'Felipe Dias', company: 'Expo Agro 2026', value: 210000, stage: 'negotiation', date: '05 Jul', tag: 'Alta Margem' },
    // Fechado
    { id: 'lead-6', name: 'Juliana Vieira', company: 'Embafeste Premium', value: 510000, stage: 'won', date: '01 Jul', tag: 'Fechado' }
  ]);
  
  // CRM Modals / Form
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', company: '', value: '', stage: 'prospect', tag: 'Novo' });

  // CRM Contacts/Clients list
  const [clients, setClients] = useState([
    { id: 'c-1', name: 'Juliana Vieira', company: 'Embafeste Premium', email: 'juliana@embafeste.com', phone: '(41) 99888-7766', spend: 510000, status: 'Ativo' },
    { id: 'c-2', name: 'Roberto Alencar', company: 'Prime Show Eventos', email: 'roberto@primeshow.com.br', phone: '(41) 98765-4321', spend: 120000, status: 'Em Negociação' },
    { id: 'c-3', name: 'Mariana Costa', company: 'Arena Music Curitiba', email: 'mariana@arenamusic.com', phone: '(41) 99111-2222', spend: 150000, status: 'Ativo' }
  ]);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', company: '', email: '', phone: '', status: 'Ativo' });

  // Bank Conciliation Data
  const [conciliationItems, setConciliationItems] = useState([
    { id: 'conc-1', date: '15/07/2026', desc: 'PIX Recebido - Ingressos Lote 1', type: 'in', amount: 45000, matched: false, matchInvoice: 'NF-8921 (Festival Inverno)' },
    { id: 'conc-2', date: '15/07/2026', desc: 'TED Recebida - Patrocínio Master', type: 'in', amount: 150000, matched: false, matchInvoice: 'NF-8919 (Prime Show)' },
    { id: 'conc-3', date: '14/07/2026', desc: 'PGTO - Taxa Gateway DiskIngressos', type: 'out', amount: 12500, matched: false, matchInvoice: 'Fatura Gate-450' },
    { id: 'conc-4', date: '13/07/2026', desc: 'Transferência Pix - Repasse Parcial', type: 'out', amount: 620000, matched: false, matchInvoice: 'Repasse ID-998 (Metal Fest)' },
    { id: 'conc-5', date: '12/07/2026', desc: 'TED Recebida - Venda PDV Físico', type: 'in', amount: 82000, matched: false, matchInvoice: 'NF-8915 (Embafeste)' }
  ]);

  // Financial Stats / Balance
  const [financialStats, setFinancialStats] = useState({
    receita: 2580000,
    saldo: 950000,
    repasses: 620000,
    lucro: 480000
  });

  // Financial DRE Month Filter
  const [dreMonth, setDreMonth] = useState('Julho');

  // Marketing Coupons
  const [coupons, setCoupons] = useState([
    { id: 'coup-1', code: 'INVERNO15', discount: 15, event: 'Festival de Inverno Curitiba', status: 'Ativo', usages: 342 },
    { id: 'coup-2', code: 'METAL20', discount: 20, event: 'Metal Fest 2026', status: 'Ativo', usages: 198 },
    { id: 'coup-3', code: 'EMBAFESTE10', discount: 10, event: 'Embafeste Premium', status: 'Inativo', usages: 45 }
  ]);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', event: 'Festival de Inverno Curitiba', status: 'Ativo' });

  // Auto-scroll AI chat to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  // Toast helper
  const triggerToast = (title, body, type = 'success') => {
    setToast({ show: true, title, body, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  // Fake Install Application
  const handleInstallApp = (appId, appName) => {
    setInstalledApps(prev => ({ ...prev, [appId]: 'installing' }));
    
    setTimeout(() => {
      setInstalledApps(prev => ({ ...prev, [appId]: true }));
      triggerToast(
        "Módulo Ativado!",
        `O módulo de ${appName} foi instalado com sucesso. Uma nova aba foi adicionada à sua barra lateral!`
      );
    }, 2000);
  };

  // Switch Plan Upgrade
  const handleUpgradePlan = (planId, planName) => {
    setPlan(planId);
    triggerToast(
      "Upgrade Concluído! 🎉",
      `Sua conta DiskHub foi atualizada para o plano ${planName} com sucesso.`
    );
  };

  // CRM Kanban state transitions
  const moveLeadStage = (leadId, currentStage) => {
    const stages = ['prospect', 'qualified', 'negotiation', 'won'];
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1];
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: nextStage } : l));
      
      // If won, add to clients list
      if (nextStage === 'won') {
        const lead = leads.find(l => l.id === leadId);
        if (lead) {
          const newClientItem = {
            id: `c-${Date.now()}`,
            name: lead.name,
            company: lead.company,
            email: `${lead.name.toLowerCase().replace(' ', '.')}@${lead.company.toLowerCase().replace(' ', '')}.com`,
            phone: '(41) 99999-0000',
            spend: lead.value,
            status: 'Ativo'
          };
          setClients(prev => [...prev, newClientItem]);
          triggerToast(
            "Lead Ganho! 🏆",
            `${lead.name} da ${lead.company} foi convertido em cliente ativo!`
          );
        }
      } else {
        triggerToast("Progresso de Venda", "Lead avançado para a próxima etapa do funil.");
      }
    }
  };

  const deleteLead = (leadId) => {
    setLeads(prev => prev.filter(l => l.id !== leadId));
    triggerToast("Lead Removido", "Lead deletado do funil de vendas.", "warning");
  };

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.company || !newLead.value) {
      triggerToast("Erro", "Preencha todos os campos obrigatórios.", "warning");
      return;
    }
    const val = parseFloat(newLead.value);
    const addedLead = {
      id: `lead-${Date.now()}`,
      name: newLead.name,
      company: newLead.company,
      value: val,
      stage: newLead.stage,
      date: 'Hoje',
      tag: newLead.tag
    };
    setLeads(prev => [...prev, addedLead]);
    setShowAddLeadModal(false);
    setNewLead({ name: '', company: '', value: '', stage: 'prospect', tag: 'Novo' });
    triggerToast("Sucesso", "Novo lead adicionado ao funil de vendas.");
  };

  // Reconcile item
  const handleReconcile = (itemId) => {
    setConciliationItems(prev => prev.map(item => {
      if (item.id === itemId) {
        // Adjust financial stats based on conciliation
        setFinancialStats(stats => {
          const isIncoming = item.type === 'in';
          const val = item.amount;
          return {
            ...stats,
            saldo: isIncoming ? stats.saldo + val : stats.saldo - val
          };
        });
        return { ...item, matched: true };
      }
      return item;
    }));
    triggerToast("Conciliação Confirmada", "Transação bancária vinculada com sucesso à nota fiscal.");
  };

  // Create client
  const handleCreateClient = (e) => {
    e.preventDefault();
    if (!newClient.name || !newClient.company || !newClient.email) {
      triggerToast("Erro", "Preencha os campos obrigatórios.", "warning");
      return;
    }
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
    triggerToast("Sucesso", "Novo cliente cadastrado com sucesso.");
  };

  // Create Coupon
  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.discount) {
      triggerToast("Erro", "Preencha todos os campos obrigatórios.", "warning");
      return;
    }
    const addedCoupon = {
      id: `coup-${Date.now()}`,
      code: newCoupon.code.toUpperCase(),
      discount: parseInt(newCoupon.discount),
      event: newCoupon.event,
      status: newCoupon.status,
      usages: 0
    };
    setCoupons(prev => [addedCoupon, ...prev]);
    setShowAddCouponModal(false);
    setNewCoupon({ code: '', discount: '', event: 'Festival de Inverno Curitiba', status: 'Ativo' });
    triggerToast("Sucesso", "Novo cupom promocional gerado.");
  };

  // Toggle Coupon Status
  const toggleCouponStatus = (couponId) => {
    setCoupons(prev => prev.map(c => {
      if (c.id === couponId) {
        const nextStatus = c.status === 'Ativo' ? 'Inativo' : 'Ativo';
        triggerToast("Cupom Atualizado", `O cupom ${c.code} foi marcado como ${nextStatus}.`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  // AI Chat simulation response
  const triggerAIResponse = (scenario) => {
    // Command labels
    const prompts = {
      conciliacao: "🔍 Fazer Conciliação Automática",
      dre: "📊 Gerar DRE de Julho",
      spread: "💸 Calcular Spread dos Gateway",
      fluxo: "📉 Simular Fluxo de Caixa 45 dias",
      relatorio: "📋 Criar Relatório de Vendas",
      eventos: "🎫 Maior Lucro Recente"
    };

    const userMessage = prompts[scenario] || scenario;
    
    // Add user message
    const userMsgObj = {
      id: Date.now(),
      sender: 'user',
      text: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, userMsgObj]);
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      setIsTyping(false);
      let aiText = '';
      let html = null;

      switch(scenario) {
        case 'conciliacao':
          aiText = 'Varredura contábil automática concluída. Verifiquei as faturas do sistema contra a conta de recebíveis.';
          html = (
            <div className="mt-2 p-2 bg-slate-950 border border-slate-800 rounded-lg text-[10px] space-y-1 font-mono">
              <p className="text-emerald-400">✓ 5 transações localizadas no extrato bancário</p>
              <p className="text-emerald-400">✓ 5 Notas Fiscais correspondentes vinculadas no ERP</p>
              <button 
                onClick={() => {
                  setConciliationItems(prev => prev.map(item => ({ ...item, matched: true })));
                  triggerToast("Sucesso", "Todas as transações foram conciliadas automaticamente!");
                }}
                className="w-full mt-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold transition-all"
              >
                Efetuar Conciliação de Todos os Lotes
              </button>
            </div>
          );
          break;
        case 'dre':
          aiText = `A Demonstração do Resultado do Exercício (DRE) consolidada para **Julho/2026** foi computada pelo módulo de contabilidade.`;
          html = (
            <div className="mt-2 overflow-x-auto border border-slate-800 rounded-lg">
              <table className="w-full text-[10px] text-slate-300 font-mono">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold"><th className="p-1.5 text-left">Item DRE</th><th className="p-1.5 text-right">Valor</th></tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-900"><td className="p-1.5">Receita Bruta</td><td className="p-1.5 text-right text-emerald-400">R$ 2.580.000</td></tr>
                  <tr className="border-b border-slate-900"><td className="p-1.5">(-) Impostos & Gateway</td><td className="p-1.5 text-right text-pink-400">-R$ 387.000</td></tr>
                  <tr className="border-b border-slate-900"><td className="p-1.5">(-) Custos de Evento</td><td className="p-1.5 text-right text-pink-400">-R$ 1.713.000</td></tr>
                  <tr className="bg-indigo-950/20 font-bold"><td className="p-1.5 text-white">Lucro Líquido</td><td className="p-1.5 text-right text-indigo-300">R$ 480.000</td></tr>
                </tbody>
              </table>
            </div>
          );
          break;
        case 'spread':
          aiText = 'Auditoria de Spread dos Recebíveis (Disk Business One) concluída. Veja a economia estimada com a antecipação inteligente:';
          html = (
            <div className="mt-2 p-3 bg-slate-950 border border-slate-800 rounded-lg text-[10px] space-y-1.5 text-slate-300">
              <p>• Taxa Média de Mercado: <strong className="text-pink-400">2.1% a.m.</strong></p>
              <p>• Taxa Especial Disk Digital: <strong className="text-emerald-400">1.4% a.m.</strong></p>
              <hr className="border-slate-800 my-1" />
              <p className="text-emerald-400 font-bold">✓ Redução de custo financeiro: Economia de R$ 18.240,00 neste ciclo.</p>
            </div>
          );
          break;
        case 'fluxo':
          aiText = 'Simulação e projeção de fluxo de caixa acumulado baseada nas vendas de ingressos para os próximos meses:';
          html = (
            <div className="mt-2 p-2 bg-slate-950 border border-slate-800 rounded-lg text-[10px] text-indigo-300 font-mono space-y-1">
              <p>Julho (Histórico): R$ 950.000</p>
              <p>Agosto (Forecast): R$ 1.120.000 (+17.8%)</p>
              <p>Setembro (Previsão): R$ 1.450.000 (+29.4%)</p>
            </div>
          );
          break;
        case 'relatorio':
          aiText = 'Relatório executivo compilado. O arquivo contém a evolução das vendas do CRM e o balanço financeiro.';
          html = (
            <div className="mt-2 p-2 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-indigo-400" />
                <span className="text-[10px] text-slate-300 font-mono">relatorio_executivo_crm.pdf</span>
              </div>
              <button 
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-[9px] px-2 py-1 rounded font-semibold transition-all"
                onClick={() => triggerToast('Download Iniciado', 'Arquivo baixado com sucesso!')}
              >
                Baixar
              </button>
            </div>
          );
          break;
        case 'eventos':
          aiText = 'Listei os eventos de maior relevância financeira baseados no total faturado no último trimestre:';
          html = (
            <ol className="mt-2 space-y-1 text-[10px] text-slate-300 list-decimal list-inside">
              <li><strong>Festival de Inverno Curitiba</strong> - Margem: 34% (Faturamento: R$ 1.25M)</li>
              <li><strong>Metal Fest 2026</strong> - Margem: 28% (Faturamento: R$ 820k)</li>
              <li><strong>Embafeste VIP Show</strong> - Margem: 22% (Faturamento: R$ 510k)</li>
            </ol>
          );
          break;
        default:
          // Keyword parsing for custom user text
          const query = userMessage.toLowerCase();
          if (query.includes('receita') || query.includes('faturamento') || query.includes('lucro')) {
            aiText = `A receita consolidada de julho de 2026 é de **R$ 2.580.000**, com lucro líquido final de **R$ 480.000** (margem de 18.6%).`;
          } else if (query.includes('lead') || query.includes('crm') || query.includes('venda')) {
            const count = leads.length;
            const totalVal = leads.reduce((acc, curr) => acc + curr.value, 0);
            aiText = `O funil do CRM de vendas possui atualmente **${count} contatos** no pipeline, somando um valor potencial de **R$ ${totalVal.toLocaleString('pt-BR')}** sob negociação.`;
          } else if (query.includes('plano') || query.includes('upgrade') || query.includes('preço')) {
            aiText = `Você está atualmente no plano **${plan.toUpperCase()}**. Oferecemos os planos *Advanced* (ideal para automatizações e DRE) e *Expert* (inclui Disk AI Copilot integrado e conciliação multibanco). Acesse a aba **Planos & Upgrades** para saber mais.`;
          } else {
            aiText = `Compreendi a sua pergunta sobre "${userMessage}". Como copiloto financeiro, recomendo conferir a aba de **Gestão Financeira (ERP)** para conciliar os lançamentos ou rodar o comando 📊 **Gerar DRE** para verificar os lucros.`;
          }
      }

      const aiMsgObj = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiText,
        htmlResponse: html,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsgObj]);
    }, 1200);
  };

  const handleSendCustomText = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const text = userInput;
    setUserInput('');
    triggerAIResponse(text);
  };

  return (
    <div className="flex-1 flex bg-slate-950 text-slate-100 min-h-screen overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 z-30">
        <div>
          {/* Logo Area */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold tracking-tight text-white flex items-center">
                  DISK<span className="text-indigo-400 font-normal ml-0.5">HUB</span>
                </h1>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">ERP & CRM Cloud</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5">
            <button 
              onClick={() => setCurrentTab('dashboard')} 
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                currentTab === 'dashboard' 
                  ? 'bg-indigo-600/15 text-indigo-400 border-indigo-500/30 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-transparent'
              }`}
            >
              <BarChart3 className="w-5 h-5 shrink-0" />
              <span>Dashboard</span>
            </button>

            <button 
              onClick={() => setCurrentTab('financeiro')} 
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                currentTab === 'financeiro' 
                  ? 'bg-indigo-600/15 text-indigo-400 border-indigo-500/30 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-transparent'
              }`}
            >
              <CreditCard className="w-5 h-5 shrink-0" />
              <div className="flex items-center justify-between w-full">
                <span>Financeiro (ERP)</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {conciliationItems.filter(i => !i.matched).length}
                </span>
              </div>
            </button>

            {/* Dynamic CRM option */}
            {installedApps.crm === true && (
              <button 
                onClick={() => setCurrentTab('crm')} 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  currentTab === 'crm' 
                    ? 'bg-indigo-600/15 text-indigo-400 border-indigo-500/30 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-transparent'
                }`}
              >
                <Users className="w-5 h-5 shrink-0" />
                <div className="flex items-center justify-between w-full">
                  <span>CRM de Vendas</span>
                  <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {leads.filter(l => l.stage !== 'won').length}
                  </span>
                </div>
              </button>
            )}

            {/* Dynamic Marketing option */}
            {installedApps.mkt === true && (
              <button 
                onClick={() => setCurrentTab('marketing')} 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  currentTab === 'marketing' 
                    ? 'bg-indigo-600/15 text-indigo-400 border-indigo-500/30 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-transparent'
                }`}
              >
                <Mail className="w-5 h-5 shrink-0" />
                <span>Mkt & Cupons</span>
              </button>
            )}

            <button 
              onClick={() => setCurrentTab('appstore')} 
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                currentTab === 'appstore' 
                  ? 'bg-indigo-600/15 text-indigo-400 border-indigo-500/30 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-transparent'
              }`}
            >
              <ShoppingBag className="w-5 h-5 shrink-0" />
              <div className="flex items-center justify-between w-full">
                <span>Central de Apps</span>
                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {Object.values(installedApps).filter(val => val === false).length}
                </span>
              </div>
            </button>

            <button 
              onClick={() => setCurrentTab('marketplace')} 
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                currentTab === 'marketplace' 
                  ? 'bg-indigo-600/15 text-indigo-400 border-indigo-500/30 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-transparent'
              }`}
            >
              <Sparkles className="w-5 h-5 shrink-0 text-amber-400 animate-pulse" />
              <span>Planos & Upgrades</span>
            </button>
          </nav>
        </div>

        {/* Footer / User profile */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-650 border-2 border-indigo-500 flex items-center justify-center font-bold text-white shadow-md">
              V
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Vinicius</h4>
              <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                Plano {plan}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative pb-20 z-10">
        
        {/* HEADER */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Espaço de Trabalho</span>
            <span className="text-slate-600">/</span>
            <span className="text-sm font-semibold text-slate-250 capitalize">
              {currentTab === 'appstore' ? 'Central de Aplicativos' : currentTab === 'marketplace' ? 'Planos e Upgrades' : currentTab}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500" />
              </span>
              <input 
                type="text" 
                placeholder="Buscar no ecossistema..." 
                className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-350 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>
            
            {/* Notification Bell */}
            <button className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800/40 rounded-lg border border-slate-800/80 hover:bg-slate-800 relative transition-all">
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* VIEWS WRAPPER */}
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
            
          {/* 1. DASHBOARD VIEW */}
          {currentTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Intro Title & Date */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">Visão Geral de Performance</h2>
                  <p class="text-sm text-slate-400">Gerencie receitas, repasses e a saúde contábil dos seus eventos em tempo real.</p>
                </div>
                <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-350">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>Julho, 2026</span>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Receita */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 relative overflow-hidden shadow-md group hover:border-indigo-500/20 transition-all duration-300">
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Receita Total</span>
                    <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-2xl font-extrabold text-slate-50 tracking-tight">R$ {financialStats.receita.toLocaleString('pt-BR')}</span>
                    <div className="flex items-center space-x-1 mt-2">
                      <span className="text-xs font-semibold text-emerald-400 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-0.5" />
                        14.2%
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">vs último mês</span>
                    </div>
                  </div>
                </div>

                {/* Saldo */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 relative overflow-hidden shadow-md group hover:border-indigo-500/20 transition-all duration-300">
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saldo Disponível</span>
                    <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
                      <Landmark className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-2xl font-extrabold text-slate-50 tracking-tight">R$ {financialStats.saldo.toLocaleString('pt-BR')}</span>
                    <div className="flex items-center space-x-1 mt-2">
                      <span className="text-[10px] text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-full">Pronto para saque</span>
                    </div>
                  </div>
                </div>

                {/* Repasses */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 relative overflow-hidden shadow-md group hover:border-indigo-500/20 transition-all duration-300">
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10 transition-all"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Repasses Efetuados</span>
                    <div className="p-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-lg">
                      <ArrowRightLeft className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-2xl font-extrabold text-slate-50 tracking-tight">R$ {financialStats.repasses.toLocaleString('pt-BR')}</span>
                    <div className="flex items-center space-x-1 mt-2">
                      <span className="text-xs font-semibold text-violet-400 flex items-center">8.3%</span>
                      <span className="text-[10px] text-slate-500 font-medium">Agendados para amanhã</span>
                    </div>
                  </div>
                </div>

                {/* Lucro */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 relative overflow-hidden shadow-md group hover:border-indigo-500/20 transition-all duration-300">
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/10 transition-all"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lucro Líquido</span>
                    <div className="p-1.5 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-lg">
                      <Percent className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-2xl font-extrabold text-slate-50 tracking-tight">R$ {financialStats.lucro.toLocaleString('pt-BR')}</span>
                    <div className="flex items-center space-x-1 mt-2">
                      <span className="text-xs font-semibold text-pink-400 flex items-center">18.6%</span>
                      <span className="text-[10px] text-slate-500 font-medium">Margem Operacional</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphs & Analytics Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Fluxo de Caixa (SVG Chart) */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 lg:col-span-2 shadow-md">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-200">Fluxo de Caixa Mensal</h3>
                      <p className="text-xs text-slate-400">Projeção e balanço de receitas no período</p>
                    </div>
                    <div className="flex items-center space-x-4 text-[10px] font-semibold">
                      <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 bg-indigo-500 rounded-full inline-block"></span><span className="text-slate-400">Receita</span></span>
                      <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 bg-pink-500 rounded-full inline-block"></span><span className="text-slate-400">Repasses</span></span>
                    </div>
                  </div>
                  
                  {/* Simple High-Fidelity Inline SVG Line Graph to avoid script overhead */}
                  <div className="relative w-full h-48 mt-4">
                    <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="indigo-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="pink-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2"/>
                          <stop offset="100%" stopColor="#ec4899" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      {/* Grid Lines */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="4,4" strokeWidth="1"/>
                      <line x1="0" y1="75" x2="500" y2="75" stroke="#1e293b" strokeDasharray="4,4" strokeWidth="1"/>
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#1e293b" strokeDasharray="4,4" strokeWidth="1"/>
                      
                      {/* Area Indigo */}
                      <path d="M 0 150 Q 100 80, 200 110 T 400 40 L 500 60 L 500 150 L 0 150 Z" fill="url(#indigo-grad)"/>
                      {/* Line Indigo */}
                      <path d="M 0 150 Q 100 80, 200 110 T 400 40 L 500 60" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round"/>
                      
                      {/* Area Pink */}
                      <path d="M 0 150 Q 120 120, 240 130 T 420 80 L 500 110 L 500 150 L 0 150 Z" fill="url(#pink-grad)"/>
                      {/* Line Pink */}
                      <path d="M 0 150 Q 120 120, 240 130 T 420 80 L 500 110" fill="none" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-semibold">
                    <span>JAN</span>
                    <span>FEV</span>
                    <span>MAR</span>
                    <span>ABR</span>
                    <span>MAI</span>
                    <span>JUN</span>
                    <span>JUL</span>
                  </div>
                </div>

                {/* Eventos com Maior Margem */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 shadow-md flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 mb-4">Eventos em Destaque</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-slate-850">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-400 text-xs">
                            F
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-slate-200">Festival de Inverno Curitiba</h4>
                            <p className="text-[10px] text-slate-500">Parque Jaime Lerner</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-indigo-400">R$ 1.250M</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-slate-850">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded bg-pink-500/10 flex items-center justify-center font-bold text-pink-400 text-xs">
                            M
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-slate-200">Metal Fest 2026</h4>
                            <p className="text-[10px] text-slate-500">Video Promo e Live Show</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-pink-400">R$ 820k</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-slate-850">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded bg-purple-500/10 flex items-center justify-center font-bold text-purple-400 text-xs">
                            E
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-slate-200">Embafeste Premium</h4>
                            <p className="text-[10px] text-slate-500">Showroom Comercial</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-purple-400">R$ 510k</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                    <button onClick={() => setCurrentTab('marketplace')} className="text-xs font-bold text-indigo-400 hover:text-indigo-300 inline-flex items-center hover:underline">
                      Expandir módulos de inteligência
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. GESTÃO FINANCEIRA (ERP) VIEW */}
          {currentTab === 'financeiro' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">Gestão Financeira & Conciliação</h2>
                  <p class="text-sm text-slate-400">Valide os lançamentos contábeis, emita demonstrativos (DRE) e audite extratos bancários.</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      setConciliationItems(prev => prev.map(item => ({ ...item, matched: false })));
                      triggerToast("Filtros Limpos", "Todas as conciliações foram resetadas para teste.");
                    }}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Resetar Teste</span>
                  </button>
                </div>
              </div>

              {/* Sub-grid: Conciliation Table & DRE */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Conciliation Table */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 lg:col-span-2 shadow-md space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <Landmark className="w-4 h-4 text-indigo-400" />
                      <h3 className="text-sm font-bold text-slate-200">Conciliação de Extrato Bancário</h3>
                    </div>
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-300 font-bold px-2 py-0.5 rounded-full">
                      {conciliationItems.filter(i => !i.matched).length} pendentes
                    </span>
                  </div>

                  <div className="space-y-3">
                    {conciliationItems.map((item) => (
                      <div 
                        key={item.id} 
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                          item.matched 
                            ? 'bg-slate-950/20 border-slate-850/60 opacity-60' 
                            : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-1.5 rounded-md ${
                            item.type === 'in' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-pink-500/10 text-pink-400'
                          }`}>
                            {item.type === 'in' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowRightLeft className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-xs font-semibold text-slate-200">{item.desc}</h4>
                              <span className="text-[9px] text-slate-500 font-mono">{item.date}</span>
                            </div>
                            <p className="text-[10px] text-indigo-400/80 font-mono mt-0.5">Vínculo: {item.matchInvoice}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className={`text-xs font-mono font-bold ${
                            item.type === 'in' ? 'text-emerald-400' : 'text-pink-400'
                          }`}>
                            {item.type === 'in' ? '+' : '-'} R$ {item.amount.toLocaleString('pt-BR')}
                          </span>
                          
                          {item.matched ? (
                            <div className="flex items-center space-x-1 text-emerald-400 text-[10px] font-bold">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Conciliado</span>
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleReconcile(item.id)}
                              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-[10px] font-bold rounded transition-all"
                            >
                              Conciliar
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive DRE Panel */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-indigo-400" />
                        <h3 className="text-sm font-bold text-slate-200">Emissão de DRE</h3>
                      </div>
                      
                      <select 
                        value={dreMonth} 
                        onChange={(e) => setDreMonth(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded text-[10px] font-semibold text-slate-350 p-1 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Julho">Julho 2026</option>
                        <option value="Junho">Junho 2026</option>
                        <option value="Maio">Maio 2026</option>
                      </select>
                    </div>

                    {/* DRE calculation simulation */}
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex justify-between p-1.5 rounded hover:bg-slate-950/30">
                        <span className="text-slate-400">Receita Bruta</span>
                        <span className="text-emerald-400 font-semibold">
                          R$ {dreMonth === 'Julho' ? '2.580.000' : dreMonth === 'Junho' ? '1.920.000' : '1.450.000'}
                        </span>
                      </div>
                      <div className="flex justify-between p-1.5 rounded hover:bg-slate-950/30">
                        <span className="text-slate-400">(-) Impostos & Gateway</span>
                        <span className="text-pink-400">
                          -R$ {dreMonth === 'Julho' ? '387.000' : dreMonth === 'Junho' ? '288.000' : '217.500'}
                        </span>
                      </div>
                      <div className="flex justify-between p-1.5 rounded hover:bg-slate-950/30">
                        <span className="text-slate-400">(-) Custos Operacionais</span>
                        <span className="text-pink-400">
                          -R$ {dreMonth === 'Julho' ? '1.713.000' : dreMonth === 'Junho' ? '1.272.000' : '960.000'}
                        </span>
                      </div>
                      <div className="border-t border-slate-800 my-2 pt-2 flex justify-between p-1.5 bg-indigo-950/20 rounded">
                        <span className="font-bold text-white">Lucro Líquido</span>
                        <span className="font-bold text-indigo-300">
                          R$ {dreMonth === 'Julho' ? '480.000' : dreMonth === 'Junho' ? '360.000' : '272.500'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <button 
                      onClick={() => triggerToast("Relatório Pronto", `A DRE de ${dreMonth} de 2026 foi exportada para planilha de auditoria.`)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Exportar Planilha DRE</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. CRM DE VENDAS VIEW */}
          {currentTab === 'crm' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">CRM de Vendas</h2>
                  <p class="text-sm text-slate-400">Gerencie contatos de produtores, qualifique leads e acompanhe o pipeline de vendas.</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowAddLeadModal(true)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-600/10"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Lead</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowAddClientModal(true)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 rounded-lg text-xs font-bold transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Cadastrar Cliente</span>
                  </button>
                </div>
              </div>

              {/* Kanban Pipeline Board */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Stage 1: Prospect */}
                <div className="bg-slate-900/50 border border-slate-850 rounded-xl p-4 flex flex-col space-y-3 min-h-[400px]">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prospecção</span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300 font-bold">
                      {leads.filter(l => l.stage === 'prospect').length}
                    </span>
                  </div>
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {leads.filter(l => l.stage === 'prospect').map(lead => (
                      <div key={lead.id} className="bg-slate-900 border border-slate-800 hover:border-indigo-500/30 p-3 rounded-lg shadow space-y-2 group transition-all">
                        <div className="flex justify-between items-start">
                          <span className="text-[8px] bg-indigo-500/20 text-indigo-300 font-bold px-1.5 py-0.5 rounded uppercase">{lead.tag}</span>
                          <button onClick={() => deleteLead(lead.id)} className="text-slate-500 hover:text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{lead.name}</h4>
                          <p className="text-[10px] text-slate-400">{lead.company}</p>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-850">
                          <span className="text-[10px] font-mono font-bold text-slate-300">R$ {lead.value.toLocaleString('pt-BR')}</span>
                          <button 
                            onClick={() => moveLeadStage(lead.id, lead.stage)}
                            className="p-1 bg-slate-850 hover:bg-indigo-650 hover:text-white rounded text-slate-400 transition-all"
                            title="Avançar no funil"
                          >
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage 2: Qualified */}
                <div className="bg-slate-900/50 border border-slate-850 rounded-xl p-4 flex flex-col space-y-3 min-h-[400px]">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Qualificado</span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300 font-bold">
                      {leads.filter(l => l.stage === 'qualified').length}
                    </span>
                  </div>
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {leads.filter(l => l.stage === 'qualified').map(lead => (
                      <div key={lead.id} className="bg-slate-900 border border-slate-800 hover:border-indigo-500/30 p-3 rounded-lg shadow space-y-2 group transition-all">
                        <div className="flex justify-between items-start">
                          <span className="text-[8px] bg-indigo-500/20 text-indigo-300 font-bold px-1.5 py-0.5 rounded uppercase">{lead.tag}</span>
                          <button onClick={() => deleteLead(lead.id)} className="text-slate-500 hover:text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{lead.name}</h4>
                          <p className="text-[10px] text-slate-400">{lead.company}</p>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-850">
                          <span className="text-[10px] font-mono font-bold text-slate-300">R$ {lead.value.toLocaleString('pt-BR')}</span>
                          <button 
                            onClick={() => moveLeadStage(lead.id, lead.stage)}
                            className="p-1 bg-slate-850 hover:bg-indigo-650 hover:text-white rounded text-slate-400 transition-all"
                          >
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage 3: Negotiation */}
                <div className="bg-slate-900/50 border border-slate-850 rounded-xl p-4 flex flex-col space-y-3 min-h-[400px]">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Negociação</span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300 font-bold">
                      {leads.filter(l => l.stage === 'negotiation').length}
                    </span>
                  </div>
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {leads.filter(l => l.stage === 'negotiation').map(lead => (
                      <div key={lead.id} className="bg-slate-900 border border-slate-800 hover:border-indigo-500/30 p-3 rounded-lg shadow space-y-2 group transition-all">
                        <div className="flex justify-between items-start">
                          <span className="text-[8px] bg-indigo-500/20 text-indigo-300 font-bold px-1.5 py-0.5 rounded uppercase">{lead.tag}</span>
                          <button onClick={() => deleteLead(lead.id)} className="text-slate-500 hover:text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{lead.name}</h4>
                          <p className="text-[10px] text-slate-400">{lead.company}</p>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-850">
                          <span className="text-[10px] font-mono font-bold text-slate-300">R$ {lead.value.toLocaleString('pt-BR')}</span>
                          <button 
                            onClick={() => moveLeadStage(lead.id, lead.stage)}
                            className="p-1 bg-emerald-650 hover:bg-emerald-500 text-white rounded transition-all"
                            title="Fechar negócio"
                          >
                            <CheckCircle className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage 4: Won */}
                <div className="bg-slate-900/50 border border-slate-850 rounded-xl p-4 flex flex-col space-y-3 min-h-[400px]">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fechado / Ganho</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                      {leads.filter(l => l.stage === 'won').length}
                    </span>
                  </div>
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {leads.filter(l => l.stage === 'won').map(lead => (
                      <div key={lead.id} className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-lg shadow space-y-2 transition-all">
                        <div className="flex justify-between items-start">
                          <span className="text-[8px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded uppercase">Convertido</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-105">{lead.name}</h4>
                          <p className="text-[10px] text-slate-400">{lead.company}</p>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-emerald-900/30">
                          <span className="text-[10px] font-mono font-bold text-emerald-400">R$ {lead.value.toLocaleString('pt-BR')}</span>
                          <span className="text-[9px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">Ganho</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Client List Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200">Lista Completa de Clientes / Contatos</h3>
                  <span className="text-xs text-slate-400">{clients.length} cadastrados</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-slate-350 border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-bold text-left">
                        <th className="p-3">Nome / Contato</th>
                        <th className="p-3">Empresa</th>
                        <th className="p-3">E-mail</th>
                        <th className="p-3">Telefone</th>
                        <th className="p-3 text-right">Volume Negociado</th>
                        <th className="p-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map(client => (
                        <tr key={client.id} className="border-b border-slate-850 hover:bg-slate-950/20 transition-all">
                          <td className="p-3 font-semibold text-white">{client.name}</td>
                          <td className="p-3">{client.company}</td>
                          <td className="p-3 font-mono text-[10px]">{client.email}</td>
                          <td className="p-3 font-mono">{client.phone}</td>
                          <td className="p-3 text-right font-mono font-semibold text-indigo-300">
                            {client.spend > 0 ? `R$ ${client.spend.toLocaleString('pt-BR')}` : '-'}
                          </td>
                          <td className="p-3 text-center">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              client.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                            }`}>
                              {client.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 4. MARKETING & CUPONS VIEW */}
          {currentTab === 'marketing' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">Marketing & Cupons Promocionais</h2>
                  <p class="text-sm text-slate-400">Gere cupons promocionais para seus eventos e dispare campanhas integradas.</p>
                </div>
                <div>
                  <button 
                    onClick={() => setShowAddCouponModal(true)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-600/10"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Gerar Novo Cupom</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Coupons Manager */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 lg:col-span-2 shadow-md space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-bold text-slate-200">Cupons de Desconto Criados</h3>
                    <span className="text-[10px] text-slate-400">{coupons.length} cupons</span>
                  </div>

                  <div className="space-y-3">
                    {coupons.map(coupon => (
                      <div key={coupon.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/40 border border-slate-850 hover:border-slate-750 transition-all">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded bg-indigo-600/10 text-indigo-400 font-bold flex items-center justify-center text-xs">
                            {coupon.discount}%
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-mono font-bold text-white tracking-wider">{coupon.code}</span>
                              <span className="text-[9px] text-slate-500">{coupon.event}</span>
                            </div>
                            <p className="text-[9px] text-slate-400 mt-0.5">{coupon.usages} utilizações registradas</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full ${
                            coupon.status === 'Ativo' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-800 text-slate-500'
                          }`}>
                            {coupon.status}
                          </span>
                          <button 
                            onClick={() => toggleCouponStatus(coupon.id)}
                            className={`px-2 py-1 text-[10px] font-semibold rounded border transition-all ${
                              coupon.status === 'Ativo'
                                ? 'border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white border-transparent'
                            }`}
                          >
                            {coupon.status === 'Ativo' ? 'Pausar' : 'Reativar'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Campaigns Summary Panel */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="text-sm font-bold text-slate-200">Campanhas Ativas</h3>
                      <span className="text-[9px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded">E-mail</span>
                    </div>

                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-850/60">
                        <h4 className="text-xs font-bold text-white">Festival Inverno - Pré-Venda VIP</h4>
                        <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
                          <span>Aberturas: 82%</span>
                          <span>Cliques: 24%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                          <div className="bg-indigo-500 h-full rounded-full" style={{ width: '82%' }}></div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-850/60">
                        <h4 className="text-xs font-bold text-white">Metal Fest - Lote 1 Prorrogado</h4>
                        <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
                          <span>Aberturas: 54%</span>
                          <span>Cliques: 12%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                          <div className="bg-pink-500 h-full rounded-full" style={{ width: '54%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => triggerToast("Envio Programado", "Campanha de e-mail marketing agendada para às 19:00.")}
                    className="mt-6 w-full py-2 bg-indigo-650 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all"
                  >
                    Novo Disparo em Massa
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* 5. APP STORE VIEW (CENTRAL DE APLICATIVOS) */}
          {currentTab === 'appstore' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">Central de Aplicativos</h2>
                <p class="text-sm text-slate-400">Gerencie e ative novos módulos de produtividade integrados ao seu ecossistema.</p>
              </div>

              {/* Grid of Apps */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Financeiro */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-750 transition-all duration-300">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Instalado</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-200">Financeiro</h3>
                    <p class="text-xs text-slate-400 mt-1">Gestão de caixa, fluxo financeiro, conciliações e pagamentos.</p>
                  </div>
                  <button disabled className="mt-6 w-full py-2 bg-slate-800 text-slate-500 text-xs font-bold rounded-lg cursor-not-allowed flex items-center justify-center">
                    Ativo no Menu
                  </button>
                </div>

                {/* Contabilidade */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-750 transition-all duration-300">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
                        <Landmark className="w-6 h-6" />
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Instalado</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-200">Contabilidade</h3>
                    <p class="text-xs text-slate-400 mt-1">Emissão automática de notas, escrituração fiscal e integração bancária.</p>
                  </div>
                  <button disabled className="mt-6 w-full py-2 bg-slate-800 text-slate-500 text-xs font-bold rounded-lg cursor-not-allowed flex items-center justify-center">
                    Ativo no Menu
                  </button>
                </div>

                {/* CRM */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 group">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform duration-200">
                        <Users className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        installedApps.crm === true 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : 'bg-indigo-500/10 text-indigo-400'
                      }`}>
                        {installedApps.crm === true ? 'Instalado' : 'Disponível'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-200">CRM de Vendas</h3>
                    <p class="text-xs text-slate-400 mt-1">Gerencie leads, campanhas de pré-venda e histórico de compras dos produtores.</p>
                  </div>
                  
                  {installedApps.crm === true ? (
                    <button disabled className="mt-6 w-full py-2 bg-slate-800 text-slate-500 text-xs font-bold rounded-lg cursor-not-allowed flex items-center justify-center">
                      Módulo Habilitado
                    </button>
                  ) : installedApps.crm === 'installing' ? (
                    <button disabled className="mt-6 w-full py-2 bg-slate-800 text-slate-400 text-xs font-bold rounded-lg flex items-center justify-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Instalando...</span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleInstallApp('crm', 'CRM de Vendas')} 
                      className="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center"
                    >
                      Instalar Módulo
                    </button>
                  )}
                </div>

                {/* Marketing */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 group">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-sky-500/10 rounded-lg flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform duration-200">
                        <Mail className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        installedApps.mkt === true 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : 'bg-indigo-500/10 text-indigo-400'
                      }`}>
                        {installedApps.mkt === true ? 'Instalado' : 'Disponível'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-200">Marketing Automação</h3>
                    <p class="text-xs text-slate-400 mt-1">Automação de e-mails, campanhas promocionais e cupons customizados.</p>
                  </div>
                  
                  {installedApps.mkt === true ? (
                    <button disabled className="mt-6 w-full py-2 bg-slate-800 text-slate-500 text-xs font-bold rounded-lg cursor-not-allowed flex items-center justify-center">
                      Módulo Habilitado
                    </button>
                  ) : installedApps.mkt === 'installing' ? (
                    <button disabled className="mt-6 w-full py-2 bg-slate-800 text-slate-400 text-xs font-bold rounded-lg flex items-center justify-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Instalando...</span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleInstallApp('mkt', 'Marketing Automação')} 
                      className="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center"
                    >
                      Instalar Módulo
                    </button>
                  )}
                </div>

                {/* Inteligência Artificial */}
                <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-6 flex flex-col justify-between hover:border-indigo-500 transition-all duration-300 relative shadow-lg shadow-indigo-500/5 group">
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[9px] px-3 py-0.5 rounded-full font-extrabold uppercase tracking-widest shadow-md">
                    RECOMENDADO
                  </div>
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-200">
                        <Brain className="w-6 h-6 animate-pulse" />
                      </div>
                      <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Premium (Expert)</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-200">Disk AI Copilot</h3>
                    <p class="text-xs text-slate-400 mt-1">Copiloto financeiro de inteligência artificial. Gera DRE, relatórios complexos, e faz previsões.</p>
                  </div>
                  
                  {plan === 'expert' ? (
                    <button 
                      onClick={() => {
                        setChatOpen(true);
                        triggerToast("Copiloto Online", "O Disk AI Copilot foi ativado no canto inferior direito.");
                      }}
                      className="mt-6 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center"
                    >
                      Abrir AI Copilot
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        setCurrentTab('marketplace');
                        triggerToast("Módulo Bloqueado", "Adquira o Plano Expert para liberar a inteligência artificial.", "warning");
                      }}
                      className="mt-6 w-full py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center shadow-md shadow-indigo-600/20"
                    >
                      Liberar no Plano Expert
                    </button>
                  )}
                </div>

                {/* Open Finance */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 group">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform duration-200">
                        <Landmark className="w-6 h-6" />
                      </div>
                      <span className="bg-violet-500/20 text-violet-300 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Premium (Expert)</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-200">Open Finance Integrado</h3>
                    <p class="text-xs text-slate-400 mt-1">Conecte contas bancárias simultaneamente e gerencie o spread financeiro com segurança.</p>
                  </div>
                  
                  {plan === 'expert' ? (
                    <button 
                      onClick={() => triggerToast("Open Finance Conectado", "Varredura contábil multibanco integrada ao ERP.")}
                      className="mt-6 w-full py-2 bg-emerald-650 text-white text-xs font-bold rounded-lg flex items-center justify-center"
                    >
                      Sincronizar Contas
                    </button>
                  ) : (
                    <button 
                      onClick={() => setCurrentTab('marketplace')} 
                      className="mt-6 w-full py-2 bg-slate-800 hover:bg-slate-750 text-slate-350 hover:text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center"
                    >
                      Ver Planos de Upgrade
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 6. MARKETPLACE VIEW (PLANS & UPGRADES) */}
          {currentTab === 'marketplace' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Potencialize seu Negócio</h2>
                <p class="text-sm text-slate-400">Selecione o plano ideal para gerenciar, automatizar e aplicar inteligência avançada sobre seus resultados.</p>
              </div>

              {/* Pricing Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 max-w-5xl mx-auto">
                
                {/* Standard (Current) */}
                <div className={`bg-slate-900 border rounded-2xl p-8 flex flex-col justify-between relative hover:border-slate-700 transition-all ${
                  plan === 'standard' ? 'border-indigo-500' : 'border-slate-800'
                }`}>
                  {plan === 'standard' && (
                    <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 text-[10px] px-3 py-1 rounded-full font-bold tracking-wider">ATIVO</div>
                  )}
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Iniciante</span>
                    <h3 className="text-2xl font-extrabold text-white mt-2">Standard</h3>
                    <p class="text-xs text-slate-400 mt-2">O essencial para vendas de ingressos rápidas e conciliação básica.</p>
                    
                    <hr className="border-slate-800 my-6" />
                    
                    <ul className="space-y-4 text-xs text-slate-300">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Venda de Ingressos Integrada</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Dashboard de Performance Básico</span>
                      </li>
                      <li className="flex items-center space-x-3 text-slate-500">
                        <X className="w-4 h-4 text-slate-750 shrink-0" />
                        <span>Sem Automações Avançadas</span>
                      </li>
                      <li className="flex items-center space-x-3 text-slate-500">
                        <X className="w-4 h-4 text-slate-750 shrink-0" />
                        <span>Sem Copiloto de IA</span>
                      </li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => handleUpgradePlan('standard', 'Standard')}
                    disabled={plan === 'standard'} 
                    className={`mt-8 w-full py-3 text-sm font-bold rounded-xl transition-all ${
                      plan === 'standard' 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {plan === 'standard' ? 'Plano Atual' : 'Selecionar Standard'}
                  </button>
                </div>

                {/* Advanced */}
                <div className={`bg-slate-900 border rounded-2xl p-8 flex flex-col justify-between relative hover:border-indigo-500 transition-all shadow-xl ${
                  plan === 'advanced' ? 'border-indigo-500' : 'border-indigo-500/30'
                }`}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[10px] px-4 py-1 rounded-full font-bold tracking-widest shadow-md">RECOMENDADO</div>
                  {plan === 'advanced' && (
                    <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 text-[10px] px-3 py-1 rounded-full font-bold tracking-wider">ATIVO</div>
                  )}
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Profissional</span>
                    <h3 className="text-2xl font-extrabold text-white mt-2">Advanced</h3>
                    <p class="text-xs text-slate-400 mt-2">Perfeito para organizadores que precisam automatizar o financeiro e garantir DRE ágil.</p>
                    
                    <hr className="border-slate-800/80 my-6" />
                    
                    <ul className="space-y-4 text-xs text-slate-300">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Módulo de Automações Completo</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Conciliação Automatizada</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Geração Simplificada de DRE</span>
                      </li>
                      <li className="flex items-center space-x-3 text-slate-500">
                        <X className="w-4 h-4 text-slate-750 shrink-0" />
                        <span>Sem Copiloto de IA</span>
                      </li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => handleUpgradePlan('advanced', 'Advanced')}
                    disabled={plan === 'advanced'}
                    className={`mt-8 w-full py-3 text-sm font-bold rounded-xl transition-all ${
                      plan === 'advanced' 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-650/10'
                    }`}
                  >
                    {plan === 'advanced' ? 'Plano Atual' : 'Assinar Advanced'}
                  </button>
                </div>

                {/* Expert */}
                <div className={`bg-slate-900 border rounded-2xl p-8 flex flex-col justify-between relative hover:border-slate-700 transition-all ${
                  plan === 'expert' ? 'border-indigo-500' : 'border-slate-800'
                }`}>
                  {plan === 'expert' && (
                    <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 text-[10px] px-3 py-1 rounded-full font-bold tracking-wider">ATIVO</div>
                  )}
                  <div>
                    <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">Alta Escala</span>
                    <h3 className="text-2xl font-extrabold text-white mt-2">Expert</h3>
                    <p class="text-xs text-slate-400 mt-2">Para produtoras de alta performance que exigem IA de ponta, BI e auditoria de spread.</p>
                    
                    <hr className="border-slate-800 my-6" />
                    
                    <ul className="space-y-4 text-xs text-slate-300">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-semibold text-indigo-300">Disk AI Copilot Integrado</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Auditoria de Spread & Split de Notas</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>BI, Forecast de Venda e Inteligência Contábil</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Open Finance com Conciliação Multibanco</span>
                      </li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => handleUpgradePlan('expert', 'Expert')}
                    disabled={plan === 'expert'}
                    className={`mt-8 w-full py-3 text-sm font-bold rounded-xl transition-all ${
                      plan === 'expert' 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-600/10'
                    }`}
                  >
                    {plan === 'expert' ? 'Plano Atual' : 'Assinar Expert'}
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* NOTIFICATION TOAST */}
        {toast.show && (
          <div className="fixed bottom-6 left-6 z-50 bg-slate-900 border border-indigo-500/35 text-slate-100 px-5 py-4 rounded-xl shadow-2xl flex items-center space-x-3 transition-all duration-300 animate-slideUp">
            <div className="p-1 bg-indigo-500/20 text-indigo-400 rounded-lg shrink-0">
              <CheckCircle className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">{toast.title}</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">{toast.body}</p>
            </div>
          </div>
        )}

        {/* DISK AI WIDGET (COPILOT) */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            
          {/* Chat Window */}
          {chatOpen && (
            <div className="w-96 max-h-[500px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300 origin-bottom-right">
              {/* Chat Header */}
              <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Disk AI Copilot</h3>
                    <p className="text-[9px] text-emerald-400 font-medium flex items-center">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block mr-1"></span>
                      Online & Ativo
                    </p>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-slate-200">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 h-[280px]" id="chat-messages">
                {chatMessages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="w-6.5 h-6.5 rounded bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px] p-1.5 shrink-0">
                        AI
                      </div>
                    )}
                    <div className={`p-3 rounded-r-xl rounded-bl-xl max-w-[80%] border text-[11px] leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-indigo-600 border-indigo-500 text-white rounded-l-xl rounded-br-none' 
                        : 'bg-slate-950/80 border-slate-850 text-slate-350'
                    }`}>
                      <p>{msg.text}</p>
                      {msg.htmlResponse && msg.htmlResponse}
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-start space-x-2.5">
                    <div className="w-6.5 h-6.5 rounded bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px] p-1.5 shrink-0">
                      AI
                    </div>
                    <div className="bg-slate-950/80 border border-slate-850 p-3 rounded-r-xl rounded-bl-xl max-w-[80%]">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions Grid inside Chat */}
              <div className="p-3 bg-slate-950 border-t border-slate-850">
                <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold mb-2">Comandos Rápidos</p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => triggerAIResponse('conciliacao')} className="px-2 py-1.5 text-[10px] font-medium bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-600/5 text-slate-300 rounded text-left truncate transition-all">
                    🔍 Fazer Conciliação
                  </button>
                  <button onClick={() => triggerAIResponse('dre')} className="px-2 py-1.5 text-[10px] font-medium bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-600/5 text-slate-300 rounded text-left truncate transition-all">
                    📊 Gerar DRE
                  </button>
                  <button onClick={() => triggerAIResponse('spread')} className="px-2 py-1.5 text-[10px] font-medium bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-600/5 text-slate-300 rounded text-left truncate transition-all">
                    💸 Calcular Spread
                  </button>
                  <button onClick={() => triggerAIResponse('fluxo')} className="px-2 py-1.5 text-[10px] font-medium bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-600/5 text-slate-300 rounded text-left truncate transition-all">
                    📉 Simular Fluxo
                  </button>
                </div>
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendCustomText} className="p-2.5 bg-slate-900 border-t border-slate-800 flex space-x-2">
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Pergunte sobre receitas, vendas ou CRM..."
                  className="flex-1 bg-slate-950 border border-slate-850 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-indigo-500 text-slate-300"
                />
                <button type="submit" className="p-1 bg-indigo-600 hover:bg-indigo-500 rounded text-white active:scale-95 transition-all">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Chat Button Toggle */}
          <button 
            onClick={() => setChatOpen(!chatOpen)} 
            className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none"
          >
            <Brain className="w-6 h-6 animate-pulse" />
          </button>
        </div>

      </main>

      {/* ================= MODALS ================= */}
      
      {/* 1. ADD LEAD MODAL */}
      {showAddLeadModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
              <h3 className="text-sm font-bold text-white">Adicionar Lead ao Funil</h3>
              <button onClick={() => setShowAddLeadModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateLead} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Nome do Lead *</label>
                <input 
                  type="text" 
                  value={newLead.name}
                  onChange={(e) => setNewLead(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Vinícius Nogueira"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Nome da Produtora / Empresa *</label>
                <input 
                  type="text" 
                  value={newLead.company}
                  onChange={(e) => setNewLead(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Ex: Curitiba Show Eventos"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Valor Estimado (R$) *</label>
                  <input 
                    type="number" 
                    value={newLead.value}
                    onChange={(e) => setNewLead(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="Ex: 85000"
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Fase Inicial *</label>
                  <select 
                    value={newLead.stage}
                    onChange={(e) => setNewLead(prev => ({ ...prev, stage: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-350 font-medium"
                  >
                    <option value="prospect">Prospecção</option>
                    <option value="qualified">Qualificado</option>
                    <option value="negotiation">Negociação</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Tag de Classificação</label>
                <select 
                  value={newLead.tag}
                  onChange={(e) => setNewLead(prev => ({ ...prev, tag: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-350 font-medium"
                >
                  <option value="Novo">Novo</option>
                  <option value="VIP">VIP</option>
                  <option value="Quente">Quente</option>
                  <option value="Frio">Frio</option>
                  <option value="Alta Margem">Alta Margem</option>
                </select>
              </div>

              <div className="pt-4 flex space-x-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-lg transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-650 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg transition-all"
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
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
              <h3 className="text-sm font-bold text-white">Cadastrar Cliente Contato</h3>
              <button onClick={() => setShowAddClientModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateClient} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Nome Completo *</label>
                <input 
                  type="text" 
                  value={newClient.name}
                  onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Felipe Silveira"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Nome da Empresa *</label>
                <input 
                  type="text" 
                  value={newClient.company}
                  onChange={(e) => setNewClient(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Ex: Prime Eventos Ltda"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">E-mail de Contato *</label>
                <input 
                  type="email" 
                  value={newClient.email}
                  onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="felipe@empresa.com.br"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-350 font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Telefone</label>
                  <input 
                    type="text" 
                    value={newClient.phone}
                    onChange={(e) => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(41) 99888-0000"
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Status Inicial</label>
                  <select 
                    value={newClient.status}
                    onChange={(e) => setNewClient(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-350 font-medium"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Em Negociação">Em Negociação</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex space-x-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowAddClientModal(false)}
                  className="px-4 py-2 bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-lg transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-650 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg transition-all"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. CREATE COUPON MODAL */}
      {showAddCouponModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
              <h3 className="text-sm font-bold text-white">Criar Cupom de Desconto</h3>
              <button onClick={() => setShowAddCouponModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateCoupon} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Código do Cupom *</label>
                <input 
                  type="text" 
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="Ex: PROMO20"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300 uppercase tracking-wider font-mono"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Percentual de Desconto (%) *</label>
                <input 
                  type="number" 
                  value={newCoupon.discount}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, discount: e.target.value }))}
                  placeholder="Ex: 20"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300 font-mono"
                  min="1"
                  max="100"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Vincular ao Evento *</label>
                <select 
                  value={newCoupon.event}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, event: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-350 font-medium"
                >
                  <option value="Festival de Inverno Curitiba">Festival de Inverno Curitiba</option>
                  <option value="Metal Fest 2026">Metal Fest 2026</option>
                  <option value="Embafeste Premium">Embafeste Premium</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Status Inicial</label>
                <select 
                  value={newCoupon.status}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-350 font-medium"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              <div className="pt-4 flex space-x-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowAddCouponModal(false)}
                  className="px-4 py-2 bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-lg transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-650 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg transition-all"
                >
                  Salvar Cupom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
