interface SubCustomerProps {
  bills: any[];
}

const SubCustomer = ({ bills }: SubCustomerProps) => {
  return (
    <table className="table table-hover table-light table-sm">
      <thead>
        <tr>
          <th scope="col">Invoice #</th>
          <th scope="col">Purchase Date</th>
          <th scope="col">Total Amount</th>
          <th scope="col">Paid Amount</th>
          <th scope="col">Remaining Amount</th>
          <th scope="col">Bill Status</th>
        </tr>
      </thead>
      <tbody className="table-group-divider tableItem table-light">
        {bills.map((bill) => (
          <tr
            key={bill.billId}
            onClick={() => (window.location.href = `/bills/${bill.billId}/`)}
          >
            <td>{bill.billId}</td>
            <td>{bill.billDate}</td>
            <td>{bill.totalAmount}</td>
            <td>{bill.paidAmount}</td>
            <td>{bill.dueAmount}</td>
            <td>{bill.billStatus.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubCustomer;
