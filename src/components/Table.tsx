import { Link } from "react-router-dom";

interface TableProps {
  data: any[];
}
const Table = ({ data }: TableProps) => {
  return (
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
        {data.map((bill, index) => (
          <tr
            key={bill.billId}
            className={
              bill.billStatus.status === "F"
                ? "table-success"
                : bill.billStatus.status === "P"
                ? "table-primary"
                : "table-danger"
            }
          >
            <th scope="row">
              <Link to={`/bill/details/${bill.billId}`}>{bill.billId}</Link>
            </th>
            <td>{bill.customer.customerName}</td>
            <td>{bill.customer.shop.shopName}</td>
            <td>{bill.totalAmount}</td>
            <td>{bill.dueAmount}</td>
            <td>{bill.billDate}</td>
            <td>{bill.dueDate}</td>
            <td>{bill.billStatus.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
