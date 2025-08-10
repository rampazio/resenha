# Resenha MVP (Next.js 14 + Supabase + Tailwind)

MVP para organizar resenhas/eventos entre amigos com autenticação via Supabase (link mágico).

## Setup rápido (local)

1. **Supabase**
   - Crie um projeto em https://supabase.com/.
   - Vá em `Project Settings > API` e copie:
     - `Project URL`
     - `anon public`
   - Vá em `Authentication > Providers` e habilite **Email** (Magic Link).
   - Vá em `SQL Editor` e rode o script mínimo de tabela `resenhas`:

```sql
create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key default auth.uid(),
  name text,
  role text check (role in ('admin','user')) default 'user',
  created_at timestamptz default now()
);

create table if not exists resenhas (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id) on delete set null,
  title text not null,
  description text,
  location text,
  starts_at timestamptz,
  ends_at timestamptz,
  categories text[] default '{}',
  status text check (status in ('aberta','parcial','paga','arquivada')) default 'aberta',
  created_at timestamptz default now()
);
```

2. **.env.local**
Crie o arquivo `.env.local` na raiz com:
```
NEXT_PUBLIC_SUPABASE_URL=SEU_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=SEU_ANON_KEY
```

3. **Instalar e rodar**

```bash
npm install
npm run dev
```

Acesse http://localhost:3000/login, entre com email (magic link).

## Deploy na Vercel

- Importe este repositório no GitHub e **Import Project** na Vercel.
- Em **Environment Variables** da Vercel, configure:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Deploy e pronto.

## Próximos passos (iterativos)
- Páginas: Participantes, Itens & Pagamentos, Votações (com trigger de 50%).
- Upload de comprovantes (Supabase Storage).
- RLS e políticas finas por resenha/participante.
