import "./shopDetail.scss";
import { useParams } from "react-router-dom";
import { shop } from "../../../data";
import PieCharts from "../../../components/charts/pieCharts/PieCharts";
import SubShop from "./SubShop";
import { useEffect, useState } from "react";
import axios from "axios";

const ShopDetail = () => {
  const { shopId } = useParams();
  const [bills, setBills] = useState([]);
  const [billsMap, setBillsMap] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [shop, setShop] = useState();
  const [paymentStats, setPaymentStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/hassan-hardware/shops/${shopId}/`
      );

      setBills(response.data.bills);
      setBillsMap(response.data.customerBills);
      setPaymentStats(response.data.paymentStats);
      setCustomers(response.data.customers);
      setShop(response.data.shop);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setBills([]);
      setBillsMap([]);
      setPaymentStats([]);
      setCustomers([]);
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
  if (loading || !shop) return <div>Loading...</div>;
  return (
    <div className="shopDetail">
      <div className="box box1">
        <span className="shopName">
          <b>Shop Name: </b>
          {shop.shopName}
        </span>
        <span className="phoneNumber">
          <b>Phone Number: </b>
          {shop.phoneNumber}
        </span>
        <span className="emailId">
          <b>Email: </b>
          {shop.emailId}
        </span>
        <span className="emailId">
          <b>Address: </b>
          {shop.address}
        </span>
        <span className="raminingBalance">
          <b>Remaining Balance: </b>
          {getPendingAmount()}
        </span>
      </div>
      <div className="box4">
        <h5>Shop Stats</h5>
        <PieCharts data={paymentStats} />
      </div>
      <div className="box5">
        <SubShop customers={customers} customerBills={billsMap} />
      </div>
    </div>
  );
};

export default ShopDetail;
