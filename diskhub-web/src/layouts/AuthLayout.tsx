import React from 'react';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#0b0e13] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <main className="w-full max-w-md relative z-10">
        <Outlet />
      </main>

      <footer className="mt-8 text-center text-xs text-slate-500 relative z-10">
        <p>© 2026 DiskHub Business Cloud. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
