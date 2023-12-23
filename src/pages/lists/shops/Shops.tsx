import { useEffect, useState } from "react";
import "./shops.scss";
//import { Link } from "react-router-dom";

//import { shops } from "../../../data";
import axios from "axios";
const Shops = () => {
  const [fetchedShops, setFetchedShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shopsBills, setShopsBills] = useState([]);

  console.log(shopsBills);
  const getShopBills = (shopId: number) => {
    if (shopsBills) {
      return shopsBills[shopId] || [];
    }
    return [];
  };
  const getPendingBills = (shopId: number) => {
    let billCount = 0;
    const bill: any[] = getShopBills(shopId);
    if (bill) {
      bill.map((billTemp) => {
        if (parseFloat(billTemp.dueAmount) > 0) {
          billCount += 1;
        }
      });
    }
    return billCount;
  };
  const getPendingAmounts = (shopId: number) => {
    let pendingAmount = 0.0;
    const bill: any[] = getShopBills(shopId);
    if (bill) {
      bill.map((billTemp) => {
        pendingAmount += parseFloat(billTemp.dueAmount);
      });
    }
    return pendingAmount;
  };
  const fetchShops = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/shops/"
      );
      console.log(response.data);
      setFetchedShops(response.data.shops);
      setShopsBills(response.data.bills);
      setLoading(false);
    } catch (error) {
      setFetchedShops([]);
      setShopsBills([]);
      setLoading(false);
    }
  };
  const handleOnChangeSearch = async (value: string) => {
    try {
      const API =
        value && value.length > 0
          ? `http://localhost:8080/hassan-hardware/shops/search/${value}/`
          : "http://localhost:8080/hassan-hardware/shops/";
      const response = await axios.get(API);
      console.log(response.data);
      setFetchedShops(response.data.shops);
      setShopsBills(response.data.bills);
      setLoading(false);
    } catch (error) {
      setFetchedShops([]);
      setShopsBills([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchShops();
  }, []);
  if (loading) return <div>Loading...</div>;

  return (
    <div className="Shops">
      <br />
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
          type="text"
          placeholder="Search Shop"
          style={{ width: "200px" }}
          onChange={(e) => handleOnChangeSearch(e.target.value)}
        />
      </div>
      <table className="table table-hover table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">Shop Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Shop's Pending Bills Amount</th>
            <th scope="col">Shop's Pending Bills Count</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {fetchedShops.map((shop, index) => (
            <tr
              key={shop.shopId}
              className={"table-light"}
              onClick={() => (window.location.href = `/shops/${shop.shopId}/`)}
            >
              <th scope="row">{shop.shopName}</th>
              <td>{shop.phoneNumber}</td>
              <td>{shop.emailId}</td>
              <td>{shop.address}</td>
              <td>{getPendingAmounts(shop.shopId)}</td>
              <td>{getPendingBills(shop.shopId)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shops;
