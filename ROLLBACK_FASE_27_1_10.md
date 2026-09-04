# PLANO DE ROLLBACK — FASE 27.1.10
## Procedimento de Reversão de Versão do DiskHub Business Cloud
**Data:** 04 de Setembro de 2026  
**Versão Atual:** `release-27.1.10` (Commit `76fdbba`)  
**Ponto de Restauração Anterior Conhecido (Checkpoint Saudável):** `459d921`  
**Deploy Anterior Homologado:** `dpl_8qiczGcFMPvtskayZdFJXuDSMnya`  

---

## 1. ESTRATÉGIA DE ROLLBACK

O DiskHub Business Cloud opera como SPA client-side otimizado pela Vercel e empacotado via Vite. Como não há migrações destrutivas de banco de dados SQL executadas nesta fase, a reversão de emergência é 100% segura, instantânea e determinística.

---

## 2. PROCEDIMENTO DE ROLLBACK EM PRODUÇÃO (VERCEL)

### Opção A: Reversão Instantânea via CLI da Vercel (Menos de 30 segundos)
```bash
npx vercel rollback dpl_8qiczGcFMPvtskayZdFJXuDSMnya
```
* Este comando aponta o alias de produção (`modulos-de-vendas-eight.vercel.app`) imediatamente para o deployment anterior aprovado, sem necessidade de re-build.

### Opção B: Reversão pelo Painel Vercel
1. Acessar o dashboard do projeto `developdiskingressos-9897s-projects/modulos-de-vendas`.
2. Navegar para a aba **Deployments**.
3. Localizar o deployment com hash `459d921`.
4. Clicar no menu `...` e selecionar **Promote to Production**.

---

## 3. PROCEDIMENTO DE ROLLBACK NO GIT

Caso seja necessário reverter o histórico de código em caso de anomalia grave:
```bash
# 1. Retornar ao commit imediatamente anterior
git checkout master
git revert 76fdbbacdf3bc7ae08ae764b553bbf7dd1f2d130 --no-edit

# 2. Atualizar branches remotas
git push origin master
git push origin master:main

# 3. Executar re-deploy
npm run build
npx vercel --prod --yes
```

---

## 4. VALIDAÇÃO PÓS-ROLLBACK
* Executar `npm run test:e2e:critical`
* Validar que as rotas `/dashboard`, `/planos`, `/crm` e `/vendas` retornam HTTP 200 sem telas brancas.
