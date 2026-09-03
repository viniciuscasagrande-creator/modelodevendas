import React from 'react';
import PricingCard from '../components/pricing/PricingCard';
import PricingComparison from '../components/pricing/PricingComparison';
import { Crown } from 'lucide-react';

export default function PlansPage({ 
  plan, 
  setPlan, 
  theme, 
  triggerToast 
}) {
  const plansCatalog = [
    {
      id: 'essencial',
      name: 'ESSENCIAL',
      desc: 'Para pequenos produtores e eventos locais.',
      priceMonthly: '199,90',
      baseUsers: '3 usuários inclusos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-10.96-1.57c-.12-.47-.13-.96-.02-1.43a1 1 0 01.35-.57L10.5 6.5a1 1 0 011.41 0l3.68 3.68a1 1 0 010 1.41l-2.73 2.78z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 5l-4 4m2.5-2.5L13 11M4.5 19.5L9 15M15 9l1.5-1.5M9 15l-1.5 1.5" />
        </svg>
      ),
      color: '#10B981',
      badgeBg: 'bg-[#10B981]/5',
      badgeText: 'text-[#10B981]',
      border: 'border-[#10B981]/10',
      ring: 'ring-[#10B981]',
      btnStyle: 'border border-[#10B981] text-[#10B981] bg-transparent hover:bg-[#10B981]/5',
      features: [
        'Gestão de Eventos Básica',
        'Venda Online de Ingressos',
        'PDV Simplificado',
        'Financeiro Básico',
        'Relatórios Básicos'
      ]
    },
    {
      id: 'profissional',
      name: 'PROFISSIONAL',
      desc: 'Para produtores em crescimento e casas de espetáculo.',
      priceMonthly: '399,90',
      baseUsers: '5 usuários inclusos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.9 1.393-.9 1.693 0l1.285 3.857a1 1 0 00.95.69h4.056c.969 0 1.371 1.24.588 1.81l-3.28 2.383a1 1 0 00-.364 1.118l1.285 3.857c.3.9-.743 1.66-1.527 1.097l-3.28-2.383a1 1 0 00-1.175 0l-3.28 2.383c-.784.563-1.827-.197-1.527-1.097l1.285-3.857a1 1 0 00-.364-1.118L2.05 9.284c-.783-.57-.38-1.81.588-1.81h4.056a1 1 0 00.95-.69l1.285-3.857z" />
        </svg>
      ),
      color: '#2563EB',
      badgeBg: 'bg-[#2563EB]/5',
      badgeText: 'text-[#2563EB]',
      border: 'border-[#2563EB]/10',
      ring: 'ring-[#2563EB]',
      btnStyle: 'border border-[#2563EB] text-[#2563EB] bg-transparent hover:bg-[#2563EB]/5',
      features: [
        'Tudo do Essencial',
        'CRM Completo',
        'Marketing & Campanhas',
        'PDV Avançado',
        'Relatórios Avançados'
      ]
    },
    {
      id: 'premium',
      name: 'PREMIUM',
      desc: 'Para grandes eventos, festivais e produtores regionais.',
      priceMonthly: '799,90',
      baseUsers: '10 usuários inclusos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: '#8B5CF6',
      badgeBg: 'bg-[#8B5CF6]/5',
      badgeText: 'text-[#8B5CF6]',
      border: 'border-[#8B5CF6]/10',
      ring: 'ring-[#8B5CF6]',
      btnStyle: 'border border-[#8B5CF6] text-[#8B5CF6] bg-transparent hover:bg-[#8B5CF6]/5',
      features: [
        'Tudo do Profissional',
        'Check-in & Credenciamento',
        'Catracas & Controle de Acesso',
        'BI & Dashboards Avançados',
        'Integrações Avançadas'
      ]
    },
    {
      id: 'enterprise',
      name: 'ENTERPRISE',
      desc: 'Para empresas, parques, arenas e grandes promotores.',
      priceMonthly: '1.499,90',
      baseUsers: '20 usuários ilimitados',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: '#F97316',
      badgeBg: 'bg-[#F97316]/5',
      badgeText: 'text-[#F97316]',
      border: 'border-[#F97316]/10',
      ring: 'ring-[#F97316]',
      btnStyle: 'border border-[#F97316] text-[#F97316] bg-transparent hover:bg-[#F97316]/5',
      features: [
        'Tudo do Premium',
        'Multi-Empresas',
        'Workflows Personalizados',
        'Suporte Prioritário 24/7',
        'SLA Garantido'
      ]
    },
    {
      id: 'omnichannel',
      name: 'OMNICHANNEL',
      desc: 'Organizações com múltiplos canais, PDVs e operação nacional.',
      priceMonthly: '2.999,90',
      baseUsers: 'Usuários ilimitados',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742a3 3 0 00-2.482.358L4.05 12.51c-.694.423-1.05 1.173-1.05 1.94 0 1.258.948 2.298 2.2 2.298h3.333c.694 0 1.343-.314 1.777-.853l2.846-3.52c.434-.539 1.083-.853 1.777-.853h3.333c1.252 0 2.2-1.04 2.2-2.298 0-.767-.356-1.517-1.05-1.94l-2.152-1.41a3 3 0 00-2.482-.358L12 7.5l-3.316-2.584z" />
        </svg>
      ),
      color: '#7C3AED',
      badgeBg: 'bg-[#7C3AED]/15',
      badgeText: 'text-[#A78BFA]',
      border: 'border-slate-800',
      ring: 'ring-[#7C3AED]',
      btnStyle: 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white border-0 shadow-lg',
      features: [
        'Tudo do Enterprise',
        'Marketplace & Plugins',
        'API & Webhooks Ilimitados',
        'Infraestrutura Dedicada',
        'Customer Success Manager'
      ]
    }
  ];

  const textTitle = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSec = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const cardClass = theme === 'dark' ? 'bg-[#1E293B]/70 border-[#334155]' : 'bg-white border-slate-200';

  return (
    <div className="space-y-6 animate-fadeIn text-left max-w-7xl mx-auto">
      
      {/* Header com Ícone de Coroa */}
      <div className="flex items-center space-x-4 mb-5 pb-4 border-b border-slate-200 dark:border-white/5">
        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-700 dark:text-white shrink-0">
          <Crown className="w-6 h-6 text-[#F97316]" />
        </div>
        <div>
          <h2 className={`text-xl font-bold ${textTitle} mb-0`}>Planos & Upgrades</h2>
          <p className={`text-xs ${textSec} mb-0`}>Escolha o plano ideal para o seu negócio e escale suas operações com eficiência.</p>
        </div>
      </div>

      {/* Grid de 5 Cards de Planos em 5 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6">
        {plansCatalog.map((planItem) => (
          <PricingCard 
            key={planItem.id} 
            planItem={planItem} 
            price={planItem.priceMonthly} 
            isActive={plan === planItem.id} 
            cardClass={cardClass} 
            textTitle={textTitle} 
            textSec={textSec} 
            onSelect={() => {
              setPlan(planItem.id);
              triggerToast(
                planItem.id === 'omnichannel' ? "Contato comercial" : "Upgrade de Plano", 
                planItem.id === 'omnichannel'
                  ? `Seu interesse no plano Omnichannel foi registrado. Um especialista entrará em contato.`
                  : `Seu plano foi alterado com sucesso para ${planItem.name}!`
              );
            }} 
          />
        ))}
      </div>

      {/* Tabela de Comparativo Geral com Ícones */}
      <PricingComparison cardClass={cardClass} textTitle={textTitle} />

      {/* Rodapé de Informações */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 pt-3 border-t border-slate-200 dark:border-white/5">
        <span className="mb-2 sm:mb-0">🔒 Dados protegidos com criptografia de ponta a ponta.</span>
        <span>Todos os planos incluem atualizações contínuas e novas funcionalidades.</span>
      </div>

    </div>
  );
}
