import React, { useState } from 'react';
import {
  Users,
  Building,
  DollarSign,
  Megaphone,
  Headphones,
  BarChart3,
  FileSpreadsheet,
  Zap,
  Sparkles,
  Plug,
  Search,
} from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { catalogApps, AppDefinition } from '../config/apps';
import { ModuleCard } from '../components/diskhub/ModuleCard';
import { PageHeader } from '../components/ui/PageHeader';

export function AppsPage() {
  const { subscription } = useAppContext();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  const currentPlan = subscription?.plan || 'advanced';

  const iconMap: Record<string, React.ReactNode> = {
    crm: <Users className="w-5 h-5 text-blue-400" />,
    erp: <Building className="w-5 h-5 text-indigo-400" />,
    financeiro: <DollarSign className="w-5 h-5 text-emerald-400" />,
    marketing: <Megaphone className="w-5 h-5 text-cyan-400" />,
    sac: <Headphones className="w-5 h-5 text-purple-400" />,
    bi: <BarChart3 className="w-5 h-5 text-amber-400" />,
    contabilidade: <FileSpreadsheet className="w-5 h-5 text-blue-400" />,
    automacao: <Zap className="w-5 h-5 text-amber-400" />,
    ia: <Sparkles className="w-5 h-5 text-purple-400" />,
    integracoes: <Plug className="w-5 h-5 text-emerald-400" />,
  };

  const isModuleUnlocked = (tier: 'standard' | 'advanced' | 'expert') => {
    if (currentPlan === 'expert') return true;
    if (currentPlan === 'advanced') return tier === 'standard' || tier === 'advanced';
    return tier === 'standard';
  };

  const filteredApps = catalogApps.filter((app: AppDefinition) => {
    const matchesSearch =
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.description.toLowerCase().includes(search.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'unlocked') return matchesSearch && isModuleUnlocked(app.tier);
    if (activeTab === 'upgrade') return matchesSearch && !isModuleUnlocked(app.tier);
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        title="Central de Apps"
        description="Explore e gerencie os aplicativos que compõem o ecossistema da sua produtora."
      />

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-[#111721] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Todos os Apps
          </button>
          <button
            onClick={() => setActiveTab('unlocked')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'unlocked'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-[#111721] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Ativos no Plano
          </button>
          <button
            onClick={() => setActiveTab('upgrade')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'upgrade'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-[#111721] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Disponíveis para Upgrade
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrar aplicativos..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#111721] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApps.map((app: AppDefinition) => (
          <ModuleCard
            key={app.id}
            id={app.id}
            name={app.name}
            description={app.description}
            tier={app.tier}
            isUnlocked={isModuleUnlocked(app.tier)}
            path={app.path}
            icon={iconMap[app.id] || <Users className="w-5 h-5 text-slate-400" />}
          />
        ))}
      </div>
    </div>
  );
}
