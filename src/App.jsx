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
  Loader2,
  Receipt,
  Calculator,
  Layers,
  ShieldCheck,
  MapPin,
  Eye,
  Lock,
  Megaphone,
  Smartphone,
  Play
} from 'lucide-react';

export default function App() {
  // Navigation & General configuration
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [financeSubTab, setFinanceSubTab] = useState('contas');
  const [accountingSubTab, setAccountingSubTab] = useState('bordero');
  const [marketingSubTab, setMarketingSubTab] = useState('campanhas');
  const [plan, setPlan] = useState('standard');
  
  // App store installation simulation state
  const [installedApps, setInstalledApps] = useState({
    financeiro: true,
    contabilidade: true,
    crm: false,
    mkt: false,
    pdv: false,
    logistica: false,
    bar: false,
    patrimonio: false,
    ai: false
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
      text: 'Olá **Vinicius**! 👋 Sou o Disk AI Copilot. Auditor financeiro e contábil do seu ecossistema. Consigo extrair borderôs, emitir NFes, conciliar contas e gerar DREs completas do sistema. O que deseja auditar?',
      timestamp: '13:45'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Commercial App Catalog mapped to Plan Requirements
  const appsCatalog = [
    { id: 'financeiro', name: 'Financeiro (ERP)', desc: 'Gestão de contas, saldo, fluxo de caixa e conciliação bancária.', category: 'Finanças', planRequired: 'standard', icon: CreditCard },
    { id: 'contabilidade', name: 'Contabilidade Disk', desc: 'Borderôs oficiais, notas fiscais, DRE e relatórios fiscais.', category: 'Fiscal', planRequired: 'standard', icon: Receipt },
    { id: 'crm', name: 'CRM de Vendas', desc: 'Contatos de novos produtores, funil de vendas e metas comerciais.', category: 'Vendas', planRequired: 'advanced', icon: Users },
    { id: 'mkt', name: 'Marketing Automação', desc: 'Disparo de e-mails em massa e gerador de cupons de desconto.', category: 'Marketing', planRequired: 'advanced', icon: Mail },
    { id: 'pdv', name: 'Gestão de PDVs', desc: 'Controle de pontos de venda, monitor de caixas e sangrias.', category: 'Operações', planRequired: 'advanced', icon: ShoppingBag },
    { id: 'logistica', name: 'Logística & Impressão', desc: 'Montagem de ingressos físicos, períodos de entrega e layouts.', category: 'Logística', planRequired: 'advanced', icon: Briefcase },
    { id: 'bar', name: 'Sistema de Bar & Estoque', desc: 'Cardápios digitais, controle de insumos e consumo local.', category: 'Operações', planRequired: 'expert', icon: Layers },
    { id: 'patrimonio', name: 'Gestão de Patrimônio & POS', desc: 'Controle de POS físicos em eventos e remessa de máquinas.', category: 'Patrimônio', planRequired: 'expert', icon: Landmark },
    { id: 'ai', name: 'Disk AI Copilot', desc: 'Copiloto de IA para análises de margens e auditoria contábil.', category: 'Inteligência', planRequired: 'expert', icon: Brain },
  ];

  // Helper to check if a plan meets requirements
  const isPlanEligible = (required) => {
    if (required === 'standard') return true;
    if (required === 'advanced' || required === 'Marketing') {
      return plan === 'advanced' || plan === 'expert';
    }
    if (required === 'expert') return plan === 'expert';
    return false;
  };

  // ================= 1. FINANCEIRO (ERP) DATA & STATE =================
  const [financialStats, setFinancialStats] = useState({
    receita: 2580000,
    saldo: 950000,
    repasses: 620000,
    lucro: 480000
  });

  const [accounts, setAccounts] = useState([
    { id: 'acc-1', name: 'Banco Itaú - Conta Corrente', type: 'Bancária', balance: 420000, color: 'border-orange-500' },
    { id: 'acc-2', name: 'Disk Digital - Antecipações', type: 'Digital', balance: 380000, color: 'border-indigo-500' },
    { id: 'acc-3', name: 'Caixa Geral (PDV Físico)', type: 'Caixa', balance: 150000, color: 'border-emerald-500' }
  ]);

  const [lancamentos, setLancamentos] = useState([
    { id: 'lan-1', type: 'receita', desc: 'Ingressos - Festival de Inverno L1', amount: 45000, category: 'Venda Ingressos', costCenter: 'Eventos', date: '15/07/2026', status: 'Recebido' },
    { id: 'lan-2', type: 'despesa', desc: 'Segurança Executiva e Grades', amount: 18000, category: 'Serviços de Terceiros', costCenter: 'Operacional', date: '15/07/2026', status: 'Pago' },
    { id: 'lan-3', type: 'receita', desc: 'Patrocínio Master - Itaú', amount: 150000, category: 'Patrocínio', costCenter: 'Comercial', date: '14/07/2026', status: 'Recebido' },
    { id: 'lan-4', type: 'despesa', desc: 'Locação de Painéis de LED', amount: 35000, category: 'Locação Equipamentos', costCenter: 'Logística', date: '12/07/2026', status: 'Pendente' },
    { id: 'lan-5', type: 'despesa', desc: 'Mídia e Impulsionamento Social', amount: 12500, category: 'Publicidade', costCenter: 'Marketing', date: '10/07/2026', status: 'Pago' }
  ]);

  const [conciliationItems, setConciliationItems] = useState([
    { id: 'conc-1', date: '15/07/2026', desc: 'PIX Recebido - Ingressos Lote 1', type: 'in', amount: 45000, matched: false, matchInvoice: 'NF-8921 (Festival Inverno)' },
    { id: 'conc-2', date: '15/07/2026', desc: 'TED Recebida - Patrocínio Master', type: 'in', amount: 150000, matched: false, matchInvoice: 'NF-8919 (Prime Show)' },
    { id: 'conc-3', date: '14/07/2026', desc: 'PGTO - Taxa Gateway DiskIngressos', type: 'out', amount: 12500, matched: false, matchInvoice: 'Fatura Gate-450' },
    { id: 'conc-4', date: '13/07/2026', desc: 'Transferência Pix - Repasse Parcial', type: 'out', amount: 620000, matched: false, matchInvoice: 'Repasse ID-998 (Metal Fest)' },
    { id: 'conc-5', date: '12/07/2026', desc: 'TED Recebida - Venda PDV Físico', type: 'in', amount: 82000, matched: false, matchInvoice: 'NF-8915 (Embafeste)' }
  ]);

  // Transfer state
  const [transfer, setTransfer] = useState({ from: 'acc-2', to: 'acc-1', amount: '' });
  // Manual post state
  const [newLancamento, setNewLancamento] = useState({ type: 'receita', desc: '', amount: '', category: 'Venda Ingressos', costCenter: 'Eventos', date: '16/07/2026' });

  // Gateway rates configurations
  const gatewayRates = {
    pix: { name: 'PIX Direto', rate: 0.8, fixed: 0.0 },
    cartao_vista: { name: 'Cartão à Vista', rate: 2.3, fixed: 0.4 },
    cartao_parcelado: { name: 'Cartão Parcelado (até 12x)', rate: 4.8, fixed: 0.4 },
    boleto: { name: 'Boleto Bancário', rate: 0.0, fixed: 2.50 }
  };

  // ================= 2. CONTABILIDADE DISK DATA & STATE =================
  const [invoiceMonth, setInvoiceMonth] = useState('Julho');
  const [activeBorderoEvent, setActiveBorderoEvent] = useState('event-1');

  const [borderos, setBorderos] = useState([
    {
      id: 'event-1',
      name: 'Festival de Inverno Curitiba',
      location: 'Parque Jaime Lerner',
      ticketsSold: 12500,
      grossRevenue: 1250000,
      gatewayFee: 37500,
      diskFee: 125000,
      netPayout: 1087500,
      status: 'Aprovado',
      authorizedBy: 'Vinicius (Finanças)',
      dateClosed: '14/07/2026'
    },
    {
      id: 'event-2',
      name: 'Metal Fest 2026',
      location: 'Video Promo e Live Show',
      ticketsSold: 8200,
      grossRevenue: 820000,
      gatewayFee: 24600,
      diskFee: 82000,
      netPayout: 713400,
      status: 'Em Fechamento',
      authorizedBy: 'Aguardando Aprovação',
      dateClosed: 'Pendente'
    },
    {
      id: 'event-3',
      name: 'Embafeste Premium',
      location: 'Showroom Comercial',
      ticketsSold: 5100,
      grossRevenue: 510000,
      gatewayFee: 15300,
      diskFee: 51000,
      netPayout: 443700,
      status: 'Pendente',
      authorizedBy: 'Sem Autorização',
      dateClosed: 'Pendente'
    }
  ]);

  const [invoices, setInvoices] = useState([
    { id: 'nf-8921', client: 'Associação Festival Inverno', doc: '12.345.678/0001-90', event: 'Festival de Inverno Curitiba', amount: 45000, type: 'Emissão Serviço', status: 'Emitida', date: '15/07/2026' },
    { id: 'nf-8920', client: 'Metal Show Produções', doc: '98.765.432/0001-10', event: 'Metal Fest 2026', amount: 82000, type: 'Emissão Bilheteria', status: 'Emitida', date: '15/07/2026' },
    { id: 'nf-8922', client: 'Prime Show Eventos Ltda', doc: '44.555.666/0001-22', event: 'Prime Show Eventos', amount: 150000, type: 'Patrocínio', status: 'Pendente', date: '14/07/2026' },
    { id: 'nf-8923', client: 'Arena Music Curitiba', doc: '33.222.111/0001-44', event: 'Arena Music', amount: 12500, type: 'Taxa Serviço', status: 'Pendente', date: '13/07/2026' }
  ]);

  // ================= 3. CRM DE VENDAS DATA & STATE =================
  const [leads, setLeads] = useState([
    { id: 'lead-1', name: 'Roberto Alencar', company: 'Prime Show Eventos', value: 120000, stage: 'prospect', date: '10 Jul', tag: 'VIP' },
    { id: 'lead-2', name: 'Ana Beatriz Souza', company: 'Festival Sertanejo', value: 85000, stage: 'prospect', date: '12 Jul', tag: 'Quente' },
    { id: 'lead-3', name: 'Carlos Henrique', company: 'Sunset Lounge Bar', value: 45000, stage: 'qualified', date: '08 Jul', tag: 'Novo' },
    { id: 'lead-4', name: 'Mariana Costa', company: 'Arena Music Curitiba', value: 150000, stage: 'qualified', date: '14 Jul', tag: 'Corporate' },
    { id: 'lead-5', name: 'Felipe Dias', company: 'Expo Agro 2026', value: 210000, stage: 'negotiation', date: '05 Jul', tag: 'Alta Margem' },
    { id: 'lead-6', name: 'Juliana Vieira', company: 'Embafeste Premium', value: 510000, stage: 'won', date: '01 Jul', tag: 'Fechado' }
  ]);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', company: '', value: '', stage: 'prospect', tag: 'Novo' });

  const [clients, setClients] = useState([
    { id: 'c-1', name: 'Juliana Vieira', company: 'Embafeste Premium', email: 'juliana@embafeste.com', phone: '(41) 99888-7766', spend: 510000, status: 'Ativo' },
    { id: 'c-2', name: 'Roberto Alencar', company: 'Prime Show Eventos', email: 'roberto@primeshow.com.br', phone: '(41) 98765-4321', spend: 120000, status: 'Em Negociação' },
    { id: 'c-3', name: 'Mariana Costa', company: 'Arena Music Curitiba', email: 'mariana@arenamusic.com', phone: '(41) 99111-2222', spend: 150000, status: 'Ativo' }
  ]);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', company: '', email: '', phone: '', status: 'Ativo' });

  // ================= 4. PDVS (PONTOS DE VENDA) STATE =================
  const [pdvs, setPdvs] = useState([
    { id: 'pdv-1', name: 'Bilheteria Principal - Portão A', manager: 'Sandra Costa', type: 'Local', balance: 35000, status: 'Aberto' },
    { id: 'pdv-2', name: 'Quiosque Shopping Mueller', manager: 'Daniel Santos', type: 'Físico Externo', balance: 82000, status: 'Aberto' },
    { id: 'pdv-3', name: 'Ponto de Venda - Teatro Guaíra', manager: 'Guilherme Lima', type: 'Teatro', balance: 33000, status: 'Fechado' }
  ]);
  const [showAddPdvModal, setShowAddPdvModal] = useState(false);
  const [newPdv, setNewPdv] = useState({ name: '', manager: '', type: 'Local', balance: '', status: 'Aberto' });

  // ================= 5. MARKETING CAMPAIGNS & COUPONS STATE =================
  const [campaigns, setCampaigns] = useState([
    { id: 'camp-1', name: 'Black Friday Antecipado', channel: 'E-mail', sent: 25000, openRate: 28.4, clickRate: 11.2, conversions: 840, revenue: 84000, status: 'Concluída', date: '10/07/2026' },
    { id: 'camp-2', name: 'Pré-Venda Metal Fest 2026', channel: 'WhatsApp', sent: 12000, openRate: 94.2, clickRate: 18.5, conversions: 490, revenue: 58800, status: 'Concluída', date: '12/07/2026' },
    { id: 'camp-3', name: 'Reengajamento Ingressos Inverno', channel: 'E-mail', sent: 8000, openRate: 19.8, clickRate: 6.4, conversions: 120, revenue: 14400, status: 'Concluída', date: '15/07/2026' },
    { id: 'camp-4', name: 'Promoção Relâmpago Embafeste', channel: 'SMS', sent: 5000, openRate: 88.0, clickRate: 14.2, conversions: 0, revenue: 0, status: 'Agendada', date: '20/07/2026' }
  ]);
  
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: '', channel: 'E-mail', subject: '', date: '18/07/2026', targetEvent: 'Festival de Inverno Curitiba' });

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
    }, 1800);
  };

  // Switch Plan Upgrade
  const handleUpgradePlan = (planId, planName) => {
    setPlan(planId);
    triggerToast(
      "Upgrade Concluído! 🎉",
      `Sua conta DiskHub foi atualizada para o plano ${planName} com sucesso. Verifique a Central de Apps para liberar novos recursos.`
    );
  };

  // ================= CONTROLLER SIMULATION LÓGICA =================
  
  // 1. Transferência entre Contas (Financeiro)
  const handleAccountTransfer = (e) => {
    e.preventDefault();
    const amountVal = parseFloat(transfer.amount);
    if (!amountVal || amountVal <= 0) return;

    const sourceAcc = accounts.find(a => a.id === transfer.from);
    if (sourceAcc.balance < amountVal) {
      triggerToast("Saldo Insuficiente", `A conta ${sourceAcc.name} não possui saldo suficiente para esta transferência.`, "warning");
      return;
    }

    setAccounts(prev => prev.map(a => {
      if (a.id === transfer.from) return { ...a, balance: a.balance - amountVal };
      if (a.id === transfer.to) return { ...a, balance: a.balance + amountVal };
      return a;
    }));

    const entry = {
      id: `lan-${Date.now()}`,
      type: 'despesa',
      desc: `Transf. de ${accounts.find(a=>a.id === transfer.from).name} para ${accounts.find(a=>a.id === transfer.to).name}`,
      amount: amountVal,
      category: 'Transferência',
      costCenter: 'Interno',
      date: 'Hoje',
      status: 'Pago'
    };
    setLancamentos(prev => [entry, ...prev]);
    setTransfer(prev => ({ ...prev, amount: '' }));
    triggerToast("Transferência Efetuada", `R$ ${amountVal.toLocaleString('pt-BR')} transferidos.`);
  };

  // 2. Lançamento Financeiro Manual (Financeiro)
  const handleCreateLancamento = (e) => {
    e.preventDefault();
    const amountVal = parseFloat(newLancamento.amount);
    if (!newLancamento.desc || !amountVal) return;

    const added = {
      id: `lan-${Date.now()}`,
      ...newLancamento,
      amount: amountVal,
      status: newLancamento.type === 'receita' ? 'Recebido' : 'Pendente'
    };

    setLancamentos(prev => [added, ...prev]);

    setFinancialStats(prev => {
      const isInc = added.type === 'receita';
      return {
        ...prev,
        receita: isInc ? prev.receita + amountVal : prev.receita,
        saldo: isInc ? prev.saldo + amountVal : prev.saldo - amountVal,
        lucro: isInc ? prev.lucro + amountVal : prev.lucro - amountVal
      };
    });

    setNewLancamento({ type: 'receita', desc: '', amount: '', category: 'Venda Ingressos', costCenter: 'Eventos', date: '16/07/2026' });
    triggerToast("Lançamento Registrado", `Entrada de ${added.desc} gravada.`);
  };

  // 3. Efetuar Fechamento de Caixa / Borderô (Contabilidade)
  const handleAuthorizeBordero = (borderoId) => {
    setBorderos(prev => prev.map(b => {
      if (b.id === borderoId) {
        setFinancialStats(stats => ({
          ...stats,
          repasses: stats.repasses + b.netPayout,
          saldo: stats.saldo - b.netPayout
        }));
        return { 
          ...b, 
          status: 'Aprovado', 
          authorizedBy: 'Vinicius (Finanças)', 
          dateClosed: new Date().toLocaleDateString('pt-BR') 
        };
      }
      return b;
    }));
    triggerToast("Repasse Autorizado", "Borderô de evento fechado e fundos liberados para pagamento.");
  };

  // 4. Emissão de NFe Individual (Contabilidade)
  const handleEmitNFe = (invoiceId) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) return { ...inv, status: 'Processando' };
      return inv;
    }));

    triggerToast("Solicitação de Emissão", "Enviando dados da nota à SEFAZ...");

    setTimeout(() => {
      setInvoices(prev => prev.map(inv => {
        if (inv.id === invoiceId) return { ...inv, status: 'Emitida' };
        return inv;
      }));
      triggerToast("NFe Autorizada! 🧾", `Nota fiscal emitida na SEFAZ com sucesso.`);
    }, 1800);
  };

  // 5. Sangria de Caixa em PDV (Operações / PDV)
  const handlePdvBleeding = (pdvId, amountToBleed) => {
    const bleedVal = parseFloat(amountToBleed);
    if (!bleedVal || bleedVal <= 0) return;

    const pdv = pdvs.find(p => p.id === pdvId);
    if (pdv.balance < bleedVal) {
      triggerToast("Saldo Insuficiente", `O PDV não possui saldo acumulado suficiente para esta sangria.`, "warning");
      return;
    }

    setPdvs(prev => prev.map(p => {
      if (p.id === pdvId) return { ...p, balance: p.balance - bleedVal };
      return p;
    }));

    setAccounts(prev => prev.map(a => {
      if (a.id === 'acc-3') return { ...a, balance: a.balance + bleedVal };
      return a;
    }));

    const entry = {
      id: `lan-${Date.now()}`,
      type: 'receita',
      desc: `Sangria de Caixa: ${pdv.name}`,
      amount: bleedVal,
      category: 'Venda Ingressos',
      costCenter: 'Operacional',
      date: 'Hoje',
      status: 'Recebido'
    };
    setLancamentos(prev => [entry, ...prev]);
    triggerToast("Sangria Concluída 💸", `R$ ${bleedVal.toLocaleString('pt-BR')} recolhidos e transferidos para o Caixa Geral.`);
  };

  // Create Pdv physical point
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

  // 6. Disparar / Simular Disparo de Campanha (Marketing)
  const handleTriggerCampaign = (campaignId) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        return { ...c, status: 'Disparando' };
      }
      return c;
    }));

    triggerToast("Disparando Campanha 🚀", "Os contatos e leads segmentados começaram a receber as notificações.");

    setTimeout(() => {
      const conversionsVal = Math.floor(Math.random() * 200) + 50;
      const revenueVal = conversionsVal * 120; // Average ticket

      setCampaigns(prev => prev.map(c => {
        if (c.id === campaignId) {
          return {
            ...c,
            status: 'Concluída',
            conversions: conversionsVal,
            revenue: revenueVal,
            openRate: parseFloat((Math.random() * 25 + 15).toFixed(1)),
            clickRate: parseFloat((Math.random() * 8 + 3).toFixed(1))
          };
        }
        return c;
      }));

      // Update global accounts & statistics
      setFinancialStats(stats => ({
        ...stats,
        receita: stats.receita + revenueVal,
        saldo: stats.saldo + revenueVal,
        lucro: stats.lucro + revenueVal
      }));

      setAccounts(accounts => accounts.map(a => {
        if (a.id === 'acc-2') return { ...a, balance: a.balance + revenueVal };
        return a;
      }));

      // Add to Ledger (Lançamento)
      const entry = {
        id: `lan-${Date.now()}`,
        type: 'receita',
        desc: `Conversões Campanhas: ${campaigns.find(cp => cp.id === campaignId)?.name || 'Marketing'}`,
        amount: revenueVal,
        category: 'Venda Ingressos',
        costCenter: 'Marketing',
        date: 'Hoje',
        status: 'Recebido'
      };
      setLancamentos(prev => [entry, ...prev]);

      triggerToast("Disparo Concluído! 🎉", `A campanha gerou R$ ${revenueVal.toLocaleString('pt-BR')} em novas vendas de ingressos.`);
    }, 2500);
  };

  // Create Marketing Campaign
  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newCampaign.name || !newCampaign.subject) return;
    const addedCampaign = {
      id: `camp-${Date.now()}`,
      name: newCampaign.name,
      channel: newCampaign.channel,
      sent: Math.floor(Math.random() * 10000) + 1500,
      openRate: 0,
      clickRate: 0,
      conversions: 0,
      revenue: 0,
      status: 'Agendada',
      date: newCampaign.date
    };
    setCampaigns(prev => [...prev, addedCampaign]);
    setShowAddCampaignModal(false);
    setNewCampaign({ name: '', channel: 'E-mail', subject: '', date: '18/07/2026', targetEvent: 'Festival de Inverno Curitiba' });
    triggerToast("Campanha Agendada", `A campanha "${addedCampaign.name}" foi agendada para ${addedCampaign.date}.`);
  };

  // Reconcile item
  const handleReconcile = (itemId) => {
    setConciliationItems(prev => prev.map(item => {
      if (item.id === itemId) {
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
    triggerToast("Conciliação Confirmada", "Transação bancária vinculada.");
  };

  // CRM Kanban lead progression
  const moveLeadStage = (leadId, currentStage) => {
    const stages = ['prospect', 'qualified', 'negotiation', 'won'];
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1];
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: nextStage } : l));
      
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
          triggerToast("Lead Ganho! 🏆", `${lead.name} convertido em cliente ativo!`);
        }
      } else {
        triggerToast("Progresso de Venda", "Lead avançado no pipeline.");
      }
    }
  };

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

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.discount) return;
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
    triggerToast("Sucesso", "Cupom promocional gerado.");
  };

  // AI Chat simulation response
  const triggerAIResponse = (scenario) => {
    const prompts = {
      conciliacao: "🔍 Fazer Conciliação Automática",
      dre: "📊 Gerar DRE de Julho",
      spread: "💸 Calcular Spread dos Gateway",
      fluxo: "📉 Simular Fluxo de Caixa 45 dias",
      relatorio: "📋 Criar Relatório de Vendas",
      eventos: "🎫 Maior Lucro Recente",
      nfe: "🧾 Checar Notas Fiscais Pendentes",
      borderos: "📋 Listar Status dos Borderôs"
    };

    const userMessage = prompts[scenario] || scenario;
    const userMsgObj = {
      id: Date.now(),
      sender: 'user',
      text: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, userMsgObj]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let aiText = '';
      let html = null;

      const q = userMessage.toLowerCase();

      if (scenario === 'conciliacao') {
        aiText = 'Auditoria automática de extratos concluída. Encontrei lançamentos prontos para conciliar.';
        html = (
          <div className="mt-2 p-2 bg-slate-950 border border-slate-800 rounded-lg text-[10px] space-y-1 font-mono">
            <p className="text-emerald-400">✓ 5 lançamentos mapeados no banco Itaú/Disk</p>
            <p className="text-indigo-400">❖ Status: Prontos para liquidação</p>
            <button 
              onClick={() => {
                setConciliationItems(prev => prev.map(item => ({ ...item, matched: true })));
                triggerToast("Sucesso", "Todas as conciliações foram efetuadas.");
              }}
              className="w-full mt-2 py-1 bg-indigo-650 hover:bg-indigo-600 text-white rounded text-[10px] font-bold"
            >
              Liquidar Conciliações Pendentes
            </button>
          </div>
        );
      } else if (scenario === 'dre') {
        aiText = 'DRE consolidada calculada pelo módulo fiscal. Margem líquida do trimestre está em 18.6%.';
        html = (
          <div className="mt-2 border border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full text-[10px] text-slate-355 font-mono">
              <tr className="bg-slate-950"><td className="p-1">Receita Operacional</td><td className="p-1 text-right text-emerald-400">R$ 2.580.000</td></tr>
              <tr className="border-t border-slate-900"><td className="p-1">(-) Gateway & Spread</td><td className="p-1 text-right text-pink-400">-R$ 387.000</td></tr>
              <tr className="border-t border-slate-900"><td className="p-1">(-) Custos Produtora</td><td className="p-1 text-right text-pink-400">-R$ 1.713.000</td></tr>
              <tr className="border-t border-slate-900 bg-indigo-950/20 font-bold"><td className="p-1 text-white">Lucro Líquido</td><td className="p-1 text-right text-indigo-300">R$ 480.000</td></tr>
            </table>
          </div>
        );
      } else if (scenario === 'nfe') {
        const count = invoices.filter(inv => inv.status === 'Pendente').length;
        aiText = `Varredura fiscal: Existem **${count} notas fiscais** pendentes de emissão.`;
        html = (
          <div className="mt-2 p-2 bg-slate-950 border border-slate-800 rounded-lg text-[10px] space-y-1">
            {invoices.filter(inv => inv.status === 'Pendente').map(inv => (
              <div key={inv.id} className="flex justify-between items-center text-slate-300 font-mono">
                <span>{inv.client} (R$ {inv.amount})</span>
                <button onClick={() => handleEmitNFe(inv.id)} className="bg-indigo-600 hover:bg-indigo-500 text-white text-[8px] px-1.5 py-0.5 rounded">Emitir</button>
              </div>
            ))}
          </div>
        );
      } else if (scenario === 'borderos') {
        aiText = 'Listagem de fechamento financeiro de eventos do produtor:';
        html = (
          <div className="mt-2 space-y-1.5 text-[10px]">
            {borderos.map(b => (
              <div key={b.id} className="flex justify-between items-center p-1.5 bg-slate-950 border border-slate-850 rounded">
                <div>
                  <span className="font-bold text-white block">{b.name}</span>
                  <span className="text-slate-500">Repasse Líquido: R$ {b.netPayout.toLocaleString('pt-BR')}</span>
                </div>
                <span className={`px-1.5 py-0.5 rounded font-bold uppercase text-[8px] ${
                  b.status === 'Aprovado' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>{b.status}</span>
              </div>
            ))}
          </div>
        );
      } else if (q.includes('saldo') || q.includes('conta') || q.includes('banco')) {
        const total = accounts.reduce((acc, curr) => acc + curr.balance, 0);
        aiText = `O total disponível consolidado nas contas financeiras é de **R$ ${total.toLocaleString('pt-BR')}**. Mapeado nas seguintes contas:
        - Banco Itaú: R$ 420.000
        - Conta Digital Disk: R$ 380.000
        - Caixa Geral (PDV): R$ 150.000`;
      } else if (q.includes('repass') || q.includes('bordero') || q.includes('fechamento')) {
        aiText = 'Atualmente, o maior repasse pendente de fechamento é do evento **Metal Fest 2026** (Repasse líquido: R$ 713.400). Você pode aprovar ou auditar esses dados diretamente na aba de **Contabilidade Disk** > **Borderô**.';
      } else {
        aiText = `Recebi sua mensagem sobre "${userMessage}". Como copiloto contábil, estou à disposição para emitir NFes, gerar DRE ou analisar os borderôs de vendas. Escolha um comando rápido ou faça outra pergunta.`;
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

            {/* FINANCEIRO (ERP) */}
            <button 
              onClick={() => setCurrentTab('financeiro')} 
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                currentTab === 'financeiro' 
                  ? 'bg-indigo-600/15 text-indigo-400 border-indigo-500/30 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-transparent'
              }`}
            >
              <CreditCard className="w-5 h-5 shrink-0" />
              <span>Financeiro (ERP)</span>
            </button>

            {/* CONTABILIDADE DISK */}
            <button 
              onClick={() => setCurrentTab('contabilidade')} 
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                currentTab === 'contabilidade' 
                  ? 'bg-indigo-600/15 text-indigo-400 border-indigo-500/30 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-transparent'
              }`}
            >
              <Receipt className="w-5 h-5 shrink-0 text-emerald-450" />
              <div className="flex items-center justify-between w-full">
                <span>Contabilidade Disk</span>
                <span className="bg-emerald-500/20 text-emerald-355 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {invoices.filter(inv => inv.status === 'Pendente').length}
                </span>
              </div>
            </button>

            {/* CRM option (only if installed) */}
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

            {/* Marketing option (only if installed) */}
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
                <span>Mkt & Campanhas</span>
              </button>
            )}

            {/* GESTÃO DE PDVS (only if installed) */}
            {installedApps.pdv === true && (
              <button 
                onClick={() => {
                  setCurrentTab('financeiro');
                  setFinanceSubTab('taxas');
                  triggerToast("Gestão de PDVs", "Redirecionado para a aba de taxas e sangrias físicas.");
                }} 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  currentTab === 'pdv' 
                    ? 'bg-indigo-600/15 text-indigo-400 border-indigo-500/30 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-transparent'
                }`}
              >
                <ShoppingBag className="w-5 h-5 shrink-0" />
                <span>Gestão de PDVs</span>
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
              <span>Central de Apps</span>
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
            <span className="text-sm font-semibold text-slate-200 capitalize">
              {currentTab === 'appstore' ? 'Central de Aplicativos' : currentTab === 'marketplace' ? 'Planos e Upgrades' : currentTab === 'marketing' ? 'Marketing & Campanhas' : currentTab === 'contabilidade' ? 'Contabilidade Disk' : currentTab}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
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
            
            <button className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800/40 rounded-lg border border-slate-800/80 hover:bg-slate-800 relative transition-all">
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* VIEWS WRAPPER */}
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
            
          {/* ================= 1. DASHBOARD VIEW ================= */}
          {currentTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">Visão Geral de Performance</h2>
                  <p className="text-sm text-slate-400">Gerencie receitas, repasses e a saúde contábil dos seus eventos em tempo real.</p>
                </div>
                <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-350">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>Julho, 2026</span>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

              {/* Chart & Featured Events */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 lg:col-span-2 shadow-md">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-200">Fluxo de Caixa Mensal</h3>
                      <p className="text-xs text-slate-400">Projeção e balanço de receitas no período</p>
                    </div>
                  </div>
                  
                  <div className="relative w-full h-48 mt-4">
                    <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="indigo-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="4,4" strokeWidth="1"/>
                      <line x1="0" y1="75" x2="500" y2="75" stroke="#1e293b" strokeDasharray="4,4" strokeWidth="1"/>
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#1e293b" strokeDasharray="4,4" strokeWidth="1"/>
                      <path d="M 0 150 Q 100 80, 200 110 T 400 40 L 500 60 L 500 150 L 0 150 Z" fill="url(#indigo-grad)"/>
                      <path d="M 0 150 Q 100 80, 200 110 T 400 40 L 500 60" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-semibold">
                    <span>JAN</span><span>FEV</span><span>MAR</span><span>ABR</span><span>MAI</span><span>JUN</span><span>JUL</span>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 shadow-md flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 mb-4">Eventos em Destaque</h3>
                    <div className="space-y-4">
                      {borderos.map(b => (
                        <div key={b.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-slate-850">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-400 text-xs">
                              {b.name[0]}
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-slate-200 truncate w-32">{b.name}</h4>
                              <p className="text-[9px] text-slate-500">{b.location}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-indigo-450">R$ {(b.grossRevenue/1000).toFixed(0)}k</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                    <button onClick={() => setCurrentTab('contabilidade')} className="text-xs font-bold text-indigo-400 hover:text-indigo-300 inline-flex items-center hover:underline">
                      Auditar fechamentos contábeis
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 2. GESTÃO FINANCEIRA (ERP) VIEW ================= */}
          {currentTab === 'financeiro' && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">Gestão Financeira (ERP)</h2>
                  <p className="text-sm text-slate-400">Contas bancárias, lançamentos manuais, custos e taxas do ecossistema.</p>
                </div>
                
                <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-lg space-x-1 text-xs">
                  <button 
                    onClick={() => setFinanceSubTab('contas')}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                      financeSubTab === 'contas' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Saldos & Transferências
                  </button>
                  <button 
                    onClick={() => setFinanceSubTab('lancamentos')}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                      financeSubTab === 'lancamentos' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Lançamentos
                  </button>
                  <button 
                    onClick={() => setFinanceSubTab('conciliacao')}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                      financeSubTab === 'conciliacao' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Conciliação
                  </button>
                  <button 
                    onClick={() => setFinanceSubTab('taxas')}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                      financeSubTab === 'taxas' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    PDVs & Taxas
                  </button>
                </div>
              </div>

              {/* Sub-Tab 1: Saldos & Contas */}
              {financeSubTab === 'contas' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                  <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-sm font-bold text-slate-355 uppercase tracking-wider">Saldo das Contas do Sistema</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {accounts.map(acc => (
                        <div key={acc.id} className={`bg-slate-900 border-l-4 ${acc.color} border border-slate-800 rounded-xl p-5 shadow-sm`}>
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{acc.type}</span>
                          <h4 className="text-xs font-bold text-slate-250 mt-1">{acc.name}</h4>
                          <div className="mt-4 font-mono font-extrabold text-lg text-white">
                            R$ {acc.balance.toLocaleString('pt-BR')}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-indigo-400" />
                        <h4 className="text-sm font-bold text-white">Resumo Patrimonial Consolidador</h4>
                      </div>
                      <p className="text-xs text-slate-400">
                        O saldo líquido disponível consolidado includes taxas antecipadas do portal DiskIngressos e valores retidos em PDVs físicos pendentes de sangria.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md h-fit space-y-4">
                    <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                      <ArrowRightLeft className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Transferência entre Contas</h4>
                    </div>

                    <form onSubmit={handleAccountTransfer} className="space-y-4 text-xs">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold uppercase">Origem</label>
                        <select 
                          value={transfer.from} 
                          onChange={(e) => setTransfer(prev => ({ ...prev, from: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 rounded p-2 focus:outline-none focus:border-indigo-500 font-semibold text-slate-350"
                        >
                          {accounts.map(a => <option key={a.id} value={a.id}>{a.name} (R$ {a.balance.toLocaleString()})</option>)}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold uppercase">Destino</label>
                        <select 
                          value={transfer.to} 
                          onChange={(e) => setTransfer(prev => ({ ...prev, to: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 rounded p-2 focus:outline-none focus:border-indigo-500 font-semibold text-slate-355"
                        >
                          {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold uppercase">Valor (R$)</label>
                        <input 
                          type="number" 
                          value={transfer.amount}
                          onChange={(e) => setTransfer(prev => ({ ...prev, amount: e.target.value }))}
                          placeholder="Ex: 50000"
                          className="w-full bg-slate-950 border border-slate-850 rounded p-2 focus:outline-none focus:border-indigo-500 text-slate-300 font-mono"
                          required
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold rounded-lg transition-all"
                      >
                        Confirmar Transferência
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Lançamentos */}
              {financeSubTab === 'lancamentos' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                  <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
                    <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Fluxo de Caixa Lançamentos</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-slate-350 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-bold text-[10px] uppercase text-left">
                            <th className="p-3">Descrição / Vínculo</th>
                            <th className="p-3">Categoria</th>
                            <th className="p-3">Centro de Custo</th>
                            <th className="p-3">Data</th>
                            <th className="p-3 text-right">Valor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lancamentos.map(lan => (
                            <tr key={lan.id} className="border-b border-slate-850 hover:bg-slate-950/20">
                              <td className="p-3">
                                <div className="flex items-center space-x-2">
                                  <span className={`w-2 h-2 rounded-full ${lan.type === 'receita' ? 'bg-emerald-500' : 'bg-pink-500'}`} />
                                  <span className="font-semibold text-white">{lan.desc}</span>
                                </div>
                              </td>
                              <td className="p-3">{lan.category}</td>
                              <td className="p-3 font-mono">{lan.costCenter}</td>
                              <td className="p-3 font-mono">{lan.date}</td>
                              <td className={`p-3 text-right font-mono font-bold ${lan.type === 'receita' ? 'text-emerald-400' : 'text-pink-400'}`}>
                                {lan.type === 'receita' ? '+' : '-'} R$ {lan.amount.toLocaleString('pt-BR')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md h-fit space-y-4">
                    <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                      <Plus className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Lançar Fluxo Manual</h4>
                    </div>

                    <form onSubmit={handleCreateLancamento} className="space-y-4 text-xs">
                      <div className="flex bg-slate-950 p-1 border border-slate-850 rounded-lg space-x-1">
                        <button 
                          type="button"
                          onClick={() => setNewLancamento(prev => ({ ...prev, type: 'receita' }))}
                          className={`flex-1 py-1.5 rounded text-center font-bold transition-all ${
                            newLancamento.type === 'receita' ? 'bg-emerald-600/20 text-emerald-455' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          Receita
                        </button>
                        <button 
                          type="button"
                          onClick={() => setNewLancamento(prev => ({ ...prev, type: 'despesa' }))}
                          className={`flex-1 py-1.5 rounded text-center font-bold transition-all ${
                            newLancamento.type === 'despesa' ? 'bg-pink-600/20 text-pink-455' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          Despesa
                        </button>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold uppercase">Descrição *</label>
                        <input 
                          type="text" 
                          value={newLancamento.desc}
                          onChange={(e) => setNewLancamento(prev => ({ ...prev, desc: e.target.value }))}
                          placeholder="Ex: Contratação Equipe Limpeza"
                          className="w-full bg-slate-950 border border-slate-850 rounded p-2 focus:outline-none focus:border-indigo-500 text-slate-300"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-bold uppercase">Valor (R$) *</label>
                          <input 
                            type="number" 
                            value={newLancamento.amount}
                            onChange={(e) => setNewLancamento(prev => ({ ...prev, amount: e.target.value }))}
                            placeholder="1200"
                            className="w-full bg-slate-950 border border-slate-850 rounded p-2 focus:outline-none focus:border-indigo-500 text-slate-300 font-mono"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-bold uppercase">Centro de Custo</label>
                          <select 
                            value={newLancamento.costCenter}
                            onChange={(e) => setNewLancamento(prev => ({ ...prev, costCenter: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-850 rounded p-2 focus:outline-none focus:border-indigo-500 text-slate-350 font-medium"
                          >
                            <option value="Eventos">Eventos</option>
                            <option value="Operacional">Operacional</option>
                            <option value="Comercial">Comercial</option>
                            <option value="Logística">Logística</option>
                            <option value="Marketing">Marketing</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold uppercase">Categoria</label>
                        <select 
                          value={newLancamento.category}
                          onChange={(e) => setNewLancamento(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-850 rounded p-2 focus:outline-none focus:border-indigo-500 text-slate-355 font-medium"
                        >
                          <option value="Venda Ingressos">Venda Ingressos</option>
                          <option value="Serviços de Terceiros">Serviços de Terceiros</option>
                          <option value="Locação Equipamentos">Locação Equipamentos</option>
                          <option value="Patrocínio">Patrocínio</option>
                          <option value="Publicidade">Publicidade</option>
                        </select>
                      </div>

                      <button 
                        type="submit" 
                        className="w-full py-2 bg-indigo-650 hover:bg-indigo-600 text-white font-bold rounded-lg transition-all"
                      >
                        Registrar Lançamento
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Conciliação */}
              {financeSubTab === 'conciliacao' && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4 animate-fadeIn">
                  <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Landmark className="w-5 h-5 text-indigo-400" />
                      <h3 className="text-sm font-bold text-slate-200">Conciliação Automática Vindi / PagSeguro</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {conciliationItems.map((item) => (
                      <div 
                        key={item.id} 
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                          item.matched ? 'bg-slate-950/20 border-slate-850/60 opacity-60' : 'bg-slate-950/50 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`p-1.5 rounded-md ${
                            item.type === 'in' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-pink-500/10 text-pink-400'
                          }`}>
                            {item.type === 'in' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowRightLeft className="w-4 h-4" />}
                          </span>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-xs font-semibold text-slate-200">{item.desc}</h4>
                              <span className="text-[9px] text-slate-500 font-mono">{item.date}</span>
                            </div>
                            <p className="text-[10px] text-indigo-455 font-mono mt-0.5">Vínculo Contábil: {item.matchInvoice}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className={`text-xs font-mono font-bold ${
                            item.type === 'in' ? 'text-emerald-400' : 'text-pink-400'
                          }`}>
                            {item.type === 'in' ? '+' : '-'} R$ {item.amount.toLocaleString('pt-BR')}
                          </span>
                          
                          {item.matched ? (
                            <span className="flex items-center space-x-1 text-emerald-400 text-[10px] font-bold">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Conciliado</span>
                            </span>
                          ) : (
                            <button 
                              onClick={() => handleReconcile(item.id)}
                              className="px-2.5 py-1 bg-indigo-650 hover:bg-indigo-600 text-white text-[10px] font-bold rounded"
                            >
                              Conciliar
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Tab 4: PDVs & Taxas */}
              {financeSubTab === 'taxas' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                  <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div className="flex items-center space-x-2">
                        <ShoppingBag className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-sm font-bold text-white">Controle de Pontos de Venda Físicos (PDVs)</h3>
                      </div>
                      
                      {isPlanEligible('advanced') ? (
                        <button 
                          onClick={() => setShowAddPdvModal(true)}
                          className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold rounded"
                        >
                          Novo PDV
                        </button>
                      ) : (
                        <span className="text-[9px] text-slate-500 bg-slate-800 px-2 py-1 rounded">Requer Plano Advanced</span>
                      )}
                    </div>

                    <div className="space-y-3">
                      {pdvs.map(pdv => (
                        <div key={pdv.id} className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-xs font-bold text-white">{pdv.name}</h4>
                              <span className="text-[8px] bg-slate-800 px-1.5 rounded text-slate-400 uppercase">{pdv.type}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5">Operador Responsável: {pdv.manager}</p>
                          </div>

                          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                            <div>
                              <span className="text-[9px] text-slate-500 uppercase block">Saldo Retido</span>
                              <span className="text-xs font-mono font-bold text-emerald-400">R$ {pdv.balance.toLocaleString('pt-BR')}</span>
                            </div>

                            {pdv.balance > 0 && isPlanEligible('advanced') && (
                              <button 
                                onClick={() => handlePdvBleeding(pdv.id, pdv.balance)}
                                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-[10px] font-bold rounded"
                                title="Recolher dinheiro do caixa"
                              >
                                Recolher (Sangria)
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
                    <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Gateway & Custos Operacionais</h3>
                    <div className="space-y-3 text-xs">
                      {Object.entries(gatewayRates).map(([key, data]) => (
                        <div key={key} className="flex justify-between items-center p-2 bg-slate-950/40 border border-slate-850 rounded">
                          <span className="font-semibold">{data.name}</span>
                          <span className="font-mono text-indigo-400 font-bold">{data.rate}% {data.fixed > 0 && `+ R$ ${data.fixed}`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= 3. CONTABILIDADE DISK VIEW ================= */}
          {currentTab === 'contabilidade' && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">Contabilidade Disk</h2>
                  <p className="text-sm text-slate-400">Borderôs oficiais, notas fiscais, DRE e relatórios fiscais.</p>
                </div>

                <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-lg space-x-1 text-xs">
                  <button 
                    onClick={() => setAccountingSubTab('bordero')}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                      accountingSubTab === 'bordero' ? 'bg-indigo-650 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Borderô Eventos
                  </button>
                  <button 
                    onClick={() => setAccountingSubTab('notas')}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                      accountingSubTab === 'notas' ? 'bg-indigo-650 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Notas Fiscais (SEFAZ)
                  </button>
                  <button 
                    onClick={() => setAccountingSubTab('fechamento')}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                      accountingSubTab === 'fechamento' ? 'bg-indigo-650 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    DRE & Fechamento
                  </button>
                </div>
              </div>

              {/* Sub-Tab 1: Borderô Eventos */}
              {accountingSubTab === 'bordero' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
                    <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Selecione o Evento</h3>
                    <div className="space-y-3">
                      {borderos.map(b => (
                        <button 
                          key={b.id}
                          onClick={() => setActiveBorderoEvent(b.id)}
                          className={`w-full text-left p-3 rounded-lg border transition-all ${
                            activeBorderoEvent === b.id 
                              ? 'bg-indigo-600/10 border-indigo-500 text-indigo-300' 
                              : 'bg-slate-950/40 border-slate-850 hover:border-slate-750 text-slate-350'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-xs truncate block w-40">{b.name}</span>
                            <span className={`text-[8px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                              b.status === 'Aprovado' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>{b.status}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono mt-1 block">Receita Bruta: R$ {b.grossRevenue.toLocaleString('pt-BR')}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Borderô details */}
                  {(() => {
                    const event = borderos.find(b => b.id === activeBorderoEvent);
                    if (!event) return null;
                    return (
                      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-6 animate-fadeIn">
                        <div className="border-b border-slate-800 pb-4 flex justify-between items-start">
                          <div>
                            <h3 className="text-base font-bold text-white">{event.name}</h3>
                            <p className="text-xs text-slate-400">{event.location}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Fechamento</span>
                            <span className="text-xs font-mono font-bold text-slate-300 block">{event.dateClosed}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg">
                            <span className="text-[9px] text-slate-500 font-bold uppercase block">Ingressos</span>
                            <span className="text-sm font-mono font-bold text-white mt-1 block">{event.ticketsSold}</span>
                          </div>
                          <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg">
                            <span className="text-[9px] text-slate-500 font-bold uppercase block">Receita Bruta</span>
                            <span className="text-sm font-mono font-bold text-white mt-1 block">R$ {event.grossRevenue.toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg">
                            <span className="text-[9px] text-slate-500 font-bold uppercase block">Gateway (Vindi)</span>
                            <span className="text-sm font-mono font-bold text-pink-400 mt-1 block">- R$ {event.gatewayFee.toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg">
                            <span className="text-[9px] text-slate-500 font-bold uppercase block">Comissão Disk</span>
                            <span className="text-sm font-mono font-bold text-pink-400 mt-1 block">- R$ {event.diskFee.toLocaleString('pt-BR')}</span>
                          </div>
                        </div>

                        <div className="p-4 bg-indigo-950/20 border border-indigo-900/35 rounded-xl flex flex-col sm:flex-row justify-between items-center">
                          <div>
                            <span className="text-xs text-indigo-400 font-bold block">Repasse Líquido à Produtora:</span>
                            <span className="text-2xl font-mono font-extrabold text-white mt-1 block">
                              R$ {event.netPayout.toLocaleString('pt-BR')}
                            </span>
                          </div>
                          
                          {event.status === 'Aprovado' ? (
                            <div className="text-center sm:text-right mt-3 sm:mt-0">
                              <span className="text-[9px] text-slate-500 font-bold block">Autorizado por:</span>
                              <span className="text-emerald-450 text-xs font-semibold block">{event.authorizedBy}</span>
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleAuthorizeBordero(event.id)}
                              className="mt-3 sm:mt-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold rounded-lg transition-all"
                            >
                              Liberar Repasse Financeiro
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Sub-Tab 2: Notas Fiscais a Emitir */}
              {accountingSubTab === 'notas' && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Receipt className="w-5 h-5 text-indigo-400" />
                      <h3 className="text-sm font-bold text-slate-200">Emissão de Notas Fiscais Eletrônicas (NFe)</h3>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-slate-355 border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-bold text-[10px] uppercase text-left">
                          <th className="p-3">ID Nota</th>
                          <th className="p-3">Razão Social</th>
                          <th className="p-3">CNPJ / CPF</th>
                          <th className="p-3">Evento Vinculado</th>
                          <th className="p-3">Lançamento</th>
                          <th className="p-3 text-right">Valor</th>
                          <th className="p-3 text-center">Status SEFAZ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map(inv => (
                          <tr key={inv.id} className="border-b border-slate-850 hover:bg-slate-950/20">
                            <td className="p-3 font-mono font-bold text-white uppercase">{inv.id}</td>
                            <td className="p-3 font-semibold">{inv.client}</td>
                            <td className="p-3 font-mono">{inv.doc}</td>
                            <td className="p-3">{inv.event}</td>
                            <td className="p-3 font-mono">{inv.date}</td>
                            <td className="p-3 text-right font-mono font-semibold text-indigo-300">R$ {inv.amount.toLocaleString('pt-BR')}</td>
                            <td className="p-3 text-center">
                              {inv.status === 'Emitida' && (
                                <span className="bg-emerald-500/10 text-emerald-400 text-[9px] px-2 py-0.5 rounded-full font-bold">Autorizada</span>
                              )}
                              {inv.status === 'Processando' && (
                                <span className="bg-slate-800 text-slate-400 text-[9px] px-2 py-0.5 rounded-full font-bold animate-pulse">Enviando...</span>
                              )}
                              {inv.status === 'Pendente' && (
                                <button 
                                  onClick={() => handleEmitNFe(inv.id)}
                                  className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[9px] font-bold rounded"
                                >
                                  Transmitir
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: DRE & Fechamentos */}
              {accountingSubTab === 'fechamento' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                  <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div className="flex items-center space-x-2">
                        <Calculator className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-sm font-bold text-white">Demonstrativo DRE por Competência</h3>
                      </div>
                      
                      <select 
                        value={invoiceMonth}
                        onChange={(e) => setInvoiceMonth(e.target.value)}
                        className="bg-slate-950 border border-slate-850 p-1 rounded text-xs focus:outline-none focus:border-indigo-500 text-slate-300"
                      >
                        <option value="Julho">Julho 2026</option>
                        <option value="Junho">Junho 2026</option>
                        <option value="Maio">Maio 2026</option>
                      </select>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex justify-between p-2 hover:bg-slate-950/20">
                        <span className="text-slate-400">Receitas de Vendas (Bilheteria)</span>
                        <span className="text-emerald-400 font-bold">R$ {invoiceMonth === 'Julho' ? '2.580.000' : invoiceMonth === 'Junho' ? '1.920.000' : '1.450.000'}</span>
                      </div>
                      <div className="flex justify-between p-2 hover:bg-slate-950/20">
                        <span className="text-slate-400">(-) Impostos Fiscais (Simples/NFe)</span>
                        <span className="text-pink-400">-R$ {invoiceMonth === 'Julho' ? '154.800' : invoiceMonth === 'Junho' ? '115.200' : '87.000'}</span>
                      </div>
                      <div className="flex justify-between p-2 hover:bg-slate-950/20">
                        <span className="text-slate-400">(-) Spread e Comissões de Lançamento</span>
                        <span className="text-pink-400">-R$ {invoiceMonth === 'Julho' ? '232.200' : invoiceMonth === 'Junho' ? '172.800' : '130.500'}</span>
                      </div>
                      <div className="flex justify-between p-2 hover:bg-slate-950/20">
                        <span className="text-slate-400">(-) Custos de Produção & Infraestrutura</span>
                        <span className="text-pink-400">-R$ {invoiceMonth === 'Julho' ? '1.713.000' : invoiceMonth === 'Junho' ? '1.272.000' : '960.000'}</span>
                      </div>
                      <div className="border-t border-slate-800 my-2 pt-2 flex justify-between p-2 bg-indigo-950/20 rounded font-bold">
                        <span className="text-white">Lucro Líquido Final</span>
                        <span className="text-indigo-300">R$ {invoiceMonth === 'Julho' ? '480.000' : invoiceMonth === 'Junho' ? '360.000' : '272.500'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                        <FileText className="w-4 h-4 text-indigo-400" />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Relatórios Recebimento</h4>
                      </div>
                      <p className="text-xs text-slate-400">
                        Exporte faturas contábeis e demonstrativos fiscais nos formatos oficiais requeridos pela Receita e Auditoria.
                      </p>

                      <div className="space-y-2 pt-2 text-xs">
                        <button 
                          onClick={() => triggerToast("Relatório Exportado", "Relatório de Recebimento de Vendas por Pedido enviado para download.")}
                          className="w-full text-left p-2.5 bg-slate-950 border border-slate-850 hover:border-slate-750 font-semibold rounded flex justify-between items-center transition-all"
                        >
                          <span>Recebimento por Pedido</span>
                          <Download className="w-3.5 h-3.5 text-indigo-400" />
                        </button>
                        
                        <button 
                          onClick={() => triggerToast("Relatório Exportado", "Relatório de Recebimento de Vendas por Data enviado para download.")}
                          className="w-full text-left p-2.5 bg-slate-950 border border-slate-850 hover:border-slate-750 font-semibold rounded flex justify-between items-center transition-all"
                        >
                          <span>Recebimento por Data</span>
                          <Download className="w-3.5 h-3.5 text-indigo-400" />
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={() => triggerToast("DRE Completa", "Gerando demonstrativo do ano fiscal consolidado...")}
                      className="mt-6 w-full py-2 bg-indigo-650 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg transition-all"
                    >
                      Exportar DRE Consolidada Anual
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= 4. CRM DE VENDAS VIEW ================= */}
          {currentTab === 'crm' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">CRM de Vendas</h2>
                  <p className="text-sm text-slate-400">Gerencie leads, prospecção e contatos de novos produtores de eventos.</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowAddLeadModal(true)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-lg text-xs font-bold transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Lead</span>
                  </button>
                </div>
              </div>

              {/* Kanban Pipelines */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {['prospect', 'qualified', 'negotiation', 'won'].map(stage => {
                  const stageLabels = { prospect: 'Prospecção', qualified: 'Qualificado', negotiation: 'Negociação', won: 'Fechado/Ganho' };
                  return (
                    <div key={stage} className="bg-slate-900/50 border border-slate-850 rounded-xl p-4 flex flex-col space-y-3 min-h-[350px]">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stageLabels[stage]}</span>
                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-355 font-bold">
                          {leads.filter(l => l.stage === stage).length}
                        </span>
                      </div>
                      <div className="space-y-3 flex-1 overflow-y-auto">
                        {leads.filter(l => l.stage === stage).map(lead => (
                          <div key={lead.id} className="bg-slate-900 border border-slate-800 hover:border-indigo-500/20 p-3 rounded-lg shadow space-y-2 group transition-all">
                            <span className="text-[8px] bg-indigo-550/20 text-indigo-355 font-bold px-1.5 py-0.5 rounded uppercase">{lead.tag}</span>
                            <div>
                              <h4 className="text-xs font-bold text-white">{lead.name}</h4>
                              <p className="text-[10px] text-slate-500">{lead.company}</p>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-slate-850">
                              <span className="text-[10px] font-mono font-bold text-slate-300">R$ {lead.value.toLocaleString()}</span>
                              {stage !== 'won' && (
                                <button 
                                  onClick={() => moveLeadStage(lead.id, lead.stage)}
                                  className="p-1 bg-slate-850 hover:bg-indigo-650 hover:text-white rounded text-slate-400 transition-all"
                                >
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= 5. MARKETING & CAMPANHAS VIEW ================= */}
          {currentTab === 'marketing' && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">Mkt & Campanhas</h2>
                  <p className="text-sm text-slate-400">Ative cupons, dispare notificações e analise métricas de conversão.</p>
                </div>
                
                <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-lg space-x-1 text-xs">
                  <button 
                    onClick={() => setMarketingSubTab('campanhas')}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                      marketingSubTab === 'campanhas' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Disparos & Campanhas
                  </button>
                  <button 
                    onClick={() => setMarketingSubTab('cupons')}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                      marketingSubTab === 'cupons' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Cupons
                  </button>
                  <button 
                    onClick={() => setMarketingSubTab('performance')}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                      marketingSubTab === 'performance' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Métricas & ROI
                  </button>
                </div>
              </div>

              {/* Sub-Tab 1: Disparos & Campanhas */}
              {marketingSubTab === 'campanhas' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                  
                  {/* Campaign List */}
                  <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h3 className="text-sm font-bold text-white">Histórico de Disparos</h3>
                      <button 
                        onClick={() => setShowAddCampaignModal(true)}
                        className="px-2 py-1 bg-indigo-650 hover:bg-indigo-600 text-white text-[10px] font-bold rounded"
                      >
                        Nova Campanha
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-slate-350 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-bold text-[10px] uppercase text-left">
                            <th className="p-3">Nome da Campanha</th>
                            <th className="p-3">Canal</th>
                            <th className="p-3">Data</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-right">Vendas</th>
                            <th className="p-3 text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {campaigns.map(camp => (
                            <tr key={camp.id} className="border-b border-slate-850 hover:bg-slate-950/20">
                              <td className="p-3">
                                <div>
                                  <span className="font-semibold text-white block">{camp.name}</span>
                                  {camp.sent > 0 && <span className="text-[10px] text-slate-500 font-mono">Enviados: {camp.sent.toLocaleString()}</span>}
                                </div>
                              </td>
                              <td className="p-3 font-mono">{camp.channel}</td>
                              <td className="p-3 font-mono">{camp.date}</td>
                              <td className="p-3 text-center">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                  camp.status === 'Concluída' 
                                    ? 'bg-emerald-500/10 text-emerald-450' 
                                    : camp.status === 'Disparando' 
                                    ? 'bg-slate-850 text-indigo-400 animate-pulse'
                                    : 'bg-amber-500/10 text-amber-400'
                                }`}>
                                  {camp.status}
                                </span>
                              </td>
                              <td className="p-3 text-right font-mono font-bold text-indigo-300">
                                R$ {camp.revenue.toLocaleString('pt-BR')}
                              </td>
                              <td className="p-3 text-center">
                                {camp.status === 'Agendada' && (
                                  <button 
                                    onClick={() => handleTriggerCampaign(camp.id)}
                                    className="p-1 bg-indigo-650 hover:bg-indigo-600 rounded text-white active:scale-95 transition-all"
                                    title="Disparar campanha agora"
                                  >
                                    <Play className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                {camp.status === 'Concluída' && (
                                  <button 
                                    onClick={() => triggerToast("Relatório", "Baixando relatório de conversões detalhado...")}
                                    className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300"
                                  >
                                    Relatório
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Campaign tips & performance panel */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4 h-fit">
                    <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Dicas de Conversão</h3>
                    <p className="text-xs text-slate-400">
                      Disparos via WhatsApp possuem uma taxa de clique média de 18.5%, contra 6.4% em campanhas de E-mail de reengajamento.
                    </p>
                    
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-850 space-y-2">
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>Audiência Estimada:</span>
                        <span className="text-white font-bold">54.000 Compradores</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>Média Conversão:</span>
                        <span className="text-emerald-450 font-bold">3.2% global</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Sub-Tab 2: Cupons */}
              {marketingSubTab === 'cupons' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                  <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h3 className="text-sm font-bold text-slate-200">Cupons Ativos</h3>
                      <button 
                        onClick={() => setShowAddCouponModal(true)}
                        className="px-2 py-1 bg-indigo-650 hover:bg-indigo-600 text-white text-[10px] font-bold rounded"
                      >
                        Novo Cupom
                      </button>
                    </div>

                    <div className="space-y-3">
                      {coupons.map(coupon => (
                        <div key={coupon.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/40 border border-slate-850">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded bg-indigo-600/10 text-indigo-400 font-bold flex items-center justify-center text-xs">
                              {coupon.discount}%
                            </div>
                            <div>
                              <span className="text-xs font-mono font-bold text-white tracking-wider block">{coupon.code}</span>
                              <span className="text-[9px] text-slate-500">{coupon.event}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-[10px] text-slate-500 font-mono">Usos: {coupon.usages}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              coupon.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'
                            }`}>{coupon.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Métricas & ROI */}
              {marketingSubTab === 'performance' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Faturamento Campanhas</span>
                    <span className="text-xl font-mono font-extrabold text-white mt-1 block">R$ {campaigns.reduce((acc, c) => acc + c.revenue, 0).toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Taxa Média de Abertura</span>
                    <span className="text-xl font-mono font-extrabold text-indigo-400 mt-1 block">47.6%</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Total Ingressos Vendidos</span>
                    <span className="text-xl font-mono font-extrabold text-emerald-400 mt-1 block">{campaigns.reduce((acc, c) => acc + c.conversions, 0)}</span>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= 6. CENTRAL DE APLICATIVOS (APP STORE) ================= */}
          {currentTab === 'appstore' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">Central de Aplicativos</h2>
                <p className="text-sm text-slate-400">Instale ou adquira módulos integrados de acordo com o plano do seu ecossistema.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appsCatalog.map(app => {
                  const IconComponent = app.icon;
                  const eligible = isPlanEligible(app.planRequired);
                  const installed = installedApps[app.id] === true;
                  const installing = installedApps[app.id] === 'installing';

                  return (
                    <div 
                      key={app.id} 
                      className={`bg-slate-900 border rounded-xl p-6 flex flex-col justify-between transition-all duration-300 ${
                        eligible 
                          ? 'border-slate-800 hover:border-slate-700 hover:shadow-lg hover:shadow-indigo-500/2' 
                          : 'border-slate-850 opacity-80'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            eligible ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-600'
                          }`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          
                          <div className="flex flex-col items-end space-y-1">
                            {installed ? (
                              <span className="bg-emerald-500/15 text-emerald-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Ativo</span>
                            ) : eligible ? (
                              <span className="bg-indigo-500/10 text-indigo-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Desbloqueado</span>
                            ) : (
                              <span className="bg-amber-500/10 text-amber-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center space-x-1">
                                <Lock className="w-2.5 h-2.5" />
                                <span>Requer {app.planRequired}</span>
                              </span>
                            )}
                            <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">{app.category}</span>
                          </div>
                        </div>

                        <h3 className="text-base font-bold text-slate-200">{app.name}</h3>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{app.desc}</p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-855/60">
                        {installed ? (
                          <button 
                            disabled 
                            className="w-full py-2 bg-slate-950 text-slate-500 text-xs font-bold rounded-lg cursor-not-allowed flex items-center justify-center space-x-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Módulo Ativo no Menu</span>
                          </button>
                        ) : installing ? (
                          <button 
                            disabled 
                            className="w-full py-2 bg-slate-950 text-slate-400 text-xs font-bold rounded-lg flex items-center justify-center space-x-2"
                          >
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Instalando...</span>
                          </button>
                        ) : eligible ? (
                          <button 
                            onClick={() => handleInstallApp(app.id, app.name)}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-xs font-bold rounded-lg transition-all"
                          >
                            Instalar Módulo
                          </button>
                        ) : (
                          <button 
                            onClick={() => {
                              setCurrentTab('marketplace');
                              triggerToast("Upgrade Necessário", `O plano atual não dá suporte ao módulo ${app.name}.`, "warning");
                            }}
                            className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Fazer Upgrade no Plano</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= 7. MARKETPLACE VIEW ================= */}
          {currentTab === 'marketplace' && (
            <div className="space-y-8 animate-fadeIn text-center">
              <div className="max-w-2xl mx-auto space-y-2">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Assinaturas & Recursos Contábeis</h2>
                <p className="text-sm text-slate-400">Liberte o copiloto fiscal e ferramentas de vendas físicas em escala de alta performance.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 max-w-5xl mx-auto text-left">
                {/* Standard */}
                <div className={`bg-slate-900 border rounded-2xl p-8 flex flex-col justify-between relative hover:border-slate-700 transition-all ${
                  plan === 'standard' ? 'border-indigo-500' : 'border-slate-800'
                }`}>
                  {plan === 'standard' && <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 text-[10px] px-3 py-1 rounded-full font-bold">ATIVO</div>}
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">Iniciante</span>
                    <h3 className="text-2xl font-extrabold text-white mt-2">Standard</h3>
                    <p className="text-xs text-slate-400 mt-2">Gestão financeira básica, extratos de contas e conciliação manual.</p>
                    
                    <hr className="border-slate-800 my-6" />
                    
                    <ul className="space-y-4 text-xs text-slate-300">
                      <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-emerald-450" /><span>Financeiro ERP Básico</span></li>
                      <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-emerald-455" /><span>Borderô Contábil Simples</span></li>
                      <li className="flex items-center space-x-3 text-slate-500"><X className="w-4 h-4" /><span>Sem Módulos de Operações (PDV/Bar)</span></li>
                      <li className="flex items-center space-x-3 text-slate-500"><X className="w-4 h-4" /><span>Sem Módulos Comerciais (CRM/Mkt)</span></li>
                    </ul>
                  </div>
                  <button disabled={plan==='standard'} onClick={()=>handleUpgradePlan('standard', 'Standard')} className="mt-8 w-full py-3 bg-slate-800 text-slate-500 text-sm font-bold rounded-xl">Plano Atual</button>
                </div>

                {/* Advanced */}
                <div className={`bg-slate-900 border rounded-2xl p-8 flex flex-col justify-between relative hover:border-indigo-500 transition-all ${
                  plan === 'advanced' ? 'border-indigo-500' : 'border-indigo-500/30'
                }`}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[10px] px-4 py-1 rounded-full font-bold tracking-widest shadow-md">RECOMENDADO</div>
                  {plan === 'advanced' && <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 text-[10px] px-3 py-1 rounded-full font-bold">ATIVO</div>}
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">Profissional</span>
                    <h3 className="text-2xl font-extrabold text-white mt-2">Advanced</h3>
                    <p className="text-xs text-slate-400 mt-2">Libera CRM comercial, campanhas de Marketing e gestão de PDVs externos.</p>
                    
                    <hr className="border-slate-800 my-6" />
                    
                    <ul className="space-y-4 text-xs text-slate-300">
                      <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-emerald-450" /><span>Unlocks CRM de Vendas & Mkt</span></li>
                      <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-emerald-455" /><span>Unlocks Gestão de PDVs & Logística</span></li>
                      <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-emerald-455" /><span>Automação Contábil Completa</span></li>
                      <li className="flex items-center space-x-3 text-slate-500"><X className="w-4 h-4" /><span>Sem Copiloto de IA</span></li>
                    </ul>
                  </div>
                  <button disabled={plan==='advanced'} onClick={()=>handleUpgradePlan('advanced', 'Advanced')} className="mt-8 w-full py-3 bg-indigo-650 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-all">Assinar Advanced</button>
                </div>

                {/* Expert */}
                <div className={`bg-slate-900 border rounded-2xl p-8 flex flex-col justify-between relative hover:border-slate-750 transition-all ${
                  plan === 'expert' ? 'border-indigo-550' : 'border-slate-800'
                }`}>
                  {plan === 'expert' && <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 text-[10px] px-3 py-1 rounded-full font-bold">ATIVO</div>}
                  <div>
                    <span className="text-xs font-bold text-violet-400 uppercase tracking-widest block">Alta Escala</span>
                    <h3 className="text-2xl font-extrabold text-white mt-2">Expert</h3>
                    <p className="text-xs text-slate-400 mt-2">Disk AI Copilot, emissor de notas fiscais SEFAZ ilimitado e auditoria de spreads.</p>
                    
                    <hr className="border-slate-800 my-6" />
                    
                    <ul className="space-y-4 text-xs text-slate-300">
                      <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-emerald-455" /><span>Libera Disk AI Copilot & Open Finance</span></li>
                      <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-emerald-455" /><span>Libera Módulos de Bar, Insumos & POS</span></li>
                      <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-emerald-455" /><span>Notas fiscais e Borderôs Ilimitados</span></li>
                    </ul>
                  </div>
                  <button disabled={plan==='expert'} onClick={()=>handleUpgradePlan('expert', 'Expert')} className="mt-8 w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold rounded-xl transition-all">Assinar Expert</button>
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
                  <div key={msg.id} className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                    {msg.sender === 'ai' && (
                      <div className="w-6.5 h-6.5 rounded bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[10px] p-1.5 shrink-0">
                        AI
                      </div>
                    )}
                    <div className={`p-3 rounded-r-xl rounded-bl-xl max-w-[80%] border text-[11px] leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-indigo-600 border-indigo-500 text-white rounded-l-xl rounded-br-none' 
                        : 'bg-slate-950/80 border-slate-850 text-slate-355'
                    }`}>
                      <p>{msg.text}</p>
                      {msg.htmlResponse && msg.htmlResponse}
                    </div>
                  </div>
                ))}
                
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
                  <button onClick={() => triggerAIResponse('nfe')} className="px-2 py-1.5 text-[10px] font-medium bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-600/5 text-slate-300 rounded text-left truncate transition-all">
                    🧾 Notas Pendentes
                  </button>
                  <button onClick={() => triggerAIResponse('borderos')} className="px-2 py-1.5 text-[10px] font-medium bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-600/5 text-slate-300 rounded text-left truncate transition-all">
                    📋 Status Borderôs
                  </button>
                </div>
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendCustomText} className="p-2.5 bg-slate-900 border-t border-slate-800 flex space-x-2">
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => userInput(e.target.value)}
                  placeholder="Pergunte sobre DRE, borderô, NFe..."
                  className="flex-1 bg-slate-950 border border-slate-850 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-indigo-500 text-slate-300"
                />
                <button type="submit" className="p-1 bg-indigo-650 hover:bg-indigo-600 rounded text-white active:scale-95 transition-all">
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
                  placeholder="Ex: Roberto Alencar"
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
                  placeholder="Ex: Prime Show Eventos"
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
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all"
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
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all"
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

      {/* 4. ADD PDV MODAL */}
      {showAddPdvModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
              <h3 className="text-sm font-bold text-white">Ativar Ponto de Venda (PDV)</h3>
              <button onClick={() => setShowAddPdvModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreatePdv} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Nome do PDV *</label>
                <input 
                  type="text" 
                  value={newPdv.name}
                  onChange={(e) => setNewPdv(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Bilheteria Principal - Portão B"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Operador Responsável *</label>
                <input 
                  type="text" 
                  value={newPdv.manager}
                  onChange={(e) => setNewPdv(prev => ({ ...prev, manager: e.target.value }))}
                  placeholder="Ex: Sandra Costa"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Tipo de PDV</label>
                  <select 
                    value={newPdv.type}
                    onChange={(e) => setNewPdv(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-350 font-medium"
                  >
                    <option value="Local">Local</option>
                    <option value="Físico Externo">Físico Externo</option>
                    <option value="Teatro">Teatro</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Saldo Inicial (R$)</label>
                  <input 
                    type="number" 
                    value={newPdv.balance}
                    onChange={(e) => setNewPdv(prev => ({ ...prev, balance: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex space-x-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowAddPdvModal(false)}
                  className="px-4 py-2 bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-lg transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all"
                >
                  Ativar PDV
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. ADD CAMPAIGN MODAL */}
      {showAddCampaignModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
              <h3 className="text-sm font-bold text-white">Criar Nova Campanha de Marketing</h3>
              <button onClick={() => setShowAddCampaignModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateCampaign} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Nome da Campanha *</label>
                <input 
                  type="text" 
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Pré-venda Festival de Inverno"
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Canal de Disparo</label>
                  <select 
                    value={newCampaign.channel}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, channel: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-350 font-medium"
                  >
                    <option value="E-mail">E-mail</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="SMS">SMS</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Data de Envio *</label>
                  <input 
                    type="text" 
                    value={newCampaign.date}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, date: e.target.value }))}
                    placeholder="20/07/2026"
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Assunto / Conteúdo Notificação *</label>
                <input 
                  type="text" 
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Ex: Não perca! Lote exclusivo com 20% de desconto..."
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 text-slate-300"
                  required
                />
              </div>

              <div className="pt-4 flex space-x-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowAddCampaignModal(false)}
                  className="px-4 py-2 bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-lg transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-650 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg transition-all"
                >
                  Agendar Campanha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
