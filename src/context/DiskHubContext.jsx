import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const DiskHubContext = createContext();

export const usersDatabase = [
  {
    name: 'Vinicius Casagrande',
    email: 'vinicius@diskhub.com.br',
    password: 'admin',
    plan: 'omnichannel',
    role: 'CEO & Fundador',
    avatarColor: '#F97316'
  },
  {
    name: 'Mariana Costa',
    email: 'mariana@diskhub.com.br',
    password: 'user123',
    plan: 'premium',
    role: 'Diretora de Marketing',
    avatarColor: '#8B5CF6'
  },
  {
    name: 'Roberto Carlos',
    email: 'roberto@diskhub.com.br',
    password: 'user123',
    plan: 'profissional',
    role: 'Coordenador Financeiro',
    avatarColor: '#10B981'
  },
  {
    name: 'Gisele Lima',
    email: 'gisele@diskhub.com.br',
    password: 'user123',
    plan: 'essencial',
    role: 'Analista de Operações',
    avatarColor: '#3B82F6'
  }
];

export function DiskHubProvider({ children }) {
  // Navigation & General configuration
  const [currentUser, setCurrentUser] = useState(usersDatabase[0]);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [financeSubTab, setFinanceSubTab] = useState('dashboard');
  const [accountingSubTab, setAccountingSubTab] = useState('dashboard');
  const [marketingSubTab, setMarketingSubTab] = useState('dashboard');
  const [crmSubTab, setCrmSubTab] = useState('dashboard');
  const [selectedAiEvent, setSelectedAiEvent] = useState('ev-1');
  const [aiOutputs, setAiOutputs] = useState({
    bestTime: "Terça-feira às 19:30",
    salesForecast: "O Lote Pista VIP deve se esgotar nas próximas 36 horas. Recomendado adiantar abertura de Lote 2.",
    smartPrice: "R$ 165,00 (Preço ótimo estimado com base na taxa de cliques de 14.5%)",
    occupancy: "94% de ocupação estimada (Margem de erro +-3%)",
    sentiment: { pos: 88, neu: 9, neg: 3 }
  });

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

  const [plan, setPlan] = useState('omnichannel');
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

  // CRM, Events, PDV & general DB states
  const [users, setUsers] = useState(usersDatabase);
  const [invoices, setInvoices] = useState([
    { id: 'nf-9821', client: 'Prime Show Eventos', doc: '12.345.678/0001-90', event: 'Metal Fest 2026', amount: 85000, type: 'Venda Ingresso', status: 'Emitida', date: '10/07/2026' },
    { id: 'nf-9822', client: 'Juliana Vieira', doc: '998.888.777-66', event: 'Embafeste Premium', amount: 510000, type: 'Patrocínio', status: 'Emitida', date: '01/07/2026' },
    { id: 'nf-8923', client: 'Arena Music Curitiba', doc: '33.222.111/0001-44', event: 'Arena Music', amount: 12500, type: 'Taxa Serviço', status: 'Pendente', date: '13/07/2026' }
  ]);
  const [borderos, setBorderos] = useState([
    { id: 'bor-1', name: 'Festival de Inverno Curitiba', location: 'Teatro Positivo', date: '05/07/2026', ticketSales: 242000, barRevenue: 48000, sponsors: 150000, expenses: 85000, grossRevenue: 440000, netProfit: 355000 },
    { id: 'bor-2', name: 'Metal Fest 2026', location: 'Pedreira Paulo Leminski', date: '12/07/2026', ticketSales: 1850000, barRevenue: 342000, sponsors: 450000, expenses: 510000, grossRevenue: 2642000, netProfit: 2132000 }
  ]);
  const [leads, setLeads] = useState([
    { id: 'lead-1', name: 'Roberto Alencar', company: 'Prime Show Eventos', value: 120000, stage: 'prospect', date: '10 Jul', tag: 'VIP' },
    { id: 'lead-2', name: 'Ana Beatriz Souza', company: 'Festival Sertanejo', value: 85000, stage: 'prospect', date: '12 Jul', tag: 'Quente' },
    { id: 'lead-3', name: 'Carlos Henrique', company: 'Sunset Lounge Bar', value: 45000, stage: 'qualified', date: '08 Jul', tag: 'Novo' },
    { id: 'lead-4', name: 'Mariana Costa', company: 'Arena Music Curitiba', value: 150000, stage: 'qualified', date: '14 Jul', tag: 'Corporate' },
    { id: 'lead-5', name: 'Felipe Dias', company: 'Expo Agro 2026', value: 210000, stage: 'negotiation', date: '05 Jul', tag: 'Alta Margem' },
    { id: 'lead-6', name: 'Juliana Vieira', company: 'Embafeste Premium', value: 510000, stage: 'won', date: '01 Jul', tag: 'Fechado' }
  ]);
  const [clients, setClients] = useState([
    { id: 'c-1', name: 'Juliana Vieira', company: 'Embafeste Premium', email: 'juliana@embafeste.com', phone: '(41) 99888-7766', spend: 510000, status: 'Ativo' },
    { id: 'c-2', name: 'Roberto Alencar', company: 'Prime Show Eventos', email: 'roberto@primeshow.com.br', phone: '(41) 98765-4321', spend: 120000, status: 'Em Negociação' },
    { id: 'c-3', name: 'Mariana Costa', company: 'Arena Music Curitiba', email: 'mariana@arenamusic.com', phone: '(41) 99111-2222', spend: 150000, status: 'Ativo' }
  ]);
  const [companies, setCompanies] = useState([
    { id: 'emp-1', name: 'Prime Show Eventos LTDA', cnpj: '12.345.678/0001-90', industry: 'Entretenimento', employees: 45, city: 'Curitiba', phone: '(41) 3322-1100' },
    { id: 'emp-2', name: 'Sunset Lounge Bar', cnpj: '98.765.432/0001-10', industry: 'Alimentação', employees: 12, city: 'Balneário Camboriú', phone: '(47) 3211-9988' },
    { id: 'emp-3', name: 'Arena Music Curitiba', cnpj: '55.444.333/0001-22', industry: 'Eventos / Shows', employees: 28, city: 'Curitiba', phone: '(41) 3044-5566' }
  ]);
  const [appointments, setAppointments] = useState([
    { id: 'apt-1', title: 'Reunião de Proposta - Prime Show', date: '2026-07-18', time: '14:00', host: 'Roberto Carlos', client: 'Roberto Alencar', type: 'Reunião Presencial', status: 'Confirmado' },
    { id: 'apt-2', title: 'Visita Técnica - Arena Music Curitiba', date: '2026-07-20', time: '10:30', host: 'Maria Silva', client: 'Mariana Costa', type: 'Visita Local', status: 'Pendente' },
    { id: 'apt-3', title: 'Call de Alinhamento - Sunset Lounge', date: '2026-07-19', time: '16:00', host: 'Fernanda Lima', client: 'Ana Beatriz Souza', type: 'Videoconferência', status: 'Confirmado' }
  ]);
  const [proposals, setProposals] = useState([
    { id: 'prop-1', title: 'Patrocínio Master Metal Fest 2026', value: 85000, client: 'Prime Show Eventos', validUntil: '2026-08-15', status: 'Aceita', date: '2026-07-10' },
    { id: 'prop-2', title: 'Locação de Equipamentos - Sunset Lounge', value: 45000, client: 'Sunset Lounge Bar', validUntil: '2026-07-30', status: 'Em Negociação', date: '2026-07-12' },
    { id: 'prop-3', title: 'Projeto de Marketing - Festival de Inverno', value: 150000, client: 'Arena Music Curitiba', validUntil: '2026-08-01', status: 'Enviada', date: '2026-07-14' }
  ]);
  const [contracts, setContracts] = useState([
    { id: 'con-1', title: 'Contrato Geral de Parceria - Prime Show', value: 120000, client: 'Prime Show Eventos', startDate: '2026-07-01', endDate: '2027-07-01', status: 'Ativo' },
    { id: 'con-2', title: 'Contrato de Fomento de Eventos - Arena Music', value: 150000, client: 'Arena Music Curitiba', startDate: '2026-07-10', endDate: '2026-12-31', status: 'Ativo' },
    { id: 'con-3', title: 'Termo de Encerramento - Embafeste Premium', value: 510000, client: 'Embafeste Premium', startDate: '2025-07-01', endDate: '2026-07-01', status: 'Finalizado' }
  ]);
  const [goals, setGoals] = useState([
    { id: 'goal-1', seller: 'Roberto Carlos', target: 200000, achieved: 120000, period: 'Julho 2026' },
    { id: 'goal-2', seller: 'Maria Silva', target: 150000, achieved: 150000, period: 'Julho 2026' },
    { id: 'goal-3', seller: 'Fernanda Lima', target: 100000, achieved: 45000, period: 'Julho 2026' }
  ]);
  const [commissions, setCommissions] = useState([
    { id: 'com-1', seller: 'Roberto Carlos', dealValue: 120000, rate: 5, commission: 6000, paymentStatus: 'Pago', date: '2026-07-10' },
    { id: 'com-2', seller: 'Maria Silva', dealValue: 510000, rate: 5, commission: 25500, paymentStatus: 'Pago', date: '2026-07-01' },
    { id: 'com-3', seller: 'Fernanda Lima', dealValue: 150000, rate: 4, commission: 6000, paymentStatus: 'Pendente', date: '2026-07-14' }
  ]);
  const [events, setEvents] = useState([
    { id: 'ev-1', name: 'Metal Fest Curitiba 2026', category: 'Show / Festival', date: '2026-09-12', time: '18:00', city: 'Curitiba', venue: 'Pedreira Paulo Leminski', capacity: 25000, producer: 'Prime Show Eventos', organizer: 'Associação de Criadores do Sul', banner: 'metal_fest_banner.jpg', status: 'Ativo' },
    { id: 'ev-2', name: 'Festival de Inverno 2026', category: 'Show / Festival', date: '2026-08-05', time: '17:00', city: 'Curitiba', venue: 'Teatro Positivo', capacity: 2400, producer: 'Gisele Lima', organizer: 'Curitiba Eventos e Convenções', banner: 'festival_inverno.jpg', status: 'Ativo' },
    { id: 'ev-3', name: 'Sunset Lounge Party', category: 'Festa / Balada', date: '2026-07-25', time: '22:00', city: 'Balneário Camboriú', venue: 'Sunset Beach Club', capacity: 1500, producer: 'Rodrigo Festas Som', organizer: 'Sunset Lounge Bar', banner: 'sunset_party.jpg', status: 'Ativo' }
  ]);
  const [venues, setVenues] = useState([
    { id: 'ven-1', name: 'Pedreira Paulo Leminski', capacity: 25000, accessibility: 'Total', parking: '500 vagas', backstage: 'Grande (5 camarins)', infrastructure: 'Excelente' },
    { id: 'ven-2', name: 'Teatro Positivo', capacity: 2400, accessibility: 'Total', parking: '1000 vagas', backstage: 'Profissional', infrastructure: 'Excelente' }
  ]);
  const [sectors, setSectors] = useState([
    { id: 'sec-1', eventId: 'ev-1', name: 'Arena', capacity: 18000, price: 120 },
    { id: 'sec-2', eventId: 'ev-1', name: 'VIP', capacity: 4000, price: 250 }
  ]);
  const [ticketBatches, setTicketBatches] = useState([
    { id: 'lot-1', eventId: 'ev-1', sectorId: 'sec-1', name: 'Lote 1', autoSwitch: true, qty: 10000, price: 120, fee: 12, status: 'Encerrado' },
    { id: 'lot-2', eventId: 'ev-1', sectorId: 'sec-1', name: 'Lote 2', autoSwitch: true, qty: 8000, price: 140, fee: 14, status: 'Ativo' }
  ]);
  const [issuedTickets, setIssuedTickets] = useState([
    { id: 'tix-1', eventId: 'ev-1', sectorId: 'sec-1', batchId: 'lot-1', type: 'Inteira', price: 120, barcode: '789123456001', qrCode: 'TIX-EV1-SEC1-LOT1-001', status: 'Checkin', customerName: 'Juliana Vieira', checkinTime: '2026-09-12 18:30' }
  ]);
  const [pdvSales, setPdvSales] = useState([
    { id: 'sale-1', eventId: 'ev-1', pdvId: 'pdv-1', operator: 'Sandra Costa', amount: 240, paymentMethod: 'PIX', type: 'Ingresso', status: 'Aprovado', date: '2026-07-15' }
  ]);
  const [checkins, setCheckins] = useState([
    { id: 'chk-1', ticketId: 'tix-1', timestamp: '2026-09-12 18:30:15', method: 'QR Code', status: 'Sucesso' }
  ]);
  const [credencials, setCredencials] = useState([
    { id: 'crd-1', name: 'Ana Souza', cpf: '111.222.333-44', type: 'Staff', company: 'DiskHub', item: 'Crachá + Pulseira', status: 'Entregue' }
  ]);
  const [turnstiles, setTurnstiles] = useState([
    { id: 'cat-1', name: 'Catraca Principal A', type: 'Entrada', status: 'Ativo', logsCount: 1540, alertasCount: 2 }
  ]);
  const [stocks, setStocks] = useState([
    { id: 'stk-1', item: 'Pulseiras VIP', qty: 2500, minQty: 500, status: 'OK' }
  ]);
  const [eventLogs, setEventLogs] = useState([
    { id: 'log-1', timestamp: '2026-07-17 10:45:00', type: 'Check-in', message: 'Ingresso TIX-EV1-SEC1-LOT1-001 validado na Catraca Principal A (Sucesso).' }
  ]);
  
  // Marketing states
  const [campaigns, setCampaigns] = useState([
    { id: 'camp-1', name: 'Black Friday Antecipado', channel: 'E-mail', sent: 25000, openRate: 28.4, clickRate: 11.2, conversions: 840, revenue: 84000, status: 'Concluída', date: '10/07/2026', roi: 450, audience: 'Compradores de 2025' },
    { id: 'camp-2', name: 'Pré-Venda Metal Fest 2026', channel: 'WhatsApp', sent: 12000, openRate: 94.2, clickRate: 18.5, conversions: 490, revenue: 58800, status: 'Concluída', date: '12/07/2026', roi: 580, audience: 'Base Fãs de Rock' },
    { id: 'camp-3', name: 'Reengajamento Ingressos Inverno', channel: 'E-mail', sent: 8000, openRate: 19.8, clickRate: 6.4, conversions: 120, revenue: 14400, status: 'Concluída', date: '15/07/2026', roi: 210, audience: 'Carrinho Abandonado' },
    { id: 'camp-4', name: 'Promoção Relâmpago Embafeste', channel: 'SMS', sent: 5000, openRate: 88.0, clickRate: 14.2, conversions: 240, revenue: 36000, status: 'Ativa', date: '16/07/2026', roi: 320, audience: 'VIPs Locais' }
  ]);
  const [coupons, setCoupons] = useState([
    { id: 'coup-1', code: 'INVERNO15', discount: 15, event: 'Festival de Inverno Curitiba', status: 'Ativo', usages: 342 },
    { id: 'coup-2', code: 'METAL20', discount: 20, event: 'Metal Fest 2026', status: 'Ativo', usages: 198 }
  ]);
  const [influencers, setInfluencers] = useState([
    { id: 'inf-1', name: 'Gabriela Pugliesi', genre: 'LifeStyle & Fitness', followers: '4.5M', cachet: 12000, activeCampaign: 'Metal Fest 2026', coupon: 'PUGLIMETAL', roi: '340%', codeSales: 410, hired: true },
    { id: 'inf-2', name: 'Felipe Castanhari', genre: 'Curiosidades & Pop Culture', followers: '13.2M', cachet: 25000, activeCampaign: 'Nenhum', coupon: 'CASTANHARI10', roi: '0%', codeSales: 0, hired: false },
    { id: 'inf-3', name: 'Alok Petrillo', genre: 'Música Eletrônica', followers: '28.1M', cachet: 85000, activeCampaign: 'Electronic Carnival 2026', coupon: 'ALOKPARTY', roi: '520%', codeSales: 1850, hired: true }
  ]);
  const [loyaltyRules, setLoyaltyRules] = useState({
    cashbackPercentage: 2,
    pointsPerReal: 1,
    vipClubName: 'Clube DiskVIP',
    minimumRedeemPoints: 500,
    missions: [
      { id: 'mis-1', title: 'Fã de Carteirinha', desc: 'Compre ingressos para 3 eventos no mesmo mês.', reward: '100 pontos + Tag VIP', status: 'Ativa' },
      { id: 'mis-2', title: 'Divulgador Oficial', desc: 'Compartilhe 5 eventos nas suas redes sociais.', reward: 'Cupom de 10% de desconto', status: 'Ativa' }
    ]
  });

  const [marketingActivePlan, setMarketingActivePlan] = useState('omnichannel');
  const [marketingModulesStatus, setMarketingModulesStatus] = useState({});
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: '', channel: 'E-mail', subject: '', date: '18/07/2026', targetEvent: 'Festival de Inverno Curitiba' });
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', event: 'Festival de Inverno Curitiba', status: 'Ativo' });

  // Dashboard performance / financial highlights
  const [financialStats, setFinancialStats] = useState({
    receita: 2642000,
    saldo: 1250000,
    lucro: 2132000,
    ingressos: 8490
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

  const [transfer, setTransfer] = useState({ from: 'acc-2', to: 'acc-1', amount: '' });
  const [newLancamento, setNewLancamento] = useState({ type: 'receita', desc: '', amount: '', category: 'Venda Ingressos', costCenter: 'Eventos', date: '16/07/2026' });

  const gatewayRates = {
    pix: { name: 'PIX Direto', rate: 0.8, fixed: 0.0 },
    cartao_vista: { name: 'Cartão à Vista', rate: 2.3, fixed: 0.4 },
    cartao_parcelado: { name: 'Cartão Parcelado (até 12x)', rate: 4.8, fixed: 0.4 },
    boleto: { name: 'Boleto Bancário', rate: 0.0, fixed: 2.50 }
  };

  // REST API connection state
  const [backendConnected, setBackendConnected] = useState(false);

  // Sync state from REST API backend on mount
  useEffect(() => {
    fetch('http://localhost:3001/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'OK') {
          setBackendConnected(true);
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
              if (db.campaigns) setCampaigns(db.campaigns);
              if (db.coupons) setCoupons(db.coupons);
              if (db.influencers) setInfluencers(db.influencers);
              if (db.loyaltyRules) setLoyaltyRules(db.loyaltyRules);
            });
        }
      })
      .catch(err => {
        console.log('REST API backend not running. Running in standalone simulated mode.');
      });
  }, []);

  // Handle plan locks based on user profile
  useEffect(() => {
    if (!currentUser) return;
    
    if (currentUser.plan === 'omnichannel') {
      setInstalledApps({
        financeiro: true,
        contabilidade: true,
        crm: true,
        mkt: true,
        pdv: true,
        logistica: true,
        bar: true,
        patrimonio: true,
        ai: true,
        eventos: true
      });
      setMarketingModulesStatus({
        1: true, 2: true, 3: true, 4: true, 5: true,
        6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true,
        13: true, 14: true, 15: true, 16: true, 17: true,
        18: true, 19: true, 20: true, 21: true
      });
      setMarketingActivePlan('omnichannel');
    } else if (currentUser.plan === 'premium') {
      setInstalledApps({
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
      setMarketingModulesStatus({
        1: true, 2: true, 3: true, 4: true, 5: true,
        6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true,
        13: false, 14: false, 15: false, 16: false, 17: false,
        18: false, 19: false, 20: false, 21: false
      });
      setMarketingActivePlan('premium');
    } else if (currentUser.plan === 'profissional') {
      setInstalledApps({
        financeiro: true,
        contabilidade: false,
        crm: true,
        mkt: true,
        pdv: false,
        logistica: false,
        bar: false,
        patrimonio: false,
        ai: false,
        eventos: true
      });
      setMarketingModulesStatus({
        1: true, 2: true, 3: true, 4: true, 5: true,
        6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false,
        13: false, 14: false, 15: false, 16: false, 17: false,
        18: false, 19: false, 20: false, 21: false
      });
      setMarketingActivePlan('profissional');
    } else { // essencial
      setInstalledApps({
        financeiro: false,
        contabilidade: false,
        crm: false,
        mkt: true,
        pdv: false,
        logistica: false,
        bar: false,
        patrimonio: false,
        ai: false,
        eventos: true
      });
      setMarketingModulesStatus({
        1: true, 2: true,
        3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false,
        13: false, 14: false, 15: false, 16: false, 17: false,
        18: false, 19: false, 20: false, 21: false
      });
      setMarketingActivePlan('start');
    }
  }, [currentUser]);

  // Sync theme class on HTML element for external scripts/components
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Toast trigger utility
  const triggerToast = (title, body, type = 'success') => {
    setToast({ show: true, title, body, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
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
      const openR = parseFloat((Math.random() * 25 + 15).toFixed(1));
      const clickR = parseFloat((Math.random() * 8 + 3).toFixed(1));

      // Sync with REST backend if connected
      if (backendConnected) {
        fetch(`http://localhost:3001/api/marketing/campaigns/${campaignId}/trigger`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversions: conversionsVal,
            revenue: revenueVal,
            openRate: openR,
            clickRate: clickR
          })
        }).catch(err => console.error('Error syncing campaign trigger with API:', err));
      }

      setCampaigns(prev => prev.map(c => {
        if (c.id === campaignId) {
          return {
            ...c,
            status: 'Concluída',
            conversions: conversionsVal,
            revenue: revenueVal,
            openRate: openR,
            clickRate: clickR
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

    if (backendConnected) {
      fetch('http://localhost:3001/api/marketing/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addedCampaign)
      })
      .then(res => res.json())
      .then(data => {
        setCampaigns(prev => [...prev, data]);
      })
      .catch(err => {
        console.error('Error creating campaign on API:', err);
        setCampaigns(prev => [...prev, addedCampaign]);
      });
    } else {
      setCampaigns(prev => [...prev, addedCampaign]);
    }

    setShowAddCampaignModal(false);
    setNewCampaign({ name: '', channel: 'E-mail', subject: '', date: '18/07/2026', targetEvent: 'Festival de Inverno Curitiba' });
    triggerToast("Campanha Agendada", `A campanha "${addedCampaign.name}" foi agendada para ${addedCampaign.date}.`);
  };

  // Create Coupon
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

    if (backendConnected) {
      fetch('http://localhost:3001/api/marketing/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addedCoupon)
      })
      .then(res => res.json())
      .then(data => {
        setCoupons(prev => [data, ...prev]);
      })
      .catch(err => {
        console.error('Error creating coupon on API:', err);
        setCoupons(prev => [addedCoupon, ...prev]);
      });
    } else {
      setCoupons(prev => [addedCoupon, ...prev]);
    }

    setShowAddCouponModal(false);
    setNewCoupon({ code: '', discount: '', event: 'Festival de Inverno Curitiba', status: 'Ativo' });
    triggerToast("Sucesso", "Cupom promocional gerado.");
  };

  // Theme Design System Style Classes mapping
  const bgMain = theme === 'dark' ? 'bg-[#090A0F] text-[#FFFFFF]' : 'bg-[#F1F5F9] text-[#334155]';
  const sidebarClass = theme === 'dark' ? 'bg-[#0B0D17] border-r border-white/5' : 'bg-white border-r border-[#D1D5DB]';
  const cardClass = theme === 'dark' ? 'bg-[#131520] border border-white/5 shadow-sm rounded-[18px]' : 'bg-white border border-[#E5E7EB] shadow-md rounded-[18px]';
  const bgCard = theme === 'dark' ? 'bg-[#131520]' : 'bg-white';
  const cardHeaderClass = theme === 'dark' ? 'border-b border-white/5 bg-[#131520]/40 px-4 py-3' : 'border-b border-[#E5E7EB] bg-slate-50/50 px-4 py-3';
  const inputClass = theme === 'dark' ? 'bg-[#090A0F] border-white/5 text-white focus:ring-2 focus:ring-[#F97316]/40' : 'bg-white border-[#D1D5DB] text-[#0F172A] focus:ring-2 focus:ring-[#F97316]/40';
  const headerClass = theme === 'dark' ? 'bg-[#131520] border-b border-white/5' : 'bg-white border-b border-[#D1D5DB]';
  const borderCol = theme === 'dark' ? 'border-white/5' : 'border-[#E5E7EB]';
  const textTitle = theme === 'dark' ? 'text-white font-bold' : 'text-[#0F172A] font-bold';
  const textSec = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';
  const textBody = theme === 'dark' ? 'text-slate-350' : 'text-slate-700';
  const bgInput = theme === 'dark' ? 'bg-[#090A0F]' : 'bg-white';
  const selectThemeText = theme === 'dark' ? 'text-[#F8FAFC] font-medium' : 'text-[#111827] font-semibold';

  return (
    <DiskHubContext.Provider value={{
      currentUser, setCurrentUser,
      currentTab, setCurrentTab,
      financeSubTab, setFinanceSubTab,
      accountingSubTab, setAccountingSubTab,
      marketingSubTab, setMarketingSubTab,
      crmSubTab, setCrmSubTab,
      selectedAiEvent, setSelectedAiEvent,
      aiOutputs, setAiOutputs,
      receivables, setReceivables,
      payables, setPayables,
      costCenters, setCostCenters,
      newReceivable, setNewReceivable,
      newPayable, setNewPayable,
      contabilPlanoContas, setContabilPlanoContas,
      contabilLancamentos, setContabilLancamentos,
      contabilAuditorias, setContabilAuditorias,
      plan, setPlan,
      theme, setTheme,
      mobileSidebarOpen, setMobileSidebarOpen,
      sidebarCollapsed, setSidebarCollapsed,
      spotlightOpen, setSpotlightOpen,
      spotlightQuery, setSpotlightQuery,
      eventWizardStep, setEventWizardStep,
      wizardInputs, setWizardInputs,
      isListening, setIsListening,
      billingCycle, setBillingCycle,
      couponCode, setCouponCode,
      appliedDiscount, setAppliedDiscount,
      additionalUsersCount, setAdditionalUsersCount,
      selectedAddons, setSelectedAddons,
      paymentSimulationOpen, setPaymentSimulationOpen,
      selectedPlanForCheckout, setSelectedPlanForCheckout,
      activeTrial, setActiveTrial,
      installedApps, setInstalledApps,
      logisticsBatches, setLogisticsBatches,
      barInventory, setBarInventory,
      posTerminals, setPosTerminals,
      toast, setToast, triggerToast,
      mktSearch, setMktSearch,
      mktCategory, setMktCategory,
      mktPlan, setMktPlan,
      mktSort, setMktSort,
      selectedApp, setSelectedApp,
      appDetailTab, setAppDetailTab,
      chatOpen, setChatOpen,
      userInput, setUserInput,
      chatMessages, setChatMessages,
      isTyping, setIsTyping,
      messagesEndRef,
      users, setUsers,
      invoices, setInvoices,
      borderos, setBorderos,
      leads, setLeads,
      clients, setClients,
      companies, setCompanies,
      appointments, setAppointments,
      proposals, setProposals,
      contracts, setContracts,
      goals, setGoals,
      commissions, setCommissions,
      events, setEvents,
      venues, setVenues,
      sectors, setSectors,
      ticketBatches, setTicketBatches,
      issuedTickets, setIssuedTickets,
      pdvSales, setPdvSales,
      checkins, setCheckins,
      credencials, setCredencials,
      turnstiles, setTurnstiles,
      stocks, setStocks,
      eventLogs, setEventLogs,
      campaigns, setCampaigns,
      coupons, setCoupons,
      influencers, setInfluencers,
      loyaltyRules, setLoyaltyRules,
      marketingActivePlan, setMarketingActivePlan,
      marketingModulesStatus, setMarketingModulesStatus,
      showAddCampaignModal, setShowAddCampaignModal,
      newCampaign, setNewCampaign,
      showAddCouponModal, setShowAddCouponModal,
      newCoupon, setNewCoupon,
      financialStats, setFinancialStats,
      accounts, setAccounts,
      lancamentos, setLancamentos,
      conciliationItems, setConciliationItems,
      transfer, setTransfer,
      newLancamento, setNewLancamento,
      gatewayRates,
      backendConnected, setBackendConnected,
      handleTriggerCampaign,
      handleCreateCampaign,
      handleCreateCoupon,
      bgMain, sidebarClass, cardClass, bgCard, cardHeaderClass, inputClass, headerClass, borderCol, textTitle, textSec, textBody, bgInput, selectThemeText
    }}>
      {children}
    </DiskHubContext.Provider>
  );
}

export function useDiskHub() {
  return useContext(DiskHubContext);
}
