# RELATÓRIO DE MAPEAMENTO DO PROJETO EXISTENTE — FASE 27.1.8.4 & CORREÇÃO DE ROTAS

**Data:** 04/09/2026  
**Sistema:** DiskHub Business Cloud  
**Status do Projeto:** Estável, branch `master` / `main` sincronizados  

---

## 1. Arquitetura e Framework

* **Framework:** React 19 + Vite 8 (SPA client-side com `vite-plugin-singlefile`)
* **Estilos:** Tailwind CSS 4 + Limitless CSS Assets + CSS nativo customizado em `src/index.css`
* **Ícones:** Lucide React (`lucide-react`)
* **Gráficos:** Chart.js + React-ChartJS-2 + SVG nativo customizado
* **Roteamento:** SPA controlado por estado reativo via `DiskHubContext.jsx` sincronizado com `window.location.pathname` e eventos `pushState` / `popstate`
* **Hospedagem / Deploy:** Vercel com rewrite SPA global em `vercel.json` (`/(.*) -> /index.html`)

---

## 2. Estrutura de Arquivos Encontrada

```text
src/
├── App.jsx                     # Layout global autenticado, roteamento condicional de abas e overlays
├── main.jsx                    # Ponto de entrada React com StrictMode
├── index.css                   # Definições globais de layout, dashboard container e classes CSS
├── context/
│   └── DiskHubContext.jsx      # Estado global: usuário ativo, tenant, rotas, dados financeiros e temas
├── components/
│   ├── Header.jsx              # Top bar com seletor de contexto corporativo, busca, launcher e sino
│   ├── Sidebar.jsx             # Menu lateral com 6 seções operacionais e links
│   ├── AppLauncher.jsx         # Modal launcher de aplicativos
│   ├── SpotlightSearch.jsx     # Busca global rápida ⌘K
│   ├── QuickActionModals.jsx   # Modais operacionais (venda rápida, evento, etc.)
│   ├── AiChatDrawer.jsx        # Assistente Disk AI Copilot
│   ├── common/
│   │   ├── AppBootstrap.jsx    # Inicialização de dados e sincronização de licenças
│   │   ├── AppEntryGuard.jsx   # Guard de licenciamento por plano, status de assinatura e permissões
│   │   └── ModuleShell.jsx     # Shell padrão dos módulos com ModuleErrorBoundary
│   └── dashboard/
│       ├── DashboardFilters.jsx # Filtros globais de período e evento
│       ├── TrendIndicator.jsx   # Indicador visual de variação percentual
│       └── WidgetErrorState.jsx # Fallback visual para widgets com falha
├── config/
│   ├── apps.js                 # Registro de aplicativos corporativos e status
│   ├── plans.js                # Catálogo de planos (Standard, Advanced, Expert)
│   ├── products.js             # Mapeamento de produtos comerciais e aliases
│   └── roles.js                # Matriz RBAC de papéis e permissões
├── services/
│   ├── apiClient.js            # Cliente HTTP centralizado com headers de tenant e correlation-id
│   ├── apiService.js           # Gerenciamento de usuários e convites
│   ├── dashboardService.js     # Serviço de KPIs, gráficos, alertas e atividade
│   ├── metricsService.js       # Cálculos operacionais (conversão, ticket médio, ocupação)
│   ├── pdtIntegrationService.js# Integração de dados de pedidos e eventos
│   ├── subscriptionService.js  # Gestão de licenças, plano e faturamento
│   └── userAccessService.js    # Avaliação de papéis e permissões por usuário
└── pages/
    ├── LoginPage.jsx           # Autenticação
    ├── Dashboard.jsx           # Dashboard Executivo e Operacional
    ├── FinancePage.jsx         # Módulo Financeiro (ERP)
    ├── AccountingPage.jsx      # Contabilidade & Fiscal
    ├── CrmPage.jsx             # CRM & Vendas
    ├── EventsPage.jsx          # Gestão de Eventos
    ├── MarketingPage.jsx       # Marketing Digital & Campanhas
    ├── SalesPage.jsx           # Vendas & PDVs
    ├── SacPage.jsx             # SAC 360º & Suporte
    ├── PreparationPage.jsx     # Tela informativa para módulos em expansão
    ├── LogisticsPage.jsx       # Ingressos & Portaria
    ├── BarInventoryPage.jsx    # Estoque & Bares
    ├── PatrimonyPage.jsx       # Patrimônio & POS
    ├── AiAnalyticsPage.jsx     # BI & Analytics
    ├── AppStorePage.jsx        # Central de Apps Comercial
    ├── SubscriptionPage.jsx    # Gestão de Assinatura e Faturamento
    ├── RoadmapPage.jsx         # Configurações & Status da Plataforma
    ├── plans/PlansPage.jsx     # Vitrine de Planos & Upgrades
    ├── products/ProductDetails.jsx # Página de detalhes do produto
    ├── checkout/CheckoutPage.jsx   # Checkout e contratação
    └── subscription/UsersManagementPage.jsx # Gestão de usuários e permissões RBAC
```

