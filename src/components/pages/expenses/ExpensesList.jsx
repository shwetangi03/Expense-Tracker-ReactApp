import React, { useContext } from "react";
import ExpenseContext from "../../../store/expense-context";
import axios from "axios";

const ExpensesList = (props) => {
  const ctx = useContext(ExpenseContext);

  const deleteBtnHandler = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem("userID");
    try {
      const res = await axios.delete(
        `https://expense-tracker-real-time-data-default-rtdb.firebaseio.com/expenses/${userId}/${props.id}.json`
      );
      console.log(res);
      console.log("Expense successfully deleted");
    } catch (error) {
      console.log(`Some error ${error}`);
    }
  };

  const editBtnHandler = (event) => {
    event.preventDefault();
    ctx.editable(props);
  };

  return (
    <div className="flex justify-center p-2">
      <li className="flex h-10 w-2/5 p-2 bg-indigo-400 ">
        <div className="px-3">
          <h2>{props.category}</h2>
        </div>
        <div className="px-3">
          <label> {props.description}</label>
        </div>
        <div className="px-3">
          <label> {props.money}</label>
        </div>
        <div className="px-3">
          <button onClick={editBtnHandler}>Edit</button>
        </div>
        <div className="px-3">
          <button onClick={deleteBtnHandler}>Delete</button>
        </div>
      </li>
    </div>
  );
};

export default ExpensesList;
