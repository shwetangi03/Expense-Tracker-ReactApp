import React, { useState } from "react";

import Card from "./Card";
import ExpensesTotal from "./ExpensesTotal";
import ExpensesForm from "./ExpensesForm";
import ExpensesList from "./ExpensesList";

const Expenses = () => {
  const [items, setItems] = useState([]);

  const itemsHandler = (data) => {
    setItems([...items, data]);
  };

  const itemsList = items.map((element) => {
    return (
      <ExpensesList
        money={element.enteredMoney}
        description={element.enteredDescription}
        category={element.enteredCategory}
      />
    );
  });
  return (
    <div>
      <Card>
        <ExpensesTotal />
      </Card>
      <Card>
        <ExpensesForm onClick={itemsHandler} />
      </Card>
      <Card>{itemsList}</Card>
    </div>
  );
};

export default Expenses;
