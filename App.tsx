import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

type TransactionKind = "income" | "expense" | "savings" | "debt";

type Transaction = {
  id: string;
  kind: TransactionKind;
  amount: number;
  category: string;
  note: string;
  date: string;
};

type Debt = {
  id: string;
  name: string;
  balance: number;
  minimumPayment: number;
};

type SavingsGoal = {
  id: string;
  name: string;
  target: number;
  saved: number;
};

type BudgetData = {
  transactions: Transaction[];
  debts: Debt[];
  goals: SavingsGoal[];
};

type DraftTransaction = {
  kind: TransactionKind;
  amount: string;
  category: string;
  note: string;
  date: string;
};

type DraftDebt = {
  name: string;
  balance: string;
  minimumPayment: string;
};

type DraftGoal = {
  name: string;
  target: string;
  saved: string;
};

const STORAGE_KEY = "pocket-ledger:v1";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const kindLabels: Record<TransactionKind, string> = {
  income: "Paycheck",
  expense: "Expense",
  savings: "Savings",
  debt: "Debt"
};

const kindColors: Record<TransactionKind, string> = {
  income: "#176b4d",
  expense: "#a33d2d",
  savings: "#1f5f8b",
  debt: "#765122"
};

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric"
});

const defaultData: BudgetData = {
  transactions: [],
  debts: [],
  goals: []
};

const today = () => new Date().toISOString().slice(0, 10);

const currentMonth = () => today().slice(0, 7);

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const parseMoney = (value: string) => {
  const normalized = value.replace(/[$,\s]/g, "");
  const amount = Number(normalized);
  return Number.isFinite(amount) && amount > 0 ? amount : null;
};

const formatMonth = (month: string) => {
  const [year, monthIndex] = month.split("-").map(Number);
  return monthFormatter.format(new Date(year, monthIndex - 1, 1));
};

