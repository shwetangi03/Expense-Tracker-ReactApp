import React, { useRef } from "react";

const ExpensesForm = (props) => {
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const buttonHandler = (event) => {
    event.preventDefault();
    const data = {
      enteredMoney: moneyRef.current.value,
      enteredDescription: descriptionRef.current.value,
      enteredCategory: categoryRef.current.value,
    };
    props.onClick(data);
  };
  return (
    <div>
      <form>
        <h1>Add Expenses</h1>

        <label htmlFor="money">Money Spent</label>
        <input
          type="number"
          name=""
          id="money"
          placeholder="Amount"
          ref={moneyRef}
        />

        <label htmlFor="des">Description</label>
        <input
          type="number"
          id="des"
          placeholder="Description"
          ref={descriptionRef}
        />

        <label htmlFor="category">Category</label>
        <select name="" id="category" ref={categoryRef}>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>

        <button onClick={buttonHandler}>Add</button>
      </form>
    </div>
  );
};

export default ExpensesForm;
