import React, { useEffect, useState } from "react";
import ExpenseContext from "./expense-context";

const ContextProvider = (props) => {
  const [isLogin, setLogin] = useState(false);
  const [isEditOn, setEdit] = useState(false);
  const [values, setValues] = useState("");

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
  };

  return (
    <ExpenseContext.Provider value={contextData}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ContextProvider;
