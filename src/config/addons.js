export const addons = [
  {
    id: 'addon-whatsapp',
    name: 'WhatsApp Business API Dedicado',
    description: 'Canal oficial com número próprio verificado para disparos em massa e SAC.',
    availablePlans: ['advanced', 'expert'],
    type: 'recurring',
    includedQuota: '10.000 mensagens/mês',
    pricingNote: 'Consulte franquias adicionais'
  },
  {
    id: 'addon-api',
    name: 'API Premium & Webhooks Dedicados',
    description: 'Chaves de API com taxa de limite estendida (1.000 req/s) e suporte de integração.',
    availablePlans: ['expert'],
    type: 'recurring',
    includedQuota: 'Até 1.000.000 req/mês',
    pricingNote: 'Consulte pacote empresarial'
  },
  {
    id: 'addon-training',
    name: 'Implantação Assistida & Onboarding',
    description: 'Treinamento presencial/remoto de 16 horas para toda a equipe do produtor.',
    availablePlans: ['standard', 'advanced', 'expert'],
    type: 'one-time',
    includedQuota: 'Até 25 participantes',
    pricingNote: 'Taxa única de implantação'
  },
  {
    id: 'addon-whitelabel',
    name: 'Portal White Label com Domínio Próprio',
    description: 'Interface de vendas e portal do produtor sob o domínio da sua empresa.',
    availablePlans: ['expert'],
    type: 'recurring',
    includedQuota: 'Certificado SSL incluso',
    pricingNote: 'Consulte ativação'
  }
];
