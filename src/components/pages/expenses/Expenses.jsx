import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "./Card";
import ExpensesTotal from "./ExpensesTotal";
import ExpensesForm from "./ExpensesForm";
import ExpensesList from "./ExpensesList";

const Expenses = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const itemsHandler = (data) => {
    setItems([...items, data]);
  };

  const autoReloadExpenses = async () => {
    const userId = localStorage.getItem("userID");
    try {
      const res = await axios.get(
        `https://expense-tracker-real-time-data-default-rtdb.firebaseio.com/expenses/${userId}.json`
      );
      const data = res.data;
      let arr = [];
      let index = 0;
      for (const key in data) {
        arr[index] =  {
          enteredCategory:data[key].enteredCategory,
          enteredDescription:data[key].enteredDescription,
          enteredMoney:data[key].enteredMoney,
          id:key,
        }
        index++;
      }
      setItems([...arr]);
    } catch (error) {
      console.log(`Some err ${error}`);
    }
  };

  useEffect(() => {
    autoReloadExpenses();
  }, []);

  const itemsList = items.map((element) => {
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
  let totalAmount = 0;
  const totalCal = () => {
    items.map((element) => {
      totalAmount = totalAmount + Number(element.enteredMoney);
    });
    setTotal(totalAmount);
  };

  useEffect(() => {
    totalCal();
  }, [items]);
  return (
    <div>
      <Card>
        <ExpensesForm onClick={itemsHandler} />
      </Card>
      <Card>{itemsList}</Card>
      <Card>
        <ExpensesTotal total={total} />
      </Card>
    </div>
  );
};

export default Expenses;
