import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { authService } from '../services/authService';
import { useAppContext } from '../hooks/useAppContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const loginSchema = z.object({
  email: z.string().email('Insira um e-mail corporativo válido'),
  password: z.string().min(4, 'A senha deve ter no mínimo 4 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/app/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'vinicius@diskhub.com.br',
      password: 'admin',
    },
  });

  const { refreshContext } = useAppContext();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const response = await authService.login(data as any);
      if (response.success) {
        await refreshContext();
        navigate(from, { replace: true });
      } else {
        setServerError(response.error || 'Credenciais inválidas.');
      }
    } catch (err: any) {
      setServerError(err.message || 'Erro de autenticação com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-6 sm:p-8 rounded-2xl bg-[#111721] border border-white/[0.08] shadow-2xl">
      {/* Brand Icon & Heading */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-mono font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-600/30">
          D
        </div>
        <div className="flex items-center justify-center space-x-1.5">
          <span className="text-xl font-black tracking-tight text-white">DISKHUB</span>
          <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
            Cloud
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">Business Cloud para Gestão de Eventos</p>
      </div>

      <div className="mb-5">
        <h2 className="text-base font-bold text-white mb-1">Entre na sua conta</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Acesse os módulos contratados da sua produtora.
        </p>
      </div>

      {serverError && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center space-x-2 text-xs text-rose-300 mb-4">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            id="email"
            type="email"
            label="E-mail corporativo"
            placeholder="seu.email@produtora.com.br"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div>
          <Input
            id="password"
            type="password"
            label="Senha de acesso"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full flex items-center justify-center space-x-2 py-2.5"
          >
            <span>Entrar no DiskHub</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Sessão segura 256-bit</span>
        </span>
        <button
          type="button"
          onClick={() => navigate('/app/planos')}
          className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
        >
          Conhecer planos
        </button>
      </div>
    </div>
  );
}
