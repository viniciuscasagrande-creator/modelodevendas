import React from 'react';
import { useDiskHub, usersDatabase } from '../context/DiskHubContext';

export default function LoginPage() {
  const {
    setCurrentUser,
    setPlan,
    setMarketingModulesStatus,
    triggerToast
  } = useDiskHub();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get('email');
    const password = data.get('password');
    const foundUser = usersDatabase.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setCurrentUser(foundUser);
      setPlan(foundUser.plan);
      if (foundUser.plan === 'omnichannel') {
        setMarketingModulesStatus({
          1: true, 2: true, 3: true, 4: true, 5: true,
          6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true,
          13: true, 14: true, 15: true, 16: true, 17: true,
          18: true, 19: true, 20: true, 21: true
        });
      } else if (foundUser.plan === 'premium') {
        setMarketingModulesStatus({
          1: true, 2: true, 3: true, 4: true, 5: true,
          6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true,
          13: false, 14: false, 15: false, 16: false, 17: false,
          18: false, 19: false, 20: false, 21: false
        });
      } else if (foundUser.plan === 'profissional') {
        setMarketingModulesStatus({
          1: true, 2: true, 3: true, 4: true, 5: true,
          6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false,
          13: false, 14: false, 15: false, 16: false, 17: false,
          18: false, 19: false, 20: false, 21: false
        });
      } else {
        setMarketingModulesStatus({
          1: true, 2: true,
          3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false,
          13: false, 14: false, 15: false, 16: false, 17: false,
          18: false, 19: false, 20: false, 21: false
        });
      }
      triggerToast("Acesso Autorizado", `Bem-vindo de volta, ${foundUser.name}!`);
    } else {
      triggerToast("Erro de Acesso", "Usuário ou senha incorretos.", "error");
    }
  };

  const loginAsDemo = (usr) => {
    setCurrentUser(usr);
    setPlan(usr.plan);
    if (usr.plan === 'omnichannel') {
      setMarketingModulesStatus({
        1: true, 2: true, 3: true, 4: true, 5: true,
        6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true,
        13: true, 14: true, 15: true, 16: true, 17: true,
        18: true, 19: true, 20: true, 21: true
      });
    } else if (usr.plan === 'premium') {
      setMarketingModulesStatus({
        1: true, 2: true, 3: true, 4: true, 5: true,
        6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true,
        13: false, 14: false, 15: false, 16: false, 17: false,
        18: false, 19: false, 20: false, 21: false
      });
    } else if (usr.plan === 'profissional') {
      setMarketingModulesStatus({
        1: true, 2: true, 3: true, 4: true, 5: true,
        6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false,
        13: false, 14: false, 15: false, 16: false, 17: false,
        18: false, 19: false, 20: false, 21: false
      });
    } else {
      setMarketingModulesStatus({
        1: true, 2: true,
        3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false,
        13: false, 14: false, 15: false, 16: false, 17: false,
        18: false, 19: false, 20: false, 21: false
      });
    }
    triggerToast("Acesso Autorizado", `Logado como ${usr.name} (${usr.role})`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0D17] text-white p-4 relative overflow-hidden w-full">
      {/* Glow Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 rounded-full bg-[#F97316]/10 blur-[100px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#4F46E5]/10 blur-[120px]"></div>

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl p-8 space-y-6 relative z-10">
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center justify-center mb-1">
            Disk<span className="text-[#F97316] font-extrabold">Hub</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Business Cloud ERP & CRM Enterprise</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">E-mail Corporativo</label>
            <input 
              type="email" 
              name="email" 
              placeholder="nome@diskhub.com.br" 
              className="form-control bg-slate-950/40 border border-white/10 text-white text-xs p-3 rounded-lg w-full focus:ring-2 focus:ring-[#F97316]/50" 
              required 
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Senha de Acesso</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              className="form-control bg-slate-950/40 border border-white/10 text-white text-xs p-3 rounded-lg w-full focus:ring-2 focus:ring-[#F97316]/50" 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full py-3 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-lg border-0 cursor-pointer transition-colors shadow-lg shadow-[#F97316]/20 mt-2"
          >
            Entrar no Sistema
          </button>
        </form>

        {/* Quick login accounts card */}
        <div className="pt-4 border-t border-white/5 space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase block text-center">
            💡 Contas de Demonstração (Clique para entrar)
          </span>
          <div className="grid grid-cols-2 gap-2">
            {usersDatabase.map((usr, uIdx) => (
              <button
                key={uIdx}
                type="button"
                onClick={() => loginAsDemo(usr)}
                className="p-2.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 text-left transition-all cursor-pointer flex flex-col justify-between h-20"
              >
                <div>
                  <span className="text-[10px] font-bold text-white block">{usr.name.split(' ')[0]}</span>
                  <span className="text-[9px] text-[#F97316] font-semibold block">{usr.role}</span>
                </div>
                <span className="badge bg-white/10 text-slate-300 text-[8px] font-bold uppercase tracking-wider py-0.5 px-1.5 rounded self-start mt-1">
                  {usr.plan}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
