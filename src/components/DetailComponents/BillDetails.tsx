import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const BillDetails = () => {
  const { billId } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/hassan-hardware/bills/${billId}/`
      );
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Call the fetch function when the component mounts
  fetchData();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Bill#</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Shop Name</th>
            <th scope="col">Bill Amount</th>
            <th scope="col">Remaining Amount</th>
            <th scope="col">Bill Date</th>
            <th scope="col">Due Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {data && (
            <tr
              key={data.billId}
              className={
                data.billStatus.status === "F"
                  ? "table-success"
                  : data.billStatus.status === "P"
                  ? "table-primary"
                  : "table-danger"
              }
            >
              <th scope="row">{data.billId}</th>
              <td>{data.customer.customerName}</td>
              <td>{data.customer.shop.shopName}</td>
              <td>{data.totalAmount}</td>
              <td>{data.dueAmount}</td>
              <td>{data.billDate}</td>
              <td>{data.dueDate}</td>
              <td>{data.billStatus.status}</td>
            </tr>
          )}
        </tbody>
      </table>
      <strong>billId: {billId}</strong>
    </>
  );
};

export default BillDetails;
