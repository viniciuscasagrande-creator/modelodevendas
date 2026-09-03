import React, { useEffect } from 'react';
import { useDiskHub } from '../context/DiskHubContext';
import { Brain, X, Send, Mic } from 'lucide-react';

export default function AiChatDrawer() {
  const {
    chatOpen,
    setChatOpen,
    userInput,
    setUserInput,
    chatMessages,
    setChatMessages,
    isTyping,
    setIsTyping,
    messagesEndRef,
    isListening,
    setIsListening,
    invoices,
    setInvoices,
    borderos,
    accounts,
    setConciliationItems,
    triggerToast,
    theme,
    bgCard,
    borderCol,
    textTitle,
    textSec,
    textBody
  } = useDiskHub();

  useEffect(() => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping, messagesEndRef]);

  const handleEmitNFe = (invoiceId) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) return { ...inv, status: 'Emitida' };
      return inv;
    }));
    triggerToast("NFe Autorizada! 🧾", "Nota fiscal emitida na SEFAZ com sucesso.");
  };

  const triggerAIResponse = (scenario) => {
    setChatOpen(true);
    const prompts = {
      conciliacao: "🔍 Fazer Conciliação Automática",
      dre: "📊 Gerar DRE de Julho",
      spread: "💸 Calcular Spread dos Gateway",
      fluxo: "📉 Simular Fluxo de Caixa 45 dias",
      relatorio: "📋 Criar Relatório de Vendas",
      eventos: "🎫 Maior Lucro Recente",
      nfe: "🧾 Checar Notas Fiscais Pendentes",
      borderos: "📋 Listar Status dos Borderôs"
    };

    const userMessage = prompts[scenario] || scenario;
    const userMsgObj = {
      id: Date.now(),
      sender: 'user',
      text: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, userMsgObj]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let aiText = '';
      let html = null;

      const q = userMessage.toLowerCase();

      if (scenario === 'conciliacao') {
        aiText = 'Auditoria automática de extratos concluída. Encontrei lançamentos prontos para conciliar.';
        html = (
          <div className={`mt-2 p-2 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-100'} border ${borderCol} rounded-lg text-[10px] space-y-1 font-mono`}>
            <p className="text-[#22C55E] font-medium">✓ 5 lançamentos mapeados no banco Itaú/Disk</p>
            <p className="text-[#3B82F6] font-medium">❖ Status: Prontos para liquidação</p>
            <button 
              onClick={() => {
                setConciliationItems(prev => prev.map(item => ({ ...item, matched: true })));
                triggerToast("Sucesso", "Todas as conciliações foram efetuadas.");
              }}
              className="w-full mt-2 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded text-[10px] font-semibold"
            >
              Liquidar Conciliações Pendentes
            </button>
          </div>
        );
      } else if (scenario === 'dre') {
        aiText = 'DRE consolidada calculada pelo módulo fiscal. Margem líquida do trimestre está em 18.6%.';
        html = (
          <div className={`mt-2 border ${borderCol} rounded-lg overflow-hidden ${bgCard}`}>
            <table className={`w-full text-[10px] ${textSec} font-mono`}>
              <tbody>
                <tr className={theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-100'}><td className="p-1">Receita Operacional</td><td className="p-1 text-right text-[#22C55E]">R$ 2.580.000</td></tr>
                <tr className={`border-t ${borderCol}`}><td className="p-1">(-) Gateway & Spread</td><td className="p-1 text-right text-[#EF4444]">-R$ 387.000</td></tr>
                <tr className={`border-t ${borderCol}`}><td className="p-1">(-) Custos Produtora</td><td className="p-1 text-right text-[#EF4444]">-R$ 1.713.000</td></tr>
                <tr className={`border-t ${borderCol} bg-[#3B82F6]/10 font-bold`}><td className={`p-1 ${textTitle}`}>Lucro Líquido</td><td className="p-1 text-right text-[#3B82F6] font-semibold">R$ 480.000</td></tr>
              </tbody>
            </table>
          </div>
        );
      } else if (scenario === 'nfe') {
        const count = invoices.filter(inv => inv.status === 'Pendente').length;
        aiText = `Varredura fiscal: Existem **${count} notas fiscais** pendentes de emissão.`;
        html = (
          <div className={`mt-2 p-2 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-100'} border ${borderCol} rounded-lg text-[10px] space-y-1`}>
            {invoices.filter(inv => inv.status === 'Pendente').map(inv => (
              <div key={inv.id} className={`flex justify-between items-center ${textSec} font-mono`}>
                <span>{inv.client} (R$ {inv.amount})</span>
                <button onClick={() => handleEmitNFe(inv.id)} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[8px] px-1.5 py-0.5 rounded font-semibold">Emitir</button>
              </div>
            ))}
          </div>
        );
      } else if (scenario === 'borderos') {
        aiText = 'Listagem de fechamento financeiro de eventos do produtor:';
        html = (
          <div className="mt-2 space-y-0.5 text-[10px]">
            {borderos.map(b => (
              <div key={b.id} className={`flex justify-between items-center p-1.5 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'} border ${borderCol} rounded`}>
                <div>
                  <span className={`font-semibold ${textTitle} block`}>{b.name}</span>
                  <span className={textSec}>Repasse Líquido: R$ {(b.netProfit || b.ticketSales || 0).toLocaleString('pt-BR')}</span>
                </div>
                <span className={`px-1.5 py-0.5 rounded font-semibold uppercase text-[8px] ${
                  b.status === 'Aprovado' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                }`}>{b.status || 'Em Aberto'}</span>
              </div>
            ))}
          </div>
        );
      } else if (q.includes('saldo') || q.includes('conta') || q.includes('banco')) {
        const total = accounts.reduce((acc, curr) => acc + curr.balance, 0);
        aiText = `O total disponível consolidado nas contas financeiras é de **R$ ${total.toLocaleString('pt-BR')}**. Mapeado nas contas registradas.`;
      } else if (q.includes('repass') || q.includes('bordero') || q.includes('fechamento')) {
        aiText = 'Atualmente, o maior repasse pendente de fechamento é do evento **Metal Fest 2026**. Você pode aprovar ou auditar esses dados diretamente na aba de **Contabilidade Disk** > **Borderô**.';
      } else {
        aiText = `Recebi sua mensagem sobre "${userMessage}". Como copiloto contábil, estou à disposição para emitir NFes, gerar DRE ou analisar os borderôs de vendas. Escolha um comando rápido ou faça outra pergunta.`;
      }

      const aiMsgObj = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiText,
        htmlResponse: html,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsgObj]);
    }, 1200);
  };

  const simulateVoiceInput = () => {
    if (isListening) return;
    setIsListening(true);
    setUserInput("🎙️ Ouvindo...");
    triggerToast("🎙️ Gravador Ativo", "Simulando transcrição de voz...");
    
    setTimeout(() => {
      setUserInput("Qual o faturamento consolidado deste mês?");
      setIsListening(false);
      setTimeout(() => {
        triggerToast("Voz Processada 🤖", "Enviando comando para o Disk AI...");
        triggerAIResponse('dre');
        setUserInput('');
      }, 800);
    }, 1200);
  };

  const handleSendCustomText = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const text = userInput;
    setUserInput('');
    triggerAIResponse(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {chatOpen && (
        <div className={`w-96 max-h-[500px] ${bgCard} border ${borderCol} rounded shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-305 origin-bottom-right`}>
          {/* Chat Header */}
          <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-100'} border-bottom ${borderCol} flex items-center justify-between`}>
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded bg-[#2563EB] flex items-center justify-center text-white shadow">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h3 className={`text-xs font-semibold ${textTitle} mb-0`}>Disk AI Copilot</h3>
                <p className="text-[9px] text-[#22C55E] font-medium flex items-center mb-0">
                  <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full inline-block mr-1"></span>
                  Online & Ativo
                </p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className={`${textSec} hover:text-white bg-transparent border-0 cursor-pointer`}>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 h-[280px]" id="chat-messages">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded bg-blue-500/10 border border-white/5 text-[#3B82F6] flex items-center justify-center font-bold text-[9px] p-1 shrink-0">
                    AI
                  </div>
                )}
                <div className={`p-3 rounded max-w-[80%] border text-[11px] leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-[#2563EB] border-transparent text-white' 
                    : `${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} border ${borderCol} ${textBody}`
                }`}>
                  <p className="mb-0">{msg.text}</p>
                  {msg.htmlResponse}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-2.5">
                <div className="w-6 h-6 rounded bg-blue-500/10 border border-[#1e2533] text-[#3B82F6] flex items-center justify-center font-bold text-[9px] p-1 shrink-0">
                  AI
                </div>
                <div className={`${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-100'} border ${borderCol} p-3 rounded max-w-[80%]`}>
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Grid inside Chat */}
          <div className={`p-3 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-slate-50'} border-top ${borderCol}`}>
            <p className={`text-[9px] ${textSec} uppercase tracking-wider font-semibold mb-2`}>Comandos Rápidos</p>
            <div className="row g-2">
              <div className="col-6">
                <button onClick={() => triggerAIResponse('conciliacao')} className={`btn btn-light w-full text-left truncate text-[10px] p-2 bg-transparent border ${borderCol} ${textTitle}`}>
                  🔍 Fazer Conciliação
                </button>
              </div>
              <div className="col-6">
                <button onClick={() => triggerAIResponse('dre')} className={`btn btn-light w-full text-left truncate text-[10px] p-2 bg-transparent border ${borderCol} ${textTitle}`}>
                  📊 Gerar DRE
                </button>
              </div>
              <div className="col-6">
                <button onClick={() => triggerAIResponse('nfe')} className={`btn btn-light w-full text-left truncate text-[10px] p-2 bg-transparent border ${borderCol} ${textTitle}`}>
                  🧾 Notas Pendentes
                </button>
              </div>
              <div className="col-6">
                <button onClick={() => triggerAIResponse('borderos')} className={`btn btn-light w-full text-left truncate text-[10px] p-2 bg-transparent border ${borderCol} ${textTitle}`}>
                  📋 Status Borderôs
                </button>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendCustomText} className={`p-2.5 ${bgCard} border-top ${borderCol} flex space-x-2`}>
            <input 
              type="text" 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Pergunte..."
              className={`form-control form-control-sm flex-1 ${theme === 'dark' ? 'bg-[#111827] text-white border-white/5' : 'bg-slate-50 text-slate-900 border-slate-300'} text-xs`}
            />
            <button 
              type="button" 
              onClick={simulateVoiceInput} 
              className={`btn p-1 ${isListening ? 'bg-[#EF4444] text-white animate-pulse' : 'bg-slate-100 dark:bg-white/5 text-[#2563EB]'} rounded active:scale-95 transition-all border-0 cursor-pointer`}
              title="Simular comando de voz"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button type="submit" className="btn btn-primary p-1 bg-[#2563EB] hover:bg-[#1D4ED8] rounded text-white active:scale-95 transition-all border-0 cursor-pointer">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Chat Button Toggle */}
      <button 
        onClick={() => setChatOpen(!chatOpen)} 
        className="btn btn-primary w-14 h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-circle flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border-0 cursor-pointer"
      >
        <Brain className="w-6 h-6" />
      </button>
    </div>
  );
}
