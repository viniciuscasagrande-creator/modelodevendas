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
  Play,
  Sun,
  Moon,
  Menu
} from 'lucide-react';

export default function App() {
  // Navigation & General configuration
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [financeSubTab, setFinanceSubTab] = useState('contas');
  const [accountingSubTab, setAccountingSubTab] = useState('bordero');
  const [marketingSubTab, setMarketingSubTab] = useState('campanhas');
  const [plan, setPlan] = useState('standard');
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
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

  const [logisticsBatches, setLogisticsBatches] = useState([
    { id: 'batch-1', event: 'Festival de Inverno Curitiba', type: 'Ingressos VIP', qty: 3000, printed: 3000, status: 'Enviado', tracking: 'BR-9821-XQ' },
    { id: 'batch-2', event: 'Festival de Inverno Curitiba', type: 'Pista Lote 1', qty: 15000, printed: 15000, status: 'Entregue', tracking: 'BR-8122-ZP' },
    { id: 'batch-3', event: 'Metal Fest 2026', type: 'Pista Lote 1', qty: 10000, printed: 6000, status: 'Imprimindo', tracking: 'Em processamento' },
  ]);

  const [barInventory, setBarInventory] = useState([
    { id: 'inv-1', name: 'Cerveja Spaten Lata 350ml', stock: 12000, maxStock: 15000, price: 12.00, sold: 1840 },
    { id: 'inv-2', name: 'Água Mineral sem Gás 500ml', stock: 8500, maxStock: 10000, price: 6.00, sold: 920 },
    { id: 'inv-3', name: 'Refrigerante Coca-Cola Lata', stock: 6100, maxStock: 8000, price: 8.00, sold: 450 },
    { id: 'inv-4', name: 'Combo Energético + Vodka', stock: 2400, maxStock: 3000, price: 45.00, sold: 290 },
  ]);

  const [posTerminals, setPosTerminals] = useState([
    { id: 'pos-1', serial: 'PAX-A920-8912', event: 'Festival de Inverno Curitiba', operator: 'Sandra Costa', battery: 94, status: 'Em uso' },
    { id: 'pos-2', serial: 'PAX-A920-8913', event: 'Festival de Inverno Curitiba', operator: 'Daniel Santos', battery: 85, status: 'Em uso' },
    { id: 'pos-3', serial: 'PAX-A920-8914', event: 'Metal Fest 2026', operator: 'Aguardando', battery: 100, status: 'Disponível' },
    { id: 'pos-4', serial: 'PAX-S920-4122', event: 'Manutenção Geral', operator: 'N/A', battery: 42, status: 'Manutenção' },
  ]);
  
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

  const selectTab = (tabName) => {
    setCurrentTab(tabName);
    setMobileSidebarOpen(false);
  };

  // Theme-based class mapping (Limitless CSS styles)
  const bgMain = theme === 'dark' ? 'bg-[#0f172a] text-[#cbd5e1]' : 'bg-[#f4f6f9] text-[#333333]';
  const sidebarClass = theme === 'dark' ? 'sidebar-dark bg-[#111827]' : 'sidebar-light bg-white border-right border-slate-200';
  const cardClass = theme === 'dark' ? 'bg-[#131c2d] border border-white/5 shadow-sm' : 'bg-white border border-slate-200 shadow-sm';
  const cardHeaderClass = theme === 'dark' ? 'border-b border-white/5 bg-[#111827]/40' : 'border-b border-slate-100 bg-[#fafafa]';
  const inputClass = theme === 'dark' ? 'bg-[#111827] border-white/5 text-white' : 'bg-white border-slate-300 text-slate-900';
  const headerClass = theme === 'dark' ? 'bg-[#111827] border-b border-white/5' : 'bg-white border-b border-slate-200';
  
  const borderCol = theme === 'dark' ? 'border-white/5' : 'border-slate-200';
  const textTitle = theme === 'dark' ? 'text-[#f8fafc]' : 'text-slate-950 font-bold';
  const textSec = theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-500';
  
  const btnSecondary = theme === 'dark' ? 'btn-secondary bg-[#1e293b] text-white hover:bg-[#273449]' : 'btn-light bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200';

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
    { id: 'acc-1', name: 'Banco Itaú - Conta Corrente', type: 'Bancária', balance: 420000 },
    { id: 'acc-2', name: 'Disk Digital - Antecipações', type: 'Digital', balance: 380000 },
    { id: 'acc-3', name: 'Caixa Geral (PDV Físico)', type: 'Caixa', balance: 150000 }
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

  const activeEvent = borderos.find(b => b.id === activeBorderoEvent);

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

  // Sync theme class on HTML element for external scripts/components
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

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
      if (c.id === campaignId) return { ...c, status: 'Disparando' };
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
          <div className={`mt-2 p-2 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-100'} border ${borderCol} rounded-lg text-[10px] space-y-1 font-mono`}>
            <p className="text-[#22C55E] font-medium">✓ 5 lançamentos mapeados no banco Itaú/Disk</p>
            <p className="text-[#3B82F6] font-medium">❖ Status: Prontos para liquidação</p>
            <button 
              onClick={() => {
                setConciliationItems(prev => prev.map(item => ({ ...item, matched: true })));
                triggerToast("Sucesso", "Todas as conciliações foram efetuadas.");
              }}
              className="w-full mt-2 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded text-[10px] font-semibold"
            >
              Liquidar Conciliações Pendentes
            </button>
          </div>
        );
      } else if (scenario === 'dre') {
        aiText = 'DRE consolidada calculada pelo módulo fiscal. Margem líquida do trimestre está em 18.6%.';
        html = (
          <div className={`mt-2 border ${borderCol} rounded-lg overflow-hidden ${bgCard}`}>
            <table className={`w-full text-[10px] ${textSec} font-mono`}>
              <tr className={theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-100'}><td className="p-1">Receita Operacional</td><td className="p-1 text-right text-[#22C55E]">R$ 2.580.000</td></tr>
              <tr className={`border-t ${borderCol}`}><td className="p-1">(-) Gateway & Spread</td><td className="p-1 text-right text-[#EF4444]">-R$ 387.000</td></tr>
              <tr className={`border-t ${borderCol}`}><td className="p-1">(-) Custos Produtora</td><td className="p-1 text-right text-[#EF4444]">-R$ 1.713.000</td></tr>
              <tr className={`border-t ${borderCol} bg-[#3B82F6]/10 font-bold`}><td className={`p-1 ${textTitle}`}>Lucro Líquido</td><td className="p-1 text-right text-[#3B82F6] font-semibold">R$ 480.000</td></tr>
            </table>
          </div>
        );
      } else if (scenario === 'nfe') {
        const count = invoices.filter(inv => inv.status === 'Pendente').length;
        aiText = `Varredura fiscal: Existem **${count} notas fiscais** pendentes de emissão.`;
        html = (
          <div className={`mt-2 p-2 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-100'} border ${borderCol} rounded-lg text-[10px] space-y-1`}>
            {invoices.filter(inv => inv.status === 'Pendente').map(inv => (
              <div key={inv.id} className={`flex justify-between items-center ${textSec} font-mono`}>
                <span>{inv.client} (R$ {inv.amount})</span>
                <button onClick={() => handleEmitNFe(inv.id)} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[8px] px-1.5 py-0.5 rounded font-semibold">Emitir</button>
              </div>
            ))}
          </div>
        );
      } else if (scenario === 'borderos') {
        aiText = 'Listagem de fechamento financeiro de eventos do produtor:';
        html = (
          <div className="mt-2 space-y-1.5 text-[10px]">
            {borderos.map(b => (
              <div key={b.id} className={`flex justify-between items-center p-1.5 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'} border ${borderCol} rounded`}>
                <div>
                  <span className={`font-semibold ${textTitle} block`}>{b.name}</span>
                  <span className={textSec}>Repasse Líquido: R$ {b.netPayout.toLocaleString('pt-BR')}</span>
                </div>
                <span className={`px-1.5 py-0.5 rounded font-semibold uppercase text-[8px] ${
                  b.status === 'Aprovado' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'
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
    <div className={`page-content flex-1 flex ${bgMain} min-h-screen overflow-hidden transition-colors duration-250`}>
      
      {/* SIDEBAR NAVIGATION - Limitless Sidebar layout */}
      <aside className={`sidebar sidebar-main sidebar-expand-md ${theme === 'dark' ? 'sidebar-dark bg-[#111827]' : 'sidebar-light bg-[#FFFFFF]'} ${mobileSidebarOpen ? 'sidebar-mobile-expanded' : ''} border-right ${borderCol} flex flex-col justify-between shrink-0 z-30 transition-colors duration-250`}>
        <div>
          {/* Logo Area */}
          <div className={`p-4 border-bottom ${borderCol} flex items-center justify-between`}>
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-[#2563EB] rounded flex items-center justify-center shadow">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`text-md font-bold tracking-tight ${textTitle} flex items-center mb-0`}>
                  DISK<span className="text-[#3B82F6] font-normal ml-0.5">HUB</span>
                </h1>
                <span className={`text-[10px] ${textSec} uppercase tracking-wider font-semibold`}>ERP & CRM Cloud</span>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className={`md:hidden p-1 rounded hover:bg-light/10 ${textSec} border-0 bg-transparent cursor-pointer`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Profile / Menu (Limitless user section) */}
          <div className={`p-3 border-bottom ${borderCol} bg-light/5`}>
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-circle bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shadow">
                V
              </div>
              <div>
                <h4 className={`text-xs font-bold ${textTitle} mb-0`}>Vinicius</h4>
                <p className={`text-[10px] ${textSec} mb-0 uppercase tracking-widest font-mono`}>
                  Plano {plan}
                </p>
              </div>
            </div>
          </div>

          {/* Nav Links (Limitless nav link class system) */}
          <div className="card card-sidebar-mobile border-0 bg-transparent shadow-none">
            <ul className="nav nav-sidebar flex-column py-2 space-y-1">
              <li className="nav-item-header p-2 text-uppercase font-size-xs text-slate-500 font-semibold">Navegação Principal</li>

              <li className="nav-item w-full">
                <button 
                  onClick={() => selectTab('dashboard')} 
                  className={`nav-link w-full text-left flex items-center space-x-3 px-4 py-2 text-sm transition-all border-l-[3px] ${
                    currentTab === 'dashboard' 
                      ? `${theme === 'dark' ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-900'} border-[#3B82F6]` 
                      : `${textSec} hover:bg-light/10 border-transparent`
                  }`}
                >
                  <BarChart3 className={`w-4 h-4 shrink-0 ${currentTab === 'dashboard' ? 'text-[#3B82F6]' : textSec}`} />
                  <span>Dashboard</span>
                </button>
              </li>

              {/* FINANCEIRO (ERP) */}
              <li className="nav-item w-full">
                <button 
                  onClick={() => selectTab('financeiro')} 
                  className={`nav-link w-full text-left flex items-center space-x-3 px-4 py-2 text-sm transition-all border-l-[3px] ${
                    currentTab === 'financeiro' 
                      ? `${theme === 'dark' ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-900'} border-[#3B82F6]` 
                      : `${textSec} hover:bg-light/10 border-transparent`
                  }`}
                >
                  <CreditCard className={`w-4 h-4 shrink-0 ${currentTab === 'financeiro' ? 'text-[#3B82F6]' : textSec}`} />
                  <span>Financeiro (ERP)</span>
                </button>
              </li>

              {/* CONTABILIDADE DISK */}
              <li className="nav-item w-full">
                <button 
                  onClick={() => selectTab('contabilidade')} 
                  className={`nav-link w-full text-left flex items-center justify-between px-4 py-2 text-sm transition-all border-l-[3px] ${
                    currentTab === 'contabilidade' 
                      ? `${theme === 'dark' ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-900'} border-[#3B82F6]` 
                      : `${textSec} hover:bg-light/10 border-transparent`
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Receipt className={`w-4 h-4 shrink-0 ${currentTab === 'contabilidade' ? 'text-[#3B82F6]' : textSec}`} />
                    <span>Contabilidade Disk</span>
                  </div>
                  <span className="badge badge-success bg-[#22C55E]/12 text-[#22C55E] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {invoices.filter(inv => inv.status === 'Pendente').length}
                  </span>
                </button>
              </li>

              {/* CRM option (only if installed) */}
              {installedApps.crm === true && (
                <li className="nav-item w-full">
                  <button 
                    onClick={() => selectTab('crm')} 
                    className={`nav-link w-full text-left flex items-center justify-between px-4 py-2 text-sm transition-all border-l-[3px] ${
                      currentTab === 'crm' 
                        ? `${theme === 'dark' ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-900'} border-[#3B82F6]` 
                        : `${textSec} hover:bg-light/10 border-transparent`
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Users className={`w-4 h-4 shrink-0 ${currentTab === 'crm' ? 'text-[#3B82F6]' : textSec}`} />
                      <span>CRM de Vendas</span>
                    </div>
                    <span className="badge badge-primary bg-[#3B82F6]/12 text-[#3B82F6] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {leads.filter(l => l.stage !== 'won').length}
                    </span>
                  </button>
                </li>
              )}

              {/* Marketing option (only if installed) */}
              {installedApps.mkt === true && (
                <li className="nav-item w-full">
                  <button 
                    onClick={() => selectTab('marketing')} 
                    className={`nav-link w-full text-left flex items-center space-x-3 px-4 py-2 text-sm transition-all border-l-[3px] ${
                      currentTab === 'marketing' 
                        ? `${theme === 'dark' ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-900'} border-[#3B82F6]` 
                        : `${textSec} hover:bg-light/10 border-transparent`
                    }`}
                  >
                    <Mail className={`w-4 h-4 shrink-0 ${currentTab === 'marketing' ? 'text-[#3B82F6]' : textSec}`} />
                    <span>Mkt & Campanhas</span>
                  </button>
                </li>
              )}

              {/* PDV option (only if installed) */}
              {installedApps.pdv === true && (
                <li className="nav-item w-full">
                  <button 
                    onClick={() => selectTab('pdv')} 
                    className={`nav-link w-full text-left flex items-center space-x-3 px-4 py-2 text-sm transition-all border-l-[3px] ${
                      currentTab === 'pdv' 
                        ? `${theme === 'dark' ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-900'} border-[#3B82F6]` 
                        : `${textSec} hover:bg-light/10 border-transparent`
                    }`}
                  >
                    <ShoppingBag className={`w-4 h-4 shrink-0 ${currentTab === 'pdv' ? 'text-[#3B82F6]' : textSec}`} />
                    <span>Gestão de PDVs</span>
                  </button>
                </li>
              )}

              {/* Logistica option (only if installed) */}
              {installedApps.logistica === true && (
                <li className="nav-item w-full">
                  <button 
                    onClick={() => selectTab('logistica')} 
                    className={`nav-link w-full text-left flex items-center space-x-3 px-4 py-2 text-sm transition-all border-l-[3px] ${
                      currentTab === 'logistica' 
                        ? `${theme === 'dark' ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-900'} border-[#3B82F6]` 
                        : `${textSec} hover:bg-light/10 border-transparent`
                    }`}
                  >
                    <Briefcase className={`w-4 h-4 shrink-0 ${currentTab === 'logistica' ? 'text-[#3B82F6]' : textSec}`} />
                    <span>Logística & Ingressos</span>
                  </button>
                </li>
              )}

              {/* Bar & Estoque option (only if installed) */}
              {installedApps.bar === true && (
                <li className="nav-item w-full">
                  <button 
                    onClick={() => selectTab('bar')} 
                    className={`nav-link w-full text-left flex items-center space-x-3 px-4 py-2 text-sm transition-all border-l-[3px] ${
                      currentTab === 'bar' 
                        ? `${theme === 'dark' ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-900'} border-[#3B82F6]` 
                        : `${textSec} hover:bg-light/10 border-transparent`
                    }`}
                  >
                    <Layers className={`w-4 h-4 shrink-0 ${currentTab === 'bar' ? 'text-[#3B82F6]' : textSec}`} />
                    <span>Bar & Estoque</span>
                  </button>
                </li>
              )}

              {/* Patrimonio option (only if installed) */}
              {installedApps.patrimonio === true && (
                <li className="nav-item w-full">
                  <button 
                    onClick={() => selectTab('patrimonio')} 
                    className={`nav-link w-full text-left flex items-center space-x-3 px-4 py-2 text-sm transition-all border-l-[3px] ${
                      currentTab === 'patrimonio' 
                        ? `${theme === 'dark' ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-900'} border-[#3B82F6]` 
                        : `${textSec} hover:bg-light/10 border-transparent`
                    }`}
                  >
                    <Landmark className={`w-4 h-4 shrink-0 ${currentTab === 'patrimonio' ? 'text-[#3B82F6]' : textSec}`} />
                    <span>Patrimônio & POS</span>
                  </button>
                </li>
              )}

              {/* AI option (only if installed) */}
              {installedApps.ai === true && (
                <li className="nav-item w-full">
                  <button 
                    onClick={() => selectTab('ai')} 
                    className={`nav-link w-full text-left flex items-center space-x-3 px-4 py-2 text-sm transition-all border-l-[3px] ${
                      currentTab === 'ai' 
                        ? `${theme === 'dark' ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-900'} border-[#3B82F6]` 
                        : `${textSec} hover:bg-light/10 border-transparent`
                    }`}
                  >
                    <Brain className={`w-4 h-4 shrink-0 ${currentTab === 'ai' ? 'text-[#3B82F6]' : textSec}`} />
                    <span>Disk AI Analytics</span>
                  </button>
                </li>
              )}

              <li className="nav-item-header p-2 text-uppercase font-size-xs text-slate-500 font-semibold border-top border-white/5 mt-2">Configurações & Loja</li>

              <li className="nav-item w-full">
                <button 
                  onClick={() => selectTab('appstore')} 
                  className={`nav-link w-full text-left flex items-center space-x-3 px-4 py-2 text-sm transition-all border-l-[3px] ${
                    currentTab === 'appstore' 
                      ? `${theme === 'dark' ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-900'} border-[#3B82F6]` 
                      : `${textSec} hover:bg-light/10 border-transparent`
                  }`}
                >
                  <ShoppingBag className={`w-4 h-4 shrink-0 ${currentTab === 'appstore' ? 'text-[#3B82F6]' : textSec}`} />
                  <span>Central de Apps</span>
                </button>
              </li>

              <li className="nav-item w-full">
                <button 
                  onClick={() => selectTab('marketplace')} 
                  className={`nav-link w-full text-left flex items-center space-x-3 px-4 py-2 text-sm transition-all border-l-[3px] ${
                    currentTab === 'marketplace' 
                      ? `${theme === 'dark' ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-900'} border-[#3B82F6]` 
                      : `${textSec} hover:bg-light/10 border-transparent`
                  }`}
                >
                  <Sparkles className={`w-4 h-4 shrink-0 ${currentTab === 'marketplace' ? 'text-[#3B82F6]' : textSec}`} />
                  <span>Planos & Upgrades</span>
                </button>
              </li>

              <li className="nav-item w-full">
                <button 
                  onClick={() => selectTab('roadmap')} 
                  className={`nav-link w-full text-left flex items-center space-x-3 px-4 py-2 text-sm transition-all border-l-[3px] ${
                    currentTab === 'roadmap' 
                      ? `${theme === 'dark' ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-900'} border-[#3B82F6]` 
                      : `${textSec} hover:bg-light/10 border-transparent`
                  }`}
                >
                  <ShieldCheck className={`w-4 h-4 shrink-0 ${currentTab === 'roadmap' ? 'text-[#3B82F6]' : textSec}`} />
                  <span>Status & Roadmap</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA - Limitless content-wrapper */}
      <main className="content-wrapper flex-1 flex flex-col min-w-0 overflow-y-auto relative pb-5 z-10 transition-colors duration-250">
        
        {/* HEADER / TOP NAVBAR */}
        <header className={`navbar navbar-expand-md ${headerClass} px-4 py-3 flex items-center justify-between sticky top-0 z-40 transition-colors duration-250`}>
          <div className="flex items-center space-x-2">
            <button 
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-1 rounded hover:bg-light/10 text-slate-500 hover:text-slate-900 border-0 bg-transparent cursor-pointer"
              title="Abrir Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className={`text-xs ${textSec} uppercase tracking-wider font-semibold hidden sm:inline`}>Espaço de Trabalho</span>
            <span className="text-slate-400 hidden sm:inline">/</span>
            <span className={`text-sm font-semibold ${textTitle} capitalize`}>
              {currentTab === 'appstore' ? 'Central de Aplicativos' : currentTab === 'marketplace' ? 'Planos e Upgrades' : currentTab === 'marketing' ? 'Marketing & Campanhas' : currentTab === 'contabilidade' ? 'Contabilidade Disk' : currentTab}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-4 w-4 ${textSec}`} />
              </span>
              <input 
                type="text" 
                placeholder="Buscar no ecossistema..." 
                className={`form-control form-control-sm pl-9 pr-4 py-1 ${theme === 'dark' ? 'bg-[#111827] text-white border-white/5' : 'bg-white text-slate-900 border-slate-300'} rounded-lg text-xs`}
              />
            </div>
            
            {/* Theme switch button */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded border transition-all ${
                theme === 'dark' 
                  ? 'text-[#94A3B8] hover:text-white bg-[#1E293B]/40 border-white/5 hover:bg-[#1E293B]' 
                  : 'text-slate-500 hover:text-slate-900 bg-slate-100 border-slate-200 hover:bg-slate-200'
              }`}
              title={theme === 'dark' ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button className={`p-2 ${textSec} hover:text-white ${theme === 'dark' ? 'bg-[#1E293B]/40' : 'bg-slate-100'} rounded border ${borderCol} relative transition-all`}>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#3B82F6] rounded-full"></span>
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* CONTENT AREA - Limitless content block */}
        <div className="content p-4 max-w-7xl w-full mx-auto space-y-4">
            
          {/* ================= 1. DASHBOARD VIEW ================= */}
          {currentTab === 'dashboard' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Visão Geral de Performance</h2>
                  <p className={`text-xs ${textSec} mb-0`}>Gerencie receitas, repasses e a saúde contábil dos seus eventos em tempo real.</p>
                </div>
                <div className={`flex items-center space-x-2 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'} border ${borderCol} px-3 py-1.5 rounded text-xs font-medium`}>
                  <Calendar className={`w-4 h-4 ${textSec}`} />
                  <span>Julho, 2026</span>
                </div>
              </div>

              {/* KPI Cards (Limitless layout columns) */}
              <div className="row row-tile">
                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className={`card ${cardClass} p-4 h-100`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-semibold ${textSec} uppercase tracking-wider`}>Receita Total</span>
                      <div className={`p-1.5 ${textSec} rounded`}>
                        <DollarSign className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className={`text-2xl font-bold ${textTitle} tracking-tight`}>R$ {financialStats.receita.toLocaleString('pt-BR')}</span>
                      <div className="flex items-center space-x-1 mt-2">
                        <span className="text-xs font-semibold text-[#22C55E] flex items-center">
                          <TrendingUp className="w-3 h-3 mr-0.5" />
                          14.2%
                        </span>
                        <span className={`text-[10px] ${textSec} font-medium`}>vs último mês</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className={`card ${cardClass} p-4 h-100`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-semibold ${textSec} uppercase tracking-wider`}>Saldo Disponível</span>
                      <div className={`p-1.5 ${textSec} rounded`}>
                        <Landmark className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className={`text-2xl font-bold ${textTitle} tracking-tight`}>R$ {financialStats.saldo.toLocaleString('pt-BR')}</span>
                      <div className="flex items-center space-x-1 mt-2">
                        <span className="text-[10px] text-[#3B82F6] font-semibold bg-[#3B82F6]/10 px-2 py-0.5 rounded-full">Pronto para saque</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className={`card ${cardClass} p-4 h-100`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-semibold ${textSec} uppercase tracking-wider`}>Repasses Efetuados</span>
                      <div className={`p-1.5 ${textSec} rounded`}>
                        <ArrowRightLeft className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className={`text-2xl font-bold ${textTitle} tracking-tight`}>R$ {financialStats.repasses.toLocaleString('pt-BR')}</span>
                      <div className="flex items-center space-x-1 mt-2">
                        <span className={`text-xs font-medium ${textSec}`}>8.3%</span>
                        <span className={`text-[10px] ${textSec} font-normal`}> / Agendados</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className={`card ${cardClass} p-4 h-100`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-semibold ${textSec} uppercase tracking-wider`}>Lucro Líquido</span>
                      <div className={`p-1.5 ${textSec} rounded`}>
                        <Percent className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className={`text-2xl font-bold ${textTitle} tracking-tight`}>R$ {financialStats.lucro.toLocaleString('pt-BR')}</span>
                      <div className="flex items-center space-x-1 mt-2">
                        <span className="text-xs font-semibold text-[#22C55E] flex items-center">18.6%</span>
                        <span className={`text-[10px] ${textSec} font-normal`}> / Margem Operacional</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart & Featured Events */}
              <div className="row">
                <div className="col-lg-8 mb-3">
                  <div className={`card ${cardClass} p-4 h-100`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Fluxo de Caixa Mensal</h3>
                        <p className={`text-xs ${textSec} mb-0`}>Projeção e balanço de receitas no período</p>
                      </div>
                    </div>
                    
                    <div className="relative w-full h-48 mt-4">
                      <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="indigo-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(0,0,0,0.04)" strokeDasharray="4,4" strokeWidth="1"/>
                        <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(0,0,0,0.04)" strokeDasharray="4,4" strokeWidth="1"/>
                        <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(0,0,0,0.04)" strokeDasharray="4,4" strokeWidth="1"/>
                        <path d="M 0 150 Q 100 80, 200 110 T 400 40 L 500 60 L 500 150 L 0 150 Z" fill="url(#indigo-grad)"/>
                        <path d="M 0 150 Q 100 80, 200 110 T 400 40 L 500 60" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className={`flex justify-between text-[10px] ${textSec} mt-2 font-semibold font-mono`}>
                      <span>JAN</span><span>FEV</span><span>MAR</span><span>ABR</span><span>MAI</span><span>JUN</span><span>JUL</span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 mb-3">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                    <div>
                      <h3 className={`text-sm font-semibold ${textTitle} mb-3`}>Eventos em Destaque</h3>
                      <div className="space-y-3">
                        {borderos.map(b => (
                          <div key={b.id} className={`flex items-center justify-between p-3 rounded ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} border ${borderCol}`}>
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded ${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} flex items-center justify-center font-bold ${textSec} text-xs`}>
                                {b.name[0]}
                              </div>
                              <div>
                                <h4 className={`text-xs font-semibold ${textTitle} truncate w-24 mb-0`}>{b.name}</h4>
                                <p className={`text-[9px] ${textSec} mb-0`}>{b.location}</p>
                              </div>
                            </div>
                            <span className={`text-xs font-semibold ${textTitle}`}>R$ {(b.grossRevenue/1000).toFixed(0)}k</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={`mt-4 pt-3 border-top ${borderCol} text-center`}>
                      <button onClick={() => setCurrentTab('contabilidade')} className="text-xs font-semibold text-[#3B82F6] hover:text-[#60A5FA] inline-flex items-center hover:underline bg-transparent border-0 p-0 cursor-pointer">
                        Auditar fechamentos contábeis
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 2. GESTÃO FINANCEIRA (ERP) VIEW ================= */}
          {currentTab === 'financeiro' && (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Gestão Financeira (ERP)</h2>
                  <p className={`text-xs ${textSec} mb-0`}>Contas bancárias, lançamentos manuais, custos e taxas do ecossistema.</p>
                </div>
                
                <div className={`flex ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'} border ${borderCol} p-1 rounded space-x-1 text-xs`}>
                  <button 
                    onClick={() => setFinanceSubTab('contas')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 ${
                      financeSubTab === 'contas' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Saldos & Contas
                  </button>
                  <button 
                    onClick={() => setFinanceSubTab('lancamentos')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 ${
                      financeSubTab === 'lancamentos' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Lançamentos
                  </button>
                  <button 
                    onClick={() => setFinanceSubTab('conciliacao')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 ${
                      financeSubTab === 'conciliacao' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Conciliação
                  </button>
                  <button 
                    onClick={() => setFinanceSubTab('taxas')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 ${
                      financeSubTab === 'taxas' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    PDVs & Taxas
                  </button>
                </div>
              </div>

              {/* Sub-Tab 1: Saldos & Contas */}
              {financeSubTab === 'contas' && (
                <div className="row animate-fadeIn">
                  <div className="col-lg-8 mb-3">
                    <div className="space-y-4">
                      <h3 className={`text-xs font-semibold ${textSec} uppercase tracking-wider mb-0`}>Saldo das Contas do Sistema</h3>
                      <div className="row">
                        {accounts.map(acc => (
                          <div key={acc.id} className="col-md-4 mb-3">
                            <div className={`card ${cardClass} p-4`}>
                              <span className={`text-[9px] ${textSec} font-semibold uppercase tracking-wider block`}>{acc.type}</span>
                              <h4 className={`text-xs font-semibold ${textTitle} mt-1 mb-0`}>{acc.name}</h4>
                              <div className={`mt-3 font-mono font-bold text-md ${textTitle}`}>
                                R$ {acc.balance.toLocaleString('pt-BR')}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className={`card ${cardClass} p-4 space-y-2`}>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
                          <h4 className={`text-sm font-semibold ${textTitle} mb-0`}>Resumo Patrimonial Consolidador</h4>
                        </div>
                        <p className={`text-xs ${textSec} mb-0 leading-relaxed`}>
                          O saldo líquido disponível consolidado inclui taxas antecipadas do portal DiskIngressos e valores retidos em PDVs físicos pendentes de sangria.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 mb-3">
                    <div className={`card ${cardClass} p-4`}>
                      <div className={`flex items-center space-x-2 border-bottom ${borderCol} pb-3 mb-3`}>
                        <ArrowRightLeft className="w-4 h-4 text-[#3B82F6]" />
                        <h4 className={`text-xs font-semibold ${textTitle} uppercase tracking-wider mb-0`}>Transferência entre Contas</h4>
                      </div>

                      <form onSubmit={handleAccountTransfer} className="space-y-3 text-xs">
                        <div className="form-group mb-2">
                          <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Origem</label>
                          <select 
                            value={transfer.from} 
                            onChange={(e) => setTransfer(prev => ({ ...prev, from: e.target.value }))}
                            className={`form-control form-control-sm ${inputClass}`}
                          >
                            {accounts.map(a => <option key={a.id} value={a.id}>{a.name} (R$ {a.balance.toLocaleString()})</option>)}
                          </select>
                        </div>

                        <div className="form-group mb-2">
                          <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Destino</label>
                          <select 
                            value={transfer.to} 
                            onChange={(e) => setTransfer(prev => ({ ...prev, to: e.target.value }))}
                            className={`form-control form-control-sm ${inputClass}`}
                          >
                            {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                          </select>
                        </div>

                        <div className="form-group mb-3">
                          <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Valor (R$)</label>
                          <input 
                            type="number" 
                            value={transfer.amount}
                            onChange={(e) => setTransfer(prev => ({ ...prev, amount: e.target.value }))}
                            placeholder="Ex: 50000"
                            className={`form-control form-control-sm ${inputClass} font-mono`}
                            required
                          />
                        </div>

                        <button 
                          type="submit" 
                          className="btn btn-primary w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium rounded transition-all border-0"
                        >
                          Confirmar Transferência
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Lançamentos */}
              {financeSubTab === 'lancamentos' && (
                <div className="row animate-fadeIn">
                  <div className="col-lg-8 mb-3">
                    <div className={`card ${cardClass} p-4`}>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Fluxo de Caixa Lançamentos</h3>
                      <div className="table-responsive">
                        <table className={`table table-striped table-hover text-xs ${textBody}`}>
                          <thead>
                            <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                              <th className="p-3 border-0">Descrição / Vínculo</th>
                              <th className="p-3 border-0">Categoria</th>
                              <th className="p-3 border-0">Centro de Custo</th>
                              <th className="p-3 border-0">Data</th>
                              <th className="p-3 border-0 text-right">Valor</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lancamentos.map(lan => (
                              <tr key={lan.id} className={`border-bottom ${borderCol}/40 hover:bg-light/5`}>
                                <td className="p-3 border-0">
                                  <div className="flex items-center space-x-2">
                                    <span className={`w-1.5 h-1.5 rounded-full ${lan.type === 'receita' ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`} />
                                    <span className={`font-semibold ${textTitle}`}>{lan.desc}</span>
                                  </div>
                                </td>
                                <td className={`p-3 border-0 ${textSec}`}>{lan.category}</td>
                                <td className={`p-3 border-0 font-mono ${textSec}`}>{lan.costCenter}</td>
                                <td className={`p-3 border-0 font-mono ${textSec}`}>{lan.date}</td>
                                <td className={`p-3 border-0 text-right font-mono font-semibold ${lan.type === 'receita' ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                                  {lan.type === 'receita' ? '+' : '-'} R$ {lan.amount.toLocaleString('pt-BR')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 mb-3">
                    <div className={`card ${cardClass} p-4 h-fit`}>
                      <div className={`flex items-center space-x-2 border-bottom ${borderCol} pb-3 mb-3`}>
                        <Plus className="w-4 h-4 text-[#3B82F6]" />
                        <h4 className={`text-xs font-semibold ${textTitle} uppercase tracking-wider mb-0`}>Lançar Fluxo Manual</h4>
                      </div>

                      <form onSubmit={handleCreateLancamento} className="space-y-3 text-xs">
                        <div className={`flex ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-100'} p-1 border ${borderCol} rounded mb-3`}>
                          <button 
                            type="button"
                            onClick={() => setNewLancamento(prev => ({ ...prev, type: 'receita' }))}
                            className={`flex-1 py-1 rounded text-center font-medium transition-all border-0 ${
                              newLancamento.type === 'receita' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-white'} ${textTitle}` : `${textSec} bg-transparent`
                            }`}
                          >
                            Receita
                          </button>
                          <button 
                            type="button"
                            onClick={() => setNewLancamento(prev => ({ ...prev, type: 'despesa' }))}
                            className={`flex-1 py-1 rounded text-center font-medium transition-all border-0 ${
                              newLancamento.type === 'despesa' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-white'} ${textTitle}` : `${textSec} bg-transparent`
                            }`}
                          >
                            Despesa
                          </button>
                        </div>

                        <div className="form-group mb-2">
                          <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Descrição *</label>
                          <input 
                            type="text" 
                            value={newLancamento.desc}
                            onChange={(e) => setNewLancamento(prev => ({ ...prev, desc: e.target.value }))}
                            placeholder="Ex: Contratação Equipe Limpeza"
                            className={`form-control form-control-sm ${inputClass} text-xs`}
                            required
                          />
                        </div>

                        <div className="row mb-2">
                          <div className="col-6 form-group">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Valor (R$) *</label>
                            <input 
                              type="number" 
                              value={newLancamento.amount}
                              onChange={(e) => setNewLancamento(prev => ({ ...prev, amount: e.target.value }))}
                              placeholder="1200"
                              className={`form-control form-control-sm ${inputClass} font-mono text-xs`}
                              required
                            />
                          </div>
                          <div className="col-6 form-group">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Centro</label>
                            <select 
                              value={newLancamento.costCenter}
                              onChange={(e) => setNewLancamento(prev => ({ ...prev, costCenter: e.target.value }))}
                              className={`form-control form-control-sm ${inputClass} text-xs font-medium`}
                            >
                              <option value="Eventos">Eventos</option>
                              <option value="Operacional">Operacional</option>
                              <option value="Comercial">Comercial</option>
                              <option value="Logística">Logística</option>
                              <option value="Marketing">Marketing</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-group mb-3">
                          <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Categoria</label>
                          <select 
                            value={newLancamento.category}
                            onChange={(e) => setNewLancamento(prev => ({ ...prev, category: e.target.value }))}
                            className={`form-control form-control-sm ${inputClass} text-xs font-medium`}
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
                          className="btn btn-primary w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium rounded transition-all border-0"
                        >
                          Registrar Lançamento
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Conciliação */}
              {financeSubTab === 'conciliacao' && (
                <div className={`card ${cardClass} p-4 animate-fadeIn`}>
                  <div className={`border-bottom ${borderCol} pb-3 mb-3`}>
                    <div className="flex items-center space-x-2">
                      <Landmark className="w-5 h-5 text-[#3B82F6]" />
                      <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Conciliação Automática Vindi / PagSeguro</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {conciliationItems.map((item) => (
                      <div 
                        key={item.id} 
                        className={`flex items-center justify-between p-3 rounded border transition-all ${
                          item.matched 
                            ? `${theme === 'dark' ? 'bg-[#111827]/40' : 'bg-slate-50/50'} border-transparent opacity-60` 
                            : `${theme === 'dark' ? 'bg-[#111827]/70' : 'bg-white'} border-${borderCol}`
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`p-1.5 rounded ${
                            item.type === 'in' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#EF4444]/10 text-[#EF4444]'
                          }`}>
                            {item.type === 'in' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowRightLeft className="w-4 h-4" />}
                          </span>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className={`text-xs font-semibold ${textTitle} mb-0`}>{item.desc}</h4>
                              <span className={`text-[9px] ${textSec} font-mono`}>{item.date}</span>
                            </div>
                            <p className={`text-[10px] ${textSec} font-mono mt-0.5 mb-0`}>Vínculo Contábil: {item.matchInvoice}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className={`text-xs font-mono font-semibold ${
                            item.type === 'in' ? 'text-[#22C55E]' : 'text-[#EF4444]'
                          }`}>
                            {item.type === 'in' ? '+' : '-'} R$ {item.amount.toLocaleString('pt-BR')}
                          </span>
                          
                          {item.matched ? (
                            <span className="flex items-center space-x-1 text-[#22C55E] text-[10px] font-bold">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Conciliado</span>
                            </span>
                          ) : (
                            <button 
                              onClick={() => handleReconcile(item.id)}
                              className="btn btn-primary btn-sm px-2.5 py-1 text-[10px] font-semibold rounded border-0"
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
                <div className="row animate-fadeIn">
                  
                  {/* PDV Control List */}
                  <div className="col-lg-8 mb-3">
                    <div className={`card ${cardClass} p-4`}>
                      <div className={`flex justify-between items-center border-bottom ${borderCol} pb-3 mb-3`}>
                        <div className="flex items-center space-x-2">
                          <ShoppingBag className="w-5 h-5 text-[#3B82F6]" />
                          <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Controle de Pontos de Venda Físicos (PDVs)</h3>
                        </div>
                        
                        {isPlanEligible('advanced') ? (
                          <button 
                            onClick={() => setShowAddPdvModal(true)}
                            className="btn btn-primary btn-sm px-2.5 py-1 text-[10px] font-semibold rounded border-0"
                          >
                            Novo PDV
                          </button>
                        ) : (
                          <span className={`text-[9px] ${textSec} bg-[#111827] px-2 py-1 rounded`}>Requer Plano Advanced</span>
                        )}
                      </div>

                      <div className="space-y-3">
                        {pdvs.map(pdv => (
                          <div key={pdv.id} className={`p-3 ${theme === 'dark' ? 'bg-[#111827]/70' : 'bg-slate-50'} border ${borderCol} rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3`}>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className={`text-xs font-semibold ${textTitle} mb-0`}>{pdv.name}</h4>
                                <span className={`text-[8px] ${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} px-1.5 rounded ${textSec} uppercase`}>{pdv.type}</span>
                              </div>
                              <p className={`text-[10px] ${textSec} mt-0.5 mb-0`}>Operador Responsável: {pdv.manager}</p>
                            </div>

                            <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                              <div>
                                <span className={`text-[9px] ${textSec} uppercase block`}>Saldo Retido</span>
                                <span className="text-xs font-mono font-semibold text-[#22C55E]">R$ {pdv.balance.toLocaleString('pt-BR')}</span>
                              </div>

                              {pdv.balance > 0 && isPlanEligible('advanced') && (
                                <button 
                                  onClick={() => handlePdvBleeding(pdv.id, pdv.balance)}
                                  className="btn btn-primary btn-sm px-2.5 py-1 text-[10px] font-semibold rounded border-0"
                                >
                                  Recolher (Sangria)
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Fee list */}
                  <div className="col-lg-4 mb-3">
                    <div className={`card ${cardClass} p-4`}>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Gateway & Custos Operacionais</h3>
                      <div className="space-y-3 text-xs">
                        {Object.entries(gatewayRates).map(([key, data]) => (
                          <div key={key} className={`flex justify-between items-center p-2.5 ${theme === 'dark' ? 'bg-[#111827]/60' : 'bg-slate-50'} border ${borderCol} rounded`}>
                            <span className={`font-medium ${textBody}`}>{data.name}</span>
                            <span className="font-mono text-[#3B82F6] font-semibold">{data.rate}% {data.fixed > 0 && `+ R$ ${data.fixed}`}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= 3. CONTABILIDADE DISK VIEW ================= */}
          {currentTab === 'contabilidade' && (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Contabilidade Disk</h2>
                  <p className={`text-xs ${textSec} mb-0`}>Borderôs oficiais, notas fiscais, DRE e relatórios fiscais.</p>
                </div>

                <div className={`flex ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'} border ${borderCol} p-1 rounded space-x-1 text-xs`}>
                  <button 
                    onClick={() => setAccountingSubTab('bordero')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 ${
                      accountingSubTab === 'bordero' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Borderô Eventos
                  </button>
                  <button 
                    onClick={() => setAccountingSubTab('notas')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 ${
                      accountingSubTab === 'notas' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Notas Fiscais (SEFAZ)
                  </button>
                  <button 
                    onClick={() => setAccountingSubTab('fechamento')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 ${
                      accountingSubTab === 'fechamento' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    DRE & Fechamento
                  </button>
                </div>
              </div>

              {/* Sub-Tab 1: Borderô Eventos */}
              {accountingSubTab === 'bordero' && (
                <div className="row animate-fadeIn">
                  
                  {/* Event list selector */}
                  <div className="col-lg-4 mb-3">
                    <div className={`card ${cardClass} p-4`}>
                      <h3 className={`text-xs font-semibold ${textSec} uppercase tracking-wider border-bottom ${borderCol} pb-3 mb-3`}>Selecione o Evento</h3>
                      <div className="space-y-3">
                        {borderos.map(b => (
                          <button 
                            key={b.id}
                            onClick={() => setActiveBorderoEvent(b.id)}
                            className={`w-full text-left p-3 rounded border transition-all ${
                              activeBorderoEvent === b.id 
                                ? `bg-transparent border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.20)] ${textTitle}` 
                                : `${theme === 'dark' ? 'bg-[#111827]/70' : 'bg-slate-50'} border-transparent hover:border-slate-700 ${textBody}`
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="font-semibold text-xs truncate block w-32">{b.name}</span>
                              <span className={`text-[8px] px-2 py-0.5 rounded font-bold uppercase ${
                                b.status === 'Aprovado' ? 'bg-[#22C55E]/12 text-[#4ADE80]' : 'bg-[#F59E0B]/12 text-[#FB923C]'
                              }`}>{b.status}</span>
                            </div>
                            <span className={`text-[10px] ${textSec} font-mono mt-1 block`}>Receita Bruta: R$ {b.grossRevenue.toLocaleString('pt-BR')}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Borderô details */}
                  <div className="col-lg-8 mb-3">
                    {activeEvent && (
                      <div className={`card ${cardClass} p-4 space-y-4 animate-fadeIn`}>
                        <div className={`border-bottom ${borderCol} pb-3 flex justify-between items-start`}>
                          <div>
                            <h3 className={`text-base font-bold ${textTitle} mb-0`}>{activeEvent.name}</h3>
                            <p className={`text-xs ${textSec} mb-0`}>{activeEvent.location}</p>
                          </div>
                          <div className="text-right">
                            <span className={`text-[9px] ${textSec} uppercase tracking-widest font-semibold block font-mono`}>Fechamento</span>
                            <span className={`text-xs font-mono font-semibold ${textBody} block`}>{activeEvent.dateClosed}</span>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-6 col-sm-3 mb-2">
                            <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} border ${borderCol} rounded`}>
                              <span className={`text-[9px] ${textSec} font-semibold uppercase block`}>Ingressos</span>
                              <span className={`text-sm font-mono font-semibold ${textTitle} mt-1 block`}>{activeEvent.ticketsSold}</span>
                            </div>
                          </div>
                          <div className="col-6 col-sm-3 mb-2">
                            <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-550'} border ${borderCol} rounded`}>
                              <span className={`text-[9px] ${textSec} font-semibold uppercase block`}>Receita Bruta</span>
                              <span className={`text-sm font-mono font-semibold ${textTitle} mt-1 block`}>R$ {activeEvent.grossRevenue.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>
                          <div className="col-6 col-sm-3 mb-2">
                            <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-550'} border ${borderCol} rounded`}>
                              <span className={`text-[9px] ${textSec} font-semibold uppercase block`}>Gateway (Vindi)</span>
                              <span className="text-sm font-mono font-semibold text-[#EF4444] mt-1 block">- R$ {activeEvent.gatewayFee.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>
                          <div className="col-6 col-sm-3 mb-2">
                            <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-550'} border ${borderCol} rounded`}>
                              <span className={`text-[9px] ${textSec} font-semibold uppercase block`}>Comissão Disk</span>
                              <span className="text-sm font-mono font-semibold text-[#EF4444] mt-1 block">- R$ {activeEvent.diskFee.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>

                        <div className={`p-4 ${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-100'} border ${borderCol} rounded flex flex-col sm:flex-row justify-between items-center gap-3`}>
                          <div>
                            <span className={`text-xs ${textSec} font-semibold block`}>Repasse Líquido à Produtora:</span>
                            <span className={`text-xl font-mono font-bold ${textTitle} mt-1 block`}>
                              R$ {activeEvent.netPayout.toLocaleString('pt-BR')}
                            </span>
                          </div>
                          
                          {activeEvent.status === 'Aprovado' ? (
                            <div className="text-center sm:text-right">
                              <span className={`text-[9px] ${textSec} font-semibold block`}>Autorizado por:</span>
                              <span className="text-[#22C55E] text-xs font-semibold block">{activeEvent.authorizedBy}</span>
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleAuthorizeBordero(activeEvent.id)}
                              className="btn btn-primary py-2 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0"
                            >
                              Liberar Repasse Financeiro
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Notas Fiscais a Emitir */}
              {accountingSubTab === 'notas' && (
                <div className={`card ${cardClass} p-4 animate-fadeIn`}>
                  <div className={`border-bottom ${borderCol} pb-3 mb-3 flex justify-between items-center`}>
                    <div className="flex items-center space-x-2">
                      <Receipt className="w-5 h-5 text-[#3B82F6]" />
                      <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Emissão de Notas Fiscais Eletrônicas (NFe)</h3>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className={`table table-striped table-hover text-xs ${textBody}`}>
                      <thead>
                        <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                          <th className="p-3 border-0">ID Nota</th>
                          <th className="p-3 border-0">Razão Social</th>
                          <th className="p-3 border-0">CNPJ / CPF</th>
                          <th className="p-3 border-0">Evento Vinculado</th>
                          <th className="p-3 border-0">Lançamento</th>
                          <th className="p-3 border-0 text-right">Valor</th>
                          <th className="p-3 border-0 text-center">Status SEFAZ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map(inv => (
                          <tr key={inv.id} className={`border-bottom ${borderCol}/40 hover:bg-light/5`}>
                            <td className={`p-3 border-0 font-mono font-semibold ${textTitle} uppercase`}>{inv.id}</td>
                            <td className={`p-3 border-0 font-semibold ${textTitle}`}>{inv.client}</td>
                            <td className={`p-3 border-0 font-mono ${textSec}`}>{inv.doc}</td>
                            <td className={`p-3 border-0 ${textSec}`}>{inv.event}</td>
                            <td className={`p-3 border-0 font-mono ${textSec}`}>{inv.date}</td>
                            <td className="p-3 border-0 text-right font-mono font-semibold text-[#3B82F6]">R$ {inv.amount.toLocaleString('pt-BR')}</td>
                            <td className="p-3 border-0 text-center">
                              {inv.status === 'Emitida' && (
                                <span className="badge badge-success bg-[#22C55E]/12 text-[#22C55E] text-[9px] font-bold px-2 py-0.5 rounded-full">Autorizada</span>
                              )}
                              {inv.status === 'Processando' && (
                                <span className={`bg-[#1E293B] ${textSec} text-[9px] px-2 py-0.5 rounded font-bold animate-pulse`}>Enviando...</span>
                              )}
                              {inv.status === 'Pendente' && (
                                <button 
                                  onClick={() => handleEmitNFe(inv.id)}
                                  className="btn btn-primary btn-sm px-2.5 py-1 text-[9px] font-semibold rounded border-0"
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
                <div className="row animate-fadeIn">
                  <div className="col-lg-8 mb-3">
                    <div className={`card ${cardClass} p-4`}>
                      <div className={`flex justify-between items-center border-bottom ${borderCol} pb-3 mb-3`}>
                        <div className="flex items-center space-x-2">
                          <Calculator className="w-5 h-5 text-[#3B82F6]" />
                          <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Demonstrativo DRE por Competência</h3>
                        </div>
                        
                        <select 
                          value={invoiceMonth}
                          onChange={(e) => setInvoiceMonth(e.target.value)}
                          className={`form-control form-control-sm ${inputClass} w-auto text-xs`}
                        >
                          <option value="Julho">Julho 2026</option>
                          <option value="Junho">Junho 2026</option>
                          <option value="Maio">Maio 2026</option>
                        </select>
                      </div>

                      <div className={`space-y-2 font-mono text-xs ${textBody}`}>
                        <div className="flex justify-between p-2 hover:bg-light/5">
                          <span className={textSec}>Receitas de Vendas (Bilheteria)</span>
                          <span className="text-[#22C55E] font-bold">R$ {invoiceMonth === 'Julho' ? '2.580.000' : invoiceMonth === 'Junho' ? '1.920.000' : '1.450.000'}</span>
                        </div>
                        <div className="flex justify-between p-2 hover:bg-light/5">
                          <span className={textSec}>(-) Impostos Fiscais (Simples/NFe)</span>
                          <span className="text-[#EF4444] font-semibold">-R$ {invoiceMonth === 'Julho' ? '154.800' : invoiceMonth === 'Junho' ? '115.200' : '87.000'}</span>
                        </div>
                        <div className="flex justify-between p-2 hover:bg-light/5">
                          <span className={textSec}>(-) Spread e Comissões de Lançamento</span>
                          <span className="text-[#EF4444] font-semibold">-R$ {invoiceMonth === 'Julho' ? '232.200' : invoiceMonth === 'Junho' ? '172.800' : '130.500'}</span>
                        </div>
                        <div className="flex justify-between p-2 hover:bg-light/5">
                          <span className={textSec}>(-) Custos de Produção & Infraestrutura</span>
                          <span className="text-[#EF4444] font-semibold">-R$ {invoiceMonth === 'Julho' ? '1.713.000' : invoiceMonth === 'Junho' ? '1.272.000' : '960.000'}</span>
                        </div>
                        <div className={`border-top ${borderCol} my-2 pt-2 flex justify-between p-2 ${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-100'} rounded font-bold`}>
                          <span className={textTitle}>Lucro Líquido Final</span>
                          <span className="text-[#3B82F6]">R$ {invoiceMonth === 'Julho' ? '480.000' : invoiceMonth === 'Junho' ? '360.000' : '272.500'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 mb-3">
                    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                      <div className="space-y-4">
                        <div className={`flex items-center space-x-2 border-bottom ${borderCol} pb-3`}>
                          <FileText className="w-4 h-4 text-[#3B82F6]" />
                          <h4 className={`text-xs font-semibold ${textTitle} uppercase tracking-wider mb-0`}>Relatórios Recebimento</h4>
                        </div>
                        <p className={`text-xs ${textSec} leading-relaxed`}>
                          Exporte faturas contábeis e demonstrativos fiscais nos formatos oficiais requeridos pela Receita e Auditoria.
                        </p>

                        <div className="space-y-2 text-xs">
                          <button 
                            onClick={() => triggerToast("Relatório Exportado", "Relatório de Recebimento de Vendas por Pedido enviado para download.")}
                            className={`btn w-full text-left p-2.5 ${theme === 'dark' ? 'bg-[#111827] text-white border-white/5' : 'bg-slate-50 text-slate-800 border-slate-300/40'} font-semibold rounded flex justify-between items-center transition-all`}
                          >
                            <span>Recebimento por Pedido</span>
                            <Download className="w-3.5 h-3.5 text-[#3B82F6]" />
                          </button>
                          
                          <button 
                            onClick={() => triggerToast("Relatório Exportado", "Relatório de Recebimento de Vendas por Data enviado para download.")}
                            className={`btn w-full text-left p-2.5 ${theme === 'dark' ? 'bg-[#111827] text-white border-white/5' : 'bg-slate-50 text-slate-800 border-slate-300/40'} font-semibold rounded flex justify-between items-center transition-all`}
                          >
                            <span>Recebimento por Data</span>
                            <Download className="w-3.5 h-3.5 text-[#3B82F6]" />
                          </button>
                        </div>
                      </div>

                      <button 
                        onClick={() => triggerToast("DRE Completa", "Gerando demonstrativo do ano fiscal consolidado...")}
                        className="btn btn-primary mt-4 w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0"
                      >
                        Exportar DRE Consolidada Anual
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= 4. CRM DE VENDAS VIEW ================= */}
          {currentTab === 'crm' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>CRM de Vendas</h2>
                  <p className={`text-xs ${textSec} mb-0`}>Gerencie leads, prospecção e contatos de novos produtores de eventos.</p>
                </div>
                <div>
                  <button 
                    onClick={() => setShowAddLeadModal(true)}
                    className="btn btn-primary flex items-center space-x-1.5 px-3 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white rounded text-xs font-semibold transition-all border-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Lead</span>
                  </button>
                </div>
              </div>

              {/* Kanban Pipelines (Bootstrap columns mapping) */}
              <div className="row">
                {['prospect', 'qualified', 'negotiation', 'won'].map(stage => {
                  const stageLabels = { prospect: 'Prospecção', qualified: 'Qualificado', negotiation: 'Negociação', won: 'Fechado/Ganho' };
                  return (
                    <div key={stage} className="col-lg-3 col-sm-6 mb-3">
                      <div className={`card ${cardClass} p-3 flex flex-col space-y-3 min-h-[350px]`}>
                        <div className={`flex items-center justify-between border-bottom ${borderCol} pb-2`}>
                          <span className={`text-xs font-semibold ${textSec} uppercase tracking-wider`}>{stageLabels[stage]}</span>
                          <span className={`badge ${theme === 'dark' ? 'bg-[#1e293b]' : 'bg-slate-200'} px-2 py-0.5 rounded-full ${textTitle} font-bold font-mono text-[10px]`}>
                            {leads.filter(l => l.stage === stage).length}
                          </span>
                        </div>
                        <div className="space-y-3 flex-1 overflow-y-auto">
                          {leads.filter(l => l.stage === stage).map(lead => (
                            <div key={lead.id} className={`card ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} border ${borderCol} hover:border-[#3B82F6]/20 p-3 rounded shadow-sm space-y-2 group transition-all`}>
                              <span className="badge badge-primary bg-blue-500/10 text-[#3B82F6] font-bold px-1.5 py-0.5 rounded uppercase text-[8px] w-fit">{lead.tag}</span>
                              <div>
                                <h4 className={`text-xs font-bold ${textTitle} mb-0`}>{lead.name}</h4>
                                <p className={`text-[10px] ${textSec} mb-0`}>{lead.company}</p>
                              </div>
                              <div className={`flex justify-between items-center pt-2 border-top ${borderCol}`}>
                                <span className={`text-[10px] font-mono font-semibold ${textTitle}`}>R$ {lead.value.toLocaleString()}</span>
                                {stage !== 'won' && (
                                  <button 
                                    onClick={() => moveLeadStage(lead.id, lead.stage)}
                                    className={`p-1 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'} hover:bg-[#2563EB] hover:text-white rounded ${textSec} transition-all border-0 cursor-pointer`}
                                  >
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= 5. MARKETING & CAMPANHAS VIEW ================= */}
          {currentTab === 'marketing' && (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Mkt & Campanhas</h2>
                  <p className={`text-xs ${textSec} mb-0`}>Ative cupons, dispare notificações e analise métricas de conversão.</p>
                </div>
                
                <div className={`flex ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'} border ${borderCol} p-1 rounded space-x-1 text-xs`}>
                  <button 
                    onClick={() => setMarketingSubTab('campanhas')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 ${
                      marketingSubTab === 'campanhas' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Disparos & Campanhas
                  </button>
                  <button 
                    onClick={() => setMarketingSubTab('cupons')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 ${
                      marketingSubTab === 'cupons' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Cupons
                  </button>
                  <button 
                    onClick={() => setMarketingSubTab('performance')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 ${
                      marketingSubTab === 'performance' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Métricas & ROI
                  </button>
                </div>
              </div>

              {/* Sub-Tab 1: Disparos & Campanhas */}
              {marketingSubTab === 'campanhas' && (
                <div className="row animate-fadeIn">
                  
                  {/* Campaign List */}
                  <div className="col-lg-8 mb-3">
                    <div className={`card ${cardClass} p-4`}>
                      <div className={`flex justify-between items-center border-bottom ${borderCol} pb-3 mb-3`}>
                        <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Histórico de Disparos</h3>
                        <button 
                          onClick={() => setShowAddCampaignModal(true)}
                          className="btn btn-primary btn-sm px-2.5 py-1 text-[10px] font-semibold rounded border-0"
                        >
                          Nova Campanha
                        </button>
                      </div>

                      <div className="table-responsive">
                        <table className={`table table-striped table-hover text-xs ${textBody}`}>
                          <thead>
                            <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                              <th className="p-3 border-0">Nome da Campanha</th>
                              <th className="p-3 border-0">Canal</th>
                              <th className="p-3 border-0">Data</th>
                              <th className="p-3 border-0 text-center">Status</th>
                              <th className="p-3 border-0 text-right">Vendas</th>
                              <th className="p-3 border-0 text-center">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {campaigns.map(camp => (
                              <tr key={camp.id} className={`border-bottom ${borderCol}/40 hover:bg-light/5`}>
                                <td className="p-3 border-0">
                                  <div>
                                    <span className={`font-semibold ${textTitle} block`}>{camp.name}</span>
                                    {camp.sent > 0 && <span className={`text-[10px] ${textSec} font-mono`}>Enviados: {camp.sent.toLocaleString()}</span>}
                                  </div>
                                </td>
                                <td className={`p-3 border-0 font-mono ${textSec}`}>{camp.channel}</td>
                                <td className={`p-3 border-0 font-mono ${textSec}`}>{camp.date}</td>
                                <td className="p-3 border-0 text-center">
                                  <span className={`badge ${
                                    camp.status === 'Concluída' 
                                      ? 'badge-success bg-[#22C55E]/12 text-[#22C55E]' 
                                      : camp.status === 'Disparando' 
                                      ? 'badge-primary bg-[#3B82F6]/12 text-[#3B82F6] animate-pulse'
                                      : 'badge-warning bg-[#F59E0B]/12 text-[#F59E0B]'
                                  } text-[9px] font-bold px-2 py-0.5 rounded-full`}>
                                    {camp.status}
                                  </span>
                                </td>
                                <td className="p-3 border-0 text-right font-mono font-semibold text-[#3B82F6]">
                                  R$ {camp.revenue.toLocaleString('pt-BR')}
                                </td>
                                <td className="p-3 border-0 text-center">
                                  {camp.status === 'Agendada' && (
                                    <button 
                                      onClick={() => handleTriggerCampaign(camp.id)}
                                      className="btn btn-primary btn-sm p-1 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white active:scale-95 transition-all border-0"
                                    >
                                      <Play className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  {camp.status === 'Concluída' && (
                                    <button 
                                      onClick={() => triggerToast("Relatório", "Baixando relatório de conversões detalhado...")}
                                      className="btn bg-transparent border-0 p-0 text-[10px] font-semibold text-[#3B82F6] hover:text-[#60A5FA]"
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
                  </div>

                  {/* Campaign tips & performance panel */}
                  <div className="col-lg-4 mb-3">
                    <div className={`card ${cardClass} p-4 h-fit space-y-4`}>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-0`}>Dicas de Conversão</h3>
                      <p className={`text-xs ${textSec} leading-relaxed mb-0`}>
                        Disparos via WhatsApp possuem uma taxa de clique média de 18.5%, contra 6.4% em campanhas de E-mail de reengajamento.
                      </p>
                      
                      <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} rounded border ${borderCol} space-y-2`}>
                        <div className={`flex justify-between text-[10px] ${textSec} font-mono`}>
                          <span>Audiência Estimada:</span>
                          <span className={`${textTitle} font-bold`}>54.000 Compradores</span>
                        </div>
                        <div className={`flex justify-between text-[10px] ${textSec} font-mono`}>
                          <span>Média Conversão:</span>
                          <span className="text-[#22C55E] font-bold">3.2% global</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Sub-Tab 2: Cupons */}
              {marketingSubTab === 'cupons' && (
                <div className="row animate-fadeIn">
                  <div className="col-lg-8 mb-3">
                    <div className={`card ${cardClass} p-4`}>
                      <div className={`flex justify-between items-center border-bottom ${borderCol} pb-3 mb-3`}>
                        <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Cupons Ativos</h3>
                        <button 
                          onClick={() => setShowAddCouponModal(true)}
                          className="btn btn-primary btn-sm px-2.5 py-1 text-[10px] font-semibold rounded border-0"
                        >
                          Novo Cupom
                        </button>
                      </div>

                      <div className="space-y-3">
                        {coupons.map(coupon => (
                          <div key={coupon.id} className={`flex items-center justify-between p-3 rounded ${theme === 'dark' ? 'bg-[#111827]/60' : 'bg-slate-50'} border ${borderCol}`}>
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded ${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textSec} font-bold flex items-center justify-center text-xs`}>
                                {coupon.discount}%
                              </div>
                              <div>
                                <span className={`text-xs font-mono font-semibold ${textTitle} tracking-wider block`}>{coupon.code}</span>
                                <span className={`text-[9px] ${textSec}`}>{coupon.event}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className={`text-[10px] ${textSec} font-mono`}>Usos: {coupon.usages}</span>
                              <span className={`badge ${
                                coupon.status === 'Ativo' ? 'badge-success bg-[#22C55E]/12 text-[#22C55E]' : `bg-[#1E293B] ${textSec}`
                              } text-[10px] font-bold px-2 py-0.5 rounded-full`}>{coupon.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Métricas & ROI */}
              {marketingSubTab === 'performance' && (
                <div className="row animate-fadeIn">
                  <div className="col-md-4 mb-3">
                    <div className={`card ${cardClass} p-4`}>
                      <span className={`text-[9px] ${textSec} uppercase tracking-widest font-semibold block`}>Faturamento Campanhas</span>
                      <span className={`text-xl font-mono font-bold ${textTitle} mt-1 block`}>R$ {campaigns.reduce((acc, c) => acc + c.revenue, 0).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className={`card ${cardClass} p-4`}>
                      <span className={`text-[9px] ${textSec} uppercase tracking-widest font-semibold block`}>Taxa Média de Abertura</span>
                      <span className="text-xl font-mono font-bold text-[#3B82F6] mt-1 block">47.6%</span>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className={`card ${cardClass} p-4`}>
                      <span className={`text-[9px] ${textSec} uppercase tracking-widest font-semibold block`}>Total Ingressos Vendidos</span>
                      <span className="text-xl font-mono font-bold text-[#F59E0B] mt-1 block">{campaigns.reduce((acc, c) => acc + c.conversions, 0)}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= 4. GESTÃO DE PDVS VIEW ================= */}
          {currentTab === 'pdv' && installedApps.pdv === true && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Gestão de Pontos de Venda (PDV)</h2>
                  <p className={`text-xs ${textSec} mb-0`}>Controle de caixas físicos, operadores, sangrias de dinheiro e saldos em tempo real.</p>
                </div>
                <button 
                  onClick={() => setShowAddPdvModal(true)}
                  className="btn btn-primary flex items-center space-x-1.5 px-3 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded text-xs font-semibold border-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ativar Novo PDV</span>
                </button>
              </div>

              <div className="row">
                {pdvs.map(pdv => (
                  <div key={pdv.id} className="col-md-4 mb-3">
                    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className={`text-xs font-bold ${textTitle} mb-0`}>{pdv.name}</h3>
                          <span className={`badge ${pdv.status === 'Aberto' ? 'badge-success bg-[#22C55E]/12 text-[#22C55E]' : 'bg-[#EF4444]/12 text-[#EF4444]'} text-[8px] font-bold px-1.5 py-0.5 rounded-full`}>
                            {pdv.status}
                          </span>
                        </div>
                        <p className={`text-[10px] ${textSec} mt-1 mb-3`}>Operador: {pdv.manager} ({pdv.type})</p>

                        <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} border ${borderCol} rounded text-center`}>
                          <span className={`text-[9px] ${textSec} uppercase block`}>Saldo Retido no Caixa</span>
                          <span className="text-md font-mono font-bold text-[#22C55E] mt-1 block">R$ {pdv.balance.toLocaleString('pt-BR')}</span>
                        </div>
                      </div>

                      {pdv.balance > 0 && (
                        <button 
                          onClick={() => handlePdvBleeding(pdv.id, pdv.balance)}
                          className="btn btn-primary w-full mt-3 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0"
                        >
                          Realizar Sangria Total
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= GESTÃO DE LOGÍSTICA & INGRESSOS VIEW ================= */}
          {currentTab === 'logistica' && installedApps.logistica === true && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Logística & Ingressos Físicos</h2>
                <p className={`text-xs ${textSec} mb-0`}>Monitore lotes impressos, remessas físicas e entregas de ingressos nas bilheterias.</p>
              </div>

              <div className={`card ${cardClass} p-4`}>
                <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Lotes de Ingressos Físicos</h3>
                <div className="table-responsive">
                  <table className={`table table-striped table-hover text-xs ${textBody}`}>
                    <thead>
                      <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                        <th className="p-3 border-0">Lote ID</th>
                        <th className="p-3 border-0">Evento</th>
                        <th className="p-3 border-0">Tipo de Ingresso</th>
                        <th className="p-3 border-0 text-center">Quantidade</th>
                        <th className="p-3 border-0 text-center">Impresso</th>
                        <th className="p-3 border-0 text-center">Status</th>
                        <th className="p-3 border-0 text-right">Rastreio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logisticsBatches.map(batch => (
                        <tr key={batch.id} className={`border-bottom ${borderCol}/40 hover:bg-light/5`}>
                          <td className={`p-3 border-0 font-mono font-semibold ${textTitle} uppercase`}>{batch.id}</td>
                          <td className={`p-3 border-0 font-semibold ${textTitle}`}>{batch.event}</td>
                          <td className={`p-3 border-0 ${textSec}`}>{batch.type}</td>
                          <td className="p-3 border-0 text-center font-mono">{batch.qty.toLocaleString()}</td>
                          <td className="p-3 border-0 text-center font-mono">{batch.printed.toLocaleString()}</td>
                          <td className="p-3 border-0 text-center">
                            <span className={`badge ${
                              batch.status === 'Entregue' 
                                ? 'badge-success bg-[#22C55E]/12 text-[#22C55E]' 
                                : batch.status === 'Enviado' 
                                ? 'badge-primary bg-[#3B82F6]/12 text-[#3B82F6]'
                                : 'badge-warning bg-[#F59E0B]/12 text-[#F59E0B] animate-pulse'
                            } text-[9px] font-bold px-2 py-0.5 rounded-full`}>
                              {batch.status}
                            </span>
                          </td>
                          <td className="p-3 border-0 text-right font-mono text-[#3B82F6]">{batch.tracking}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= GESTÃO DE BAR & ESTOQUE VIEW ================= */}
          {currentTab === 'bar' && installedApps.bar === true && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Bar & Controle de Estoque</h2>
                  <p className={`text-xs ${textSec} mb-0`}>Monitore o nível de estoque de bebidas/insumos nos caixas e simule vendas.</p>
                </div>
              </div>

              <div className="row">
                {/* Live POS simulator */}
                <div className="col-lg-6 mb-3">
                  <div className={`card ${cardClass} p-4 h-100`}>
                    <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Simulador de Vendas no Bar</h3>
                    <p className={`text-xs ${textSec} mb-4`}>Clique nos produtos abaixo para simular vendas rápidas nos terminais e deduzir estoque.</p>
                    
                    <div className="row">
                      {barInventory.map(item => (
                        <div key={item.id} className="col-sm-6 mb-3">
                          <button 
                            onClick={() => {
                              if (item.stock <= 0) {
                                triggerToast("Estoque Esgotado", `O item ${item.name} não possui estoque disponível.`, "warning");
                                return;
                              }
                              // Deduct stock, increase sold, increase money
                              setBarInventory(prev => prev.map(inv => inv.id === item.id ? { ...inv, stock: inv.stock - 1, sold: inv.sold + 1 } : inv));
                              setFinancialStats(stats => ({
                                ...stats,
                                receita: stats.receita + item.price,
                                saldo: stats.saldo + item.price,
                                lucro: stats.lucro + item.price
                              }));
                              triggerToast("Venda Registrada 🍻", `1x ${item.name} vendida por R$ ${item.price.toFixed(2)}.`);
                            }}
                            className={`w-full text-left p-3 rounded border transition-all ${theme === 'dark' ? 'bg-[#111827] border-white/5 hover:border-[#3B82F6]' : 'bg-slate-50 border-slate-300 hover:border-[#3B82F6]'} cursor-pointer`}
                          >
                            <span className={`text-xs font-semibold ${textTitle} block truncate`}>{item.name}</span>
                            <span className="text-[10px] text-[#3B82F6] font-semibold mt-1 block">Preço: R$ {item.price.toFixed(2)}</span>
                            <span className={`text-[9px] ${textSec} block mt-0.5`}>Estoque: {item.stock} uni</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Inventory management */}
                <div className="col-lg-6 mb-3">
                  <div className={`card ${cardClass} p-4 h-100`}>
                    <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Nível de Insumos</h3>
                    <div className="space-y-3">
                      {barInventory.map(item => {
                        const pct = Math.max(0, Math.min(100, Math.round((item.stock / item.maxStock) * 100)));
                        return (
                          <div key={item.id} className="space-y-1 text-xs">
                            <div className="flex justify-between font-semibold">
                              <span className={textTitle}>{item.name}</span>
                              <span className={textSec}>{item.stock.toLocaleString()} / {item.maxStock.toLocaleString()} ({pct}%)</span>
                            </div>
                            <div className={`w-full ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-200'} rounded-full h-2 overflow-hidden`}>
                              <div 
                                className={`h-full ${pct < 20 ? 'bg-[#EF4444]' : pct < 50 ? 'bg-[#F59E0B]' : 'bg-[#22C55E]'} transition-all duration-300`} 
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= GESTÃO DE PATRIMÔNIO & POS VIEW ================= */}
          {currentTab === 'patrimonio' && installedApps.patrimonio === true && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Patrimônio & Terminais POS</h2>
                <p className={`text-xs ${textSec} mb-0`}>Monitore a entrega, status de manutenção e distribuição física das maquininhas de cartão.</p>
              </div>

              <div className={`card ${cardClass} p-4`}>
                <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Terminais Ativos</h3>
                <div className="table-responsive">
                  <table className={`table table-striped table-hover text-xs ${textBody}`}>
                    <thead>
                      <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                        <th className="p-3 border-0">Nº de Série</th>
                        <th className="p-3 border-0">Evento Vinculado</th>
                        <th className="p-3 border-0">Operador</th>
                        <th className="p-3 border-0 text-center">Bateria</th>
                        <th className="p-3 border-0 text-center">Status</th>
                        <th className="p-3 border-0 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posTerminals.map(pos => (
                        <tr key={pos.id} className={`border-bottom ${borderCol}/40 hover:bg-light/5`}>
                          <td className={`p-3 border-0 font-mono font-semibold ${textTitle}`}>{pos.serial}</td>
                          <td className={`p-3 border-0 font-semibold ${textTitle}`}>{pos.event}</td>
                          <td className={`p-3 border-0 ${textSec}`}>{pos.operator}</td>
                          <td className="p-3 border-0 text-center font-mono font-semibold">{pos.battery}%</td>
                          <td className="p-3 border-0 text-center">
                            <span className={`badge ${
                              pos.status === 'Em uso' 
                                ? 'badge-success bg-[#22C55E]/12 text-[#22C55E]' 
                                : pos.status === 'Disponível' 
                                ? 'badge-primary bg-[#3B82F6]/12 text-[#3B82F6]'
                                : 'badge-danger bg-[#EF4444]/12 text-[#EF4444]'
                            } text-[9px] font-bold px-2 py-0.5 rounded-full`}>
                              {pos.status}
                            </span>
                          </td>
                          <td className="p-3 border-0 text-right">
                            <button 
                              onClick={() => triggerToast("Comando Enviado", "Terminal resetado ou pingado com sucesso.")}
                              className="btn btn-primary btn-sm px-2.5 py-1 text-[10px] font-semibold rounded border-0 cursor-pointer"
                            >
                              Ping
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= DISK AI ANALYTICS VIEW ================= */}
          {currentTab === 'ai' && installedApps.ai === true && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Disk AI Analytics Control</h2>
                  <p className={`text-xs ${textSec} mb-0`}>Auditoria autônoma de margens de eventos, anomalías fiscais e controle de conciliação.</p>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-8 mb-3">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                    <div>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Relatório de Auditoria Contábil Automática</h3>
                      <div className="space-y-3 text-xs leading-relaxed">
                        <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} border ${borderCol} rounded`}>
                          <h4 className="text-xs font-bold text-[#22C55E] flex items-center mb-1">
                            <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                            Nenhuma Anomalia Crítica Encontrada
                          </h4>
                          <p className={`${textSec} mb-0`}>Os borderôs de eventos batem 100% com as taxas de comissionamento de lote acordadas em contrato.</p>
                        </div>

                        <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} border ${borderCol} rounded`}>
                          <h4 className="text-xs font-bold text-[#3B82F6] flex items-center mb-1">
                            <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                            Spread e Markup de Operações
                          </h4>
                          <p className={`${textSec} mb-0`}>Custo médio de Gateway de Pagamentos fixado em 3.0% da receita bruta dos eventos. Margem preservada.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4 pt-3 border-top border-light/5">
                      <button 
                        onClick={() => triggerAIResponse('conciliacao')}
                        className="btn btn-primary py-2 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer"
                      >
                        Auditar Conciliação
                      </button>
                      <button 
                        onClick={() => triggerAIResponse('dre')}
                        className="btn btn-primary py-2 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer"
                      >
                        Análise Margens DRE
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 mb-3">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                    <div>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Copilot Widget</h3>
                      <p className={`text-xs ${textSec} leading-relaxed`}>
                        O copiloto fiscal está ativo e pode ser acessado também através do balão flutuante no canto inferior direito da tela.
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setChatOpen(true)}
                      className="btn btn-primary w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer"
                    >
                      Abrir Janela Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 6. CENTRAL DE APLICATIVOS (APP STORE) ================= */}
          {currentTab === 'appstore' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Central de Aplicativos</h2>
                <p className={`text-xs ${textSec} mb-0`}>Instale ou adquira módulos integrados de acordo com o plano do seu ecossistema.</p>
              </div>

              <div className="row">
                {appsCatalog.map(app => {
                  const IconComponent = app.icon;
                  const eligible = isPlanEligible(app.planRequired);
                  const installed = installedApps[app.id] === true;
                  const installing = installedApps[app.id] === 'installing';

                  return (
                    <div key={app.id} className="col-md-4 mb-3">
                      <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                        <div>
                          <div className="flex items-start justify-between mb-3">
                            <div className={`w-12 h-12 rounded flex items-center justify-center ${
                              eligible ? 'bg-blue-500/10 text-[#3B82F6]' : `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textSec}`
                            }`}>
                              <IconComponent className="w-6 h-6" />
                            </div>
                            
                            <div className="flex flex-col items-end space-y-1">
                              {installed ? (
                                <span className="badge badge-success bg-[#22C55E]/12 text-[#22C55E] text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Ativo</span>
                              ) : eligible ? (
                                <span className="badge badge-primary bg-blue-500/10 text-[#3B82F6] text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Desbloqueado</span>
                              ) : (
                                <span className="badge badge-warning bg-[#F59E0B]/12 text-[#FB923C] text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center space-x-1">
                                  <Lock className="w-2.5 h-2.5" />
                                  <span>Requer {app.planRequired}</span>
                                </span>
                              )}
                              <span className={`text-[8px] ${textSec} uppercase tracking-widest font-bold font-mono`}>{app.category}</span>
                            </div>
                          </div>

                          <h3 className={`text-sm font-bold ${textTitle} mb-1`}>{app.name}</h3>
                          <p className={`text-xs ${textSec} leading-relaxed mb-0`}>{app.desc}</p>
                        </div>

                        <div className={`mt-4 pt-3 border-top ${borderCol}`}>
                          {installed ? (
                            <button 
                              disabled 
                              className={`btn w-full py-2 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-100'} text-[#64748B] text-xs font-semibold rounded cursor-not-allowed flex items-center justify-center space-x-1 border-0`}
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Módulo Ativo</span>
                            </button>
                          ) : installing ? (
                            <button 
                              disabled 
                              className={`btn w-full py-2 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-100'} text-slate-400 text-xs font-semibold rounded flex items-center justify-center space-x-2 border-0`}
                            >
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Instalando...</span>
                            </button>
                          ) : eligible ? (
                            <button 
                              onClick={() => handleInstallApp(app.id, app.name)}
                              className="btn btn-primary w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0"
                            >
                              Instalar Módulo
                            </button>
                          ) : (
                            <button 
                              onClick={() => {
                                setCurrentTab('marketplace');
                                triggerToast("Upgrade Necessário", `O plano atual não dá suporte ao módulo ${app.name}.`, "warning");
                              }}
                              className={`btn w-full py-2 ${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded flex items-center justify-center space-x-1 border-0`}
                            >
                              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                              <span>Upgrade de Plano</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= 7. MARKETPLACE VIEW ================= */}
          {currentTab === 'marketplace' && (
            <div className="space-y-4 animate-fadeIn text-center">
              <div className="max-w-2xl mx-auto space-y-2 mb-4">
                <h2 className={`text-2xl font-bold ${textTitle} tracking-tight mb-0`}>Assinaturas & Recursos Contábeis</h2>
                <p className={`text-xs ${textSec} mb-0`}>Liberte o copiloto fiscal e ferramentas de vendas físicas em escala de alta performance.</p>
              </div>

              <div className="row justify-content-center max-w-5xl mx-auto text-left">
                {/* Standard */}
                <div className="col-md-4 mb-3">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between relative hover:border-slate-700 transition-all ${
                    plan === 'standard' ? 'border-[#3B82F6] shadow-sm' : ''
                  }`}>
                    {plan === 'standard' && <div className="absolute top-4 right-4 bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-3 py-1 rounded-full font-bold">ATIVO</div>}
                    <div>
                      <span className={`text-[10px] font-bold ${textSec} uppercase tracking-widest block`}>Iniciante</span>
                      <h3 className={`text-lg font-bold ${textTitle} mt-2 mb-0`}>Standard</h3>
                      <p className={`text-xs ${textSec} mt-2`}>Gestão financeira básica, extratos de contas e conciliação manual.</p>
                      
                      <hr className={`${borderCol} my-3`} />
                      
                      <ul className={`space-y-3 text-xs ${textBody} list-unstyled pl-0`}>
                        <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-[#22C55E]" /><span>Financeiro ERP Básico</span></li>
                        <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-[#22C55E]" /><span>Borderô Contábil Simples</span></li>
                        <li className="flex items-center space-x-3 text-[#64748B]"><X className="w-4 h-4" /><span>Sem Módulos de Operações (PDV)</span></li>
                      </ul>
                    </div>
                    <button disabled={plan==='standard'} className={`btn w-full mt-4 py-2.5 ${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} text-[#64748B] text-xs font-semibold rounded cursor-not-allowed border-0`}>Plano Atual</button>
                  </div>
                </div>

                {/* Advanced */}
                <div className="col-md-4 mb-3">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between relative hover:border-[#3B82F6] transition-all ${
                    plan === 'advanced' ? 'border-[#3B82F6] shadow-sm' : ''
                  }`}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F97316] text-white text-[9px] px-4 py-1 rounded-full font-semibold tracking-widest shadow-md">RECOMENDADO</div>
                    {plan === 'advanced' && <div className="absolute top-4 right-4 bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-3 py-1 rounded-full font-bold">ATIVO</div>}
                    <div>
                      <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest block">Profissional</span>
                      <h3 className={`text-lg font-bold ${textTitle} mt-2 mb-0`}>Advanced</h3>
                      <p className={`text-xs ${textSec} mt-2`}>Libera CRM comercial, campanhas de Marketing e gestão de PDVs externos.</p>
                      
                      <hr className={`${borderCol} my-3`} />
                      
                      <ul className={`space-y-3 text-xs ${textBody} list-unstyled pl-0`}>
                        <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-[#22C55E]" /><span>CRM de Vendas & Mkt</span></li>
                        <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-[#22C55E]" /><span>PDVs & Logística</span></li>
                        <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-[#22C55E]" /><span>Automação Contábil Completa</span></li>
                      </ul>
                    </div>
                    <button disabled={plan==='advanced'} onClick={()=>handleUpgradePlan('advanced', 'Advanced')} className="btn btn-primary w-full mt-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded transition-all border-0">Assinar Advanced</button>
                  </div>
                </div>

                {/* Expert */}
                <div className="col-md-4 mb-3">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between relative hover:border-[#3B82F6] transition-all ${
                    plan === 'expert' ? 'border-[#3B82F6] shadow-sm' : ''
                  }`}>
                    {plan === 'expert' && <div className="absolute top-4 right-4 bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-3 py-1 rounded-full font-bold">ATIVO</div>}
                    <div>
                      <span className="text-xs font-bold text-[#F97316] uppercase tracking-widest block">Alta Escala</span>
                      <h3 className={`text-lg font-bold ${textTitle} mt-2 mb-0`}>Expert</h3>
                      <p className={`text-xs ${textSec} mt-2`}>Disk AI Copilot, emissor de notas fiscais SEFAZ ilimitado e auditoria de spreads.</p>
                      
                      <hr className={`${borderCol} my-3`} />
                      
                      <ul className={`space-y-3 text-xs ${textBody} list-unstyled pl-0`}>
                        <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-[#22C55E]" /><span>Disk AI Copilot & Open Finance</span></li>
                        <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-[#22C55E]" /><span>Módulos de Bar & POS Insumos</span></li>
                        <li className="flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-[#22C55E]" /><span>Notas fiscais Ilimitadas</span></li>
                      </ul>
                    </div>
                    <button disabled={plan==='expert'} onClick={()=>handleUpgradePlan('expert', 'Expert')} className="btn w-full mt-4 py-2.5 bg-[#F97316] hover:bg-orange-600 text-white text-xs font-semibold rounded transition-all border-0">Assinar Expert</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 8. ROADMAP & STATUS VIEW ================= */}
          {currentTab === 'roadmap' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Status & Roadmap do Projeto</h2>
                <p className={`text-xs ${textSec} mb-0`}>Acompanhe as fases de desenvolvimento do novo ecossistema ERP/CRM.</p>
              </div>

              {/* Progress Summary */}
              <div className={`card ${cardClass} p-4 space-y-3`}>
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
                  <span className="text-[#3B82F6]">Progresso Geral do Protótipo (Fases 1 e 2)</span>
                  <span className={textTitle}>100% Concluído</span>
                </div>
                <div className={`w-full ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-200'} rounded-full h-3 border ${borderCol} overflow-hidden p-0.5`}>
                  <div className="bg-[#3B82F6] h-full rounded-full w-full"></div>
                </div>
                <p className={`text-xs ${textSec} leading-relaxed mb-0`}>
                  Todas as especificações de navegação simulada, layouts multibanco, gestão de borderôs e comissionamento foram entregues como protótipo interativo e modular.
                </p>
              </div>

              {/* Phases Grid */}
              <div className="row">
                
                {/* Phase 1 */}
                <div className="col-lg-4 mb-3">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                    <div>
                      <div className={`flex items-center justify-between mb-3 border-bottom ${borderCol} pb-2`}>
                        <h3 className={`text-xs font-semibold ${textTitle} uppercase tracking-wider mb-0`}>Fase 1: Demonstração</h3>
                        <span className="badge badge-success bg-[#22C55E]/12 text-[#22C55E] text-[9px] px-2 py-0.5 rounded-full font-bold">Entregue</span>
                      </div>
                      <ul className={`space-y-2 text-xs ${textBody} list-unstyled pl-0`}>
                        <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" /><span>Dashboard navegável estruturado</span></li>
                        <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" /><span>Marketplace de módulos comercializáveis</span></li>
                        <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" /><span>Níveis de Planos e Upgrade simulados</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="col-lg-4 mb-3">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                    <div>
                      <div className={`flex items-center justify-between mb-3 border-bottom ${borderCol} pb-2`}>
                        <h3 className={`text-xs font-semibold ${textTitle} uppercase tracking-wider mb-0`}>Fase 2: Protótipo</h3>
                        <span className="badge badge-success bg-[#22C55E]/12 text-[#22C55E] text-[9px] px-2 py-0.5 rounded-full font-bold">Entregue</span>
                      </div>
                      <ul className={`space-y-2 text-xs ${textBody} list-unstyled pl-0`}>
                        <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" /><span>Navegação completa entre abas e módulos</span></li>
                        <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" /><span>Banco de dados em memória React dinâmico</span></li>
                        <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" /><span>Fluxos realistas: Sangrias de PDV e emissões</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="col-lg-4 mb-3">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                    <div>
                      <div className={`flex items-center justify-between mb-3 border-bottom ${borderCol} pb-2`}>
                        <h3 className={`text-xs font-semibold ${textTitle} uppercase tracking-wider mb-0`}>Fase 3: Produção</h3>
                        <span className="badge badge-primary bg-[#3B82F6]/10 text-[#3B82F6] text-[9px] px-2 py-0.5 rounded font-bold uppercase animate-pulse">Planejado</span>
                      </div>
                      <ul className={`space-y-2 text-xs ${textBody} list-unstyled pl-0`}>
                        <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" /><span>Migração estática React + Vite e Tailwind</span></li>
                        <li className="flex items-start space-x-2 text-[#64748B]"><Lock className="w-4 h-4 shrink-0 mt-0.5" /><span>Integrações Open Finance & Bancos de dados</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* NOTIFICATION TOAST */}
        {toast.show && (
          <div className={`fixed bottom-6 left-6 z-50 ${bgCard} border ${borderCol} ${textTitle} px-4 py-3 rounded shadow-2xl flex items-center space-x-3 transition-all duration-300 animate-slideUp`}>
            <div className="p-1 bg-[#3B82F6]/10 text-[#3B82F6] rounded shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white mb-0">{toast.title}</h4>
              <p className={`text-[10px] ${textSec} mt-0.5 mb-0`}>{toast.body}</p>
            </div>
          </div>
        )}

        {/* DISK AI WIDGET (COPILOT) */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            
          {chatOpen && (
            <div className={`w-96 max-h-[500px] ${bgCard} border ${borderCol} rounded shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-305 origin-bottom-right`}>
              {/* Chat Header */}
              <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-100'} border-bottom ${borderCol} flex items-center justify-between`}>
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded bg-[#2563EB] flex items-center justify-center text-white shadow">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`text-xs font-semibold ${textTitle} mb-0`}>Disk AI Copilot</h3>
                    <p className="text-[9px] text-[#22C55E] font-medium flex items-center mb-0">
                      <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full inline-block mr-1"></span>
                      Online & Ativo
                    </p>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className={`${textSec} hover:text-white bg-transparent border-0 cursor-pointer`}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3 h-[280px]" id="chat-messages">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                    {msg.sender === 'ai' && (
                      <div className="w-6 h-6 rounded bg-blue-500/10 border border-white/5 text-[#3B82F6] flex items-center justify-center font-bold text-[9px] p-1 shrink-0">
                        AI
                      </div>
                    )}
                    <div className={`p-3 rounded max-w-[80%] border text-[11px] leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-[#2563EB] border-transparent text-white' 
                        : `${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} border ${borderCol} ${textBody}`
                    }`}>
                      <p className="mb-0">{msg.text}</p>
                      {msg.htmlResponse && msg.htmlResponse}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start space-x-2.5">
                    <div className="w-6 h-6 rounded bg-blue-500/10 border border-[#1e2533] text-[#3B82F6] flex items-center justify-center font-bold text-[9px] p-1 shrink-0">
                      AI
                    </div>
                    <div className={`${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-550'} border ${borderCol} p-3 rounded max-w-[80%]`}>
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions Grid inside Chat */}
              <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} border-top ${borderCol}`}>
                <p className={`text-[9px] ${textSec} uppercase tracking-wider font-semibold mb-2`}>Comandos Rápidos</p>
                <div className="row g-2">
                  <div className="col-6">
                    <button onClick={() => triggerAIResponse('conciliacao')} className={`btn btn-light w-full text-left truncate text-[10px] p-2 bg-transparent border ${borderCol} ${textTitle}`}>
                      🔍 Fazer Conciliação
                    </button>
                  </div>
                  <div className="col-6">
                    <button onClick={() => triggerAIResponse('dre')} className={`btn btn-light w-full text-left truncate text-[10px] p-2 bg-transparent border ${borderCol} ${textTitle}`}>
                      📊 Gerar DRE
                    </button>
                  </div>
                  <div className="col-6">
                    <button onClick={() => triggerAIResponse('nfe')} className={`btn btn-light w-full text-left truncate text-[10px] p-2 bg-transparent border ${borderCol} ${textTitle}`}>
                      🧾 Notas Pendentes
                    </button>
                  </div>
                  <div className="col-6">
                    <button onClick={() => triggerAIResponse('borderos')} className={`btn btn-light w-full text-left truncate text-[10px] p-2 bg-transparent border ${borderCol} ${textTitle}`}>
                      📋 Status Borderôs
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendCustomText} className={`p-2.5 ${bgCard} border-top ${borderCol} flex space-x-2`}>
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Pergunte..."
                  className={`form-control form-control-sm flex-1 ${theme === 'dark' ? 'bg-[#111827] text-white border-white/5' : 'bg-slate-50 text-slate-900 border-slate-300'} text-xs`}
                />
                <button type="submit" className="btn btn-primary p-1 bg-[#2563EB] hover:bg-[#1D4ED8] rounded text-white active:scale-95 transition-all border-0">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Chat Button Toggle */}
          <button 
            onClick={() => setChatOpen(!chatOpen)} 
            className="btn btn-primary w-14 h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-circle flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border-0"
          >
            <Brain className="w-6 h-6" />
          </button>
        </div>

      </main>

      {/* ================= MODALS ================= */}
      
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

      {/* 3. CREATE COUPON MODAL */}
      {showAddCouponModal && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${bgCard} border ${borderCol} rounded w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp`}>
            <div className={`p-4 border-bottom ${borderCol} flex justify-between items-center ${bgCard}`}>
              <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Criar Cupom de Desconto</h3>
              <button onClick={() => setShowAddCouponModal(false)} className={`bg-transparent border-0 cursor-pointer ${textSec} ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-905'}`}>
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateCoupon} className="p-4 space-y-3">
              <div className="form-group mb-2">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Código do Cupom *</label>
                <input 
                  type="text" 
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="Ex: PROMO20"
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle} uppercase tracking-wider font-mono`}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Percentual de Desconto (%) *</label>
                <input 
                  type="number" 
                  value={newCoupon.discount}
                  onChange={(e) => setNewCoupon(prev => ({ ...prev, discount: e.target.value }))}
                  placeholder="Ex: 20"
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle} font-mono`}
                  min="1"
                  max="100"
                  required
                />
              </div>

              <div className="pt-3 flex space-x-3 justify-end border-top border-light/5 mt-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddCouponModal(false)}
                  className={`btn ${btnSecondary} text-xs font-semibold rounded py-2 px-3`}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary text-white text-xs font-semibold rounded py-2 px-3 border-0 bg-[#2563EB] hover:bg-[#1D4ED8]"
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

      {/* 5. ADD CAMPAIGN MODAL */}
      {showAddCampaignModal && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${bgCard} border ${borderCol} rounded w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp`}>
            <div className={`p-4 border-bottom ${borderCol} flex justify-between items-center ${bgCard}`}>
              <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Criar Nova Campanha de Marketing</h3>
              <button onClick={() => setShowAddCampaignModal(false)} className={`bg-transparent border-0 cursor-pointer ${textSec} ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-905'}`}>
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateCampaign} className="p-4 space-y-3">
              <div className="form-group mb-2">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Nome da Campanha *</label>
                <input 
                  type="text" 
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Pré-venda Festival de Inverno"
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle}`}
                  required
                />
              </div>

              <div className="row mb-2">
                <div className="col-6 form-group">
                  <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Canal de Disparo</label>
                  <select 
                    value={newCampaign.channel}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, channel: e.target.value }))}
                    className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${selectThemeText}`}
                  >
                    <option value="E-mail">E-mail</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="SMS">SMS</option>
                  </select>
                </div>
                <div className="col-6 form-group">
                  <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Data de Envio *</label>
                  <input 
                    type="text" 
                    value={newCampaign.date}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, date: e.target.value }))}
                    placeholder="20/07/2026"
                    className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle} font-mono`}
                    required
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label className={`text-[10px] font-semibold ${textSec} uppercase`}>Assunto / Conteúdo Notificação *</label>
                <input 
                  type="text" 
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Ex: Não perca! Lote exclusivo com 20% de desconto..."
                  className={`form-control form-control-sm ${bgInput} border ${borderCol} rounded p-2 text-xs focus:outline-none focus:border-[#3B82F6] ${textTitle}`}
                  required
                />
              </div>

              <div className="pt-3 flex space-x-3 justify-end border-top border-light/5 mt-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddCampaignModal(false)}
                  className={`btn ${btnSecondary} text-xs font-semibold rounded py-2 px-3`}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary text-white text-xs font-semibold rounded py-2 px-3 border-0 bg-[#2563EB] hover:bg-[#1D4ED8]"
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
