import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in DiskHub application:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/app/dashboard';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b0e13] text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#111721] border border-rose-500/20 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-black text-white mb-2">Algo inesperado aconteceu</h2>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Ocorreu uma falha na renderização deste módulo. A sessão foi preservada e você pode retornar com segurança.
            </p>
            {this.state.error && (
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-rose-300 mb-6 text-left break-all max-h-32 overflow-y-auto">
                {this.state.error.message}
              </div>
            )}
            <div className="flex items-center justify-center space-x-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.location.reload()}
                className="flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recarregar</span>
              </Button>
              <Button
                size="sm"
                onClick={this.handleReset}
                className="flex items-center space-x-1.5"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Ir para o Dashboard</span>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
