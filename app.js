const STORAGE_KEY = "pocket-ledger-web:v1";

const state = {
  month: new Date().toISOString().slice(0, 7),
  data: {
    transactions: [],
    debts: [],
    goals: []
  }
};

const kindLabels = {
  income: "Paycheck",
  expense: "Expense",
  savings: "Savings",
  debt: "Debt Payment"
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const monthName = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric"
});

const selectors = {
  netTotal: document.querySelector("#netTotal"),
  glassNetTotal: document.querySelector("#glassNetTotal"),
  monthLabel: document.querySelector("#monthLabel"),
  pageTitle: document.querySelector("#pageTitle"),
  cashMeter: document.querySelector("#cashMeter"),
  incomeTotal: document.querySelector("#incomeTotal"),
  expenseTotal: document.querySelector("#expenseTotal"),
  savingsTotal: document.querySelector("#savingsTotal"),
  debtPaidTotal: document.querySelector("#debtPaidTotal"),
  transactionList: document.querySelector("#transactionList"),
  debtList: document.querySelector("#debtList"),
  goalList: document.querySelector("#goalList"),
  debtBalanceTotal: document.querySelector("#debtBalanceTotal"),
  goalBalanceTotal: document.querySelector("#goalBalanceTotal"),
  transactionDate: document.querySelector("#transactionDate")
};

