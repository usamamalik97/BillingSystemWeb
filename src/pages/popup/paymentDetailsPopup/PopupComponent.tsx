import React, { useState } from "react";
import Popup from "./Popup";
import "./popup.scss";
import { Button } from "antd";

interface PopupInterface {
  bill: any;
  customer: any;
  items: any[];
  soldItems: any[];
}

const PopupComponent: React.FC = ({
  bill,
  customer,
  items,
  soldItems,
}: PopupInterface) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  console.log(bill);
  console.log(customer);
  console.log(items);
  console.log(soldItems);
  const openPopup = () => {
    console.log("Popup Opened");
    setPopupOpen(true);
  };

  const closePopup = () => {
    console.log("Popup Closed");
    setPopupOpen(false);
  };

  return (
    <div>
      <Button
        className="btn btn-success"
        style={{
          marginTop: "0px",
          fontSize: "14px",
          alignItems: "center",
          alignSelf: "center",
        }}
        onClick={openPopup}
      >
        Print
      </Button>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <div className="bill">
          <div className="box box1">
            <span className="boxTitle">
              <h5>Hassan Hardware</h5>
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
                <b style={{ marginRight: "5px" }}>Total Amount: </b>
                {bill.totalAmount}
              </div>
              <div className="paymentAmount">
                <b style={{ marginRight: "5px" }}>Payment Received: </b>
                {bill.paidAmount}
              </div>
              <div className="remainingAmount">
                <b style={{ marginRight: "5px" }}>Remaining Balance: </b>
                {bill.totalAmount - bill.paidAmount}
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default PopupComponent;
