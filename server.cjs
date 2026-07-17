const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());

// Initialize Database JSON with default data if not exists
const defaultDb = {
  users: [
    { id: 'usr-1', name: 'Super Administrador', email: 'admin@diskhub.com.br', role: 'Administrador', status: 'Ativo' },
    { id: 'usr-2', name: 'Gisele Lima', email: 'gisele@diskhub.com.br', role: 'Diretor', status: 'Ativo' },
    { id: 'usr-3', name: 'Roberto Carlos', email: 'roberto@diskhub.com.br', role: 'Financeiro', status: 'Ativo' },
    { id: 'usr-4', name: 'Sandra Costa', email: 'sandra@diskhub.com.br', role: 'Operador', status: 'Ativo' }
  ],
  receivables: [
    { id: 'rec-1', desc: 'Venda de Ingressos - Lote 1 Inverno', amount: 154000.00, method: 'Cartão', due: '2026-07-20', status: 'Recebido' },
    { id: 'rec-2', desc: 'Patrocínio Master - Itaú', amount: 150000.00, method: 'PIX', due: '2026-07-22', status: 'Pendente' },
    { id: 'rec-3', desc: 'Venda de Camarotes - Metal Fest', amount: 25000.00, method: 'Boleto', due: '2026-07-15', status: 'Atrasado' }
  ],
  payables: [
    { id: 'pay-1', desc: 'Repasse Produtor - Lote 1 Inverno', amount: 120000.00, due: '2026-07-25', status: 'Agendado', category: 'Repasse', costCenter: 'Eventos' },
    { id: 'pay-2', desc: 'Locação de Geradores - Pedreira', amount: 18000.00, due: '2026-07-19', status: 'Pendente', category: 'Estrutura', costCenter: 'Produção' },
    { id: 'pay-3', desc: 'Segurança e Portaria - Metal Fest', amount: 35000.00, due: '2026-07-10', status: 'Pago', category: 'Segurança', costCenter: 'Produção' }
  ],
  invoices: [
    { id: 'nf-9821', client: 'Prime Show Eventos', doc: '12.345.678/0001-90', event: 'Metal Fest 2026', amount: 85000, type: 'Venda Ingresso', status: 'Emitida', date: '10/07/2026' },
    { id: 'nf-9822', client: 'Juliana Vieira', doc: '998.888.777-66', event: 'Embafeste Premium', amount: 510000, type: 'Patrocínio', status: 'Emitida', date: '01/07/2026' },
    { id: 'nf-8923', client: 'Arena Music Curitiba', doc: '33.222.111/0001-44', event: 'Arena Music', amount: 12500, type: 'Taxa Serviço', status: 'Pendente', date: '13/07/2026' }
  ],
  borderos: [
    { id: 'bor-1', name: 'Festival de Inverno Curitiba', location: 'Teatro Positivo', date: '05/07/2026', ticketSales: 242000, barRevenue: 48000, sponsors: 150000, expenses: 85000, grossRevenue: 440000, netProfit: 355000 },
    { id: 'bor-2', name: 'Metal Fest 2026', location: 'Pedreira Paulo Leminski', date: '12/07/2026', ticketSales: 1850000, barRevenue: 342000, sponsors: 450000, expenses: 510000, grossRevenue: 2642000, netProfit: 2132000 }
  ],
  leads: [
    { id: 'lead-1', name: 'Roberto Alencar', company: 'Prime Show Eventos', value: 120000, stage: 'prospect', date: '10 Jul', tag: 'VIP' },
    { id: 'lead-2', name: 'Ana Beatriz Souza', company: 'Festival Sertanejo', value: 85000, stage: 'prospect', date: '12 Jul', tag: 'Quente' },
    { id: 'lead-3', name: 'Carlos Henrique', company: 'Sunset Lounge Bar', value: 45000, stage: 'qualified', date: '08 Jul', tag: 'Novo' },
    { id: 'lead-4', name: 'Mariana Costa', company: 'Arena Music Curitiba', value: 150000, stage: 'qualified', date: '14 Jul', tag: 'Corporate' },
    { id: 'lead-5', name: 'Felipe Dias', company: 'Expo Agro 2026', value: 210000, stage: 'negotiation', date: '05 Jul', tag: 'Alta Margem' },
    { id: 'lead-6', name: 'Juliana Vieira', company: 'Embafeste Premium', value: 510000, stage: 'won', date: '01 Jul', tag: 'Fechado' }
  ],
  clients: [
    { id: 'c-1', name: 'Juliana Vieira', company: 'Embafeste Premium', email: 'juliana@embafeste.com', phone: '(41) 99888-7766', spend: 510000, status: 'Ativo' },
    { id: 'c-2', name: 'Roberto Alencar', company: 'Prime Show Eventos', email: 'roberto@primeshow.com.br', phone: '(41) 98765-4321', spend: 120000, status: 'Em Negociação' },
    { id: 'c-3', name: 'Mariana Costa', company: 'Arena Music Curitiba', email: 'mariana@arenamusic.com', phone: '(41) 99111-2222', spend: 150000, status: 'Ativo' }
  ],
  companies: [
    { id: 'emp-1', name: 'Prime Show Eventos LTDA', cnpj: '12.345.678/0001-90', industry: 'Entretenimento', employees: 45, city: 'Curitiba', phone: '(41) 3322-1100' },
    { id: 'emp-2', name: 'Sunset Lounge Bar', cnpj: '98.765.432/0001-10', industry: 'Alimentação', employees: 12, city: 'Balneário Camboriú', phone: '(47) 3211-9988' },
    { id: 'emp-3', name: 'Arena Music Curitiba', cnpj: '55.444.333/0001-22', industry: 'Eventos / Shows', employees: 28, city: 'Curitiba', phone: '(41) 3044-5566' }
  ],
  appointments: [
    { id: 'apt-1', title: 'Reunião de Proposta - Prime Show', date: '2026-07-18', time: '14:00', host: 'Roberto Carlos', client: 'Roberto Alencar', type: 'Reunião Presencial', status: 'Confirmado' },
    { id: 'apt-2', title: 'Visita Técnica - Arena Music Curitiba', date: '2026-07-20', time: '10:30', host: 'Maria Silva', client: 'Mariana Costa', type: 'Visita Local', status: 'Pendente' },
    { id: 'apt-3', title: 'Call de Alinhamento - Sunset Lounge', date: '2026-07-19', time: '16:00', host: 'Fernanda Lima', client: 'Ana Beatriz Souza', type: 'Videoconferência', status: 'Confirmado' }
  ],
  proposals: [
    { id: 'prop-1', title: 'Patrocínio Master Metal Fest 2026', value: 85000, client: 'Prime Show Eventos', validUntil: '2026-08-15', status: 'Aceita', date: '2026-07-10' },
    { id: 'prop-2', title: 'Locação de Equipamentos - Sunset Lounge', value: 45000, client: 'Sunset Lounge Bar', validUntil: '2026-07-30', status: 'Em Negociação', date: '2026-07-12' },
    { id: 'prop-3', title: 'Projeto de Marketing - Festival de Inverno', value: 150000, client: 'Arena Music Curitiba', validUntil: '2026-08-01', status: 'Enviada', date: '2026-07-14' }
  ],
  contracts: [
    { id: 'con-1', title: 'Contrato Geral de Parceria - Prime Show', value: 120000, client: 'Prime Show Eventos', startDate: '2026-07-01', endDate: '2027-07-01', status: 'Ativo' },
    { id: 'con-2', title: 'Contrato de Fomento de Eventos - Arena Music', value: 150000, client: 'Arena Music Curitiba', startDate: '2026-07-10', endDate: '2026-12-31', status: 'Ativo' },
    { id: 'con-3', title: 'Termo de Encerramento - Embafeste Premium', value: 510000, client: 'Embafeste Premium', startDate: '2025-07-01', endDate: '2026-07-01', status: 'Finalizado' }
  ],
  goals: [
    { id: 'goal-1', seller: 'Roberto Carlos', target: 200000, achieved: 120000, period: 'Julho 2026' },
    { id: 'goal-2', seller: 'Maria Silva', target: 150000, achieved: 150000, period: 'Julho 2026' },
    { id: 'goal-3', seller: 'Fernanda Lima', target: 100000, achieved: 45000, period: 'Julho 2026' }
  ],
  commissions: [
    { id: 'com-1', seller: 'Roberto Carlos', dealValue: 120000, rate: 5, commission: 6000, paymentStatus: 'Pago', date: '2026-07-10' },
    { id: 'com-2', seller: 'Maria Silva', dealValue: 510000, rate: 5, commission: 25500, paymentStatus: 'Pago', date: '2026-07-01' },
    { id: 'com-3', seller: 'Fernanda Lima', dealValue: 150000, rate: 4, commission: 6000, paymentStatus: 'Pendente', date: '2026-07-14' }
  ],
  producers: [
    { id: 'prod-1', name: 'Rodrigo Festas Som', eventsCount: 35, rating: 4.8, contact: 'rodrigo@festassom.com', specialty: 'Shows Nacionais' },
    { id: 'prod-2', name: 'Gisele Produções Executivas', eventsCount: 52, rating: 4.9, contact: 'gisele@producoes.com', specialty: 'Eventos Corporativos' }
  ],
  organizers: [
    { id: 'org-1', name: 'Associação de Criadores do Sul', region: 'Paraná / Santa Catarina', contact: 'contato@criadoressul.org', activeEvents: 5 },
    { id: 'org-2', name: 'Curitiba Eventos e Convenções', region: 'Curitiba Metropolitana', contact: 'comercial@curitibaconv.com.br', activeEvents: 3 }
  ],
  artists: [
    { id: 'art-1', name: 'Thiaguinho do Pagode', genre: 'Pagode', cachet: 120000, contact: 'shows@thiaguinho.com.br' },
    { id: 'art-2', name: 'DJ Alok Curitiba Project', genre: 'Eletrônica', cachet: 250000, contact: 'booking@alokproject.com' }
  ],
  bands: [
    { id: 'band-1', name: 'Os Heraldo Rock', membersCount: 4, genre: 'Rock Clássico', cachet: 15000, contact: 'heraldo@rockband.com' },
    { id: 'band-2', name: 'Banda Capital Inicial Cover', membersCount: 5, genre: 'Pop Rock', cachet: 8000, contact: 'capitalcover@gmail.com' }
  ],
  sponsors: [
    { id: 'spon-1', company: 'Cervejaria Heineken do Brasil', sponsoredEvent: 'Metal Fest 2026', value: 85000, contact: 'patrocinios@heineken.com.br' },
    { id: 'spon-2', company: 'Coca-Cola FEMSA', sponsoredEvent: 'Festival de Inverno Curitiba', value: 120000, contact: 'marketing@cocacolafemsa.com' }
  ],
  suppliers: [
    { id: 'sup-1', name: 'Luz & Som Master Curitiba', service: 'Som e Iluminação', rating: 4.7, contact: 'contato@luzsommaster.com' },
    { id: 'sup-2', name: 'Segurança Armada Cia', service: 'Segurança e Portaria', rating: 4.9, contact: 'comercial@segarmada.com.br' },
    { id: 'sup-3', name: 'Buffet Delícias & Cia', service: 'Alimentação e Bebidas', rating: 4.6, contact: 'contato@deliciascia.com' }
  ],
  events: [
    { id: 'ev-1', name: 'Metal Fest Curitiba 2026', category: 'Show / Festival', date: '2026-09-12', time: '18:00', city: 'Curitiba', venue: 'Pedreira Paulo Leminski', capacity: 25000, producer: 'Prime Show Eventos', organizer: 'Associação de Criadores do Sul', banner: 'metal_fest_banner.jpg', status: 'Ativo' },
    { id: 'ev-2', name: 'Festival de Inverno 2026', category: 'Show / Festival', date: '2026-08-05', time: '17:00', city: 'Curitiba', venue: 'Teatro Positivo', capacity: 2400, producer: 'Gisele Produções', organizer: 'Curitiba Eventos e Convenções', banner: 'festival_inverno.jpg', status: 'Ativo' },
    { id: 'ev-3', name: 'Sunset Lounge Party', category: 'Festa / Balada', date: '2026-07-25', time: '22:00', city: 'Balneário Camboriú', venue: 'Sunset Beach Club', capacity: 1500, producer: 'Rodrigo Festas Som', organizer: 'Sunset Lounge Bar', banner: 'sunset_party.jpg', status: 'Ativo' },
    { id: 'ev-4', name: 'Expo Agro Regional 2026', category: 'Feira / Exposição', date: '2026-10-18', time: '10:00', city: 'Londrina', venue: 'Parque de Exposições Londrina', capacity: 50000, producer: 'Expo Agro Lda', organizer: 'Associação de Criadores do Sul', banner: 'expo_agro.jpg', status: 'Pendente' }
  ],
  venues: [
    { id: 'ven-1', name: 'Pedreira Paulo Leminski', capacity: 25000, accessibility: 'Total', parking: '500 vagas', backstage: 'Grande (5 camarins)', infrastructure: 'Excelente' },
    { id: 'ven-2', name: 'Teatro Positivo', capacity: 2400, accessibility: 'Total', parking: '1000 vagas', backstage: 'Profissional', infrastructure: 'Excelente' },
    { id: 'ven-3', name: 'Sunset Beach Club', capacity: 1500, accessibility: 'Parcial', parking: 'Rua / Conveniado', backstage: 'Médio (2 camarins)', infrastructure: 'Boa' },
    { id: 'ven-4', name: 'Parque de Exposições Londrina', capacity: 50000, accessibility: 'Total', parking: '5000 vagas', backstage: 'Espaço Aberto / Salas VIP', infrastructure: 'Industrial' }
  ],
  sectors: [
    { id: 'sec-1', eventId: 'ev-1', name: 'Arena', capacity: 18000, price: 120 },
    { id: 'sec-2', eventId: 'ev-1', name: 'VIP', capacity: 4000, price: 250 },
    { id: 'sec-3', eventId: 'ev-1', name: 'Camarote', capacity: 2000, price: 450 },
    { id: 'sec-4', eventId: 'ev-1', name: 'Front Stage', capacity: 1000, price: 350 },
    { id: 'sec-5', eventId: 'ev-2', name: 'Plateia A', capacity: 1000, price: 180 },
    { id: 'sec-6', eventId: 'ev-2', name: 'Plateia B', capacity: 1200, price: 140 },
    { id: 'sec-7', eventId: 'ev-2', name: 'Área PCD', capacity: 200, price: 70 }
  ],
  ticket_batches: [
    { id: 'lot-1', eventId: 'ev-1', sectorId: 'sec-1', name: 'Lote 1', autoSwitch: true, qty: 10000, price: 120, fee: 12, status: 'Encerrado' },
    { id: 'lot-2', eventId: 'ev-1', sectorId: 'sec-1', name: 'Lote 2', autoSwitch: true, qty: 8000, price: 140, fee: 14, status: 'Ativo' },
    { id: 'lot-3', eventId: 'ev-1', sectorId: 'sec-2', name: 'Lote Promocional', autoSwitch: false, qty: 1000, price: 200, fee: 20, status: 'Encerrado' },
    { id: 'lot-4', eventId: 'ev-1', sectorId: 'sec-2', name: 'Lote 1', autoSwitch: true, qty: 3000, price: 250, fee: 25, status: 'Ativo' },
    { id: 'lot-5', eventId: 'ev-2', sectorId: 'sec-5', name: 'Lote único', autoSwitch: false, qty: 1000, price: 180, fee: 18, status: 'Ativo' }
  ],
  issued_tickets: [
    { id: 'tix-1', eventId: 'ev-1', sectorId: 'sec-1', batchId: 'lot-1', type: 'Inteira', price: 120, barcode: '789123456001', qrCode: 'TIX-EV1-SEC1-LOT1-001', status: 'Checkin', customerName: 'Juliana Vieira', checkinTime: '2026-09-12 18:30' },
    { id: 'tix-2', eventId: 'ev-1', sectorId: 'sec-1', batchId: 'lot-1', type: 'Meia', price: 60, barcode: '789123456002', qrCode: 'TIX-EV1-SEC1-LOT1-002', status: 'Checkin', customerName: 'Roberto Alencar', checkinTime: '2026-09-12 18:45' },
    { id: 'tix-3', eventId: 'ev-1', sectorId: 'sec-2', batchId: 'lot-4', type: 'VIP', price: 250, barcode: '789123456003', qrCode: 'TIX-EV1-SEC2-LOT4-003', status: 'Pendente', customerName: 'Mariana Costa', checkinTime: null },
    { id: 'tix-4', eventId: 'ev-2', sectorId: 'sec-5', batchId: 'lot-5', type: 'Cortesia', price: 0, barcode: '789123456004', qrCode: 'TIX-EV2-SEC5-LOT5-004', status: 'Pendente', customerName: 'Sandra Costa', checkinTime: null },
    { id: 'tix-5', eventId: 'ev-1', sectorId: 'sec-3', batchId: 'lot-3', type: 'Imprensa', price: 0, barcode: '789123456005', qrCode: 'TIX-EV1-SEC3-LOT3-005', status: 'Pendente', customerName: 'Carlos Henrique', checkinTime: null }
  ],
  pdv_sales: [
    { id: 'sale-1', eventId: 'ev-1', pdvId: 'pdv-1', operator: 'Sandra Costa', amount: 240, paymentMethod: 'PIX', type: 'Ingresso', status: 'Aprovado', date: '2026-07-15' },
    { id: 'sale-2', eventId: 'ev-1', pdvId: 'pdv-1', operator: 'Sandra Costa', amount: 80, paymentMethod: 'Dinheiro', type: 'Consumo', status: 'Aprovado', date: '2026-07-16' },
    { id: 'sale-3', eventId: 'ev-2', pdvId: 'pdv-2', operator: 'Daniel Santos', amount: 350, paymentMethod: 'Cartão', type: 'Ingresso', status: 'Aprovado', date: '2026-07-17' },
    { id: 'sale-4', eventId: 'ev-1', pdvId: 'pdv-1', operator: 'Sandra Costa', amount: 120, paymentMethod: 'Cartão', type: 'Ingresso', status: 'Cancelado', date: '2026-07-16' }
  ],
  checkins: [
    { id: 'chk-1', ticketId: 'tix-1', timestamp: '2026-09-12 18:30:15', method: 'QR Code', status: 'Sucesso' },
    { id: 'chk-2', ticketId: 'tix-2', timestamp: '2026-09-12 18:45:22', method: 'Código de Barras', status: 'Sucesso' }
  ],
  credencials: [
    { id: 'crd-1', name: 'Ana Souza', cpf: '111.222.333-44', type: 'Staff', company: 'DiskHub', item: 'Crachá + Pulseira', status: 'Entregue' },
    { id: 'crd-2', name: 'Thiaguinho do Pagode', cpf: '555.444.333-22', type: 'Artistas', company: 'Thiaguinho Produções', item: 'Pulseira VIP', status: 'Entregue' },
    { id: 'crd-3', name: 'Marcos Jornalista', cpf: '999.888.777-66', type: 'Imprensa', company: 'Gazeta do Sul', item: 'Crachá Imprensa', status: 'Pendente' },
    { id: 'crd-4', name: 'Paulo Silva Stage', cpf: '222.333.444-55', type: 'Fornecedores', company: 'Master Luz Som', item: 'Pulseira Staff', status: 'Pendente' }
  ],
  turnstiles: [
    { id: 'cat-1', name: 'Catraca Principal A', type: 'Entrada', status: 'Ativo', logsCount: 1540, alertasCount: 2 },
    { id: 'cat-2', name: 'Catraca VIP Sul', type: 'Entrada', status: 'Ativo', logsCount: 420, alertasCount: 0 },
    { id: 'cat-3', name: 'Catraca Imprensa / Staff', type: 'Entrada', status: 'Ativo', logsCount: 88, alertasCount: 0 },
    { id: 'cat-4', name: 'Catraca Saída Pista', type: 'Saída', status: 'Ativo', logsCount: 1200, alertasCount: 0 },
    { id: 'cat-5', name: 'Catraca Portão C (Inoperante)', type: 'Entrada', status: 'Inativo', logsCount: 0, alertasCount: 5 }
  ],
  stocks: [
    { id: 'stk-1', item: 'Pulseiras VIP', qty: 2500, minQty: 500, status: 'OK' },
    { id: 'stk-2', item: 'Bobinas de Impressão PDV', qty: 15, minQty: 20, status: 'Baixo' },
    { id: 'stk-3', item: 'Credenciais Staff', qty: 450, minQty: 100, status: 'OK' },
    { id: 'stk-4', item: 'Lata de Cerveja Heineken', qty: 80, minQty: 500, status: 'Crítico' },
    { id: 'stk-5', item: 'Água Mineral 500ml', qty: 1200, minQty: 800, status: 'OK' },
    { id: 'stk-6', item: 'Refrigerante Cola Lata', qty: 150, minQty: 300, status: 'Baixo' }
  ],
  event_logs: [
    { id: 'log-1', timestamp: '2026-07-17 10:45:00', type: 'Check-in', message: 'Ingresso TIX-EV1-SEC1-LOT1-001 validado na Catraca Principal A (Sucesso).' },
    { id: 'log-2', timestamp: '2026-07-17 10:48:12', type: 'Venda PDV', message: 'Venda #sale-1 (R$ 240,00) de 2 ingressos realizada por Sandra Costa no Caixa Portão A.' },
    { id: 'log-3', timestamp: '2026-07-17 10:50:35', type: 'Catraca', message: 'Alerta: Catraca Portão C perdeu a conexão com o servidor de validação offline.' },
    { id: 'log-4', timestamp: '2026-07-17 10:55:10', type: 'Credenciamento', message: 'Credencial de Artista entregue para Gisele Lima (Thiaguinho do Pagode).' }
  ],
  accounting_entries: [
    { id: 'ent-1', date: '2026-07-10', accountDeb: '1.1.01 (Caixa/Bancos)', accountCred: '3.1.01 (Receita Ingressos)', amount: 85000, desc: 'Lote faturamento de ingressos Metal Fest - Proposta #prop-1', costCenter: 'Eventos', user: 'Roberto Carlos' },
    { id: 'ent-2', date: '2026-07-01', accountDeb: '1.1.01 (Caixa/Bancos)', accountCred: '3.1.02 (Receita Patrocínios)', amount: 510000, desc: 'Faturamento de cota anual - Embafeste Premium', costCenter: 'Administrativo', user: 'Roberto Carlos' }
  ],
  chart_of_accounts: [
    { code: '1.0.00', name: 'ATIVO', type: 'Sintética' },
    { code: '1.1.00', name: 'Ativo Circulante', type: 'Sintética' },
    { code: '1.1.01', name: 'Caixa e Equivalentes de Caixa', type: 'Analítica' },
    { code: '2.0.00', name: 'PASSIVO', type: 'Sintética' },
    { code: '3.0.00', name: 'RECEITAS', type: 'Sintética' },
    { code: '3.1.01', name: 'Receita com Venda de Ingressos', type: 'Analítica' },
    { code: '4.0.00', name: 'CUSTOS E DESPESAS', type: 'Sintética' }
  ],
  audit_logs: [
    { id: 'aud-1', type: 'Sucesso', msg: 'Integração Financeira ➔ Contábil realizada para lote de faturamento #982.', date: '15/07/2026' },
    { id: 'aud-2', type: 'Alerta', msg: 'Lançamento manual de ajuste na conta 1.1.02 sem documento fiscal anexado.', date: '14/07/2026' }
  ]
};

