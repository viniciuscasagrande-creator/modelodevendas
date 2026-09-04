# Relatório de Mapeamento de Autenticação & Multitenant — Fase 28.2

## 1. Visão Geral
Este documento mapeia o subsistema de autenticação, o modelo multitenant e o controle de acesso baseado em permissões (PBAC/RBAC) entre o **DiskHub Backend** (`server.cjs`) e o **DiskHub Web Frontend** (`diskhub-web`).

---

## 2. Endpoints Mapeados e Homologados

| Endpoint | Método | Autenticação | Headers Obrigatórios | Payload / Query | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/auth/login` | POST | Pública | `Content-Type: application/json` | `{ email, password }` | Autentica usuário e retorna dados cadastrais e token |
| `/api/auth/logout` | POST | Autenticada | `Authorization: Bearer <token>` | Nenhum | Revoga a sessão ativa no backend |
| `/api/me/context` | GET | Autenticada | `Authorization: Bearer <token>`, `X-Tenant-Id: <id>` | Query opcional `?tenantId=...` | Retorna o contexto completo do usuário, membership, tenant, plano, licenças e permissões |
| `/api/me/switch-tenant` | POST | Autenticada | `Authorization: Bearer <token>` | `{ tenantId: string }` | Valida membership e autoriza a troca de empresa ativa |
| `/api/dashboard/summary` | GET | Autenticada | `X-Tenant-Id: <id>` | Query opcional `?tenantId=...` | Retorna KPIs e gráficos escopados e isolados do tenant ativo |
| `/api/subscription/current` | GET | Autenticada | `X-Tenant-Id: <id>` | Nenhum | Retorna detalhes do contrato e faturas do tenant ativo |

---

## 3. Schemas de Dados Unificados

### A. Usuário (`User`)
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarColor?: string;
}
```

### B. Vínculo com a Organização (`Membership`)
```typescript
interface Membership {
  role: 'owner' | 'admin' | 'manager' | 'analyst' | 'operator' | 'viewer';
  status: 'active' | 'suspended' | 'pending';
  tenantId: string;
}
```

### C. Empresa / Produtor (`Tenant`)
```typescript
interface Tenant {
  id: string;
  name: string;
  document: string;
  activeProducer: string;
  activeCompany: string;
  status: 'active' | 'suspended' | 'pending';
  plan: 'standard' | 'advanced' | 'expert';
}
```

### D. Assinatura (`Subscription`)
```typescript
interface Subscription {
  id: string;
  plan: 'standard' | 'advanced' | 'expert';
  planName: string;
  status: 'active' | 'trial' | 'past_due' | 'suspended' | 'canceled' | 'expired';
  monthlyPrice: number;
  billingCycle: 'monthly' | 'annual';
  renewsAt: string;
  usersCount: number;
  maxUsers: number;
  activeAppsCount: number;
}
```

### E. Licenciamento (`LicenseEntitlement`)
```typescript
interface LicenseEntitlement {
  app: string;
  name: string;
  status: 'active' | 'upgrade_required' | 'permission_denied';
  access: boolean;
  tier: 'standard' | 'advanced' | 'expert';
}
```

### F. Permissões Atômicas (`permissions`)
```text
crm.customer.read
crm.customer.create
crm.customer.update
crm.customer.delete
finance.payable.read
finance.payable.create
finance.receivable.read
marketing.campaign.read
marketing.campaign.create
support.ticket.read
dashboard.view
```

---

## 4. Isolamento Multitenant e Proteção IDOR
- O cliente transmite `X-Tenant-Id` em todas as chamadas privadas.
- O backend valida a existência e a membership do usuário para o tenant requisitado.
- Caso um usuário tente acessar dados de um tenant não autorizado (ex: `tenant-desconhecido`), a API responde `403 Forbidden` (`tenant_denied`), prevenindo vazamento horizontal de dados.
