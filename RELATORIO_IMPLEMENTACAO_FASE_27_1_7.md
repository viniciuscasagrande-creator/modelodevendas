# RELATÓRIO DE IMPLEMENTAÇÃO — FASE 27.1.7
## Usuários, Papéis e Permissões por Plano/Módulo (RBAC + Tenant)

Data de Conclusão: 03/09/2026  
Status: 100% Concluído e Homologado.

---

### 1. Resumo Executivo
Foi implementada a arquitetura de controle de acesso de pessoas dentro de cada empresa/produtor (**RBAC — Role-Based Access Control**), desacoplando expressamente a **Licença da Empresa** da **Permissão do Usuário**.

```text
EMPRESA CONTRATOU O MÓDULO? ➔ LICENÇA ESTÁ ATIVA? ➔ USUÁRIO POSSUI PERMISSÃO? ➔ ACESSO LIBERADO
```

### 2. Arquivos Criados e Modificados
- `src/config/roles.js` (Definição dos 6 papéis fundamentais: Owner, Admin, Manager, Analyst, Operator, Viewer)
- `src/config/permissions.js` (Catálogo granular de permissões por módulo: `modulo.recurso.acao`)
- `src/services/userAccessService.js` (Motor de validação e precedência com DENY priority)
- `src/components/users/PermissionGuard.jsx` (Componente de proteção declarativa de ações)
- `src/components/users/AccessDenied.jsx` (Tela amigável de bloqueio sem tela branca ou 404)
- `src/components/users/InviteUserModal.jsx` (Modal de convite com seleção de papel e módulos licenciados)
- `src/components/users/UserPermissionsModal.jsx` (Matriz interativa de permissões por módulo)
- `src/pages/subscription/UsersManagementPage.jsx` (Painel completo de gestão de equipe e franquias)
- `tests/users-permissions.spec.js` (Testes automatizados Playwright)

### 3. Estrutura de Papéis Entregue
1. **Owner**: Proprietário da conta, poderes executivos plenos, cancelamento e faturamento. Regra inviolável: o tenant sempre preserva no mínimo 1 Owner ativo.
2. **Admin**: Administra equipe e parâmetros operacionais de todos os módulos licenciados.
3. **Manager**: Gestão comercial e de equipes, acompanhamento de metas e aprovação de repasses.
4. **Analyst**: Especialista analítico, leitura de relatórios executivos, DRE e forecast.
5. **Operator**: Operador de rotina (atendente de SAC, caixa de PDV, lançamento de pedidos).
6. **Viewer**: Acesso estritamente para consulta e leitura, sem alteração de dados.

### 4. Regras Críticas de Negócio e Segurança
* **Respeito à Licença da Empresa**: Módulos não contratados (ex: Contabilidade para plano Standard) exibem indicação de "Não Contratado" com link para a página comercial do produto, impedindo concessão fictícia de permissões.
* **Garantia de Não Exclusão de Dados**: Suspender ou remover usuário preserva a autoria histórica de tickets, pedidos, clientes e lançamentos financeiros.
* **Precedência e Bloqueios**: Respostas de bloqueio padronizadas (`LICENSE_REQUIRED`, `PERMISSION_DENIED`, `APP_ACCESS_DENIED`, `USER_SUSPENDED`).