function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2));
      return defaultDb;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database file:', err);
    return defaultDb;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing database file:', err);
  }
}

// REST APIs implementation

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DiskHub REST API Server is running!' });
});

// GET /api/db - Helper to get full database state on startup
app.get('/api/db', (req, res) => {
  res.json(readDb());
});

// ================= FASE 1: AUTH & USER ENDPOINTS =================
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  const user = db.users.find(u => u.email === email);
  if (user) {
    res.json({ success: true, message: 'Autenticado com sucesso!', user });
  } else {
    res.status(401).json({ success: false, error: 'Credenciais inválidas ou usuário inexistente.' });
  }
});

// ================= FASE 2: FINANCEIRO ENDPOINTS =================
app.get('/api/financeiro/dashboard', (req, res) => {
  const db = readDb();
  const recTotal = db.receivables.reduce((acc, r) => acc + r.amount, 0);
  const payTotal = db.payables.reduce((acc, p) => acc + p.amount, 0);
  const balance = recTotal - payTotal;
  res.json({
    receitaDiaria: 8200,
    receitaMensal: recTotal,
    ticketMedio: 180,
    inadimplencia: '4.8%',
    saldoBancario: balance + 500000,
    fluxoPrevisto: recTotal,
    fluxoRealizado: recTotal - 25000
  });
});

