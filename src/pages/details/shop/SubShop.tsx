interface SubShopProps {
  customers: any[];
  customerBills: any[];
}

const SubShop = ({ customers, customerBills }: SubShopProps) => {
  console.log(customerBills);
  const getBillCount = (id: number) => {
    return customerBills[id].length;
  };
  const getPendingBillCount = (id: number) => {
    let totalCount = 0;
    customerBills[id].map((bill) => {
      if (bill.billStatus.status !== "F") {
        totalCount += 1;
      }
    });
    return totalCount;
  };
  const getTotalAmount = (id: number) => {
    let totalAmount = 0;
    customerBills[id].map((bill) => {
      totalAmount += bill.totalAmount;
    });
    return totalAmount;
  };
  const getPaidAmount = (id: number) => {
    let totalPaidAmount = 0;
    customerBills[id].map((bill) => {
      totalPaidAmount += bill.paidAmount;
    });
    return totalPaidAmount;
  };
  const getRemainingAmount = (id: number) => {
    let totalRemainingAmount = 0.0;
    customerBills[id].map((bill) => {
      totalRemainingAmount += bill.dueAmount;
    });
    return totalRemainingAmount;
  };
  return (
    <table className="table table-hover table-light table-sm">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Bill Count</th>
          <th scope="col">Pending Bills Count</th>
          <th scope="col">Total Amount</th>
          <th scope="col">Paid Amount</th>
          <th scope="col">Remaining Amount</th>
          <th scope="col">Hold Amount</th>
        </tr>
      </thead>
      <tbody className="table-group-divider tableItem table-light">
        {customers.map((customer) => (
          <tr
            key={customer.customerId}
            onClick={() =>
              (window.location.href = `/customers/${customer.customerId}/`)
            }
          >
            <td>{customer.customerName}</td>
            <td>{getBillCount(customer.customerId)}</td>
            <td>{getPendingBillCount(customer.customerId)}</td>
            <td>{getTotalAmount(customer.customerId)}</td>
            <td>{getPaidAmount(customer.customerId)}</td>
            <td>{getRemainingAmount(customer.customerId)}</td>
            <td>{customer.holdAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubShop;
