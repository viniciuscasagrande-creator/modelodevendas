# RELATÓRIO DE MAPEAMENTO DE MÓDULOS — FASE 27.1.8
## Levantamento Técnico Pré-Integração

Data: 03/09/2026  
Status: Concluído  

---

### 1. Tabela de Mapeamento dos 10 Módulos

| Módulo | Rota Principal | Componente Atual | Status Operacional | Licença Requerida | Prefixo de Permissão | Ação da Fase 27.1.8 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CRM** | `/crm` | `CrmPage.jsx` | Funcional | `crm` | `crm.*` | Envolver em `ModuleShell` + `AppEntryGuard` |
| **ERP** | `/vendas`, `/pdv` | `SalesPage.jsx` | Funcional | `erp` | `erp.*` | Envolver em `ModuleShell` + `AppEntryGuard` |
| **Financeiro** | `/financeiro` | `FinancePage.jsx` | Funcional | `finance` | `finance.*` | Envolver em `ModuleShell` + `AppEntryGuard` + sub-guards |
| **Marketing** | `/marketing` | `MarketingPage.jsx` | Funcional | `marketing` | `marketing.*` | Envolver em `ModuleShell` + `AppEntryGuard` |
| **SAC 360º** | `/sac` | `SacPage.jsx` | Funcional | `support` | `support.*` | Envolver em `ModuleShell` + `AppEntryGuard` |
| **BI & Analytics** | `/bi`, `/ai` | `AiAnalyticsPage.jsx` | Funcional | `analytics` | `analytics.*` | Envolver em `ModuleShell` + `AppEntryGuard` |
| **Contabilidade** | `/contabilidade` | `AccountingPage.jsx` | Funcional | `accounting` | `accounting.*` | Envolver em `ModuleShell` + `AppEntryGuard` |
| **Automação** | `/automacao` | `PreparationPage.jsx` | Em implantação | `automation` | `automation.*` | Integrar via `ModuleShell` com status `implementing` |
| **Disk AI** | `/ia` | `PreparationPage.jsx` | Funcional (Copilot) | `ai` | `ai.*` | Envolver em `ModuleShell` + `AppEntryGuard` |
| **Integrações** | `/integracoes` | `AppStorePage.jsx` | Funcional | `integrations` | `integrations.*`| Envolver em `ModuleShell` + `AppEntryGuard` |

---

### 2. Diretrizes de Segurança
* **Nenhum código ou componente operacional será excluído ou substituído por placeholders**.
* O `ModuleShell` atuará como um invólucro (wrapper) corporativo que injeta tenant, usuário autenticado, breadcrumbs, atalho para a Central de Apps e tratamento de erros (Error Boundary).
* O `AppEntryGuard` aplicará a validação em cascata (Assinatura -> Licença -> Permissão) sem permitir quebras de tela.
