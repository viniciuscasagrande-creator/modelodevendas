# RELATÓRIO DE MAPEAMENTO COMERCIAL — FASE 27.2.2
## Mapeamento da Estrutura Comercial e Página de Planos
**Data:** 04 de Setembro de 2026  
**Sistema:** DiskHub Business Cloud  
**Domínio:** Arquitetura Comercial e Vitrine de Planos (/planos)  

---

## 1. INVENTÁRIO DA ESTRUTURA ATUAL

* **Rota Principal de Planos:** `/planos` gerenciada via `src/pages/plans/PlansPage.jsx` e renderizada por `App.jsx`.
* **Configurações Atuais:**
  - `src/config/plans.js`: Define os 3 tiers (`standard`, `advanced`, `expert`) com módulos e features.
  - `src/config/commercialPlans.js`: Centraliza a nova narrativa comercial com resultados (`MAIS ORGANIZAÇÃO`, `MAIS VENDAS`, `MAIS AUTOMAÇÃO`), vantagens detalhadas e objetivos operacionais.
  - `src/config/addons.js`: Define 9 add-ons comerciais (`addon-users`, `addon-whatsapp`, `addon-email`, `addon-api`, `addon-storage`, `addon-whitelabel`, `addon-training`, `addon-consulting`, `addon-support`).
  - `src/config/products.js`: Contém o catálogo técnico e comercial das páginas individuais `/produtos/:id`.
  - `src/services/subscriptionService.js`: Gerencia a assinatura ativa do produtor (`plan`, `status`, `producerId`).
* **Conexão com Checkout:**
  - Botões de contratação direcionam para `/contratacao?plan=standard`, `/contratacao?plan=advanced` e `/contratacao?plan=expert`.
* **Consultas e Parâmetros Suportados:**
  - `?produto=marketing` ou `?produto=ia`: Exibe banner contextual indicando em qual plano o módulo está contido.
  - `?upgrade=true`: Realça a oportunidade de evolução a partir do plano ativo.

---

## 2. PONTOS DE MELHORIA IDENTIFICADOS E PLANO DE AÇÃO

1. **Repensar a Narrativa de Valor:** Substituir a listagem técnica fria de módulos por benefícios tangíveis e promessas de resultado.
2. **Posicionar os 3 Pacotes com Equilíbrio:**
   - **Standard:** "Organize sua operação" (CRM + ERP + Financeiro)
   - **Advanced:** "Venda mais e tenha mais controle" (Standard + Marketing + SAC + BI) — **Destaque visual "MAIS RECOMENDADO"**
   - **Expert:** "Automatize e escale sua operação" (Advanced + Contabilidade + Automação + IA + Integrações)
3. **Recomendador Interativo ("Qual é o seu objetivo?"):**
   - Inserir seletor intuitivo baseado em objetivos: Organizar empresa (Standard), Vender mais (Advanced) e Automatizar operação (Expert) com highlight suave.
4. **Comparador de Recursos Adaptativo:**
   - Visual em tabela estruturada para Desktop e modo Accordion por categorias para Mobile, eliminando qualquer risco de rolagem horizontal desnecessária.
5. **Preservação Integral de Seletores (`data-testid`):**
   - `plans-page`, `plans-hero`, `plan-standard`, `plan-advanced`, `plan-expert`, `plan-standard-cta`, `plan-advanced-cta`, `plan-expert-cta`, `plan-comparison`, `addons-section`.
