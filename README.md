# Pocket Ledger

Pocket Ledger is a local-first personal budget website for monthly paycheck deposits, expenses, savings, debts, and cash-flow tracking.

## Open The Website

Double-click `Open-Pocket-Ledger-Website.bat` to open the website in your browser.

You can also double-click `index.html` directly.

Your data is saved in that browser using local storage.

## Free Live Setup With Auth And Database

This project is designed to run free with:

- GitHub Pages for static hosting
- Supabase Free for email/password auth and Postgres database

### 1. Create Supabase Project

1. Go to https://supabase.com
2. Create a free project.
3. Open **SQL Editor**.
4. Paste and run everything from `database.sql`.

### 2. Add Supabase Keys

In Supabase, go to **Project Settings > API** and copy:

- Project URL
- anon public key

Paste them into `config.js`:

```js
window.POCKET_LEDGER_CONFIG = {
  supabaseUrl: "https://YOUR-PROJECT.supabase.co",
  supabaseAnonKey: "YOUR-ANON-PUBLIC-KEY"
};
```

The anon key is safe to use in a browser app because `database.sql` enables row-level security. Never paste the service role key into this project.

### 3. Enable Auth

In Supabase, go to **Authentication > Providers > Email** and keep email/password enabled.

For easiest testing, you can disable email confirmation in **Authentication > Sign In / Providers > Email**. If you keep confirmation enabled, users must confirm their email before signing in.

### 4. Make It Live On GitHub Pages

1. Commit and push the updated files.
2. In GitHub, open the repo settings.
3. Go to **Pages**.
4. Source: **Deploy from a branch**.
5. Branch: `main`.
6. Folder: `/root`.
7. Save.

Your live URL will look like:

```text
https://akashpatel2609.github.io/Pocket-Ledger/
```

## What It Tracks

- Paycheck and other income deposits
- Expenses by category
- Savings contributions
- Debt payments and balances
- Monthly income, spending, savings, debt payments, and net cash flow
- CSV export for moving data into a spreadsheet

## Easiest iPhone Setup

1. Install **Expo Go** from the iOS App Store.
2. Double-click `Start-Pocket-Ledger.bat`.
3. Scan the QR code with Expo Go.

Keep the computer window open while you use the app.

## Manual iPhone Setup

1. Install the Expo Go app from the iOS App Store.
2. Install project dependencies:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npm start
   ```

4. Scan the QR code with your iPhone camera or Expo Go.

For a production iOS app later, this project can be built with Expo Application Services:

```bash
npx eas build --platform ios
```

## Useful Commands

```bash
npm start
npm run typecheck
npm run web
```

## Data Storage

The app stores data locally on the device using AsyncStorage. This first version does not sync to a cloud account, so export CSV regularly if the data matters.
