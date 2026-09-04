# RUNBOOK DE PRODUÇÃO — DISKHUB BUSINESS CLOUD
## Guia Operacional de Monitoramento, Diagnóstico e Suporte em Produção
**Data:** 04 de Setembro de 2026  
**Sistema:** DiskHub Business Cloud ERP & CRM  
**Versão:** Release 27.1.10  

---

## 1. VERIFICAÇÃO DE SAÚDE (HEALTH CHECK)

* **URL de Produção:** [https://modulos-de-vendas-eight.vercel.app/](https://modulos-de-vendas-eight.vercel.app/)
* **Procedimento de Verificação Inicial:**
  1. Acessar a URL raiz e verificar resposta HTTP 200 OK.
  2. Confirmar ausência de telas brancas e carregamento do nó `#root`.
  3. Validar se o Header e a Sidebar renderizam seus itens (`Dashboard`, `Vendas`, `Eventos`, `CRM`, etc.).
  4. Pressionar `F5` / Recarregar a página para certificar resiliência do SPA.
  5. Acionar o seletor de perfil e alternar entre usuários demo para testar isolamento de sessão.

---

## 2. DIAGNÓSTICO DE ERROS

### 2.1 Erro de Chunk / `ChunkLoadError`
* **Sintoma:** O usuário relata tela em branco após novo deploy ou navegação entre abas.
* **Causa:** Cache do navegador apontando para hash antigo de arquivo JS inlined.
* **Ação Imediata:** O projeto utiliza `vite-plugin-singlefile` que consolida o bundle em `dist/index.html`. Forçar purge de cache da CDN da Vercel ou orientar o usuário a executar Hard Refresh (`Ctrl + F5`).

### 2.2 Falha de Conexão com API / Gateway
* **Sintoma:** Cards de KPI ou Resumo Financeiro exibem mensagem de fallback amigável.
* **Causa:** Timeout ou indisponibilidade temporária de backend remoto.
* **Ação Imediata:** Verificar logs do Edge no painel Vercel. O `apiClient.js` já possui fallback para dados em cache garantindo que nenhuma tela branca ocorra.

### 2.3 Problemas de Licenciamento / Módulos Travados
* **Sintoma:** Usuário reporta bloqueio ao tentar abrir Marketing, Contabilidade ou Automação.
* **Diagnóstico:** Verificar o plano da conta em `/assinatura`. Módulos Advanced exigem upgrade; módulos Expert exigem plano Expert. Este comportamento é **esperado** e faz parte da regra de segurança do sistema.

---

## 3. PROCEDIMENTOS DE CONTINGÊNCIA

1. **Falha Crítica na Vercel:** Acionar deploy secundário via CLI `npx vercel rollback <deployment-id>` ou promover deployment anterior saudável (`dpl_8qiczGcFMPvtskayZdFJXuDSMnya`).
2. **Corrupção de Estado Local:** Limpar `sessionStorage` e `localStorage` no navegador via script de reset seguro.
