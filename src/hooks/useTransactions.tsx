import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

interface Transaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: Date;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => void;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const initialValue = localStorage.getItem("@leo:myTransaction");
    return initialValue ? JSON.parse(initialValue) : [];
  });

  function createTransaction(transaction: TransactionInput) {
    const id = Math.random() * 1000;
    const data = { id, createdAt: new Date(), ...transaction };

    setTransactions([...transactions, data as Transaction]);
  }

  useEffect(() => {
    localStorage.setItem("@leo:myTransaction", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
