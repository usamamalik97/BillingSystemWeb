import "./topbox.scss";
import { Link } from "react-router-dom";
interface TopBoxInterface {
  bills: any[];
}

const TopBox = ({ bills }: TopBoxInterface) => {
  return (
    <div className="topbox">
      <Link
        to="/bills/"
        className="listItem"
        style={{ color: "darkslategrey" }}
      >
        <h5>Bills</h5>
      </Link>
      <div className="list">
        {bills.map((bill) => (
          <div
            className="listItem"
            key={bill.billId}
            onClick={() => (window.location.href = `/bills/${bill.billId}/`)}
          >
            <span className={"invoice"}>
              <b>Invoice# </b>
              {bill.billId}
            </span>
            <div className="billTag">
              <span className="customerName">
                {bill.customer.customerName}
                <span className="amount">
                  <b>{bill.dueAmount}</b>
                </span>
              </span>
              <span className="shopName">{bill.customer.shopName}</span>
            </div>
            <hr
              className={
                parseInt(bill.dueAmount) > 0
                  ? "border border-dark border-2 opacity-50"
                  : "border border-success border-2 opacity-50"
              }
              style={{ margin: "5px", padding: "0px" }}
            ></hr>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
