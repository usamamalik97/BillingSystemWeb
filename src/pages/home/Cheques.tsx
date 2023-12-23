import "./cheques.scss";
import { Link } from "react-router-dom";

interface ChequesInterface {
  cheques: any[];
}
const Cheques = ({ cheques }: ChequesInterface) => {
  return (
    <div className="myChequesClass">
      <Link
        to="/cheques/"
        style={{
          color: "darkslategrey",
        }}
      >
        <h5>Cheques</h5>
      </Link>
      <table className="table table-hover table-info table-sm">
        <thead>
          <tr key="Cheques">
            <th scope="col">Cheque# </th>
            <th scope="col">Due Date </th>
            <th scope="col">Amount</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Bank</th>
            <th scope="col">Cashed</th>
          </tr>
        </thead>
        <tbody className="table-group-divider tableItem table-light">
          {cheques.map((cheque, index) => (
            <tr key={index}>
              <td>{cheque.chequeNo}</td>
              <td>{cheque.dueDate}</td>
              <td>{cheque.amount}</td>
              <td>{cheque.customer.customerName}</td>
              <td>{cheque.bank}</td>
              <td>{cheque.chequeCashed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cheques;
