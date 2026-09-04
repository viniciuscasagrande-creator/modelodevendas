import React from 'react';

export default function NotificationBadge({ count }) {
  if (!count || count <= 0) return null;

  const displayCount = count > 99 ? '99+' : count;

  return (
    <span 
      data-testid="notification-badge"
      className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center shadow-md border-2 border-white dark:border-[#111827] animate-scaleIn pointer-events-none"
    >
      {displayCount}
    </span>
  );
}
