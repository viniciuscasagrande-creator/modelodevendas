# RELATÓRIO DE MAPEAMENTO DE ROTAS E MENUS — DIAGNÓSTICO E CORREÇÃO

**Data:** 04/09/2026  
**Sistema:** DiskHub Business Cloud  

---

## Tabela de Mapeamento de Menus

| MENU | ROTA | COMPONENTE | ARQUIVO | STATUS | DIAGNÓSTICO / PROBLEMA |
|---|---|---|---|---|---|
| **Dashboard** | `/dashboard` | `<Dashboard />` | `src/pages/Dashboard.jsx` | ✅ Ativo | Funcional. Necessita padronização dimensional dos cards. |
| **Vendas** | `/vendas` | `<SalesPage />` | `src/pages/SalesPage.jsx` | ✅ Ativo | Requer licença ERP (`appId="erp"`). Fallback visual ativo em caso de restrição. |
| **Eventos** | `/eventos` | `<EventsPage />` | `src/pages/EventsPage.jsx` | ✅ Ativo | Funcional, carregamento normal. |
| **PDVs** | `/vendas` (pdv) | `<SalesPage />` | `src/pages/SalesPage.jsx` | ✅ Ativo | Requer licença ERP. |
| **Ingressos** | `/logistica` | `<LogisticsPage />` | `src/pages/LogisticsPage.jsx` | ✅ Ativo | Funcional. |
| **CRM** | `/crm` | `<CrmPage />` | `src/pages/CrmPage.jsx` | ✅ Ativo | Requer licença CRM (`appId="crm"`). |
| **SAC 360º** | `/sac` | `<SacPage />` | `src/pages/SacPage.jsx` | ✅ Ativo | Requer licença SAC (`appId="support"`). |
| **Financeiro** | `/financeiro` | `<FinancePage />` | `src/pages/FinancePage.jsx` | ✅ Ativo | Requer licença Financeiro (`appId="finance"`). |
| **Contabilidade** | `/contabilidade` | `<AccountingPage />` | `src/pages/AccountingPage.jsx` | ✅ Ativo | Requer licença Contabilidade (`appId="accounting"`). |
| **Estoque** | `/estoque` | `<BarInventoryPage />` | `src/pages/BarInventoryPage.jsx` | ✅ Ativo | Funcional. |
| **Patrimônio** | `/patrimonio` | `<PatrimonyPage />` | `src/pages/PatrimonyPage.jsx` | ✅ Ativo | Funcional. |
| **Marketing** | `/marketing` | `<MarketingPage />` | `src/pages/MarketingPage.jsx` | ✅ Ativo | Requer licença Marketing (`appId="marketing"`). |
| **Analytics** | `/bi` | `<AiAnalyticsPage />` | `src/pages/AiAnalyticsPage.jsx` | ✅ Ativo | Requer licença Analytics (`appId="analytics"`). |
| **Central de Apps** | `/appstore` | `<AppStorePage />` | `src/pages/AppStorePage.jsx` | ✅ Ativo | 11 módulos funcionais, modal de detalhes ativo. |
| **Integrações** | `/integracoes` | `<AppStorePage />` | `src/pages/AppStorePage.jsx` | ✅ Ativo | Requer licença de integrações (`appId="integrations"`). |
| **Usuários e Permissões**| `/usuarios` | `<UsersManagementPage />`| `src/pages/subscription/UsersManagementPage.jsx` | ✅ Ativo | Gestão RBAC de usuários e papéis. |
| **Configurações** | `/configuracoes`| `<RoadmapPage />` | `src/pages/RoadmapPage.jsx` | ✅ Ativo | Roadmap & configurações. |
| **Planos & Upgrades** | `/planos` | `<PlansPage />` | `src/pages/plans/PlansPage.jsx` | ✅ Ativo | Funcional. |
| **Minha Assinatura** | `/assinatura` | `<SubscriptionPage />` | `src/pages/SubscriptionPage.jsx` | ✅ Ativo | Funcional. |
| **Notificações** | `/notificacoes` | `<NotificationsPage />` | `src/pages/NotificationsPage.jsx` | ⚠️ Novo | A implementar na Fase 27.1.8.4. |
| **Página Não Encontrada**| `*` (404) | `<NotFoundPage />` | `src/pages/NotFoundPage.jsx` | ⚠️ Novo | A implementar para impedir white screen em qualquer rota desconhecida. |

---

## Análise de Riscos de Tela Branca

1. **Exceções não tratadas em componentes:** Caso ocorra erro JS em qualquer componente fora de `ModuleShell`, o React pode desmontar a aplicação. **Solução:** Implementar `AppErrorBoundary` global.
2. **Rotas e sub-rotas não mapeadas no Context:** URLs como `/configuracoes/usuarios`, `/notificacoes`, `/alerts` caem no fallback. **Solução:** Mapeamento explícito em `getTabFromPath` e rotas no `App.jsx`.
3. **Cards do Dashboard com alturas desalinhadas:** A ausência de regras explícitas em CSS para `dashboard-kpis` e `.dashboard-chart-card` causa espaçamento assimétrico. **Solução:** Regras de altura mínima, `min-height: 128px` e `min-height: 320px` com grid padronizado.