app.get('/api/financeiro/contas-receber', (req, res) => {
  res.json(readDb().receivables);
});

app.post('/api/financeiro/contas-receber', (req, res) => {
  const db = readDb();
  const newRec = {
    id: `rec-${Date.now()}`,
    desc: req.body.desc || 'Nova Conta a Receber',
    amount: parseFloat(req.body.amount) || 0,
    method: req.body.method || 'PIX',
    due: req.body.due || new Date().toISOString().substring(0, 10),
    status: req.body.status || 'Pendente'
  };
  db.receivables.push(newRec);
  writeDb(db);
  res.status(201).json(newRec);
});

app.get('/api/financeiro/contas-pagar', (req, res) => {
  res.json(readDb().payables);
});

app.post('/api/financeiro/conciliacao', (req, res) => {
  const db = readDb();
  const { receivableId } = req.body;
  db.receivables = db.receivables.map(r => r.id === receivableId ? { ...r, status: 'Recebido' } : r);
  writeDb(db);
  res.json({ success: true, message: 'Conta conciliada com sucesso.' });
});

// ================= FASE 2: CONTABILIDADE ENDPOINTS =================
app.get('/api/contabilidade/dashboard', (req, res) => {
  res.json({
    lucroLiquido: 1777400,
    ebitda: 2132000,
    custos: 595000,
    margem: '78%',
    obrigaçõesPendentes: 2
  });
});

