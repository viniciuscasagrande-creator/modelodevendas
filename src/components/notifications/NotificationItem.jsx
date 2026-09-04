import React from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Check, 
  Archive, 
  ExternalLink,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from '../../utils/dateUtils';

export default function NotificationItem({ 
  notification, 
  onMarkAsRead, 
  onArchive, 
  onNavigate 
}) {
  const isUnread = notification.status === 'unread';

  const getSeverityStyle = (sev) => {
    switch (sev) {
      case 'critical':
        return {
          border: 'border-l-4 border-l-red-500 border-red-200 dark:border-red-500/20 bg-red-50/40 dark:bg-red-500/5',
          icon: <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />,
          badge: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
        };
      case 'warning':
        return {
          border: 'border-l-4 border-l-amber-500 border-amber-200 dark:border-amber-500/20 bg-amber-50/40 dark:bg-amber-500/5',
          icon: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />,
          badge: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
        };
      case 'success':
        return {
          border: 'border-l-4 border-l-emerald-500 border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-500/5',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />,
          badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
        };
      default:
        return {
          border: 'border-l-4 border-l-blue-500 border-slate-200 dark:border-white/5 bg-slate-50/40 dark:bg-white/5',
          icon: <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />,
          badge: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
        };
    }
  };

  const style = getSeverityStyle(notification.severity);

  return (
    <div 
      data-testid="notification-item"
      className={`p-3 rounded-xl border transition-all text-xs flex flex-col gap-2 ${style.border} ${
        isUnread ? 'shadow-xs' : 'opacity-85'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start space-x-2.5 min-w-0">
          {style.icon}
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5 flex-wrap">
              <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${style.badge}`}>
                {notification.appId?.toUpperCase()}
              </span>
              {isUnread && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
              )}
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1 mb-0.5 leading-snug">
              {notification.title}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-0">
              {notification.message}
            </p>
          </div>
        </div>
      </div>

      {/* Footer com Horário e Ações */}
      <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-white/5 text-[10px] text-slate-400">
        <span className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{formatDistanceToNow(notification.createdAt)}</span>
        </span>

        <div className="flex items-center space-x-1.5">
          {isUnread && (
            <button
              type="button"
              onClick={() => onMarkAsRead(notification.id)}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 font-semibold flex items-center space-x-1 cursor-pointer border-0 bg-transparent transition-colors"
              title="Marcar como lida"
            >
              <Check className="w-3 h-3 text-blue-500" />
              <span className="text-[10px]">Lida</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onArchive(notification.id)}
            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer border-0 bg-transparent transition-colors"
            title="Arquivar"
          >
            <Archive className="w-3 h-3" />
          </button>

          {notification.route && (
            <button
              type="button"
              onClick={() => onNavigate(notification.route, notification.id)}
              className="px-2 py-0.5 rounded bg-white dark:bg-white/10 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-white/10 flex items-center space-x-1 cursor-pointer shadow-2xs"
            >
              <span>Abrir</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
