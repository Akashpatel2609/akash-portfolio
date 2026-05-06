create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('income', 'expense', 'savings', 'debt')),
  amount numeric(12, 2) not null check (amount > 0),
  category text not null,
  note text not null default '',
  date date not null,
  created_at timestamptz not null default now()
);

create table if not exists public.debts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  balance numeric(12, 2) not null check (balance > 0),
  minimum_payment numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  target numeric(12, 2) not null check (target > 0),
  saved numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

alter table public.transactions enable row level security;
alter table public.debts enable row level security;
alter table public.goals enable row level security;

create policy "Users can read own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);

create policy "Users can read own debts"
  on public.debts for select
  using (auth.uid() = user_id);

create policy "Users can insert own debts"
  on public.debts for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own debts"
  on public.debts for delete
  using (auth.uid() = user_id);

create policy "Users can read own goals"
  on public.goals for select
  using (auth.uid() = user_id);

create policy "Users can insert own goals"
  on public.goals for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own goals"
  on public.goals for delete
  using (auth.uid() = user_id);
