import "./product.scss";
//import TopBox from "../../../components/topbox/TopBox";
import { useParams } from "react-router-dom";
/*import {
  bills,
  products,
  customers,
  amounts,
  billsCounts,
  productDetail,
  users,
} from "../../../data";*/
//import Items from "../../../components/ListComponents/Items";
//import User from "../../users/User";
//import Customers from "../../customers/Customers";
import PieCharts from "../../../components/charts/pieCharts/PieCharts";
//import PieChartsBill from "../../../components/charts/pieCharts/PieChartsBill";
import SubProduct from "./SubProduct";
import { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import { RootState } from "../../../app/store";
const Product = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const { productId } = useParams();
  const [lastMonthStats, setLastMonthStats] = useState([]);
  const [sixMonthStats, setSixMonthStats] = useState([]);
  const [lastYearStats, setLastYearStats] = useState([]);
  const [costProfitStats, setCostProfitStats] = useState([]);
  const [item, setItem] = useState();
  const [itemRecords, setItemRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/hassan-hardware/items/${productId}/`
      );

      setItem(response.data.item);
      setItemRecords(response.data.itemRecords);
      setLastMonthStats(response.data.lastMonthStats);
      setSixMonthStats(response.data.sixMonthStats);
      setLastYearStats(response.data.lastYearStats);
      setCostProfitStats(response.data.costProfitStats);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setItemRecords([]);
      setLastMonthStats([]);
      setSixMonthStats([]);
      setLastYearStats([]);
      setCostProfitStats([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);
  if (loading || !item) return <div>Loading...</div>;
  return (
    <div className="product">
      <div className="box box1">
        <span className="size" style={{ justifyContent: "space-between" }}>
          <b>Size:</b>
          {item.itemSize}
        </span>
        <span className="brand" style={{ justifyContent: "space-between" }}>
          <b>Brand: </b>
          {item.brand.brandName}
        </span>
        <span className="material" style={{ justifyContent: "space-between" }}>
          <b>Material: </b>
          {item.itemMaterial}
        </span>
        <span className="quantity" style={{ justifyContent: "space-between" }}>
          <b>Quantity: </b>
          {item.quantity}
        </span>
        <span className="weight" style={{ justifyContent: "space-between" }}>
          <b>Weight: </b>
          {item.itemWeight} grams
        </span>
        <div className="box box5">
          <SubProduct products={itemRecords} />
        </div>
      </div>
      {user.role === "Admin" && (
        <>
          <div className="box box4">
            <h5>Last Months Stats</h5>
            <PieCharts data={lastMonthStats} />
          </div>
          <div className="box box4">
            <h5>6 Months Stats</h5>
            <PieCharts data={sixMonthStats} />
          </div>
          <div className="box box4">
            <h5>Last Year Stats</h5>
            <PieCharts data={lastYearStats} />
          </div>
          <div className="box box4">
            <h5>Sale Stats</h5>
            <PieCharts data={costProfitStats} />
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
