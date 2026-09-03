import React from 'react';
import { Card } from '../ui/Card';
import PlanCTA from './PlanCTA';

export default function PricingCard({ 
  planItem, 
  price, 
  isActive, 
  cardClass, 
  textTitle, 
  textSec, 
  onSelect 
}) {
  const isOmni = planItem.id === 'omnichannel';

  return (
    <Card 
      className={`card ${cardClass} p-4 h-100 flex flex-col justify-between border border-slate-200 dark:border-white/5 shadow-sm relative ${
        isOmni ? 'bg-[#0B0D16] border-slate-800 text-white' : ''
      } ${isActive ? `ring-2 ${planItem.ring}` : ''}`}
    >
      {planItem.id === 'profissional' && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">Mais escolhido</span>
      )}
      {isOmni && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#7C3AED] text-white text-[7.5px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Todos os Recursos</span>
      )}

      <div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 ${
          isOmni ? 'bg-white/10 text-[#A78BFA]' : `${planItem.badgeBg} ${planItem.badgeText}`
        }`}>
          <span>{planItem.icon}</span>
        </div>
        
        <span className={`text-[10px] font-black uppercase tracking-wider block ${
          isOmni ? 'text-[#A78BFA]' : planItem.badgeText
        }`}>
          {planItem.name}
        </span>
        
        <p className={`text-[10px] mt-1 mb-3 h-8 ${
          isOmni ? 'text-slate-400' : textSec
        }`}>{planItem.desc}</p>
        
        {/* Price block */}
        <div className={`rounded-xl p-3 mb-4 border ${
          isOmni 
            ? 'bg-[#7C3AED]/15 border-[#7C3AED]/20 text-white' 
            : `${planItem.badgeBg} ${planItem.border}`
        }`}>
          <div className="flex items-baseline">
            <span className={`text-[10px] font-bold mr-1 ${
              isOmni ? 'text-[#A78BFA]' : planItem.badgeText
            }`}>R$</span>
            <span className={`text-xl font-black ${
              isOmni ? 'text-white' : textTitle
            }`}>{price}</span>
            <span className={`text-[9px] ml-1 ${
              isOmni ? 'text-[#A78BFA]' : 'text-slate-450'
            }`}>/mês</span>
          </div>
          <span className={`block text-[9.5px] mt-1 ${
            isOmni ? 'text-slate-300' : 'text-slate-500'
          }`}>
            {isOmni ? 'Usuários ilimitados' : `${planItem.baseUsers} usuários inclusos`}
          </span>
        </div>
        
        <hr className={isOmni ? 'border-white/10 my-3' : 'border-slate-100 dark:border-white/5 my-3'} />
        
        <ul className="space-y-2.5 text-xs list-unstyled pl-0 mb-4">
          {planItem.features.map((feature, fIdx) => (
            <li key={fIdx} className="flex items-center space-x-2.5">
              <span 
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{ 
                  backgroundColor: isOmni ? 'rgba(167, 139, 250, 0.15)' : `${planItem.color}20`,
                  color: isOmni ? '#A78BFA' : planItem.color 
                }}
              >
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className={`text-[10.5px] truncate ${isOmni ? 'text-slate-300' : 'text-slate-700 dark:text-slate-350'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <PlanCTA 
        planId={planItem.id} 
        isActive={isActive} 
        btnStyle={planItem.btnStyle} 
        onClick={onSelect} 
      />
    </Card>
  );
}
