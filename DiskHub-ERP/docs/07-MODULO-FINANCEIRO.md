# Módulo Financeiro

## Objetivo
Implantar o núcleo financeiro do Disk Hub, centralizando contas a pagar, contas a receber, bancos, fluxo de caixa e relatórios gerenciais como DRE.

## Estrutura de Menus
- **Dashboard Financeiro**: Painel executivo com receita diária, saldo em bancos e contas a pagar/receber.
- **Contas a Receber**: Lançamento de faturamentos de ingressos e taxas.
- **Contas a Pagar**: Lançamento de fornecedores, repasses de eventos e custos fixos.
- **Fluxo de Caixa**: Visão de fluxo de caixa previsto x realizado diário e mensal.
- **Conciliação Bancária**: Importação de arquivos OFX e conciliação automática com movimentos do ERP.
- **Bancos**: Cadastro de contas bancárias (Banco do Brasil, Itaú, Stone, etc.).
- **Métodos de Cobrança**:
  - **PIX**: Cobrança por QR Code estático/dinâmico.
  - **Cartões**: Controle de taxas de adquirentes e parcelamentos.
  - **Boletos**: Emissão de boletos de lote com registro em banco.
- **Centro de Custos**: Classificação de despesas por departamento ou evento.
- **Plano de Contas Financeiro**: Árvore estruturada de receitas e despesas.
- **DRE Gerencial**: Demonstração do Resultado do Exercício com fins gerenciais.
- **Relatórios**: Exportação em PDF/Excel.

## Funcionalidades Chave
- **Recebimentos Automáticos**: Integração direta com gateway de ingressos.
- **Pagamentos Recorrentes**: Agendamento de custos fixos (servidores, licenças).
- **Parcelamentos**: Divisão de recebíveis em até 12x com taxas antecipadas.
- **Cobrança via PIX**: API Pix Banco Central com webhook de liquidação instantânea.
- **Conciliação Automática**: Cruzamento inteligente de transações do extrato com o contas a receber/pagar.
- **Importação OFX**: Upload manual ou automatizado de arquivos de extrato bancário padrão.
- **Controle de Inadimplência**: Alertas automáticos para contas a receber atrasadas.
- **Aprovação de Pagamentos**: Alçada de aprovações multinível por perfil (Diretor/Financeiro).
- **Fechamento Diário de Caixa**: Conciliação de valores físicos arrecadados em bilheterias locais.

## KPIs
- **Receita Diária / Mensal**: Faturamento total consolidado.
- **Ticket Médio**: Receita total dividida pela quantidade de transações.
- **Inadimplência**: Percentual de duplicatas vencidas e não pagas.
- **Saldo Bancário**: Saldo consolidado em todas as contas cadastradas.
- **Fluxo Previsto x Realizado**: Desvio entre orçamento planejado e custos executados.

## Estrutura de Banco de Dados (Tabelas)
- `financeiro_contas_receber` (Controle de duplicatas a receber)
- `financeiro_contas_pagar` (Controle de contas a pagar de fornecedores)
- `financeiro_movimentos` (Registro individual de entradas e saídas de caixa)
- `financeiro_bancos` (Cadastro de agências e contas bancárias)
- `financeiro_conciliacao` (Status de cruzamento de extratos)
- `financeiro_centro_custo` (Divisão departamental)
- `financeiro_fluxo_caixa` (Saldos diários previstos)
- `financeiro_dre` (Mapeamento de grupos de DRE)

## APIs
- `GET /financeiro/dashboard`: Retorna KPIs rápidos.
- `GET /financeiro/contas-receber`: Listagem de receitas pendentes e recebidas.
- `POST /financeiro/contas-receber`: Criar lançamento de receita.
- `GET /financeiro/contas-pagar`: Listagem de despesas.
- `POST /financeiro/conciliacao`: Conciliar transação do extrato.
