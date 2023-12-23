import { useEffect, useState } from "react";
import "./expenseForm.scss";
import { Button } from "antd";
import axios from "axios";

const ExpenseForm = () => {
  const [amount, setAmount] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedExpenseTypeIndex, setSelectedExpenseTypeIndex] = useState(-1);
  const [fetchedExpenseTypes, setFetchedExpenseTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const expenseFormData = new FormData();
    if (selectedExpenseTypeIndex === -1) {
      return;
    }
    expenseFormData.append(
      "Expense",
      JSON.stringify({
        amount,
        comment,
        expenseType: fetchedExpenseTypes[selectedExpenseTypeIndex].expenseType,
      })
    );
    setLoading(true);

    console.log("API response: ", expenseFormData);

    axios
      .post(
        "http://localhost:8080/hassan-hardware/expenses/add",
        expenseFormData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        window.location.href = "/expenses/";
        setLoading(false);
        console.log("API response:", response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error occurred while making the API call:", error);
      });
  };
  const fetchExpenseTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/expense-types/"
      );
      console.log(response.data);
      setFetchedExpenseTypes(response.data);
      setLoading(false);
    } catch (error) {
      setFetchedExpenseTypes([]);
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchExpenseTypes();
  }, []);
  if (loading) return <div>Loading...</div>;

  return (
    <div className="addExpense">
      <div className="box"></div>
      <form onSubmit={handleSubmit}>
        <div className="box box1">
          <div className="title">
            <b>New Expense</b>
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Enter Amount"
                aria-label="amount"
                aria-describedby="basic-addon3 basic-addon4"
                onChange={(e) => setAmount(parseInt(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Comment
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="comment"
                placeholder="Enter Comment"
                aria-label="Comment"
                aria-describedby="basic-addon3 basic-addon4"
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
          </div>
          <label htmlFor="myDropdown">Select Expense Type:</label>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: "200px" }}
            >
              {selectedExpenseTypeIndex === -1
                ? "Select Expense Type"
                : fetchedExpenseTypes[selectedExpenseTypeIndex].expenseType}
            </button>
            <ul className="dropdown-menu">
              {fetchedExpenseTypes.map((expenseType, index) => (
                <li
                  key={expenseType.expenseType}
                  onClick={() => {
                    setSelectedExpenseTypeIndex(index);
                  }}
                >
                  <a
                    className={
                      selectedExpenseTypeIndex === index
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                  >
                    {expenseType.expenseType}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <Button
            className="btn btn-primary"
            type="primary"
            value="Submit"
            htmlType="submit"
            style={{ marginTop: "20px" }}
          >
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
