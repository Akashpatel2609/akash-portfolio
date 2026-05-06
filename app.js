const STORAGE_KEY = "pocket-ledger-web:v2";

const config = window.POCKET_LEDGER_CONFIG || {};
const hasSupabaseConfig = Boolean(config.supabaseUrl && config.supabaseAnonKey);
const supabaseClient =
  hasSupabaseConfig && window.supabase
    ? window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey)
    : null;

const state = {
  month: new Date().toISOString().slice(0, 7),
  session: null,
  demoMode: false,
  authError: "",
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
  onboardingScreen: document.querySelector("#onboardingScreen"),
  appShell: document.querySelector("#appShell"),
  authForm: document.querySelector("#authForm"),
  authEmail: document.querySelector("#authEmail"),
  authPassword: document.querySelector("#authPassword"),
  authStatus: document.querySelector("#authStatus"),
  signUpButton: document.querySelector("#signUpButton"),
  signOutButton: document.querySelector("#signOutButton"),
  demoButton: document.querySelector("#demoButton"),
  onboardingHomeButton: document.querySelector("#onboardingHomeButton"),
  dashboardHomeButton: document.querySelector("#dashboardHomeButton"),
  mobileHomeButton: document.querySelector("#mobileHomeButton"),
  mobileMenuButton: document.querySelector("#mobileMenuButton"),
  mobileMenuClose: document.querySelector("#mobileMenuClose"),
  mobileMenuOverlay: document.querySelector("#mobileMenuOverlay"),
  mobileExportButton: document.querySelector("#mobileExportButton"),
  mobileSettingsButton: document.querySelector("#mobileSettingsButton"),
  mobileSignOutButton: document.querySelector("#mobileSignOutButton"),
  mobileAccountName: document.querySelector("#mobileAccountName"),
  desktopSettingsButton: document.querySelector("#desktopSettingsButton"),
  settingsModal: document.querySelector("#settingsModal"),
  settingsCloseButton: document.querySelector("#settingsCloseButton"),
  settingsForm: document.querySelector("#settingsForm"),
  settingsEmail: document.querySelector("#settingsEmail"),
  settingsName: document.querySelector("#settingsName"),
  settingsPassword: document.querySelector("#settingsPassword"),
  settingsStatus: document.querySelector("#settingsStatus"),
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

function isCloudMode() {
  return Boolean(supabaseClient && state.session);
}

function canUseDashboard() {
  return Boolean(state.session || state.demoMode || !supabaseClient);
}

function setStatus(message) {
  selectors.authStatus.textContent = message;
}

function getAppUrl() {
  let pathname = window.location.pathname || "/";
  pathname = pathname.replace(/index\.html$/, "");
  if (!pathname.endsWith("/")) {
    pathname = `${pathname}/`;
  }
  return `${window.location.origin}${pathname}`;
}

function readAuthErrorFromUrl() {
  const rawParams = window.location.hash || window.location.search || "";
  if (!rawParams.includes("error")) {
    return "";
  }

  const params = new URLSearchParams(rawParams.replace(/^[#?]/, ""));
  return params.get("error_description") || params.get("error") || "";
}

function showOnboarding() {
  selectors.onboardingScreen.classList.remove("hidden");
  selectors.appShell.classList.add("hidden");
  window.location.hash = "welcome";
}

function showDashboard() {
  selectors.onboardingScreen.classList.add("hidden");
  selectors.appShell.classList.remove("hidden");
  window.location.hash = "dashboard";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openMobileMenu() {
  selectors.mobileMenuOverlay.classList.remove("hidden");
}

function closeMobileMenu() {
  selectors.mobileMenuOverlay.classList.add("hidden");
}

function userDisplayName() {
  return state.session?.user?.user_metadata?.full_name || state.session?.user?.email || "Demo user";
}

function renderSettings() {
  selectors.settingsEmail.value = state.session?.user?.email || "Local demo mode";
  selectors.settingsName.value = state.session?.user?.user_metadata?.full_name || "";
  selectors.settingsPassword.value = "";
  selectors.settingsStatus.textContent = state.session
    ? `Signed in as ${userDisplayName()}.`
    : "Settings are available after signing in.";
}

function openSettings() {
  renderSettings();
  selectors.settingsModal.classList.remove("hidden");
}

function closeSettings() {
  selectors.settingsModal.classList.add("hidden");
}

function loadLocal() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    state.data = JSON.parse(saved);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveLocal() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function save() {
  if (!isCloudMode()) {
    saveLocal();
  }
}

function id() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
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

function normalizeTransaction(row) {
  return {
    id: row.id,
    kind: row.kind,
    amount: Number(row.amount),
    category: row.category,
    note: row.note || "",
    date: row.date
  };
}

function normalizeDebt(row) {
  return {
    id: row.id,
    name: row.name,
    balance: Number(row.balance),
    minimumPayment: Number(row.minimum_payment || 0)
  };
}

function normalizeGoal(row) {
  return {
    id: row.id,
    name: row.name,
    target: Number(row.target),
    saved: Number(row.saved || 0)
  };
}

async function loadCloudData() {
  if (!isCloudMode()) return;

  const [transactions, debts, goals] = await Promise.all([
    supabaseClient.from("transactions").select("*").order("date", { ascending: false }),
    supabaseClient.from("debts").select("*").order("created_at", { ascending: false }),
    supabaseClient.from("goals").select("*").order("created_at", { ascending: false })
  ]);

  const error = transactions.error || debts.error || goals.error;
  if (error) {
    setStatus(`Database error: ${error.message}`);
    return;
  }

  state.data = {
    transactions: transactions.data.map(normalizeTransaction),
    debts: debts.data.map(normalizeDebt),
    goals: goals.data.map(normalizeGoal)
  };
  render();
}

function renderAuth() {
  if (!supabaseClient) {
    selectors.authForm.classList.add("hidden");
    selectors.demoButton.classList.remove("hidden");
    selectors.signOutButton.classList.add("hidden");
    selectors.mobileSignOutButton.classList.add("hidden");
    selectors.mobileAccountName.textContent = "Local demo";
    setStatus(state.authError || "Local demo mode is available because Supabase is not configured.");
    return;
  }

  if (state.session) {
    selectors.authForm.classList.add("hidden");
    selectors.demoButton.classList.add("hidden");
    selectors.signOutButton.classList.remove("hidden");
    selectors.mobileSignOutButton.classList.remove("hidden");
    selectors.mobileAccountName.textContent = userDisplayName();
    setStatus(`Signed in as ${userDisplayName()}. Your data is saved in Supabase.`);
  } else {
    selectors.authForm.classList.remove("hidden");
    selectors.demoButton.classList.add("hidden");
    selectors.signOutButton.classList.add("hidden");
    selectors.mobileSignOutButton.classList.add("hidden");
    selectors.mobileAccountName.textContent = "Account";
    setStatus(state.authError || "Use email and password to save your budget to Supabase.");
  }
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

  renderAuth();
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

  document.querySelectorAll("[data-mobile-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.mobileTab === tabName);
  });

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `${tabName}Panel`);
  });
}

async function addTransaction(event) {
  event.preventDefault();
  const amount = parseMoney(document.querySelector("#transactionAmount").value);
  const category = document.querySelector("#transactionCategory").value.trim();
  const date = document.querySelector("#transactionDate").value;

  if (!amount || !category || !date) return;

  const transaction = {
    id: id(),
    kind: document.querySelector("#transactionKind").value,
    amount,
    category,
    note: document.querySelector("#transactionNote").value.trim(),
    date
  };

  if (isCloudMode()) {
    const { data, error } = await supabaseClient
      .from("transactions")
      .insert({
        user_id: state.session.user.id,
        kind: transaction.kind,
        amount: transaction.amount,
        category: transaction.category,
        note: transaction.note,
        date: transaction.date
      })
      .select()
      .single();

    if (error) {
      setStatus(`Save failed: ${error.message}`);
      return;
    }

    state.data.transactions.unshift(normalizeTransaction(data));
  } else {
    state.data.transactions.unshift(transaction);
  }

  event.target.reset();
  selectors.transactionDate.value = new Date().toISOString().slice(0, 10);
  save();
  render();
}

async function addDebt(event) {
  event.preventDefault();
  const balance = parseMoney(document.querySelector("#debtBalance").value);
  const name = document.querySelector("#debtName").value.trim();
  if (!balance || !name) return;

  const debt = {
    id: id(),
    name,
    balance,
    minimumPayment: parseMoney(document.querySelector("#debtMinimum").value) || 0
  };

  if (isCloudMode()) {
    const { data, error } = await supabaseClient
      .from("debts")
      .insert({
        user_id: state.session.user.id,
        name: debt.name,
        balance: debt.balance,
        minimum_payment: debt.minimumPayment
      })
      .select()
      .single();

    if (error) {
      setStatus(`Save failed: ${error.message}`);
      return;
    }

    state.data.debts.unshift(normalizeDebt(data));
  } else {
    state.data.debts.push(debt);
  }

  event.target.reset();
  save();
  render();
}

async function addGoal(event) {
  event.preventDefault();
  const target = parseMoney(document.querySelector("#goalTarget").value);
  const name = document.querySelector("#goalName").value.trim();
  if (!target || !name) return;

  const goal = {
    id: id(),
    name,
    target,
    saved: parseMoney(document.querySelector("#goalSaved").value) || 0
  };

  if (isCloudMode()) {
    const { data, error } = await supabaseClient
      .from("goals")
      .insert({
        user_id: state.session.user.id,
        name: goal.name,
        target: goal.target,
        saved: goal.saved
      })
      .select()
      .single();

    if (error) {
      setStatus(`Save failed: ${error.message}`);
      return;
    }

    state.data.goals.unshift(normalizeGoal(data));
  } else {
    state.data.goals.push(goal);
  }

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

async function signIn(event) {
  event.preventDefault();
  if (!supabaseClient) return;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: selectors.authEmail.value.trim(),
    password: selectors.authPassword.value
  });

  if (error) {
    setStatus(`Sign in failed: ${error.message}`);
    return;
  }

  state.session = data.session;
  state.demoMode = false;
  await loadCloudData();
  showDashboard();
}

