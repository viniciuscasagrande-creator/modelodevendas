# RELATÓRIO DE ROTAS — FASE 27.1.1
## Auditoria Prévia de Rotas e Telas do DiskHub Business Cloud

Data: 03/09/2026  
Status: Aprovado para implementação incremental sem remoção de telas.

---

### Mapeamento das Rotas Existentes

| Rota | Componente | Arquivo | Status | Ação Prevista |
| :--- | :--- | :--- | :---: | :--- |
| `/dashboard` | `Dashboard` | `src/pages/Dashboard.jsx` | Ativo | Preservar integralmente (Central de Operações 2.0). |
| `/vendas` | `SalesPage` | `src/pages/SalesPage.jsx` | Ativo | Preservar (Visão Comercial, Pipeline/Kanban, PDVs Físicos). |
| `/crm` | `CrmPage` | `src/pages/CrmPage.jsx` | Ativo | Preservar e proteger com AppAccessGuard (Standard). |
| `/erp` | `SalesPage` / `PdvPage` | `src/pages/SalesPage.jsx` | Ativo | Mapear como módulo ERP centralizado. |
| `/financeiro` | `FinancePage` | `src/pages/FinancePage.jsx` | Ativo | Preservar e proteger com AppAccessGuard (Standard). |
| `/marketing` | `MarketingPage` | `src/pages/MarketingPage.jsx` | Ativo | Proteger com AppAccessGuard (liberado no Advanced). |
| `/sac` | `SacPage` | `src/pages/SacPage.jsx` | Ativo | Proteger com AppAccessGuard (liberado no Advanced). |
| `/bi` / `/ai` | `AiAnalyticsPage` | `src/pages/AiAnalyticsPage.jsx` | Ativo | Proteger com AppAccessGuard (liberado no Advanced). |
| `/eventos` | `EventsPage` | `src/pages/EventsPage.jsx` | Ativo | Preservar integralmente (Eventos 2.0 e detalhamento). |
| `/contabilidade` | `AccountingPage` | `src/pages/AccountingPage.jsx` | Ativo | Proteger com AppAccessGuard (liberado no Expert). |
| `/automacao` | `PreparationPage` | `src/pages/PreparationPage.jsx` | Ativo | Proteger com AppAccessGuard (liberado no Expert). |
| `/integracoes` | `AppStorePage` | `src/pages/AppStorePage.jsx` | Ativo | Preservar como ecossistema de integrações. |
| `/configuracoes` | `RoadmapPage` | `src/pages/RoadmapPage.jsx` | Ativo | Preservar preferências do sistema. |
| `/planos` | `PlansPage` | `src/pages/plans/PlansPage.jsx` | Novo | Evoluir para comparação completa Standard/Advanced/Expert. |
| `/produtos/:id` | `ProductDetails` | `src/pages/products/ProductDetails.jsx` | Novo | Páginas comerciais individuais reutilizáveis. |
| `/contratacao` | `CheckoutPage` | `src/pages/checkout/CheckoutPage.jsx` | Novo | Fluxo de contratação em 7 etapas e ativação automática. |
| `/assinatura` | `SubscriptionPage`| `src/pages/SubscriptionPage.jsx` | Novo | Painel de gestão da assinatura do produtor. |

---

### Verificação de Segurança
- [x] Nenhuma tela existente será excluída.
- [x] Módulos já funcionais continuam acessíveis.
- [x] Os dados de eventos, clientes e faturamento permanecem intactos.
- [x] O Menu Central passa a refletir as licenças contratadas pelo produtor.