---

## 3. Mapeamento de Menus e Rotas da Sidebar

| Seção | Menu / Label | Rota | Componente | Status | Diagnóstico |
|---|---|---|---|---|---|
| **VISÃO GERAL** | Dashboard | `/dashboard` | `<Dashboard />` | Ativo | Funcional com dados reais e filtros |
| **OPERAÇÃO** | Vendas | `/vendas` | `<SalesPage />` | Ativo | Protegido por `AppEntryGuard appId="erp"` |
| **OPERAÇÃO** | Eventos | `/eventos` | `<EventsPage />` | Ativo | Funcional, lista de eventos e lotes |
| **OPERAÇÃO** | PDVs | `/vendas` (tab: pdv) | `<SalesPage />` | Ativo | Integrado ao ERP |
| **OPERAÇÃO** | Ingressos | `/logistica` | `<LogisticsPage />` | Ativo | Funcional |
| **CLIENTES** | CRM | `/crm` | `<CrmPage />` | Ativo | Protegido por `AppEntryGuard appId="crm"` |
| **CLIENTES** | SAC 360º | `/sac` | `<SacPage />` | Ativo | Protegido por `AppEntryGuard appId="support"` |
| **GESTÃO** | Financeiro | `/financeiro` | `<FinancePage />` | Ativo | Protegido por `AppEntryGuard appId="finance"` |
| **GESTÃO** | Contabilidade | `/contabilidade` | `<AccountingPage />` | Ativo | Protegido por `AppEntryGuard appId="accounting"` |
| **GESTÃO** | Estoque | `/estoque` | `<BarInventoryPage />` | Ativo | Funcional |
| **GESTÃO** | Patrimônio | `/patrimonio` | `<PatrimonyPage />` | Ativo | Funcional |
| **CRESCIMENTO** | Marketing | `/marketing` | `<MarketingPage />` | Ativo | Protegido por `AppEntryGuard appId="marketing"` |
| **CRESCIMENTO** | Analytics | `/bi` | `<AiAnalyticsPage />` | Ativo | Protegido por `AppEntryGuard appId="analytics"` |
| **SISTEMA** | Central de Apps | `/appstore` | `<AppStorePage />` | Ativo | Corrigido, vitrine completa de módulos |
| **SISTEMA** | Integrações | `/integracoes` | `<AppStorePage />` (guard: integrations) | Ativo | Hub técnico de APIs |
| **SISTEMA** | Usuários e Permissões | `/usuarios` | `<UsersManagementPage />` | Ativo | Gestão RBAC de usuários e papéis |
| **SISTEMA** | Configurações | `/configuracoes` | `<RoadmapPage />` | Ativo | Roadmap & configurações |
| *(Header)* | Minha Assinatura | `/assinatura` | `<SubscriptionPage />` | Ativo | Gestão de plano e faturas |
| *(Header)* | Planos & Upgrades | `/planos` | `<PlansPage />` | Ativo | Tabela de planos e contratação |
| *(Header)* | Sino Notificações | *(Toast simples)* | **Pendente** | **Ajustar** | Implementar `NotificationBell` + `NotificationDrawer` |
| *(Nova)* | Notificações Completa | `/notificacoes` | **Pendente** | **Ajustar** | Implementar `NotificationsPage.jsx` |
| *(Nova)* | Página 404 | `*` | **Pendente** | **Ajustar** | Implementar `NotFoundPage.jsx` |

