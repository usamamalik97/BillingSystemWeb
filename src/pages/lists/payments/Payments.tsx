import { Button } from "antd";
import "./payments.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [cashReceived, setCashReceived] = useState(0.0);
  const [chequesCashed, setChequesCashed] = useState(0.0);
  const [expenses, setExpenses] = useState(0.0);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    if (payments.length === 0) {
      try {
        const response = await axios.get(
          "http://localhost:8080/hassan-hardware/payments/"
        );
        console.log(response.data);
        setPayments(response.data.transactionInfoList);
        setCashReceived(response.data.cashReceivedAmount);
        setChequesCashed(response.data.chequesCashedAmount);
        setExpenses(response.data.expenses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  };
  const handleOnChangeSearchDate = async (value: string) => {
    try {
      console.log(value);
      const API = value
        ? `http://localhost:8080/hassan-hardware/payments/${value}/`
        : "http://localhost:8080/hassan-hardware/payments/";
      console.log(API);
      const response = await axios.get(API);
      console.log(response.data);
      setPayments(response.data.transactionInfoList);
      setCashReceived(response.data.cashReceivedAmount);
      setChequesCashed(response.data.chequesCashedAmount);
      setExpenses(response.data.expenses);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    let API = "http://localhost:8080/hassan-hardware/payment/approved";
    axios
      .post(API, transactionFormData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setPayments(response.data.transactionInfoList);
        setCashReceived(response.data.cashReceivedAmount);
        setChequesCashed(response.data.chequesCashedAmount);
        setExpenses(response.data.expenses);
        console.log("API response:", response.data);
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
  console.log(payments);
  return (
    <div className="paymentsClass">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <h4
          style={{
            justifyContent: "space-between",
            color: "black",
            marginLeft: "10px",
            alignItems: "center",
            alignSelf: "center",
            marginBottom: "20px",
          }}
        >
          <u>Payments</u>
        </h4>
        <h6
          style={{
            justifyContent: "space-between",
            color: "black",
            marginLeft: "10px",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <b>Cash Received: </b>
          <span>{cashReceived}</span>
        </h6>
        <h6
          style={{
            justifyContent: "space-between",
            color: "black",
            marginLeft: "10px",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <b>Cheques Cashed: </b>
          <span>{chequesCashed}</span>
        </h6>
        <h6
          style={{
            justifyContent: "space-between",
            color: "black",
            marginLeft: "10px",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <b>Expenses: </b>
          <span>{expenses}</span>
        </h6>
      </div>
      <div
        className="searchCustomer"
        style={{
          alignItems: "center",
          alignSelf: "center",
          marginTop: "0px",
          paddingTop: "0px",
          marginLeft: "10px",
          marginBottom: "10px",
          width: "200px",
        }}
      >
        <input
          type="date"
          placeholder="Search Payments For"
          style={{ width: "200px" }}
          onChange={(e) => handleOnChangeSearchDate(e.target.value)}
        />
      </div>
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
          {payments.map((payment, index) => (
            <tr
              className={
                payment.billStatus.status === "F"
                  ? "table-success"
                  : payment.billStatus.status === "P"
                  ? "table-warning"
                  : "table-danger"
              }
              key={index}
            >
              <td>{payment.customer.customerName}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.paymentAmount}</td>
              <td>{payment.adjustedAmount}</td>
              <td>{payment.cheque ? "Cheque" : "Cash"}</td>
              <td>{payment.billStatus.status}</td>
              <td>
                {payment.approved === "Y" ? (
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
                    onClick={(e) => handlePaymentApprove(e, payment.transId)}
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

export default Payments;
