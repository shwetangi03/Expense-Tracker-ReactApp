import Card from "./Card";
import ExpensesTotal from "./ExpensesTotal";
import ExpensesForm from "./ExpensesForm";
import ExpensesList from "./ExpensesList";
import { useDispatch, useSelector } from "react-redux";

const Expenses = () => {
  const dispatch = useDispatch();
  const itemsX = useSelector((state) => state.itemsData.itemList);

  console.log(itemsX);

  const itemsList = itemsX.map((element) => {
    return (
      <ExpensesList
        money={element.enteredMoney}
        description={element.enteredDescription}
        category={element.enteredCategory}
        id={element.id}
        key={element.id}
      />
    );
  });

  return (
    <div>
      <Card>
        <ExpensesForm onClick={""} />
      </Card>
      <Card>{itemsList}</Card>
      <Card>
        <ExpensesTotal />
      </Card>
    </div>
  );
};

export default Expenses;
