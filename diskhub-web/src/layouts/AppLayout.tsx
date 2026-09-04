import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DiskHubSidebar } from '../components/diskhub/DiskHubSidebar';
import { DiskHubHeader } from '../components/diskhub/DiskHubHeader';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full max-w-full bg-[#0b0e13] text-slate-100 flex flex-col lg:flex-row overflow-x-hidden">
      {/* Official Sidebar */}
      <DiskHubSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full overflow-x-hidden">
        <DiskHubHeader onToggleSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fadeIn overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
