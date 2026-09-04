# RELATÓRIO DE MAPEAMENTO DE TESTES — FASE 27.1.9
## Suíte de Testes E2E, Regressão e Jornadas Críticas com Playwright
**Data:** 04 de Setembro de 2026  
**Sistema:** DiskHub Business Cloud  
**Versão dos Testes:** Playwright 1.62.1  
**Status do Mapeamento:** Concluído com Sucesso  

---

## 1. OBJETIVO DO MAPEAMENTO

Mapear de forma exaustiva a infraestrutura de testes ponta a ponta (E2E), contratos de interfaces, seletores semânticos (`data-testid`), rotas do sistema, fixtures e políticas de execução do DiskHub Business Cloud. Este documento estabelece a base para garantir que nenhuma regressão ocorra em menus, rotas, telas brancas, Dashboard, licenciamento, permissões ou no ecossistema multitenant.

---

## 2. CONFIGURAÇÃO DA INFRAESTRUTURA DE TESTES

### 2.1 Configuração Global (`playwright.config.js`)
* **Base URL:** `http://localhost:5173/` (Vite Dev Server)
* **Web Server Automatizado:** Comando `npm run dev` com reutilização em ambiente local (`reuseExistingServer: !process.env.CI`) e timeout de 120s.
* **Navegador Padrão:** Chromium (Desktop Chrome / 1280x720) com suporte a mobile e outros navegadores.
* **Estratégia de Retentativa:** 0 retentativas locais, 2 retentativas em CI (`process.env.CI ? 2 : 0`).
* **Coleta de Evidências:**
  * Traces: `on-first-retry`
  * Screenshots: `only-on-failure`
  * Vídeo: `retain-on-failure`
  * Relatórios: HTML (`html`), List (`list`)

### 2.2 Dependências
* `@playwright/test`: `^1.62.1`
* `@testing-library/react` / `@testing-library/jest-dom`
* Node.js v20+ / Windows PowerShell & CMD

---

## 3. INVENTÁRIO DOS ARQUIVOS DE TESTE MAPEADOS

| # | Arquivo de Teste | Fase / Domínio | Qtd Testes | Status |
|---|---|---|:---:|:---:|
| 1 | `tests/app-launcher.spec.js` | Fase 27.1 — Menu Central de Apps (DiskHub Launchpad) | 7 | 100% PASS |
| 2 | `tests/app-launcher-commercial.spec.js` | Fase 27.1.1 — Central de Apps Comercial & Filtros | 6 | 100% PASS |
| 3 | `tests/product-pages.spec.js` | Fase 27.1.2 — Páginas Comerciais dos Módulos & Fallbacks | 5 | 100% PASS |
| 4 | `tests/plans.spec.js` | Fase 27.1.3 — Planos Standard, Advanced e Expert | 5 | 100% PASS |
| 5 | `tests/checkout.spec.js` | Fase 27.1.4 — Contratação e Checkout Comercial | 4 | 100% PASS |
| 6 | `tests/licensing.spec.js` | Fase 27.1.5 — Licenciamento e AppAccessGuard | 4 | 100% PASS |
| 7 | `tests/subscription.spec.js` | Fase 27.1.6 — Minha Assinatura e Gestão do Contrato | 7 | 100% PASS |
| 8 | `tests/users-permissions.spec.js` | Fase 27.1.7 — Usuários, Papéis e Permissões por Módulo | 5 | 100% PASS |
| 9 | `tests/module-integration.spec.js` | Fase 27.1.8 — Integração Padronizada dos Módulos | 5 | 100% PASS |
| 10 | `tests/dashboard-layout.spec.js` | Fase 27.1.8.1 — Estrutura e Responsividade do Dashboard | 5 | 100% PASS |
| 11 | `tests/dashboard-executive.spec.js` | Fase 27.1.8.2 — Refinamento Executivo e Operacional | 8 | 100% PASS |
| 12 | `tests/dashboard-real-data.spec.js` | Fase 27.1.8.3 — Dashboard com Dados Reais e APIs | 5 | 100% PASS |
| 13 | `tests/notifications.spec.js` | Fase 27.1.8.4 — Central de Alertas e Notificações *(Novo)* | 5 | A executar |
| 14 | `tests/menu-routes-sweep.spec.js` | Fase 27.1.9 — Varredura Completa de Rotas e Anti-Tela-Branca *(Novo)* | 6 | A executar |
| 15 | `tests/tenant-isolation.spec.js` | Fase 27.1.9 — Isolamento de Tenant e Cache Multi-Produtor *(Novo)* | 4 | A executar |

---

## 4. MAPEAMENTO DE SELETORES SEMÂNTICOS (`data-testid`)

### 4.1 Shell Global, Header & Sidebar
* `app-launcher-button`: Botão no Header para abertura do Launchpad / Central de Apps
* `app-launcher`: Modal overlay da Central de Apps
* `app-search`: Input de busca em tempo real da Central de Apps
* `app-filter-all`, `app-filter-active`, `app-filter-available`, `app-filter-upgrade`: Botões de filtro
* `app-bootstrap`: Indicador de inicialização do sistema
* `header-notifications-button`: Botão de sino de notificações e alertas no Header
* `notifications-drawer`: Gaveta lateral de notificações e alertas operacionais
* `notifications-badge`: Badge com contador de notificações e alertas pendentes

