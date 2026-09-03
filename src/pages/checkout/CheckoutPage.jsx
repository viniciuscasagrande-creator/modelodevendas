import React, { useState, useEffect } from 'react';
import { useDiskHub } from '../../context/DiskHubContext';
import { subscriptionService } from '../../services/subscriptionService';
import { plans } from '../../config/plans';
import { addons as availableAddons } from '../../config/addons';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  QrCode, 
  Barcode
} from 'lucide-react';

const STORAGE_KEY = 'diskhub_checkout';

export default function CheckoutPage() {
  const { navigateTo, setAppsOpen, triggerToast } = useDiskHub();

  const [step, setStep] = useState(1); // 1: Plano, 2: Empresa, 3: Usuários, 4: Add-ons, 5: Cobrança, 6: Resumo, 7: Pagamento, 8: Sucesso
  const [selectedPlan, setSelectedPlan] = useState('advanced');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [usersCount, setUsersCount] = useState(5);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'pix' | 'boleto'

  const [company, setCompany] = useState({
    legalName: 'Produtora Prime Show Ltda',
    tradeName: 'Prime Show Eventos',
    document: '12.345.678/0001-90',
    email: 'financeiro@primeshow.com.br',
    phone: '(41) 3322-1100'
  });

  const [billing, setBilling] = useState({
    document: '12.345.678/0001-90',
    zipcode: '80000-000',
    street: 'Rua XV de Novembro',
    number: '1500',
    city: 'Curitiba',
    state: 'PR'
  });

  const [termsAccepted, setTermsAccepted] = useState(true);
  const [privacyAccepted, setPrivacyAccepted] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load from sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const planParam = params.get('plan');
      if (planParam && ['standard', 'advanced', 'expert'].includes(planParam)) {
        setSelectedPlan(planParam);
      }

      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.company) setCompany(parsed.company);
          if (parsed.usersCount) setUsersCount(parsed.usersCount);
          if (parsed.selectedAddons) setSelectedAddons(parsed.selectedAddons);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  // Save to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
          selectedPlan,
          billingCycle,
          usersCount,
          selectedAddons,
          company
        }));
      } catch {
        // ignore
      }
    }
  }, [selectedPlan, billingCycle, usersCount, selectedAddons, company]);

  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleNextStep = () => {
    if (step === 2) {
      if (!company.legalName || !company.document || !company.email) {
        triggerToast("Atenção", "Preencha os campos obrigatórios da empresa.");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleFinishPayment = () => {
    if (!termsAccepted || !privacyAccepted) {
      triggerToast("Termos Obrigatórios", "É necessário aceitar os Termos de Uso e Política de Privacidade.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      // Activate in subscription service
      subscriptionService.activateSubscription(selectedPlan, selectedAddons, usersCount, company);
      setIsProcessing(false);
      setStep(8); // Sucesso
      triggerToast("Assinatura Ativada!", `O plano ${selectedPlan.toUpperCase()} foi ativado com sucesso para ${company.tradeName}!`);
    }, 1200);
  };

  const currentPlanData = plans[selectedPlan] || plans.advanced;

  const stepsList = [
    { num: 1, label: 'Plano' },
    { num: 2, label: 'Empresa' },
    { num: 3, label: 'Usuários' },
    { num: 4, label: 'Add-ons' },
    { num: 5, label: 'Cobrança' },
    { num: 6, label: 'Resumo' },
    { num: 7, label: 'Pagamento' }
  ];

  return (
    <div data-testid="checkout-page" className="space-y-6 pb-16 animate-fadeIn font-sans max-w-5xl mx-auto">
      
      {/* 1. Header & Stepper */}
      {step < 8 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              data-testid="checkout-back"
              onClick={step === 1 ? () => navigateTo('/planos') : handlePrevStep}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-[#F97316] bg-transparent border-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{step === 1 ? 'Voltar para Planos' : 'Etapa Anterior'}</span>
            </button>

            <span className="text-xs font-black text-slate-400">
              Etapa {step} de 7: <strong>{stepsList[step - 1]?.label}</strong>
            </span>
          </div>

          {/* Stepper bar */}
          <div data-testid="checkout-stepper" className="hidden sm:flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xs">
            {stepsList.map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center space-x-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                    step === s.num
                      ? 'bg-[#F97316] text-white shadow-xs'
                      : step > s.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-400'
                  }`}>
                    {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </div>
                  <span className={`text-[11px] font-bold ${step === s.num ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < stepsList.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${step > s.num ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* 2. MAIN CONTENT AREA (Left step form + Right summary) */}
      {step < 8 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT FORM AREA (2 COLS) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm space-y-5">
            
            {/* ETAPA 1: PLANO */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white mb-0.5">Confirme o Plano Escolhido</h2>
                  <p className="text-xs text-slate-400 mb-0">Você pode alterar seu plano antes de prosseguir com os dados cadastrais.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.values(plans).map(p => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPlan(p.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        selectedPlan === p.id
                          ? 'border-[#F97316] bg-orange-50/50 dark:bg-[#F97316]/5 shadow-sm'
                          : 'border-slate-200 dark:border-white/5 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-black text-sm text-slate-900 dark:text-white">{p.name}</span>
                          {selectedPlan === p.id && <Check className="w-4 h-4 text-[#F97316]" />}
                        </div>
                        <p className="text-[11px] text-slate-400 mb-2">{p.tagline}</p>
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {p.includedModules.length} módulos inclusos
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Ciclo de cobrança:</span>
                  <div className="flex items-center space-x-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-3 py-1 rounded-lg font-bold border-0 cursor-pointer ${
                        billingCycle === 'monthly' ? 'bg-[#F97316] text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-400'
                      }`}
                    >
                      Mensal
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingCycle('annual')}
                      className={`px-3 py-1 rounded-lg font-bold border-0 cursor-pointer ${
                        billingCycle === 'annual' ? 'bg-[#F97316] text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-400'
                      }`}
                    >
                      Anual
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 2: EMPRESA */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white mb-0.5">Dados da Empresa / Produtora</h2>
                  <p className="text-xs text-slate-400 mb-0">Informações jurídicas para emissão de contrato e faturamento.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Razão Social *</label>
                    <input
                      type="text"
                      data-testid="company-legal-name"
                      required
                      value={company.legalName}
                      onChange={(e) => setCompany({ ...company, legalName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nome Fantasia</label>
                      <input
                        type="text"
                        data-testid="company-trade-name"
                        value={company.tradeName}
                        onChange={(e) => setCompany({ ...company, tradeName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">CNPJ *</label>
                      <input
                        type="text"
                        data-testid="company-document"
                        required
                        value={company.document}
                        onChange={(e) => setCompany({ ...company, document: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">E-mail Administrativo *</label>
                      <input
                        type="email"
                        data-testid="company-email"
                        required
                        value={company.email}
                        onChange={(e) => setCompany({ ...company, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Telefone Principal</label>
                      <input
                        type="tel"
                        data-testid="company-phone"
                        value={company.phone}
                        onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 3: USUÁRIOS */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white mb-0.5">Quantidade de Usuários</h2>
                  <p className="text-xs text-slate-400 mb-0">Quantos membros da sua equipe acessarão as ferramentas?</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-black text-sm text-slate-900 dark:text-white block mb-0.5">Usuários com Acesso Total</span>
                    <span className="text-xs text-slate-400 block">Permissões de gestor, financeiro e operadores</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setUsersCount(Math.max(1, usersCount - 1))}
                      className="w-9 h-9 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 font-black text-base flex items-center justify-center cursor-pointer text-slate-700 dark:text-white hover:border-[#F97316]"
                    >
                      -
                    </button>
                    <span data-testid="users-quantity" className="font-mono text-lg font-black text-[#F97316] w-8 text-center">
                      {usersCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setUsersCount(usersCount + 1)}
                      className="w-9 h-9 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 font-black text-base flex items-center justify-center cursor-pointer text-slate-700 dark:text-white hover:border-[#F97316]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-[#F97316] text-xs font-semibold">
                  O plano {currentPlanData.name} inclui franquia flexível de acessos com controle por perfil (RBAC).
                </div>
              </div>
            )}

            {/* ETAPA 4: ADD-ONS */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white mb-0.5">Personalize com Add-ons Opcionais</h2>
                  <p className="text-xs text-slate-400 mb-0">Selecione recursos adicionais para integrar à sua contratação.</p>
                </div>

                <div className="space-y-3">
                  {availableAddons.map(addon => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        data-testid={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#F97316] bg-orange-50/50 dark:bg-[#F97316]/5'
                            : 'border-slate-200 dark:border-white/5 hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="font-bold text-xs text-slate-900 dark:text-white block">{addon.name}</span>
                          <p className="text-[11px] text-slate-400 mb-0">{addon.description}</p>
                          <span className="text-[10px] text-slate-500 font-semibold">{addon.includedQuota}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isSelected ? 'bg-[#F97316] border-[#F97316] text-white' : 'border-slate-300 dark:border-white/20'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ETAPA 5: COBRANÇA */}
            {step === 5 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white mb-0.5">Endereço de Faturamento</h2>
                  <p className="text-xs text-slate-400 mb-0">Endereço registrado para conciliação fiscal e emissão de notas.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">CEP</label>
                      <input
                        type="text"
                        data-testid="billing-zipcode"
                        value={billing.zipcode}
                        onChange={(e) => setBilling({ ...billing, zipcode: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Endereço / Logradouro</label>
                      <input
                        type="text"
                        value={billing.street}
                        onChange={(e) => setBilling({ ...billing, street: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Número</label>
                      <input
                        type="text"
                        value={billing.number}
                        onChange={(e) => setBilling({ ...billing, number: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Cidade</label>
                      <input
                        type="text"
                        value={billing.city}
                        onChange={(e) => setBilling({ ...billing, city: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Estado</label>
                      <input
                        type="text"
                        value={billing.state}
                        onChange={(e) => setBilling({ ...billing, state: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 6: RESUMO */}
            {step === 6 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white mb-0.5">Revisão do Contrato</h2>
                  <p className="text-xs text-slate-400 mb-0">Confira todos os itens contratados antes de concluir o pagamento.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-3 text-xs">
                  <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-white/5">
                    <span className="text-slate-400">Plano Selecionado:</span>
                    <span className="font-bold text-slate-900 dark:text-white uppercase">{currentPlanData.name}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-white/5">
                    <span className="text-slate-400">Produtora / Empresa:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{company.legalName} ({company.document})</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-white/5">
                    <span className="text-slate-400">Usuários Contratados:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{usersCount} acessos</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-white/5">
                    <span className="text-slate-400">Add-ons Selecionados:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {selectedAddons.length > 0 ? `${selectedAddons.length} adicionais` : 'Nenhum'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ciclo de Faturamento:</span>
                    <span className="font-bold text-[#F97316] uppercase">{billingCycle}</span>
                  </div>
                </div>

                {/* Termos de Uso Checkbox */}
                <div className="space-y-2 pt-2 text-xs">
                  <label className="flex items-start space-x-2 cursor-pointer text-slate-600 dark:text-slate-300">
                    <input
                      type="checkbox"
                      data-testid="terms-checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-[#F97316]"
                    />
                    <span>Li e aceito integralmente os Termos de Uso da plataforma DiskHub Business Cloud.</span>
                  </label>

                  <label className="flex items-start space-x-2 cursor-pointer text-slate-600 dark:text-slate-300">
                    <input
                      type="checkbox"
                      data-testid="privacy-checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-[#F97316]"
                    />
                    <span>Estou autorizado a contratar e ativar este plano em nome da empresa especificada.</span>
                  </label>
                </div>
              </div>
            )}

            {/* ETAPA 7: PAGAMENTO */}
            {step === 7 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white mb-0.5">Forma de Pagamento</h2>
                  <p className="text-xs text-slate-400 mb-0">Selecione o meio para ativação automática da sua assinatura.</p>
                </div>

                {/* Payment Methods */}
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    data-testid="payment-method-card"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#F97316] bg-orange-50/50 dark:bg-[#F97316]/5 text-[#F97316]'
                        : 'border-slate-200 dark:border-white/5 text-slate-500'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-[11px] font-bold block">Cartão</span>
                  </button>

                  <button
                    type="button"
                    data-testid="payment-method-pix"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                      paymentMethod === 'pix'
                        ? 'border-[#F97316] bg-orange-50/50 dark:bg-[#F97316]/5 text-[#F97316]'
                        : 'border-slate-200 dark:border-white/5 text-slate-500'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-[11px] font-bold block">PIX Direto</span>
                  </button>

                  <button
                    type="button"
                    data-testid="payment-method-boleto"
                    onClick={() => setPaymentMethod('boleto')}
                    className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                      paymentMethod === 'boleto'
                        ? 'border-[#F97316] bg-orange-50/50 dark:bg-[#F97316]/5 text-[#F97316]'
                        : 'border-slate-200 dark:border-white/5 text-slate-500'
                    }`}
                  >
                    <Barcode className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-[11px] font-bold block">Boleto</span>
                  </button>
                </div>

                {/* Card input mockup */}
                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Número do Cartão</label>
                      <input
                        type="text"
                        defaultValue="•••• •••• •••• 8912"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Validade</label>
                        <input
                          type="text"
                          defaultValue="12/29"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">CVV</label>
                        <input
                          type="password"
                          defaultValue="999"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'pix' && (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2 text-xs">
                    <QrCode className="w-8 h-8 text-emerald-600 mx-auto" />
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block">PIX com Liberação Instantânea</span>
                    <p className="text-[11px] text-slate-500 mb-0">Ao finalizar, o QR Code de confirmação será gerado e seus módulos serão ativados automaticamente.</p>
                  </div>
                )}

                {paymentMethod === 'boleto' && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 text-center space-y-2 text-xs">
                    <Barcode className="w-8 h-8 text-slate-400 mx-auto" />
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">Boleto Bancário Faturado</span>
                    <p className="text-[11px] text-slate-400 mb-0">Vencimento em 3 dias úteis. Acesso em modo provisionamento inicial.</p>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Ambiente criptografado de alta segurança. Tokenização direta.</span>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-bold border-0 cursor-pointer"
                >
                  Voltar
                </button>
              )}

              {step < 7 ? (
                <button
                  type="button"
                  data-testid="checkout-continue"
                  onClick={handleNextStep}
                  className="ml-auto px-6 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black border-0 cursor-pointer shadow-md flex items-center space-x-2 transition-all"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  data-testid="payment-submit"
                  disabled={!termsAccepted || !privacyAccepted || isProcessing}
                  onClick={handleFinishPayment}
                  className="ml-auto px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black border-0 cursor-pointer shadow-lg shadow-emerald-600/25 flex items-center space-x-2 transition-all"
                >
                  <span>{isProcessing ? 'Processando Ativação...' : 'Confirmar & Ativar Assinatura'}</span>
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* RIGHT SIDEBAR ORDER SUMMARY */}
          <div data-testid="checkout-summary" className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-sm space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Resumo da Contratação</span>
              <h3 data-testid="selected-plan" className="text-base font-black text-slate-900 dark:text-white mb-0">
                Plano {currentPlanData.name}
              </h3>
            </div>

            <div className="space-y-2 text-xs border-y border-slate-100 dark:border-white/5 py-3">
              <div className="flex justify-between text-slate-500">
                <span>Ciclo:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">{billingCycle}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Usuários:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{usersCount} membros</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Add-ons:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedAddons.length} selecionados</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Ativação:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Automática Instantânea</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[10.5px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Módulos que serão liberados:</span>
              <div className="flex flex-wrap gap-1">
                {currentPlanData.includedModules.map(m => (
                  <span key={m} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-[10px] font-semibold text-slate-600 dark:text-slate-300 uppercase">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1E293B]/60 text-[11px] text-slate-400 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#F97316] shrink-0" />
              <span>Garantia de segurança operacional DiskIngressos.</span>
            </div>
          </div>

        </div>
      ) : (
        /* ETAPA 8: SUCESSO E ATIVAÇÃO AUTOMÁTICA */
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1F2937] shadow-xl text-center space-y-6 max-w-2xl mx-auto animate-scaleUp">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10">
              Contratação Concluída com Sucesso
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 mb-1">
              Bem-vindo ao DiskHub {currentPlanData.name}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-0">
              Sua assinatura foi confirmada e as licenças corporativas da <strong>{company.tradeName}</strong> foram provisionadas e ativadas na nuvem.
            </p>
          </div>

          {/* Unlocked apps badge strip */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/40 border border-slate-200 dark:border-white/5 space-y-2.5 text-left">
            <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-400 block">
              Aplicativos Liberados para sua Conta ({currentPlanData.includedModules.length}):
            </span>
            <div className="flex flex-wrap gap-2">
              {currentPlanData.includedModules.map(m => (
                <span key={m} className="px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span className="uppercase">{m}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                navigateTo('/dashboard');
                setAppsOpen(true);
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black border-0 cursor-pointer shadow-lg shadow-[#F97316]/25 flex items-center justify-center space-x-2 transition-all"
            >
              <span>Acessar Meus Aplicativos</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('/assinatura')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold border-0 cursor-pointer transition-all"
            >
              Gerenciar Assinatura
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
