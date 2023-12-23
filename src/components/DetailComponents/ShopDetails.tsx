import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "../Table";

const ShopDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [shop, setShop] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const { shopId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/hassan-hardware/shops/${shopId}/`
      );
      setCustomers(response.data.customers);
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
      {customers && shop ? (
        <>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{shop.shopName}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Phone #: {shop.phoneNumber}
              </h6>
              <p className="card-text">
                Email: {shop.emailId}
                <br />
                Shop Address: {shop.address}
              </p>
            </div>
          </div>
          <hr className="border border-success border-2 opacity-50"></hr>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email Id</th>
                <th scope="col">Pending Amount</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {customers.map((customer, index) => (
                <tr key={index} className={"table-primary"}>
                  <th scope="row">
                    <Link to={`/customers/${customer.customerId}/`}>
                      {customer.customerName}
                    </Link>
                  </th>
                  <td>{customer.phoneNumber}</td>
                  <td>{customer.emailId}</td>
                  <td>0</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr className="border border-success border-2 opacity-50"></hr>

          <Table data={bills} />
        </>
      ) : (
        <>No Data Found</>
      )}
    </>
  );
};

export default ShopDetails;
