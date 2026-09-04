# DEFINIÇÃO OFICIAL DE MÉTRICAS E KPIs DO DASHBOARD
## DiskHub Business Cloud — Single Source of Metric Truth

Data: 04/09/2026  
Versão: 1.0.0  

---

### 1. Receita Bruta (Gross Revenue)
* **Fonte Primária**: Tabela `transactions` / `orders` (Integração PDT)
* **Filtro**: `status IN ('paid', 'confirmed', 'settled')`
* **Data de Referência**: `paid_at` (ou `created_at` quando confirmado imediatamente)
* **Agregação**: `SUM(amount)`
* **Exclusões**: Pedidos com `status IN ('cancelled', 'expired', 'failed', 'refunded_full')`.
* **Regra**: Valores de cortesias gratuitas (`amount = 0`) não alteram a receita financeira.

---

### 2. Receita Líquida (Net Revenue)
* **Fórmula**:  
  $$\text{Receita Líquida} = \text{Receita Bruta} - \text{Taxas da Plataforma} - \text{Estornos Efetivados}$$
* **Taxas da Plataforma**: `SUM(service_fee + gateway_fee)` calculadas sobre os pedidos aprovados.
* **Estornos**: Somatório de reembolsos aprovados no período (`refund_amount`).

---

### 3. Pedidos Confirmados (Paid Orders)
* **Fonte**: Tabela `orders`
* **Filtro**: `status = 'paid'`
* **Agregação**: `COUNT(id)`
* **Exclusões**: Pedidos abandonados no carrinho, pendentes de PIX ou cancelados.

---

### 4. Ingressos Vendidos (Tickets Issued)
* **Fonte**: Tabela `issued_tickets` associada a pedidos confirmados
* **Filtro**: `order_status = 'paid' AND ticket_status NOT IN ('voided', 'cancelled')`
* **Agregação**: `SUM(quantity)`
* **Regra**: Emissão de cortesias operacionais conta para volume de ingressos emitidos/ocupação da casa, porém com valor financeiro zero.

---

### 5. Clientes Únicos (Unique Customers)
* **Fonte**: Tabela `customers` via pedidos
* **Agregação**: `COUNT(DISTINCT customer_id)`
* **Regra**: Se um cliente comprou 3 pedidos no período, ele é contado exatamente 1 vez nesta métrica.

---

### 6. Ticket Médio (Average Order Value)
* **Fórmula**:  
  $$\text{Ticket Médio} = \frac{\text{Receita Bruta}}{\text{Pedidos Confirmados}}$$
* **Tratamento de Exceção (Zero Division)**:  
  Se $\text{Pedidos Confirmados} = 0$, o sistema retorna expressamente `null` (Frontend exibe `—`), evitando `NaN` ou `Infinity`.

---

### 7. Taxa de Conversão (Conversion Rate)
* **Fórmula**:  
  $$\text{Taxa de Conversão} = \left(\frac{\text{Pedidos Confirmados}}{\text{Visitantes Únicos}}\right) \times 100$$
* **Tratamento de Exceção**:  
  Se $\text{Visitantes Únicos} = 0$ ou se a coleta de tráfego analítico estiver desconectada, retorna `null` (Frontend exibe `Indisponível`).

---

### 8. Variação Comparativa de Período (Period Variation %)
* **Fórmula**:  
  $$\text{Variação \%} = \left(\frac{\text{Valor Atual} - \text{Valor Anterior}}{\text{Valor Anterior}}\right) \times 100$$
* **Tratamento de Exceção**:  
  Se $\text{Valor Anterior} = 0$, retorna `null`, evitando valores astronômicos ou divisão por zero.

---

### 9. Taxa de Ocupação do Evento (Occupancy %)
* **Fórmula**:  
  $$\text{Ocupação \%} = \left(\frac{\text{Ingressos Vendidos}}{\text{Capacidade Total}}\right) \times 100$$
* **Regra**: Se o evento não possui capacidade configurada (`capacity = null` ou `0`), a ocupação retorna `null`. Evento esgotado ocorre apenas quando $\text{Ingressos Vendidos} \ge \text{Capacidade Total}$.

---

### 10. Formato de Dados nas APIs
* **Moeda**: Retornada estritamente como número float/double (`184250.45` e não como string `"R$ 184.250,45"`). A formatação monetária é aplicada no cliente via `Intl.NumberFormat('pt-BR')`.
* **Percentual**: Retornado como número float (`12.4` e não string `"12,4%"`).
* **Datas**: Formato padrão ISO-8601 UTC (`2026-09-04T12:00:00Z`).
