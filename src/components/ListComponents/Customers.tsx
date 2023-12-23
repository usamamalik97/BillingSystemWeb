import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hassan-hardware/customers/all/"
      );
      setCustomers(response.data.customers);
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
            <th scope="col">Customer Name</th>
            <th scope="col">Customer Phone Number</th>
            <th scope="col">Customer Pending Bills Amount</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {customers.map((customer, index) => (
            <tr key={customer.customerId} className={"table-primary"}>
              <th scope="row">
                <Link to={`/customers/${customer.customerId}/`}>
                  {customer.customerName}
                </Link>
              </th>
              <td>{customer.phoneNumber}</td>
              <td>0</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Customers;
