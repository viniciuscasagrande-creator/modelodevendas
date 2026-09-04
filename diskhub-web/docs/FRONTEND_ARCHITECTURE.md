# Arquitetura do Frontend — DiskHub Business Cloud (`diskhub-web`)

## 1. Visão Geral
O projeto `diskhub-web` é o novo frontend oficial e independente do **DiskHub Business Cloud**, desenvolvido para dissociar a experiência do produtor do núcleo transacional e analítico de backend.

```text
┌───────────────────────────────────────────────┐
│             FRONTEND DISKHUB                  │
│       React 19 + Vite + TypeScript            │
│         Tailwind CSS + TanStack Query         │
│                                               │
│  /login                                       │
│  /app/dashboard                               │
│  /app/apps                                    │
│  /app/planos                                  │
│  /app/assinatura                              │
│  /app/crm, erp, financeiro, etc.              │
└──────────────────────┬────────────────────────┘
                       │ HTTPS / JSON REST API
                       │ Authorization: Bearer <token>
                       ▼
┌───────────────────────────────────────────────┐
│              DISKHUB BACKEND                  │
│              Express / Node.js                │
│                                               │
│  /api/auth/login                              │
│  /api/me/context                              │
│  /api/dashboard/summary                       │
│  /api/subscription/current                    │
│  /api/plans                                   │
│  /api/financeiro, crm, erp, etc.              │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│             BANCO DE DADOS & SERVIÇOS         │
│             PostgreSQL / Prisma / JSON        │
└───────────────────────────────────────────────┘
```

---

## 2. Princípios de Segurança e Camadas
1. **O Frontend Nunca Fala Diretamente com o Banco**: Não há chamadas a PostgreSQL, Prisma ou bibliotecas de banco no código do cliente.
2. **Camada de Acesso Centralizada**: Todas as chamadas trafegam por `src/services/api/apiClient.ts`.
3. **Autenticação e Permissões Seguras**: O frontend gerencia rotas com `RequireAuth` para proporcionar a melhor UX, mas a autorização efetiva de endpoints é executada e validada pelo backend.
4. **Resiliência Offline / Fallback**: Se o backend estiver temporariamente indisponível durante testes locais, o frontend exibe estados de fallback estruturados sem causar tela branca ou exceções não capturadas.

---

## 3. Estrutura de Diretórios
```text
diskhub-web/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── playwright.config.ts
├── src/
│   ├── app/                # Provedores, Router, QueryClient e ErrorBoundary
│   ├── components/         # Design System (ui/) e componentes específicos (diskhub/)
│   ├── config/             # Catálogo de planos e aplicativos
│   ├── contexts/           # AppContext (user, tenant, subscription, apps)
│   ├── hooks/              # Hooks customizados (useAppContext, useDashboardQuery)
│   ├── layouts/            # AppLayout (Sidebar + Header + Outlet) e AuthLayout
│   ├── modules/            # Módulos comerciais (crm, erp, finance, marketing, etc.)
│   ├── pages/              # Páginas completas (Login, Dashboard, Apps, Planos, Assinatura)
│   ├── routes/             # RequireAuth e rotas protegidas
│   ├── services/           # apiClient, authService, dashboardService, subscriptionService
│   ├── styles/             # tokens.css e index.css (Tailwind CSS)
│   ├── types/              # Definições estritas de TypeScript (.ts)
│   └── utils/              # Formatadores monetários e utilitários de classe (cn)
└── tests/                  # Testes E2E com Playwright (auth, navigation, dashboard, plans, responsive)
```

---

## 4. Gerenciamento de Estado
- **Estado de Sessão e Tenant**: Centralizado em `AppContext` alimentado pelo endpoint `GET /api/me/context`.
- **Estado do Servidor e Cache**: Gerenciado com `@tanstack/react-query` via `useDashboardQuery`, garantindo revalidação e controle de staleTime.
