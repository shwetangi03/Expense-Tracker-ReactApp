import React from "react";

const ExpensesTotal = (props) => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center bg-orange-300 h-14 w-1/5 p-2">
        <h1>Total Expenses:</h1>
        <label>{props.total}</label>
      </div>
    </div>
  );
};

export default ExpensesTotal;
