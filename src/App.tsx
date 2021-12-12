import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashnoard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  return (
    <TransactionsProvider>
      <Header
        onOpenNewTransactionModal={() => setIsNewTransactionModalOpen(true)}
      />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={() => setIsNewTransactionModalOpen(false)}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}
