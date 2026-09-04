# RELATÓRIO DE MAPEAMENTO DE DADOS DO DASHBOARD — FASE 27.1.8.3
## Inventário de Dados, Fontes e Agregações

Data: 04/09/2026  
Status: Concluído  

---

### 1. Inventário de KPIs e Fontes de Dados

| KPI / Métrica | Domínio / Origem | Endpoint / Serviço | Coleção / Tabela Base | Status | Regra de Cálculo & Filtro |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Receita Bruta** | PDT Vendas & Financeiro | `/api/dashboard/summary` | `transactions`, `orders` | Disponível | `SUM(amount)` onde `status = 'paid'`. Exclui cancelados e estornados. |
| **Receita Líquida** | Financeiro | `/api/dashboard/finance` | `settlements`, `fees` | Disponível | `Receita Bruta - Taxas da Plataforma - Estornos/Chargeback`. |
| **Pedidos Confirmados** | PDT Pedidos | `/api/dashboard/summary` | `orders` | Disponível | `COUNT(id)` onde `status = 'paid'`. |
| **Ingressos Vendidos** | PDT Ingressos | `/api/dashboard/summary` | `issued_tickets` | Disponível | `SUM(quantity)` de pedidos com pagamento confirmado. |
| **Clientes Únicos** | CRM & PDT | `/api/dashboard/summary` | `customers` | Disponível | `COUNT(DISTINCT customer_id)` com pelo menos 1 compra aprovada. |
| **Ticket Médio** | Agregação | `/api/dashboard/summary` | Cálculo derivado | Disponível | `Receita Bruta / Pedidos Pagos`. Retorna `null` se pedidos = 0. |
| **Taxa de Conversão** | Analytics / Funil | `/api/dashboard/funnel` | `sessions`, `pageviews` | Disponível | `Pedidos Pagos / Visitantes Únicos`. Retorna `null` se tráfego = 0. |
| **Performance Temporal** | PDT & Vendas | `/api/dashboard/performance` | `daily_sales_rollup` | Disponível | Granularidade horária (Hoje) ou diária (7d, 30d, mês). |
| **Funil de Vendas** | Tráfego & Checkout | `/api/dashboard/funnel` | `funnel_events` | Disponível | Visualizações ➔ Checkout ➔ Pedidos ➔ Pagamentos confirmados. |
| **Origem das Vendas** | Marketing / UTM | `/api/dashboard/funnel` | `order_attributions` | Disponível | Agrupamento por `utm_source` normalizado (Direto, Meta, Google, etc.). |
| **Resumo Financeiro** | Módulo Financeiro | `/api/dashboard/finance` | `accounts_payable`, `repasses` | Disponível | Saldo disponível, saldo a liberar (D+2/D+14), repasses e taxas. |
| **Operação de Eventos**| PDT Eventos | `/api/dashboard/events` | `events`, `batches` | Disponível | Ingressos vendidos, capacidade, ocupação % (`sold / capacity`). |
| **Alertas Operacionais**| Monitoramento | `/api/dashboard/alerts` | `system_health`, `alerts` | Disponível | Regras determinísticas de PDVs offline, lotes próximos do fim e SLA. |
| **Atividade Recente** | Auditoria Geral | `/api/dashboard/activity` | `audit_logs`, `orders` | Disponível | Últimos 5 a 8 eventos cronológicos com autoria, tipo e valor. |
| **Insights Comerciais**| Inteligência | `/api/dashboard/insights` | Análise determinística | Disponível | Regras sobre crescimento de receita, concentração e canais líderes. |

---

### 2. Regras de Isolamento Multitenancy
* Todas as consultas e agregações filtram estritamente pelo `tenantId` da sessão autenticada (`subscriptionService.getSubscription().producerId`).
* Não é aceito parâmetro arbitrário de `tenantId` na URL sem validação de vínculo com o usuário logado.
* Quando `eventId = 'all'`, são considerados exclusivamente os eventos do produtor autenticado.
