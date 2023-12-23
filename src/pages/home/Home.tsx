import "./home.scss";
import TopBox from "../../components/topbox/TopBox";
import { Link } from "react-router-dom";
import axios from "axios";
import Products from "../products/Products";
import User from "../users/User";
import Customers from "../customers/Customers";
import PieCharts from "../../components/charts/pieCharts/PieCharts";
import PieChartsBill from "../../components/charts/pieCharts/PieChartsBill";
import { useState, useEffect } from "react";
import Expenses from "./Expenses";
import Cheques from "./Cheques";
/*import {
  bills,
  products,
  customers,
  billsCounts,
  amounts,
  users,
} from "../../data";*/
const Home = () => {
  const [bills, setBills] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customerBills, setCustomerBills] = useState([]);
  const [billStats, setBillStats] = useState([]);
  const [cheques, setCheques] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [paymentStats, setPaymentStats] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0.0);
  const [totalBills, setTotalBills] = useState(0);

  const getDoubleTotalValue = (stats: []) => {
    let value = 0.0;
    stats.map((stat) => {
      value += parseFloat(stat.value);
    });
    return value;
  };
  const getIntTotalValue = (stats: []) => {
    let value = 0;
    stats.map((stat) => {
      value += parseInt(stat.value);
    });
    return value;
  };
  const fetchHomePageData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/getHomeData/"
      );
      console.log(response.data.bills);
      console.log(response.data.products);
      console.log(response.data.customers);
      console.log(response.data.billStats);
      console.log(response.data.paymentStats);
      console.log(response.data.users);
      console.log(response.data.cheques);
      setBills(response.data.bills);
      setProducts(response.data.products);
      setCustomers(response.data.customers);
      setCustomerBills(response.data.customerbills);
      setBillStats(response.data.billStats);
      setPaymentStats(response.data.paymentStats);
      setUsers(response.data.users);
      setCheques(response.data.cheques);
      setExpenses(response.data.expenses);
      setTotalPaymentAmount(getDoubleTotalValue(response.data.paymentStats));
      setTotalBills(getIntTotalValue(response.data.billStats));
      setLoading(false);
    } catch (error) {
      setBills([]);
      setProducts([]);
      setCustomers([]);
      setBillStats([]);
      setPaymentStats([]);
      setUsers([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHomePageData();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="home">
      <div className="box box4">
        <Customers customers={customers} customerBills={customerBills} />
      </div>
      <div className="box box2">
        <Link to="/graphs/" className="listItem" style={{ color: "black" }}>
          <h5>Bill Stats</h5>
        </Link>
        <span>
          <b>Total : </b>
          {totalBills}
        </span>
        <PieChartsBill data={billStats} />
      </div>
      <div className="box box3">
        <Link to="/graphs/" className="listItem" style={{ color: "black" }}>
          <h5>Payment Stats</h5>
        </Link>
        <span>
          <b>Total : </b>
          {totalPaymentAmount}
        </span>
        <PieCharts data={paymentStats} />
      </div>
      <div className="box box1">
        <TopBox bills={bills} />
      </div>
      <div className="box box7">
        <Products products={products} />
      </div>
      <div className="box box5">
        <User users={users} />
      </div>
      <div className="box box8">
        <Cheques cheques={cheques} />
      </div>
      <div className="box box9">
        <Expenses expenses={expenses} />
      </div>
    </div>
  );
};

export default Home;
