import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from "../Table";

const CustomerDetails = () => {
  const [customer, setCustomer] = useState([]);
  const [shop, setShop] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const { customerId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/hassan-hardware/customers/${customerId}/`
      );
      setCustomer(response.data.customer);
      setShop(response.data.shop);
      setBills(response.data.bills);
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
      {customer && shop ? (
        <>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{customer.customerName}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Phone #: {customer.phoneNumber}
              </h6>
              <p className="card-text">
                Email: {customer.emailId}
                <br />
                Shop Name: {shop.shopName}
                <br />
                Shop Address: {shop.address}
              </p>
            </div>
          </div>
          <hr className="border border-success border-2 opacity-50"></hr>
          <Table data={bills} />
        </>
      ) : (
        <>No Data Found</>
      )}
    </>
  );
};

export default CustomerDetails;
