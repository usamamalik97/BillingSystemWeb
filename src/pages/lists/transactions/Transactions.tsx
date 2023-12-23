import { Button } from "antd";
import "./transactions.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (transactions.length === 0) {
      try {
        const response = await axios.get(
          "http://localhost:8080/hassan-hardware/payments/all/"
        );
        setTransactions(response.data.transactionInfoList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  };
  const handlePaymentApprove = async (
    event: React.FormEvent,
    transId: number
  ) => {
    event.preventDefault();
    const transactionFormData = new FormData();

    transactionFormData.append(
      "Transaction",
      JSON.stringify({
        transId,
      })
    );
    setLoading(true);
    console.log("API response: ", transactionFormData);
    let API = "http://localhost:8080/hassan-hardware/transaction/approved";
    axios
      .post(API, transactionFormData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
        setTransactions(response.data.transactionInfoList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error occurred while making the API call:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="transactionsClass">
      <h5
        style={{
          marginTop: "10px",
          marginLeft: "20px",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        Transactions
      </h5>
      <table className="table table-hover table-dark table-sm">
        <thead>
          <tr>
            <th scope="col">Customer Name</th>
            <th scope="col">Payment Date </th>
            <th scope="col">Payment Amount</th>
            <th scope="col">Adjusted Amount</th>
            <th scope="col">Method</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider tableItem table-light">
          {transactions.map((transaction, index) => (
            <tr
              className={
                transaction.billStatus.status === "F"
                  ? "table-success"
                  : transaction.billStatus.status === "P"
                  ? "table-warning"
                  : "table-danger"
              }
              key={index}
            >
              <td>{transaction.customer.customerName}</td>
              <td>{transaction.paymentDate}</td>
              <td>{transaction.paymentAmount}</td>
              <td>{transaction.adjustedAmount}</td>
              <td>{transaction.cheque ? "Cheque" : "Cash"}</td>
              <td>{transaction.billStatus.status}</td>
              <td>
                {transaction.approved === "Y" ? (
                  "Approved"
                ) : (
                  <Button
                    className="btn btn-success"
                    style={{
                      marginTop: "0px",
                      fontSize: "12px",
                      alignItems: "center",
                      alignSelf: "center",
                      height: "25px",
                    }}
                    onClick={(e) =>
                      handlePaymentApprove(e, transaction.transId)
                    }
                  >
                    Recieved
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
