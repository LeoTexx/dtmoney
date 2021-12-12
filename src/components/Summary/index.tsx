import incomeImage from "../../assets/income.svg";
import outcomeImage from "../../assets/outcome.svg";
import totalImage from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount;
      }
      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Income</p>
          <img src={incomeImage} alt="Income" />
        </header>
        <strong>
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "EUR",
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Outcome</p>
          <img src={outcomeImage} alt="Outcome" />
        </header>
        <strong>
          -
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "EUR",
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImage} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "EUR",
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
