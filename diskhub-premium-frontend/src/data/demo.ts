export const kpis = [
  { label: 'Receita', value: 'R$ 184.320', change: '+12,4%', tone: 'green' },
  { label: 'Pedidos', value: '2.184', change: '+8,1%', tone: 'blue' },
  { label: 'Conversão', value: '3,8%', change: '+0,6%', tone: 'purple' },
  { label: 'Ticket Médio', value: 'R$ 84,39', change: '+3,2%', tone: 'amber' },
] as const

export const recentEvents = [
  ['Novo pedido #1234', 'há 2 minutos', 'green'],
  ['Pagamento confirmado', 'há 12 minutos', 'blue'],
  ['Novo lead recebido', 'há 28 minutos', 'purple'],
  ['Campanha iniciada', 'há 1 hora', 'amber'],
] as const

export const alerts = [
  ['2 pagamentos pendentes', 'Requer atenção', 'danger'],
  ['1 SLA próximo do limite', 'Atendimento', 'warning'],
  ['Campanha com baixa conversão', 'Marketing', 'info'],
  ['Documentos pendentes', 'Contabilidade', 'neutral'],
] as const

export const sales = [52,72,61,84,57,92,81,65,73,77,70,101,128,94,76,110,72,88,116,101,109,147,113,145,77,131,164,137,151,122,186]