const shiftMonth = (month: string, change: number) => {
  const [year, monthIndex] = month.split("-").map(Number);
  const next = new Date(year, monthIndex - 1 + change, 1);
  return `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;
};

export default function App() {
  const [data, setData] = useState<BudgetData>(defaultData);
  const [month, setMonth] = useState(currentMonth());
  const [activeTab, setActiveTab] = useState<"ledger" | "debts" | "savings">("ledger");
  const [isLoaded, setIsLoaded] = useState(false);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [debtModalOpen, setDebtModalOpen] = useState(false);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [draftTransaction, setDraftTransaction] = useState<DraftTransaction>({
    kind: "expense",
    amount: "",
    category: "",
    note: "",
    date: today()
  });
  const [draftDebt, setDraftDebt] = useState<DraftDebt>({
    name: "",
    balance: "",
    minimumPayment: ""
  });
  const [draftGoal, setDraftGoal] = useState<DraftGoal>({
    name: "",
    target: "",
    saved: ""
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setData(JSON.parse(raw) as BudgetData);
        }
      } catch {
        Alert.alert("Storage issue", "Your saved budget data could not be loaded.");
      } finally {
        setIsLoaded(true);
      }
    };

    void loadData();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, isLoaded]);

  const monthlyTransactions = useMemo(
    () =>
      data.transactions
        .filter((transaction) => transaction.date.startsWith(month))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [data.transactions, month]
  );

  const totals = useMemo(() => {
    const byKind = monthlyTransactions.reduce(
      (acc, transaction) => {
        acc[transaction.kind] += transaction.amount;
        return acc;
      },
      { income: 0, expense: 0, savings: 0, debt: 0 }
    );

    return {
      ...byKind,
      net: byKind.income - byKind.expense - byKind.savings - byKind.debt
    };
  }, [monthlyTransactions]);

  const debtBalance = data.debts.reduce((total, debt) => total + debt.balance, 0);
  const goalProgress = data.goals.reduce((total, goal) => total + goal.saved, 0);
  const goalTarget = data.goals.reduce((total, goal) => total + goal.target, 0);

  const saveTransaction = () => {
    const amount = parseMoney(draftTransaction.amount);

    if (!amount || !draftTransaction.category.trim()) {
      Alert.alert("Missing detail", "Add a valid amount and category.");
      return;
    }

    setData((current) => ({
      ...current,
      transactions: [
        {
          id: makeId(),
          kind: draftTransaction.kind,
          amount,
          category: draftTransaction.category.trim(),
          note: draftTransaction.note.trim(),
          date: draftTransaction.date || today()
        },
        ...current.transactions
      ]
    }));
    setDraftTransaction({
      kind: "expense",
      amount: "",
      category: "",
      note: "",
      date: today()
    });
    setTransactionModalOpen(false);
  };

  const saveDebt = () => {
    const balance = parseMoney(draftDebt.balance);
    const minimumPayment = parseMoney(draftDebt.minimumPayment) ?? 0;

    if (!balance || !draftDebt.name.trim()) {
      Alert.alert("Missing detail", "Add a debt name and current balance.");
      return;
    }

    setData((current) => ({
      ...current,
      debts: [
        ...current.debts,
        {
          id: makeId(),
          name: draftDebt.name.trim(),
          balance,
          minimumPayment
        }
      ]
    }));
    setDraftDebt({ name: "", balance: "", minimumPayment: "" });
    setDebtModalOpen(false);
  };

  const saveGoal = () => {
    const target = parseMoney(draftGoal.target);
    const saved = parseMoney(draftGoal.saved) ?? 0;

    if (!target || !draftGoal.name.trim()) {
      Alert.alert("Missing detail", "Add a goal name and target amount.");
      return;
    }

    setData((current) => ({
      ...current,
      goals: [
        ...current.goals,
        {
          id: makeId(),
          name: draftGoal.name.trim(),
          target,
          saved
        }
      ]
    }));
    setDraftGoal({ name: "", target: "", saved: "" });
    setGoalModalOpen(false);
  };

  const deleteTransaction = (id: string) => {
    setData((current) => ({
      ...current,
      transactions: current.transactions.filter((transaction) => transaction.id !== id)
    }));
  };

  const deleteDebt = (id: string) => {
    setData((current) => ({
      ...current,
      debts: current.debts.filter((debt) => debt.id !== id)
    }));
  };

  const deleteGoal = (id: string) => {
    setData((current) => ({
      ...current,
      goals: current.goals.filter((goal) => goal.id !== id)
    }));
  };

  const exportCsv = async () => {
    const header = "date,type,category,note,amount";
    const rows = data.transactions.map((transaction) =>
      [
        transaction.date,
        kindLabels[transaction.kind],
        transaction.category,
        transaction.note,
        transaction.amount.toFixed(2)
      ]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header, ...rows].join("\n");

    await Share.share({
      title: "Pocket Ledger CSV",
      message: csv
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.kicker}>Pocket Ledger</Text>
              <Text style={styles.title}>{formatMonth(month)}</Text>
            </View>
            <Pressable style={styles.primaryButton} onPress={() => setTransactionModalOpen(true)}>
              <Text style={styles.primaryButtonText}>Add</Text>
            </Pressable>
          </View>

          <View style={styles.monthControls}>
            <Pressable style={styles.iconButton} onPress={() => setMonth(shiftMonth(month, -1))}>
              <Text style={styles.iconButtonText}>Prev</Text>
            </Pressable>
            <Pressable style={styles.monthPill} onPress={() => setMonth(currentMonth())}>
              <Text style={styles.monthPillText}>This Month</Text>
            </Pressable>
            <Pressable style={styles.iconButton} onPress={() => setMonth(shiftMonth(month, 1))}>
              <Text style={styles.iconButtonText}>Next</Text>
            </Pressable>
          </View>

          <View style={styles.summaryGrid}>
            <SummaryTile label="Income" value={totals.income} tone="green" />
            <SummaryTile label="Expenses" value={totals.expense} tone="red" />
            <SummaryTile label="Saved" value={totals.savings} tone="blue" />
            <SummaryTile label="Net" value={totals.net} tone={totals.net >= 0 ? "green" : "red"} />
          </View>

          <View style={styles.tabBar}>
            <TabButton active={activeTab === "ledger"} label="Ledger" onPress={() => setActiveTab("ledger")} />
            <TabButton active={activeTab === "debts"} label="Debts" onPress={() => setActiveTab("debts")} />
            <TabButton active={activeTab === "savings"} label="Savings" onPress={() => setActiveTab("savings")} />
          </View>

          {activeTab === "ledger" && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Monthly Activity</Text>
                <Pressable onPress={exportCsv}>
                  <Text style={styles.linkButton}>Export CSV</Text>
                </Pressable>
              </View>
              {monthlyTransactions.length === 0 ? (
                <EmptyState text="No entries for this month yet." />
              ) : (
                monthlyTransactions.map((transaction) => (
                  <Pressable
                    key={transaction.id}
                    style={styles.transactionRow}
                    onLongPress={() => deleteTransaction(transaction.id)}
                  >
                    <View style={styles.transactionMeta}>
                      <Text style={styles.transactionCategory}>{transaction.category}</Text>
                      <Text style={styles.transactionNote}>
                        {kindLabels[transaction.kind]} · {transaction.date}
                        {transaction.note ? ` · ${transaction.note}` : ""}
                      </Text>
                    </View>
                    <Text style={[styles.transactionAmount, { color: kindColors[transaction.kind] }]}>
                      {transaction.kind === "income" ? "+" : "-"}
                      {currency.format(transaction.amount)}
                    </Text>
                  </Pressable>
                ))
              )}
            </View>
          )}

          {activeTab === "debts" && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Debt Tracker</Text>
                  <Text style={styles.sectionSubtitle}>{currency.format(debtBalance)} remaining</Text>
                </View>
                <Pressable onPress={() => setDebtModalOpen(true)}>
                  <Text style={styles.linkButton}>Add Debt</Text>
                </Pressable>
              </View>
              {data.debts.length === 0 ? (
                <EmptyState text="Add loans, cards, or other balances." />
              ) : (
                data.debts.map((debt) => (
                  <Pressable key={debt.id} style={styles.assetRow} onLongPress={() => deleteDebt(debt.id)}>
                    <View>
                      <Text style={styles.assetTitle}>{debt.name}</Text>
                      <Text style={styles.assetMeta}>Minimum {currency.format(debt.minimumPayment)}</Text>
                    </View>
                    <Text style={styles.assetAmount}>{currency.format(debt.balance)}</Text>
                  </Pressable>
                ))
              )}
            </View>
          )}

          {activeTab === "savings" && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Savings Goals</Text>
                  <Text style={styles.sectionSubtitle}>
                    {currency.format(goalProgress)} of {currency.format(goalTarget || 0)}
                  </Text>
                </View>
                <Pressable onPress={() => setGoalModalOpen(true)}>
                  <Text style={styles.linkButton}>Add Goal</Text>
                </Pressable>
              </View>
              {data.goals.length === 0 ? (
                <EmptyState text="Create emergency, travel, house, or investment goals." />
              ) : (
                data.goals.map((goal) => {
                  const progress = Math.min(goal.saved / goal.target, 1);

                  return (
                    <Pressable key={goal.id} style={styles.goalCard} onLongPress={() => deleteGoal(goal.id)}>
                      <View style={styles.goalHeader}>
                        <Text style={styles.assetTitle}>{goal.name}</Text>
                        <Text style={styles.assetAmount}>{Math.round(progress * 100)}%</Text>
                      </View>
                      <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                      </View>
                      <Text style={styles.assetMeta}>
                        {currency.format(goal.saved)} saved of {currency.format(goal.target)}
                      </Text>
                    </Pressable>
                  );
                })
              )}
            </View>
          )}
        </ScrollView>

        <TransactionModal
          draft={draftTransaction}
          onChange={setDraftTransaction}
          onClose={() => setTransactionModalOpen(false)}
          onSave={saveTransaction}
          visible={transactionModalOpen}
        />
        <DebtModal
          draft={draftDebt}
          onChange={setDraftDebt}
          onClose={() => setDebtModalOpen(false)}
          onSave={saveDebt}
          visible={debtModalOpen}
        />
        <GoalModal
          draft={draftGoal}
          onChange={setDraftGoal}
          onClose={() => setGoalModalOpen(false)}
          onSave={saveGoal}
          visible={goalModalOpen}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function SummaryTile({
  label,
  value,
  tone
}: {
  label: string;
  value: number;
  tone: "green" | "red" | "blue";
}) {
  const toneStyle = {
    green: styles.greenText,
    red: styles.redText,
    blue: styles.blueText
  }[tone];

  return (
    <View style={styles.summaryTile}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValue, toneStyle]}>{currency.format(value)}</Text>
    </View>
  );
}

function TabButton({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  return (
    <Pressable style={[styles.tabButton, active && styles.tabButtonActive]} onPress={onPress}>
      <Text style={[styles.tabButtonText, active && styles.tabButtonTextActive]}>{label}</Text>
    </Pressable>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

function TransactionModal({
  draft,
  onChange,
  onClose,
  onSave,
  visible
}: {
  draft: DraftTransaction;
  onChange: (draft: DraftTransaction) => void;
  onClose: () => void;
  onSave: () => void;
  visible: boolean;
}) {
  return (
    <BaseModal title="Add Activity" visible={visible} onClose={onClose} onSave={onSave}>
      <View style={styles.segmentedControl}>
        {(Object.keys(kindLabels) as TransactionKind[]).map((kind) => (
          <Pressable
            key={kind}
            style={[styles.segment, draft.kind === kind && styles.segmentActive]}
            onPress={() => onChange({ ...draft, kind })}
          >
            <Text style={[styles.segmentText, draft.kind === kind && styles.segmentTextActive]}>
              {kindLabels[kind]}
            </Text>
          </Pressable>
        ))}
      </View>
      <Field
        label="Amount"
        keyboardType="decimal-pad"
        onChangeText={(amount) => onChange({ ...draft, amount })}
        placeholder="0.00"
        value={draft.amount}
      />
      <Field
        label="Category"
        onChangeText={(category) => onChange({ ...draft, category })}
        placeholder="Rent, groceries, paycheck"
        value={draft.category}
      />
      <Field
        label="Date"
        onChangeText={(date) => onChange({ ...draft, date })}
        placeholder="YYYY-MM-DD"
        value={draft.date}
      />
      <Field
        label="Note"
        onChangeText={(note) => onChange({ ...draft, note })}
        placeholder="Optional"
        value={draft.note}
      />
    </BaseModal>
  );
}

function DebtModal({
  draft,
  onChange,
  onClose,
  onSave,
  visible
}: {
  draft: DraftDebt;
  onChange: (draft: DraftDebt) => void;
  onClose: () => void;
  onSave: () => void;
  visible: boolean;
}) {
  return (
    <BaseModal title="Add Debt" visible={visible} onClose={onClose} onSave={onSave}>
      <Field
        label="Name"
        onChangeText={(name) => onChange({ ...draft, name })}
        placeholder="Credit card, car loan"
        value={draft.name}
      />
      <Field
        label="Balance"
        keyboardType="decimal-pad"
        onChangeText={(balance) => onChange({ ...draft, balance })}
        placeholder="0.00"
        value={draft.balance}
      />
      <Field
        label="Minimum Payment"
        keyboardType="decimal-pad"
        onChangeText={(minimumPayment) => onChange({ ...draft, minimumPayment })}
        placeholder="0.00"
        value={draft.minimumPayment}
      />
    </BaseModal>
  );
}

function GoalModal({
  draft,
  onChange,
  onClose,
  onSave,
  visible
}: {
  draft: DraftGoal;
  onChange: (draft: DraftGoal) => void;
  onClose: () => void;
  onSave: () => void;
  visible: boolean;
}) {
  return (
    <BaseModal title="Add Savings Goal" visible={visible} onClose={onClose} onSave={onSave}>
      <Field
        label="Name"
        onChangeText={(name) => onChange({ ...draft, name })}
        placeholder="Emergency fund"
        value={draft.name}
      />
      <Field
        label="Target"
        keyboardType="decimal-pad"
        onChangeText={(target) => onChange({ ...draft, target })}
        placeholder="0.00"
        value={draft.target}
      />
      <Field
        label="Already Saved"
        keyboardType="decimal-pad"
        onChangeText={(saved) => onChange({ ...draft, saved })}
        placeholder="0.00"
        value={draft.saved}
      />
    </BaseModal>
  );
}

function BaseModal({
  children,
  onClose,
  onSave,
  title,
  visible
}: {
  children: React.ReactNode;
  onClose: () => void;
  onSave: () => void;
  title: string;
  visible: boolean;
}) {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.linkButton}>Close</Text>
            </Pressable>
          </View>
          {children}
          <Pressable style={styles.fullButton} onPress={onSave}>
            <Text style={styles.primaryButtonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function Field({
  keyboardType,
  label,
  onChangeText,
  placeholder,
  value
}: {
  keyboardType?: "default" | "decimal-pad";
  label: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        keyboardType={keyboardType ?? "default"}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#948a7d"
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f4ef"
  },
  container: {
    flex: 1
  },
  content: {
    gap: 18,
    padding: 20,
    paddingBottom: 42
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  kicker: {
    color: "#655d52",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  title: {
    color: "#191713",
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 0,
    marginTop: 4
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#191713",
    borderRadius: 8,
    height: 46,
    justifyContent: "center",
    minWidth: 76,
    paddingHorizontal: 18
  },
  primaryButtonText: {
    color: "#fffdfa",
    fontSize: 16,
    fontWeight: "800"
  },
  monthControls: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: "#ede6da",
    borderRadius: 8,
    height: 42,
    justifyContent: "center",
    minWidth: 76
  },
  iconButtonText: {
    color: "#302c27",
    fontSize: 14,
    fontWeight: "800"
  },
  monthPill: {
    alignItems: "center",
    backgroundColor: "#fffdfa",
    borderColor: "#ded5c8",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    height: 42,
    justifyContent: "center"
  },
  monthPillText: {
    color: "#302c27",
    fontSize: 14,
    fontWeight: "800"
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  summaryTile: {
    backgroundColor: "#fffdfa",
    borderColor: "#e3dbcf",
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: "48%",
    flexGrow: 1,
    padding: 14
  },
  summaryLabel: {
    color: "#655d52",
    fontSize: 13,
    fontWeight: "700"
  },
  summaryValue: {
    color: "#191713",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0,
    marginTop: 8
  },
  greenText: {
    color: "#176b4d"
  },
  redText: {
    color: "#a33d2d"
  },
  blueText: {
    color: "#1f5f8b"
  },
  tabBar: {
    backgroundColor: "#e6ded1",
    borderRadius: 8,
    flexDirection: "row",
    gap: 6,
    padding: 5
  },
  tabButton: {
    alignItems: "center",
    borderRadius: 7,
    flex: 1,
    height: 42,
    justifyContent: "center"
  },
  tabButtonActive: {
    backgroundColor: "#fffdfa"
  },
  tabButtonText: {
    color: "#655d52",
    fontSize: 14,
    fontWeight: "800"
  },
  tabButtonTextActive: {
    color: "#191713"
  },
  section: {
    gap: 12
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  sectionTitle: {
    color: "#191713",
    fontSize: 20,
    fontWeight: "900"
  },
  sectionSubtitle: {
    color: "#655d52",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4
  },
  linkButton: {
    color: "#1f5f8b",
    fontSize: 14,
    fontWeight: "900"
  },
  transactionRow: {
    alignItems: "center",
    backgroundColor: "#fffdfa",
    borderColor: "#e3dbcf",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    padding: 14
  },
  transactionMeta: {
    flex: 1,
    gap: 4
  },
  transactionCategory: {
    color: "#191713",
    fontSize: 16,
    fontWeight: "900"
  },
  transactionNote: {
    color: "#655d52",
    fontSize: 12,
    fontWeight: "600"
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "900"
  },
  assetRow: {
    alignItems: "center",
    backgroundColor: "#fffdfa",
    borderColor: "#e3dbcf",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14
  },
  assetTitle: {
    color: "#191713",
    fontSize: 16,
    fontWeight: "900"
  },
  assetMeta: {
    color: "#655d52",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 5
  },
  assetAmount: {
    color: "#191713",
    fontSize: 15,
    fontWeight: "900"
  },
  goalCard: {
    backgroundColor: "#fffdfa",
    borderColor: "#e3dbcf",
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 14
  },
  goalHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  progressTrack: {
    backgroundColor: "#e6ded1",
    borderRadius: 999,
    height: 10,
    overflow: "hidden"
  },
  progressFill: {
    backgroundColor: "#1f5f8b",
    height: "100%"
  },
  emptyState: {
    alignItems: "center",
    backgroundColor: "#fffdfa",
    borderColor: "#e3dbcf",
    borderRadius: 8,
    borderWidth: 1,
    padding: 24
  },
  emptyText: {
    color: "#655d52",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center"
  },
  modalBackdrop: {
    backgroundColor: "rgba(25, 23, 19, 0.34)",
    flex: 1,
    justifyContent: "flex-end"
  },
  modalCard: {
    backgroundColor: "#f7f4ef",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    gap: 14,
    padding: 20,
    paddingBottom: 34
  },
  modalHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalTitle: {
    color: "#191713",
    fontSize: 22,
    fontWeight: "900"
  },
  segmentedControl: {
    backgroundColor: "#e6ded1",
    borderRadius: 8,
    flexDirection: "row",
    gap: 4,
    padding: 4
  },
  segment: {
    alignItems: "center",
    borderRadius: 7,
    flex: 1,
    minHeight: 38,
    justifyContent: "center",
    paddingHorizontal: 4
  },
  segmentActive: {
    backgroundColor: "#fffdfa"
  },
  segmentText: {
    color: "#655d52",
    fontSize: 12,
    fontWeight: "900"
  },
  segmentTextActive: {
    color: "#191713"
  },
  field: {
    gap: 7
  },
  fieldLabel: {
    color: "#302c27",
    fontSize: 13,
    fontWeight: "900"
  },
  input: {
    backgroundColor: "#fffdfa",
    borderColor: "#ded5c8",
    borderRadius: 8,
    borderWidth: 1,
    color: "#191713",
    fontSize: 16,
    fontWeight: "700",
    minHeight: 48,
    paddingHorizontal: 12
  },
  fullButton: {
    alignItems: "center",
    backgroundColor: "#191713",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    marginTop: 4
  }
});
