import "./expenses.scss";
import { Link } from "react-router-dom";

interface ExpensesInterface {
  expenses: any[];
}
const Expenses = ({ expenses }: ExpensesInterface) => {
  return (
    <div className="expensesClass">
      <Link to="/expenses/" style={{ color: "darkslategrey" }}>
        <h5>Expenses</h5>
      </Link>
      <table className="table table-hover userDiv table-sm">
        <thead>
          <tr key="expenses">
            <th scope="col">Date </th>
            <th scope="col">Amount</th>
            <th scope="col">Comment</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody className="table-group-divider tableItem">
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.date}</td>
              <td>{expense.amount}</td>
              <td>{expense.comment}</td>
              <td>{expense.expenseType.expenseType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;
