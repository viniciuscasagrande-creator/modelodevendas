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
  ChevronLeft, 
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
  Mic,
  Crown,
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
  Menu,
  Building,
  Clock,
  Target,
  Award,
  Music,
  Globe,
  Terminal,
  FileSpreadsheet
} from 'lucide-react';
import PlansPage from './pages/PlansPage';

export default function App() {
  // Navigation & General configuration
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [financeSubTab, setFinanceSubTab] = useState('dashboard');
  const [accountingSubTab, setAccountingSubTab] = useState('dashboard');
  const [marketingSubTab, setMarketingSubTab] = useState('licensing');
  const [crmSubTab, setCrmSubTab] = useState('dashboard');

  // Phase 2 states
  const [receivables, setReceivables] = useState([
    { id: 'rec-1', desc: 'Venda de Ingressos - Lote 1 Inverno', amount: 154000.00, method: 'Cartão', due: '2026-07-20', status: 'Recebido' },
    { id: 'rec-2', desc: 'Patrocínio Master - Itaú', amount: 150000.00, method: 'PIX', due: '2026-07-22', status: 'Pendente' },
    { id: 'rec-3', desc: 'Venda de Camarotes - Metal Fest', amount: 25000.00, method: 'Boleto', due: '2026-07-15', status: 'Atrasado' },
  ]);
  const [payables, setPayables] = useState([
    { id: 'pay-1', desc: 'Repasse Produtor - Lote 1 Inverno', amount: 120000.00, due: '2026-07-25', status: 'Agendado', category: 'Repasse', costCenter: 'Eventos' },
    { id: 'pay-2', desc: 'Aluguel de Palco - Curitiba Arena', amount: 15000.00, due: '2026-07-18', status: 'Pendente', category: 'Infraestrutura', costCenter: 'Operacional' },
    { id: 'pay-3', desc: 'Impostos Federais DAS Junho', amount: 8400.00, due: '2026-07-10', status: 'Pago', category: 'Impostos', costCenter: 'Administrativo' },
  ]);
  const [costCenters, setCostCenters] = useState([
    { id: 'cc-1', name: 'Eventos', budget: 500000 },
    { id: 'cc-2', name: 'Marketing', budget: 150000 },
    { id: 'cc-3', name: 'Operacional', budget: 200000 },
    { id: 'cc-4', name: 'Logística', budget: 100000 },
    { id: 'cc-5', name: 'Administrativo', budget: 80000 },
  ]);
  const [newReceivable, setNewReceivable] = useState({ desc: '', amount: '', method: 'PIX', due: '2026-07-20' });
  const [newPayable, setNewPayable] = useState({ desc: '', amount: '', category: 'Fornecedor', due: '2026-07-20', costCenter: 'Eventos' });

  // Contabilidade states
  const [contabilPlanoContas, setContabilPlanoContas] = useState([
    { code: '1.1.01', name: 'Caixa e Equivalentes de Caixa', type: 'Ativo', balance: 950000 },
    { code: '1.1.02', name: 'Clientes a Receber', type: 'Ativo', balance: 179000 },
    { code: '2.1.01', name: 'Fornecedores a Pagar', type: 'Passivo', balance: 135000 },
    { code: '2.1.02', name: 'Impostos a Recolher', type: 'Passivo', balance: 8400 },
    { code: '3.1.01', name: 'Receita com Venda de Ingressos', type: 'Receitas', balance: 2580000 },
    { code: '4.1.01', name: 'Custos de Eventos / Produção', type: 'Custos', balance: 620000 },
    { code: '4.1.02', name: 'Despesas com Pessoal / Fixas', type: 'Despesas', balance: 1480000 },
  ]);
  const [contabilLancamentos, setContabilLancamentos] = useState([
    { id: 'cl-1', date: '15/07/2026', debit: '1.1.01', credit: '3.1.01', amount: 45000, desc: 'Reconhecimento de Receita - Festival de Inverno' },
    { id: 'cl-2', date: '14/07/2026', debit: '4.1.01', credit: '2.1.01', amount: 18000, desc: 'Lançamento de Despesa de Segurança Terceirizada' },
    { id: 'cl-3', date: '12/07/2026', debit: '4.1.01', credit: '1.1.01', amount: 35000, desc: 'PGTO de Aluguel de LED - Lançamento Automático' },
  ]);
  const [contabilAuditorias, setContabilAuditorias] = useState([
    { id: 'aud-1', type: 'Sucesso', msg: 'Integração Financeira ➔ Contábil realizada para lote de faturamento #982.', date: '15/07/2026' },
    { id: 'aud-2', type: 'Alerta', msg: 'Lançamento manual de ajuste na conta 1.1.02 sem documento fiscal anexado.', date: '14/07/2026' },
  ]);

  const [plan, setPlan] = useState('essencial');
  const [theme, setTheme] = useState('light'); // 'dark' or 'light'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState('');
  const [eventWizardStep, setEventWizardStep] = useState(1);
  const [wizardInputs, setWizardInputs] = useState({ name: '', category: 'Show / Festival', date: '', time: '', city: '', venue: '', capacity: '', producer: '', organizer: '', ticketsPrice: '150', marketingPlan: 'start' });
  const [isListening, setIsListening] = useState(false);
  
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // e.g. 0.20 for 20%
  const [additionalUsersCount, setAdditionalUsersCount] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [paymentSimulationOpen, setPaymentSimulationOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);
  const [activeTrial, setActiveTrial] = useState(false);

  // App store installation simulation state
  const [installedApps, setInstalledApps] = useState({
    financeiro: true,
    contabilidade: true,
    crm: true,
    mkt: true,
    pdv: true,
    logistica: true,
    bar: true,
    patrimonio: false,
    ai: false,
    eventos: true
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
  
  // Marketplace states
  const [mktSearch, setMktSearch] = useState('');
  const [mktCategory, setMktCategory] = useState('Todos');
  const [mktPlan, setMktPlan] = useState('Todos');
  const [mktSort, setMktSort] = useState('Popular');
  const [selectedApp, setSelectedApp] = useState(null);
  const [appDetailTab, setAppDetailTab] = useState('overview');
  
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

  // Theme-based class mapping (Disk Hub Design System - DHDS)
  const bgMain = theme === 'dark' ? 'bg-[#0F172A] text-[#F8FAFC]' : 'bg-[#F5F7FB] text-[#111827]';
  const sidebarClass = theme === 'dark' ? 'bg-[#111827] border-r border-[#1F2937]' : 'bg-white border-r border-[#E2E8F0]';
  const cardClass = theme === 'dark' ? 'bg-[#111827] border border-[#1F2937] shadow-sm rounded-[18px]' : 'bg-white border border-[#E2E8F0] shadow-sm rounded-[18px]';
  const cardHeaderClass = theme === 'dark' ? 'border-b border-[#1F2937] bg-[#111827]/40 px-4 py-3' : 'border-b border-[#E2E8F0] bg-slate-50/50 px-4 py-3';
  const inputClass = theme === 'dark' ? 'bg-[#0F172A] border-[#1F2937] text-white focus:ring-2 focus:ring-[#2563EB]/40' : 'bg-white border-[#E2E8F0] text-[#111827] focus:ring-2 focus:ring-[#2563EB]/40';
  const headerClass = theme === 'dark' ? 'bg-[#111827] border-b border-[#1F2937]' : 'bg-white border-b border-[#E2E8F0]';
  
  const borderCol = theme === 'dark' ? 'border-[#1F2937]' : 'border-[#E2E8F0]';
  const textTitle = theme === 'dark' ? 'text-[#F8FAFC] font-semibold' : 'text-[#111827] font-semibold';
  const textSec = theme === 'dark' ? 'text-[#94A3B8]' : 'text-[#64748B]';
  const textBody = theme === 'dark' ? 'text-[#F8FAFC]/90' : 'text-[#111827]/90';
  const selectThemeText = theme === 'dark' ? 'text-[#F8FAFC] font-medium' : 'text-[#111827] font-semibold';
  
  const btnSecondary = theme === 'dark' ? 'btn-secondary bg-[#1F2937] text-white hover:bg-[#374151] border-0' : 'btn-light bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200';

  // Commercial App Catalog mapped to Plan Requirements
  const appsCatalog = [
    { 
      id: 'financeiro', 
      name: 'Financeiro (ERP)', 
      desc: 'Gestão de contas, saldo, fluxo de caixa e conciliação bancária.', 
      category: 'Finanças', 
      planRequired: 'standard', 
      icon: CreditCard,
      rating: 4.8,
      downloads: 4120,
      features: ['Fluxo de Caixa', 'Contas a Pagar/Receber', 'PIX Direto', 'Conciliação Bancária', 'Relatórios Financeiros'],
      benefits: ['Audite todas as entradas e saídas de caixa em tempo real', 'Automatize conciliações e evite erros operacionais', 'Gestão unificada de contas em múltiplos bancos'],
      detailedDesc: 'O módulo Financeiro ERP é o coração da gestão do seu negócio. Ele consolida contas correntes, caixas físicos e carteiras digitais em um painel unificado, permitindo conciliação automatizada de PIX, cartões e boletos de forma contínua.'
    },
    { 
      id: 'contabilidade', 
      name: 'Contabilidade Disk', 
      desc: 'Borderôs oficiais, notas fiscais, DRE e relatórios fiscais.', 
      category: 'Fiscal', 
      planRequired: 'standard', 
      icon: Receipt,
      rating: 4.9,
      downloads: 2431,
      features: ['Emissão de NF-e e NFS-e', 'DRE Contábil por Competência', 'Fechamento de Borderôs', 'Relatórios Fiscais', 'Auditoria de Gateways'],
      benefits: ['Transmita NFes diretamente para a SEFAZ em lote', 'Calcule lucros por competência automaticamente', 'Reduza custos tributários com relatórios organizados'],
      detailedDesc: 'A Contabilidade Disk oferece uma solução robusta para o controle contábil e fiscal do seu negócio. Desenvolvida para auditar e organizar todas as obrigações fiscais decorrentes das vendas de ingressos, emissões de notas e fechamento de borderôs de produtores.'
    },
    { 
      id: 'crm', 
      name: 'CRM de Vendas', 
      desc: 'Contatos de novos produtores, funil de vendas e metas comerciais.', 
      category: 'Vendas', 
      planRequired: 'advanced', 
      icon: Users,
      rating: 4.7,
      downloads: 1850,
      features: ['Pipeline Kanban Customizável', 'Cadastro de Contatos e Leads', 'Gestão de Oportunidades', 'Histórico de Interações', 'Metas Comerciais'],
      benefits: ['Acompanhe a evolução de novos produtores no funil', 'Nunca perca o timing de uma negociação comercial', 'Métricas de conversão de leads integradas'],
      detailedDesc: 'O CRM de Vendas permite a você gerenciar o relacionamento com produtores e organizadores de eventos de forma inteligente. Com o funil Kanban reativo, você consegue arrastar as oportunidades de vendas e identificar gargalos na prospecção comercial.'
    },
    { 
      id: 'mkt', 
      name: 'Marketing Automação', 
      desc: 'Disparo de e-mails em massa e gerador de cupons de desconto.', 
      category: 'Marketing', 
      planRequired: 'advanced', 
      icon: Mail,
      rating: 4.6,
      downloads: 1240,
      features: ['Disparo de Campanhas Massivas', 'Disparos via WhatsApp e SMS', 'Criador de Cupons de Desconto', 'Analytics de ROI e Métricas', 'Filtro de Clientes'],
      benefits: ['Aumente o engajamento com campanhas direcionadas', 'Crie cupons dinâmicos para eventos e lotes', 'Métricas de retorno sobre o investimento em publicidade'],
      detailedDesc: 'O módulo de Automação de Marketing foi desenhado para maximizar a conversão das vendas de ingressos. Com ferramentas para envio de e-mails em lote, cupons dinâmicos e disparo integrado via WhatsApp e SMS, você alcança sua base de forma cirúrgica.'
    },
    { 
      id: 'pdv', 
      name: 'Gestão de PDVs', 
      desc: 'Controle de pontos de venda, monitor de caixas e sangrias.', 
      category: 'Operações', 
      planRequired: 'advanced', 
      icon: ShoppingBag,
      rating: 4.8,
      downloads: 980,
      features: ['Monitor de Terminais Físicos', 'Fechamento de Caixa Cego', 'Gestão de Sangrias de Dinheiro', 'Configuração de Taxas locais', 'Histórico de Lançamentos'],
      benefits: ['Gerencie bilheterias locais e quiosques externos', 'Realize recolhimentos rápidos e seguros de valores', 'Evite quebras de caixa com auditoria contínua'],
      detailedDesc: 'A Gestão de PDVs é ideal para organizadores que realizam vendas de ingressos físicas em bilheterias de eventos, teatros ou pontos credenciados. Permite abertura e fechamento de caixas controlados e sangrias de valores direto para o caixa geral.'
    },
    { 
      id: 'logistica', 
      name: 'Logística & Impressão', 
      desc: 'Montagem de ingressos físicos, períodos de entrega e layouts.', 
      category: 'Logística', 
      planRequired: 'advanced', 
      icon: Briefcase,
      rating: 4.5,
      downloads: 710,
      features: ['Lotes de Impressão de Ingressos', 'Layouts Físicos Personalizados', 'Controle de Estoque de Papel', 'Monitor de Entregas e Rastreio', 'Validação de Códigos de Barra'],
      benefits: ['Imprima lotes de ingressos físicos com segurança', 'Monitore o envio de ingressos para bilheterias locais', 'Evite fraudes de ingressos e clonagens'],
      detailedDesc: 'O módulo de Logística & Impressão coordena toda a cadeia de suprimentos de ingressos físicos e credenciais dos eventos. Crie layouts personalizados, controle os lotes de impressão por setor e acompanhe o status de transporte dos lotes.'
    },
    { 
      id: 'bar', 
      name: 'Sistema de Bar & Estoque', 
      desc: 'Cardápios digitais, controle de insumos e consumo local.', 
      category: 'Operações', 
      planRequired: 'expert', 
      icon: Layers,
      rating: 4.9,
      downloads: 1100,
      features: ['Frente de Caixa POS Bar', 'Controle de Estoque de Bebidas', 'Cardápio Digital Customizável', 'Inventário por Caixa', 'Dashboard de ROI do Bar'],
      benefits: ['Acelere o atendimento em filas de bar de eventos', 'Deduza do estoque automaticamente a cada copo vendido', 'Gestão de combos e promoções locais'],
      detailedDesc: 'O Bar & Estoque é a ferramenta definitiva para gestão de consumo nos eventos. Integre os caixas de bar ao ERP contábil principal, monitore o nível de insumos em tempo real e realize vendas rápidas com um POS otimizado para celulares e maquininhas.'
    },
    { 
      id: 'patrimonio', 
      name: 'Gestão de Patrimônio & POS', 
      desc: 'Controle de POS físicos em eventos e remessa de máquinas.', 
      category: 'Patrimônio', 
      planRequired: 'expert', 
      icon: Landmark,
      rating: 4.6,
      downloads: 620,
      features: ['Cadastro de Máquinas POS', 'Status de Conectividade e Bateria', 'Remessa e Recebimento de POS', 'Controle de Contratos com Adquirentes', 'Histórico de Manutenções'],
      benefits: ['Monitore a saúde física das maquininhas do evento', 'Organize remessas seguras para múltiplos locais', 'Evite perdas e roubos de POS nos eventos'],
      detailedDesc: 'A Gestão de Patrimônio & POS organiza os ativos tecnológicos de cobrança física do seu ecossistema. Monitore os números de série das maquininhas PAX ativas, carga da bateria, operadores de caixa e status de envio.'
    },
    { 
      id: 'ai', 
      name: 'Disk AI Copilot', 
      desc: 'Copiloto de IA para análises de margens e auditoria contábil.', 
      category: 'Inteligência', 
      planRequired: 'expert', 
      icon: Brain,
      rating: 4.9,
      downloads: 3200,
      features: ['Auditoria Fiscal Autônoma', 'Detecção de Anomalias em Borderôs', 'Assistente Conversacional Contábil', 'Previsão de Fluxo de Caixa', 'Cálculo de Spread do Gateway'],
      benefits: ['Encontre divergências tributárias em segundos', 'Tire dúvidas fiscais através de linguagem natural', 'Previsão de recebíveis de vendas futuras'],
      detailedDesc: 'O Disk AI Copilot traz inteligência generativa e preditiva para a gestão do seu negócio. Ele atua como um auditor residente 24 horas por dia, analisando faturas de gateways, detectando quebras em fechamentos e prevendo fluxo de caixa.'
    },
  ];

  const isPlanEligible = (required) => {
    if (required === 'standard') return true;
    if (required === 'advanced' || required === 'Marketing') {
      return plan === 'profissional' || plan === 'premium' || plan === 'enterprise' || plan === 'omnichannel' || plan === 'advanced' || plan === 'expert';
    }
    if (required === 'expert') {
      return plan === 'premium' || plan === 'enterprise' || plan === 'omnichannel' || plan === 'expert';
    }
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

  // ================= 3B. EVENTS MANAGEMENT DATA & STATE (FASE 4) =================
  const [eventsSubTab, setEventsSubTab] = useState('dashboard');
  
  // eventos (events)
  const [events, setEvents] = useState([
    { id: 'ev-1', name: 'Metal Fest Curitiba 2026', category: 'Show / Festival', date: '2026-09-12', time: '18:00', city: 'Curitiba', venue: 'Pedreira Paulo Leminski', capacity: 25000, producer: 'Prime Show Eventos', organizer: 'Associação de Criadores do Sul', banner: 'metal_fest_banner.jpg', status: 'Ativo' },
    { id: 'ev-2', name: 'Festival de Inverno 2026', category: 'Show / Festival', date: '2026-08-05', time: '17:00', city: 'Curitiba', venue: 'Teatro Positivo', capacity: 2400, producer: 'Gisele Produções', organizer: 'Curitiba Eventos e Convenções', banner: 'festival_inverno.jpg', status: 'Ativo' },
    { id: 'ev-3', name: 'Sunset Lounge Party', category: 'Festa / Balada', date: '2026-07-25', time: '22:00', city: 'Balneário Camboriú', venue: 'Sunset Beach Club', capacity: 1500, producer: 'Rodrigo Festas Som', organizer: 'Sunset Lounge Bar', banner: 'sunset_party.jpg', status: 'Ativo' },
    { id: 'ev-4', name: 'Expo Agro Regional 2026', category: 'Feira / Exposição', date: '2026-10-18', time: '10:00', city: 'Londrina', venue: 'Parque de Exposições Londrina', capacity: 50000, producer: 'Expo Agro Lda', organizer: 'Associação de Criadores do Sul', banner: 'expo_agro.jpg', status: 'Pendente' }
  ]);

  // eventos_locais (venues)
  const [venues, setVenues] = useState([
    { id: 'ven-1', name: 'Pedreira Paulo Leminski', capacity: 25000, accessibility: 'Total', parking: '500 vagas', backstage: 'Grande (5 camarins)', infrastructure: 'Excelente' },
    { id: 'ven-2', name: 'Teatro Positivo', capacity: 2400, accessibility: 'Total', parking: '1000 vagas', backstage: 'Profissional', infrastructure: 'Excelente' },
    { id: 'ven-3', name: 'Sunset Beach Club', capacity: 1500, accessibility: 'Parcial', parking: 'Rua / Conveniado', backstage: 'Médio (2 camarins)', infrastructure: 'Boa' },
    { id: 'ven-4', name: 'Parque de Exposições Londrina', capacity: 50000, accessibility: 'Total', parking: '5000 vagas', backstage: 'Espaço Aberto / Salas VIP', infrastructure: 'Industrial' }
  ]);

  // eventos_setores (sectors)
  const [sectors, setSectors] = useState([
    { id: 'sec-1', eventId: 'ev-1', name: 'Arena', capacity: 18000, price: 120 },
    { id: 'sec-2', eventId: 'ev-1', name: 'VIP', capacity: 4000, price: 250 },
    { id: 'sec-3', eventId: 'ev-1', name: 'Camarote', capacity: 2000, price: 450 },
    { id: 'sec-4', eventId: 'ev-1', name: 'Front Stage', capacity: 1000, price: 350 },
    { id: 'sec-5', eventId: 'ev-2', name: 'Plateia A', capacity: 1000, price: 180 },
    { id: 'sec-6', eventId: 'ev-2', name: 'Plateia B', capacity: 1200, price: 140 },
    { id: 'sec-7', eventId: 'ev-2', name: 'Área PCD', capacity: 200, price: 70 }
  ]);

  // eventos_lotes (ticket batches)
  const [ticketBatches, setTicketBatches] = useState([
    { id: 'lot-1', eventId: 'ev-1', sectorId: 'sec-1', name: 'Lote 1', autoSwitch: true, qty: 10000, price: 120, fee: 12, status: 'Encerrado' },
    { id: 'lot-2', eventId: 'ev-1', sectorId: 'sec-1', name: 'Lote 2', autoSwitch: true, qty: 8000, price: 140, fee: 14, status: 'Ativo' },
    { id: 'lot-3', eventId: 'ev-1', sectorId: 'sec-2', name: 'Lote Promocional', autoSwitch: false, qty: 1000, price: 200, fee: 20, status: 'Encerrado' },
    { id: 'lot-4', eventId: 'ev-1', sectorId: 'sec-2', name: 'Lote 1', autoSwitch: true, qty: 3000, price: 250, fee: 25, status: 'Ativo' },
    { id: 'lot-5', eventId: 'ev-2', sectorId: 'sec-5', name: 'Lote único', autoSwitch: false, qty: 1000, price: 180, fee: 18, status: 'Ativo' }
  ]);

  // eventos_ingressos (tickets issued/sold)
  const [issuedTickets, setIssuedTickets] = useState([
    { id: 'tix-1', eventId: 'ev-1', sectorId: 'sec-1', batchId: 'lot-1', type: 'Inteira', price: 120, barcode: '789123456001', qrCode: 'TIX-EV1-SEC1-LOT1-001', status: 'Checkin', customerName: 'Juliana Vieira', checkinTime: '2026-09-12 18:30' },
    { id: 'tix-2', eventId: 'ev-1', sectorId: 'sec-1', batchId: 'lot-1', type: 'Meia', price: 60, barcode: '789123456002', qrCode: 'TIX-EV1-SEC1-LOT1-002', status: 'Checkin', customerName: 'Roberto Alencar', checkinTime: '2026-09-12 18:45' },
    { id: 'tix-3', eventId: 'ev-1', sectorId: 'sec-2', batchId: 'lot-4', type: 'VIP', price: 250, barcode: '789123456003', qrCode: 'TIX-EV1-SEC2-LOT4-003', status: 'Pendente', customerName: 'Mariana Costa', checkinTime: null },
    { id: 'tix-4', eventId: 'ev-2', sectorId: 'sec-5', batchId: 'lot-5', type: 'Cortesia', price: 0, barcode: '789123456004', qrCode: 'TIX-EV2-SEC5-LOT5-004', status: 'Pendente', customerName: 'Sandra Costa', checkinTime: null },
    { id: 'tix-5', eventId: 'ev-1', sectorId: 'sec-3', batchId: 'lot-3', type: 'Imprensa', price: 0, barcode: '789123456005', qrCode: 'TIX-EV1-SEC3-LOT3-005', status: 'Pendente', customerName: 'Carlos Henrique', checkinTime: null }
  ]);

  // eventos_pdv (sales transactions)
  const [pdvSales, setPdvSales] = useState([
    { id: 'sale-1', eventId: 'ev-1', pdvId: 'pdv-1', operator: 'Sandra Costa', amount: 240, paymentMethod: 'PIX', type: 'Ingresso', status: 'Aprovado', date: '2026-07-15' },
    { id: 'sale-2', eventId: 'ev-1', pdvId: 'pdv-1', operator: 'Sandra Costa', amount: 80, paymentMethod: 'Dinheiro', type: 'Consumo', status: 'Aprovado', date: '2026-07-16' },
    { id: 'sale-3', eventId: 'ev-2', pdvId: 'pdv-2', operator: 'Daniel Santos', amount: 350, paymentMethod: 'Cartão', type: 'Ingresso', status: 'Aprovado', date: '2026-07-17' },
    { id: 'sale-4', eventId: 'ev-1', pdvId: 'pdv-1', operator: 'Sandra Costa', amount: 120, paymentMethod: 'Cartão', type: 'Ingresso', status: 'Cancelado', date: '2026-07-16' }
  ]);

  // eventos_checkin (check-in events records)
  const [checkins, setCheckins] = useState([
    { id: 'chk-1', ticketId: 'tix-1', timestamp: '2026-09-12 18:30:15', method: 'QR Code', status: 'Sucesso' },
    { id: 'chk-2', ticketId: 'tix-2', timestamp: '2026-09-12 18:45:22', method: 'Código de Barras', status: 'Sucesso' }
  ]);

  // eventos_credenciamento (staff/artist credentials)
  const [credencials, setCredencials] = useState([
    { id: 'crd-1', name: 'Ana Souza', cpf: '111.222.333-44', type: 'Staff', company: 'DiskHub', item: 'Crachá + Pulseira', status: 'Entregue' },
    { id: 'crd-2', name: 'Thiaguinho do Pagode', cpf: '555.444.333-22', type: 'Artistas', company: 'Thiaguinho Produções', item: 'Pulseira VIP', status: 'Entregue' },
    { id: 'crd-3', name: 'Marcos Jornalista', cpf: '999.888.777-66', type: 'Imprensa', company: 'Gazeta do Sul', item: 'Crachá Imprensa', status: 'Pendente' },
    { id: 'crd-4', name: 'Paulo Silva Stage', cpf: '222.333.444-55', type: 'Fornecedores', company: 'Master Luz Som', item: 'Pulseira Staff', status: 'Pendente' }
  ]);

  // eventos_catracas (turnstiles/gates)
  const [turnstiles, setTurnstiles] = useState([
    { id: 'cat-1', name: 'Catraca Principal A', type: 'Entrada', status: 'Ativo', logsCount: 1540, alertasCount: 2 },
    { id: 'cat-2', name: 'Catraca VIP Sul', type: 'Entrada', status: 'Ativo', logsCount: 420, alertasCount: 0 },
    { id: 'cat-3', name: 'Catraca Imprensa / Staff', type: 'Entrada', status: 'Ativo', logsCount: 88, alertasCount: 0 },
    { id: 'cat-4', name: 'Catraca Saída Pista', type: 'Saída', status: 'Ativo', logsCount: 1200, alertasCount: 0 },
    { id: 'cat-5', name: 'Catraca Portão C (Inoperante)', type: 'Entrada', status: 'Inativo', logsCount: 0, alertasCount: 5 }
  ]);

  // eventos_estoque (bar and material stock)
  const [stocks, setStocks] = useState([
    { id: 'stk-1', item: 'Pulseiras VIP', qty: 2500, minQty: 500, status: 'OK' },
    { id: 'stk-2', item: 'Bobinas de Impressão PDV', qty: 15, minQty: 20, status: 'Baixo' },
    { id: 'stk-3', item: 'Credenciais Staff', qty: 450, minQty: 100, status: 'OK' },
    { id: 'stk-4', item: 'Lata de Cerveja Heineken', qty: 80, minQty: 500, status: 'Crítico' },
    { id: 'stk-5', item: 'Água Mineral 500ml', qty: 1200, minQty: 800, status: 'OK' },
    { id: 'stk-6', item: 'Refrigerante Cola Lata', qty: 150, minQty: 300, status: 'Baixo' }
  ]);

  // eventos_logs (operational activity logs)
  const [eventLogs, setEventLogs] = useState([
    { id: 'log-1', timestamp: '2026-07-17 10:45:00', type: 'Check-in', message: 'Ingresso TIX-EV1-SEC1-LOT1-001 validado na Catraca Principal A (Sucesso).' },
    { id: 'log-2', timestamp: '2026-07-17 10:48:12', type: 'Venda PDV', message: 'Venda #sale-1 (R$ 240,00) de 2 ingressos realizada por Sandra Costa no Caixa Portão A.' },
    { id: 'log-3', timestamp: '2026-07-17 10:50:35', type: 'Catraca', message: 'Alerta: Catraca Portão C perdeu a conexão com o servidor de validação offline.' },
    { id: 'log-4', timestamp: '2026-07-17 10:55:10', type: 'Credenciamento', message: 'Credencial de Artista entregue para Gisele Lima (Thiaguinho do Pagode).' }
  ]);

  // State for companies (Empresas)
  const [companies, setCompanies] = useState([
    { id: 'emp-1', name: 'Prime Show Eventos LTDA', cnpj: '12.345.678/0001-90', industry: 'Entretenimento', employees: 45, city: 'Curitiba', phone: '(41) 3322-1100' },
    { id: 'emp-2', name: 'Sunset Lounge Bar', cnpj: '98.765.432/0001-10', industry: 'Alimentação', employees: 12, city: 'Balneário Camboriú', phone: '(47) 3211-9988' },
    { id: 'emp-3', name: 'Arena Music Curitiba', cnpj: '55.444.333/0001-22', industry: 'Eventos / Shows', employees: 28, city: 'Curitiba', phone: '(41) 3044-5566' }
  ]);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', cnpj: '', industry: 'Entretenimento', employees: '', city: '', phone: '' });

  // State for Agenda (Appointments)
  const [appointments, setAppointments] = useState([
    { id: 'apt-1', title: 'Reunião de Proposta - Prime Show', date: '2026-07-18', time: '14:00', host: 'Roberto Carlos', client: 'Roberto Alencar', type: 'Reunião Presencial', status: 'Confirmado' },
    { id: 'apt-2', title: 'Visita Técnica - Arena Music Curitiba', date: '2026-07-20', time: '10:30', host: 'Maria Silva', client: 'Mariana Costa', type: 'Visita Local', status: 'Pendente' },
    { id: 'apt-3', title: 'Call de Alinhamento - Sunset Lounge', date: '2026-07-19', time: '16:00', host: 'Fernanda Lima', client: 'Ana Beatriz Souza', type: 'Videoconferência', status: 'Confirmado' }
  ]);
  const [showAddAptModal, setShowAddAptModal] = useState(false);
  const [newApt, setNewApt] = useState({ title: '', date: '', time: '', host: '', client: '', type: 'Reunião Presencial', status: 'Pendente' });

  // State for Propostas (Proposals)
  const [proposals, setProposals] = useState([
    { id: 'prop-1', title: 'Patrocínio Master Metal Fest 2026', value: 85000, client: 'Prime Show Eventos', validUntil: '2026-08-15', status: 'Aceita', date: '2026-07-10' },
    { id: 'prop-2', title: 'Locação de Equipamentos - Sunset Lounge', value: 45000, client: 'Sunset Lounge Bar', validUntil: '2026-07-30', status: 'Em Negociação', date: '2026-07-12' },
    { id: 'prop-3', title: 'Projeto de Marketing - Festival de Inverno', value: 150000, client: 'Arena Music Curitiba', validUntil: '2026-08-01', status: 'Enviada', date: '2026-07-14' }
  ]);
  const [showAddProposalModal, setShowAddProposalModal] = useState(false);
  const [newProposal, setNewProposal] = useState({ title: '', value: '', client: '', validUntil: '', status: 'Enviada' });

  // State for Contratos (Contracts)
  const [contracts, setContracts] = useState([
    { id: 'con-1', title: 'Contrato Geral de Parceria - Prime Show', value: 120000, client: 'Prime Show Eventos', startDate: '2026-07-01', endDate: '2027-07-01', status: 'Ativo' },
    { id: 'con-2', title: 'Contrato de Fomento de Eventos - Arena Music', value: 150000, client: 'Arena Music Curitiba', startDate: '2026-07-10', endDate: '2026-12-31', status: 'Ativo' },
    { id: 'con-3', title: 'Termo de Encerramento - Embafeste Premium', value: 510000, client: 'Embafeste Premium', startDate: '2025-07-01', endDate: '2026-07-01', status: 'Finalizado' }
  ]);
  const [showAddContractModal, setShowAddContractModal] = useState(false);
  const [newContract, setNewContract] = useState({ title: '', value: '', client: '', startDate: '', endDate: '', status: 'Em Assinatura' });

  // State for Metas (Goals)
  const [goals, setGoals] = useState([
    { id: 'goal-1', seller: 'Roberto Carlos', target: 200000, achieved: 120000, period: 'Julho 2026' },
    { id: 'goal-2', seller: 'Maria Silva', target: 150000, achieved: 150000, period: 'Julho 2026' },
    { id: 'goal-3', seller: 'Fernanda Lima', target: 100000, achieved: 45000, period: 'Julho 2026' }
  ]);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ seller: '', target: '', achieved: '', period: 'Julho 2026' });

  // State for Comissões (Commissions)
  const [commissions, setCommissions] = useState([
    { id: 'com-1', seller: 'Roberto Carlos', dealValue: 120000, rate: 5, commission: 6000, paymentStatus: 'Pago', date: '2026-07-10' },
    { id: 'com-2', seller: 'Maria Silva', dealValue: 510000, rate: 5, commission: 25500, paymentStatus: 'Pago', date: '2026-07-01' },
    { id: 'com-3', seller: 'Fernanda Lima', dealValue: 150000, rate: 4, commission: 6000, paymentStatus: 'Pendente', date: '2026-07-14' }
  ]);
  const [showAddCommissionModal, setShowAddCommissionModal] = useState(false);
  const [newCommission, setNewCommission] = useState({ seller: '', dealValue: '', rate: '', paymentStatus: 'Pendente', date: '2026-07-17' });

  // Phase 4 Eventos view state hooks moved to top level
  const [eventsSearch, setEventsSearch] = useState('');
  const [showEventsForm, setShowEventsForm] = useState(false);
  const [apiRoute, setApiRoute] = useState('GET_EVENTOS');
  const [apiLoading, setApiLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [qrCodeInput, setQrCodeInput] = useState('');
  const [apiEventInputs, setApiEventInputs] = useState({
    name: '',
    category: 'Show / Festival',
    date: '',
    time: '',
    city: '',
    venue: '',
    capacity: '',
    producer: '',
    organizer: '',
    status: 'Ativo'
  });
  const [apiCheckinInputs, setApiCheckinInputs] = useState({
    qrCode: '',
    method: 'QR Code'
  });
  const [apiPdvInputs, setApiPdvInputs] = useState({
    eventId: 'ev-1',
    pdvId: 'pdv-1',
    operator: 'Sandra Costa',
    amount: '',
    paymentMethod: 'PIX',
    type: 'Ingresso'
  });

  // CRM view state hooks moved to top level
  const [crmSearch, setCrmSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [crmApiRoute, setCrmApiRoute] = useState('GET_DASHBOARD');
  const [crmApiLoading, setCrmApiLoading] = useState(false);
  const [crmApiResponse, setCrmApiResponse] = useState(null);
  const [crmApiInputs, setCrmApiInputs] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'Ativo'
  });

  // CRM Eventos States
  // Produtores
  const [producers, setProducers] = useState([
    { id: 'prod-1', name: 'Rodrigo Festas Som', eventsCount: 35, rating: 4.8, contact: 'rodrigo@festassom.com', specialty: 'Shows Nacionais' },
    { id: 'prod-2', name: 'Gisele Produções Executivas', eventsCount: 52, rating: 4.9, contact: 'gisele@producoes.com', specialty: 'Eventos Corporativos' }
  ]);
  const [showAddProducerModal, setShowAddProducerModal] = useState(false);
  const [newProducer, setNewProducer] = useState({ name: '', eventsCount: '', rating: '5.0', contact: '', specialty: 'Shows Nacionais' });

  // Organizadores
  const [organizers, setOrganizers] = useState([
    { id: 'org-1', name: 'Associação de Criadores do Sul', region: 'Paraná / Santa Catarina', contact: 'contato@criadoressul.org', activeEvents: 5 },
    { id: 'org-2', name: 'Curitiba Eventos e Convenções', region: 'Curitiba Metropolitana', contact: 'comercial@curitibaconv.com.br', activeEvents: 3 }
  ]);
  const [showAddOrganizerModal, setShowAddOrganizerModal] = useState(false);
  const [newOrganizer, setNewOrganizer] = useState({ name: '', region: '', contact: '', activeEvents: '' });

  // Artistas
  const [artists, setArtists] = useState([
    { id: 'art-1', name: 'Thiaguinho do Pagode', genre: 'Pagode', cachet: 120000, contact: 'shows@thiaguinho.com.br' },
    { id: 'art-2', name: 'DJ Alok Curitiba Project', genre: 'Eletrônica', cachet: 250000, contact: 'booking@alokproject.com' }
  ]);
  const [showAddArtistModal, setShowAddArtistModal] = useState(false);
  const [newArtist, setNewArtist] = useState({ name: '', genre: '', cachet: '', contact: '' });

  // Bandas
  const [bands, setBands] = useState([
    { id: 'band-1', name: 'Os Heraldo Rock', membersCount: 4, genre: 'Rock Clássico', cachet: 15000, contact: 'heraldo@rockband.com' },
    { id: 'band-2', name: 'Banda Capital Inicial Cover', membersCount: 5, genre: 'Pop Rock', cachet: 8000, contact: 'capitalcover@gmail.com' }
  ]);
  const [showAddBandModal, setShowAddBandModal] = useState(false);
  const [newBand, setNewBand] = useState({ name: '', membersCount: '', genre: '', cachet: '', contact: '' });

  // Patrocinadores
  const [sponsors, setSponsors] = useState([
    { id: 'spon-1', company: 'Cervejaria Heineken do Brasil', sponsoredEvent: 'Metal Fest 2026', value: 85000, contact: 'patrocinios@heineken.com.br' },
    { id: 'spon-2', company: 'Coca-Cola FEMSA', sponsoredEvent: 'Festival de Inverno Curitiba', value: 120000, contact: 'marketing@cocacolafemsa.com' }
  ]);
  const [showAddSponsorModal, setShowAddSponsorModal] = useState(false);
  const [newSponsor, setNewSponsor] = useState({ company: '', sponsoredEvent: 'Metal Fest 2026', value: '', contact: '' });

  // Fornecedores
  const [suppliers, setSuppliers] = useState([
    { id: 'sup-1', name: 'Luz & Som Master Curitiba', service: 'Som e Iluminação', rating: 4.7, contact: 'contato@luzsommaster.com' },
    { id: 'sup-2', name: 'Segurança Armada Cia', service: 'Segurança e Portaria', rating: 4.9, contact: 'comercial@segarmada.com.br' },
    { id: 'sup-3', name: 'Buffet Delícias & Cia', service: 'Alimentação e Bebidas', rating: 4.6, contact: 'contato@deliciascia.com' }
  ]);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState({ name: '', service: 'Som e Iluminação', rating: '5.0', contact: '' });

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

  // MaaS (Marketing as a Service) states
  const [marketingActivePlan, setMarketingActivePlan] = useState('profissional');
  const [marketingModulesStatus, setMarketingModulesStatus] = useState({
    1: true, 2: true, // Essencial
    3: true, 4: true, 5: true, // Profissional
    6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, // Premium & Enterprise
    13: false, 14: false, 15: false, 16: false, 17: false, // Enterprise
    18: false, 19: false, 20: false, 21: false // Omnichannel
  });
  const [influencers, setInfluencers] = useState([
    { id: 'inf-1', name: 'Gabriela Pugliesi', genre: 'LifeStyle & Fitness', followers: '4.5M', cachet: 12000, activeCampaign: 'Metal Fest 2026', coupon: 'PUGLIMETAL', roi: '340%', codeSales: 410, hired: true },
    { id: 'inf-2', name: 'Felipe Castanhari', genre: 'Curiosidades & Pop Culture', followers: '13.2M', cachet: 25000, activeCampaign: 'Nenhum', coupon: 'CASTANHARI10', roi: '0%', codeSales: 0, hired: false },
    { id: 'inf-3', name: 'Alok Petrillo', genre: 'Música Eletrônica', followers: '28.1M', cachet: 85000, activeCampaign: 'Electronic Carnival 2026', coupon: 'ALOKPARTY', roi: '520%', codeSales: 1850, hired: true },
    { id: 'inf-4', name: 'Larissa Manoela', genre: 'Teatro & Cinema', followers: '49.8M', cachet: 60000, activeCampaign: 'Festival de Inverno Curitiba', coupon: 'LARISSAINVERNO', roi: '180%', codeSales: 890, hired: true },
    { id: 'inf-5', name: 'Whindersson Nunes', genre: 'Humor & Stand-up', followers: '58.4M', cachet: 75000, activeCampaign: 'Nenhum', coupon: 'WHIND25', roi: '0%', codeSales: 0, hired: false }
  ]);
  const [loyaltyRules, setLoyaltyRules] = useState({
    cashbackPercentage: 2,
    pointsPerReal: 1,
    vipClubName: 'Clube DiskVIP',
    minimumRedeemPoints: 500,
    missions: [
      { id: 'mis-1', title: 'Fã de Carteirinha', desc: 'Compre ingressos para 3 eventos no mesmo mês.', reward: '100 pontos + Tag VIP', status: 'Ativa' },
      { id: 'mis-2', title: 'Divulgador Oficial', desc: 'Compartilhe 5 eventos nas suas redes sociais.', reward: 'Cupom de 10% de desconto', status: 'Ativa' },
      { id: 'mis-3', title: 'Grupo Fechado', desc: 'Compre 4 ingressos tipo Combo Família.', reward: 'Estacionamento Grátis', status: 'Inativa' }
    ]
  });

  // Backend local REST API integration state
  const [backendConnected, setBackendConnected] = useState(false);

  useEffect(() => {
    // Check if the backend server is running
    fetch('http://localhost:3001/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'OK') {
          setBackendConnected(true);
          // Load database state from backend
          fetch('http://localhost:3001/api/db')
            .then(r => r.json())
            .then(db => {
              if (db.users) setUsers(db.users);
              if (db.receivables) setReceivables(db.receivables);
              if (db.payables) setPayables(db.payables);
              if (db.invoices) setInvoices(db.invoices);
              if (db.borderos) setBorderos(db.borderos);
              if (db.leads) setLeads(db.leads);
              if (db.clients) setClients(db.clients);
              if (db.companies) setCompanies(db.companies);
              if (db.appointments) setAppointments(db.appointments);
              if (db.proposals) setProposals(db.proposals);
              if (db.contracts) setContracts(db.contracts);
              if (db.goals) setGoals(db.goals);
              if (db.commissions) setCommissions(db.commissions);
              if (db.events) setEvents(db.events);
              if (db.venues) setVenues(db.venues);
              if (db.sectors) setSectors(db.sectors);
              if (db.ticket_batches) setTicketBatches(db.ticket_batches);
              if (db.issued_tickets) setIssuedTickets(db.issued_tickets);
              if (db.pdv_sales) setPdvSales(db.pdv_sales);
              if (db.checkins) setCheckins(db.checkins);
              if (db.credencials) setCredencials(db.credencials);
              if (db.turnstiles) setTurnstiles(db.turnstiles);
              if (db.stocks) setStocks(db.stocks);
              if (db.event_logs) setEventLogs(db.event_logs);
              console.log('Successfully connected to DiskHub REST API backend & synced database!');
            });
        }
      })
      .catch(err => {
        console.log('REST API backend not running. Running in standalone simulated mode.');
      });
  }, []);

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

  // CRM Kanban lead progression bidirectional
  const moveLeadStage = (leadId, currentStage, direction = 'forward') => {
    const stages = ['prospect', 'qualified', 'proposal', 'negotiation', 'won'];
    const currentIndex = stages.indexOf(currentStage);
    if (direction === 'forward' && currentIndex < stages.length - 1) {
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
          triggerToast("Contrato Assinado! 🏆", `${lead.name} convertido em cliente ativo!`);
        }
      } else {
        triggerToast("Progresso de Venda", `Lead avançado para ${nextStage.toUpperCase()}`);
      }
    } else if (direction === 'backward' && currentIndex > 0) {
      const prevStage = stages[currentIndex - 1];
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: prevStage } : l));
      triggerToast("Recuo de Estágio", `Lead movido de volta para ${prevStage.toUpperCase()}`);
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

  const downloadSimulatedCSV = (filename = 'fechamento_contabil.csv', headers = ['ID', 'Data', 'Tipo', 'Valor', 'Status'], dataRows = []) => {
    let defaultRows = dataRows.length > 0 ? dataRows : [
      ['tr-1', '2026-07-17', 'Venda Online', '850.00', 'Pago'],
      ['tr-2', '2026-07-17', 'Fisico PDV B', '1200.00', 'Pago'],
      ['tr-3', '2026-07-16', 'Reembolso', '-150.00', 'Estornado']
    ];
    let csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...defaultRows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("Exportacao Sucesso 📥", `Arquivo ${filename} baixado.`);
  };

  const simulateVoiceInput = () => {
    if (isListening) return;
    setIsListening(true);
    setUserInput("🎙️ Ouvindo...");
    triggerToast("🎙️ Gravador Ativo", "Simulando transcrição de voz...");
    
    setTimeout(() => {
      setUserInput("Qual o faturamento ");
      setTimeout(() => {
        setUserInput("Qual o faturamento consolidado ");
        setTimeout(() => {
          setUserInput("Qual o faturamento consolidado deste mês?");
          setIsListening(false);
          setTimeout(() => {
            triggerToast("Voz Processada 🤖", "Enviando comando para o Disk AI...");
            triggerAIResponse('dre');
            setUserInput('');
          }, 800);
        }, 600);
      }, 500);
    }, 1200);
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
      
      {/* SIDEBAR NAVIGATION - DHDS Collapsible Layout */}
      <aside className={`aside-sidebar flex flex-col justify-between shrink-0 z-30 transition-all duration-300 ${
        sidebarCollapsed ? 'w-[72px]' : 'w-64'
      } ${theme === 'dark' ? 'bg-[#111827] border-r border-[#1F2937]' : 'bg-white border-r border-[#E5E7EB]'} ${
        mobileSidebarOpen ? 'sidebar-mobile-expanded' : ''
      }`}>
        <div>
          {/* Logo Area */}
          <div className={`p-4 border-b ${borderCol} flex items-center justify-between`}>
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-9 h-9 bg-[#2563EB] rounded flex items-center justify-center shadow shrink-0">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div className="animate-fadeIn">
                  <h1 className={`text-md font-bold tracking-tight ${textTitle} flex items-center mb-0`}>
                    DISK<span className="text-[#3B82F6] font-normal ml-0.5">HUB</span>
                  </h1>
                  <span className={`text-[9px] ${textSec} uppercase tracking-wider font-bold block whitespace-nowrap`}>ERP & CRM Enterprise</span>
                </div>
              )}
            </div>
            <button 
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className={`md:hidden p-1 rounded hover:bg-light/10 ${textSec} border-0 bg-transparent cursor-pointer`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Profile / Menu */}
          {!sidebarCollapsed && (
            <div className={`p-3 border-b ${borderCol} bg-light/5 animate-fadeIn`}>
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shadow">
                  V
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${textTitle} mb-0`}>Vinicius</h4>
                  <p className={`text-[10px] ${textSec} mb-0 uppercase tracking-widest font-mono font-bold`}>
                    Plano {plan.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Nav Links */}
          <div className="py-3 px-2 overflow-y-auto max-h-[calc(100vh-170px)]">
            <ul className="nav nav-sidebar flex flex-col space-y-1 p-0 m-0 list-none">
              {!sidebarCollapsed && (
                <li className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest ${textSec} mb-1 animate-fadeIn`}>
                  Navegação Principal
                </li>
              )}

              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3, emoji: '🏠' },
                { id: 'financeiro', label: 'Financeiro', icon: CreditCard, emoji: '💰' },
                { id: 'contabilidade', label: 'Contabilidade', icon: Receipt, emoji: '🧾', badge: invoices.filter(inv => inv.status === 'Pendente').length },
                { id: 'eventos', label: 'Eventos', icon: Calendar, emoji: '🎫', badge: events.filter(e => e.status === 'Ativo').length, condition: installedApps.eventos === true },
                { id: 'crm', label: 'CRM de Vendas', icon: Users, emoji: '👥', badge: leads.filter(l => l.stage !== 'won').length, condition: installedApps.crm === true },
                { id: 'marketing', label: 'Marketing & Campanhas', icon: Mail, emoji: '📈', condition: installedApps.mkt === true },
                { id: 'pdv', label: 'Ponto de Venda', icon: ShoppingBag, emoji: '🛒', condition: installedApps.pdv === true },
                { id: 'logistica', label: 'Logística & Ingressos', icon: Briefcase, emoji: '📦', condition: installedApps.logistica === true },
                { id: 'bar', label: 'Bar & Estoque', icon: Layers, emoji: '🍹', condition: installedApps.bar === true },
                { id: 'patrimonio', label: 'Patrimônio & POS', icon: Landmark, emoji: '🏛️', condition: installedApps.patrimonio === true },
                { id: 'ai', label: 'Disk AI Analytics', icon: Brain, emoji: '🤖', condition: installedApps.ai === true }
              ].map(item => {
                if (item.condition === false) return null;
                const active = currentTab === item.id;
                return (
                  <li key={item.id} className="w-full">
                    <button 
                      onClick={() => selectTab(item.id)} 
                      className={`w-full text-left flex items-center justify-between px-3 py-2 text-xs transition-all rounded-lg border-0 ${
                        active 
                          ? `${theme === 'dark' ? 'bg-[#1E293B] text-white font-bold' : 'bg-slate-100 text-slate-900 font-bold'}` 
                          : `${textSec} hover:bg-slate-100 dark:hover:bg-[#1E293B]/40 bg-transparent cursor-pointer`
                      }`}
                      title={sidebarCollapsed ? item.label : ''}
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <span className="text-sm shrink-0" role="img" aria-label={item.label}>{item.emoji}</span>
                        {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                      </div>
                      {!sidebarCollapsed && item.badge && (
                        <span className="badge bg-[#3B82F6]/10 text-[#3B82F6] text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}

              {!sidebarCollapsed && (
                <li className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest ${textSec} mt-4 mb-1 animate-fadeIn`}>
                  Configurações & Loja
                </li>
              )}

              {[
                { id: 'appstore', label: 'Central de Apps', icon: ShoppingBag, emoji: '📦' },
                { id: 'marketplace', label: 'Planos & Upgrades', icon: Sparkles, emoji: '✨' },
                { id: 'roadmap', label: 'Status & Roadmap', icon: ShieldCheck, emoji: '🗺️' }
              ].map(item => {
                const active = currentTab === item.id;
                return (
                  <li key={item.id} className="w-full">
                    <button 
                      onClick={() => selectTab(item.id)} 
                      className={`w-full text-left flex items-center px-3 py-2 text-xs transition-all rounded-lg border-0 ${
                        active 
                          ? `${theme === 'dark' ? 'bg-[#1E293B] text-white font-bold' : 'bg-slate-100 text-slate-900 font-bold'}` 
                          : `${textSec} hover:bg-slate-100 dark:hover:bg-[#1E293B]/40 bg-transparent cursor-pointer`
                      }`}
                      title={sidebarCollapsed ? item.label : ''}
                    >
                      <span className="text-sm mr-3 shrink-0" role="img" aria-label={item.label}>{item.emoji}</span>
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Promocional Widget inside Sidebar */}
        {!sidebarCollapsed && (
          <div className="p-3 mx-2 mb-3 bg-[#2563EB]/5 border border-[#2563EB]/10 rounded-xl space-y-2.5 text-left">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-10.96-1.57c-.12-.47-.13-.96-.02-1.43a1 1 0 01.35-.57L10.5 6.5a1 1 0 011.41 0l3.68 3.68a1 1 0 010 1.41l-2.73 2.78z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19 5l-4 4m2.5-2.5L13 11M4.5 19.5L9 15M15 9l1.5-1.5M9 15l-1.5 1.5" /></svg>
            </div>
            <div>
              <p className={`text-[10px] font-bold ${textTitle} leading-snug mb-0`}>Escale seu negócio com o plano ideal para você!</p>
            </div>
            <button 
              onClick={() => setCurrentTab('marketplace')} 
              className="btn btn-xs w-full py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-bold rounded-lg border-0 cursor-pointer transition-colors"
            >
              Falar com especialista
            </button>
          </div>
        )}

        {/* Sidebar Collapse Toggle Button at the bottom */}
        <div className={`p-3 border-t ${borderCol} flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!sidebarCollapsed && (
            <span className="text-[9px] text-slate-400 font-mono">v4.0.0 Enterprise</span>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-[#1E293B] ${textSec} border-0 bg-transparent cursor-pointer`}
            title={sidebarCollapsed ? "Expandir Menu" : "Recolher Menu"}
          >
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA - Limitless content-wrapper */}
      <main className="content-wrapper flex-1 flex flex-col min-w-0 overflow-y-auto relative pb-5 z-10 transition-colors duration-250">
        
        {/* HEADER / TOP NAVBAR */}
        <header className={`navbar navbar-expand-md ${headerClass} px-4 py-3 flex items-center justify-between sticky top-0 z-40 transition-colors duration-250`}>
          <div className="flex items-center space-x-3">
            <button 
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-1 rounded hover:bg-light/10 text-slate-500 hover:text-slate-900 border-0 bg-transparent cursor-pointer"
              title="Abrir Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-sm">🏢</span>
              <span className={`text-xs ${textSec} font-bold tracking-tight uppercase`}>DiskIngressos</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className={`text-xs font-semibold ${textTitle} capitalize`}>
              {currentTab === 'appstore' ? 'Central de Aplicativos' : currentTab === 'marketplace' ? 'Planos e Upgrades' : currentTab === 'marketing' ? 'Marketing & Campanhas' : currentTab === 'contabilidade' ? 'Contabilidade Disk' : currentTab}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Spotlight Search Trigger (Cmd + K) */}
            <button 
              onClick={() => setSpotlightOpen(true)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-left text-xs ${
                theme === 'dark' 
                  ? 'bg-[#1E293B]/40 text-[#94A3B8] border-[#1F2937] hover:bg-[#1E293B]' 
                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
              } w-60 justify-between cursor-pointer border-0`}
            >
              <div className="flex items-center space-x-2">
                <Search className="w-3.5 h-3.5" />
                <span>Pesquisar...</span>
              </div>
              <kbd className="text-[9px] font-mono bg-slate-200/50 dark:bg-[#111827] px-1.5 py-0.5 rounded text-slate-400">⌘K</kbd>
            </button>

            {/* Connection Status */}
            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
              <span className={`w-1.5 h-1.5 rounded-full ${backendConnected ? 'bg-[#22C55E]' : 'bg-[#94A3B8]'}`}></span>
              <span className="text-[9px] font-bold text-slate-400 font-mono">
                {backendConnected ? 'API OK' : 'LOCAL'}
              </span>
            </div>
            
            {/* Theme switch button */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded border transition-all ${
                theme === 'dark' 
                  ? 'text-[#94A3B8] hover:text-white bg-[#1E293B]/40 border-[#1F2937] hover:bg-[#1E293B]' 
                  : 'text-slate-500 hover:text-slate-900 bg-slate-100 border-slate-200 hover:bg-slate-200'
              } border-0 cursor-pointer`}
              title={theme === 'dark' ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button className={`p-2 ${textSec} hover:text-slate-900 dark:hover:text-white ${theme === 'dark' ? 'bg-[#1E293B]/40 border-[#1F2937]' : 'bg-slate-100 border-slate-200'} rounded border relative transition-all border-0 cursor-pointer`}>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#3B82F6] rounded-full"></span>
              <Bell className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* CONTENT AREA - Limitless content block */}
        <div className="content p-4 max-w-7xl w-full mx-auto space-y-4">
            
          {/* ================= 1. DASHBOARD VIEW ================= */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Dashboard Modern Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4 border-[#E2E8F0] dark:border-[#1F2937]">
                <div>
                  <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>Visão Geral do Ecossistema</h2>
                  <p className={`text-xs ${textSec} mb-0`}>Métricas consolidadas de vendas, acessos e auditoria inteligente em tempo real.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border ${borderCol} text-xs font-semibold ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'}`}>
                    <Calendar className={`w-3.5 h-3.5 ${textSec}`} />
                    <span>Período: Últimos 30 dias</span>
                  </div>
                </div>
              </div>

              {/* Hero Dashboard Block */}
              <div className={`card ${cardClass} p-5 relative overflow-hidden bg-white dark:bg-[#111827] border-0 shadow-sm`}>
                <div className="relative z-10">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${textSec} block mb-1`}>Receita do Mês</span>
                  <div className="flex items-baseline space-x-3">
                    <span className={`text-4xl md:text-5xl font-black ${textTitle} tracking-tighter`}>R$ 2.450.000</span>
                    <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded-full font-mono flex items-center shrink-0">
                      ▲ 14%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 mb-0">Volume de negócios consolidado gerado através dos canais online e físicos nas últimas semanas.</p>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#2563EB]/5 to-transparent pointer-events-none"></div>
              </div>

              {/* 4 KPIs DHDS */}
              <div className="row g-3">
                {[
                  { title: '🎫 Eventos', value: `${events.length} Projetos`, desc: 'Ativos no ecossistema', trend: '▲ 4 hoje' },
                  { title: '👥 Clientes', value: '12.450', desc: 'Segmentados no CRM', trend: '+840 total' },
                  { title: '📊 Fluxo de Caixa', value: `R$ ${financialStats.saldo.toLocaleString('pt-BR')}`, desc: 'Saldo pronto para repasse', trend: 'Líquido' },
                  { title: '✅ Check-ins', value: `${financialStats.presente} / ${financialStats.esperado}`, desc: 'Acessos validados na portaria', trend: '93.8% Presença' }
                ].map((kpi, idx) => (
                  <div key={idx} className="col-lg-3 col-sm-6">
                    <div className={`card ${cardClass} p-4 hover:shadow-md transition-all duration-200 border-0 shadow-sm`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider`}>{kpi.title}</span>
                        <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full">{kpi.trend}</span>
                      </div>
                      <div className="mt-3">
                        <span className={`text-2xl font-black ${textTitle}`}>{kpi.value}</span>
                        <p className="text-[10px] text-slate-400 mt-1 mb-0">{kpi.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gráfico Principal */}
              <div className={`card ${cardClass} p-4 border-0 shadow-sm`}>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-0`}>Gráfico Principal de Fluxo Financeiro</h3>
                    <p className={`text-[10px] ${textSec} mb-0`}>Evolução diária de depósitos, vendas e repasses de produtores.</p>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
                    <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] mr-1"></span>Vendas</span>
                    <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981] mr-1"></span>Saídas/Repasses</span>
                  </div>
                </div>

                <div className="relative w-full h-[220px] mt-2">
                  <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15"/>
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="green-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.1"/>
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(148, 163, 184, 0.05)" strokeWidth="1"/>
                    <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(148, 163, 184, 0.05)" strokeWidth="1"/>
                    <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(148, 163, 184, 0.05)" strokeWidth="1"/>
                    
                    {/* Area path */}
                    <path d="M 0 150 Q 50 110, 100 80 T 200 95 T 300 45 T 400 30 L 500 50 L 500 150 L 0 150 Z" fill="url(#blue-grad)"/>
                    <path d="M 0 150 Q 50 130, 100 110 T 200 120 T 300 90 T 400 70 L 500 80 L 500 150 L 0 150 Z" fill="url(#green-grad)"/>
                    
                    {/* Line path */}
                    <path d="M 0 150 Q 50 110, 100 80 T 200 95 T 300 45 T 400 30 L 500 50" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M 0 150 Q 50 130, 100 110 T 200 120 T 300 90 T 400 70 L 500 80" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3,3"/>
                  </svg>
                </div>
                <div className={`flex justify-between text-[9px] ${textSec} mt-2 font-mono font-bold px-1`}>
                  <span>01 JUL</span><span>05 JUL</span><span>10 JUL</span><span>15 JUL</span><span>20 JUL</span><span>25 JUL</span><span>30 JUL</span>
                </div>
              </div>

              {/* Agenda & Alertas Grid */}
              <div className="row g-3">
                
                {/* Agenda Column */}
                <div className="col-lg-6">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between border-0 shadow-sm`}>
                    <div>
                      <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-4`}>📅 Agenda do Mês</h4>
                      <div className="space-y-4">
                        {events.slice(0, 3).map(ev => (
                          <div key={ev.id} className="flex items-center justify-between text-xs pb-3 border-b border-slate-100 dark:border-white/5 last:border-0 last:pb-0">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center font-bold text-[#2563EB] shrink-0 font-mono text-[10px] flex-col">
                                <span className="text-[8px] uppercase">{ev.date.split('/')[1] || 'DEZ'}</span>
                                <span className="text-xs">{ev.date.split('/')[0] || '17'}</span>
                              </div>
                              <div className="overflow-hidden">
                                <span className={`font-semibold ${textTitle} block truncate`}>{ev.name}</span>
                                <span className={`text-[10px] ${textSec} block`}>{ev.venue} — {ev.city}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full shrink-0 uppercase tracking-wider">{ev.category}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alertas Column */}
                <div className="col-lg-6">
                  <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between border-0 shadow-sm`}>
                    <div>
                      <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-4`}>⚠️ Alertas de Operação</h4>
                      <div className="space-y-3">
                        {contabilAuditorias.slice(0, 2).map(aud => (
                          <div key={aud.id} className="p-3 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-slate-50 dark:bg-white/2 flex items-start space-x-2 text-xs">
                            <span className="text-sm shrink-0">{aud.type === 'Sucesso' ? '✅' : '⚠️'}</span>
                            <div>
                              <p className={`text-[11px] font-semibold ${textTitle} mb-0.5 leading-normal`}>{aud.msg}</p>
                              <span className="text-[9px] text-slate-400 block font-mono">{aud.date}</span>
                            </div>
                          </div>
                        ))}
                        <div className="p-3 rounded-xl border border-[#E2E8F0] dark:border-[#1F2937] bg-slate-50 dark:bg-white/2 flex items-start space-x-2 text-xs">
                          <span className="text-sm shrink-0">🤖</span>
                          <div>
                            <p className={`text-[11px] font-semibold ${textTitle} mb-0.5 leading-normal`}>Disk AI Copilot: Configurado pico de conciliação bancária automática com sucesso.</p>
                            <span className="text-[9px] text-slate-400 block font-mono">Hoje, 11:32</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Últimos Eventos - Premium Luxury Table */}
              <div className={`card ${cardClass} p-4 border-0 shadow-sm`}>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-0`}>🎫 Últimos Eventos Cadastrados</h4>
                    <p className={`text-[10px] ${textSec} mb-0`}>Lista de projetos em lançamento ou comercialização ativa.</p>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover text-xs mb-0 align-middle">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-white/5 text-[9px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50 dark:bg-white/2">
                        <th className="p-3 border-0">Evento</th>
                        <th className="p-3 border-0">Cidade</th>
                        <th className="p-3 border-0 text-center">Status</th>
                        <th className="p-3 border-0 text-right">Faturamento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.slice(0, 3).map(ev => {
                        const totalSold = issuedTickets.filter(t => t.eventId === ev.id && t.status === 'Pago').length;
                        const revenue = totalSold * 150;
                        return (
                          <tr key={ev.id} className="border-b border-slate-100 dark:border-[#1F2937] hover:bg-slate-50/50 dark:hover:bg-[#1E293B]/20">
                            <td className="p-3 border-0">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center text-white text-xs font-bold font-mono">
                                  {ev.name[0]}
                                </div>
                                <div>
                                  <span className={`font-semibold ${textTitle} block`}>{ev.name}</span>
                                  <span className="text-[10px] text-slate-400 block">{ev.category}</span>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 border-0 font-medium text-slate-600 dark:text-slate-400">{ev.city}</td>
                            <td className="p-3 border-0 text-center">
                              <span className={`badge text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                ev.status === 'Ativo' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-[#F59E0B]/15 text-[#F59E0B]'
                              }`}>
                                {ev.status}
                              </span>
                            </td>
                            <td className="p-3 border-0 text-right font-bold text-slate-800 dark:text-white font-mono">R$ {revenue.toLocaleString('pt-BR')}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
                  <p className={`text-xs ${textSec} mb-0`}>Fluxo de caixa, conciliação contábil, contas a pagar/receber e DRE gerencial.</p>
                </div>
                
                <div className={`flex ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'} border ${borderCol} p-1 rounded space-x-1 overflow-x-auto text-xs`}>
                  <button 
                    onClick={() => setFinanceSubTab('dashboard')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      financeSubTab === 'dashboard' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Dashboard Financeiro
                  </button>
                  <button 
                    onClick={() => setFinanceSubTab('contasReceber')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      financeSubTab === 'contasReceber' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Contas a Receber
                  </button>
                  <button 
                    onClick={() => setFinanceSubTab('contasPagar')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      financeSubTab === 'contasPagar' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Contas a Pagar
                  </button>
                  <button 
                    onClick={() => setFinanceSubTab('conciliacao')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      financeSubTab === 'conciliacao' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Bancos & Conciliação
                  </button>
                  <button 
                    onClick={() => setFinanceSubTab('dre')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      financeSubTab === 'dre' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    DRE Gerencial
                  </button>
                </div>
              </div>

              {/* Sub-Tab 1: Dashboard Financeiro */}
              {financeSubTab === 'dashboard' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="row">
                    {accounts.map(acc => (
                      <div key={acc.id} className="col-md-4 mb-3">
                        <div className={`card ${cardClass} p-4`}>
                          <span className={`text-[9px] ${textSec} font-bold uppercase tracking-wider block`}>{acc.type}</span>
                          <h4 className={`text-xs font-semibold ${textTitle} mt-1 mb-0`}>{acc.name}</h4>
                          <div className={`mt-3 font-mono font-bold text-md ${textTitle}`}>
                            R$ {acc.balance.toLocaleString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="row">
                    {/* Cash Flow Line Chart simulation */}
                    <div className="col-lg-8 mb-3">
                      <div className={`card ${cardClass} p-4 h-100`}>
                        <div>
                          <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Projeção de Fluxo de Caixa</h3>
                          <p className={`text-xs ${textSec} mb-0`}>Entradas e saídas de caixa previstas para a semana.</p>
                        </div>
                        <div className="relative w-full h-48 mt-4">
                          <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                            <path d="M 0 150 Q 100 80, 200 110 T 400 40 L 500 60 L 500 150 L 0 150 Z" fill="rgba(59,130,246,0.1)"/>
                            <path d="M 0 150 Q 100 80, 200 110 T 400 40 L 500 60" fill="none" stroke="#3b82f6" strokeWidth="2"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 mb-3">
                      <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                        <div>
                          <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Transferência Interna</h3>
                          <form onSubmit={handleAccountTransfer} className="space-y-3 text-xs">
                            <div className="form-group mb-2">
                              <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Origem</label>
                              <select 
                                value={transfer.from} 
                                onChange={(e) => setTransfer(prev => ({ ...prev, from: e.target.value }))}
                                className={`form-control form-control-sm ${inputClass}`}
                              >
                                {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
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
                            <div className="form-group mb-2">
                              <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Valor (R$)</label>
                              <input 
                                type="number" 
                                value={transfer.amount} 
                                onChange={(e) => setTransfer(prev => ({ ...prev, amount: e.target.value }))}
                                placeholder="0,00" 
                                className={`form-control form-control-sm ${inputClass}`} 
                              />
                            </div>
                            <button type="submit" className="btn btn-primary w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer">
                              Executar Transferência
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Contas a Receber */}
              {financeSubTab === 'contasReceber' && (
                <div className="row animate-fadeIn">
                  <div className="col-lg-8 mb-3">
                    <div className={`card ${cardClass} p-4 h-100`}>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Duplicatas e Receitas Futuras</h3>
                      <div className="table-responsive">
                        <table className={`table table-striped table-hover text-xs ${textBody}`}>
                          <thead>
                            <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                              <th className="p-3 border-0">Descrição</th>
                              <th className="p-3 border-0">Vencimento</th>
                              <th className="p-3 border-0 text-center">Método</th>
                              <th className="p-3 border-0 text-right">Valor</th>
                              <th className="p-3 border-0 text-center">Status</th>
                              <th className="p-3 border-0 text-right">Ação</th>
                            </tr>
                          </thead>
                          <tbody>
                            {receivables.map(rec => (
                              <tr key={rec.id} className={`border-bottom ${borderCol}/40`}>
                                <td className={`p-3 border-0 font-semibold ${textTitle}`}>{rec.desc}</td>
                                <td className="p-3 border-0">{rec.due}</td>
                                <td className="p-3 border-0 text-center font-mono">{rec.method}</td>
                                <td className="p-3 border-0 text-right font-mono font-bold text-[#22C55E]">R$ {rec.amount.toLocaleString('pt-BR')}</td>
                                <td className="p-3 border-0 text-center">
                                  <span className={`badge ${
                                    rec.status === 'Recebido' 
                                      ? 'badge-success bg-[#22C55E]/12 text-[#22C55E]' 
                                      : rec.status === 'Pendente' 
                                      ? 'badge-primary bg-[#3B82F6]/12 text-[#3B82F6]'
                                      : 'badge-danger bg-[#EF4444]/12 text-[#EF4444]'
                                  } text-[8px] font-bold px-2 py-0.5 rounded-full`}>
                                    {rec.status}
                                  </span>
                                </td>
                                <td className="p-3 border-0 text-right">
                                  {rec.status !== 'Recebido' && (
                                    <button 
                                      onClick={() => {
                                        setReceivables(prev => prev.map(r => r.id === rec.id ? { ...r, status: 'Recebido' } : r));
                                        setFinancialStats(stats => ({ ...stats, saldo: stats.saldo + rec.amount }));
                                        triggerToast("Recebimento Efetuado ✔", `R$ ${rec.amount.toLocaleString('pt-BR')} creditados em conta.`);
                                      }}
                                      className="btn btn-primary btn-sm px-2.5 py-1 text-[10px] font-semibold rounded border-0 cursor-pointer"
                                    >
                                      Liquidar
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

                  {/* Add Receivable Form */}
                  <div className="col-lg-4 mb-3">
                    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                      <div>
                        <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Lançar Nova Receita</h3>
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          if (!newReceivable.desc || !newReceivable.amount) {
                            triggerToast("Aviso", "Preencha todos os campos do contas a receber.", "warning");
                            return;
                          }
                          const amount = parseFloat(newReceivable.amount);
                          const item = {
                            id: `rec-${Date.now()}`,
                            desc: newReceivable.desc,
                            amount,
                            method: newReceivable.method,
                            due: newReceivable.due,
                            status: 'Pendente'
                          };
                          setReceivables([item, ...receivables]);
                          setNewReceivable({ desc: '', amount: '', method: 'PIX', due: '2026-07-20' });
                          triggerToast("Lançamento Adicionado 💰", "Conta a receber cadastrada com sucesso!");
                        }} className="space-y-3 text-xs">
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Descrição da Receita</label>
                            <input 
                              type="text" 
                              value={newReceivable.desc}
                              onChange={(e) => setNewReceivable(prev => ({ ...prev, desc: e.target.value }))}
                              placeholder="Ex: Patrocínio Lote 2"
                              className={`form-control form-control-sm ${inputClass}`}
                            />
                          </div>
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Valor (R$)</label>
                            <input 
                              type="number" 
                              value={newReceivable.amount}
                              onChange={(e) => setNewReceivable(prev => ({ ...prev, amount: e.target.value }))}
                              placeholder="0,00"
                              className={`form-control form-control-sm ${inputClass}`}
                            />
                          </div>
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Método de Cobrança</label>
                            <select 
                              value={newReceivable.method}
                              onChange={(e) => setNewReceivable(prev => ({ ...prev, method: e.target.value }))}
                              className={`form-control form-control-sm ${inputClass}`}
                            >
                              <option value="PIX">PIX (QR Code)</option>
                              <option value="Cartão">Cartão de Crédito</option>
                              <option value="Boleto">Boleto Bancário</option>
                            </select>
                          </div>
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Data de Vencimento</label>
                            <input 
                              type="date" 
                              value={newReceivable.due}
                              onChange={(e) => setNewReceivable(prev => ({ ...prev, due: e.target.value }))}
                              className={`form-control form-control-sm ${inputClass}`}
                            />
                          </div>
                          <button type="submit" className="btn btn-primary w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer">
                            Adicionar Lançamento
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Contas a Pagar */}
              {financeSubTab === 'contasPagar' && (
                <div className="row animate-fadeIn">
                  <div className="col-lg-8 mb-3">
                    <div className={`card ${cardClass} p-4 h-100`}>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Contas a Pagar & Despesas Fiscais</h3>
                      <div className="table-responsive">
                        <table className={`table table-striped table-hover text-xs ${textBody}`}>
                          <thead>
                            <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                              <th className="p-3 border-0">Despesa / Fornecedor</th>
                              <th className="p-3 border-0">Categoria</th>
                              <th className="p-3 border-0">Centro de Custo</th>
                              <th className="p-3 border-0 text-center">Vencimento</th>
                              <th className="p-3 border-0 text-right">Valor</th>
                              <th className="p-3 border-0 text-center">Status</th>
                              <th className="p-3 border-0 text-right">Ação</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payables.map(pay => (
                              <tr key={pay.id} className={`border-bottom ${borderCol}/40`}>
                                <td className={`p-3 border-0 font-semibold ${textTitle}`}>{pay.desc}</td>
                                <td className="p-3 border-0">{pay.category}</td>
                                <td className="p-3 border-0 font-semibold">{pay.costCenter}</td>
                                <td className="p-3 border-0 text-center">{pay.due}</td>
                                <td className="p-3 border-0 text-right font-mono font-bold text-[#EF4444]">R$ {pay.amount.toLocaleString('pt-BR')}</td>
                                <td className="p-3 border-0 text-center">
                                  <span className={`badge ${
                                    pay.status === 'Pago' 
                                      ? 'badge-success bg-[#22C55E]/12 text-[#22C55E]' 
                                      : pay.status === 'Pendente' 
                                      ? 'badge-warning bg-[#F59E0B]/12 text-[#FB923C]'
                                      : 'badge-primary bg-blue-500/12 text-[#3B82F6]'
                                  } text-[8px] font-bold px-2 py-0.5 rounded-full`}>
                                    {pay.status}
                                  </span>
                                </td>
                                <td className="p-3 border-0 text-right">
                                  {pay.status !== 'Pago' && (
                                    <button 
                                      onClick={() => {
                                        setPayables(prev => prev.map(p => p.id === pay.id ? { ...p, status: 'Pago' } : p));
                                        setFinancialStats(stats => ({ ...stats, saldo: stats.saldo - pay.amount }));
                                        triggerToast("Despesa Paga 💸", `R$ ${pay.amount.toLocaleString('pt-BR')} debitados.`);
                                      }}
                                      className="btn btn-primary btn-sm px-2.5 py-1 text-[10px] font-semibold rounded border-0 cursor-pointer"
                                    >
                                      Pagar
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

                  {/* Add Payable Form */}
                  <div className="col-lg-4 mb-3">
                    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                      <div>
                        <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Lançar Nova Despesa</h3>
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          if (!newPayable.desc || !newPayable.amount) {
                            triggerToast("Aviso", "Preencha todos os campos do contas a pagar.", "warning");
                            return;
                          }
                          const amount = parseFloat(newPayable.amount);
                          const item = {
                            id: `pay-${Date.now()}`,
                            desc: newPayable.desc,
                            amount,
                            category: newPayable.category,
                            due: newPayable.due,
                            costCenter: newPayable.costCenter,
                            status: 'Pendente'
                          };
                          setPayables([item, ...payables]);
                          setNewPayable({ desc: '', amount: '', category: 'Fornecedor', due: '2026-07-20', costCenter: 'Eventos' });
                          triggerToast("Lançamento Efetuado 💸", "Despesa agendada com sucesso!");
                        }} className="space-y-3 text-xs">
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Fornecedor / Descrição</label>
                            <input 
                              type="text" 
                              value={newPayable.desc}
                              onChange={(e) => setNewPayable(prev => ({ ...prev, desc: e.target.value }))}
                              placeholder="Ex: Fornecedor de Copos"
                              className={`form-control form-control-sm ${inputClass}`}
                            />
                          </div>
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Valor (R$)</label>
                            <input 
                              type="number" 
                              value={newPayable.amount}
                              onChange={(e) => setNewPayable(prev => ({ ...prev, amount: e.target.value }))}
                              placeholder="0,00"
                              className={`form-control form-control-sm ${inputClass}`}
                            />
                          </div>
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Categoria</label>
                            <select 
                              value={newPayable.category}
                              onChange={(e) => setNewPayable(prev => ({ ...prev, category: e.target.value }))}
                              className={`form-control form-control-sm ${inputClass}`}
                            >
                              <option value="Fornecedor">Fornecedor de Evento</option>
                              <option value="Infraestrutura">Locação e Estrutura</option>
                              <option value="Marketing">Tráfego & Anúncios</option>
                              <option value="Repasse">Repasse de Produtor</option>
                            </select>
                          </div>
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Centro de Custo</label>
                            <select 
                              value={newPayable.costCenter}
                              onChange={(e) => setNewPayable(prev => ({ ...prev, costCenter: e.target.value }))}
                              className={`form-control form-control-sm ${inputClass}`}
                            >
                              {costCenters.map(cc => <option key={cc.id} value={cc.name}>{cc.name}</option>)}
                            </select>
                          </div>
                          <div className="form-group mb-2">
                            <label className={`text-[9px] ${textSec} font-semibold uppercase`}>Data de Vencimento</label>
                            <input 
                              type="date" 
                              value={newPayable.due}
                              onChange={(e) => setNewPayable(prev => ({ ...prev, due: e.target.value }))}
                              className={`form-control form-control-sm ${inputClass}`}
                            />
                          </div>
                          <button type="submit" className="btn btn-primary w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer">
                            Agendar Despesa
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 4: Bancos & Conciliação */}
              {financeSubTab === 'conciliacao' && (
                <div className="row animate-fadeIn">
                  <div className="col-lg-6 mb-3">
                    <div className={`card ${cardClass} p-4 h-100`}>
                      <div className="flex justify-between items-center border-bottom border-light/5 pb-3 mb-3">
                        <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Importação de Extrato Bancário</h3>
                        <button 
                          type="button"
                          onClick={() => {
                            setConciliationItems(prev => prev.map(item => ({ ...item, matched: true })));
                            triggerToast("Conciliação Realizada 🤝", "Todos os lançamentos foram conciliados com sucesso!");
                          }}
                          className="btn btn-primary py-1 px-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-semibold rounded border-0 cursor-pointer"
                        >
                          Simular Importação OFX
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        {conciliationItems.map(item => (
                          <div key={item.id} className={`p-3 rounded border ${borderCol} flex justify-between items-center text-xs ${
                            item.matched ? 'bg-green-500/5 border-green-500/30' : theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'
                          }`}>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className={`font-semibold ${textTitle}`}>{item.desc}</span>
                                <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold ${
                                  item.type === 'in' ? 'bg-[#22C55E]/12 text-[#22C55E]' : 'bg-[#EF4444]/12 text-[#EF4444]'
                                }`}>
                                  {item.type === 'in' ? 'Entrada' : 'Saída'}
                                </span>
                              </div>
                              <span className={`text-[9px] ${textSec} block mt-0.5`}>Sugestão Contábil: {item.matchInvoice}</span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <span className="font-mono font-bold text-slate-400">R$ {item.amount.toLocaleString('pt-BR')}</span>
                              {item.matched ? (
                                <span className="text-[#22C55E] font-bold">✔ Conciliado</span>
                              ) : (
                                <button 
                                  type="button"
                                  onClick={() => {
                                    setConciliationItems(prev => prev.map(i => i.id === item.id ? { ...i, matched: true } : i));
                                    triggerToast("Item Conciliado", "Lançamento contábil integrado automaticamente.");
                                  }}
                                  className="btn btn-primary btn-sm px-2 py-1 text-[9px] rounded border-0 cursor-pointer"
                                >
                                  Conciliar
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bank Accounts Grid list */}
                  <div className="col-lg-6 mb-3">
                    <div className={`card ${cardClass} p-4 h-100`}>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Contas Bancárias Cadastradas</h3>
                      <div className="space-y-3">
                        {accounts.map(acc => (
                          <div key={acc.id} className={`p-3 rounded border ${borderCol} flex justify-between items-center`}>
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/10 text-[#3B82F6] font-bold`}>
                                {acc.name[0]}
                              </div>
                              <div>
                                <span className={`text-xs font-semibold ${textTitle} block`}>{acc.name}</span>
                                <span className={`text-[9px] ${textSec} block`}>Agência: 0001 / Conta: Ativa</span>
                              </div>
                            </div>
                            <span className="font-mono text-xs font-bold text-[#22C55E]">R$ {acc.balance.toLocaleString('pt-BR')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 5: DRE Gerencial */}
              {financeSubTab === 'dre' && (
                <div className={`card ${cardClass} p-4 animate-fadeIn`}>
                  <div className={`flex justify-between items-center border-bottom ${borderCol} pb-3 mb-4`}>
                    <div>
                      <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Demonstrativo de Resultado do Exercício (DRE Gerencial)</h3>
                      <p className={`text-xs ${textSec} mb-0`}>Visão gerencial de faturamento acumulado, deduções e margem.</p>
                    </div>
                    <span className={`text-xs ${textSec} font-mono font-bold`}>Período: Julho/2026</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between font-bold border-bottom border-dashed border-slate-700/30 pb-2">
                      <span className={textTitle}>Receita Bruta com Eventos (Venda Ingressos)</span>
                      <span className="font-mono text-[#22C55E]">R$ 2.580.000,00</span>
                    </div>
                    
                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Taxas de Gateway e Conectividade (1.5%)</span>
                      <span className="font-mono text-[#EF4444]">-R$ 38.700,00</span>
                    </div>

                    <div className="flex justify-between font-bold border-bottom border-dashed border-slate-700/30 pb-2">
                      <span className={textTitle}>Receita Líquida do Ecossistema</span>
                      <span className="font-mono text-[#22C55E]">R$ 2.541.300,00</span>
                    </div>

                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Repasses efetuados a Produtores e Bandas</span>
                      <span className="font-mono text-[#EF4444]">-R$ 620.000,00</span>
                    </div>

                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Custos Operacionais locais (LED, Segurança, Insumos Bar)</span>
                      <span className="font-mono text-[#EF4444]">-R$ 83.400,00</span>
                    </div>

                    <div className="flex justify-between font-bold border-bottom border-dashed border-slate-700/30 pb-2">
                      <span className={textTitle}>Margem de Contribuição Bruta</span>
                      <span className="font-mono text-[#22C55E]">R$ 1.837.900,00</span>
                    </div>

                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Despesas Administrativas e Pessoal Fixo</span>
                      <span className="font-mono text-[#EF4444]">-R$ 48.000,00</span>
                    </div>

                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Tráfego Pago e Marketing de Atração</span>
                      <span className="font-mono text-[#EF4444]">-R$ 12.500,00</span>
                    </div>

                    <div className="flex justify-between font-black text-sm border-top border-slate-500 pt-2">
                      <span className={textTitle}>LUCRO LÍQUIDO OPERACIONAL (EBITDA)</span>
                      <span className="font-mono text-[#22C55E]">R$ 1.777.400,00</span>
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
                  <p className={`text-xs ${textSec} mb-0`}>Balancetes de verificação, livros diários, plano de contas e DRE contábil oficial.</p>
                </div>
                
                <div className={`flex ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'} border ${borderCol} p-1 rounded space-x-1 overflow-x-auto text-xs`}>
                  <button 
                    onClick={() => setAccountingSubTab('dashboard')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      accountingSubTab === 'dashboard' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Dashboard & Auditoria
                  </button>
                  <button 
                    onClick={() => setAccountingSubTab('lancamentos')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      accountingSubTab === 'lancamentos' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Lançamentos & Livros
                  </button>
                  <button 
                    onClick={() => setAccountingSubTab('balancete')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      accountingSubTab === 'balancete' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    Plano & Balancetes
                  </button>
                  <button 
                    onClick={() => setAccountingSubTab('dreContabil')}
                    className={`px-3 py-1 rounded font-medium transition-all border-0 shrink-0 ${
                      accountingSubTab === 'dreContabil' ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent`
                    }`}
                  >
                    DRE Contábil
                  </button>
                </div>
              </div>

              {/* Sub-Tab 1: Dashboard & Auditoria */}
              {accountingSubTab === 'dashboard' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="row">
                    <div className="col-md-6 col-lg-4 mb-3">
                      <div className={`card ${cardClass} p-4`}>
                        <span className={`text-[9px] ${textSec} font-bold uppercase tracking-wider block`}>Lucro Líquido Fiscal</span>
                        <h4 className="text-xl font-mono font-bold text-[#22C55E] mt-2 mb-0">R$ 1.777.400,00</h4>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-3">
                      <div className={`card ${cardClass} p-4`}>
                        <span className={`text-[9px] ${textSec} font-bold uppercase tracking-wider block`}>EBITDA Projetado</span>
                        <h4 className="text-xl font-mono font-bold text-[#3B82F6] mt-2 mb-0">R$ 1.837.900,00</h4>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-4 mb-3">
                      <div className={`card ${cardClass} p-4`}>
                        <span className={`text-[9px] ${textSec} font-bold uppercase tracking-wider block`}>Obrigações Fiscais Pendentes</span>
                        <h4 className="text-xl font-mono font-bold text-[#F59E0B] mt-2 mb-0">0 Pendentes</h4>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {/* Audit trail */}
                    <div className="col-lg-8 mb-3">
                      <div className={`card ${cardClass} p-4 h-100`}>
                        <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Trilha de Auditoria Contábil</h3>
                        <div className="space-y-3">
                          {contabilAuditorias.map(aud => (
                            <div key={aud.id} className={`p-3 rounded border ${borderCol} flex justify-between items-start text-xs ${
                              aud.type === 'Sucesso' ? 'bg-green-500/5 border-green-500/30' : 'bg-warning/5 border-warning/30'
                            }`}>
                              <div>
                                <span className={`font-semibold ${textTitle} block`}>{aud.msg}</span>
                                <span className={`text-[9px] ${textSec} block mt-0.5`}>Data da auditoria: {aud.date}</span>
                              </div>
                              <span className={`badge ${
                                aud.type === 'Sucesso' ? 'badge-success bg-[#22C55E]/12 text-[#22C55E]' : 'badge-warning bg-[#F59E0B]/12 text-[#FB923C]'
                              } text-[8px] font-bold px-2 py-0.5 rounded-full`}>
                                {aud.type}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tax Obligations checklists */}
                    <div className="col-lg-4 mb-3">
                      <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                        <div>
                          <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Obrigações & Declarações</h3>
                          <div className="space-y-3 text-xs">
                            <div className="flex justify-between items-center p-2 border-bottom border-light/5">
                              <span className={textBody}>SPED EFD Contribuições</span>
                              <span className="text-[#22C55E] font-bold">Transmitido ✔</span>
                            </div>
                            <div className="flex justify-between items-center p-2 border-bottom border-light/5">
                              <span className={textBody}>Declaração DCTF Mensal</span>
                              <span className="text-[#22C55E] font-bold">Transmitido ✔</span>
                            </div>
                            <div className="flex justify-between items-center p-2 border-bottom border-light/5">
                              <span className={textBody}>Gia Mensal ICMS/ISS</span>
                              <span className="text-[#22C55E] font-bold">Transmitido ✔</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => triggerToast("Integração SPED", "Lote fiscal SPED consolidado e pronto para envio.")}
                          className="btn btn-primary mt-4 w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer"
                        >
                          Gerar Exportação SPED
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Lançamentos & Livros */}
              {accountingSubTab === 'lancamentos' && (
                <div className="row animate-fadeIn">
                  <div className="col-lg-8 mb-3">
                    <div className={`card ${cardClass} p-4 h-100`}>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Partidas Dobradas Lançadas</h3>
                      <div className="table-responsive">
                        <table className={`table table-striped table-hover text-xs ${textBody}`}>
                          <thead>
                            <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                              <th className="p-3 border-0">Data</th>
                              <th className="p-3 border-0">Histórico / Descrição</th>
                              <th className="p-3 border-0">Conta Débito</th>
                              <th className="p-3 border-0">Conta Crédito</th>
                              <th className="p-3 border-0 text-right">Valor</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contabilLancamentos.map(lan => (
                              <tr key={lan.id} className={`border-bottom ${borderCol}/40`}>
                                <td className="p-3 border-0">{lan.date}</td>
                                <td className={`p-3 border-0 font-semibold ${textTitle}`}>{lan.desc}</td>
                                <td className="p-3 border-0 font-mono text-[#3B82F6]">{lan.debit}</td>
                                <td className="p-3 border-0 font-mono text-[#F97316]">{lan.credit}</td>
                                <td className="p-3 border-0 text-right font-mono font-bold text-slate-850 dark:text-white">R$ {lan.amount.toLocaleString('pt-BR')}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Books actions */}
                  <div className="col-lg-4 mb-3">
                    <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                      <div>
                        <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Emissão de Livros Contábeis</h3>
                        <p className={`text-xs ${textSec} leading-relaxed`}>
                          Gere e assine digitalmente os livros oficiais em conformidade com as diretrizes do SPED Contábil.
                        </p>
                        <div className="space-y-2 mt-4 text-xs">
                          <button 
                            type="button"
                            onClick={() => triggerToast("Relatório Exportado", "Livro Diário Oficial gerado com sucesso.")}
                            className={`btn w-full text-left p-2.5 ${theme === 'dark' ? 'bg-[#111827] text-white border-white/5' : 'bg-slate-50 text-slate-800 border-slate-300/40'} font-semibold rounded flex justify-between items-center cursor-pointer`}
                          >
                            <span>Emitir Livro Diário</span>
                            <Download className="w-3.5 h-3.5 text-[#3B82F6]" />
                          </button>
                          
                          <button 
                            type="button"
                            onClick={() => triggerToast("Relatório Exportado", "Livro Razão de Fechamento gerado com sucesso.")}
                            className={`btn w-full text-left p-2.5 ${theme === 'dark' ? 'bg-[#111827] text-white border-white/5' : 'bg-slate-50 text-slate-800 border-slate-300/40'} font-semibold rounded flex justify-between items-center cursor-pointer`}
                          >
                            <span>Emitir Livro Razão</span>
                            <Download className="w-3.5 h-3.5 text-[#3B82F6]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Plano & Balancetes */}
              {accountingSubTab === 'balancete' && (
                <div className="row animate-fadeIn">
                  <div className="col-lg-12 mb-3">
                    <div className={`card ${cardClass} p-4`}>
                      <h3 className={`text-sm font-semibold ${textTitle} border-bottom ${borderCol} pb-3 mb-3`}>Balancete de Verificação</h3>
                      <div className="table-responsive">
                        <table className={`table table-striped table-hover text-xs ${textBody}`}>
                          <thead>
                            <tr className={`border-bottom ${borderCol} ${textSec} font-semibold text-[10px] uppercase text-left`}>
                              <th className="p-3 border-0">Classificação</th>
                              <th className="p-3 border-0">Descrição da Conta</th>
                              <th className="p-3 border-0">Grupo</th>
                              <th className="p-3 border-0 text-right">Saldo Atual</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contabilPlanoContas.map(acc => (
                              <tr key={acc.code} className={`border-bottom ${borderCol}/40`}>
                                <td className="p-3 border-0 font-mono font-semibold">{acc.code}</td>
                                <td className={`p-3 border-0 font-semibold ${textTitle}`}>{acc.name}</td>
                                <td className="p-3 border-0">{acc.type}</td>
                                <td className="p-3 border-0 text-right font-mono font-bold text-slate-850 dark:text-white">R$ {acc.balance.toLocaleString('pt-BR')}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 4: DRE Contábil */}
              {accountingSubTab === 'dreContabil' && (
                <div className={`card ${cardClass} p-4 animate-fadeIn`}>
                  <div className={`flex justify-between items-center border-bottom ${borderCol} pb-3 mb-4`}>
                    <div>
                      <h3 className={`text-sm font-semibold ${textTitle} mb-0`}>Demonstrativo de Resultado do Exercício (DRE Contábil)</h3>
                      <p className={`text-xs ${textSec} mb-0`}>Demonstrativo oficial de receitas, despesas contábeis e resultado líquido fiscal.</p>
                    </div>
                    <span className={`text-xs ${textSec} font-mono font-bold`}>Exercício: 2026 / Julho</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between font-bold border-bottom border-dashed border-slate-700/30 pb-2">
                      <span className={textTitle}>Receita Bruta com Eventos (Código 3.1.01)</span>
                      <span className="font-mono text-[#22C55E]">R$ 2.580.000,00</span>
                    </div>

                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Custos dos Serviços Prestados (Código 4.1.01)</span>
                      <span className="font-mono text-[#EF4444]">-R$ 620.000,00</span>
                    </div>

                    <div className="flex justify-between font-bold border-bottom border-dashed border-slate-700/30 pb-2">
                      <span className={textTitle}>LUCRO BRUTO</span>
                      <span className="font-mono text-[#22C55E]">R$ 1.960.000,00</span>
                    </div>

                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Despesas Administrativas e Gerais (Código 4.1.02)</span>
                      <span className="font-mono text-[#EF4444]">-R$ 148.000,00</span>
                    </div>

                    <div className="flex justify-between font-bold border-bottom border-dashed border-slate-700/30 pb-2">
                      <span className={textTitle}>RESULTADO ANTES DOS IMPOSTOS (LAIR)</span>
                      <span className="font-mono text-[#22C55E]">R$ 1.812.000,00</span>
                    </div>

                    <div className="flex justify-between pl-3 text-slate-400">
                      <span>(-) Provisão Impostos sobre o Lucro (CSSL / IRPJ)</span>
                      <span className="font-mono text-[#EF4444]">-R$ 34.600,00</span>
                    </div>

                    <div className="flex justify-between font-black text-sm border-top border-slate-500 pt-2">
                      <span className={textTitle}>RESULTADO LÍQUIDO DO PERÍODO</span>
                      <span className="font-mono text-[#22C55E]">R$ 1.777.400,00</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= 4. CRM DE VENDAS VIEW ================= */}
          {/* ================= 4. CRM DE VENDAS VIEW ================= */}
          {currentTab === 'crm' && (() => {
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
                <div className="row">
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

          {/* ================= 4B. GESTÃO DE EVENTOS VIEW (FASE 4) ================= */}
          {currentTab === 'eventos' && (() => {
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
                      const activeEvs = events.filter(e => e.status === 'Ativo').length;
                      const finishedEvs = events.filter(e => e.status === 'Finalizado').length;
                      const pdvRev = pdvSales.filter(s => s.status === 'Aprovado').reduce((acc, s) => acc + s.amount, 0);
                      const onlineRev = 380000;
                      const totalRev = pdvRev + onlineRev;
                      const tixIssued = issuedTickets.length;
                      const checkinQty = checkins.filter(c => c.status === 'Sucesso').length;
                      const checkinRate = tixIssued > 0 ? ((checkinQty / tixIssued) * 100).toFixed(1) : '0.0';

                      return (
                        <div className="space-y-4">
                          {/* Top Row KPIs */}
                          <div className="row">
                            <div className="col-lg-3 col-6 mb-3">
                              <div className={`card ${cardClass} p-3 h-100 flex flex-col justify-between`}>
                                <span className={`text-[9px] font-bold ${textSec} uppercase tracking-wider`}>Eventos Ativos / Fim</span>
                                <h3 className={`text-lg font-bold ${textTitle} mt-2 mb-0`}>{activeEvs} <span className="text-xs text-slate-400 font-normal">/ {finishedEvs}</span></h3>
                                <span className="text-[8px] text-slate-400 mt-1">Status Geral Operacional</span>
                              </div>
                            </div>
                            <div className="col-lg-3 col-6 mb-3">
                              <div className={`card ${cardClass} p-3 h-100 flex flex-col justify-between`}>
                                <span className={`text-[9px] font-bold ${textSec} uppercase tracking-wider`}>Receita Consolidada</span>
                                <h3 className={`text-lg font-bold ${textTitle} mt-2 mb-0 font-mono text-[#22C55E]`}>R$ {(totalRev / 1000).toFixed(0)}k</h3>
                                <span className="text-[8px] text-slate-400 mt-1">PDV R$ {pdvRev.toLocaleString()} + Online</span>
                              </div>
                            </div>
                            <div className="col-lg-3 col-6 mb-3">
                              <div className={`card ${cardClass} p-3 h-100 flex flex-col justify-between`}>
                                <span className={`text-[9px] font-bold ${textSec} uppercase tracking-wider`}>Check-in Realizados</span>
                                <h3 className={`text-lg font-bold ${textTitle} mt-2 mb-0`}>{checkinQty} <span className="text-xs text-slate-400 font-normal">({checkinRate}%)</span></h3>
                                <span className="text-[8px] text-slate-400 mt-1">{tixIssued} Ingressos Emitidos</span>
                              </div>
                            </div>
                            <div className="col-lg-3 col-6 mb-3">
                              <div className={`card ${cardClass} p-3 h-100 flex flex-col justify-between`}>
                                <span className={`text-[9px] font-bold ${textSec} uppercase tracking-wider`}>Ocupação Média</span>
                                <h3 className={`text-lg font-bold ${textTitle} mt-2 mb-0`}>72%</h3>
                                <span className="text-[8px] text-slate-400 mt-1">Público vs Capacidade Locais</span>
                              </div>
                            </div>
                          </div>

                          {/* Operational Stats Grid */}
                          <div className="row">
                            <div className="col-lg-7 mb-3">
                              <div className={`card ${cardClass} p-4 h-100`}>
                                <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-3`}>Operação por Canal de Faturamento</h4>
                                <div className="space-y-3.5 text-xs">
                                  <div className="space-y-1">
                                    <div className="flex justify-between font-semibold">
                                      <span>Bilheteria Local & PDV Físico</span>
                                      <span className="font-mono text-[#22C55E]">R$ {pdvRev.toLocaleString()} ({(pdvRev / totalRev * 100 || 0).toFixed(0)}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-white/5 rounded-full h-1.5">
                                      <div className="bg-[#22C55E] h-1.5 rounded-full" style={{ width: `${pdvRev / totalRev * 100 || 0}%` }}></div>
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between font-semibold">
                                      <span>Venda Online Integrada</span>
                                      <span className="font-mono text-[#3B82F6]">R$ {onlineRev.toLocaleString()} ({(onlineRev / totalRev * 100 || 0).toFixed(0)}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-white/5 rounded-full h-1.5">
                                      <div className="bg-[#3B82F6] h-1.5 rounded-full" style={{ width: `${onlineRev / totalRev * 100 || 0}%` }}></div>
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between font-semibold">
                                      <span>Consumo de Alimentos / Bar</span>
                                      <span className="font-mono text-[#8B5CF6]">R$ {pdvSales.filter(s=>s.type==='Consumo').reduce((acc,s)=>acc+s.amount,0).toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-white/5 rounded-full h-1.5">
                                      <div className="bg-[#8B5CF6] h-1.5 rounded-full" style={{ width: '15%' }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-5 mb-3">
                              <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between`}>
                                <div>
                                  <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-3`}>Logs Recentes de Acesso</h4>
                                  <div className="space-y-2">
                                    {eventLogs.slice(0, 3).map(log => (
                                      <div key={log.id} className="text-[10px] p-2 bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 rounded">
                                        <div className="flex justify-between text-slate-400 font-semibold mb-0.5">
                                          <span>{log.type}</span>
                                          <span className="font-mono">{log.timestamp.substring(11)}</span>
                                        </div>
                                        <p className={`${textBody} mb-0 truncate`}>{log.message}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <button 
                                  onClick={() => handleEventsSubTabChange('api_sandbox')}
                                  className="text-xs font-bold text-[#3B82F6] hover:underline bg-transparent border-0 p-0 text-left cursor-pointer mt-3"
                                >
                                  Ver console de eventos completo &rarr;
                                </button>
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
                              const totalSold = issuedTickets.filter(t => t.eventId === ev.id && t.status === 'Pago').length;
                              const revenue = totalSold * 150; // simulated ticket price
                              return (
                                <div key={ev.id} className="col-md-6 col-lg-4">
                                  <div className={`card ${cardClass} overflow-hidden h-100 flex flex-col justify-between hover:shadow-md transition-all duration-200 border-0`}>
                                    
                                    {/* Card Header Cover Gradient */}
                                    <div className="h-24 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] p-3 flex flex-col justify-between text-white relative">
                                      <span className="badge bg-white/20 text-white text-[8px] uppercase font-mono px-2 py-0.5 rounded w-fit">{ev.category}</span>
                                      <div>
                                        <h3 className="text-xs font-bold truncate mb-0.5 text-white">{ev.name}</h3>
                                        <span className="text-[9px] opacity-90 block">{ev.city} • {ev.venue}</span>
                                      </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-3.5 space-y-3 flex-1">
                                      <div className="flex justify-between items-center text-[11px]">
                                        <span className={textSec}>Data / Hora:</span>
                                        <span className={`font-mono font-bold ${textTitle}`}>{ev.date} às {ev.time}</span>
                                      </div>

                                      <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                                          <span>Ingressos Vendidos</span>
                                          <span>{totalSold} / {ev.capacity.toLocaleString()}</span>
                                        </div>
                                        <div className="progress rounded-full bg-slate-200 dark:bg-white/10" style={{ height: '6px' }}>
                                          <div className="progress-bar bg-[#2563EB]" role="progressbar" style={{ width: `${Math.min(100, (totalSold / ev.capacity * 100))}%` }}></div>
                                        </div>
                                      </div>

                                      <div className="flex justify-between items-center text-[11px] pt-1.5 border-t border-slate-100 dark:border-white/5">
                                        <span className={textSec}>Receita Estimada:</span>
                                        <span className="font-bold text-[#10B981]">R$ {revenue.toLocaleString('pt-BR')}</span>
                                      </div>
                                    </div>

                                    {/* Card Footer Actions */}
                                    <div className={`p-2.5 bg-slate-50 dark:bg-white/2 border-t ${borderCol} flex justify-between items-center text-xs`}>
                                      <span className={`badge text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                        ev.status === 'Ativo' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-[#F59E0B]/15 text-[#F59E0B]'
                                      }`}>
                                        {ev.status}
                                      </span>

                                      <div className="flex items-center space-x-1.5">
                                        {ev.status === 'Pendente' && (
                                          <button 
                                            onClick={() => {
                                              setEvents(prev => prev.map(e => e.id === ev.id ? { ...e, status: 'Ativo' } : e));
                                              triggerToast("Ativado", "Evento aprovado!");
                                            }} 
                                            className="btn btn-xs bg-[#10B981] hover:bg-[#059669] text-white border-0 px-2 py-1 rounded font-bold cursor-pointer text-[9px]"
                                          >
                                            Aprovar
                                          </button>
                                        )}
                                        <button 
                                          onClick={() => {
                                            setEvents(prev => prev.filter(e => e.id !== ev.id));
                                            triggerToast("Deletado", "Evento excluído.");
                                          }} 
                                          className="p-1 text-red-500 hover:bg-red-500/10 rounded border-0 bg-transparent cursor-pointer"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
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

          {/* ================= 5. PLATAFORMA DISKINGRESSOS MARKETING HUB (MaaS) ================= */}
          {currentTab === 'marketing' && (() => {
            const modulesList = [
              { id: 1, plan: 'start', name: 'Módulo 1 – Divulgação Básica', desc: 'Publicação automática no site/app, agenda de eventos, página personalizada, compartilhamento social e link inteligente.' },
              { id: 2, plan: 'start', name: 'Módulo 2 – Social Starter', desc: '4 posts por mês, 8 stories, artes para divulgação, templates de Reels e banners promocionais.' },
              { id: 3, plan: 'profissional', name: 'Módulo 3 – Redes Sociais Integradas', desc: 'Facebook, Instagram, TikTok, LinkedIn, Threads, Google Business. Calendário editorial, Reels e vídeos.' },
              { id: 4, plan: 'profissional', name: 'Módulo 4 – Tráfego Pago', desc: 'Google, Meta, TikTok, YouTube Ads. Lookalike, remarketing, Pixels e Tag Manager com GA4 integrado.' },
              { id: 5, plan: 'profissional', name: 'Módulo 5 – CRM', desc: 'Cadastro automático, segmentação de base de dados, funil de vendas, e-mail marketing, SMS e WhatsApp.' },
              { id: 6, plan: 'premium', name: 'Módulo 6 – Inteligência Artificial', desc: 'IA para recomendação, público semelhante, melhor horário de postagem, previsão de vendas/lotação e preço inteligente.' },
              { id: 7, plan: 'premium', name: 'Módulo 7 – Influenciadores', desc: 'Busca automática, contratação, links rastreáveis, cupons exclusivos e rastreamento de ROI e vendas.' },
              { id: 8, plan: 'premium', name: 'Módulo 8 – Programa de Fidelidade', desc: 'Cashback de ingressos, pontos acumuláveis, VIP Club, missões para clientes e mecânicas de gamificação.' },
              { id: 9, plan: 'premium', name: 'Módulo 9 – Business Intelligence', desc: 'Painéis consolidados, visualização de conversão por canal de venda, ROI de campanhas e Benchmark.' },
              { id: 10, plan: 'premium', name: 'Módulo 10 – Automações de Fluxo', desc: 'Disparos automáticos por WhatsApp/SMS pós-compra, lembretes de carrinho abandonado e pesquisas NPS.' },
              { id: 11, plan: 'premium', name: 'Módulo 11 – Landing Pages', desc: 'Páginas exclusivas focadas em conversão, venda corporativa B2B, camarotes e formulários de captação de leads.' },
              { id: 12, plan: 'premium', name: 'Módulo 12 – Produção de Conteúdo', desc: 'Suporte à captação de imagem e vídeo, drone, making of do evento, lives e confecção de aftermovie profissional.' },
              { id: 13, plan: 'enterprise', name: 'Módulo 13 – Branding & Identidade', desc: 'Posicionamento estratégico, manual de marca completo, kit de vendas comercial e patrocínios.' },
              { id: 14, plan: 'enterprise', name: 'Módulo 14 – Assessoria de Imprensa', desc: 'Envio automático de releases para portais de notícias, contatos com TV, rádios e influenciadores de mídia local.' },
              { id: 15, plan: 'enterprise', name: 'Módulo 15 – Patrocínio Avançado', desc: 'Apresentações interativas, assessoria de captação via leis de incentivo (Rouanet) e relatórios de prestação de contas.' },
              { id: 16, plan: 'enterprise', name: 'Módulo 16 – Marketplace de Serviços', desc: 'Venda de produtos adicionais: alimentos, bebidas, copos ecológicos, estacionamento antecipado e experiências VIP.' },
              { id: 17, plan: 'enterprise', name: 'Módulo 17 – BI Executivo Financeiro', desc: 'Visualização macroeconômica: margem operacional de lote, despesas de infraestrutura e break-even reativo.' },
              { id: 18, plan: 'omnichannel', name: 'Módulo 18 – Omnichannel Integrado', desc: 'Conexão unificada: Site, App, PDV físico, totens eletrônicos, TV Indoor e painéis de LED da Arena.' },
              { id: 19, plan: 'omnichannel', name: 'Módulo 19 – Marketing Local', desc: 'Campanhas por proximidade geográfica via geolocalização no Waze, Google Maps e notificações push.' },
              { id: 20, plan: 'omnichannel', name: 'Módulo 20 – Central de Campanhas', desc: 'Ferramenta avançada para cupons flexíveis, indique-e-ganhe, flash sales de lote relâmpago e combos casados.' },
              { id: 21, plan: 'omnichannel', name: 'Módulo 21 – Analytics 360', desc: 'Controle de LTV/CAC em tempo real, fluxo de vendas por minuto, mapa de calor de compradores e jornada 360.' }
            ];

            const applyPlanModules = (planId) => {
              setMarketingActivePlan(planId);
              setMarketingModulesStatus(prev => {
                const updated = { ...prev };
                modulesList.forEach(m => {
                  if (planId === 'start') {
                    updated[m.id] = (m.plan === 'start');
                  } else if (planId === 'profissional') {
                    updated[m.id] = (m.plan === 'start' || m.plan === 'profissional');
                  } else if (planId === 'premium') {
                    updated[m.id] = (m.plan === 'start' || m.plan === 'profissional' || m.plan === 'premium');
                  } else if (planId === 'enterprise') {
                    updated[m.id] = (m.plan === 'start' || m.plan === 'profissional' || m.plan === 'premium' || m.plan === 'enterprise');
                  } else if (planId === 'omnichannel') {
                    updated[m.id] = true;
                  }
                });
                return updated;
              });
              triggerToast("Mudar Plano", `Plano alterado para ${planId.toUpperCase()}. Módulos licenciados atualizados.`);
            };

            const toggleModuleDirect = (modId) => {
              setMarketingModulesStatus(prev => ({
                ...prev,
                [modId]: !prev[modId]
              }));
              triggerToast("Configuração MaaS", `Módulo ${modId} alterado manualmente.`);
            };

            const [selectedAiEvent, setSelectedAiEvent] = useState('ev-1');
            const [aiOutputs, setAiOutputs] = useState({
              bestTime: "Terça-feira às 19:30",
              salesForecast: "O Lote Pista VIP deve se esgotar nas próximas 36 horas. Recomendado adiantar abertura de Lote 2.",
              smartPrice: "R$ 165,00 (Preço ótimo estimado com base na taxa de cliques de 14.5%)",
              occupancy: "94% de ocupação estimada (Margem de erro +-3%)",
              sentiment: { pos: 88, neu: 9, neg: 3 }
            });

            const handleSimulateAi = () => {
              setAiOutputs({
                bestTime: ["Quinta-feira às 20:00", "Segunda-feira às 18:00", "Domingo às 15:30"][Math.floor(Math.random()*3)],
                salesForecast: `Faltam apenas 120 ingressos para mudar o lote. Projeção de virada de lote em ${Math.floor(Math.random()*24) + 12} horas.`,
                smartPrice: `R$ ${(Math.random()*80 + 120).toFixed(2)} (Margem baseada no lote atual)`,
                occupancy: `${Math.floor(Math.random()*20) + 78}% de ocupação estimada para o local`,
                sentiment: { pos: Math.floor(Math.random()*15) + 80, neu: Math.floor(Math.random()*5) + 5, neg: Math.floor(Math.random()*5) }
              });
              triggerToast("Inteligência Artificial", "Previsões de mercado e recomendação de IA recalculadas.");
            };

            const renderModuleLock = (moduleIds, title) => {
              const active = moduleIds.every(id => marketingModulesStatus[id]);
              if (!active) {
                return (
                  <div className={`card ${cardClass} border-dashed border-[#F59E0B]/50 p-5 text-center flex flex-col items-center justify-center space-y-3 my-4`}>
                    <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-[#F59E0B]" />
                    </div>
                    <h4 className={`text-sm font-bold ${textTitle} mb-0`}>Módulo Bloqueado no Licenciamento</h4>
                    <p className={`text-xs ${textSec} max-w-md mx-auto mb-0`}>
                      Esta seção requer os seguintes módulos ativos: <br />
                      <strong>{moduleIds.map(id => modulesList.find(m => m.id === id)?.name).join(', ')}</strong>.
                    </p>
                    <button 
                      onClick={() => setMarketingSubTab('licensing')} 
                      className="btn btn-warning btn-sm bg-[#F59E0B] text-slate-900 border-0 px-4 py-2 font-bold text-xs rounded cursor-pointer mt-2"
                    >
                      Ativar Módulos no Painel MaaS
                    </button>
                  </div>
                );
              }
              return null;
            };

            return (
              <div className="space-y-4 animate-fadeIn">
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-bottom pb-3 border-slate-200 dark:border-white/5">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className={`text-xl font-bold ${textTitle} tracking-tight mb-0`}>DiskIngressos Marketing Hub</h2>
                      <span className="badge bg-[#3B82F6]/10 text-[#3B82F6] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#3B82F6]/20">MaaS</span>
                    </div>
                    <p className={`text-xs ${textSec} mb-0 italic`}>"Venda mais ingressos com inteligência, automação e marketing integrado."</p>
                  </div>
                  
                  <div className={`flex flex-wrap ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'} border ${borderCol} p-1 rounded space-x-1 text-xs`}>
                    {[
                      { id: 'licensing', label: 'Planos & Módulos MaaS' },
                      { id: 'dashboard', label: 'Dashboard Performance' },
                      { id: 'campanhas', label: 'Central Campanhas' },
                      { id: 'ia_engine', label: 'Inteligência IA' },
                      { id: 'influencers', label: 'Influenciadores' },
                      { id: 'fidelidade', label: 'Fidelidade' },
                      { id: 'analytics360', label: 'Analytics 360 & BI' }
                    ].map(tab => (
                      <button 
                        key={tab.id}
                        onClick={() => setMarketingSubTab(tab.id)}
                        className={`px-2.5 py-1.5 rounded font-semibold transition-all border-0 ${
                          marketingSubTab === tab.id ? `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} ${textTitle}` : `${textSec} bg-transparent cursor-pointer`
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {marketingSubTab === 'licensing' && (
                  <div className="space-y-5 animate-fadeIn">
                    <div>
                      <h3 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-3`}>1. Planos de Comercialização MaaS</h3>
                      <div className="row g-3">
                        {[
                          { id: 'start', name: 'Essencial / Start', modules: 'Módulos 1 a 2', price: 'R$ 299/mês', desc: 'Pequenos produtores e eventos locais de até 1.000 ingressos.' },
                          { id: 'profissional', name: 'Profissional', modules: 'Módulos 1 a 5', price: 'R$ 799/mês', desc: 'Produtores em crescimento constante e casas de espetáculo regionais.' },
                          { id: 'premium', name: 'Premium', modules: 'Módulos 1 a 12', price: 'R$ 1.999/mês', desc: 'Grandes festivais, rodeios e promotores regionais robustos.' },
                          { id: 'enterprise', name: 'Enterprise', modules: 'Módulos 1 a 17', price: 'Sob Consulta', desc: 'Arenas, parques temáticos e corporações nacionais.' },
                          { id: 'omnichannel', name: 'Omnichannel', modules: 'Módulos 1 a 21', price: 'Customizado', desc: 'Integração completa de rede física e painéis eletrônicos.' }
                        ].map(pl => (
                          <div key={pl.id} className="col-lg">
                            <div className={`card ${cardClass} p-3 h-100 flex flex-col justify-between border-2 transition-all ${
                              marketingActivePlan === pl.id ? 'border-[#3B82F6] shadow bg-[#3B82F6]/5' : 'border-transparent'
                            }`}>
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className={`text-xs font-bold ${textTitle} mb-0`}>{pl.name}</h4>
                                  {marketingActivePlan === pl.id && (
                                    <span className="badge bg-[#3B82F6] text-white text-[8px] font-bold px-1.5 py-0.5 rounded">Ativo</span>
                                  )}
                                </div>
                                <span className={`text-[10px] ${textSec} block font-semibold mb-1`}>{pl.modules}</span>
                                <p className={`text-[9.5px] text-slate-400 leading-normal`}>{pl.desc}</p>
                              </div>
                              
                              <div className="mt-3">
                                <span className={`text-xs font-black ${textTitle} block mb-2`}>{pl.price}</span>
                                {marketingActivePlan !== pl.id ? (
                                  <button 
                                    onClick={() => applyPlanModules(pl.id)}
                                    className="btn btn-outline-primary btn-sm w-full text-[10px] py-1 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white bg-transparent rounded cursor-pointer"
                                  >
                                    Ativar Plano
                                  </button>
                                ) : (
                                  <button className="btn btn-primary btn-sm w-full text-[10px] py-1 bg-[#22C55E] text-white border-0 rounded cursor-not-allowed" disabled>
                                    Ativo
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-1`}>2. Controle dos Módulos MaaS (Ativação Granular)</h3>
                          <p className={`text-[10px] ${textSec} mb-0`}>Ative ou desative cada serviço contratado individualmente. O status de cada módulo afeta os recursos liberados no Hub.</p>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {Object.values(marketingModulesStatus).filter(Boolean).length} de 21 ativos
                        </span>
                      </div>

                      <div className="row g-2">
                        {['start', 'profissional', 'premium', 'enterprise', 'omnichannel'].map(tierName => {
                          const tierModules = modulesList.filter(m => m.plan === tierName);
                          return (
                            <div key={tierName} className="col-md-12 mb-3">
                              <div className={`p-2.5 rounded bg-slate-100/50 dark:bg-white/1 border ${borderCol} mb-2`}>
                                <h4 className={`text-[10px] font-bold ${textTitle} uppercase tracking-wide mb-0 flex justify-between`}>
                                  <span>Plano {tierName.toUpperCase()} - Módulos Licenciados</span>
                                  <span className="text-slate-400 font-normal">({tierModules.length} módulos)</span>
                                </h4>
                              </div>
                              <div className="row g-2">
                                {tierModules.map(mod => {
                                  const isActive = marketingModulesStatus[mod.id] === true;
                                  return (
                                    <div key={mod.id} className="col-lg-4 col-md-6">
                                      <div className={`card ${cardClass} p-3 flex flex-row items-start justify-between space-x-3 transition-all ${
                                        isActive ? 'border-l-4 border-l-[#22C55E]' : 'border-l-4 border-l-slate-400 opacity-60'
                                      }`}>
                                        <div className="flex-1">
                                          <h5 className={`text-[10.5px] font-bold ${textTitle} mb-1 flex items-center`}>
                                            {mod.name}
                                          </h5>
                                          <p className="text-[9.5px] text-slate-400 mb-0 leading-normal">{mod.desc}</p>
                                        </div>
                                        <div className="form-check form-switch pt-1">
                                          <input 
                                            type="checkbox" 
                                            checked={isActive} 
                                            onChange={() => toggleModuleDirect(mod.id)} 
                                            className="form-check-input cursor-pointer"
                                            style={{ width: '1.8em', height: '1em' }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {marketingSubTab === 'dashboard' && (() => {
                  const checkLock = renderModuleLock([1, 21], "Dashboard Geral");
                  if (checkLock) return checkLock;

                  return (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="row g-3">
                        {[
                          { title: 'Visualizações Site/App', value: '458.200', change: '+14.5%', text: 'Módulo 1 - Divulgação Básica' },
                          { title: 'Cliques no Link Inteligente', value: '74.310', change: '+9.2%', text: 'Módulo 1 - Conversão de cliques' },
                          { title: 'Vendas via Campanhas', value: '4.890', change: '+22.1%', text: 'Módulo 20 - Conversão de ingressos' },
                          { title: 'Taxa de Conversão Média', value: '6.58%', change: '+1.4%', text: 'Conversão Geral' }
                        ].map((kpi, idx) => (
                          <div key={idx} className="col-lg-3 col-sm-6">
                            <div className={`card ${cardClass} p-3.5 flex flex-col justify-between`}>
                              <span className={`text-[10px] font-semibold uppercase tracking-wider ${textSec}`}>{kpi.title}</span>
                              <div className="my-2 flex items-baseline justify-between">
                                <span className={`text-2xl font-black ${textTitle}`}>{kpi.value}</span>
                                <span className="text-[#22C55E] text-xs font-bold">{kpi.change}</span>
                              </div>
                              <span className="text-[9px] text-slate-400 font-mono">{kpi.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="row g-3">
                        {[
                          { title: 'CAC (Custo de Aquisição)', value: 'R$ 8,40', change: '-12%', desc: 'Custo de mídia por ingresso' },
                          { title: 'LTV (Lifetime Value)', value: 'R$ 412,00', change: '+18%', desc: 'Valor gasto por produtor' },
                          { title: 'Ticket Médio MaaS', value: 'R$ 184,00', change: '+5%', desc: 'Gasto médio por comprador' },
                          { title: 'ROI de Campanhas MaaS', value: '480%', change: '+45%', desc: 'Retorno de investimento' }
                        ].map((kpi, idx) => {
                          const hasModule = marketingModulesStatus[21];
                          return (
                            <div key={idx} className="col-lg-3 col-sm-6">
                              <div className={`card ${cardClass} p-3.5 flex flex-col justify-between ${!hasModule ? 'opacity-40' : ''}`}>
                                <div className="flex justify-between items-center mb-1">
                                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${textSec}`}>{kpi.title}</span>
                                  {!hasModule && <span className="text-[#F59E0B] text-[8px] font-bold">Mód. 21 Req.</span>}
                                </div>
                                {hasModule ? (
                                  <>
                                    <div className="my-2 flex items-baseline justify-between">
                                      <span className={`text-xl font-bold ${textTitle}`}>{kpi.value}</span>
                                      <span className="text-[#22C55E] text-xs font-bold">{kpi.change}</span>
                                    </div>
                                    <span className="text-[9px] text-slate-400">{kpi.desc}</span>
                                  </>
                                ) : (
                                  <div className="py-4 text-center text-slate-500 text-[10px] font-mono">// Módulo Analytics 360 Inativo</div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className={`card ${cardClass} p-4`}>
                        <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-3`}>Monitoramento Geral de Campanhas Ativas</h4>
                        <div className="table-responsive">
                          <table className="table text-xs mb-0">
                            <thead>
                              <tr className={`border-bottom ${borderCol} text-slate-400 font-semibold text-[9.5px] uppercase text-left`}>
                                <th className="pb-2 border-0">Campanha</th>
                                <th className="pb-2 border-0">Canal</th>
                                <th className="pb-2 border-0 text-center">Disparos</th>
                                <th className="pb-2 border-0 text-center">Taxa de Abertura</th>
                                <th className="pb-2 border-0 text-center">Cliques</th>
                                <th className="pb-2 border-0 text-right">Vendas Geradas</th>
                                <th className="pb-2 border-0 text-right">Receita Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {campaigns.map(c => (
                                <tr key={c.id} className={`border-bottom ${borderCol}/40 hover:bg-light/5`}>
                                  <td className={`py-3 border-0 font-bold ${textTitle}`}>{c.name}</td>
                                  <td className="py-3 border-0"><span className="badge bg-slate-100 dark:bg-white/5 text-slate-400 font-mono text-[9px] px-2 py-1 rounded">{c.channel}</span></td>
                                  <td className="py-3 border-0 text-center font-mono">{c.sent.toLocaleString()}</td>
                                  <td className="py-3 border-0 text-center text-[#22C55E] font-bold font-mono">{c.openRate}%</td>
                                  <td className="py-3 border-0 text-center font-mono">{(c.sent * (c.clickRate/100)).toFixed(0)} ({c.clickRate}%)</td>
                                  <td className="py-3 border-0 text-right font-bold font-mono text-[#3B82F6]">{c.conversions}</td>
                                  <td className="py-3 border-0 text-right font-black font-mono text-[#22C55E]">R$ {c.revenue.toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {marketingSubTab === 'campanhas' && (() => {
                  const checkLock = renderModuleLock([5, 20], "Central de Campanhas");
                  if (checkLock) return checkLock;

                  return (
                    <div className="row g-3 animate-fadeIn">
                      <div className="col-lg-4">
                        <div className={`card ${cardClass} p-4 space-y-4`}>
                          <div>
                            <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-1`}>Criador de Campanhas Exclusivas</h4>
                            <p className={`text-[10px] ${textSec} mb-0`}>Crie ações de incentivo comercial integradas à bilheteria em minutos.</p>
                          </div>

                          <form onSubmit={(e) => {
                            e.preventDefault();
                            const data = new FormData(e.target);
                            const actionType = data.get('type');
                            const target = data.get('targetEvent');
                            const name = data.get('name');

                            const newCampObj = {
                              id: `camp-${Date.now()}`,
                              name: name || `Campanha ${actionType} - ${target}`,
                              channel: data.get('channel'),
                              sent: Math.floor(Math.random()*10000) + 1500,
                              openRate: (Math.random()*40 + 60).toFixed(1),
                              clickRate: (Math.random()*10 + 10).toFixed(1),
                              conversions: Math.floor(Math.random()*300) + 50,
                              revenue: Math.floor(Math.random()*45000) + 5000,
                              status: 'Concluída',
                              date: new Date().toLocaleDateString()
                            };

                            setCampaigns(prev => [newCampObj, ...prev]);
                            triggerToast("Campanha MaaS", `Campanha "${newCampObj.name}" disparada com sucesso!`);
                            e.target.reset();
                          }} className="space-y-3 text-xs">
                            <div>
                              <label className={`text-[9px] font-bold ${textSec} uppercase block mb-1`}>Ação de Marketing</label>
                              <select name="type" className={`form-control form-select ${inputClass} text-xs p-2.5 rounded w-full`}>
                                <option value="Cupom">Cupom de Desconto</option>
                                <option value="Compre e Ganhe">Compre e Ganhe</option>
                                <option value="Cashback">Cashback Especial</option>
                                <option value="Ingresso Solidário">Ingresso Solidário</option>
                                <option value="Lote Relâmpago">Lote Relâmpago</option>
                                <option value="Combo Família">Combo Família / Casal</option>
                                <option value="Black Friday">Black Friday / Flash Sale</option>
                                <option value="Indique e Ganhe">Indique e Ganhe</option>
                              </select>
                            </div>

                            <div>
                              <label className={`text-[9px] font-bold ${textSec} uppercase block mb-1`}>Nome do Lote / Identificação</label>
                              <input type="text" name="name" placeholder="Ex: Black Friday Pista VIP" className={`form-control ${inputClass} text-xs p-2.5 rounded w-full`} required />
                            </div>

                            <div>
                              <label className={`text-[9px] font-bold ${textSec} uppercase block mb-1`}>Canal de Envio (Módulo 5/10)</label>
                              <select name="channel" className={`form-control form-select ${inputClass} text-xs p-2.5 rounded w-full`}>
                                <option value="WhatsApp">Disparo WhatsApp API</option>
                                <option value="E-mail">E-mail Marketing Integrado</option>
                                <option value="SMS">SMS Direto de Lembrete</option>
                                <option value="Push">Push Notification App</option>
                              </select>
                            </div>

                            <div>
                              <label className={`text-[9px] font-bold ${textSec} uppercase block mb-1`}>Evento Alvo</label>
                              <select name="targetEvent" className={`form-control form-select ${inputClass} text-xs p-2.5 rounded w-full`}>
                                {events.map(ev => (
                                  <option key={ev.id} value={ev.name}>{ev.name}</option>
                                ))}
                              </select>
                            </div>

                            <button type="submit" className="btn btn-primary w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded border-0 cursor-pointer">
                              Disparar Campanha de Venda
                            </button>
                          </form>
                        </div>
                      </div>

                      <div className="col-lg-8 space-y-3">
                        <div className={`card ${cardClass} p-4`}>
                          <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-3`}>Campanhas Disparadas</h4>
                          <div className="table-responsive">
                            <table className="table text-xs mb-0">
                              <thead>
                                <tr className={`border-bottom ${borderCol} text-slate-400 font-semibold text-[9.5px] uppercase`}>
                                  <th className="pb-2 border-0">Campanha</th>
                                  <th className="pb-2 border-0">Canal</th>
                                  <th className="pb-2 border-0 text-center">Status</th>
                                  <th className="pb-2 border-0 text-center">Data</th>
                                  <th className="pb-2 border-0 text-right">Vendas</th>
                                  <th className="pb-2 border-0 text-right">Faturamento</th>
                                </tr>
                              </thead>
                              <tbody>
                                {campaigns.map(c => (
                                  <tr key={c.id} className={`border-bottom ${borderCol}/40`}>
                                    <td className={`py-3 border-0 font-bold ${textTitle}`}>{c.name}</td>
                                    <td className="py-3 border-0"><span className="badge bg-slate-100 dark:bg-white/5 text-slate-400 font-mono text-[9px] px-2 py-1 rounded">{c.channel}</span></td>
                                    <td className="py-3 border-0 text-center">
                                      <span className={`badge ${c.status === 'Concluída' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'} text-[8.5px] font-bold px-2 py-0.5 rounded-full`}>
                                        {c.status}
                                      </span>
                                    </td>
                                    <td className="py-3 border-0 text-center text-slate-400">{c.date}</td>
                                    <td className="py-3 border-0 text-right font-bold">{c.conversions}</td>
                                    <td className="py-3 border-0 text-right font-black text-[#22C55E]">R$ {c.revenue.toLocaleString()}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className={`card ${cardClass} p-4`}>
                          <div className="flex justify-between items-center mb-3">
                            <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-0`}>Cupons Promocionais Gerados</h4>
                            <button onClick={()=>setShowAddCouponModal(true)} className="btn btn-outline-primary btn-xs border-[#3B82F6] text-[#3B82F6] px-2.5 py-1 text-[9px] rounded font-bold bg-transparent cursor-pointer">
                              Novo Cupom
                            </button>
                          </div>
                          <div className="row g-2">
                            {coupons.map(cp => (
                              <div key={cp.id} className="col-md-4">
                                <div className={`p-3 rounded border ${borderCol} flex justify-between items-center bg-slate-50 dark:bg-white/2`}>
                                  <div>
                                    <span className={`font-mono font-bold text-xs ${textTitle} block`}>{cp.code}</span>
                                    <span className="text-[9.5px] text-slate-400 block">{cp.event}</span>
                                    <span className="text-[9.5px] text-slate-400 block">{cp.usages} utilizações</span>
                                  </div>
                                  <span className="text-xs font-black text-[#22C55E]">{cp.discount}% OFF</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {marketingSubTab === 'ia_engine' && (() => {
                  const checkLock = renderModuleLock([6], "Inteligência Artificial");
                  if (checkLock) return checkLock;

                  return (
                    <div className="space-y-4 animate-fadeIn">
                      <div className={`card ${cardClass} p-4`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 border-bottom border-light/5 pb-3">
                          <div>
                            <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-1`}>IA Engine (Otimizador de Lançamentos)</h4>
                            <p className={`text-[10px] ${textSec} mb-0`}>Selecione um evento para carregar previsões operacionais de bilheteria e sentimentos.</p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <select 
                              value={selectedAiEvent} 
                              onChange={(e)=>setSelectedAiEvent(e.target.value)} 
                              className={`form-control form-select ${inputClass} text-xs p-2 rounded focus:outline-none`}
                            >
                              {events.map(ev=>(
                                  <option key={ev.id} value={ev.id}>{ev.name}</option>
                              ))}
                            </select>
                            <button 
                              onClick={handleSimulateAi}
                              className="btn btn-primary py-2 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded border-0 cursor-pointer flex items-center space-x-1.5"
                            >
                              <Brain className="w-3.5 h-3.5" />
                              <span>Simular Predição</span>
                            </button>
                          </div>
                        </div>

                        <div className="row g-3">
                          <div className="col-md-6 col-lg-4">
                            <div className="p-3.5 rounded bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 h-100 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] font-bold text-slate-400 block uppercase mb-2">Melhor Horário para Postar / Disparar</span>
                                <h5 className={`text-sm font-black ${textTitle} mb-2`}>{aiOutputs.bestTime}</h5>
                                <p className="text-[10px] text-slate-400 mb-0 leading-relaxed">Calculado com base na taxa histórica de leitura de mensagens e cliques no app por parte dos compradores deste evento.</p>
                              </div>
                              <span className="text-[8px] font-mono text-slate-500 mt-3 block">IA - Módulo 6 Ativo</span>
                            </div>
                          </div>

                          <div className="col-md-6 col-lg-4">
                            <div className="p-3.5 rounded bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 h-100 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] font-bold text-slate-400 block uppercase mb-2">Preço Inteligente Recomendado</span>
                                <h5 className="text-sm font-black text-[#22C55E] mb-2">{aiOutputs.smartPrice}</h5>
                                <p className="text-[10px] text-slate-400 mb-0 leading-relaxed">Avaliação de elasticidade de preço de ingressos. O aumento de 10% no preço não afetará a velocidade de vendas do lote atual.</p>
                              </div>
                              <span className="text-[8px] font-mono text-slate-500 mt-3 block">IA - Otimizador de Receita</span>
                            </div>
                          </div>

                          <div className="col-md-6 col-lg-4">
                            <div className="p-3.5 rounded bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 h-100 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] font-bold text-slate-400 block uppercase mb-2">Previsão de Lotação & Velocidade</span>
                                <h5 className="text-sm font-black text-[#3B82F6] mb-2">{aiOutputs.occupancy}</h5>
                                <p className="text-[10px] text-slate-400 mb-0 leading-relaxed">{aiOutputs.salesForecast}</p>
                              </div>
                              <span className="text-[8px] font-mono text-slate-500 mt-3 block">IA - Previsão de Lote</span>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="p-4 rounded bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5">
                              <span className="text-[9px] font-bold text-slate-400 block uppercase mb-2">Análise de Sentimento das Redes Sociais</span>
                              <div className="row items-center">
                                <div className="col-md-4">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-2xl font-black text-[#22C55E]">{aiOutputs.sentiment.pos}%</span>
                                    <div>
                                      <span className={`text-xs font-bold ${textTitle} block`}>Sentimento Positivo</span>
                                      <span className="text-[10px] text-slate-400">Interações e menções favoráveis</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-8 pt-2 md:pt-0">
                                  <div className="progress rounded bg-slate-200 dark:bg-white/12" style={{ height: '12px' }}>
                                    <div className="progress-bar bg-[#22C55E]" role="progressbar" style={{ width: `${aiOutputs.sentiment.pos}%` }}></div>
                                    <div className="progress-bar bg-slate-400" role="progressbar" style={{ width: `${aiOutputs.sentiment.neu}%` }}></div>
                                    <div className="progress-bar bg-[#EF4444]" role="progressbar" style={{ width: `${aiOutputs.sentiment.neg}%` }}></div>
                                  </div>
                                  <div className="flex space-x-3 mt-1.5 text-[9px] text-slate-400 font-mono">
                                    <span>● Positivo: {aiOutputs.sentiment.pos}%</span>
                                    <span>● Neutro: {aiOutputs.sentiment.neu}%</span>
                                    <span>● Negativo: {aiOutputs.sentiment.neg}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {marketingSubTab === 'influencers' && (() => {
                  const checkLock = renderModuleLock([7], "Influenciadores");
                  if (checkLock) return checkLock;

                  const handleHireInfluencer = (infId) => {
                    setInfluencers(prev => prev.map(inf => {
                      if (inf.id === infId) {
                        const newHired = !inf.hired;
                        return {
                          ...inf,
                          hired: newHired,
                          activeCampaign: newHired ? 'Festival de Inverno Curitiba' : 'Nenhum',
                          roi: newHired ? '150%' : '0%',
                          codeSales: newHired ? Math.floor(Math.random()*150) + 20 : 0
                        };
                      }
                      return inf;
                    }));
                    triggerToast("Influencers", "Status de contratação alterado.");
                  };

                  return (
                    <div className="space-y-4 animate-fadeIn">
                      <div className={`card ${cardClass} p-4`}>
                        <div className="flex justify-between items-center mb-3 border-bottom border-light/5 pb-3">
                          <div>
                            <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-1`}>Módulo 7 - Painel MaaS Influenciadores</h4>
                            <p className={`text-[10px] ${textSec} mb-0`}>Contrate e gerencie influenciadores locais com cupons exclusivos. O ROI de vendas é medido em tempo real.</p>
                          </div>
                        </div>

                        <div className="table-responsive">
                          <table className="table text-xs mb-0">
                            <thead>
                              <tr className={`border-bottom ${borderCol} text-slate-400 font-semibold text-[9.5px] uppercase text-left`}>
                                <th className="pb-2 border-0">Nome do Influenciador</th>
                                <th className="pb-2 border-0">Categoria</th>
                                <th className="pb-2 border-0 text-center">Seguidores</th>
                                <th className="pb-2 border-0 text-right">Custo de Campanha</th>
                                <th className="pb-2 border-0">Campanha Ativa</th>
                                <th className="pb-2 border-0 font-mono">Cupom Exclusivo</th>
                                <th className="pb-2 border-0 text-center">Vendas Geradas</th>
                                <th className="pb-2 border-0 text-center">ROI</th>
                                <th className="pb-2 border-0 text-center">Ações</th>
                              </tr>
                            </thead>
                            <tbody>
                              {influencers.map(inf => (
                                <tr key={inf.id} className={`border-bottom ${borderCol}/40`}>
                                  <td className="py-3 border-0">
                                    <div className="flex items-center space-x-2">
                                      <div className="w-7 h-7 rounded-circle bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center font-bold text-xs">
                                        {inf.name[0]}
                                      </div>
                                      <span className={`font-bold ${textTitle}`}>{inf.name}</span>
                                    </div>
                                  </td>
                                  <td className="py-3 border-0 text-slate-400">{inf.genre}</td>
                                  <td className="py-3 border-0 text-center font-bold font-mono">{inf.followers}</td>
                                  <td className="py-3 border-0 text-right font-mono">R$ {inf.cachet.toLocaleString()}</td>
                                  <td className="py-3 border-0">
                                    <span className={`badge ${inf.activeCampaign !== 'Nenhum' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'bg-slate-400/10 text-slate-400'} text-[9px] px-2 py-0.5 rounded-full`}>
                                      {inf.activeCampaign}
                                    </span>
                                  </td>
                                  <td className="py-3 border-0 font-mono font-bold text-[#F59E0B]">{inf.coupon}</td>
                                  <td className="py-3 border-0 text-center font-bold">{inf.codeSales}</td>
                                  <td className="py-3 border-0 text-center text-[#22C55E] font-black font-mono">{inf.roi}</td>
                                  <td className="py-3 border-0 text-center">
                                    {inf.hired ? (
                                      <button 
                                        onClick={()=>handleHireInfluencer(inf.id)}
                                        className="btn btn-outline-danger btn-xs border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white bg-transparent px-2.5 py-1 text-[9px] rounded font-bold cursor-pointer"
                                      >
                                        Desvincular
                                      </button>
                                    ) : (
                                      <button 
                                        onClick={()=>handleHireInfluencer(inf.id)}
                                        className="btn btn-primary btn-xs bg-[#2563EB] text-white px-2.5 py-1 text-[9px] rounded font-bold border-0 cursor-pointer"
                                      >
                                        Vincular
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
                  );
                })()}

                {marketingSubTab === 'fidelidade' && (() => {
                  const checkLock = renderModuleLock([8], "Fidelidade");
                  if (checkLock) return checkLock;

                  return (
                    <div className="row g-3 animate-fadeIn">
                      <div className="col-lg-4">
                        <div className={`card ${cardClass} p-4 space-y-4`}>
                          <div>
                            <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-1`}>Módulo 8 - Regras do Clube Fidelidade</h4>
                            <p className={`text-[10px] ${textSec} mb-0`}>Configure parâmetros de gamificação e cashback integrados ao checkout de ingressos.</p>
                          </div>

                          <div className="space-y-3 text-xs">
                            <div>
                              <label className={`text-[9px] font-bold ${textSec} uppercase block mb-1`}>Nome do Clube VIP</label>
                              <input 
                                type="text" 
                                value={loyaltyRules.vipClubName}
                                onChange={(e)=>setLoyaltyRules(prev=>({ ...prev, vipClubName: e.target.value }))}
                                className={`form-control ${inputClass} text-xs p-2.5 rounded w-full`} 
                              />
                            </div>

                            <div>
                              <label className={`text-[9px] font-bold ${textSec} uppercase block mb-1`}>Cashback nos Ingressos (%)</label>
                              <input 
                                type="number" 
                                value={loyaltyRules.cashbackPercentage}
                                onChange={(e)=>setLoyaltyRules(prev=>({ ...prev, cashbackPercentage: parseFloat(e.target.value) || 0 }))}
                                className={`form-control ${inputClass} text-xs p-2.5 rounded w-full`} 
                              />
                            </div>

                            <div>
                              <label className={`text-[9px] font-bold ${textSec} uppercase block mb-1`}>Pontos por Real Gasto (R$ 1)</label>
                              <input 
                                type="number" 
                                value={loyaltyRules.pointsPerReal}
                                onChange={(e)=>setLoyaltyRules(prev=>({ ...prev, pointsPerReal: parseInt(e.target.value) || 0 }))}
                                className={`form-control ${inputClass} text-xs p-2.5 rounded w-full`} 
                              />
                            </div>

                            <div>
                              <label className={`text-[9px] font-bold ${textSec} uppercase block mb-1`}>Mínimo de Pontos para Resgate</label>
                              <input 
                                type="number" 
                                value={loyaltyRules.minimumRedeemPoints}
                                onChange={(e)=>setLoyaltyRules(prev=>({ ...prev, minimumRedeemPoints: parseInt(e.target.value) || 0 }))}
                                className={`form-control ${inputClass} text-xs p-2.5 rounded w-full`} 
                              />
                            </div>

                            <button className="btn btn-primary w-full py-2 bg-[#22C55E] hover:bg-[#16a34a] text-white text-xs font-bold rounded border-0 cursor-pointer">
                              Salvar Configurações
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-8">
                        <div className={`card ${cardClass} p-4`}>
                          <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-3`}>Missões e Desafios para Clientes (Gamificação)</h4>
                          <div className="table-responsive">
                            <table className="table text-xs mb-0">
                              <thead>
                                <tr className={`border-bottom ${borderCol} text-slate-400 font-semibold text-[9.5px] uppercase text-left`}>
                                  <th className="pb-2 border-0">Desafio / Missão</th>
                                  <th className="pb-2 border-0">Regra de Conclusão</th>
                                  <th className="pb-2 border-0 text-center">Recompensa</th>
                                  <th className="pb-2 border-0 text-center">Status</th>
                                  <th className="pb-2 border-0 text-center">Ações</th>
                                </tr>
                              </thead>
                              <tbody>
                                {loyaltyRules.missions.map(m => (
                                  <tr key={m.id} className={`border-bottom ${borderCol}/40`}>
                                    <td className={`py-3 border-0 font-bold ${textTitle}`}>{m.title}</td>
                                    <td className="py-3 border-0 text-slate-400">{m.desc}</td>
                                    <td className="py-3 border-0 font-bold text-[#F59E0B]">{m.reward}</td>
                                    <td className="py-3 border-0 text-center">
                                      <span className={`badge ${m.status === 'Ativa' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-slate-400/10 text-slate-400'} text-[9px] px-2 py-0.5 rounded-full`}>
                                        {m.status}
                                      </span>
                                    </td>
                                    <td className="py-3 border-0 text-center">
                                      <button 
                                        onClick={() => {
                                          setLoyaltyRules(prev => ({
                                            ...prev,
                                            missions: prev.missions.map(mi => mi.id === m.id ? { ...mi, status: mi.status === 'Ativa' ? 'Inativa' : 'Ativa' } : mi)
                                          }));
                                          triggerToast("Missão Gamificada", "Status da missão alterado.");
                                        }}
                                        className="btn btn-outline-primary btn-xs border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white bg-transparent px-2 py-0.5 rounded text-[9px] cursor-pointer"
                                      >
                                        Alternar
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {marketingSubTab === 'analytics360' && (() => {
                  const checkLock = renderModuleLock([9, 21], "Analytics 360 & BI");
                  if (checkLock) return checkLock;

                  return (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="row g-3">
                        <div className="col-lg-6">
                          <div className={`card ${cardClass} p-4`}>
                            <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-3`}>Origem de Tráfego de Compradores (Módulo 21)</h4>
                            <div className="space-y-3 text-xs">
                              {[
                                { source: 'Meta Ads (Facebook/Instagram)', value: '42.500 cliques', share: '45%' },
                                { source: 'Acesso Direto (Site/App)', value: '28.100 cliques', share: '30%' },
                                { source: 'Google Search & Maps', value: '14.200 cliques', share: '15%' },
                                { source: 'Disparos WhatsApp / E-mail', value: '9.500 cliques', share: '10%' }
                              ].map((src, i) => (
                                <div key={i} className="space-y-1">
                                  <div className="flex justify-between text-[11px]">
                                    <span className={`font-bold ${textTitle}`}>{src.source}</span>
                                    <span className="font-mono text-slate-400">{src.value} ({src.share})</span>
                                  </div>
                                  <div className="progress rounded bg-slate-200 dark:bg-white/10" style={{ height: '8px' }}>
                                    <div className="progress-bar bg-[#3B82F6]" role="progressbar" style={{ width: src.share }}></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className={`card ${cardClass} p-4 flex flex-col justify-between`}>
                            <div>
                              <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-2`}>Fluxo de Vendas por Minuto (Real-time Analytics 360)</h4>
                              <p className={`text-[10px] ${textSec} mb-4`}>Monitoramento instantâneo do volume de transações por minuto nos servidores DiskHub.</p>
                            </div>
                            
                            <div className="flex items-end justify-between h-[120px] px-2 border-bottom border-light/10 pb-1">
                              {[35, 42, 28, 55, 62, 48, 74, 98, 88, 78, 65, 82, 91, 105, 94].map((h, i) => (
                                <div 
                                  key={i} 
                                  className="w-[5.5%] bg-[#22C55E] rounded-t hover:bg-[#16a34a] transition-all cursor-pointer relative group" 
                                  style={{ height: `${h}%` }}
                                >
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-mono p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mb-1">
                                    {h} tix/min
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-2">
                              <span>-15 min atrás</span>
                              <span>Tempo Real (Agora)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`card ${cardClass} p-4`}>
                        <h4 className={`text-xs font-bold ${textTitle} uppercase tracking-wider mb-1`}>Mapa de Calor de Concentração de Compradores (Geolocalização Módulo 19/21)</h4>
                        <p className={`text-[10px] ${textSec} mb-3`}>Visualização geográfica dos bairros e cidades com maior conversão de vendas para anúncios e tráfego local.</p>
                        
                        <div className="relative rounded border border-white/5 overflow-hidden bg-slate-900 flex items-center justify-center" style={{ height: '280px' }}>
                          <div className="absolute inset-0 opacity-15 flex flex-wrap gap-2 text-[6px] text-slate-500 font-mono select-none overflow-hidden">
                            {Array.from({ length: 50 }).map((_, i) => (
                              <div key={i} className="w-[18%] p-2 border border-slate-600 rounded">
                                Curitiba Map Sector - Loteamento #{i+100}
                              </div>
                            ))}
                          </div>
                          
                          <div className="absolute w-24 h-24 rounded-full bg-[#EF4444]/25 blur-xl animate-pulse" style={{ top: '25%', left: '35%' }}></div>
                          <div className="absolute w-36 h-36 rounded-full bg-[#EF4444]/20 blur-2xl animate-pulse" style={{ top: '40%', left: '55%' }}></div>
                          <div className="absolute w-16 h-16 rounded-full bg-[#EF4444]/30 blur-lg animate-pulse" style={{ top: '65%', left: '20%' }}></div>

                          <div className="absolute bg-slate-950/80 border border-[#EF4444]/50 rounded px-2 py-1 text-[9px] font-mono text-white flex items-center space-x-1.5" style={{ top: '30%', left: '38%' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-ping"></span>
                            <span>Pedreira Paulo Leminski (1.420 vendas)</span>
                          </div>
                          <div className="absolute bg-slate-950/80 border border-[#EF4444]/30 rounded px-2 py-1 text-[9px] font-mono text-white flex items-center space-x-1.5" style={{ top: '50%', left: '58%' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                            <span>Centro Cívico (980 vendas)</span>
                          </div>
                          <div className="absolute bg-slate-950/80 border border-[#3B82F6]/30 rounded px-2 py-1 text-[9px] font-mono text-white flex items-center space-x-1.5" style={{ top: '70%', left: '25%' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                            <span>Batel (510 vendas)</span>
                          </div>

                          <div className="z-10 text-center">
                            <span className="badge bg-slate-950 text-slate-400 font-mono text-[9px] p-2 border border-white/10 rounded">
                              ● SIMULAÇÃO DE MAPA DE CALOR COMPRADORES REAL-TIME ATIVO
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

              </div>
            );
          })()}

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

          {/* ================= 6. CENTRAL DE APLICATIVOS (APP STORE / MARKETPLACE) ================= */}
          {currentTab === 'appstore' && (() => {
            // Filter and sort apps catalog locally
            const filteredApps = appsCatalog.filter(app => {
              // Category filter
              if (mktCategory !== 'Todos') {
                if (mktCategory === '⭐ Recomendados') {
                  const recommendedIds = (plan === 'standard' || plan === 'essencial') ? ['crm', 'mkt', 'pdv'] : ['bar', 'ai', 'patrimonio'];
                  if (!recommendedIds.includes(app.id)) return false;
                } else if (mktCategory === '💰 Financeiro') {
                  if (app.category !== 'Finanças' && app.category !== 'Fiscal') return false;
                } else if (mktCategory === '📊 Gestão') {
                  if (app.category !== 'Logística' && app.category !== 'Patrimônio') return false;
                } else if (mktCategory === '📣 Marketing') {
                  if (app.category !== 'Marketing' && app.category !== 'Vendas') return false;
                } else if (mktCategory === '🧠 IA') {
                  if (app.category !== 'Inteligência') return false;
                } else if (mktCategory === '🏢 Operações') {
                  if (app.category !== 'Operações') return false;
                }
              }

              // Plan filter
              if (mktPlan !== 'Todos') {
                if (mktPlan === 'standard' && app.planRequired !== 'standard') return false;
                if (mktPlan === 'advanced' && app.planRequired !== 'advanced') return false;
                if (mktPlan === 'expert' && app.planRequired !== 'expert') return false;
              }

              // Search filter
              if (mktSearch.trim() !== '') {
                const term = mktSearch.toLowerCase();
                if (!app.name.toLowerCase().includes(term) && !app.desc.toLowerCase().includes(term)) return false;
              }

              return true;
            });

            // Sort logic
            if (mktSort === 'Popular') {
              filteredApps.sort((a, b) => b.downloads - a.downloads);
            } else if (mktSort === 'Avaliacao') {
              filteredApps.sort((a, b) => b.rating - a.rating);
            }

            return (
              <div className="space-y-4 animate-fadeIn">
                
                {/* 1. HERO BANNER */}
                <div className={`p-4 md:p-5 rounded-2xl ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-blue-900/40 via-slate-900/60 to-indigo-900/40 border border-white/5' 
                    : 'bg-gradient-to-r from-blue-500/10 via-[#6366F1]/5 to-indigo-500/10 border border-slate-200'
                } relative overflow-hidden shadow-sm`}>
                  <div className="relative z-10 max-w-xl space-y-2">
                    <span className="badge badge-primary bg-[#3B82F6]/10 text-[#3B82F6] text-[9px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">Marketplace oficial</span>
                    <h2 className={`text-xl md:text-2xl font-black tracking-tight ${textTitle} mb-1`}>Conheça o Disk Hub Marketplace</h2>
                    <p className={`text-xs ${textSec} leading-relaxed mb-3`}>
                      Mais de 40 módulos integrados para gerenciar bilheterias, vendas físicas de bar, logística de entregas e auditorias fiscais avançadas.
                    </p>
                    <button 
                      onClick={() => selectTab('marketplace')}
                      className="btn btn-primary bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold px-4 py-2 rounded-lg border-0 cursor-pointer shadow-sm transition-all"
                    >
                      Conhecer Planos & Upgrades
                    </button>
                  </div>
                  {/* Subtle decorative background graphic */}
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-6 translate-x-6 hidden md:block">
                    <Sparkles className="w-64 h-64 text-[#3B82F6]" />
                  </div>
                </div>

                {/* 2. CATEGORY SELECTOR */}
                <div className="flex items-center overflow-x-auto pb-2 gap-1.5 scrollbar-thin text-xs">
                  {['Todos', '⭐ Recomendados', '💰 Financeiro', '📊 Gestão', '📣 Marketing', '🧠 IA', '🏢 Operações'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setMktCategory(cat)}
                      className={`px-3 py-1.5 rounded-full font-medium transition-all border-0 shrink-0 ${
                        mktCategory === cat 
                          ? 'bg-[#3B82F6] text-white shadow-sm' 
                          : `${theme === 'dark' ? 'bg-[#111827] text-slate-400 hover:text-white' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`
                      } cursor-pointer`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* 3. SEARCH & FILTERS BAR */}
                <div className={`p-3 card ${cardClass} flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs`}>
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className={`h-3.5 w-3.5 ${textSec}`} />
                    </span>
                    <input 
                      type="text" 
                      placeholder="Pesquisar módulo comercial..." 
                      value={mktSearch}
                      onChange={(e) => setMktSearch(e.target.value)}
                      className={`form-control form-control-sm pl-9 pr-4 py-1.5 w-full ${
                        theme === 'dark' ? 'bg-[#111827] text-white border-white/5' : 'bg-white text-slate-900 border-slate-300'
                      } rounded-lg`}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center space-x-1.5">
                      <span className={textSec}>Plano:</span>
                      <select 
                        value={mktPlan} 
                        onChange={(e) => setMktPlan(e.target.value)}
                        className={`form-control form-control-sm border py-1 px-2.5 rounded-lg ${
                          theme === 'dark' ? 'bg-[#111827] text-white border-white/5' : 'bg-white border-slate-300 text-slate-800'
                        }`}
                      >
                        <option value="Todos">Todos os Planos</option>
                        <option value="standard">Standard</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <span className={textSec}>Ordenar:</span>
                      <select 
                        value={mktSort} 
                        onChange={(e) => setMktSort(e.target.value)}
                        className={`form-control form-control-sm border py-1 px-2.5 rounded-lg ${
                          theme === 'dark' ? 'bg-[#111827] text-white border-white/5' : 'bg-white border-slate-300 text-slate-800'
                        }`}
                      >
                        <option value="Popular">Mais Populares</option>
                        <option value="Avaliacao">Melhor Avaliados</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. CARDS GRID */}
                <div className="row">
                  {filteredApps.length === 0 ? (
                    <div className="col-12 py-8 text-center text-slate-500">
                      <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="mb-0 text-xs">Nenhum módulo encontrado correspondente aos filtros.</p>
                    </div>
                  ) : (
                    filteredApps.map(app => {
                      const IconComponent = app.icon;
                      const eligible = isPlanEligible(app.planRequired);
                      const installed = installedApps[app.id] === true;
                      const installing = installedApps[app.id] === 'installing';

                      return (
                        <div key={app.id} className="col-md-6 col-lg-4 mb-3">
                          <div className={`card ${cardClass} p-4 h-100 flex flex-col justify-between hover:border-[#3B82F6] transition-all duration-200 group relative`}>
                            
                            <div>
                              {/* Header Card: Icon & Compatibility badges */}
                              <div className="flex items-start justify-between mb-3">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                                  eligible ? 'bg-blue-500/10 text-[#3B82F6]' : `${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-100'} ${textSec}`
                                }`}>
                                  <IconComponent className="w-5 h-5" />
                                </div>
                                
                                <div className="text-right">
                                  <span className={`text-[8px] uppercase tracking-wider font-bold block ${textSec} mb-1`}>{app.category}</span>
                                  {installed ? (
                                    <span className="badge badge-success bg-[#22C55E]/12 text-[#22C55E] text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Ativo ✔</span>
                                  ) : eligible ? (
                                    <span className="badge badge-primary bg-blue-500/10 text-[#3B82F6] text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Compatível</span>
                                  ) : (
                                    <span className="badge badge-warning bg-[#F59E0B]/12 text-[#FB923C] text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center space-x-1">
                                      <Lock className="w-2.5 h-2.5" />
                                      <span>Upgrade</span>
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Title, rating and description */}
                              <div className="space-y-1">
                                <h3 className={`text-sm font-bold ${textTitle} mb-0`}>{app.name}</h3>
                                <div className="flex items-center space-x-2">
                                  <span className="text-[#F59E0B] font-semibold text-[10px]">★ {app.rating}</span>
                                  <span className={`text-[9px] ${textSec}`}>({app.downloads}+ empresas)</span>
                                </div>
                                <p className={`text-xs ${textSec} mt-2 mb-3 leading-relaxed min-h-[40px]`}>{app.desc}</p>
                              </div>

                              {/* Features Checklist */}
                              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-[#111827]/40' : 'bg-slate-50'} border ${borderCol} mb-3`}>
                                <span className={`text-[9px] ${textSec} font-bold uppercase tracking-wider block mb-2`}>O que inclui:</span>
                                <ul className="space-y-1.5 pl-0 mb-0 list-unstyled text-[10px]">
                                  {app.features.slice(0, 3).map((feat, idx) => (
                                    <li key={idx} className="flex items-center space-x-1.5 text-slate-400">
                                      <CheckCircle className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                                      <span className={textBody}>{feat}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Button actions footer */}
                            <div className="flex items-center space-x-2 mt-2">
                              <button 
                                onClick={() => setSelectedApp(app)}
                                className={`btn ${theme === 'dark' ? 'bg-[#1E293B] hover:bg-[#273449]' : 'bg-slate-100 hover:bg-slate-200'} text-[#64748B] hover:text-slate-800 text-xs font-semibold px-3 py-2 rounded flex-1 border-0 cursor-pointer`}
                              >
                                Ver Detalhes
                              </button>

                              {installed ? (
                                <button 
                                  disabled 
                                  className={`btn py-2 px-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-100'} text-[#64748B] text-xs font-semibold rounded cursor-not-allowed border-0`}
                                  title="Módulo Instalado"
                                >
                                  Ativo
                                </button>
                              ) : installing ? (
                                <button 
                                  disabled 
                                  className={`btn py-2 px-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-100'} text-slate-400 text-xs font-semibold rounded border-0`}
                                >
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                </button>
                              ) : eligible ? (
                                <button 
                                  onClick={() => handleInstallApp(app.id, app.name)}
                                  className="btn btn-primary py-2 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded border-0 cursor-pointer"
                                >
                                  Instalar
                                </button>
                              ) : (
                                <button 
                                  onClick={() => {
                                    setCurrentTab('marketplace');
                                    triggerToast("Upgrade Necessário", `O plano atual não dá suporte ao módulo ${app.name}.`, "warning");
                                  }}
                                  className={`btn py-2 px-3 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white text-xs font-semibold rounded border-0 cursor-pointer`}
                                >
                                  Upgrade
                                </button>
                              )}
                            </div>

                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* 5. HTML APP DETAILS DIALOG MODAL */}
                {selectedApp && (
                  <div className="modal-backdrop fade show" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div className={`card ${cardClass} w-100 max-w-2xl overflow-hidden shadow-2xl animate-scaleUp`} style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                      
                      {/* Modal Header */}
                      <div className={`p-4 border-bottom ${borderCol} flex items-start justify-between bg-gradient-to-r from-blue-500/5 to-indigo-500/5`}>
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center text-[#3B82F6]">
                            {(() => {
                              const ModalIcon = selectedApp.icon;
                              return <ModalIcon className="w-7 h-7" />;
                            })()}
                          </div>
                          <div>
                            <span className={`text-[10px] uppercase font-bold tracking-wider ${textSec}`}>{selectedApp.category}</span>
                            <h3 className={`text-lg font-bold ${textTitle} mb-0`}>{selectedApp.name}</h3>
                            <div className="flex items-center space-x-2 mt-1 text-xs">
                              <span className="text-[#F59E0B] font-semibold">★ {selectedApp.rating}</span>
                              <span className={textSec}>({selectedApp.downloads}+ instalados)</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedApp(null)}
                          className={`text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer p-1`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Modal Tabs Selector */}
                      <div className={`flex border-bottom ${borderCol} px-4 bg-light/5 text-xs`}>
                        <button 
                          onClick={() => setAppDetailTab('overview')}
                          className={`px-3 py-3 border-bottom-2 ${appDetailTab === 'overview' ? 'border-[#3B82F6] font-bold text-[#3B82F6]' : 'border-transparent text-slate-500'} bg-transparent cursor-pointer mr-2`}
                        >
                          Visão Geral
                        </button>
                        <button 
                          onClick={() => setAppDetailTab('features')}
                          className={`px-3 py-3 border-bottom-2 ${appDetailTab === 'features' ? 'border-[#3B82F6] font-bold text-[#3B82F6]' : 'border-transparent text-slate-500'} bg-transparent cursor-pointer mr-2`}
                        >
                          Recursos & Avaliações
                        </button>
                        <button 
                          onClick={() => setAppDetailTab('plans')}
                          className={`px-3 py-3 border-bottom-2 ${appDetailTab === 'plans' ? 'border-[#3B82F6] font-bold text-[#3B82F6]' : 'border-transparent text-slate-500'} bg-transparent cursor-pointer`}
                        >
                          Planos & Preços
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div className="p-4 overflow-y-auto flex-1 text-xs space-y-4" style={{ maxHeight: '50vh' }}>
                        
                        {appDetailTab === 'overview' && (
                          <div className="space-y-4 animate-fadeIn">
                            <div>
                              <h4 className={`text-xs font-bold uppercase tracking-wider ${textTitle} mb-2`}>Sobre o Aplicativo</h4>
                              <p className={`${textSec} leading-relaxed`}>{selectedApp.detailedDesc}</p>
                            </div>

                            {/* Screenshots mockup box */}
                            <div className={`border ${borderCol} rounded-xl overflow-hidden bg-slate-900/10 p-2 text-center`}>
                              <div className={`rounded-lg border border-slate-200/50 ${theme === 'dark' ? 'bg-slate-950 text-slate-400' : 'bg-slate-100 text-slate-600'} p-4 flex flex-col items-center justify-center min-h-[140px]`}>
                                {(() => {
                                  const ScreenIcon = selectedApp.icon;
                                  return <ScreenIcon className="w-10 h-10 mb-2 text-[#3B82F6]/50" />;
                                })()}
                                <span className={`font-semibold text-xs ${textTitle}`}>Interface do Módulo Comercial</span>
                                <span className={`text-[10px] ${textSec} mt-1`}>Painéis integrados, relatórios interativos e gráficos analíticos.</span>
                              </div>
                            </div>

                            <div>
                              <h4 className={`text-xs font-bold uppercase tracking-wider ${textTitle} mb-2`}>Principais Benefícios</h4>
                              <ul className="space-y-2 pl-0 list-unstyled mb-0">
                                {selectedApp.benefits.map((b, idx) => (
                                  <li key={idx} className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                                    <span className={textBody}>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {appDetailTab === 'features' && (
                          <div className="space-y-4 animate-fadeIn">
                            <div>
                              <h4 className={`text-xs font-bold uppercase tracking-wider ${textTitle} mb-2`}>Recursos Incluídos</h4>
                              <div className="row">
                                {selectedApp.features.map((feature, idx) => (
                                  <div key={idx} className="col-md-6 mb-2">
                                    <div className={`p-2.5 rounded border ${borderCol} flex items-center space-x-2`}>
                                      <CheckCircle className="w-4 h-4 text-[#3B82F6]" />
                                      <span className={`font-semibold ${textTitle}`}>{feature}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <h4 className={`text-xs font-bold uppercase tracking-wider ${textTitle} mb-2`}>Avaliações do Ecossistema</h4>
                              <div className={`p-3 rounded-lg border ${borderCol} ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'}`}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`font-bold ${textTitle}`}>Vinicius C. (DiskIngressos)</span>
                                  <span className="text-[#F59E0B]">★★★★★ 5.0</span>
                                </div>
                                <p className={`${textSec} mb-0 leading-relaxed`}>
                                  "Módulo muito completo e totalmente integrado. Reduziu nosso tempo de auditoria manual e melhorou as margens das nossas vendas locais."
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {appDetailTab === 'plans' && (
                          <div className="space-y-4 animate-fadeIn">
                            <div className={`p-4 rounded-lg border ${borderCol} flex items-center justify-between`}>
                              <div>
                                <h4 className={`text-sm font-bold ${textTitle} mb-1`}>Plano Necessário: {selectedApp.planRequired === 'standard' ? 'Essencial' : selectedApp.planRequired === 'advanced' ? 'Profissional' : 'Premium'}</h4>
                                <p className={`${textSec} mb-0`}>
                                  {isPlanEligible(selectedApp.planRequired) 
                                    ? "Seu plano atual é compatível com este aplicativo!" 
                                    : `Seu plano atual não dá suporte a este módulo. Faça upgrade para o plano ${selectedApp.planRequired === 'standard' ? 'Essencial' : selectedApp.planRequired === 'advanced' ? 'Profissional' : 'Premium'}.`}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="badge badge-success bg-[#22C55E]/12 text-[#22C55E] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                                  {selectedApp.planRequired === 'standard' ? 'Gratuito' : selectedApp.planRequired === 'advanced' ? 'Profissional' : 'Premium'}
                                </span>
                              </div>
                            </div>

                            <div className={`p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 text-center`}>
                              <Sparkles className="w-5 h-5 text-[#3B82F6] mx-auto mb-2" />
                              <h4 className={`text-xs font-bold uppercase tracking-wider ${textTitle}`}>Assinatura Anual & Economia</h4>
                              <p className={`${textSec} mb-0 mt-1`}>Assine o plano {selectedApp.planRequired === 'standard' ? 'Essencial' : selectedApp.planRequired === 'advanced' ? 'Profissional' : 'Premium'} no ciclo anual e economize até 25% na mensalidade geral.</p>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Modal Footer */}
                      <div className={`p-4 border-top ${borderCol} flex items-center justify-end space-x-2 bg-light/5`}>
                        <button 
                          onClick={() => setSelectedApp(null)}
                          className={`btn ${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'} text-slate-800 text-xs font-semibold rounded px-4 py-2 border-0 cursor-pointer`}
                        >
                          Fechar
                        </button>

                        {installedApps[selectedApp.id] === true ? (
                          <button 
                            disabled 
                            className="btn btn-secondary text-slate-400 text-xs font-semibold rounded px-4 py-2 border-0 cursor-not-allowed"
                          >
                            Modulo Ja Instalado
                          </button>
                        ) : installedApps[selectedApp.id] === 'installing' ? (
                          <button 
                            disabled 
                            className="btn btn-secondary text-slate-400 text-xs font-semibold rounded px-4 py-2 border-0 cursor-not-allowed"
                          >
                            <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                            Instalando...
                          </button>
                        ) : isPlanEligible(selectedApp.planRequired) ? (
                          <button 
                            onClick={() => {
                              handleInstallApp(selectedApp.id, selectedApp.name);
                              setSelectedApp(null);
                            }}
                            className="btn btn-primary bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded px-4 py-2 border-0 cursor-pointer"
                          >
                            Instalar Modulo
                          </button>
                        ) : (
                          <button 
                            onClick={() => {
                              setSelectedApp(null);
                              setCurrentTab('marketplace');
                              triggerToast("Upgrade de Plano", `Redirecionando para a pagina de Planos para adquirir ${selectedApp.name}.`);
                            }}
                            className="btn btn-primary bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white text-xs font-semibold rounded px-4 py-2 border-0 cursor-pointer"
                          >
                            Fazer Upgrade do Plano
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                )}

              </div>
            );
          })()}

          {/* ================= 7. MARKETPLACE VIEW ================= */}
          {currentTab === 'marketplace' && (
            <PlansPage 
              plan={plan}
              setPlan={setPlan}
              theme={theme}
              triggerToast={triggerToast}
            />
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
                <button 
                  type="button" 
                  onClick={simulateVoiceInput} 
                  className={`btn p-1 ${isListening ? 'bg-[#EF4444] text-white animate-pulse' : 'bg-slate-100 dark:bg-white/5 text-[#2563EB]'} rounded active:scale-95 transition-all border-0 cursor-pointer`}
                  title="Simular comando de voz"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button type="submit" className="btn btn-primary p-1 bg-[#2563EB] hover:bg-[#1D4ED8] rounded text-white active:scale-95 transition-all border-0 cursor-pointer">
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

      {/* 6. SPOTLIGHT MAC-OS STYLE SEARCH OVERLAY */}
      {spotlightOpen && (
        <div 
          className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setSpotlightOpen(false)}
        >
          <div 
            className="w-full max-w-lg bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] rounded-xl shadow-2xl overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Area */}
            <div className="relative border-b border-slate-200 dark:border-[#1F2937] p-3 flex items-center">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
              <input 
                type="text" 
                placeholder="Pesquisar no ecossistema (Ex: eventos, crm, metal...)" 
                autoFocus
                value={spotlightQuery}
                onChange={(e) => setSpotlightQuery(e.target.value)}
                className="w-full bg-transparent border-0 text-xs text-slate-900 dark:text-white focus:outline-none p-1"
              />
              <button 
                onClick={() => setSpotlightOpen(false)}
                className="text-[10px] text-slate-400 border border-slate-200 dark:border-[#1F2937] rounded px-1.5 py-0.5 bg-slate-50 dark:bg-white/5 cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-72 overflow-y-auto p-2 space-y-1.5">
              
              {/* Category: Telas / Módulos */}
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 py-1 block">Módulos & Telas</span>
                {[
                  { id: 'dashboard', label: '🏠 Dashboard Geral', desc: 'Visão agregada de performance, receitas e portaria' },
                  { id: 'financeiro', label: '💰 Financeiro (ERP)', desc: 'Controle de contas, conciliações e fluxo de caixa' },
                  { id: 'contabilidade', label: '🧾 Contabilidade & Borderôs', desc: 'Emissão de NFes e auditoria de fechamento' },
                  { id: 'eventos', label: '🎫 Gestão de Eventos', desc: 'Cadastro, setores, lotes e controle de ingressos' },
                  { id: 'crm', label: '👥 CRM de Vendas', desc: 'Funil Kanban, captação de leads e contratos' },
                  { id: 'marketing', label: '📈 Marketing & Campanhas (MaaS)', desc: 'Ativação granular de módulos, cupons e disparos' },
                  { id: 'pdv', label: '🛒 Gestão de PDVs', desc: 'Controle de caixas físicos e operadores' },
                  { id: 'bar', label: '🍹 Bar & Estoque', desc: 'Comandas de consumo e controle de insumos' },
                  { id: 'ai', label: '🤖 Disk AI Analytics', desc: 'Copiloto de IA e insights de negócio' }
                ].filter(tab => tab.label.toLowerCase().includes(spotlightQuery.toLowerCase()) || tab.desc.toLowerCase().includes(spotlightQuery.toLowerCase()))
                .map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => {
                      setCurrentTab(tab.id);
                      setSpotlightOpen(false);
                      setSpotlightQuery('');
                      triggerToast("Spotlight", `Navegando para o módulo: ${tab.id.toUpperCase()}`);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B]/60 transition-all border-0 bg-transparent flex justify-between items-center cursor-pointer text-xs"
                  >
                    <div>
                      <span className={`font-semibold ${textTitle} block`}>{tab.label}</span>
                      <span className="text-[10px] text-slate-400 block">{tab.desc}</span>
                    </div>
                    <span className="text-[10px] text-[#3B82F6] font-mono font-bold">Ir ➔</span>
                  </button>
                ))}
              </div>

              {/* Category: Ações Rápidas */}
              <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 py-1 block">⚡ Acoes Rapidas</span>
                {[
                  { 
                    label: '🚀 Criar Novo Evento (Wizard)', 
                    desc: 'Iniciar o assistente passo a passo de cadastro de eventos', 
                    action: () => {
                      setCurrentTab('eventos');
                      setShowEventsForm(true);
                      setEventWizardStep(1);
                    }
                  },
                  { 
                    label: '👤 Novo Lead Comercial', 
                    desc: 'Cadastrar prospeccao no funil Kanban do CRM', 
                    action: () => {
                      setCurrentTab('crm');
                      setShowAddForm(true);
                    }
                  },
                  { 
                    label: '🌗 Alternar Tema Visual', 
                    desc: 'Alternar entre Modo Claro e Escuro (DHDS)', 
                    action: () => {
                      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
                    }
                  },
                  { 
                    label: '📥 Baixar Fechamento Contabil (.csv)', 
                    desc: 'Baixar planilha simulada de conciliacao e bordero', 
                    action: () => {
                      downloadSimulatedCSV();
                    }
                  }
                ].filter(act => act.label.toLowerCase().includes(spotlightQuery.toLowerCase()) || act.desc.toLowerCase().includes(spotlightQuery.toLowerCase()))
                .map((act, index) => (
                  <button 
                    key={index}
                    onClick={() => {
                      act.action();
                      setSpotlightOpen(false);
                      setSpotlightQuery('');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B]/60 transition-all border-0 bg-transparent flex justify-between items-center cursor-pointer text-xs"
                  >
                    <div>
                      <span className={`font-semibold ${textTitle} block`}>{act.label}</span>
                      <span className="text-[10px] text-slate-400 block">{act.desc}</span>
                    </div>
                    <span className="text-[10px] text-[#10B981] font-mono font-bold">Executar ⚡</span>
                  </button>
                ))}
              </div>

              {/* Category: Eventos */}
              {events.filter(ev => ev.name.toLowerCase().includes(spotlightQuery.toLowerCase()) || ev.city.toLowerCase().includes(spotlightQuery.toLowerCase())).length > 0 && (
                <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 py-1 block">Eventos Ativos</span>
                  {events.filter(ev => ev.name.toLowerCase().includes(spotlightQuery.toLowerCase()) || ev.city.toLowerCase().includes(spotlightQuery.toLowerCase()))
                  .map(ev => (
                    <button 
                      key={ev.id}
                      onClick={() => {
                        setCurrentTab('eventos');
                        setEventsSubTab('eventos');
                        setSpotlightOpen(false);
                        setSpotlightQuery('');
                        triggerToast("Spotlight", `Foco no evento: ${ev.name}`);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B]/60 transition-all border-0 bg-transparent flex justify-between items-center cursor-pointer text-xs"
                    >
                      <div>
                        <span className={`font-semibold ${textTitle} block`}>🎫 {ev.name}</span>
                        <span className="text-[10px] text-slate-400 block">{ev.venue} — {ev.city}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">{ev.status}</span>
                    </button>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
      {/* 7. FLOATING SIMULATOR CONTROL BAR (DHDS DEVELOPER TOOLBAR) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/90 dark:bg-[#111827]/90 backdrop-blur border border-slate-200 dark:border-[#1F2937] px-3.5 py-2 rounded-full shadow-xl flex items-center space-x-2.5 text-[10.5px]">
        <span className="font-mono text-slate-400 font-bold tracking-wider uppercase text-[9px] border-r border-slate-200 dark:border-white/5 pr-2 mr-0.5 select-none">⚙️ SIMULADOR</span>
        
        <button 
          onClick={() => {
            setFinancialStats(prev => ({
              ...prev,
              receita: prev.receita + 850,
              saldo: prev.saldo + 850
            }));
            triggerToast("⚡ Venda Simulacao", "Nova compra de ingresso de R$ 850 confirmada!");
          }}
          className="btn btn-xs bg-[#2563EB]/10 hover:bg-[#2563EB] text-[#2563EB] hover:text-white border-0 px-3 py-1.5 rounded-full font-bold cursor-pointer transition-all flex items-center space-x-1"
        >
          <span>⚡ Venda</span>
        </button>

        <button 
          onClick={() => {
            setFinancialStats(prev => {
              const nextPresente = Math.min(prev.presente + 12, prev.esperado);
              return {
                ...prev,
                presente: nextPresente
              };
            });
            triggerToast("🎫 Acesso Simulacao", "Portaria: +12 check-ins validados com sucesso.");
          }}
          className="btn btn-xs bg-[#10B981]/10 hover:bg-[#10B981] text-[#10B981] hover:text-white border-0 px-3 py-1.5 rounded-full font-bold cursor-pointer transition-all flex items-center space-x-1"
        >
          <span>🎫 Acesso</span>
        </button>

        <button 
          onClick={() => {
            const warnings = [
              "Fila de espera no Portao Norte ultrapassou 15 min.",
              "POS Termo-04 offline na Bilheteria Principal.",
              "Conciliacao automatica: Divergencia de R$ 0.12 no PIX.",
              "Queda de conectividade detectada no link redundante de internet."
            ];
            const randomMsg = warnings[Math.floor(Math.random() * warnings.length)];
            setContabilAuditorias(prev => [
              { id: `aud-${Date.now()}`, type: 'Alerta', msg: randomMsg, date: new Date().toLocaleTimeString() },
              ...prev.slice(0, 3)
            ]);
            triggerToast("⚠️ Novo Alerta", randomMsg);
          }}
          className="btn btn-xs bg-[#F59E0B]/10 hover:bg-[#F59E0B] text-[#F59E0B] hover:text-white border-0 px-3 py-1.5 rounded-full font-bold cursor-pointer transition-all flex items-center space-x-1"
        >
          <span>⚠️ Alerta</span>
        </button>

        <button 
          onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
          className="btn btn-xs bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-300 border-0 px-2.5 py-1.5 rounded-full font-bold cursor-pointer transition-all"
          title="Alternar Tema"
        >
          🌗
        </button>
      </div>

    </div>
  );
}
