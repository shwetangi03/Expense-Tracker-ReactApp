import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { premiumActions } from "../../../reduxStore/PremiumBtn";

const ExpensesTotal = () => {
  const items = useSelector((state) => state.itemsData.itemList);
  const isPremium = useSelector((state) => state.premium.isPremium);
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

  return (
    <div className="flex justify-center gap-3">
      <div className="flex justify-center bg-orange-300 h-14 w-1/5 p-2 rounded-md gap-2">
        <h1>Total Expenses:</h1>
        <label>{totalAmount}</label>
      </div>
      {isPremium && (
        <div className="bg-orange-600 text-white p-2 rounded-md">
          <button>Premium</button>
        </div>
      )}
    </div>
  );
};

export default ExpensesTotal;
