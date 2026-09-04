# Relatório de Mapeamento Backend ➔ Frontend — Fase 28.1

## 1. Resumo Executivo
Este documento formaliza a matriz de integração entre o **DiskHub Backend** (Express REST API em `server.cjs`) e o **DiskHub Web Frontend** (`diskhub-web`).

---

## 2. Matriz de Endpoints e Consumidores

| Endpoint | Método | Autenticação | Payload Enviado | Response Retornado | Módulo Backend | Status | Frontend Consumidor |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/auth/login` | POST | Pública | `{ email, password }` | `{ success, user, token }` | Auth | **HOMOLOGADO** | `LoginPage` / `authService.login()` |
| `/api/me/context` | GET | Bearer Token | Nenhum | `{ user, tenant, subscription, apps, permissions }` | Core / Multi-tenant | **HOMOLOGADO** | `AppContext` / `authService.getContext()` |
| `/api/dashboard/summary` | GET | Bearer Token | Nenhum (ou query params) | `{ kpis, series, alerts, recentActivity, subscription }` | Dashboard | **HOMOLOGADO** | `DashboardPage` / `useDashboardQuery` |
| `/api/subscription/current` | GET | Bearer Token | Nenhum | `{ plan, planName, status, users, activeApps }` | Licenciamento | **HOMOLOGADO** | `SubscriptionPage` / `subscriptionService` |
| `/api/plans` | GET | Pública | Nenhum | Lista de planos `[ { id, name, tagline, price, features } ]` | Comercial | **HOMOLOGADO** | `PlansPage` / `subscriptionService` |
| `/api/financeiro/dashboard` | GET | Bearer Token | Nenhum | `{ receitaDiaria, receitaMensal, saldoBancario }` | Financeiro | Existente | `FinanceModule` |
| `/api/financeiro/contas-receber` | GET | Bearer Token | Nenhum | Lista de contas a receber | Financeiro | Existente | `FinanceModule` |
| `/api/contabilidade/dashboard` | GET | Bearer Token | Nenhum | `{ lucroLiquido, ebitda, margem }` | Contabilidade | Existente | `AccountingModule` |
| `/api/crm/leads` | GET | Bearer Token | Nenhum | Lista de leads e funil de vendas | CRM | Preparado | `CrmModule` |
| `/api/events` | GET | Bearer Token | Nenhum | Lista de eventos monitorados | ERP Operacional | Existente | `ErpModule` |

---

## 3. Conformidade com a Arquitetura
1. **Zero Acesso Direto a Banco de Dados**: Todo o fluxo segue rigorosamente `Frontend -> REST API -> Services -> Data`.
2. **Tokens de Requisição**: Cabeçalhos incluem `Content-Type: application/json` e `X-Request-Id` para rastreamento auditável.
3. **Resiliência a Falhas (401/403)**: O frontend intercepta erros 401 para redirecionamento ao login e erros 403 para mensagens comerciais de upgrade de plano.
