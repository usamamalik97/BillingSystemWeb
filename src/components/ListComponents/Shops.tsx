import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/shops/"
      );
      setShops(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Shop Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Shop's Pending Bills Amount</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {shops.map((shop, index) => (
            <tr key={shop.shopId} className={"table-primary"}>
              <th scope="row">
                <Link to={`/shops/${shop.shopId}/`}>{shop.shopName}</Link>
              </th>
              <td>{shop.phoneNumber}</td>
              <td>{shop.emailId}</td>
              <td>{shop.address}</td>
              <td>0</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Shops;
