import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import ExpenseContext from "../../../store/expense-context";

const ExpensesForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const ctx = useContext(ExpenseContext);
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const buttonHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      enteredMoney: moneyRef.current.value,
      enteredDescription: descriptionRef.current.value,
      enteredCategory: categoryRef.current.value,
    };
    const userId = localStorage.getItem("userID");

    if (moneyRef.current.value !== "" && descriptionRef.current.value !== "") {
      try {
        const res = axios.post(
          `https://expense-tracker-real-time-data-default-rtdb.firebaseio.com/expenses/${userId}.json`,
          data
        );
        console.log(res);
        ctx.itemsSetup(data);
      } catch (error) {
        console.log(`Some error ${error}`);
      }
    } else {
      alert("input fields are empty!");
    }
    setIsLoading(false);
  };

  if (ctx.isEditOn) {
    moneyRef.current.value = ctx.editValues.money;
    descriptionRef.current.value = ctx.editValues.description;
    categoryRef.current.value = ctx.editValues.category;
  }

  const editHandler = async (event) => {
    event.preventDefault();
    ctx.editStateFunction(false);

    if (ctx.isEditOn) {
      let id = ctx.editValues.id;
      const userIdEdit = localStorage.getItem("userID");
      const data = {
        enteredMoney: moneyRef.current.value,
        enteredDescription: descriptionRef.current.value,
        enteredCategory: categoryRef.current.value,
      };
      setIsLoading(true);
      try {
        const res = await axios.put(
          `https://expense-tracker-real-time-data-default-rtdb.firebaseio.com/expenses/${userIdEdit}/${id}.json`,
          data
        );
        console.log(res);
        console.log("deleted successfully");
        moneyRef.current.value = "";
        descriptionRef.current.value = "";
        categoryRef.current.value = "";
        ctx.forReload();
      } catch (error) {
        console.log(`Some error ${error}`);
      }
      setIsLoading(false);
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
            {!ctx.isEditOn && (
              <button
                className=" bg-black text-white p-1 px-5 rounded-md"
                onClick={buttonHandler}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            )}

            {ctx.isEditOn && (
              <button
                className=" bg-black text-white p-1 px-5 rounded-md"
                onClick={editHandler}
              >
                {isLoading ? "Loading..." : "Update"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpensesForm;
