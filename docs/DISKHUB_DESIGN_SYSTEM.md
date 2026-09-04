# DISKHUB BUSINESS CLOUD — DESIGN SYSTEM PREMIUM (UI/UX SPECIFICATION)
## Padrão Visual Oficial do Ecossistema DiskHub (Fase 27.2.2.1)
**Data:** 04 de Setembro de 2026  
**Estilo:** Dark Premium SaaS (Linear / Vercel / Apple inspired)  

---

## 1. PALETA DE CORES & TOKENS FUNDAMENTAIS

* **Background da Aplicação:** `#0b0e13` (Dark Navy Profundo)
* **Superfície Principal (Cards & Containers):** `#11151d`
* **Superfície Elevada (Modais, Menus, Dropdowns):** `#151a24`
* **Superfície Hover:** `#1a202c`
* **Bordas Sutis:** `rgba(255, 255, 255, 0.08)`
* **Bordas em Destaque:** `rgba(249, 115, 22, 0.40)`
* **Texto Primário (High Contrast):** `#f7f8fa`
* **Texto Secundário (Muted):** `#98a2b3`
* **Texto Terciário / Labels:** `#64748b`

### Acentos Semânticos:
* **Laranja Primário DiskHub:** `#F97316` (Hover: `#EA580C`)
* **Índigo / Automação:** `#6366F1`
* **Azul / Dados & Clientes:** `#3B82F6`
* **Verde / Sucesso & Ativo:** `#10B981`
* **Âmbar / Alerta:** `#F59E0B`
* **Vermelho / Crítico & Falha:** `#EF4444`

---

## 2. TIPOGRAFIA & HIERARQUIA

* **Família Tipográfica Principal:** Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
* **Display / Hero:** 32px – 40px (Font weight: 900, tracking: tight)
* **H1 / Títulos de Páginas:** 24px – 28px (Font weight: 800)
* **H2 / Títulos de Seção:** 18px – 22px (Font weight: 700)
* **H3 / Títulos de Cards:** 14px – 16px (Font weight: 700)
* **Body / Parágrafos:** 13px – 14px (Font weight: 400–500, line-height: 1.5)
* **Captions / Badges / Meta:** 10px – 12px (Font weight: 600–700, uppercase opcional)

---

## 3. COMPONENTES E PADRÕES DE INTERFACE

### 3.1 Cards e Superfícies
* **Raio de Borda (Border Radius):** `16px` para cards principais, `12px` para botões e inputs, `8px` para tags.
* **Padding Padronizado:** `16px` (mobile/tablet) a `24px` (desktop).
* **Ausência de Overflow Horizontal:** Todos os contêineres adotam `min-width: 0` e `overflow-x: hidden` no eixo da página.

### 3.2 Botões
* **Botão Primário:** Gradiente suave de `#F97316` a `#EA580C`, sombra com elevação de 4px, texto branco com peso 700.
* **Botão Secundário:** Superfície sutil `#1E293B`, borda `border-white/5`, texto claro com hover suave.
* **Botão Ghost:** Sem fundo, hover discreto com `hover:bg-white/5`.

### 3.3 Badges de Status
* **Ativo / Sucesso:** Fundo esmeralda suave (`bg-emerald-500/10 text-emerald-400`).
* **Recomendado / Comercial:** Fundo laranja vibrante (`bg-[#F97316] text-white`).
* **Informativo / Disponível:** Fundo azul suave (`bg-blue-500/10 text-blue-400`).
* **Crítico / Atenção:** Fundo vermelho ou âmbar translúcido.

---

## 4. DIRETRIZES DE ACESSIBILIDADE E RESPONSIVIDADE
* **Viewports Testados:** Mobile (360x800, 390x844), Tablet (768x1024), Desktop (1024x768, 1366x768, 1440x900, 1920x1080).
* **Navegação por Teclado:** Foco visível (`focus:ring-2 focus:ring-[#F97316]`), suporte a tecla `ESC` em modais, gavetas e launcher.
* **Zero Telas Brancas:** Qualquer erro de integração deve renderizar fallback contido dentro do shell sem colapsar a interface.
