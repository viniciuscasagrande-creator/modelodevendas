# DiskHub Premium SaaS UI — Guia do Design System

## 1. Conceito Visual
O **DiskHub Premium SaaS UI** foi concebido a partir da homologação visual oficial (Dark Navy), proporcionando alto contraste, elegância para produtores executivos de eventos e densidade balanceada de informações.

---

## 2. Paleta de Cores e Tokens CSS

```css
:root {
  /* Fundo da Aplicação */
  --dh-bg: #0b0e13;

  /* Superfície da Sidebar */
  --dh-sidebar: #0d1118;

  /* Superfície de Cards & Modais */
  --dh-surface: #111721;
  --dh-surface-hover: #161d29;
  --dh-surface-active: #1c2433;

  /* Bordas Discretas */
  --dh-border: rgba(255, 255, 255, 0.08);
  --dh-border-strong: rgba(255, 255, 255, 0.15);

  /* Tipografia */
  --dh-text: #f8fafc;
  --dh-text-muted: #94a3b8;
  --dh-text-dim: #64748b;

  /* Destaques e Ação */
  --dh-primary: #3b82f6;        /* Azul Vibrante */
  --dh-primary-hover: #2563eb;
  --dh-indigo: #6366f1;
  --dh-purple: #8b5cf6;

  /* Feedback Semântico */
  --dh-success: #22c55e;        /* Verde Esmeralda */
  --dh-warning: #f59e0b;        /* Âmbar Atenção */
  --dh-danger: #ef4444;         /* Vermelho Erro */
  --dh-info: #0ea5e9;           /* Ciano Informativo */
}
```

---

## 3. Tipografia e Escalas
- **Fonte Principal**: Plus Jakarta Sans
- **Fonte Numérica/Códigos**: JetBrains Mono
- **Hierarquia**:
  - H1 Principal: `text-2xl sm:text-3xl font-black text-white tracking-tight`
  - H2/H3 Seções: `text-lg sm:text-xl font-black text-white`
  - Títulos de Cards: `text-sm sm:text-base font-bold text-white`
  - Texto de Apoio: `text-xs sm:text-sm text-slate-400`
  - Metadados / Legendas: `text-[10px] sm:text-[11px] font-semibold text-slate-400`

---

## 4. Componentes Base e Padrões
1. **Buttons**: Cantos arredondados (`rounded-xl`), transição suave, efeito hover com gradiente azul/índigo e estado de loading integrado.
2. **Cards**: Fundo elevado (`#111721`), borda sutil (`border-white/[0.08]`) e cantos `rounded-2xl`.
3. **Badges**: Pílulas compactas com fonte maiúscula e opacidade refinada (`bg-emerald-500/15 text-emerald-400`).
4. **Sparklines**: Mini gráficos SVG integrados nos cards de KPI sem dependências pesadas de bibliotecas.
