import axios from "axios";
import PieCharts from "../../../components/charts/pieCharts/PieCharts";
import PieChartsBill from "../../../components/charts/pieCharts/PieChartsBill";

import { useEffect, useState } from "react";

const BillsGraph = () => {
  const [billStats, setBillStats] = useState([]);
  const [paymentStats, setPaymentStats] = useState([]);
  const [profitStats, setProfitStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/statistics/"
      );
      console.log(response.data);
      setBillStats(response.data.billStats);
      setPaymentStats(response.data.paymentStats);
      setProfitStats(response.data.profitStats);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setBillStats([]);
      setPaymentStats([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <h5 style={{ marginTop: "20px", marginLeft: "20px" }}>Bills</h5>
      <div className="home">
        <div className="box box3">
          <h5>Last Month</h5>
          <PieChartsBill data={billStats.lastMonthBillStats} />
        </div>
        <div className="box box3">
          <h5>Last 6 Months</h5>
          <PieChartsBill data={billStats.sixMonthBillStats} />
        </div>

        <div className="box box3">
          <h5>Last Year</h5>
          <PieChartsBill data={billStats.lastYearBillStats} />
        </div>
        <div className="box box3">
          <h5>Overall</h5>
          <PieChartsBill data={billStats.overAllBillStats} />
        </div>
      </div>

      <hr
        className={"border border-dark border-2 opacity-50"}
        style={{ margin: "20px", padding: "0px" }}
      ></hr>
      <h5 style={{ marginTop: "30px", marginLeft: "20px" }}>Payments</h5>
      <div className="home">
        <div className="box box3">
          <h5>Last Month</h5>
          <PieCharts data={paymentStats.lastMonthPaymentStats} />
        </div>
        <div className="box box3">
          <h5>Last 6 Months</h5>
          <PieCharts data={paymentStats.sixMonthPaymentStats} />
        </div>

        <div className="box box3">
          <h5>Last Year</h5>
          <PieCharts data={paymentStats.lastYearPaymentStats} />
        </div>
        <div className="box box3">
          <h5>Overall</h5>
          <PieCharts data={paymentStats.overAllPaymentStats} />
        </div>
      </div>
      <hr
        className={"border border-dark border-2 opacity-50"}
        style={{ margin: "20px", padding: "0px" }}
      ></hr>
      <h5 style={{ marginTop: "30px", marginLeft: "20px" }}>Profit</h5>
      <div className="home">
        <div className="box box3">
          <h5>Last Month</h5>
          <PieCharts data={profitStats.lastMonthProfitStats} />
        </div>
        <div className="box box3">
          <h5>Last 6 Months</h5>
          <PieCharts data={profitStats.sixMonthProfitStats} />
        </div>

        <div className="box box3">
          <h5>Last Year</h5>
          <PieCharts data={profitStats.lastYearProfitStats} />
        </div>
        <div className="box box3">
          <h5>Overall</h5>
          <PieCharts data={profitStats.overAllProfitStats} />
        </div>
      </div>

      <hr
        className={"border border-dark border-2 opacity-50"}
        style={{ margin: "20px", padding: "0px" }}
      ></hr>
    </>
  );
};

export default BillsGraph;
