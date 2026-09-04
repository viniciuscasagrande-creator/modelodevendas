import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface ModuleCardProps {
  id: string;
  name: string;
  description: string;
  tier: 'standard' | 'advanced' | 'expert';
  isUnlocked: boolean;
  path: string;
  icon: ReactNode;
}

export function ModuleCard({
  name,
  description,
  tier,
  isUnlocked,
  path,
  icon,
}: ModuleCardProps) {
  const navigate = useNavigate();

  return (
    <div className="p-5 rounded-2xl bg-[#111721] border border-white/[0.08] hover:border-white/15 transition-all flex flex-col justify-between shadow-sm group">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 border border-white/10 group-hover:scale-105 transition-transform">
            {icon}
          </div>
          <Badge variant={isUnlocked ? 'success' : 'neutral'}>
            {isUnlocked ? 'Ativo' : tier.toUpperCase()}
          </Badge>
        </div>

        <h3 className="text-sm font-black text-white tracking-tight mb-1">{name}</h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">{description}</p>
      </div>

      <button
        onClick={() => navigate(isUnlocked ? path : `/app/planos?highlight=${tier}`)}
        className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 flex items-center justify-between cursor-pointer transition-all"
      >
        <span className="flex items-center space-x-1.5">
          {isUnlocked ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acessar Módulo</span>
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Fazer Upgrade</span>
            </>
          )}
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
      </button>
    </div>
  );
}
