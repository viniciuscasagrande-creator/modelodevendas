import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Badge } from '../components/ui/Badge';
import { AppAccessGuard } from '../components/guards/AppAccessGuard';
import { useAppContext } from '../hooks/useAppContext';

interface ModulePlaceholderPageProps {
  moduleId: string;
  name: string;
  category: string;
  requiredTier: 'standard' | 'advanced' | 'expert';
  description: string;
  icon: ReactNode;
  children?: ReactNode;
}

export function ModulePlaceholderPage({
  moduleId,
  name,
  category,
  requiredTier,
  description,
  icon,
  children,
}: ModulePlaceholderPageProps) {
  const navigate = useNavigate();
  const { hasLicense } = useAppContext();
  const unlocked = hasLicense(moduleId);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <PageHeader
        title={name}
        description={description}
        badge={
          <Badge variant={unlocked ? 'success' : 'warning'}>
            {unlocked ? 'Módulo Habilitado' : `Plano ${requiredTier.toUpperCase()}`}
          </Badge>
        }
        actions={
          <button
            onClick={() => navigate('/app/dashboard')}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10 cursor-pointer transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Dashboard</span>
          </button>
        }
      />

      <AppAccessGuard app={moduleId}>
        <div className="space-y-6">
          {children || (
            <div className="p-8 rounded-2xl bg-[#111721] border border-white/[0.08] text-center max-w-xl mx-auto my-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4">
                {icon}
              </div>
              <h3 className="text-lg font-black text-white tracking-tight mb-2">{name}</h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                A integração deste módulo com o novo frontend está sendo preparada para a próxima fase.
                Os serviços de backend e contratos já estão validados.
              </p>
              <button
                onClick={() => navigate('/app/dashboard')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/25 cursor-pointer"
              >
                Voltar ao Dashboard
              </button>
            </div>
          )}
        </div>
      </AppAccessGuard>
    </div>
  );
}
