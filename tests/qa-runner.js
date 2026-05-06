const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

class ClassList {
  constructor(initial = "") {
    this.values = new Set(initial.split(/\s+/).filter(Boolean));
  }

  add(name) {
    this.values.add(name);
  }

  remove(name) {
    this.values.delete(name);
  }

  toggle(name, force) {
    if (force) {
      this.values.add(name);
    } else {
      this.values.delete(name);
    }
  }

  contains(name) {
    return this.values.has(name);
  }
}

class Element {
  constructor({ id = "", dataset = {}, classes = "", matches = () => false } = {}) {
    this.id = id;
    this.dataset = dataset;
    this.value = "";
    this.textContent = "";
    this.innerHTML = "";
    this.style = {};
    this.listeners = {};
    this.classList = new ClassList(classes);
    this.matches = matches;
  }

  addEventListener(type, handler) {
    this.listeners[type] = handler;
  }

  reset() {
    this.value = "";
  }

  click() {
    this.clicked = true;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function makeDocument() {
  const ids = [
    "authPanel",
    "authForm",
    "authEmail",
    "authPassword",
    "authStatus",
    "signUpButton",
    "signOutButton",
    "netTotal",
    "glassNetTotal",
    "monthLabel",
    "pageTitle",
    "cashMeter",
    "incomeTotal",
    "expenseTotal",
    "savingsTotal",
    "debtPaidTotal",
    "transactionList",
    "debtList",
    "goalList",
    "debtBalanceTotal",
    "goalBalanceTotal",
    "transactionDate",
    "transactionForm",
    "debtForm",
    "goalForm",
    "prevMonth",
    "nextMonth",
    "currentMonth",
    "exportButton",
    "transactionKind",
    "transactionAmount",
    "transactionCategory",
    "transactionNote",
    "debtName",
    "debtBalance",
    "debtMinimum",
    "goalName",
    "goalTarget",
    "goalSaved"
  ];
  const elements = Object.fromEntries(ids.map((id) => [id, new Element({ id })]));
  const navTabs = new Element({ classes: "nav-tabs" });
  const navButtons = ["ledger", "debts", "savings"].map(
    (tab, index) =>
      new Element({
        dataset: { tab },
        classes: index === 0 ? "active" : "",
        matches: (selector) => selector === "button[data-tab]"
      })
  );
  const panels = ["ledgerPanel", "debtsPanel", "savingsPanel"].map(
    (id, index) => new Element({ id, classes: index === 0 ? "panel active" : "panel" })
  );
  const documentListeners = {};

  return {
    elements,
    navButtons,
    panels,
    querySelector(selector) {
      if (selector.startsWith("#")) {
        return elements[selector.slice(1)];
      }
      if (selector === ".nav-tabs") {
        return navTabs;
      }
      throw new Error(`Unexpected selector: ${selector}`);
    },
    querySelectorAll(selector) {
      if (selector === ".nav-tabs button") {
        return navButtons;
      }
      if (selector === ".panel") {
        return panels;
      }
      return [];
    },
    addEventListener(type, handler) {
      documentListeners[type] = handler;
    },
    createElement(tag) {
      return new Element({ id: tag });
    },
    listener(type) {
      return documentListeners[type];
    }
  };
}

(async () => {
  const document = makeDocument();
  const storage = new Map();
  let objectUrlRevoked = false;
  const windowObject = {
    POCKET_LEDGER_CONFIG: {
      supabaseUrl: "",
      supabaseAnonKey: ""
    },
    crypto: {
      randomUUID() {
        return `test-${Math.random().toString(16).slice(2)}`;
      }
    }
  };

  const context = {
    Blob,
    Date,
    Intl,
    Math,
    Number,
    String,
    URL: {
      createObjectURL() {
        return "blob:test";
      },
      revokeObjectURL(url) {
        objectUrlRevoked = url === "blob:test";
      }
    },
    document,
    localStorage: {
      getItem(key) {
        return storage.get(key) ?? null;
      },
      setItem(key, value) {
        storage.set(key, value);
      },
      removeItem(key) {
        storage.delete(key);
      }
    },
    window: windowObject
  };

  const appPath = path.join(__dirname, "..", "app.js");
  vm.runInNewContext(fs.readFileSync(appPath, "utf8"), context, { filename: appPath });

  const $ = (id) => document.elements[id];
  const today = new Date().toISOString().slice(0, 10);

  assert($("authStatus").textContent.includes("Local demo mode"), "Local fallback auth status did not render.");

  $("transactionKind").value = "income";
  $("transactionAmount").value = "3200";
  $("transactionCategory").value = "Paycheck";
  $("transactionDate").value = today;
  $("transactionNote").value = "Main job";
  await $("transactionForm").listeners.submit({ preventDefault() {}, target: $("transactionForm") });

  $("transactionKind").value = "expense";
  $("transactionAmount").value = "125.50";
  $("transactionCategory").value = "Groceries";
  $("transactionDate").value = today;
  $("transactionNote").value = "";
  await $("transactionForm").listeners.submit({ preventDefault() {}, target: $("transactionForm") });

  $("debtName").value = "Credit Card";
  $("debtBalance").value = "900";
  $("debtMinimum").value = "45";
  await $("debtForm").listeners.submit({ preventDefault() {}, target: $("debtForm") });

  $("goalName").value = "Emergency Fund";
  $("goalTarget").value = "5000";
  $("goalSaved").value = "750";
  await $("goalForm").listeners.submit({ preventDefault() {}, target: $("goalForm") });

  assert($("incomeTotal").textContent === "$3,200.00", "Income total did not update.");
  assert($("expenseTotal").textContent === "$125.50", "Expense total did not update.");
  assert($("netTotal").textContent === "$3,074.50", "Net total did not update.");
  assert($("glassNetTotal").textContent === "$3,074.50", "Glass card total did not update.");
  assert($("transactionList").innerHTML.includes("Groceries"), "Expense was not rendered.");
  assert($("transactionList").innerHTML.includes("Paycheck"), "Income was not rendered.");
  assert($("debtList").innerHTML.includes("Credit Card"), "Debt was not rendered.");
  assert($("debtBalanceTotal").textContent === "$900.00", "Debt balance total did not update.");
  assert($("goalList").innerHTML.includes("Emergency Fund"), "Savings goal was not rendered.");
  assert($("goalBalanceTotal").textContent === "$750.00 / $5,000.00", "Savings goal total did not update.");

  document.querySelector(".nav-tabs").listeners.click({ target: document.navButtons[1] });
  assert(document.navButtons[1].classList.contains("active"), "Debt tab did not activate.");
  assert(document.panels[1].classList.contains("active"), "Debt panel did not activate.");

  const saved = JSON.parse(storage.get("pocket-ledger-web:v2"));
  const firstTransactionId = saved.transactions[0].id;
  await document.listener("click")({ target: new Element({ dataset: { deleteTransaction: firstTransactionId } }) });
  assert(!$("transactionList").innerHTML.includes("Groceries"), "Transaction delete did not update the list.");

  $("exportButton").listeners.click();
  assert(objectUrlRevoked, "CSV export did not create and revoke a blob URL.");

  console.log("QA passed: auth fallback, forms, totals, tabs, delete, export, and local persistence are working.");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
