import React, { useEffect, useState } from "react";
import ExpenseContext from "./expense-context";
import axios from "axios";

const ContextProvider = (props) => {
  const [isLogin, setLogin] = useState(false);
  const [isEditOn, setEdit] = useState(false);
  const [values, setValues] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const loginHandler = (value) => {
    setLogin(value);
  };

  const setEditingState = (value) => {
    setEdit(value);
  };

  const EditHandler = (value) => {
    setValues(value);
    setEditingState(true);
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
        arr[index] = {
          enteredCategory: data[key].enteredCategory,
          enteredDescription: data[key].enteredDescription,
          enteredMoney: data[key].enteredMoney,
          id: key,
        };
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

  //Adding new by state
  const itemsHandler = (data) => {
    setItems([...items, data]);
  };

  useEffect(() => {
    const localIsLogin = localStorage.getItem("JWTTOKEN");
    if (localIsLogin === null) {
      setLogin(false);
    } else if (localIsLogin === "") {
      setLogin(false);
    } else if (localIsLogin.trim().length > 0) {
      setLogin(true);
    }
  }, []);

  const contextData = {
    isLogin: isLogin,
    login: loginHandler,
    editable: EditHandler,
    editValues: values,
    isEditOn: isEditOn,
    editStateFunction: setEditingState,
    items: items,
    total: total,
    itemsSetup: itemsHandler,
    forReload: autoReloadExpenses,
  };

  return (
    <ExpenseContext.Provider value={contextData}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ContextProvider;
