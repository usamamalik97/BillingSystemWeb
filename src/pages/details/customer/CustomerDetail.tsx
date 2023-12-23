import "./customerDetail.scss";
import { useParams } from "react-router-dom";
//import { customer } from "../../../data";
import PieCharts from "../../../components/charts/pieCharts/PieCharts";
import SubCustomer from "./SubCustomer";
import axios from "axios";
import { useEffect, useState } from "react";

const CustomerDetail = () => {
  const { customerId } = useParams();
  const [bills, setBills] = useState([]);
  const [customer, setCustomer] = useState();
  const [shop, setShop] = useState();
  const [paymentStats, setPaymentStats] = useState([]);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/hassan-hardware/customers/${customerId}/`
      );

      setBills(response.data.bills);
      setPaymentStats(response.data.paymentStats);
      setCustomer(response.data.customer);
      setShop(response.data.shop);
      setRemainingBalance(response.data.remainingBalance);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setBills([]);
      setPaymentStats([]);
      setLoading(false);
    }
  };
  const getPendingAmount = () => {
    let totalPendingAmount = 0.0;
    bills.map((bill) => {
      totalPendingAmount += bill.dueAmount;
    });
    return totalPendingAmount;
  };
  useEffect(() => {
    fetchCustomerDetails();
  }, []);
  if (loading || !customer || !shop) return <div>Loading...</div>;
  return (
    <div className="customerDetail">
      <div className="box box1">
        <span className="name">
          <b>Name:</b>
          {customer.customerName}
        </span>
        <span className="shopName">
          <b>Shop Name: </b>
          {customer.shopName}
        </span>
        <span className="phoneNumber">
          <b>Phone Number: </b>
          {customer.phoneNumber}
        </span>
        <span className="emailId">
          <b>Email: </b>
          {customer.emailId}
        </span>
        <span className="raminingBalance">
          <b>Remaining Balance: </b>
          {getPendingAmount()}
        </span>
        <span className="holdBalance">
          <b>Hold Balance: </b>
          {customer.holdAmount}
        </span>
        <span className="holdBalance">
          <b>Remaining Balance: </b>
          {remainingBalance}
        </span>
        <div className="box box5">
          <SubCustomer bills={bills} />
        </div>
      </div>
      <div className="box box4">
        <h5>Customer Stats</h5>
        <PieCharts data={paymentStats} />
      </div>
    </div>
  );
};

export default CustomerDetail;
