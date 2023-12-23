import "./expenses.scss";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useState, useEffect } from "react";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (expenses.length === 0) {
      try {
        const response = await axios.get(
          "http://localhost:8080/hassan-hardware/expenses/"
        );
        setExpenses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  };
  const handleOnChangeSearch = async (value: string) => {
    try {
      const API =
        value && value.length > 0
          ? `http://localhost:8080/hassan-hardware/expense/${value}/`
          : "http://localhost:8080/hassan-hardware/expenses/";
      const response = await axios.get(API);
      console.log(response.data);
      setExpenses(response.data);
      setLoading(false);
    } catch (error) {
      setExpenses([]);
      setLoading(false);
    }
  };
  const handleOnChangeSearchDate = async (value: Date) => {
    try {
      const API = value
        ? `http://localhost:8080/hassan-hardware/expenses/${value}/`
        : "http://localhost:8080/hassan-hardware/expenses/";
      const response = await axios.get(API);
      console.log(response.data);
      setExpenses(response.data);
      setLoading(false);
    } catch (error) {
      setExpenses([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="expensesClass">
      <div
        className="addUser"
        style={{
          fontSize: "12px",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <a
          className="btn btn-primary btn-sm"
          href="/expenses/add/"
          role="button"
        >
          <AddIcon />
          New Expense
        </a>
      </div>
      <div
        className="searchCustomer"
        style={{
          alignItems: "center",
          alignSelf: "center",
          marginTop: "0px",
          paddingTop: "0px",
          marginLeft: "30px",
          marginBottom: "10px",
          width: "80%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          placeholder="Search Expense"
          style={{ width: "200px" }}
          onChange={(e) => handleOnChangeSearch(e.target.value)}
        />
        <input
          type="date"
          placeholder="Search Expense For"
          style={{ width: "200px" }}
          onChange={(e) => handleOnChangeSearchDate(e.target.value)}
        />
      </div>
      <table className="table table-hover table-dark table-sm">
        <thead>
          <tr key="expenses">
            <th scope="col">Date </th>
            <th scope="col">Amount</th>
            <th scope="col">Comment</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody className="table-group-divider tableItem table-light">
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