app.post('/api/contabilidade/lancamentos', (req, res) => {
  const db = readDb();
  const newEntry = {
    id: `ent-${Date.now()}`,
    date: req.body.date || new Date().toISOString().substring(0, 10),
    accountDeb: req.body.accountDeb,
    accountCred: req.body.accountCred,
    amount: parseFloat(req.body.amount) || 0,
    desc: req.body.desc || 'Lançamento Contábil',
    costCenter: req.body.costCenter || 'Geral',
    user: req.body.user || 'Administrador'
  };
  db.accounting_entries.unshift(newEntry);
  
  // Auditar alteração
  db.audit_logs.unshift({
    id: `aud-${Date.now()}`,
    type: 'Sucesso',
    msg: `Lançamento manual realizado na conta ${newEntry.accountDeb} (R$ ${newEntry.amount.toLocaleString()})`,
    date: new Date().toLocaleDateString('pt-BR')
  });

  writeDb(db);
  res.status(201).json(newEntry);
});

app.get('/api/contabilidade/balancete', (req, res) => {
  const db = readDb();
  res.json({
    entries: db.accounting_entries,
    accounts: db.chart_of_accounts
  });
});

app.get('/api/contabilidade/dre', (req, res) => {
  const db = readDb();
  const totalRevenue = db.accounting_entries.filter(e => e.accountCred.startsWith('3.')).reduce((acc, e) => acc + e.amount, 0);
  const totalExpenses = db.accounting_entries.filter(e => e.accountCred.startsWith('4.') || e.accountDeb.startsWith('4.')).reduce((acc, e) => acc + e.amount, 0);
  res.json({
    receitaBruta: totalRevenue || 595000,
    custosOperacionais: totalExpenses || 85000,
    resultadoLiquido: (totalRevenue - totalExpenses) || 510000
  });
});

