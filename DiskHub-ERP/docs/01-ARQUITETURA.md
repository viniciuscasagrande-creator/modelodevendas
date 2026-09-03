# 01 - Arquitetura

## Stack Tecnológica

### Frontend
- **React**: Biblioteca SPA para interfaces dinâmicas.
- **Vite**: Build tool ultrarrápido para desenvolvimento.
- **Tailwind CSS**: Estilização utilitária moderna.
- **shadcn/ui**: Componentes de interface polidos e acessíveis.

### Backend & Database
- **Firebase Auth**: Gestão de identidade e login social/seguro.
- **Firebase Storage**: Armazenamento de arquivos, notas fiscais e fotos de ingressos.
- **MySQL**: Banco de dados relacional para transações financeiras críticas.
- **API REST**: Camada de endpoints HTTP para consumo seguro.

## Módulos de Sistema
- Dashboard Executivo
- Financeiro (Contas a Pagar/Receber)
- Contabilidade (Conciliação e SEFAZ)
- CRM de Vendas
- Gestão de Eventos
- Marketing e Automações
- Ponto de Venda (PDV)
- BI & Analytics
- Inteligência Artificial

## Estrutura Sugerida do Código (`src/`)

```text
src/
 ├── components/       # Componentes reusáveis (Botões, Inputs, Modais)
 ├── layouts/          # Layout principal (Sidebar, Topbar)
 ├── pages/            # Telas das rotas (Dashboard, Financeiro, etc.)
 ├── services/         # Chamadas de API e conexões com Firebase
 ├── hooks/            # Hooks customizados do React (useAuth, useTheme)
 ├── contexts/         # Estados globais (ThemeContext, AppContext)
 ├── firebase/         # Configurações do SDK do Firebase
 ├── routes/           # Mapeamento de rotas e proteção de perfis
 ├── modules/          # Componentes isolados específicos por módulo
 ├── utils/            # Funções auxiliares de formatação e cálculos
 ├── types/            # Definições de TypeScript ou propTypes
 └── config/           # Constantes e variáveis de ambiente
```
