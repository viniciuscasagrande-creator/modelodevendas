# Módulo Contabilidade

## Objetivo
Implantar o núcleo contábil e fiscal do Disk Hub, gerando Balancetes, Balanços Patrimoniais, Livro Diário/Razão e auditorias de conciliação integradas com inteligência artificial.

## Estrutura de Menus
- **Dashboard Contábil**: Visão executiva de lucro líquido, EBITDA e provisões tributárias.
- **Plano de Contas**: Estrutura contábil formal (Ativo, Passivo, Patrimônio Líquido, Receitas, Despesas).
- **Lançamentos**: Histórico de partidas dobradas (Débito/Crédito).
- **Livro Diário**: Registro diário de todos os atos contábeis.
- **Livro Razão**: Registro de movimentos individuais agrupados por conta contábil.
- **Balancete**: Verificação periódica de saldos devedores e credores.
- **Balanço Patrimonial**: Situação financeira e patrimonial consolidada.
- **DRE Contábil**: Demonstração de Resultado oficial com dedução fiscal e impostos.
- **Obrigações**: Controle de envio de obrigações acessórias (SPED, DCTF, etc.).
- **Auditoria**: Painel de conferência de lançamentos manuais e automáticos.

## Funcionalidades Chave
- **Lançamentos Automáticos**: Geração automática de débito/crédito a partir de gatilhos financeiros (Ex: pagamento de conta a pagar).
- **Integração Financeiro ➔ Contabilidade**: Sem necessidade de redigitação de informações; tudo migra via partidas pré-configuradas.
- **Geração de Balancetes**: Relatórios rápidos em PDF/Excel com um clique.
- **Controle Fiscal**: Cálculo de retenção de impostos (ISS, PIS, COFINS, CSLL, IRRF) sobre serviços de bilheteria.
- **Auditoria de Alterações**: Log completo de quem alterou ou inseriu lançamentos passados.
- **Exportação SPED**: Geração do arquivo SPED Fiscal e Contábil para integração com a Receita Federal.

## KPIs
- **Lucro Líquido**: Receitas menos custos, despesas operacionais e tributárias.
- **EBITDA**: Lucro antes de juros, impostos, depreciação e amortização.
- **Custos Operacionais**: Despesas diretas de execução de bilheterias.
- **Margem de Lucro**: Percentual de rentabilidade líquida do ecossistema.
- **Obrigações Pendentes**: Quantidade de relatórios tributários do mês não transmitidos.

## Estrutura de Banco de Dados (Tabelas)
- `contabil_lancamentos` (Débitos e créditos em partidas dobradas)
- `contabil_plano_contas` (Plano de contas referencial SEFAZ/Receita)
- `contabil_balancete` (Saldos mensais agregados)
- `contabil_livro_diario` (Logs temporários consolidados para fechamento)
- `contabil_livro_razao` (Movimentações acumuladas)
- `contabil_auditoria` (Trilha de auditoria contábil)

## APIs
- `GET /contabilidade/dashboard`: Indicadores de lucro e balanço patrimonial.
- `POST /contabilidade/lancamentos`: Realizar lançamento contábil manual.
- `GET /contabilidade/balancete`: Retorna saldos de verificação.
- `GET /contabilidade/dre`: Retorna DRE contábil formatada.