// ================= FASE 3: CRM ENDPOINTS =================
app.get('/api/crm/dashboard', (req, res) => {
  const db = readDb();
  const wonLeads = db.leads.filter(l => l.stage === 'won');
  const revenue = wonLeads.reduce((acc, l) => acc + l.value, 0);
  const convRate = db.leads.length > 0 ? ((wonLeads.length / db.leads.length) * 100).toFixed(1) + '%' : '0%';
  res.json({
    conversao: convRate,
    ticketMedio: wonLeads.length > 0 ? revenue / wonLeads.length : 0,
    receitaTotal: revenue,
    eventosFechados: wonLeads.length
  });
});

app.get('/api/crm/leads', (req, res) => {
  res.json(readDb().leads);
});

app.post('/api/crm/clientes', (req, res) => {
  const db = readDb();
  const newClient = {
    id: `c-${Date.now()}`,
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    phone: req.body.phone || '(41) 99999-0000',
    spend: parseFloat(req.body.spend) || 0,
    status: req.body.status || 'Ativo'
  };
  db.clients.unshift(newClient);
  writeDb(db);
  res.status(201).json({ success: true, client: newClient });
});

app.get('/api/eventos/produtores', (req, res) => {
  res.json(readDb().producers);
});

// ================= FASE 4: EVENTOS, PDV & CHECK-IN ENDPOINTS =================
app.get('/api/eventos', (req, res) => {
  res.json(readDb().events);
});

