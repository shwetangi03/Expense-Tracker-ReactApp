import React from "react";

const ExpensesList = (props) => {
  console.log(props);
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
      </li>
    </div>
  );
};

export default ExpensesList;
