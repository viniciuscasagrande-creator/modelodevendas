import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Shield } from 'lucide-react';
import { officialPlans } from '../config/plans';
import { Badge } from '../components/ui/Badge';
import { useAppContext } from '../hooks/useAppContext';
import { Plan } from '../types/plans';

export function PlansPage() {
  const [searchParams] = useSearchParams();
  const highlight = searchParams.get('highlight') || searchParams.get('select');
  const { subscription } = useAppContext();
  const navigate = useNavigate();

  const currentPlan = subscription?.plan || 'advanced';

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <div className="text-center max-w-2xl mx-auto pt-4">
        <Badge variant="primary" className="mb-3">
          Planos Oficiais DiskHub
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Planos projetados para a escala do seu negócio
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Desde operações independentes até grandes festivais e produtoras nacionais.
          Escolha o nível de controle e automação adequado ao seu momento.
        </p>
      </div>

      {/* 3 Tier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
        {officialPlans.map((plan: Plan) => {
          const isCurrent = currentPlan === plan.id;
          const isHighlighted = highlight === plan.id || plan.popular;

          return (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl flex flex-col justify-between transition-all relative ${
                isHighlighted
                  ? 'bg-gradient-to-b from-[#131b2e] to-[#111721] border-2 border-blue-500/60 shadow-xl shadow-blue-500/10'
                  : 'bg-[#111721] border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
                  MAIS RECOMENDADO
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-black text-white tracking-tight">{plan.name}</h3>
                  {isCurrent && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      SEU PLANO ATUAL
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-black text-white">{plan.price}</div>
                  <div className="text-xs font-semibold text-blue-400 mt-1">{plan.tagline}</div>
                </div>

                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="space-y-2.5 mb-8 text-xs">
                  <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block mb-1">
                    Recursos Inclusos:
                  </span>
                  {plan.features.map((feat: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-2 text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    if (isCurrent) {
                      navigate('/app/assinatura');
                    } else {
                      navigate(`/app/assinatura?upgrade=${plan.id}`);
                    }
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <span>{isCurrent ? 'Gerenciar Plano' : plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Strip */}
      <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-[#111721] border border-white/[0.08]">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-5 h-5 text-blue-400" />
          <h4 className="text-sm font-black text-white">Garantias DiskHub Business</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div>
            <span className="font-bold text-slate-200 block mb-1">SLA 99.9% Operacional</span>
            <span>Alta disponibilidade garantida mesmo em picos de abertura de vendas.</span>
          </div>
          <div>
            <span className="font-bold text-slate-200 block mb-1">Conciliação D+2</span>
            <span>Relatórios financeiros consolidados e auditados automaticamente.</span>
          </div>
          <div>
            <span className="font-bold text-slate-200 block mb-1">Suporte Especializado</span>
            <span>Atendimento humano focado nas necessidades da produção de eventos.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
