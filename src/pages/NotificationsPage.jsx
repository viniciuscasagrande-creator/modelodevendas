import React, { useState, useEffect, useCallback } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { notificationService } from '../services/notificationService';
import { alertService } from '../services/alertService';
import { activityService } from '../services/activityService';
import NotificationItem from '../components/notifications/NotificationItem';
import { 
  Bell, 
  AlertTriangle, 
  Activity, 
  Search, 
  CheckCheck, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  Inbox, 
  RefreshCw,
  Clock,
  ShieldCheck,
  Check,
  RotateCcw
} from 'lucide-react';
import { formatDistanceToNow } from '../utils/dateUtils';

export default function NotificationsPage() {
  const { navigateTo, bgCard, borderCol, textTitle, textSec, triggerToast } = useDiskHub();

  const [activeTab, setActiveTab] = useState('notifications'); // 'notifications' | 'alerts' | 'activity'

  // Notificações state
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Alertas state
  const [alerts, setAlerts] = useState([]);
  const [loadingAlerts, setLoadingAlerts] = useState(false);

  // Atividade state
  const [activities, setActivities] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(false);

  const loadNotificationsData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await notificationService.getNotifications({
        status: statusFilter,
        appId: moduleFilter,
        period: periodFilter,
        search: searchTerm
      });
      setNotifications(data);
    } catch (err) {
      console.error('Erro ao carregar notificações:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, moduleFilter, periodFilter, searchTerm]);

  const loadAlertsData = useCallback(async () => {
    setLoadingAlerts(true);
    try {
      const data = await alertService.getAlerts({ includeResolved: statusFilter === 'resolved' });
      setAlerts(data);
    } catch (err) {
      console.error('Erro ao carregar alertas:', err);
    } finally {
      setLoadingAlerts(false);
    }
  }, [statusFilter]);

  const loadActivityData = useCallback(async () => {
    setLoadingActivity(true);
    try {
      const data = await activityService.getActivity({ limit: 30 });
      setActivities(data);
    } catch (err) {
      console.error('Erro ao carregar atividades:', err);
    } finally {
      setLoadingActivity(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'notifications') {
      loadNotificationsData();
    } else if (activeTab === 'alerts') {
      loadAlertsData();
    } else if (activeTab === 'activity') {
      loadActivityData();
    }
  }, [activeTab, loadNotificationsData, loadAlertsData, loadActivityData]);

  // Sincronização reativa
  useEffect(() => {
    const unsubs = [
      notificationService.subscribe(() => {
        if (activeTab === 'notifications') loadNotificationsData();
      }),
      alertService.subscribe(() => {
        if (activeTab === 'alerts') loadAlertsData();
      }),
      activityService.subscribe(() => {
        if (activeTab === 'activity') loadActivityData();
      })
    ];
    return () => unsubs.forEach(u => u());
  }, [activeTab, loadNotificationsData, loadAlertsData, loadActivityData]);

  const handleMarkAllAsRead = async () => {
    await notificationService.markAllAsRead();
    triggerToast("Notificações", "Todas as notificações foram marcadas como lidas.");
    loadNotificationsData();
  };

  const handleAcknowledgeAlert = async (id) => {
    await alertService.acknowledgeAlert(id);
    triggerToast("Alerta Reconhecido", "Alerta marcado como reconhecido.");
    loadAlertsData();
  };

  const handleResolveAlert = async (id) => {
    try {
      await alertService.resolveAlert(id);
      triggerToast("Alerta Resolvido", "Condição operacional normalizada e alerta encerrado.");
      loadAlertsData();
    } catch (err) {
      triggerToast("Acesso Negado", err.message);
    }
  };

  return (
    <div data-testid="notifications-page" className="space-y-5 animate-fadeIn font-sans max-w-[1600px] mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200 dark:border-white/5">
        <div>
          <h1 className={`text-2xl font-black ${textTitle} tracking-tight mb-1 flex items-center space-x-2`}>
            <span>Central de Notificações & Alertas</span>
          </h1>
          <p className={`text-xs ${textSec} mb-0`}>
            Acompanhe comunicados, alertas operacionais e feed de atividades em tempo real.
          </p>
        </div>

        {activeTab === 'notifications' && (
          <button
            type="button"
            data-testid="notification-read-all"
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-white/5 cursor-pointer flex items-center space-x-2 transition-all self-start sm:self-auto shadow-2xs"
          >
            <CheckCheck className="w-4 h-4 text-blue-500" />
            <span>Marcar todas como lidas</span>
          </button>
        )}
      </div>

      {/* Main Tabs (Notificações, Alertas, Atividade) */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-white/5 pb-2">
        <button
          type="button"
          data-testid="tab-notificacoes"
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold border-0 cursor-pointer flex items-center space-x-2 transition-all ${
            activeTab === 'notifications'
              ? 'bg-[#F97316] text-white shadow-sm'
              : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notificações</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
            {notifications.filter(n => n.status === 'unread').length}
          </span>
        </button>

        <button
          type="button"
          data-testid="tab-alertas"
          onClick={() => setActiveTab('alerts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold border-0 cursor-pointer flex items-center space-x-2 transition-all ${
            activeTab === 'alerts'
              ? 'bg-[#F97316] text-white shadow-sm'
              : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Alertas Operacionais</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
            {alerts.filter(a => a.status === 'open').length}
          </span>
        </button>

        <button
          type="button"
          data-testid="tab-atividades"
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-2 rounded-xl text-xs font-bold border-0 cursor-pointer flex items-center space-x-2 transition-all ${
            activeTab === 'activity'
              ? 'bg-[#F97316] text-white shadow-sm'
              : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Feed de Atividade</span>
        </button>
      </div>

      {/* FILTER BAR (Apenas na aba de Notificações) */}
      {activeTab === 'notifications' && (
        <div className={`p-4 rounded-2xl ${bgCard} border ${borderCol} shadow-sm space-y-3`}>
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                data-testid="notifications-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar em títulos, mensagens e referências..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#F97316]"
              />
            </div>

            {/* Filter Selects */}
            <div className="flex items-center space-x-2 flex-wrap w-full md:w-auto" data-testid="notifications-filter">
              {/* Status */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-bold focus:outline-none"
              >
                <option value="all">Status: Todos</option>
                <option value="unread">Não lidas</option>
                <option value="read">Lidas</option>
                <option value="alert">Alertas</option>
                <option value="critical">Críticas</option>
                <option value="archived">Arquivadas</option>
              </select>

              {/* Módulo */}
              <select
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-bold focus:outline-none"
              >
                <option value="all">Módulos: Todos</option>
                <option value="Financeiro">Financeiro</option>
                <option value="CRM">CRM</option>
                <option value="ERP">ERP</option>
                <option value="Marketing">Marketing</option>
                <option value="SAC">SAC 360º</option>
                <option value="BI">BI & Analytics</option>
                <option value="Contabilidade">Contabilidade</option>
                <option value="Automação">Automação</option>
                <option value="IA">Disk AI</option>
                <option value="Integrações">Integrações</option>
                <option value="Sistema">Sistema</option>
              </select>

              {/* Período */}
              <select
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-bold focus:outline-none"
              >
                <option value="all">Período: Todos</option>
                <option value="today">Hoje</option>
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 1. NOTIFICAÇÕES */}
      {activeTab === 'notifications' && (
        <div className="space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className={`p-4 rounded-2xl ${bgCard} border ${borderCol} animate-pulse space-y-2`}>
                  <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-1/4" />
                  <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div data-testid="notifications-empty" className={`p-12 text-center rounded-2xl ${bgCard} border ${borderCol} space-y-3`}>
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-400 flex items-center justify-center mx-auto">
                <Inbox className="w-7 h-7" />
              </div>
              <h3 className={`text-sm font-bold ${textTitle} mb-0`}>
                Nenhuma notificação por aqui.
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-0">
                Quando algo importante acontecer, você verá nesta área.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {notifications.map(n => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onMarkAsRead={async (id) => {
                    await notificationService.markAsRead(id);
                    loadNotificationsData();
                  }}
                  onArchive={async (id) => {
                    await notificationService.archiveNotification(id);
                    loadNotificationsData();
                  }}
                  onNavigate={(route, id) => {
                    notificationService.markAsRead(id);
                    navigateTo(route);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 2. ALERTAS OPERACIONAIS */}
      {activeTab === 'alerts' && (
        <div data-testid="alerts-panel" className="space-y-3">
          {loadingAlerts ? (
            <div className="space-y-3">
              {[1, 2, 3].map(n => (
                <div key={n} className={`p-4 rounded-2xl ${bgCard} border ${borderCol} animate-pulse space-y-2`}>
                  <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-1/3" />
                  <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : alerts.length === 0 ? (
            <div className={`p-12 text-center rounded-2xl ${bgCard} border ${borderCol} space-y-3`}>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className={`text-sm font-bold ${textTitle} mb-0`}>
                Nenhum alerta aberto.
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-0">
                Sua operação está sem alertas ativos no momento.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map(alt => {
                const isCrit = alt.severity === 'critical';
                const isWarn = alt.severity === 'warning';
                return (
                  <div
                    key={alt.id}
                    data-testid="alert-item"
                    className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                      isCrit 
                        ? 'border-red-300 dark:border-red-500/30 bg-red-50/40 dark:bg-red-500/5' 
                        : (isWarn 
                          ? 'border-amber-300 dark:border-amber-500/30 bg-amber-50/40 dark:bg-amber-500/5' 
                          : 'border-blue-300 dark:border-blue-500/30 bg-blue-50/40 dark:bg-blue-500/5')
                    }`}
                  >
                    <div className="flex items-start space-x-3 min-w-0">
                      <div className={`p-2 rounded-xl mt-0.5 ${
                        isCrit ? 'bg-red-500/10 text-red-500' : (isWarn ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500')
                      }`}>
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isCrit ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                          }`}>
                            {alt.severity}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {formatDistanceToNow(alt.createdAt)}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase">
                            • {alt.appId}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 mb-0.5">
                          {alt.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-0 leading-relaxed">
                          {alt.message}
                        </p>
                      </div>
                    </div>

                    {/* Botões de Ação do Alerta */}
                    <div className="flex items-center space-x-2 self-end md:self-auto shrink-0">
                      {alt.status === 'open' && (
                        <button
                          type="button"
                          data-testid="alert-acknowledge"
                          onClick={() => handleAcknowledgeAlert(alt.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-white/10 cursor-pointer transition-colors"
                        >
                          Reconhecer
                        </button>
                      )}

                      <button
                        type="button"
                        data-testid="alert-resolve"
                        onClick={() => handleResolveAlert(alt.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold border-0 cursor-pointer shadow-sm flex items-center space-x-1 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Resolver</span>
                      </button>

                      {alt.route && (
                        <button
                          type="button"
                          onClick={() => navigateTo(alt.route)}
                          className="px-3 py-1.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold border-0 cursor-pointer shadow-sm transition-colors"
                        >
                          Ver no Módulo
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 3. FEED DE ATIVIDADE */}
      {activeTab === 'activity' && (
        <div data-testid="activity-feed" className={`p-5 rounded-2xl ${bgCard} border ${borderCol} shadow-sm space-y-4`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
            <h3 className={`text-sm font-bold ${textTitle} mb-0`}>
              Histórico Operacional Recente
            </h3>
            <span className="text-[11px] text-slate-400">
              {activities.length} eventos registrados
            </span>
          </div>

          {loadingActivity ? (
            <div className="space-y-3">
              {[1, 2, 3].map(n => (
                <div key={n} className="h-8 bg-slate-200 dark:bg-white/10 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {activities.map((act) => (
                <div
                  key={act.id}
                  data-testid="activity-item"
                  className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 dark:text-white truncate">
                          {act.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          • {formatDistanceToNow(act.createdAt)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-0 truncate">
                        {act.description} • Por <strong>{act.actorName}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {act.amount && (
                      <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                        {act.amount}
                      </span>
                    )}
                    {act.route && (
                      <button
                        type="button"
                        onClick={() => navigateTo(act.route)}
                        className="text-[10px] font-bold text-[#F97316] hover:underline bg-transparent border-0 cursor-pointer"
                      >
                        Abrir
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
