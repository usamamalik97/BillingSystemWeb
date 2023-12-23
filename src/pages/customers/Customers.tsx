import "./customers.scss";
import { Link } from "react-router-dom";
interface CustomersInterface {
  customers: any[];
  customerBills: any[];
}

const Customers = ({ customers, customerBills }: CustomersInterface) => {
  const getPendingBills = (bill: []) => {
    let billCount = 0;
    bill.map((billTemp) => {
      if (parseFloat(billTemp.dueAmount) > 0) {
        billCount += 1;
      }
    });
    return billCount;
  };
  const getPendingAmounts = (bill: []) => {
    let pendingAmount = 0.0;
    bill.map((billTemp) => {
      pendingAmount += parseFloat(billTemp.dueAmount);
    });
    return pendingAmount;
  };
  return (
    <div className="customers">
      <Link
        to="/customers/"
        className="listItem"
        style={{ color: "darkslategrey" }}
      >
        <h5>Customers</h5>
      </Link>
      <div className="list">
        {customers.map((customer) => (
          <div
            className="listItem"
            key={customer.customerId}
            onClick={() =>
              (window.location.href = `/customers/${customer.customerId}/`)
            }
          >
            <div className="customer">
              <span className="customerName">
                {customer.customerName}
                <span className="tag">
                  <b>
                    {getPendingBills(customerBills[customer.customerId])} /{" "}
                    {getPendingAmounts(customerBills[customer.customerId])}
                  </b>
                </span>
              </span>
              <span className="shopName">{customer.shopName}</span>
            </div>
            <hr
              className={"border border-dark border-2 opacity-50"}
              style={{ margin: "5px", padding: "0px" }}
            ></hr>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
