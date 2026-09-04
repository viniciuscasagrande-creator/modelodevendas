import React, { Component } from 'react';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('💥 [AppErrorBoundary caught an exception]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoDashboard = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onNavigate) {
      this.props.onNavigate('/dashboard');
    } else {
      window.location.href = '/dashboard';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div data-testid="app-error-boundary" className="min-h-[420px] w-full flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-[#111827] border border-red-500/30 rounded-3xl p-8 text-center shadow-2xl space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto shadow-md">
              <AlertOctagon className="w-8 h-8 font-black" />
            </div>

            <div>
              <h2 className="text-xl font-black text-white tracking-tight mb-1">
                Não foi possível carregar esta área
              </h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed mb-0">
                Ocorreu uma falha inesperada na renderização. A integridade dos seus dados e dos outros módulos foi preservada.
              </p>
            </div>

            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-left overflow-x-auto text-[10px] font-mono text-red-400 max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border-0 cursor-pointer flex items-center space-x-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Tentar novamente</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoDashboard}
                className="px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold border-0 cursor-pointer flex items-center space-x-2 shadow-md transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Voltar ao Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
