# RELEASE NOTES — VERSÃO 27.1.10
## DiskHub Business Cloud ERP & CRM
**Data de Lançamento:** 04 de Setembro de 2026  
**Status do Release:** Go-Live Homologado  

---

## 1. VISÃO GERAL
A versão 27.1.10 consolida a infraestrutura de validação contínua e certificação E2E da plataforma DiskHub Business Cloud, eliminando causas-raiz de falhas de navegação, telas brancas e divergências de rotas.

---

## 2. NOVOS RECURSOS & MELHORIAS
* **Suíte de Testes E2E Automatizada:** 95 cenários de teste automatizados com Playwright com cobertura de 100% em rotas, menus, Dashboard, planos e licenciamento.
* **Varredura Universal de Rotas:** 19 rotas operacionais testadas contra falhas de renderização e recarregamento direto.
* **Central de Notificações e Alertas:** Abertura fluida da gaveta de notificações, marcação em lote como lidas e alternância entre notificações, alertas e feed de atividade.
* **Melhorias de Responsividade:** Stepper de checkout e cabeçalho otimizados para resoluções compactas (`390px`, `768px`, `1024px`).
* **Isolamento Multitenant Confiável:** Garantia de persistência de contexto em sessões de múltiplos produtores e empresas.

---

## 3. CORREÇÕES DE BUGS
* Correção de exceção no método `apiClient.getTenantId` que impedia o carregamento de dados em determinadas visualizações financeiras.
* Correção de cliques em cards na Central de Apps para navegação direta aos módulos.
* Correção de localizadores semânticos e eliminação de conflitos de modo estrito no Playwright.