async function signUp() {
  if (!supabaseClient) return;

  const { data, error } = await supabaseClient.auth.signUp({
    email: selectors.authEmail.value.trim(),
    password: selectors.authPassword.value
  });

  if (error) {
    setStatus(`Account creation failed: ${error.message}`);
    return;
  }

  state.session = data.session;
  state.demoMode = false;
  if (state.session) {
    await loadCloudData();
    showDashboard();
  } else {
    setStatus("Account created. Check your email if Supabase asks you to confirm it, then sign in.");
  }
  render();
}

async function signOut() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();
  state.session = null;
  state.demoMode = false;
  state.data = { transactions: [], debts: [], goals: [] };
  closeSettings();
  closeMobileMenu();
  loadLocal();
  render();
  showOnboarding();
}

async function saveSettings(event) {
  event.preventDefault();

  if (!supabaseClient || !state.session) {
    selectors.settingsStatus.textContent = "Sign in to update account settings.";
    return;
  }

  const fullName = selectors.settingsName.value.trim();
  const password = selectors.settingsPassword.value;
  const update = {
    data: {
      full_name: fullName
    }
  };

  if (password) {
    if (password.length < 6) {
      selectors.settingsStatus.textContent = "Password must be at least 6 characters.";
      return;
    }
    update.password = password;
  }

  const { data, error } = await supabaseClient.auth.updateUser(update);

  if (error) {
    selectors.settingsStatus.textContent = `Update failed: ${error.message}`;
    return;
  }

  state.session = {
    ...state.session,
    user: data.user
  };
  selectors.settingsPassword.value = "";
  selectors.settingsStatus.textContent = "Settings saved.";
  render();
}

