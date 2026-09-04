import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, ArrowRight, Layers, Users } from 'lucide-react';
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
      className="p-5 rounded-2xl bg-[#111721] border border-white/[0.08] flex flex-col justify-between shadow-sm relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Plano Atual
              </span>
              <span className="text-base font-black text-white tracking-tight">
                DiskHub {planName}
              </span>
            </div>
          </div>
          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            ATIVO
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Recursos comerciais, BI e canais de atendimento habilitados para sua equipe.
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center space-x-2">
            <Layers className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">{activeAppsCount} Apps</span>
              <span className="text-[10px] text-slate-400 block">Contratados</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center space-x-2">
            <Users className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">{usersCount} Usuários</span>
              <span className="text-[10px] text-slate-400 block">Ativos</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/app/assinatura')}
        className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 flex items-center justify-between cursor-pointer transition-all"
      >
        <span>Ver minha assinatura</span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
      </button>
    </div>
  );
}
