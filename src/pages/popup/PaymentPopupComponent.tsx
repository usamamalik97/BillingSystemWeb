import React, { useState } from "react";
import PaymentPopup from "./PaymentPopup";
import "./popup.scss";
import { Button } from "antd";

interface PopupInterface {
  paymentAmount: number;
  setPaymentAmount: void;
  cheque: any;
  setCheque: void;
}

const PaymentPopupComponent: React.FC = ({
  paymentAmount,
  setPaymentAmount,
  cheque,
  setCheque,
}: PopupInterface) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  console.log(paymentAmount);
  console.log(setPaymentAmount);
  console.log(cheque);
  console.log(setCheque);
  console.log(cheque.chequeNo);
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
        className="btn btn-light"
        style={{
          marginTop: "0px",
          fontSize: "15px",
          alignItems: "center",
          alignSelf: "center",
          width: "300px",
        }}
        onClick={openPopup}
      >
        <b>Add Payment</b>
      </Button>
      <PaymentPopup isOpen={isPopupOpen} onClose={closePopup}>
        <div className="bill">
          <div className="box box1">
            <span className="boxTitle">
              <h5>Hassan Hardware</h5>
            </span>
            <span>
              <h5>Cash</h5>
            </span>
            <div className="billData">
              <span className="customerName">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox2 toggle button group"
                >
                  <input type="button" disabled />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck2"
                    style={{ width: "100px" }}
                  >
                    Payment
                  </label>
                </div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox2 toggle button group"
                >
                  <input
                    type="text"
                    autoComplete="off"
                    //value={paymentAmount}
                    onChange={(e) => {
                      setPaymentAmount(parseInt(e.target.value));
                    }}
                    style={{ marginLeft: "10px", width: "250px" }}
                    placeholder="Cash Received"
                  />
                </div>
              </span>
            </div>

            <span>
              <br />
              <h5>Cheque</h5>
            </span>
            <div className="billData">
              <span className="customerName">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox2 toggle button group"
                >
                  <input type="button" disabled />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck2"
                    style={{ width: "100px" }}
                  >
                    Bank
                  </label>
                </div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox2 toggle button group"
                >
                  <input
                    type="text"
                    autoComplete="off"
                    //value={cheque.bank}
                    onChange={(e) => {
                      cheque.bank = e.target.value;
                      setCheque(cheque);
                    }}
                    style={{ marginLeft: "10px", width: "250px" }}
                    placeholder="Bank"
                  />
                </div>
              </span>
              <span className="customerName" style={{ marginTop: "10px" }}>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox2 toggle button group"
                >
                  <input type="button" disabled />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck2"
                    style={{ width: "100px" }}
                  >
                    Cheque#
                  </label>
                </div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox2 toggle button group"
                >
                  <input
                    type="text"
                    autoComplete="off"
                    //value={cheque.chequeNo}
                    onChange={(e) => {
                      cheque.chequeNo = e.target.value;
                      setCheque(cheque);
                    }}
                    style={{ marginLeft: "10px", width: "250px" }}
                    placeholder="Cheque Number"
                  />
                </div>
              </span>
              <span
                className="customerName"
                style={{ marginTop: "10px", width: "100px" }}
              >
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox2 toggle button group"
                >
                  <input type="button" disabled />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck2"
                    style={{ width: "100px" }}
                  >
                    Amount:
                  </label>
                </div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox2 toggle button group"
                >
                  <input
                    type="number"
                    autoComplete="off"
                    //value={cheque.amount}
                    onChange={(e) => {
                      cheque.amount = e.target.value;
                      setCheque(cheque);
                    }}
                    style={{ marginLeft: "10px", width: "250px" }}
                    placeholder="Cheque Amount"
                  />
                </div>
              </span>
              <span className="customerName" style={{ marginTop: "10px" }}>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox2 toggle button group"
                >
                  <input type="button" disabled />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck2"
                    style={{ width: "100px" }}
                  >
                    Due Date
                  </label>
                </div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox2 toggle button group"
                >
                  <input
                    type="date"
                    autoComplete="off"
                    //value={cheque.dueDate}
                    onChange={(e) => {
                      cheque.dueDate = e.target.value;
                      setCheque(cheque);
                    }}
                    placeholder="Cheque Number"
                    style={{ marginLeft: "10px", width: "250px" }}
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      </PaymentPopup>
    </div>
  );
};

export default PaymentPopupComponent;
