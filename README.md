# Subpainel das Dezenas - Documentação do Projeto

## Índice

- [Visão Geral](#visão-geral)
- [Início Rápido](#início-rápido)
- [Estrutura Principal](#estrutura-principal)
  - [App e API](#app-e-api)
  - [Módulos](#módulos)
  - [Bibliotecas](#bibliotecas)
  - [Componentes Compartilhados](#componentes-compartilhados)
- [Fluxos Principais](#fluxos-principais)
  - [Checkout manual](#checkout-manual)
  - [Checkout PIX](#checkout-pix)
- [Arquivos importantes](#arquivos-importantes)
- [Configuração e execução](#configuração-e-execução)
- [Notas adicionais](#notas-adicionais)

## Visão Geral

Este projeto é uma aplicação Next.js com uma área de painel para gerenciamento de apostas, checkout manual e integração com pagamento via PIX usando Mercado Pago.

O objetivo principal é permitir:

- cadastro e registro de bilhetes
- checkout em dinheiro ou pendente
- geração de PIX e confirmação via webhook
- exibição de resultado de transação no modal de checkout

## Início Rápido

Instale dependências e inicie o projeto:

```bash
npm install
npm run dev
```

Abra o app em:

```bash
http://localhost:3000
```

## Estrutura Principal

### App e API

- `app/` — rota principal da aplicação e layout.
- `app/api/mercadopago/create-pix/route.js` — cria pagamento PIX no Mercado Pago.
- `app/api/mercadopago/save-temp/route.js` — salva dados temporários no Redis enquanto o PIX não for pago.
- `app/api/mercadopago/webhook/route.js` — processa a notificação do Mercado Pago.
- `app/api/mercadopago/check-pix/route.js` — endpoint de polling que verifica se o webhook concluiu o pagamento.

### Módulos

- `modules/checkout/` — lógica de checkout, transações e UI do modal.
  - `components/` — componentes específicos de checkout, incluindo `CheckoutModal` e `PixPaymentModal`.
  - `hooks/` — hooks de checkout e geração de PIX.
  - `services/` — serviços de transação, criação de PIX e integração com os repositórios.
  - `repository/` — persistência de transações no Supabase.

- `modules/pools/` — lógica de bilhetes, apostas e checkout de bilhetes.
  - `hooks/` — `useCheckout` para salvar bilhetes no banco.
  - `services/` — serviço de tickets e bets.
  - `repository/` — persistência de tickets e apostas.

- `modules/auth/`, `modules/customers/` e outros módulos suportam autenticação e gerenciamento de clientes.

### Bibliotecas

- `libs/redis/` — configuração do Redis Upstash.
- `libs/mercadopago/` — cliente Mercado Pago.
- `libs/supabase/` — cliente Supabase para comunicação com o banco.

### Componentes Compartilhados

- `components/` — componentes reutilizáveis de UI: botões, formulários, tabela, carregamento, cabeçalho, etc.
- `stores/` — estados globais com Zustand.

## Fluxos Principais

### Checkout manual

1. O usuário seleciona `cash` ou `pending` no modal de checkout.
2. O modal abre a etapa de confirmação.
3. Ao confirmar, o app salva os bilhetes no Supabase via `ticketsService`.
4. `registerTransactionServer` grava a transação e os vínculos `transaction_tickets`.
5. O modal avança para `step 3` e exibe a confirmação.

### Checkout PIX

1. O usuário escolhe `pix` no modal.
2. O app gera `external_reference` e salva dados temporários no Redis (`save-temp`).
3. O app chama `create-pix` para gerar o QR code PIX.
4. O modal `PixPaymentModal` mostra o QR code para pagamento.
5. O webhook do Mercado Pago chega em `webhook/route.js`.
6. Se o pagamento estiver aprovado, o webhook:
   - busca os dados temporários no Redis
   - salva os tickets no banco
   - registra a transação via `registerTransactionServer`
   - marca o pagamento como concluído em Redis (`pix:complete:<external_reference>`)
7. O cliente faz polling em `check-pix` e, quando o webhook confirma, fecha o modal, exibe toast de sucesso e vai para `step 3`.

## Arquivos importantes

- `modules/checkout/components/checkoutModal/index.jsx`
- `modules/checkout/components/PixPaymentModal/index.jsx`
- `modules/checkout/hooks/usePixPayment.js`
- `modules/checkout/hooks/useCheckoutTransaction.js`
- `modules/checkout/services/registerTransactionServer.js`
- `modules/checkout/services/createPixService.js`
- `modules/pools/hooks/useCheckout.js`
- `modules/pools/services/ticketsService.js`
- `app/api/mercadopago/create-pix/route.js`
- `app/api/mercadopago/save-temp/route.js`
- `app/api/mercadopago/webhook/route.js`
- `app/api/mercadopago/check-pix/route.js`

## Configuração e execução

- `npm install` — instala dependências.
- `npm run dev` — inicia o servidor de desenvolvimento.
- `npm run build` — gera a aplicação para produção.
- `npm start` — executa em modo de produção.

### Alias de importação

`jsconfig.json` define o alias `@/*` para a raiz do projeto.

## Notas adicionais

- A aplicação usa `react-hot-toast` para notificações.
- O Redis é usado para manter o estado temporário do fluxo PIX.
- A integração com Mercado Pago depende de webhook e de uma URL pública acessível.
- O fluxo manual de dinheiro e pendente está separado do fluxo PIX, mas ambos convergem na mesma lógica de gravação de transação.
