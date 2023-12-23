import "./bills.scss";
import { useParams } from "react-router-dom";
//import { bill } from "../../../data";
import PopupComponent from "../../popup/PopupComponent";
import axios from "axios";
import { useEffect, useState } from "react";

const BillDetails = () => {
  const { billId } = useParams();
  const [bill, setBill] = useState();
  const [customer, setCustomer] = useState();
  const [soldItems, setSoldItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBillDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/hassan-hardware/bills/${billId}/`
      );

      setCustomer(response.data.customer);
      setSoldItems(response.data.soldItems);
      setBill(response.data.bill);
      setItems(response.data.items);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSoldItems([]);
      setItems([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBillDetails();
  }, []);
  if (loading || !customer || !bill) return <div>Loading...</div>;
  return (
    <div className="bills">
      <div className="box emptyBox"></div>
      <div className="box box1">
        <span className="boxTitle">
          <h5>Hassan Hardware</h5>
        </span>

        <span className="popupComponent">
          <PopupComponent
            bill={bill}
            customer={customer}
            items={items}
            soldItems={soldItems}
          />
        </span>
        <div className="billData">
          <span className="customerName">
            <b style={{ marginRight: "5px" }}>Name: </b>
            {customer.customerName}
          </span>
          <span className="billContent">
            <span className="invoice">
              <b style={{ marginRight: "5px" }}>Invoice #</b>
              {bill.billId}
            </span>
            <span className="material">
              <b style={{ marginRight: "5px" }}>Date: </b>
              {bill.billDate}
            </span>
          </span>
        </div>

        <table
          className="table table-light table-sm"
          style={{ marginTop: "10px" }}
        >
          <thead>
            <tr>
              <th scope="col">Size</th>
              <th scope="col">Brand</th>
              <th scope="col">Material</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody className="table-group-divider tableItem table-light">
            {soldItems.map((item) => (
              <tr key={item.id}>
                <td>{items[item.id].itemSize}</td>
                <td>{items[item.id].brand.brandName}</td>
                <td>{items[item.id].itemMaterial}</td>
                <td>{item.quantitySold}</td>
                <td>{item.sellPrice}</td>
                <td>{item.sellPrice * item.quantitySold}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="billTotal">
          <div className="totalAmount">
            <b style={{ marginRight: "5px", width: "150px" }}>Total Amount: </b>
            <span style={{ width: "80px" }}>{bill.totalAmount}</span>
          </div>
          <div className="paymentAmount">
            <b style={{ marginRight: "5px", width: "150px" }}>
              Payment Received:{" "}
            </b>
            <span style={{ width: "80px" }}>{bill.paidAmount}</span>
          </div>
          <div className="remainingAmount">
            <b style={{ marginRight: "5px", width: "150px" }}>
              Remaining Balance:{" "}
            </b>
            <span style={{ width: "80px" }}>
              {bill.totalAmount - bill.paidAmount}
            </span>
          </div>
        </div>
      </div>

      <div className="box emptyBox"></div>
    </div>
  );
};

export default BillDetails;
