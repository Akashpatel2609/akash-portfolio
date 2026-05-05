# Pocket Ledger

Pocket Ledger is a local-first personal budget website for monthly paycheck deposits, expenses, savings, debts, and cash-flow tracking.

## Open The Website

Double-click `Open-Pocket-Ledger-Website.bat` to open the website in your browser.

You can also double-click `index.html` directly.

Your data is saved in that browser using local storage.

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