app.post('/api/eventos', (req, res) => {
  const db = readDb();
  const newEvent = {
    id: `ev-${Date.now()}`,
    name: req.body.name,
    category: req.body.category || 'Show / Festival',
    date: req.body.date,
    time: req.body.time || '20:00',
    city: req.body.city || 'Curitiba',
    venue: req.body.venue,
    capacity: parseInt(req.body.capacity) || 1000,
    producer: req.body.producer || 'Produtor Local',
    organizer: req.body.organizer || 'Organizador Geral',
    banner: req.body.banner || 'default_banner.jpg',
    status: req.body.status || 'Ativo'
  };
  db.events.push(newEvent);
  writeDb(db);
  res.status(201).json({ success: true, event: newEvent });
});

app.put('/api/eventos/:id', (req, res) => {
  const db = readDb();
  const { id } = req.params;
  db.events = db.events.map(e => e.id === id ? { ...e, ...req.body } : e);
  writeDb(db);
  res.json({ success: true, message: 'Evento atualizado.' });
});

app.delete('/api/eventos/:id', (req, res) => {
  const db = readDb();
  const { id } = req.params;
  db.events = db.events.filter(e => e.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Evento removido.' });
});

app.get('/api/eventos/dashboard', (req, res) => {
  const db = readDb();
  const activeCount = db.events.filter(e => e.status === 'Ativo').length;
  const finishedCount = db.events.filter(e => e.status === 'Finalizado').length;
  const totalPdv = db.pdv_sales.filter(s => s.status === 'Aprovado').reduce((acc, s) => acc + s.amount, 0);
  res.json({
    eventosAtivos: activeCount,
    eventosFinalizados: finishedCount,
    receitaPdv: totalPdv,
    receitaOnline: 380000,
    totalReceitaConsolidada: totalPdv + 380000,
    totalCheckins: db.checkins.filter(c => c.status === 'Sucesso').length,
    totalIngressosEmitidos: db.issued_tickets.length
  });
});

app.post('/api/eventos/checkin', (req, res) => {
  const db = readDb();
  const { qrCode, method } = req.body;
  const tix = db.issued_tickets.find(t => t.qrCode === qrCode || t.barcode === qrCode);

  if (!tix) {
    return res.status(404).json({ error: 'Ingresso não localizado na base.' });
  }

  if (tix.status === 'Checkin') {
    db.checkins.unshift({
      id: `chk-${Date.now()}`,
      ticketId: tix.id,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      method: method || 'QR Code',
      status: 'Duplicado'
    });
    writeDb(db);
    return res.status(409).json({ error: 'Ingresso já validado anteriormente!' });
  }

  // Set as checked in
  db.issued_tickets = db.issued_tickets.map(t => t.id === tix.id ? { ...t, status: 'Checkin', checkinTime: new Date().toISOString().replace('T', ' ').substring(0, 16) } : t);
  db.checkins.unshift({
    id: `chk-${Date.now()}`,
    ticketId: tix.id,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    method: method || 'QR Code',
    status: 'Sucesso'
  });
  db.event_logs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    type: 'Check-in',
    message: `Ingresso ${tix.qrCode} validado na catraca via API (Sucesso).`
  });

  writeDb(db);
  res.json({ success: true, ticket: { ...tix, status: 'Checkin' } });
});

