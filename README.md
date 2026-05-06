# Pocket Ledger

Pocket Ledger is a personal finance tracker for logging monthly income, expenses, savings goals, debt balances, and debt payments. It is built as a static website with Supabase authentication and database storage, so it can run live for free using GitHub Pages and Supabase Free.

## Live Website

[Open Pocket Ledger](https://akashpatel2609.github.io/Pocket-Ledger/)

## Repository

[github.com/Akashpatel2609/Pocket-Ledger](https://github.com/Akashpatel2609/Pocket-Ledger)

## Features

- Email/password sign in with Supabase Auth
- Cloud database storage with Supabase Postgres
- Row-level security so users can only access their own records
- Monthly income, expense, savings, debt payment, and net cash-flow summaries
- Transaction ledger for paychecks, spending, savings, and debt payments
- Debt tracker for balances and minimum payments
- Savings goals with progress bars
- CSV export for spreadsheet backup
- Local demo mode when Supabase keys are not configured
- Responsive desktop and mobile design

## Tech Stack

- HTML
- CSS
- JavaScript
- Supabase Auth
- Supabase Postgres
- GitHub Pages

## Project Structure

```text
Pocket-Ledger/
├── index.html          # Main website markup
├── styles.css          # Hyper-saturated fintech UI styling
├── app.js              # App logic, auth, database sync, local fallback
├── config.js           # Supabase URL and anon public key
├── database.sql        # Supabase tables, policies, and row-level security
├── tests/
│   └── qa-runner.js    # Local functionality test harness
└── README.md
```

## Database Setup

Pocket Ledger uses three Supabase tables:

- `transactions`
- `debts`
- `goals`

To set up the database:

1. Open your Supabase project.
2. Go to **SQL Editor**.
3. Run the SQL from [`database.sql`](database.sql).

The SQL enables row-level security and creates policies that restrict each user to their own data.

## Supabase Config

Add your Supabase project settings to [`config.js`](config.js):

```js
window.POCKET_LEDGER_CONFIG = {
  supabaseUrl: "https://YOUR-PROJECT.supabase.co",
  supabaseAnonKey: "YOUR-ANON-PUBLIC-KEY"
};
```

Only use the Supabase **anon public key** in this file. Do not use the service role key in a browser app.

## Run Locally

Open [`index.html`](index.html) in a browser, or double-click:

```text
Open-Pocket-Ledger-Website.bat
```

No build step is required.

## Test

Run the local QA harness:

```bash
node tests/qa-runner.js
```

The test checks local fallback mode, forms, totals, tab switching, delete actions, CSV export, and local persistence.

## Deploy

The app is deployed with GitHub Pages.

Recommended Pages settings:

- Source: **Deploy from a branch**
- Branch: `main`
- Folder: `/root`

Live URL:

[https://akashpatel2609.github.io/Pocket-Ledger/](https://akashpatel2609.github.io/Pocket-Ledger/)

## Cost

This project can run free using:

- GitHub Pages free static hosting
- Supabase Free auth and database tier
