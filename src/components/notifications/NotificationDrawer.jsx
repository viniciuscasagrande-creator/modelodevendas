import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDiskHub } from '../../context/DiskHubContext';
import { notificationService } from '../../services/notificationService';
import NotificationItem from './NotificationItem';
import { 
  X, 
  CheckCheck, 
  Bell, 
  ExternalLink, 
  Inbox, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

export default function NotificationDrawer({ isOpen, onClose }) {
  const { navigateTo, bgCard, borderCol, textTitle, textSec } = useDiskHub();
  const [tab, setTab] = useState('all'); // 'all' | 'unread' | 'critical'
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const drawerRef = useRef(null);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationService.getNotifications({ status: tab });
      setNotifications(data);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar as notificações.');
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen, loadNotifications]);

  // Listener para atualização reativa
  useEffect(() => {
    const unsub = notificationService.subscribe(() => {
      if (isOpen) {
        loadNotifications();
      }
    });
    return unsub;
  }, [isOpen, loadNotifications]);

  // Suporte a ESC para fechar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleMarkAsRead = async (id) => {
    await notificationService.markAsRead(id);
    loadNotifications();
  };

  const handleArchive = async (id) => {
    await notificationService.archiveNotification(id);
    loadNotifications();
  };

  const handleMarkAllAsRead = async () => {
    await notificationService.markAllAsRead();
    loadNotifications();
  };

  const handleNavigate = (route, id) => {
    handleMarkAsRead(id);
    onClose();
    navigateTo(route);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden" 
      aria-labelledby="notification-drawer-title" 
      role="dialog" 
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          ref={drawerRef}
          data-testid="notification-drawer"
          className={`w-screen max-w-md ${bgCard} border-l ${borderCol} shadow-2xl flex flex-col justify-between animate-slideLeft`}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-[#F97316] flex items-center justify-center">
                <Bell className="w-4 h-4 font-bold" />
              </div>
              <div>
                <h3 id="notification-drawer-title" className={`text-sm font-black ${textTitle} mb-0`}>
                  Notificações
                </h3>
                <span className="text-[10px] text-slate-400">
                  Alertas e comunicações operacionais
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                type="button"
                data-testid="notification-read-all"
                onClick={handleMarkAllAsRead}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-blue-500 border-0 bg-transparent cursor-pointer transition-colors"
                title="Marcar todas como lidas"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-slate-700 dark:hover:text-white border-0 bg-transparent cursor-pointer transition-colors"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tabs Filter */}
          <div className="px-4 pt-3 pb-2 border-b border-slate-100 dark:border-white/5 flex items-center space-x-2">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'unread', label: 'Não lidas' },
              { id: 'critical', label: 'Críticas' }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border-0 cursor-pointer transition-all ${
                  tab === t.id
                    ? 'bg-[#F97316] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {loading ? (
              // Skeletons
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="p-3 rounded-xl border border-slate-200 dark:border-white/5 animate-pulse space-y-2">
                    <div className="h-3 bg-slate-200 dark:bg-white/10 rounded w-1/3" />
                    <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 dark:bg-white/10 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : error ? (
              // Error State
              <div className="p-6 text-center space-y-3">
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-xs text-slate-500">{error}</p>
                <button
                  type="button"
                  onClick={loadNotifications}
                  className="px-4 py-1.5 rounded-lg bg-[#F97316] text-white text-xs font-bold border-0 cursor-pointer shadow-xs inline-flex items-center space-x-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Tentar novamente</span>
                </button>
              </div>
            ) : notifications.length === 0 ? (
              // Empty State
              <div className="py-12 text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-400 flex items-center justify-center mx-auto">
                  <Inbox className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-0">
                  Nenhuma notificação por aqui.
                </h4>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Quando algo importante acontecer, você verá nesta área.
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  notification={notif}
                  onMarkAsRead={handleMarkAsRead}
                  onArchive={handleArchive}
                  onNavigate={handleNavigate}
                />
              ))
            )}
          </div>

          {/* Footer Link */}
          <div className="p-3.5 border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 text-center">
            <button
              type="button"
              onClick={() => {
                onClose();
                navigateTo('/notificacoes');
              }}
              className="w-full py-2 rounded-xl bg-white dark:bg-[#1E293B] hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-white/10 cursor-pointer shadow-2xs flex items-center justify-center space-x-1.5 transition-all"
            >
              <span>Ver todas as notificações</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
