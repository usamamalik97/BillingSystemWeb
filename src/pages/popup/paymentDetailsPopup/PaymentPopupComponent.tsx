import React, { useState } from "react";
import PaymentPopup from "./PaymentPopup";
import "./popup.scss";
import { Button } from "antd";
import ArticleIcon from "@mui/icons-material/Article";

interface PopupInterface {
  customerPayment: any;
}

const PaymentPopupComponent: React.FC = ({
  customerPayment,
}: PopupInterface) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  console.log(customerPayment);
  const openPopup = () => {
    console.log("Popup Opened");
    setPopupOpen(true);
  };

  const closePopup = () => {
    console.log("Popup Closed");
    setPopupOpen(false);
  };
  if (!customerPayment) return;
  return (
    <div>
      <Button
        className="btn btn-light"
        style={{
          marginTop: "0px",
          fontSize: "14px",
          alignItems: "center",
          alignSelf: "center",
        }}
        onClick={openPopup}
      >
        <ArticleIcon />
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
                    value={customerPayment.paymentAmount}
                    style={{ marginLeft: "10px", width: "250px" }}
                    placeholder="Cash Received"
                    disabled
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
                    value={customerPayment.bank}
                    disabled
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
                    disabled
                    value={customerPayment.chequeNo}
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
                    value={customerPayment.amount}
                    disabled
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
                    disabled
                    value={customerPayment.dueDate}
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
