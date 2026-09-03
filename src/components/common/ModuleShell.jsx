import React, { Component } from 'react';
import { useDiskHub } from '../../context/DiskHubContext';
import { subscriptionService } from '../../services/subscriptionService';
import { appRegistry } from '../../config/apps';
import { 
  Boxes, 
  Building2, 
  AlertTriangle, 
  RotateCcw, 
  ChevronRight
} from 'lucide-react';

// Error Boundary for isolated module crash containment
class ModuleErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Module Error Boundary caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div data-testid="module-error" className="py-16 px-4 text-center max-w-md mx-auto animate-fadeIn font-sans">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-white mb-1">
            Não foi possível carregar este módulo
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Ocorreu uma instabilidade pontual nesta área operacional. Os demais módulos e a Central de Apps continuam ativos.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold border-0 cursor-pointer inline-flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tentar Novamente</span>
            </button>
            <button
              type="button"
              onClick={this.props.onBackToApps}
              className="px-4 py-2 rounded-xl bg-[#F97316] text-white text-xs font-bold border-0 cursor-pointer shadow-md"
            >
              Central de Apps
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ModuleShell({ appId, title, subtitle = null, children }) {
  const { navigateTo, setAppsOpen } = useDiskHub();
  const sub = subscriptionService.getSubscription();
  const appInfo = appRegistry[appId] || { name: title || 'Módulo', shortName: 'Módulo' };

  return (
    <div 
      data-testid="module-shell" 
      className={`space-y-4 animate-fadeIn font-sans module-${appId}`}
    >
      <div data-testid={`module-${appId}`}>
        
        {/* TOP CONTEXT BAR: Breadcrumbs + Tenant Badge + User Badge + App Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10 text-xs">
          
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-slate-400">
            <button
              type="button"
              onClick={() => navigateTo('/dashboard')}
              className="hover:text-slate-700 dark:hover:text-white bg-transparent border-0 cursor-pointer p-0 text-slate-400 font-semibold"
            >
              DiskHub
            </button>
            <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
            <span className="font-bold text-slate-900 dark:text-white">{appInfo.name}</span>
            {subtitle && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                <span className="text-slate-500">{subtitle}</span>
              </>
            )}
          </div>

          {/* Tenant & App Switcher Controls */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Tenant Badge */}
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[11px] font-bold text-slate-700 dark:text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-[#F97316]" />
              <span className="truncate max-w-[140px]">{sub.company?.tradeName || 'Prime Show'}</span>
            </div>

            {/* Quick App Switcher */}
            <button
              type="button"
              onClick={() => setAppsOpen(true)}
              className="px-3 py-1 rounded-lg bg-[#F97316]/10 hover:bg-[#F97316] text-[#F97316] hover:text-white text-xs font-bold border border-[#F97316]/20 cursor-pointer transition-all flex items-center space-x-1"
              title="Abrir Central de Apps"
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Apps</span>
            </button>
          </div>

        </div>

        {/* ISOLATED MODULE CONTENT WITH ERROR BOUNDARY */}
        <ModuleErrorBoundary onBackToApps={() => { navigateTo('/dashboard'); setAppsOpen(true); }}>
          <div className="pt-2">
            {children}
          </div>
        </ModuleErrorBoundary>

      </div>
    </div>
  );
}