---

## 4. Componentes que NÃO Devem Ser Alterados / Regras de Preservação

1. **Dashboard Estrutura Conceitual:** NÃO remover seções (Performance, Funil, Financeiro, Eventos, Alertas, Atividade, Ações Rápidas). Apenas padronizar alturas e grids CSS conforme especificado.
2. **Sidebar:** Preservar todas as 6 seções e itens existentes.
3. **Guards de Segurança:** Preservar `AppEntryGuard`, `ModuleShell`, `subscriptionService` e `userAccessService`. Nunca desabilitar checagem de plano ou permissão.
4. **Navegação SPA:** Preservar `navigateTo()` e sincronização de URL via `history.pushState` / `popstate`.

---

## 5. Plano Técnico de Implantação da Fase 27.1.8.4 & Estabilização

1. **Serviços & Engine:**
   - Criar `src/services/notificationService.js` (gerenciamento de notificações, contagem de não lidas, marcar lida/todas, arquivar).
   - Criar `src/services/alertService.js` (gerenciamento de alertas operacionais, acknowledge, resolve, deduplicação por chave `tenantId:ruleId:entityId`).
   - Criar `src/services/activityService.js` (feed de atividade operacional auditável).
   - Criar `src/services/alertRuleEngine.js` (mecanismo de regras com suporte a Financeiro, Eventos, Marketing, SAC, Integrações e Sistema).
2. **Componentes de Notificação e Drawer:**
   - Criar `src/components/notifications/NotificationBell.jsx` com `data-testid="notification-bell"` e `data-testid="notification-badge"`.
   - Criar `src/components/notifications/NotificationDrawer.jsx` com `data-testid="notification-drawer"`, abas (Todos, Não lidas, Críticas), ações rápidas, suporte a teclado (ESC fecha) e responsividade mobile.
   - Criar `src/components/notifications/NotificationItem.jsx` com `data-testid="notification-item"`.
   - Criar `src/components/notifications/NotificationBadge.jsx`.
3. **Tela Completa de Notificações:**
   - Criar `src/pages/NotificationsPage.jsx` (`/notificacoes`) com busca, filtros por status, módulo, severidade e período, cursor pagination, skeletons e empty states.
4. **Resiliência e Fallback Global (Eliminar Telas Brancas):**
   - Criar `src/components/common/AppErrorBoundary.jsx` envolvendo toda a aplicação.
   - Criar `src/pages/NotFoundPage.jsx` com `data-testid="not-found-page"`.
   - Mapear rotas `/notificacoes`, `/notificacoes/alertas`, `/activity`, sub-rotas `/configuracoes/usuarios`, etc. no `DiskHubContext.jsx` e `App.jsx`.
5. **Padronização dos Cards do Dashboard:**
   - Ajustar classes CSS em `src/index.css` e `src/pages/Dashboard.jsx`:
     - Container `max-w-[1600px] mx-auto p-4 sm:p-6 pb-24`.
     - KPIs: `dashboard-kpis` grid 4 colunas, `min-height: 128px`, headers padronizados com altura e espaçamento homogêneo.
     - Gráficos: mesma altura para cards da mesma linha (`min-height: 320px`, `.chart-wrapper` com 220px).
     - Alertas e Atividade: `min-height: 340px`, cards alinhados com `align-items: stretch`.
     - Garantir ausência total de overflow horizontal (`min-width: 0`, `overflow-hidden` onde apropriado).
6. **Conexão dos Widgets do Dashboard aos Novos Serviços:**
   - Conectar o painel de Alertas a `alertService.getAlerts()` e Atividade Recente a `activityService.getActivity()`.
7. **Testes e Validação:**
   - Executar varredura automatizada em todos os menus e rotas via script headless.
   - Validar ausência de exceções no console, ausência de tela branca e layout responsivo.