function load() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    state.data = JSON.parse(saved);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function id() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function parseMoney(value) {
  const amount = Number(String(value).replace(/[$,\s]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

function formatMonth(value) {
  const [year, month] = value.split("-").map(Number);
  return monthName.format(new Date(year, month - 1, 1));
}

function shiftMonth(change) {
  const [year, month] = state.month.split("-").map(Number);
  const next = new Date(year, month - 1 + change, 1);
  state.month = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;
  render();
}

function monthlyTransactions() {
  return state.data.transactions
    .filter((item) => item.date.startsWith(state.month))
    .sort((a, b) => b.date.localeCompare(a.date));
}

function totals() {
  return monthlyTransactions().reduce(
    (acc, item) => {
      acc[item.kind] += item.amount;
      return acc;
    },
    { income: 0, expense: 0, savings: 0, debt: 0 }
  );
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function render() {
  const monthTotals = totals();
  const net = monthTotals.income - monthTotals.expense - monthTotals.savings - monthTotals.debt;
  const outgoing = monthTotals.expense + monthTotals.savings + monthTotals.debt;
  const meterWidth = monthTotals.income > 0 ? Math.max(0, Math.min(100, (net / monthTotals.income) * 100)) : 0;
  const debtBalance = state.data.debts.reduce((sum, item) => sum + item.balance, 0);
  const saved = state.data.goals.reduce((sum, item) => sum + item.saved, 0);
  const target = state.data.goals.reduce((sum, item) => sum + item.target, 0);

  selectors.netTotal.textContent = money.format(net);
  selectors.glassNetTotal.textContent = money.format(net);
  selectors.monthLabel.textContent = `${formatMonth(state.month)} - ${money.format(outgoing)} outgoing`;
  selectors.pageTitle.textContent = formatMonth(state.month);
  selectors.cashMeter.style.width = `${meterWidth}%`;
  selectors.cashMeter.style.background = net >= 0 ? "var(--green)" : "var(--red)";
  selectors.incomeTotal.textContent = money.format(monthTotals.income);
  selectors.expenseTotal.textContent = money.format(monthTotals.expense);
  selectors.savingsTotal.textContent = money.format(monthTotals.savings);
  selectors.debtPaidTotal.textContent = money.format(monthTotals.debt);
  selectors.debtBalanceTotal.textContent = money.format(debtBalance);
  selectors.goalBalanceTotal.textContent = `${money.format(saved)} / ${money.format(target)}`;

  renderTransactions();
  renderDebts();
  renderGoals();
}

function renderTransactions() {
  const items = monthlyTransactions();
  if (!items.length) {
    selectors.transactionList.innerHTML = '<div class="empty">No entries for this month yet.</div>';
    return;
  }

  selectors.transactionList.innerHTML = items
    .map((item) => {
      const sign = item.kind === "income" ? "+" : "-";
      const note = item.note ? ` - ${escapeHtml(item.note)}` : "";
      return `
        <article class="row">
          <div>
            <strong>${escapeHtml(item.category)}</strong>
            <div class="meta">${kindLabels[item.kind]} - ${escapeHtml(item.date)}${note}</div>
          </div>
          <div class="amount ${item.kind}">${sign}${money.format(item.amount)}</div>
          <button class="delete-button" data-delete-transaction="${item.id}" type="button">Delete</button>
        </article>
      `;
    })
    .join("");
}

function renderDebts() {
  if (!state.data.debts.length) {
    selectors.debtList.innerHTML = '<div class="empty">Add credit cards, loans, or other balances.</div>';
    return;
  }

  selectors.debtList.innerHTML = state.data.debts
    .map(
      (item) => `
        <article class="row">
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <div class="meta">Minimum payment ${money.format(item.minimumPayment)}</div>
          </div>
          <div class="amount debt">${money.format(item.balance)}</div>
          <button class="delete-button" data-delete-debt="${item.id}" type="button">Delete</button>
        </article>
      `
    )
    .join("");
}

function renderGoals() {
  if (!state.data.goals.length) {
    selectors.goalList.innerHTML = '<div class="empty">Add emergency, home, vacation, or investment goals.</div>';
    return;
  }

  selectors.goalList.innerHTML = state.data.goals
    .map((item) => {
      const percent = item.target > 0 ? Math.min(100, (item.saved / item.target) * 100) : 0;
      return `
        <article class="goal-row">
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <div class="meta">${money.format(item.saved)} saved of ${money.format(item.target)}</div>
            <div class="progress-track" aria-hidden="true">
              <div class="progress-fill" style="width: ${percent}%"></div>
            </div>
          </div>
          <div class="amount savings">${Math.round(percent)}%</div>
          <button class="delete-button" data-delete-goal="${item.id}" type="button">Delete</button>
        </article>
      `;
    })
    .join("");
}

function setTab(tabName) {
  document.querySelectorAll(".nav-tabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `${tabName}Panel`);
  });
}

function addTransaction(event) {
  event.preventDefault();
  const amount = parseMoney(document.querySelector("#transactionAmount").value);
  const category = document.querySelector("#transactionCategory").value.trim();
  const date = document.querySelector("#transactionDate").value;

  if (!amount || !category || !date) return;

  state.data.transactions.unshift({
    id: id(),
    kind: document.querySelector("#transactionKind").value,
    amount,
    category,
    note: document.querySelector("#transactionNote").value.trim(),
    date
  });

  event.target.reset();
  selectors.transactionDate.value = new Date().toISOString().slice(0, 10);
  save();
  render();
}

function addDebt(event) {
  event.preventDefault();
  const balance = parseMoney(document.querySelector("#debtBalance").value);
  const name = document.querySelector("#debtName").value.trim();
  if (!balance || !name) return;

  state.data.debts.push({
    id: id(),
    name,
    balance,
    minimumPayment: parseMoney(document.querySelector("#debtMinimum").value) || 0
  });

  event.target.reset();
  save();
  render();
}

function addGoal(event) {
  event.preventDefault();
  const target = parseMoney(document.querySelector("#goalTarget").value);
  const name = document.querySelector("#goalName").value.trim();
  if (!target || !name) return;

  state.data.goals.push({
    id: id(),
    name,
    target,
    saved: parseMoney(document.querySelector("#goalSaved").value) || 0
  });

  event.target.reset();
  save();
  render();
}

function exportCsv() {
  const header = "date,type,category,note,amount";
  const rows = state.data.transactions.map((item) =>
    [item.date, kindLabels[item.kind], item.category, item.note, item.amount.toFixed(2)]
      .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
      .join(",")
  );
  const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "pocket-ledger.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}

document.querySelector("#transactionForm").addEventListener("submit", addTransaction);
document.querySelector("#debtForm").addEventListener("submit", addDebt);
document.querySelector("#goalForm").addEventListener("submit", addGoal);
document.querySelector("#prevMonth").addEventListener("click", () => shiftMonth(-1));
document.querySelector("#nextMonth").addEventListener("click", () => shiftMonth(1));
document.querySelector("#currentMonth").addEventListener("click", () => {
  state.month = new Date().toISOString().slice(0, 7);
  render();
});
document.querySelector("#exportButton").addEventListener("click", exportCsv);

document.querySelector(".nav-tabs").addEventListener("click", (event) => {
  if (event.target.matches("button[data-tab]")) {
    setTab(event.target.dataset.tab);
  }
});

document.addEventListener("click", (event) => {
  const transactionId = event.target.dataset.deleteTransaction;
  const debtId = event.target.dataset.deleteDebt;
  const goalId = event.target.dataset.deleteGoal;

  if (transactionId) {
    state.data.transactions = state.data.transactions.filter((item) => item.id !== transactionId);
  }

  if (debtId) {
    state.data.debts = state.data.debts.filter((item) => item.id !== debtId);
  }

  if (goalId) {
    state.data.goals = state.data.goals.filter((item) => item.id !== goalId);
  }

  if (transactionId || debtId || goalId) {
    save();
    render();
  }
});

load();
selectors.transactionDate.value = new Date().toISOString().slice(0, 10);
render();
