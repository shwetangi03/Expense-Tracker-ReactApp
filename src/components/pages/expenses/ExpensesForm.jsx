import axios from "axios";
import React, { useRef } from "react";

const ExpensesForm = (props) => {
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const buttonHandler = async (event) => {
    event.preventDefault();
    const data = {
      enteredMoney: moneyRef.current.value,
      enteredDescription: descriptionRef.current.value,
      enteredCategory: categoryRef.current.value,
    };
    const userId = localStorage.getItem("userID");
    props.onClick(data);

    try {
      const res = axios.post(
        `https://expense-tracker-real-time-data-default-rtdb.firebaseio.com/expenses/${userId}.json`,
        data
      );
      console.log(res);
    } catch (error) {
      console.log(`Some error ${error}`);
    }
  };
  return (
    <div className="flex justify-center">
      <form className="bg-gray-500 h-30  rounded-lg">
        <h1 className="flex justify-center py-4 text-xl rounded-lg bg-purple-300">
          Add Expenses
        </h1>

        <div>
          <label htmlFor="money">Money Spent:</label>
          <input
            type="number"
            name=""
            h-96
            rounded-lg
            id="money"
            placeholder="Amount"
            ref={moneyRef}
          />

          <label className="" htmlFor="des">
            Description:
          </label>
          <input
            type="text"
            id="des"
            placeholder="Description"
            ref={descriptionRef}
          />

          <label htmlFor="category">Category:</label>
          <select name="" id="category" ref={categoryRef}>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Other">Other</option>
          </select>

          <div className="flex justify-center p-3">
            <button
              className=" bg-black text-white p-1 px-5 rounded-md"
              onClick={buttonHandler}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpensesForm;
