import React from 'react';

export default function PlanCTA({ planId, isActive, btnStyle, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`btn w-full py-2 text-[11px] font-bold rounded-lg cursor-pointer transition-all border-0 ${
        isActive
          ? 'bg-slate-400 text-white cursor-not-allowed'
          : btnStyle
      }`}
    >
      {isActive 
        ? 'Plano Atual' 
        : planId === 'omnichannel' 
          ? 'Falar com especialista' 
          : 'Selecionar Plano'}
    </button>
  );
}