### 4.2 Dashboard Executivo e Operacional
* `dashboard-page`: Container raiz do Dashboard
* `kpi-revenue`: Card de Receita Bruta acumulada
* `kpi-sales`: Card de Vendas Totais
* `kpi-tickets`: Card de Ingressos / Itens Emitidos
* `sales-performance-chart`: Gráfico executivo de evolução temporal das vendas
* `conversion-funnel`: Gráfico/funil de conversão operacional
* `recent-sales-table`: Tabela com as últimas transações comerciais
* `executive-alerts-summary`: Painel com resumo dos alertas operacionais críticos
* `operational-calendar`: Widget do calendário de operação
* `period-selector`: Seletor de intervalo temporal (Hoje, 7D, 30D, Mês, Ano)
* `filter-period-today`: Filtro do período Hoje
* `filter-period-month`: Filtro do período Este Mês
* `refresh-data-button`: Botão de recarregar e revalidar dados
* `export-report-button`: Botão de exportação do relatório consolidado
* `toast-export-success`: Notificação de confirmação de exportação

### 4.3 Módulos, Licenciamento & Guardas
* `module-shell`: Moldura unificada de módulo contratado com breadcrumbs e tenant
* `module-crm`: Área de trabalho do CRM & Vendas
* `sales-page`: Área de trabalho de Vendas Online / Ingressos
* `access-no-license`: Bloqueio comercial padrão quando o módulo não pertence ao plano ativo
* `access-blocked`: Card interno de bloqueio com instrução e botão de upgrade
* `access-implementing`: Estado de implantação para módulos em desenvolvimento operacional

### 4.4 Assinatura, Planos & Checkout
* `subscription-page`: Painel de gestão da assinatura
* `subscription-plan`: Indicador do tier atual contratado
* `subscription-status`: Badge de status do contrato
* `subscription-apps`: Lista dos aplicativos e módulos inclusos no contrato
* `upgrade-button`: Botão CTA para iniciar migração de plano
* `subscription-invoices`: Tabela de faturas emitidas e pagamentos
* `subscription-billing`: Cartão e método de cobrança cadastrado
* `subscription-history`: Trilha de auditoria e log de eventos contratuais
* `plans-page`: Vitrine comparativa de planos comerciais
* `plan-card-standard`, `plan-card-advanced`, `plan-card-expert`: Cards de planos
* `contract-advanced-button`: Botão de contratação direta do tier
* `checkout-page`: Fluxo de pagamento
* `checkout-stepper`: Indicador das etapas do checkout
* `checkout-payment-method`: Seleção de método (Cartão / Pix / Boleto)
* `checkout-submit-button`: Botão finalizador do pedido

### 4.5 Usuários & Permissões
* `users-page`: Listagem da equipe e membros com acesso
* `users-table`: Tabela detalhada de usuários do tenant
* `invite-user-button`: Botão para convidar novo membro
* `invite-user-modal`: Modal de convite de usuário
* `save-user-button`: Botão de persistência do usuário convidado
* `edit-user-modal`: Modal de edição de permissões
* `delete-user-modal`: Modal de confirmação de exclusão
* `confirm-delete-user-button`: Confirmação de revogação de acesso

---

## 5. MAPEAMENTO DAS ROTAS DO SISTEMA (19 ROTAS)

Todas as rotas mapeadas abaixo devem carregar sem tela branca, exibir elementos nativos da aplicação e tolerar refresh direto (`page.reload()`):

1. `/` (Dashboard Executivo & Operacional)
2. `/dashboard` (Alias canônico do Dashboard)
3. `/vendas` (Vendas Online, Pedidos e Ingressos)
4. `/eventos` (Gestão de Eventos, Sessões e Lotes)
5. `/pdvs` (Pontos de Venda Físicos e Terminais)
6. `/ingressos` (Controle de Ingressos e Carteira Digital)
7. `/crm` (CRM 360º, Leads e Oportunidades)
8. `/sac` (SAC, Atendimento ao Cliente e Chamados)
9. `/financeiro` (Financeiro, Fluxo de Caixa e Repasses)
10. `/contabilidade` (Contabilidade e Fiscal / NF-e)
11. `/estoque` (Estoque, Insumos e Logística)
12. `/patrimonio` (Patrimônio e Ativos)
13. `/marketing` (Marketing Digital, Campanhas e Disparos)
14. `/bi` (BI & Analytics / Indicadores)
15. `/notificacoes` (Central de Notificações e Alertas)
16. `/integracoes` (Hub de APIs e Webhooks)
17. `/usuarios` (Gestão de Usuários e Acessos)
18. `/planos` (Planos Comerciais & Upgrade)
19. `/assinatura` (Minha Assinatura e Faturamento)

---

## 6. DIRETRIZES DE ISOLAMENTO E PREVENÇÃO DE FALSOS POSITIVOS

1. **Zero Mocks de Bypass:** Nenhum teste deve burlar autenticação ou forçar retorno `true` estático em verificações de segurança.
2. **Escopo Preciso de Localizadores:** Proibido uso de `page.getByText('...')` em termos comuns como "CRM", "DiskHub Business Cloud" ou nomes de usuários para evitar violação de modo estrito (`strict mode violation`). Sempre utilizar `.getByRole()` com nível semântico ou escopo pelo container pai (`page.getByTestId('...').getByText(...)`).
3. **Resiliência a Viewports:** Elementos não devem ser omitidos em telas móveis através de classes que impeçam a validação pelo Playwright, preservando flexibilidade de rolagem com `overflow-x-auto`.
4. **Isolamento de Estado:** Testes limpam `sessionStorage` e `localStorage` entre execuções ou inicializam com o contexto canônico via fixtures.