function continueDemo() {
  state.demoMode = true;
  loadLocal();
  render();
  showDashboard();
}

async function deleteRow(table, idValue) {
  if (isCloudMode()) {
    const { error } = await supabaseClient.from(table).delete().eq("id", idValue);
    if (error) {
      setStatus(`Delete failed: ${error.message}`);
      return false;
    }
  }
  return true;
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
selectors.mobileExportButton.addEventListener("click", () => {
  exportCsv();
  closeMobileMenu();
});
selectors.desktopSettingsButton.addEventListener("click", openSettings);
selectors.mobileSettingsButton.addEventListener("click", () => {
  openSettings();
  closeMobileMenu();
});
selectors.mobileSignOutButton.addEventListener("click", signOut);
selectors.settingsCloseButton.addEventListener("click", closeSettings);
selectors.settingsForm.addEventListener("submit", saveSettings);
selectors.settingsModal.addEventListener("click", (event) => {
  if (event.target === selectors.settingsModal) {
    closeSettings();
  }
});
selectors.authForm.addEventListener("submit", signIn);
selectors.signUpButton.addEventListener("click", signUp);
selectors.signOutButton.addEventListener("click", signOut);
selectors.demoButton.addEventListener("click", continueDemo);
selectors.onboardingHomeButton.addEventListener("click", () => {
  if (canUseDashboard()) {
    showDashboard();
  } else {
    showOnboarding();
  }
});
selectors.dashboardHomeButton.addEventListener("click", () => {
  setTab("ledger");
  showDashboard();
});
selectors.mobileHomeButton.addEventListener("click", () => {
  setTab("ledger");
  showDashboard();
});
selectors.mobileMenuButton.addEventListener("click", openMobileMenu);
selectors.mobileMenuClose.addEventListener("click", closeMobileMenu);
selectors.mobileMenuOverlay.addEventListener("click", (event) => {
  if (event.target === selectors.mobileMenuOverlay) {
    closeMobileMenu();
  }
});

document.querySelector(".nav-tabs").addEventListener("click", (event) => {
  if (event.target.matches("button[data-tab]")) {
    setTab(event.target.dataset.tab);
  }
});

document.querySelector(".mobile-menu-links").addEventListener("click", (event) => {
  if (event.target.matches("button[data-mobile-tab]")) {
    setTab(event.target.dataset.mobileTab);
    closeMobileMenu();
  }
});

document.addEventListener("click", async (event) => {
  const transactionId = event.target.dataset.deleteTransaction;
  const debtId = event.target.dataset.deleteDebt;
  const goalId = event.target.dataset.deleteGoal;

  if (transactionId && (await deleteRow("transactions", transactionId))) {
    state.data.transactions = state.data.transactions.filter((item) => item.id !== transactionId);
  }

  if (debtId && (await deleteRow("debts", debtId))) {
    state.data.debts = state.data.debts.filter((item) => item.id !== debtId);
  }

  if (goalId && (await deleteRow("goals", goalId))) {
    state.data.goals = state.data.goals.filter((item) => item.id !== goalId);
  }

  if (transactionId || debtId || goalId) {
    save();
    render();
  }
});

async function init() {
  loadLocal();
  state.authError = readAuthErrorFromUrl();
  selectors.transactionDate.value = new Date().toISOString().slice(0, 10);

  if (supabaseClient) {
    const { data } = await supabaseClient.auth.getSession();
    state.session = data.session;
    supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      state.session = session;
      if (session) {
        state.demoMode = false;
        await loadCloudData();
        showDashboard();
      } else {
        state.data = { transactions: [], debts: [], goals: [] };
        loadLocal();
        render();
        showOnboarding();
      }
    });

    if (state.session) {
      await loadCloudData();
      showDashboard();
      return;
    }
  }

  render();
  if (!supabaseClient) {
    showDashboard();
  } else {
    showOnboarding();
  }
}

void init();
