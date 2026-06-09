# Padaria PDV

Sistema web de ponto de venda (PDV) para padaria. Interface de alto contraste inspirada na identidade visual da Smart Fit: preto intenso com amarelo vibrante, tipografia Barlow forte e sensação industrial.

## Funcionalidades

- **PDV / Pagamento** — busca produto por código, monta carrinho e finaliza pagamento
- **Produtos** — CRUD completo com validações e máscara monetária
- **Consulta** — busca por código ou descrição com highlight dos termos

## Pré-requisitos

- Node.js 20+
- Conta no [Supabase](https://supabase.com) com o schema aplicado

## Instalação

```bash
git clone <url-do-repositorio>
cd padaria-pdv
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```
NEXT_PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua-chave-anonima>
```

## Banco de dados

Execute o SQL em `supabase/schema.sql` no **SQL Editor** do seu projeto Supabase para criar a tabela `produtos` com RLS, indexes e trigger de `updated_at`.

## Executando localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) — redireciona automaticamente para `/pagamento`.

## Deploy na Vercel

1. Instale a CLI da Vercel: `npm i -g vercel`
2. Faça o deploy:
   ```bash
   vercel --prod
   ```
3. Configure as variáveis de ambiente no painel da Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. No painel do Supabase → **Authentication → URL Configuration**, adicione o domínio da Vercel em **Allowed Origins**.

## Stack

| Tecnologia | Versão |
|---|---|
| Next.js | 16 (App Router) |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Supabase JS | 2 |
