import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowUpRight,
  CheckCircle,
} from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { PageHeader } from '../components/ui/PageHeader';
import { Badge } from '../components/ui/Badge';
import { formatCurrency } from '../utils/formatters';
import { AppEntitlement } from '../types/context';

export function SubscriptionPage() {
  const { subscription, tenant, apps } = useAppContext();
  const [searchParams] = useSearchParams();
  const upgradeTarget = searchParams.get('upgrade');
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <PageHeader
        title="Minha Assinatura"
        description="Gestão de contrato, licenças ativas, usuários autorizados e faturamento."
        badge={<Badge variant="success">Assinatura Ativa</Badge>}
        actions={
          <button
            onClick={() => navigate('/app/planos')}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-all shadow-xs"
          >
            <span>Alterar Plano</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        }
      />

      {upgradeTarget && (
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-300 flex items-center justify-between">
          <span>
            Você selecionou o plano <strong>{upgradeTarget.toUpperCase()}</strong>. Deseja confirmar o upgrade com faturamento pro-rata?
          </span>
          <button
            onClick={() => alert(`Upgrade para ${upgradeTarget} simulado com sucesso!`)}
            className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 cursor-pointer"
          >
            Confirmar Upgrade
          </button>
        </div>
      )}

      {/* Contract & Plan Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#111721] border border-white/[0.08]">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Plano Contratado
          </span>
          <h3 className="text-xl font-black text-white tracking-tight">
            DiskHub {subscription?.planName || 'Advanced'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {formatCurrency(subscription?.monthlyPrice || 890)} / mês ({subscription?.billingCycle || 'mensal'})
          </p>
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
            <span>Próxima renovação:</span>
            <span className="font-mono text-slate-200">{subscription?.renewsAt || '01/10/2026'}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111721] border border-white/[0.08]">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Capacidade de Usuários
          </span>
          <h3 className="text-xl font-black text-white tracking-tight">
            {subscription?.usersCount || 12} / {subscription?.maxUsers || 25}
          </h3>
          <p className="text-xs text-slate-400 mt-1">Membros ativos na equipe</p>
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
            <span>Slots disponíveis:</span>
            <span className="font-mono text-emerald-400 font-bold">
              {(subscription?.maxUsers || 25) - (subscription?.usersCount || 12)} vagas
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111721] border border-white/[0.08]">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Empresa / Tenant
          </span>
          <h3 className="text-lg font-black text-white tracking-tight truncate">
            {tenant?.name || 'Diskingressos'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-mono">{tenant?.document || '12.345.678/0001-90'}</p>
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
            <span>Status fiscal:</span>
            <span className="text-emerald-400 font-bold">Regular</span>
          </div>
        </div>
      </div>

      {/* Contracted Apps List */}
      <div className="p-5 rounded-2xl bg-[#111721] border border-white/[0.08]">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
          <h4 className="text-sm font-black text-white">Módulos Habilitados no Contrato</h4>
          <span className="text-xs text-slate-400">{apps.length} aplicativos mapeados</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {apps.map((app: AppEntitlement) => (
            <div
              key={app.id || app.app}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs"
            >
              <div className="flex items-center space-x-2.5">
                <CheckCircle className={`w-4 h-4 ${app.status === 'active' ? 'text-emerald-400' : 'text-slate-600'}`} />
                <span className="font-bold text-slate-200">{app.name}</span>
              </div>
              <Badge variant={app.status === 'active' ? 'success' : 'neutral'}>
                {app.status === 'active' ? 'ATIVO' : 'UPGRADE'}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices History Table */}
      <div className="p-5 rounded-2xl bg-[#111721] border border-white/[0.08]">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
          <h4 className="text-sm font-black text-white">Histórico de Faturas & Recibos</h4>
          <span className="text-xs text-slate-400">Faturamento recorrente</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-white/[0.06]">
                <th className="pb-2 font-bold">Fatura</th>
                <th className="pb-2 font-bold">Vencimento</th>
                <th className="pb-2 font-bold">Valor</th>
                <th className="pb-2 font-bold">Status</th>
                <th className="pb-2 font-bold text-right">Comprovante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-2.5 font-mono text-white">#INV-2026-09</td>
                <td className="py-2.5 text-slate-300">01/09/2026</td>
                <td className="py-2.5 font-mono text-white">R$ 890,00</td>
                <td className="py-2.5">
                  <Badge variant="success">Pago</Badge>
                </td>
                <td className="py-2.5 text-right">
                  <button className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer">
                    PDF ↵
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-white">#INV-2026-08</td>
                <td className="py-2.5 text-slate-300">01/08/2026</td>
                <td className="py-2.5 font-mono text-white">R$ 890,00</td>
                <td className="py-2.5">
                  <Badge variant="success">Pago</Badge>
                </td>
                <td className="py-2.5 text-right">
                  <button className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer">
                    PDF ↵
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
