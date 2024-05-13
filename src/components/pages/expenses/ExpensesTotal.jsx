import React from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { premiumActions } from "../../../reduxStore/PremiumBtn";

const ExpensesTotal = () => {
  const items = useSelector((state) => state.itemsData.itemList);
  const isPremium = useSelector((state) => state.premium.isPremium);
  const pActive = useSelector((state) => state.premium.preminumValue);
  const dispatch = useDispatch();
  let totalAmount = 0;
  items.map((element) => {
    totalAmount += Number(element.enteredMoney);
  });

  if (totalAmount > 10000) {
    dispatch(premiumActions.PremiumBtnActive());
  } else {
    dispatch(premiumActions.PremiumBtnDeactive());
  }

  const activatePreminum = (event) => {
    event.preventDefault();
    console.log("activate");
    dispatch(premiumActions.activatePremium());
  };

  const csvData = [...items];

  return (
    <div className="flex justify-center gap-3">
      <div className="flex justify-center bg-orange-300 h-14 w-1/5 p-2 rounded-md gap-2">
        <h1>Total Expenses:</h1>
        <label>{totalAmount}</label>
      </div>
      {isPremium && (
        <div className="bg-orange-600 text-white p-2 rounded-md">
          <button onClick={activatePreminum}>Get Premium</button>
        </div>
      )}
      <div className="bg-orange-600 text-white p-2 rounded-md">
        <CSVLink data={csvData}>
          <button>🡇 Download </button>
        </CSVLink>
      </div>
    </div>
  );
};

export default ExpensesTotal;
