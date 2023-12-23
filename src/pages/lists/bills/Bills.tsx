import "./bills.scss";
//import { bills } from "../../../data";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useState, useEffect } from "react";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (bills.length === 0) {
      try {
        const response = await axios.get(
          "http://localhost:8080/hassan-hardware/bills/all/"
        );
        setBills(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="billsClass">
      <div
        className="addUser"
        style={{
          fontSize: "12px",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <a className="btn btn-primary btn-sm" href="/bill/add/" role="button">
          <AddIcon />
          New Bill
        </a>
      </div>
      <table className="table table-hover table-dark table-sm">
        <thead>
          <tr>
            <th scope="col">Invoice# </th>
            <th scope="col">Customer Name</th>
            <th scope="col">Bill Date</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Paid Amount</th>
            <th scope="col">Amount Remaining</th>
            <th scope="col">Shop Name</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody className="table-group-divider tableItem table-light">
          {bills.map((bill) => (
            <tr
              className={
                bill.billStatus.status === "F"
                  ? "table-success"
                  : bill.billStatus.status === "P"
                  ? "table-warning"
                  : "table-danger"
              }
              key={bill.billId}
              onClick={() => (window.location.href = `/bills/${bill.billId}/`)}
            >
              <td>{bill.billId}</td>
              <td>{bill.customer.customerName}</td>
              <td>{bill.billDate}</td>
              <td>{bill.totalAmount}</td>
              <td>{bill.paidAmount}</td>
              <td>{bill.dueAmount}</td>
              <td>{bill.customer.shopName}</td>
              <td>{bill.billStatus.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bills;
