import React, { useContext, useEffect } from "react";

import ExpenseContext from "../../../store/expense-context";
import Card from "./Card";
import ExpensesTotal from "./ExpensesTotal";
import ExpensesForm from "./ExpensesForm";
import ExpensesList from "./ExpensesList";


const Expenses = () => {
  const CTX = useContext(ExpenseContext);

  const auto = () => {
    CTX.forReload();
  };
  useEffect(auto, []);

  const itemsli = CTX.items;

  const itemsList = itemsli.map((element) => {
    return (
      <ExpensesList
        money={element.enteredMoney}
        description={element.enteredDescription}
        category={element.enteredCategory}
        id={element.id}
        key={element.id}
      />
    );
  });

  return (
    <div>
      <Card>
        <ExpensesForm onClick={""} />
      </Card>
      <Card>{itemsList}</Card>
      <Card>
        <ExpensesTotal total={CTX.total} />
      </Card>
    </div>
  );
};

export default Expenses;
