import React, { useEffect, useState } from "react";
import ExpenseContext from "./expense-context";
import axios from "axios";
import { useDispatch } from "react-redux";
import { itemsAction } from "../reduxStore/fetchData";

const ContextProvider = (props) => {
  const dispatch = useDispatch();
  const [isEditOn, setEdit] = useState(false);
  const [values, setValues] = useState("");

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
      dispatch(itemsAction.fetchExpenses(arr));
    } catch (error) {
      console.log(`Some err ${error}`);
    }
  };

  useEffect(() => {
    autoReloadExpenses();
  }, []);

  const contextData = {
    editable: EditHandler,
    editValues: values,
    isEditOn: isEditOn,
    editStateFunction: setEditingState,
    forReload: autoReloadExpenses,
  };

  return (
    <ExpenseContext.Provider value={contextData}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ContextProvider;
