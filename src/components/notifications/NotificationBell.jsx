import React, { useState, useEffect, useCallback } from 'react';
import { Bell } from 'lucide-react';
import { notificationService } from '../../services/notificationService';
import NotificationBadge from './NotificationBadge';
import NotificationDrawer from './NotificationDrawer';

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchUnread = useCallback(async () => {
    try {
      const count = await notificationService.getUnreadCount();
      setUnreadCount(count);
    } catch (err) {
      console.error('Falha ao carregar contagem de notificações:', err);
    }
  }, []);

  useEffect(() => {
    fetchUnread();

    // Inscrição reativa para atualizações instantâneas
    const unsub = notificationService.subscribe(() => {
      fetchUnread();
    });

    // Polling moderado a cada 60s conforme Etapa 41
    const interval = setInterval(fetchUnread, 60000);

    return () => {
      unsub();
      clearInterval(interval);
    };
  }, [fetchUnread]);

  return (
    <>
      <div className="relative">
        <button
          type="button"
          data-testid="notification-bell"
          aria-label="Notificações"
          onClick={() => setDrawerOpen(prev => !prev)}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#1E293B]/60 border border-slate-200 dark:border-white/5 cursor-pointer transition-all relative"
          title="Notificações"
        >
          <Bell className="w-4 h-4" />
          <NotificationBadge count={unreadCount} />
        </button>
      </div>

      {/* Drawer Overlay */}
      <NotificationDrawer 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
      />
    </>
  );
}