app.get('/api/eventos/pdv', (req, res) => {
  res.json(readDb().pdv_sales);
});

app.post('/api/eventos/pdv', (req, res) => {
  const db = readDb();
  const newSale = {
    id: `sale-${Date.now()}`,
    eventId: req.body.eventId || 'ev-1',
    pdvId: req.body.pdvId || 'pdv-1',
    operator: req.body.operator || 'Sandra Costa',
    amount: parseFloat(req.body.amount) || 0,
    paymentMethod: req.body.paymentMethod || 'PIX',
    type: req.body.type || 'Ingresso',
    status: 'Aprovado',
    date: new Date().toISOString().substring(0, 10)
  };
  db.pdv_sales.unshift(newSale);
  db.event_logs.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    type: 'Venda PDV',
    message: `Venda #${newSale.id} de R$ ${newSale.amount.toLocaleString()} realizada no caixa.`
  });
  writeDb(db);
  res.status(201).json(newSale);
});

// Serve frontend build static files (optional, for unified deployment)
app.use(express.static(path.join(__dirname, 'dist')));
app.get(/.*/, (req, res) => {
  if (fs.existsSync(path.join(__dirname, 'dist', 'index.html'))) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    res.json({ status: 'OK', message: 'Server is up, but static frontend files are not compiled. Build the frontend first!' });
  }
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 DiskHub REST API Server is running on port ${PORT}`);
  console.log(`📂 Persistent Database: ${DB_PATH}`);
  console.log(`==================================================`);
});
