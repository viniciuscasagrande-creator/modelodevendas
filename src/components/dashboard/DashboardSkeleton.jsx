import React from 'react';

export default function DashboardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-slate-200 dark:bg-white/5 rounded-xl w-full"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-28 bg-slate-200 dark:bg-white/5 rounded-xl"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 h-72 bg-slate-200 dark:bg-white/5 rounded-xl"></div>
        <div className="lg:col-span-1 h-72 bg-slate-200 dark:bg-white/5 rounded-xl"></div>
      </div>
    </div>
  );
}
