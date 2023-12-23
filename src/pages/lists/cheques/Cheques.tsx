import { Button } from "antd";
import "./cheques.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../app/store";

const Cheques = () => {
  const [pending, setPending] = useState([]);
  const [cashed, setCashed] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const fetchData = async () => {
    if (pending.length === 0 && cashed.length === 0) {
      try {
        const response = await axios.get(
          "http://localhost:8080/hassan-hardware/cheques/"
        );
        setPending(response.data.Pending);
        setCashed(response.data.Cashed);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
  };
  const handleChequeStatus = async (
    event: React.FormEvent,
    chequeId: number,
    status: string
  ) => {
    event.preventDefault();
    const chequeFormData = new FormData();

    chequeFormData.append(
      "Cheque",
      JSON.stringify({
        chequeId,
      })
    );

    chequeFormData.append(
      "User",
      JSON.stringify({
        username: user.username,
      })
    );
    setLoading(true);
    console.log("API response: ", chequeFormData);
    let API =
      status === "cashed"
        ? "http://localhost:8080/hassan-hardware/cheque/cashed"
        : "http://localhost:8080/hassan-hardware/cheque/approved";
    axios
      .post(API, chequeFormData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
        setPending(response.data.Pending);
        setCashed(response.data.Cashed);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error occurred while making the API call:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="chequesClass">
      <div className="box box2" style={{ fontSize: "12px" }}>
        <h6>Pending</h6>
        <table className="table table-hover table-dark table-sm">
          <thead>
            <tr key="Cheques">
              <th scope="col">Cheque# </th>
              <th scope="col">Due Date </th>
              <th scope="col">Amount</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Bank</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider tableItem table-light table-sm">
            {pending.map((cheque, index) => (
              <tr key={index} style={{ height: "15px" }}>
                <td>{cheque.chequeNo}</td>
                <td>{cheque.dueDate}</td>
                <td>{cheque.amount}</td>
                <td>{cheque.customer.customerName}</td>
                <td>{cheque.bank}</td>
                <td>
                  <Button
                    className={
                      cheque.approved === "Y"
                        ? "btn btn-success"
                        : "btn btn-warning"
                    }
                    style={{
                      marginTop: "0px",
                      fontSize: "12px",
                      alignItems: "center",
                      alignSelf: "center",
                      height: "25px",
                    }}
                    onClick={(e) =>
                      handleChequeStatus(
                        e,
                        cheque.chequeId,
                        cheque.approved === "Y" ? "cashed" : "approved"
                      )
                    }
                  >
                    {cheque.approved === "Y" ? "Cashed" : "Approve"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="box box1" style={{ fontSize: "12px" }}>
        <h6>Cashed</h6>

        <table className="table table-hover table-dark table-sm">
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
          <tbody className="table-group-divider tableItem table-light table-sm">
            {cashed.map((cheque, index) => (
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
      {/*<div className="box box3" style={{ fontSize: "10px" }}>
        <h6>Failed</h6>

        <table className="table table-hover table-dark table-sm table-sm">
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
          <tbody className="table-group-divider tableItem table-light table-sm">
            {failed.map((cheque, index) => (
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
            </div>*/}
    </div>
  );
};

export default Cheques;
