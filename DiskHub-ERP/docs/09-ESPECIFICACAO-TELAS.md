# Especificação Funcional e Técnica das Telas - Disk Hub ERP Enterprise

Este documento serve como a **Especificação de Referência (Blueprint)** para o desenvolvimento do ecossistema do **Disk Hub ERP Enterprise** utilizando a stack **React/Vite + Firebase**. Ele foi estruturado no padrão ideal para consumo por desenvolvedores ou agentes de Inteligência Artificial (IA), contendo objetivos, rotas, coleções do Firebase, permissões, operações CRUD, validações, responsividade, KPIs e lista de componentes visuais para cada tela do sistema.

---

## Sumário das Telas e Módulos
1. [Dashboard de Eventos (`DashboardPage.tsx`)](#1-dashboard-de-eventos-dashboardpagetsx)
2. [Tela Eventos (`EventPage.tsx`)](#2-tela-eventos-eventpagetsx)
3. [Tela Lotes (`LotesPage.tsx`)](#3-tela-lotes-lotespagetsx)
4. [Tela Ingressos (`IngressosPage.tsx`)](#4-tela-ingressos-ingressospagetsx)
5. [Tela PDV - Ponto de Venda (`PdvPage.tsx`)](#5-tela-pdv---ponto-de-venda-pdvpagetsx)
6. [Tela Check-in (`CheckinPage.tsx`)](#6-tela-check-in-checkinpagetsx)
7. [Tela Credenciamento (`CredenciamentoPage.tsx`)](#7-tela-credenciamento-credenciamentopagetsx)
8. [Tela Catracas (`CatracasPage.tsx`)](#8-tela-catracas-catracaspagetsx)
9. [Tela Bar (`BarPage.tsx`)](#9-tela-bar-barpagetsx)
10. [Tela Estoque (`EstoquePage.tsx`)](#10-tela-estoque-estoquepagetsx)
11. [Tela Relatórios (`RelatoriosPage.tsx`)](#11-tela-relatorios-relatoriospagetsx)
12. [Tela Configurações (`ConfiguracoesPage.tsx`)](#12-tela-configuraçoes-configuracoespagetsx)
13. [Tela CRM & Marketing - MaaS Hub (`MarketingHubPage.tsx`)](#13-tela-crm--marketing---maas-hub-marketinghubpagetsx)

---

## 1. Dashboard de Eventos

### Objetivo
Apresentar em tempo real todas as informações consolidadas de vendas, check-ins e engajamento dos eventos cadastrados.

* **URL:** `/dashboard`
* **Componente React:** `DashboardPage.tsx`
* **Layout:**
  - Sidebar (Menu de Navegação lateral)
  - Header (Notificações, Perfil, Busca de eventos rápidos)
  - Grid de Cards de KPIs
  - Gráfico de Vendas por Hora/Dia
  - Gráfico de Check-ins (Entrada de Público)
  - Mapa de Distribuição Geográfica dos Compradores
  - Tabela de Últimas Vendas
  - Painel de Alertas de Sistema

### Permissões
* `Administrador` (Acesso total)
* `Produtor` (Apenas eventos próprios)
* `Supervisor` (Apenas eventos designados)
* `Financeiro` (Visualização dos KPIs de faturamento e vendas)

### Firebase
* **Coleções:**
  - `eventos` (Read)
  - `vendas` (Read)
  - `checkins` (Read)
  - `alertas_sistema` (Read)

### Operações CRUD
* **Read:** Consultar em tempo real a agregação dos dados de faturamento e check-in.

### Validações
* Validação de período (DatePicker): Data inicial não pode ser superior à data final.
* Filtro de Eventos: Evento selecionado deve estar ativo no perfil do usuário.

### Responsividade
* **Desktop:** Exibição em grade de 4 colunas para KPIs, 2 colunas para gráficos principais.
* **Tablet:** Grade de 2 colunas para KPIs, gráficos empilhados verticalmente.
* **Mobile:** Cards em coluna única, gráficos com scroll horizontal habilitado ou simplificados.

### KPIs Exibidos
* **Eventos Ativos:** Quantidade total de eventos em andamento.
* **Receita Total:** Somatório bruto de todas as vendas (PIX, Cartão e Dinheiro).
* **Ingressos Vendidos:** Total acumulado e percentual de conversão.
* **Público Presente:** Porcentagem real de check-ins efetuados vs. ingressos vendidos.

### Componentes React
`Button`, `DatePicker`, `Select`, `Table`, `Card`, `AreaChart`, `BarChart`, `MapContainer` (Leaflet), `Toast`, `Badge`.

---

## 2. Tela Eventos

### Objetivo
Cadastrar, editar e administrar o ciclo de vida de todos os eventos da plataforma.

* **URL:** `/eventos`
* **Componente React:** `EventPage.tsx`
* **Layout:**
  - Header com botão "Criar Evento"
  - Filtros de categoria e data
  - Lista/Grid de Eventos cadastrados com miniaturas e status
  - Drawer Lateral (Visualização rápida e atalhos)
  - Modal de Cadastro Unificado (Abas organizadas)

### Campos de Cadastro
* **Informações Gerais:** Nome do Evento, Categoria, Tipo (Presencial, Híbrido, Online), Descrição Rica (Rich Text), Banner/Cover (Upload Imagem), Status (Rascunho, Ativo, Pausado, Encerrado).
* **Localização:** Cidade, Estado, Local Físico (Lookup locais), Capacidade Máxima.
* **Datas:** Data/Hora Inicial, Data/Hora Final, Abertura dos Portões.
* **Staff:** Produtor Responsável, Organizador Associado.

### Abas Internas (Modo Edição)
* `Informações Gerais` (Metadados do evento)
* `Ingressos & Lotes` (Preços, taxas e quantidades)
* `Mapa / Setores` (Configuração de setores físicos do local)
* `Equipe & Permissões` (Staff de portaria e bar designados)
* `Financeiro` (Margem do evento e repasses)
* `Marketing (MaaS)` (Habilitação de cupons e influenciadores)
* `Documentos` (Alvarás, contratos e termos em PDF)
* `Histórico` (Logs de alteração e auditoria do evento)

### Permissões
* `Administrador` (Criação, Edição, Deleção e Publicação)
* `Produtor` (Criação e Edição de eventos próprios)
* `Supervisor` (Visualização e alteração limitada de status operacionais)

### Firebase
* **Coleções:**
  - `eventos` (Create, Read, Update, Delete)
  - `eventos_documentos` (Create, Read, Delete)
  - `eventos_imagens` (Create, Read, Delete)

### Operações CRUD
* **Create:** Adicionar novo evento com status inicial de "Rascunho".
* **Read:** Listagem paginada com escopo restrito pelo perfil do produtor.
* **Update:** Alterar metadados, anexar arquivos e gerenciar status.
* **Delete:** Apenas soft-delete (atualização do campo `deletedAt` e alteração do status para "Arquivado").

### Validações
* Nome do Evento: Obrigatório (mínimo de 5 caracteres).
* Data de Início: Obrigatória (deve ser maior ou igual à data atual).
* Capacidade: Obrigatória (deve ser um número inteiro positivo superior a 0).
* Banner: Obrigatório para publicação do evento (mínimo de 1200x630px).

### Responsividade
* **Desktop:** Visualização de listagem em tabela completa com paginação e busca superior.
* **Mobile:** Listagem em formato de cartões (Cards) contendo fotos, data e status do evento com botões de ação rápida.

### KPIs Exibidos
* Total de Eventos Criados.
* Faturamento Acumulado da Conta.
* Média de Público Geral.
* Taxa de Cancelamento.

### Componentes React
`RichTextEditor`, `UploadFile`, `DatePicker`, `TimePicker`, `Select`, `Modal`, `Tabs`, `Table`, `Badge`, `Toast`.

---

## 3. Tela Lotes

### Objetivo
Gerenciar a precificação dinâmica, vigência e volumetria dos lotes de ingressos de cada evento.

* **URL:** `/eventos/:eventId/lotes`
* **Componente React:** `LotesPage.tsx`
* **Layout:**
  - Header com nome do Evento e Setor
  - Grade de Cards de Lotes Ativos/Encerrados
  - Tabela comparativa de vendas por lote
  - Modal de Criação/Edição de Lote

### Campos de Cadastro
* Nome do Lote (Ex: 1º Lote Pista)
* Preço Base (R$)
* Quantidade Disponível (Capacidade do Lote)
* Taxa Administrativa (%)
* Data/Hora de Início da Venda
* Data/Hora de Fim de Vigência (Virada automática de lote)
* Status (Programado, Ativo, Esgotado, Suspenso)

### Permissões
* `Administrador` (Controle Total)
* `Produtor` (Edição e encerramento de lotes de seus eventos)
* `Supervisor` (Visualização e pausa manual de lotes)

### Firebase
* **Coleções:**
  - `lotes` (Subcoleção de `/eventos/{eventId}/lotes`) (Create, Read, Update, Delete)

### Operações CRUD
* **Create:** Criar novos lotes encadeados ou com gatilho automático de virada.
* **Read:** Escuta em tempo real do estoque de ingressos do lote.
* **Update:** Edição de vigência ou pausa de vendas.
* **Delete:** Apenas permitido se nenhuma unidade do lote tiver sido vendida.

### Validações
* Preço: Deve ser maior ou igual a zero (ingresso gratuito permitido).
* Quantidade: Somatório das quantidades dos lotes não pode exceder a capacidade máxima do Setor.
* Data de Início: Deve ser anterior à Data de Fim.

### KPIs Exibidos
* **Quantidade Total:** Capacidade de ingressos reservada.
* **Vendidos:** Unidades com pagamento confirmado.
* **Disponíveis:** Saldo disponível para compra.
* **Receita Gerada:** Faturamento acumulado por lote.

### Componentes React
`InputCurrency`, `InputNumber`, `DatePicker`, `ToggleSwitch`, `Card`, `Table`, `Toast`.

---

## 4. Tela Ingressos

### Objetivo
Consultar, pesquisar, gerar e gerenciar o status de cada ingresso emitido pelo sistema.

* **URL:** `/ingressos`
* **Componente React:** `IngressosPage.tsx`
* **Layout:**
  - Barra de busca global (Código, Nome do Cliente, CPF)
  - Filtros avançados por Evento, Lote, Setor e Status do Ingresso
  - Tabela de Ingressos com paginação
  - Drawer Lateral de Detalhes do Ingresso com histórico do QR Code

### Campos de Controle
* Identificador Único (Código UUID e hash de validação)
* Status (Emitido, Pago, Check-in Realizado, Cancelado, Reembolsado)
* Tipo de Ingresso (Meia, Inteira, Cortesia, Vip)
* Dados do Comprador (Nome, E-mail, CPF, Telefone)
* Dados do Pagamento (Método, Transação Gateway, Valor Pago)
* QR Code de Validação (Imagem dinâmica baseada em token JWT rotativo)

### Permissões
* `Administrador`, `Produtor` (Visualização completa e reembolso)
* `Supervisor`, `Operador Check-in` (Apenas leitura para validação manual)

### Firebase
* **Coleções:**
  - `ingressos` (Read, Update)
  - `vendas` (Read)

### Operações CRUD
* **Read:** Busca indexada por CPF ou Código do Ingresso.
* **Update:** Cancelamento, troca de titularidade ou reset de check-in.

### Validações
* Troca de Titularidade: Só pode ser realizada até 24 horas antes do evento.
* Reembolso: Apenas permitido para ingressos com status "Pago" e em conformidade com as regras do CDC (7 dias da compra).

### Componentes React
`SearchInput`, `Select`, `Table`, `QrCodeGenerator`, `Drawer`, `Badge`, `Toast`.

---

## 5. Tela PDV (Ponto de Venda)

### Objetivo
Realizar vendas físicas rápidas de ingressos (bilheteria física) com controle de caixa para os operadores.

* **URL:** `/pdv`
* **Componente React:** `PdvPage.tsx`
* **Layout:**
  - Sidebar recolhida (Foco operacional)
  - Seção do Caixa: Status (Aberto/Fechado) e Saldo
  - Seção de Seleção: Escolha do Evento, Setor e Lote
  - Carrinho de Compras Lateral
  - Seção de Pagamento rápido (PIX Dinâmico, Cartão de Crédito/Débito via POS e Dinheiro)
  - Painel de Gestão de Caixa (Suprimento, Sangria e Fechamento)

### Metadados e Campos
* Operador de Caixa (Nome, ID)
* Fila de itens selecionados
* Desconto manual (Restrito por senha de supervisor)
* Valor Recebido (Dinheiro) / Troco a ser entregue
* CPF na Nota (Opcional)

### Permissões
* `Administrador`, `Supervisor` (Acesso a sangrias, suprimentos e relatórios de todos os caixas)
* `Operador PDV` (Apenas abertura, venda e fechamento de seu próprio caixa)

### Firebase
* **Coleções:**
  - `pdvs` (Read, Update)
  - `caixas_movimentacoes` (Create, Read, Update)
  - `vendas_pdv` (Create, Read)
  - `ingressos` (Create)

### Validações
* Caixa Fechado: Bloquear qualquer tentativa de venda.
* Saldo Negativo: Bloquear sangrias que excedam o saldo retido em caixa.
* Limite de Ingressos: Não permitir venda superior ao estoque remanescente do lote em tempo real.

### KPIs Exibidos
* Saldo Atual em Dinheiro.
* Faturamento Total do Turno.
* Total Vendas por Método de Pagamento.
* Quantidade de Ingressos Emitidos no Turno.

### Componentes React
`DropdownEventSelector`, `CartList`, `PixQrCodePopup`, `InputNumericTroco`, `ModalSangria`, `PrinterReceiptHook`, `Toast`.

---

## 6. Tela Check-in

### Objetivo
Validar a entrada do público nos portões do evento por meio da leitura rápida de ingressos.

* **URL:** `/checkin`
* **Componente React:** `CheckinPage.tsx`
* **Layout:**
  - Interface escura de alto contraste (Ideal para ambientes noturnos)
  - Janela de Câmera/Scanner de QR Code integrada
  - Fila de últimos check-ins realizados
  - Painel de status visual instantâneo (Verde = Liberado, Vermelho = Erro/Negado)
  - Métricas de fluxo de entrada em tempo real

### Métodos de Leitura
* Leitura de QR Code via câmera do dispositivo (Celular ou Web)
* Leitura de Código de Barras via Scanner USB/Bluetooth
* Validação manual por digitação de CPF/Código do Ingresso

### Permissões
* `Administrador`, `Supervisor`, `Operador Check-in` (Leitura e consulta)

### Firebase
* **Coleções:**
  - `ingressos` (Read, Update)
  - `checkins_log` (Create, Read)

### Operações CRUD
* **Read:** Validação do código do ingresso.
* **Update:** Alteração do status do ingresso de "Pago" para "Check-in Realizado" com carimbo de data, hora e operador.

### Validações
* Ingresso Já Utilizado: Alerta sonoro e visual crítico de "Ingresso Duplicado".
* Evento Incorreto: Avisar caso o ingresso pertença a outro evento.
* Lote/Setor Restrito: Validar se a portaria atual está habilitada para o setor do ingresso lido.

### KPIs Exibidos
* **Público Presente:** Quantidade de check-ins efetuados.
* **Progresso:** Barra de progresso (%) com relação ao total vendido.
* **Leituras/Minuto:** Volume médio de processamento da portaria.
* **Alertas:** Quantidade de tentativas de duplicidade registradas.

### Componentes React
`Html5QrcodeScanner` (Câmera), `InputScannerManual`, `SoundNotificationHook`, `ProgressBar`, `Table`, `AlertBanner`.

---

## 7. Tela Credenciamento

### Objetivo
Cadastrar, validar e emitir credenciais físicas (crachás e pulseiras) para equipes de staff, artistas, patrocinadores e imprensa.

* **URL:** `/credenciamento`
* **Componente React:** `CredenciamentoPage.tsx`
* **Layout:**
  - Campo de pesquisa rápida de credenciados
  - Formulário de cadastro de novo credenciado
  - Visualização do Layout da Credencial/Crachá
  - Fila de impressão e emissão

### Campos de Controle
* Nome Completo
* CPF / Documento
* Empresa / Veículo de Imprensa
* Função / Acesso (VIP, Backstage, Staff, Artista, Imprensa)
* Foto do Credenciado (Upload/Captura WebCam)
* ID da Pulseira RFID / NFC ou QR Code do Crachá
* Status da Impressão (Pendente, Impresso, Entregue)

### Permissões
* `Administrador`, `Produtor` (Configuração de níveis de acesso e lotes de credenciais)
* `Supervisor`, `Staff` (Acesso ao cadastro, vinculação de RFID e impressão)

### Firebase
* **Coleções:**
  - `credenciados` (Create, Read, Update, Delete)
  - `credenciados_historico_acesso` (Read)

### Validações
* CPF Único: Impedir duplo credenciamento para o mesmo evento.
* Vinculação de Pulseira/RFID: Garantir que a tag RFID seja única e esteja limpa antes da associação.

### Componentes React
`WebcamCaptureComponent`, `CardLayoutDesigner`, `InputRFIDListener`, `PrintQueueManager`, `Table`, `Toast`.

---

## 8. Tela Catracas

### Objetivo
Monitorar o status físico e o fluxo de acessos das catracas e equipamentos de controle eletrônico de portaria.

* **URL:** `/catracas`
* **Componente React:** `CatracasPage.tsx`
* **Layout:**
  - Painel de Grade de Equipamentos (Grade de Catracas)
  - Indicador de Status de Conexão (Online/Offline) por Catraca
  - Gráfico de Entradas/Saídas por Minuto por Portaria
  - Terminal de Logs das Últimas 50 passagens registradas

### Dados do Equipamento
* ID da Catraca e Nome (Ex: Catraca Pista Leste 01)
* Endereço IP / MAC Address
* Status de Conexão (Online, Offline, Erro de Mecanismo)
* Sentido de Passagem (Apenas Entrada, Apenas Saída, Bidirecional)
* Versão do Firmware

### Permissões
* `Administrador`, `TI Suporte` (Acesso a configurações de rede, logs e reinicialização de equipamentos)
* `Supervisor` (Monitoramento de fluxo e liberação forçada manual)

### Firebase
* **Coleções:**
  - `equipamentos_catracas` (Create, Read, Update, Delete)
  - `logs_acesso_catracas` (Create, Read)

### Validações
* IP Único: Evitar conflitos de rede na listagem de equipamentos.
* Status Offline: Disparar notificação visual crítica imediata caso a conexão caia por mais de 30 segundos.

### KPIs Exibidos
* Catracas Ativas.
* Total de Passagens Registradas.
* Pessoas Dentro do Evento (Entradas - Saídas).
* Fluxo Médio (Pessoas por Hora).

### Componentes React
`StatusIndicator`, `LogConsoleTerminal`, `BarChart`, `ModalConfiguracaoEquipamento`, `Toast`.

---

## 9. Tela Bar

### Objetivo
Gerenciar a operação comercial de pontos de alimentos e bebidas (A&B), integrando comandas individuais de consumo e mesas.

* **URL:** `/bar`
* **Componente React:** `BarPage.tsx`
* **Layout:**
  - Painel de Grade de Mesas / Comandas Ativas
  - Interface do Garçom / Operador: Lançamento de Itens rápido
  - Controle de Caixa de Bar: Fechamento de Contas e recebimento
  - Dashboard de Preparo de Pedidos (Cozinha/Balcão)

### Metadados da Comanda / Pedido
* Número da Comanda / QR Code da Mesa
* Nome / Identificador do Cliente
* Lista de Itens (Produto, Quantidade, Valor Unitário, Observação)
* Garçom Responsável (Nome, ID)
* Status do Preparo (Aguardando, Em Preparo, Pronto, Entregue)
* Status Financeiro (Pendente, Pago, Pré-Pago)

### Permissões
* `Administrador`, `Supervisor` (Alterações de preços, estornos de comandas, relatórios)
* `Operador Bar` (Lançamento de itens, fechamento de comandas de sua praça)
* `Garçom` (Lançamento de itens em comandas/mesas via mobile)

### Firebase
* **Coleções:**
  - `comandas_bar` (Create, Read, Update)
  - `produtos_bar` (Read)
  - `vendas_bar` (Create, Read)

### Validações
* Comanda Pré-Paga: Bloquear lançamento de itens se o saldo pré-carregado for insuficiente.
* Limite de Comanda Pós-Paga: Não permitir lançamentos que ultrapassem o limite de crédito atribuído à comanda.

### KPIs Exibidos
* Faturamento Total do Bar.
* Consumo Médio por Comanda (Ticket Médio A&B).
* Tempo Médio de Entrega do Pedido.
* Top 5 Produtos Mais Vendidos.

### Componentes React
`GridComandas`, `MenuSelector`, `OrderPreparationQueue`, `CheckoutPaymentModal`, `Toast`.

---

## 10. Tela Estoque

### Objetivo
Controlar a entrada, saída, estoque mínimo e movimentações de produtos físicos do evento (bebidas, insumos, copos, pulseiras, etc.).

* **URL:** `/estoque`
* **Componente React:** `EstoquePage.tsx`
* **Layout:**
  - Tabela Geral de Produtos com níveis de estoque colorido (Verde, Amarelo, Vermelho)
  - Botão de Entrada de Notas Fiscais / Insumos
  - Modal de Transferência de Insumos entre bares/praças
  - Formulário de Ajuste de Inventário (Perdas, Quebras, Descartes)

### Campos de Produto
* Código SKU / Código de Barras
* Nome do Produto e Categoria (Bebida Alcoólica, Refrigerante, Copo, etc.)
* Quantidade em Estoque Atual
* Estoque Mínimo de Alerta
* Custo Unitário e Preço de Venda Sugerido
* Fornecedor Associado

### Permissões
* `Administrador`, `Supervisor` (Controle Total, Ajuste de Inventário, Entrada de Insumos)
* `Estoquista` (Apenas transferência entre praças e leitura de estoque)

### Firebase
* **Coleções:**
  - `produtos_estoque` (Create, Read, Update)
  - `movimentacoes_estoque` (Create, Read)

### Validações
* Quantidade Negativa: Estoque físico não pode ficar abaixo de 0. Bloquear transações que gerem saldo negativo se o sistema estiver configurado para controle rígido.
* Alerta de Estoque Mínimo: Disparar notificação visual em destaque para produtos com quantidade menor ou igual ao estoque mínimo.

### KPIs Exibidos
* Valor Financeiro Total em Estoque.
* Itens com Estoque Crítico (Abaixo do Mínimo).
* Giro de Estoque (%).
* Total de Perdas por Quebra/Descarte.

### Componentes React
`Table`, `ModalAjusteEstoque`, `BarCodeScannerListener`, `DropdownFornecedores`, `BadgeStatus`, `Toast`.

---

## 11. Tela Relatórios

### Objetivo
Gerar relatórios estatísticos, financeiros e analíticos de todos os setores do Disk Hub ERP para exportação e auditoria.

* **URL:** `/relatorios`
* **Componente React:** `RelatoriosPage.tsx`
* **Layout:**
  - Central de Relatórios dividida por Categorias (Financeiro, Vendas, Check-in, Bar, CRM)
  - Painel de Filtros Parametrizados (Evento, Data Inicial/Final, Operadores)
  - Pré-visualização do Relatório em Grade de Dados
  - Botões de exportação rápida (PDF, Excel, CSV)

### Categorias de Relatórios
* **Financeiro:** Fechamento de Caixas PDV, Faturamento Líquido, Repasses de Produtores, Impostos Retidos.
* **Eventos:** Vendas por Setor/Lote, Velocidade de Vendas por Hora, Taxa de No-Show.
* **Portaria/Check-in:** Acessos por Catraca/Portaria, Fluxo de Pessoas/Hora, Auditoria de Ingressos Duplicados.
* **MaaS/Marketing:** ROI de Influenciadores, Cupons Utilizados, Engajamento no app.

### Permissões
* `Administrador`, `Financeiro` (Acesso a todos os relatórios)
* `Produtor` (Acesso restrito aos relatórios de seus próprios eventos)

### Firebase
* **Coleções / Consultas:**
  - Consultas dinâmicas e agregações em tempo real nas coleções `vendas`, `ingressos`, `checkins_log`, `vendas_bar` e `caixas_movimentacoes`.

### Validações
* Período Limite de Consulta: Restringir consultas sem indexação a no máximo 1 ano para otimização de chamadas do Firebase.
* Exportação Segura: Mascarar CPFs e dados sensíveis de compradores conforme a LGPD nas exportações para usuários sem nível administrativo.

### Componentes React
`DatePickerRange`, `ReportCategorySelector`, `DataGridPreviewTable`, `PdfExportButton`, `CsvExportButton`, `SpinnerLoader`, `Toast`.

---

## 12. Tela Configurações

### Objetivo
Configurar os parâmetros globais da empresa, gerenciar usuários, permissões, chaves de API e integrações externas (Mercado Pago, Pix, WhatsApp, E-mail).

* **URL:** `/configuracoes`
* **Componente React:** `ConfiguracoesPage.tsx`
* **Layout:**
  - Menu de Navegação Horizontal das Configurações (Empresa, Equipe, Gateways, Integrações, Backups)
  - Formulários de Configuração divididos por abas
  - Tabela de Gestão de Usuários da Equipe e Níveis de Acesso (RBAC)

### Seções de Configuração
* **Empresa:** Razão Social, CNPJ, Endereço, Dados de Contato, Logotipo.
* **Equipe & Usuários:** Lista de usuários cadastrados com e-mail, telefone, cargo e atribuição de papéis (Admin, Produtor, Operador).
* **Gateways de Pagamento:** Credenciais do Mercado Pago, token PIX Dinâmico, taxas de split de pagamento automáticas.
* **Integrações de Marketing:** Credenciais da API do WhatsApp (disparos), chaves do SendGrid/SMTP (E-mail), token SMS.
* **Logs & Backup:** Auditoria do sistema (Logs de atividades dos usuários) e agendamento de exportação do banco Firestore.

### Permissões
* `Administrador` (Apenas usuários administradores podem visualizar ou alterar configurações)

### Firebase
* **Coleções:**
  - `configuracoes_empresa` (Read, Update)
  - `usuarios_permissoes` (Create, Read, Update, Delete)
  - `integracoes_api` (Create, Read, Update)
  - `logs_atividades_sistema` (Read)

### Validações
* CNPJ / CPF: Validação de dígito verificador.
* E-mail Equipe: Validação de formato e verificação de duplicidade.
* Gateways API Key: Testar conexão com o endpoint do gateway antes de persistir as credenciais configuradas.

### Componentes React
`Form`, `InputWithValidation`, `PermissionsSelectorMatrix`, `GatewaysConnectionTester`, `ActivityLogsTable`, `Toast`.

---

## 13. Tela CRM & Marketing - MaaS Hub

### Objetivo
Operar e monitorar a plataforma de Marketing as a Service (MaaS) contratada de forma granular pelos produtores para alavancar vendas.

* **URL:** `/marketing`
* **Componente React:** `MarketingHubPage.tsx`
* **Layout:**
  - Header MaaS com seletor de Plano Ativo (Start, Profissional, Premium, Enterprise, Omnichannel)
  - Abas Operacionais dos 21 Módulos Independentes
  - Painel de Gestão de Licenciamento (Toggles de Ativação)
  - Telas Independentes integradas com trava de ativação comercial

### Módulos Integrados e Funcionalidades
* **Campanhas e Disparos:** Formulário de envio de mensagens em massa (WhatsApp/Email/SMS) com base segmentada de compradores históricos.
* **Influenciadores:** Painel de monitoramento de performance com cadastro de cachê, cupom exclusivo e cálculo em tempo real do ROI.
* **Clube Fidelidade:** Definição de regras de acúmulo de pontos, cashback nos ingressos e gestão de missões gamificadas.
* **Analytics 360:** Gráficos avançados de origem de tráfego (Meta/Google), funil de checkout, fluxo transacional/minuto e mapa de calor geográfico por geolocalização.

### Permissões
* `Administrador` (Licenciamento, ativação de módulos e monitoramento de receitas)
* `Produtor`, `Marketing` (Configuração de campanhas, influenciadores e regras de fidelidade de seus eventos)

### Firebase
* **Coleções:**
  - `campanhas_marketing` (Create, Read, Update)
  - `influenciadores_maas` (Create, Read, Update)
  - `loyalty_rules` (Read, Update)
  - `loyalty_missions` (Create, Read, Update)

### Validações
* Módulo Inativo: Exibir imediatamente o modal/alerta visual de bloqueio de recurso se o toggle do licenciamento estiver desativado, impedindo a visualização da tela operacional correspondente.
* CPF/Cupom de Influenciador: Garantir que o código do cupom seja alfanumérico único para evitar sobreposição de vendas no Analytics.

### KPIs Exibidos
* Receita Gerada por Campanhas.
* ROI Geral de Marketing.
* Taxa de Engajamento e Recompra (Fidelidade).
* CAC (Custo de Aquisição do Cliente) por Evento.

### Componentes React
`ModuleLicensingToggles`, `CampaignSchedulerForm`, `InfluencersPerformanceTable`, `LoyaltyRulesForm`, `HeatMapCanvas`, `LineChartTransactions`, `Toast`, `ModalLock`.
