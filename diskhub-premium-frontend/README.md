# DiskHub Premium Frontend

Template React + Vite + TypeScript inspirado no mockup aprovado do DiskHub Business Cloud.

## Executar

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Importante

Os números deste template são **dados de demonstração**, centralizados em `src/data/demo.ts`, apenas para validar o visual.
Na integração com o projeto real, substitua esses dados por chamadas ao backend DiskHub.

## Estrutura principal

- `src/App.tsx` — dashboard completo
- `src/components/Sidebar.tsx`
- `src/components/Header.tsx`
- `src/components/KpiCard.tsx`
- `src/components/SalesChart.tsx`
- `src/components/CurrentPlan.tsx`
- `src/components/ActivityCard.tsx`
- `src/components/AlertsCard.tsx`
- `src/components/GrowthBanner.tsx`
- `src/components/PlanCard.tsx`
- `src/styles/global.css` — Design System visual
- `public/reference-dashboard.png` — imagem de referência aprovada

## Como integrar no projeto existente

1. Faça backup/commit antes da alteração.
2. Copie `src/components` e `src/styles/global.css` para o frontend real.
3. Adapte `App.tsx` para a rota real do Dashboard.
4. Preserve React Router, autenticação, APIs, guards, assinatura e licenciamento existentes.
5. Substitua `src/data/demo.ts` por queries da API.
6. Não use a imagem de referência como fundo da aplicação.

## Regra para Gemini/Antigravity

> Não recrie o projeto. Não redesenhe por interpretação. Utilize os componentes fornecidos como base visual. Preserve rotas, APIs, autenticação, tenant, assinatura, permissões e regras de negócio existentes. Primeiro faça o template renderizar, depois conecte dados reais.
