import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, ArrowRight } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';

export function CurrentPlanCard() {
  const { subscription } = useAppContext();
  const navigate = useNavigate();

  const planName = subscription?.planName || 'Advanced';
  const usersCount = subscription?.usersCount || 12;
  const activeAppsCount = subscription?.activeAppsCount || 6;

  return (
    <div
      data-testid="current-plan-card"
      className="p-5 rounded-2xl bg-[#111721] border border-white/[0.08] flex flex-col justify-between shadow-sm relative overflow-hidden h-full"
    >
      <div className="space-y-3">
        {/* Plan Header */}
        <div className="flex items-start space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-purple-600/25">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">
              Você está no plano
            </span>
            <span className="text-xl font-black text-white tracking-tight block">
              <span className="sr-only">DiskHub </span>{planName}
            </span>
          </div>
        </div>

        {/* Stats line */}
        <p className="text-xs text-slate-300 font-medium pt-1">
          {activeAppsCount} apps ativos • {usersCount} usuários
        </p>

        {/* Usage Progress Bar */}
        <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
            style={{ width: '50%' }}
          />
        </div>
      </div>

      {/* Footer: Next billing + CTA */}
      <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-slate-400 font-medium block">
            Próxima cobrança
          </span>
          <span className="text-xs font-bold text-slate-200 block">
            15 de jan. de 2026
          </span>
        </div>

        <button
          onClick={() => navigate('/app/assinatura')}
          className="px-3 py-2 rounded-xl bg-[#172338] hover:bg-[#1e2f4c] text-white text-xs font-bold border border-blue-500/20 flex items-center space-x-1.5 cursor-pointer transition-all shrink-0"
        >
          <span>Ver minha assinatura</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
